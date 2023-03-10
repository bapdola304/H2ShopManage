import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Select from 'react-select'
import PageTitle from '../../components/PageTitle';
import { getMyWarehouseList, resetActionSuccess } from '../../redux/myWarehouse/actions';
import { dateFormat, formatProductData, formatSelectInput, VNDCurrencyFormatting } from '../../helpers/format';
import { getProductsType } from '../../redux/actions';
import { getWarehouseList } from '../../redux/warehouse/actions';
import { DATE_FORMAT } from '../../constants/common';

var firstLoad = true;

const Warehouse = () => {

    const { myWarehouseList = [], isSuccess } = useSelector(state => state.myWarehouse);
    const { items = [] } = useSelector(state => state.productType);

    const dispatch = useDispatch();
    const productTypeAll = { value: null, label: 'Loại mặt hàng (Tất cả)' }
    const [productItemSelected, setProductItemSelected] = useState(productTypeAll);

    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(getProductsType());
        dispatch(getMyWarehouseList());
    }, []);

    useEffect(() => {
        if (!isSuccess) return
        dispatch(getMyWarehouseList())
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
            dataField: 'productName',
            text: 'Tên mặt hàng',
            sort: false,
        },
        {
            dataField: 'color',
            text: 'Phân loại',
            sort: false,
            formatter: (data, record) => renderColorAndQuantity(record),
        },
        {
            dataField: 'remainingQuantity',
            text: 'Số lượng',
            sort: true,
            formatter: (data, record) => renderTotalQuantity(record),
        },
        {
            dataField: 'sellPrice',
            text: 'Giá bán ra',
            sort: true,
            formatter: (record) => VNDCurrencyFormatting(record),
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

    const handleProductTypeChange = (option) => {
        setProductItemSelected(option);
        const params = {
            productTypeId: option?.value,
        }
        dispatch(getMyWarehouseList(params));
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
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
                                                    <Col className='warehouse-search' md={4}>
                                                        <SearchBar {...props.searchProps} placeholder={"Tìm kiếm hàng"} />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            value={productItemSelected}
                                                            onChange={handleProductTypeChange}
                                                            options={[productTypeAll, ...formatSelectInput(items, "productName")]}
                                                        />
                                                    </Col>
                                                </Row>
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
        </React.Fragment>
    );
};

export default Warehouse;
