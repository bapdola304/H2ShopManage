import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Dialog from '../../components/Dialog';
import DialogConfirm from '../../components/DialogConfirm';
import { AvForm, AvField } from "availity-reactstrap-validation";
import PageTitle from '../../components/PageTitle';
import { dateFormat, formatSelectInput, isEmpty, VNDCurrencyFormatting } from '../../helpers/format';
import { DATE_FORMAT } from '../../constants/common';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import Flatpickr from 'react-flatpickr'
import { createCostIncurred, deleteCostIncurred, getCostIncurred, resetActionSuccess, updateCostIncurred } from '../../redux/costIncurred/actions';
import { getCostsType } from '../../redux/costType/actions';
import Select from 'react-select';

const defaultSorted = [
    {
        dataField: 'inputDate',
        order: 'desc',
    },
];

const CostsIncurred = () => {
    const { SearchBar } = Search;
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());
    const [totalValue, setTotalValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [sellPrice, setSellPrice] = useState(0);
    const [costIncurredSelected, setCostIncurredSelected] = useState({});
    const [costTypeSelected, setCostTypeSelected] = useState({});
    const { costIncurredName, id, costType } = costIncurredSelected;
    const dispatch = useDispatch();
    const { costIncurredList = [], isSuccess } = useSelector(state => state.costIncurred);
    const { costTypeList = [] } = useSelector(state => state.costType);

    useEffect(() => {
        dispatch(getCostIncurred());
        dispatch(getCostsType());
    }, []);

    useEffect(() => {
        if (isEmpty(costTypeList)) return;
        const firstItem = costTypeList?.[0];
        setCostTypeSelected({ value: firstItem?.id, label: firstItem?.costTypeName });
    }, [costTypeList]);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getCostIncurred());
        setIsOpenDialog(false);
        setIsOpenDialogConfirm(false);
        setIsEditing(false);
        setCostIncurredSelected({});
        setTotalValue(0);
        setQuantity(0);
        setSellPrice(0);
        dispatch(resetActionSuccess());
    }, [isSuccess]);

    useEffect(() => {
        if (isEmpty(costIncurredSelected)) return;
        setSellPrice(costIncurredSelected?.price);
        setQuantity(costIncurredSelected?.quantity);
        setTotalValue(costIncurredSelected?.total);
        setDateValue(costIncurredSelected?.inputDate);
        setCostTypeSelected({ value: costType?._id, label: costType?.costTypeName });
    }, [costIncurredSelected]);

    const columns = [
        {
            dataField: 'inputDate',
            text: 'Th???i gian',
            sort: true,
            formatter: (data) => dateFormat(data, DATE_FORMAT.DD_MM_YYYY),
        },
        {
            dataField: 'costIncurredName',
            text: 'T??n chi ph??',
            sort: false,
        },
        {
            dataField: 'costType',
            text: 'Lo???i chi ph??',
            sort: false,
            formatter: (data) => data?.costTypeName,
        },
        {
            dataField: 'price',
            text: '????n gi??',
            sort: false,
            formatter: (data) => VNDCurrencyFormatting(data),
        },
        {
            dataField: 'quantity',
            text: 'S??? l?????ng',
            sort: false,
        },
        {
            dataField: 'total',
            text: 'Th??nh ti???n',
            sort: false,
            formatter: (data) => VNDCurrencyFormatting(data),
        },
        {
            text: "Thao t??c",
            dataField: 'action',
            formatter: (data, record) => renderAction(record),
            headerStyle: { width: '15%' }
        }
    ];

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Button color="secondary" style={{ marginRight: 10 }} onClick={() => handleEdit(record)}>
                    <i className="uil-edit"></i>
                </Button>
                <Button className='action-button-mt5' onClick={() => handleDelete(record)} color="danger">
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const handleDelete = (record) => {
        setCostIncurredSelected(record);
        setIsOpenDialogConfirm(true);
    }

    const handleEdit = (record) => {
        setCostIncurredSelected(record);
        setIsEditing(true);
        setIsOpenDialog(true);
    }

    const handleOpenDialog = () => {
        setIsOpenDialog(true);
        setTotalValue(0);
    }

    const handleChangeQuantity = (event, value = 0) => {
        setTotalValue(parseInt(value) * sellPrice);
        setQuantity(parseInt(value));
    }

    const handleChangePrice = (event, value = 0) => {
        setSellPrice(parseInt(value));
        setTotalValue(quantity * parseInt(value));
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                ...values,
                total: totalValue,
                inputDate: dateValue,
                costTypeId: costTypeSelected?.value
            }
            if (!isEditing) {
                dispatch(createCostIncurred(body));
            } else {
                const payload = {
                    id,
                    body
                }
                dispatch(updateCostIncurred(payload))
            }
        }
    }

    const onDelete = () => {
        dispatch(deleteCostIncurred(id))
    }

    const handleCancel = () => {
        setCostIncurredSelected({});
        setIsOpenDialog(false);
        setIsEditing(false);
    }

    const handleCostTypeChange = (option) => {
        setCostTypeSelected(option);
    }

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Hi???n th???</label>
            <Input type="select" color="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
                defaultValue={currSizePerPage}
                onChange={(e) => onSizePerPageChange(e.target.value)}>
                {options.map((option, idx) => {
                    return <option key={idx}>{option.text}</option>
                })}
            </Input>
            <label className="d-inline ml-1"></label>
        </React.Fragment>
    )


    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tables', path: '/tables/advanced' },
                            { label: 'Advanced Tables', path: '/tables/advanced', active: true },
                        ]}
                        title={'Danh s??ch c??c chi ph?? ph??t sinh'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <ToolkitProvider
                                bootstrap4
                                keyField="id"
                                data={costIncurredList}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder={"T??m ki???m..."} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button onClick={handleOpenDialog} color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Th??m chi ph??</Button>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '25', value: 25 }, { text: '50', value: 50, }, { text: `${costIncurredList.length} T???t c???`, value: costIncurredList.length }] })}
                                            wrapperClasses="table-responsive"
                                        />
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Dialog
                visible={isOpenDialog}
                title={!isEditing ? "Th??m chi ph??" : "Ch???nh s???a chi ph??"}
                onCancel={handleCancel}
                isShowFooter={false}
            >
                <AvForm onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <label>Ng??y</label> <br />
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={dateValue}
                                        onChange={date => { setDateValue(date) }}
                                        className="form-control"
                                        options={
                                            {
                                                dateFormat: DATE_FORMAT.d_m_Y,
                                                locale: Vietnamese
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <AvField
                                name="costIncurredName"
                                label="T??n chi ph??"
                                type="text"
                                value={!isEditing ? "" : costIncurredName}
                                validate={{
                                    required: { value: true, errorMessage: "Vui l??ng nh???p t??n chi ph??" },
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <div className='form-group'>
                                <p className="mb-1 font-weight-semibold">Lo???i chi ph??</p>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder="Ch???n h??ng"
                                    onChange={handleCostTypeChange}
                                    value={costTypeSelected}
                                    options={formatSelectInput(costTypeList, "costTypeName")}
                                />
                            </div>
                        </Col>
                        <Col md={12}>
                            <AvField
                                name="price"
                                label="????n gi??"
                                type="number"
                                value={!isEditing ? "" : sellPrice}
                                onChange={handleChangePrice}
                                validate={{
                                    required: { value: true, errorMessage: "Vui l??ng nh???p gi?? b??n" },
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField
                                name="quantity"
                                label="S??? l?????ng"
                                type="number"
                                value={!isEditing ? "" : quantity}
                                onChange={handleChangeQuantity}
                                validate={{
                                    required: { value: true, errorMessage: "Vui l??ng nh???p s??? l?????ng" },
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField
                                name="total"
                                label="Th??nh ti???n"
                                type="text"
                                value={VNDCurrencyFormatting(totalValue || 0)}
                                disabled={true}
                                style={{ fontWeight: 700 }}
                            />
                        </Col>
                    </Row>
                    <div style={{ float: "right", marginTop: 20 }}>
                        <Button
                            color="secondary mr-2"
                            onClick={handleCancel}
                        >
                            H???y b???
                        </Button>
                        <Button color="primary" type="submit">
                            {!isEditing ? "Th??m" : "Ch???nh s???a"}
                        </Button>
                    </div>
                </AvForm>
            </Dialog>
            <DialogConfirm
                isOpen={isOpenDialogConfirm}
                width={400}
                onCancel={() => setIsOpenDialogConfirm(false)}
                title={"X??c nh???n x??a"}
                description={`B???n c?? ch???c mu???n x??a: ${costIncurredName}`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default CostsIncurred;
