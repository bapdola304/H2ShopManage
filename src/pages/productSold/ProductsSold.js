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
import { DATE_FORMAT } from '../../constants/common';
import DialogConfirm from '../../components/DialogConfirm';

const ProductsSold = () => {

    const { productSoldList = [], isSuccess } = useSelector(state => state.productSold);

    const dispatch = useDispatch();
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [productSoldSelected, setProductSoldSelected] = useState({});

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
            text: 'Màu sắc',
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
        dispatch(getProductSoldList())
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
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder="Tìm kiếm hàng đã bán" />
                                            </Col>
                                            <Col className="text-right">
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
