import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import PageTitle from '../../components/PageTitle';
import { getMyWarehouseList, resetActionSuccess } from '../../redux/myWarehouse/actions';
import { dateFormat, VNDCurrencyFormatting } from '../../helpers/format';
import { DATE_FORMAT } from '../../constants/common';
import DialogConfirm from '../../components/DialogConfirm';
import { deleteProductWarehouse } from '../../redux/myWarehouse/actions';

const Warehouse = () => {

    const { myWarehouseList = [], isSuccess } = useSelector(state => state.myWarehouse);

    const dispatch = useDispatch();

    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [productSelected, setProductSelected] = useState({});

    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(getMyWarehouseList())
    }, []);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getMyWarehouseList())
        setIsOpenDialogConfirm(false)
        dispatch(resetActionSuccess())
    }, [isSuccess]);


    const columns = [
        {
            dataField: 'warehouseId',
            text: 'Nơi nhập hàng',
            sort: false,
            formatter: (record) => record?.warehouseName,
        },
        {
            dataField: 'productId',
            text: 'Loại mặt hàng',
            sort: true,
            formatter: (record) => record?.productName,
        },
        {
            dataField: 'warehouseProductName',
            text: 'Tên mặt hàng',
            sort: true,
        },
        {
            dataField: 'color',
            text: 'Màu sắc',
            sort: false,
        },
        {
            dataField: 'price',
            text: 'Đơn giá',
            sort: true,
            formatter: (record) => VNDCurrencyFormatting(record),
        },
        {
            dataField: 'quantity',
            text: 'Số lượng',
            sort: false,
        },
        {
            dataField: 'total',
            text: 'Thành tiền',
            sort: false,
            formatter: (record) => VNDCurrencyFormatting(record),
        },
        {
            dataField: 'sellPrice',
            text: 'Giá bán ra',
            sort: false,
            formatter: (record) => VNDCurrencyFormatting(record),
        },
        {
            dataField: 'inputDate',
            text: 'Thời gian',
            sort: false,
            formatter: (record) => dateFormat(record, DATE_FORMAT.DD_MM_YYYY),
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (record, data) => renderAction(data),
            // headerStyle: { width: '15%' }
        }
    ];

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Hiển thị</label>
            <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
                defaultValue={currSizePerPage}
                onChange={(e) => onSizePerPageChange(e.target.value)}>
                {options.map((option, idx) => {
                    return <option key={idx}>{option.text}</option>
                })}
            </Input>
            <label className="d-inline ml-1">mặt hàng</label>
        </React.Fragment>
    );

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Link to={`/apps/warehouseEdit/${record?.id}`}>
                    <Button outline color="secondary" style={{ marginRight: 10 }}>
                        <i className="uil-edit"></i>
                    </Button>
                </Link>
                <Button color="danger" onClick={() => handleDeleteProduct(record)}>
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const onDelete = () => {
        dispatch(deleteProductWarehouse(productSelected?.id))
    }

    const handleDeleteProduct = (record) => {
        setProductSelected(record)
        setIsOpenDialogConfirm(true)
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tables', path: '/tables/advanced' },
                            { label: 'Advanced Tables', path: '/tables/advanced', active: true },
                        ]}
                        title={'Kho hàng'}
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
                                data={myWarehouseList}
                                columns={columns}
                                search
                                columnToggle
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder={"Tìm kiếm hàng"} />
                                            </Col>
                                            <Col className="text-right">
                                                <Link to="/apps/warehouseAdd">
                                                    <Button color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm hàng</Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '25', value: 25 }, { text: '50', value: 50, }, { text: `${myWarehouseList.length} Tất cả`, value: myWarehouseList.length }] })}
                                            wrapperClasses="table-responsive"
                                        />
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <DialogConfirm
                isOpen={isOpenDialogConfirm}
                width={400}
                onCancel={() => setIsOpenDialogConfirm(false)}
                title={"Xác nhận xóa"}
                description={`Bạn có chắc muốn xóa: "${productSelected?.warehouseProductName}"`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default Warehouse;
