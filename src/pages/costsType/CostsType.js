import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Dialog from '../../components/Dialog';
import DialogConfirm from '../../components/DialogConfirm';
import { AvForm, AvField } from "availity-reactstrap-validation";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../components/PageTitle';
import { createCostType, deleteCostType, getCostsType, resetActionSuccess, updateCostType } from '../../redux/costType/actions';

const CostsType = () => {
    const { SearchBar } = Search;
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [costTypeSelected, setCostTypeSelected] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { costTypeList = [], isSuccess } = useSelector(state => state.costType);
    const { costTypeName, id } = costTypeSelected;

    useEffect(() => {
        dispatch(getCostsType());
    }, []);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getCostsType());
        setIsOpenDialog(false);
        setIsOpenDialogConfirm(false);
        dispatch(resetActionSuccess());
    }, [isSuccess]);


    const columns = [
        {
            dataField: 'costTypeName',
            text: 'Tên loại chi phí',
            sort: false,
        },
        {
            text: "Thao tác",
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

    const handleOpenDialog = () => {
        setIsOpenDialog(true)
    }

    const handleEdit = (record) => {
        setCostTypeSelected(record);
        setIsEditing(true);
        setIsOpenDialog(true);
    }

    const handleDelete = (record) => {
        setCostTypeSelected(record);
        setIsOpenDialogConfirm(true);
    }

    const onDelete = () => {
        dispatch(deleteCostType(id))
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            if (isEditing) {
                const payload = {
                    id,
                    body: values
                }
                dispatch(updateCostType(payload));
            } else {
                dispatch(createCostType(values));
            }
        }
    }

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Hiển thị</label>
            <Input type="select" color="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
                defaultValue={currSizePerPage}
                onChange={(e) => onSizePerPageChange(e.target.value)}>
                {options.map((option, idx) => {
                    return <option key={idx}>{option.text}</option>
                })}
            </Input>
            <label className="d-inline ml-1">loại</label>
        </React.Fragment>
    )


    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        title={'Danh sách loại chi phí'}
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
                                data={costTypeList}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder={"Tìm kiếm..."} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button onClick={handleOpenDialog} color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm loại chi phí</Button>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '25', value: 25 }, { text: '50', value: 50, }, { text: `${costTypeList.length} Tất cả`, value: costTypeList.length }] })}
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
                title={!isEditing ? "Thêm loại chi phí" : "Chỉnh sửa loại chi phí"}
                onCancel={() => setIsOpenDialog(false)}
                isShowFooter={false}
            >
                <AvForm onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <AvField
                                name="costTypeName"
                                label="Tên loại chi phí"
                                type="text"
                                value={!isEditing ? "" : costTypeName}
                                validate={{
                                    required: { value: true, errorMessage: "Vui lòng nhập tên loại chi phí" },
                                }}
                            />
                        </Col>
                    </Row>
                    <div style={{ float: "right", marginTop: 20 }}>
                        <Button
                            color="secondary mr-2"
                            onClick={() => setIsOpenDialog(false)}
                        >
                            Hủy bỏ
                        </Button>
                        <Button color="primary" type="submit">
                            { !isEditing ? "Thêm" : "Chỉnh sửa" }
                        </Button>
                    </div>
                </AvForm>
            </Dialog>
            <DialogConfirm
                isOpen={isOpenDialogConfirm}
                width={400}
                onCancel={() => setIsOpenDialogConfirm(false)}
                title={"Xác nhận xóa"}
                description={`Bạn có chắc muốn xóa: ${costTypeName}`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default CostsType;
