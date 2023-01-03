import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import PageTitle from '../../components/PageTitle';
import { getMyWarehouseList, resetActionSuccess } from '../../redux/myWarehouse/actions';
import { dateFormat, formatProductData, formatSelectInput, isEmpty, VNDCurrencyFormatting } from '../../helpers/format';
import { DATE_FORMAT, PAGE } from '../../constants/common';
import DialogConfirm from '../../components/DialogConfirm';
import { deleteProductWarehouse } from '../../redux/myWarehouse/actions';
import { getProductsType } from '../../redux/actions';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import Flatpickr from 'react-flatpickr'
import { getWarehouseList } from '../../redux/warehouse/actions';
import * as FeatherIcon from 'react-feather';
import  { getObjectFromStorage, setObjectToStorage } from '../../helpers/storage';

const ProductsInWarehouse = () => {

    const { myWarehouseList = [], isSuccess } = useSelector(state => state.myWarehouse);
    const { items = [] } = useSelector(state => state.productType);
    const { warehouseList = [] } = useSelector(state => state.warehouse);
    var firstLoad = false;
    const dispatch = useDispatch();
    const productTypeAll = { value: null, label: 'Loại mặt hàng (Tất cả)' }
    const warehouseAll = { value: null, label: 'Loại kho (Tất cả)' }
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [productSelected, setProductSelected] = useState({});
    const [productItemSelected, setProductItemSelected] = useState(productTypeAll);
    const [warehouseSelected, setWarehouseSelected] = useState(warehouseAll);
    const [dateValue, setDateValue] = useState(null);

    const { SearchBar } = Search;

    useEffect(() => {
        firstLoad = true;
        dispatch(getProductsType());
        dispatch(getWarehouseList());
    }, []);

    useEffect(() => {
        if (!isEmpty(items) && !isEmpty(warehouseList)) {
            const selectParams = getObjectFromStorage(PAGE.PRODUCT_IN_WAREHOUSE);
            const { productType, warehouse, inputDate } = selectParams || {};
            setProductItemSelected(productType);
            setWarehouseSelected(warehouse);
            inputDate && setDateValue(new Date(inputDate));
            if (firstLoad) {
                dispatch(getMyWarehouseList({ 
                    isImportProduct: true,
                    productTypeId: productType?.value,
                    warehouseId: warehouse?.value,
                    inputDate
                }));
                firstLoad = false;
            }
        }
    }, [items, warehouseList]);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getMyWarehouseList())
        setIsOpenDialogConfirm(false)
        dispatch(resetActionSuccess())
    }, [isSuccess]);

    const defaultSorted = [
        {
            dataField: 'inputDate',
            order: 'desc',
        },
    ];

    const columns = [
        {
            dataField: 'inputDate',
            text: 'Thời gian',
            sort: true,
            formatter: (record) => dateFormat(record, DATE_FORMAT.DD_MM_YYYY),
        },
        {
            dataField: 'warehouse',
            text: 'Nơi nhập hàng',
            sort: false,
            formatter: (record) => record?.warehouseName,
        },
        {
            dataField: 'productType',
            text: 'Loại mặt hàng',
            sort: true,
            formatter: (record) => record?.productName,
        },
        {
            dataField: 'productName',
            text: 'Tên mặt hàng',
            sort: true,
        },
        {
            dataField: 'color',
            text: 'Phân loại',
            sort: false,
            formatter: (data, record) => renderColorAndQuantity(record),
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
            formatter: (data, record) => renderTotalQuantity(record),
        },
        {
            dataField: 'total',
            text: 'Thành tiền',
            sort: false,
            formatter: (record) => VNDCurrencyFormatting(record),
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (data, record) => renderAction(record),
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

    const renderColorAndQuantity = (record) => {
        const colorAndQuantityDataSize = record?.colorAndQuantityData.length;
        if (colorAndQuantityDataSize < 2 && record?.colorAndQuantityData?.[0].color === "") return "";
        return record?.colorAndQuantityData.map((item, index) => `${item.color}(${item.quantity})${(index !== (colorAndQuantityDataSize - 1)) ? `, ` : ''}`);
    }

    const renderTotalQuantity = (record) => {
        return record?.colorAndQuantityData.map(item => item?.quantity).reduce((a, b) => a + b, 0);
    }

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Link to={`/apps/productsInWarehouseEdit/${record?.id}`}>
                    <Button color="secondary" style={{ marginRight: 10 }}>
                        <i className="uil-edit"></i>
                    </Button>
                </Link>
                <Button className='action-button-mt5' color="danger" onClick={() => handleDeleteProduct(record)}>
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const onDelete = () => {
        dispatch(deleteProductWarehouse(productSelected?.id));
    }

    const handleDeleteProduct = (record) => {
        setProductSelected(record);
        setIsOpenDialogConfirm(true);
    }

    const handleProductTypeChange = (option) => {
        setProductItemSelected(option);
        const params = {
            productTypeId: option?.value,
            warehouseId: warehouseSelected?.value,
            inputDate: dateFormat(dateValue, DATE_FORMAT.YYYY_MM_DD),
            isImportProduct: true,
        }
        selectedParams(option, warehouseSelected, dateValue)
        dispatch(getMyWarehouseList(params));
    }

    const handleWarehouseChange = (option) => {
        setWarehouseSelected(option);
        const params = {
            productTypeId: productItemSelected?.value,
            warehouseId: option?.value,
            inputDate: dateFormat(dateValue, DATE_FORMAT.YYYY_MM_DD),
            isImportProduct: true,
        }
        selectedParams(productItemSelected, option, dateValue)
        dispatch(getMyWarehouseList(params));
    }

    const selectedParams = (productType, warehouse, inputDate) => {
        const params = {
            productType,
            warehouse,
            inputDate: dateFormat(inputDate, DATE_FORMAT.YYYY_MM_DD)
        }
        setObjectToStorage(PAGE.PRODUCT_IN_WAREHOUSE, params);
    }

    const handleDateChange = (date) => {
        setDateValue(date);
        const params = {
            productTypeId: productItemSelected?.value,
            warehouseId: warehouseSelected?.value,
            inputDate: dateFormat(date, DATE_FORMAT.YYYY_MM_DD),
            isImportProduct: true,
        }
        selectedParams(productItemSelected, warehouseSelected, date)
        dispatch(getMyWarehouseList(params));
    }

    const onClearDate = () => {
        if (!dateValue) return;
        setDateValue(null);
        const params = {
            productTypeId: productItemSelected?.value,
            warehouseId: warehouseSelected?.value,
            inputDate: null,
            isImportProduct: true,
        }
        selectedParams(productItemSelected, warehouseSelected, null)
        dispatch(getMyWarehouseList(params));
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
                        title={'Nhập hàng'}
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
                                data={formatProductData(myWarehouseList)}
                                columns={columns}
                                search
                                columnToggle
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col md={9}>
                                                <Row>
                                                    <Col className='warehouse-search' md={3}>
                                                        <SearchBar {...props.searchProps} placeholder={"Tìm kiếm hàng"} />
                                                    </Col>
                                                    <Col md={3}>
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
                                                    </Col>
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
                                                            <a onClick={onClearDate} class="clear-button" title="clear" data-clear>
                                                                <FeatherIcon.X />
                                                            </a>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={3} className="text-right add-warehouse-btn">
                                                <Link to="/apps/productsInWarehouseAdd">
                                                    <Button color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm hàng</Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
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
                description={`Bạn có chắc muốn xóa: "${productSelected?.product?.productName}"`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default ProductsInWarehouse;
