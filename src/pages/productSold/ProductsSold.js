import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle'
import { deleteProductSold, getProductSoldList, resetActionSuccess } from '../../redux/productSold/actions';
import { dateFormat, VNDCurrencyFormatting } from '../../helpers/format';
import { DATE_FORMAT, PAGE } from '../../constants/common';
import DialogConfirm from '../../components/DialogConfirm';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import Flatpickr from 'react-flatpickr';
import * as FeatherIcon from 'react-feather';
import { getObjectFromStorage, setObjectToStorage } from '../../helpers/storage';

const ProductsSold = () => {

    const { productSoldList = [], isSuccess } = useSelector(state => state.productSold);

    const dispatch = useDispatch();
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [productSoldSelected, setProductSoldSelected] = useState({});
    const [dateValue, setDateValue] = useState(null);

    const { SearchBar } = Search;

    const columns = [
        {
            dataField: 'inputDate',
            text: 'Thời gian',
            sort: true,
            formatter: (record) => dateFormat(record, DATE_FORMAT.DD_MM_YYYY),
        },
        {
            dataField: 'customer',
            text: 'Tên người mua',
            sort: false,
        },
        {
            dataField: 'customerPhone',
            text: 'SĐT',
            sort: false,
        },
        {
            dataField: 'productWarehouseId',
            text: 'Tên mặt hàng',
            sort: false,
            formatter: (record) => record?.product?.productName,
        },
        {
            dataField: 'color',
            text: 'Phân loại',
            sort: false,
            formatter: (data, record) => handleRenderColor(record),
        },
        {
            dataField: 'sellPrice',
            text: 'Giá bán ra',
            sort: false,
            formatter: (data) => VNDCurrencyFormatting(data),
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
            formatter: (data) => VNDCurrencyFormatting(data),
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (data, record) => renderAction(record),
            // headerStyle: { width: '15%' }
        }
    ];

    const defaultSorted = [
        {
            dataField: 'inputDate',
            order: 'desc',
        },
    ];


    useEffect(() => {
        const selectParams = getObjectFromStorage(PAGE.PRODUCT_SOLD);
        const { inputDate } = selectParams || {};
        inputDate && setDateValue(new Date(inputDate));
        dispatch(getProductSoldList({ inputDate }));
    }, []);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getProductSoldList())
        setIsOpenDialogConfirm(false)
        dispatch(resetActionSuccess())
    }, [isSuccess]);

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Link to={`/apps/productsSoldEdit/${record?.id}`}>
                    <Button color="secondary" style={{ marginRight: 10 }}>
                        <i className="uil-edit"></i>
                    </Button>
                </Link>
                <Button className='action-button-mt5' color="danger" onClick={() => handleDeleteProductSold(record)}>
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const handleRenderColor = (record) => {
        const colorSold = record?.productWarehouseId?.colorAndQuantityData?.find(item => item?._id.toString() === record?.colorId);
        return colorSold?.color;
    }

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

    const onDelete = () => {
        dispatch(deleteProductSold(productSoldSelected?.id))
    }

    const handleDeleteProductSold = (record) => {
        setProductSoldSelected(record)
        setIsOpenDialogConfirm(true)
    }

    const selectedParams = (inputDate) => {
        const params = {
            inputDate: dateFormat(inputDate, DATE_FORMAT.YYYY_MM_DD)
        }
        setObjectToStorage(PAGE.PRODUCT_SOLD, params);
    }

    const handleDateChange = (date) => {
        setDateValue(date);
        const params = {
            inputDate: dateFormat(date, DATE_FORMAT.YYYY_MM_DD),
        }
        selectedParams(date)
        dispatch(getProductSoldList(params));
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
                        title={'Bán hàng'}
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
                                data={productSoldList}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col md={9}>
                                                <Row>
                                                    <Col className='warehouse-search' md={3}>
                                                        <SearchBar {...props.searchProps} placeholder={"Tìm kiếm tên hàng đã bán"} />
                                                    </Col>
                                                    {/* <Col md={3}>
                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            value={productItemSelected}
                                                            onChange={handleProductTypeChange}
                                                            options={[productTypeAll, ...formatSelectInput(items, "productName")]}
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Select
                                                            className="react-select warehouse-select"
                                                            classNamePrefix="react-select"
                                                            value={warehouseSelected}
                                                            onChange={handleWarehouseChange}
                                                            options={[warehouseAll, ...formatSelectInput(warehouseList, "warehouseName")]}
                                                        />
                                                    </Col> */}
                                                    <Col md={3}>
                                                        <div className='date-wrapper'>
                                                            <Flatpickr
                                                                value={dateValue}
                                                                onChange={handleDateChange}
                                                                className="form-control"
                                                                placeholder='Chọn ngày'
                                                                options={
                                                                    {
                                                                        dateFormat: DATE_FORMAT.d_m_Y,
                                                                        locale: Vietnamese,
                                                                    }
                                                                }
                                                            />
                                                            <a onClick={() => handleDateChange(null)} class="clear-button" title="clear" data-clear>
                                                                <FeatherIcon.X />
                                                            </a>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="text-right" md={3}>
                                                <Link to="/apps/productsSoldAdd">
                                                    <Button color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm hàng đã bán</Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '25', value: 25 }, { text: '50', value: 50, }, { text: `${productSoldList.length} Tất cả`, value: productSoldList.length }] })}
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
                description={`Bạn có chắc muốn xóa: "${productSoldSelected?.productWarehouseId?.product?.productName}"`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default ProductsSold;
