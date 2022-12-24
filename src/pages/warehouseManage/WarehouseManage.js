import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Dialog from '../../components/Dialog';
import DialogConfirm from '../../components/DialogConfirm';
import { AvForm, AvField } from "availity-reactstrap-validation";
import PageTitle from '../../components/PageTitle';
import { createWarehouse, deleteWarehouse, getWarehouseList, resetActionSuccess, updateWarehouse } from '../../redux/warehouse/actions';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const WarehouseManage = () => {

    const dispatch = useDispatch();
    const { warehouseList = [], isSuccess } = useSelector(state => state.warehouse);

    const { SearchBar } = Search;
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [warehouseSelected, setWarehouseSelected] = useState({});
    const [isEditingWarehouse, setIsEditingWarehouse] = useState(false);
    const { id, warehouseName, address, contactName, contactPhone } = warehouseSelected;

    const columns = [
        {
            dataField: 'warehouseName',
            text: 'Tên kho hàng',
            sort: false,
        },
        {
            dataField: 'address',
            text: 'Địa chỉ',
            sort: false,
        },
        {
            dataField: 'contactName',
            text: 'Người liên hệ',
            sort: false,
        },
        {
            dataField: 'contactPhone',
            text: 'SĐT liên hệ',
            sort: false,
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (record, data) => renderAction(data),
            headerStyle: { width: '15%' }
        }
    ];

    useEffect(() => {
        dispatch(getWarehouseList())
    }, []);

    useEffect(() => {
        dispatch(getWarehouseList())
        setIsOpenDialog(false)
        setIsOpenDialogConfirm(false)
        dispatch(resetActionSuccess())
    }, [isSuccess]);

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Button color="secondary" style={{ marginRight: 10 }} onClick={() => handleEditProduct(record)}>
                    <i className="uil-edit"></i>
                </Button>
                <Button className='action-button-mt5' onClick={() => handleDeleteProduct(record)} color="danger">
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const handleOpenDialog = () => {
        setWarehouseSelected({})
        setIsOpenDialog(true)
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            if (isEditingWarehouse) {
                const payload = {
                    id,
                    body: values
                }
                dispatch(updateWarehouse(payload))
            } else {
                dispatch(createWarehouse(values))
            }
        }
    };

    const handleEditProduct = (record) => {
        setWarehouseSelected(record)
        setIsEditingWarehouse(true)
        setIsOpenDialog(true)
    }

    const handleDeleteProduct = (record) => {
        setWarehouseSelected(record)
        setIsOpenDialogConfirm(true)
    }

    const onDelete = () => {
        dispatch(deleteWarehouse(id))
    }

    const onCancelEdit = () => {
        setIsOpenDialog(false)
        setIsEditingWarehouse(false)
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
            <label className="d-inline ml-1">kho hàng</label>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tables', path: '/tables/advanced' },
                            { label: 'Advanced Tables', path: '/tables/advanced', active: true },
                        ]}
                        title={'Danh sách các kho hàng'}
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
                                data={warehouseList}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder={"Tìm kiếm kho hàng"} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button onClick={handleOpenDialog} color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm kho hàng</Button>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '10', value: 10 }, { text: '25', value: 25 }, { text: '50', value: 50, }, { text: 'All', value: warehouseList.length }] })}
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
                title={!isEditingWarehouse ? "Thêm kho hàng" : "Chỉnh sửa kho hàng"}
                onCancel={() => setIsOpenDialog(false)}
                isShowFooter={false}
            >
                <AvForm onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <AvField name="warehouseName" label="Tên kho hàng" type="text" required value={!isEditingWarehouse ? "" : warehouseName} />
                        </Col>
                        <Col md={12}>
                            <AvField name="address" label="Địa chỉ" type="text" required value={!isEditingWarehouse ? "" : address} />
                        </Col>
                        <Col md={12}>
                            <AvField name="contactName" label="Người liên hệ" type="text" required value={!isEditingWarehouse ? "" : contactName} />
                        </Col>
                        <Col md={12}>
                            <AvField name="contactPhone" label="SĐT liên hệ" type="text" required value={!isEditingWarehouse ? "" : contactPhone} />
                        </Col>
                    </Row>
                    <div style={{ float: "right", marginTop: 20 }}>
                        <Button
                            color="secondary mr-2"
                            onClick={onCancelEdit}
                        >
                            Hủy bỏ
                        </Button>
                        <Button color="primary" type="submit">
                            {!isEditingWarehouse ? "Thêm" : "Chỉnh sửa"}
                        </Button>
                    </div>
                </AvForm>
            </Dialog>
            <DialogConfirm
                isOpen={isOpenDialogConfirm}
                width={400}
                onCancel={() => setIsOpenDialogConfirm(false)}
                title={"Xác nhận xóa"}
                description={`Bạn có chắc muốn xóa kho hàng: "${warehouseName}"`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default WarehouseManage;
