import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Dialog from '../../components/Dialog';
import DialogConfirm from '../../components/DialogConfirm';
import { AvForm, AvField } from "availity-reactstrap-validation";
import FileUploader from '../../components/FileUploader';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../components/PageTitle';
import { createProduct, deleteProduct, getProducts, resetActionSuccess } from '../../redux/product/actions';
import { isEmpty, VNDCurrencyFormatting } from '../../helpers/format';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const Products = () => {

    const dispatch = useDispatch();
    const { items = [], isSuccess } = useSelector(state => state.product);

    const { SearchBar } = Search;
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);
    const [productSelected, setProductSelected] = useState({});
    const { _id, productName, productColor, warrantyPeriod, sellPrice } = productSelected;

    const columns = [
        {
            dataField: 'image',
            text: 'Hình ảnh',
            sort: false,
        },
        {
            dataField: 'productName',
            text: 'Tên mặt hàng',
            sort: true,
        },
        {
            dataField: 'productColor',
            text: 'Màu sắc',
            sort: false,
        },
        {
            dataField: 'warrantyPeriod',
            text: 'Thời gian bảo hành(tháng)',
            sort: false,
        },
        {
            dataField: 'sellPrice',
            text: 'Giá bán ra',
            sort: false,
            formatter: (record) => VNDCurrencyFormatting(record)
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (record, data) => renderAction(data),
            headerStyle: { width: '15%' }
        }
    ];

    useEffect(() => {
        dispatch(getProducts())
    }, []);

    useEffect(() => {
        dispatch(getProducts())
        setIsOpenDialog(false)
        setIsOpenDialogConfirm(false)
        dispatch(resetActionSuccess())
    }, [isSuccess]);

    const renderAction = (record) => {
        return (
            <div className="wrap-action">
                <Button outline color="secondary" style={{ marginRight: 10 }} onClick={() => handleEditProduct(record)}>
                    <i className="uil-edit"></i>
                </Button>
                <Button onClick={() => handleEditProduct(record)} color="danger">
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
    }

    const handleOpenDialog = () => {
        setProductSelected({})
        setIsOpenDialog(true)
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            dispatch(createProduct(values))
        }
    };

    const handleEditProduct = (record) => {
        setProductSelected(record)
        setIsOpenDialogConfirm(true)
    }

    const onDelete = () => {
        dispatch(deleteProduct(_id))
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
            <label className="d-inline ml-1">mặt hàng</label>
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
                        title={'Danh sách các mặt hàng'}
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
                                data={items}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {props => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} placeholder={"Tìm kiếm mặt hàng"} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button onClick={handleOpenDialog} color="primary" id="btn-new-event"><i className="uil-plus mr-1"></i>Thêm mặt hàng</Button>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({ sizePerPage: 25, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '10', value: 10 }, { text: '25', value: 25 }, { text: '50', value: 50, }, { text: 'All', value: items.length }] })}
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
                title={"Thêm mặt hàng"}
                onCancel={() => setIsOpenDialog(false)}
                isShowFooter={false}
            >
                <AvForm onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <AvField name="productName" label="Tên mặt hàng" type="text" required value={isEmpty(productSelected) ? "" : productName} />
                        </Col>
                        <Col md={12}>
                            <AvField name="productColor" label="Màu sắc" type="text" required value={isEmpty(productSelected) ? "" : productColor} />
                        </Col>
                        <Col md={12}>
                            <AvField name="warrantyPeriod" label="Thời gian bảo hành" type="number" required value={isEmpty(productSelected) ? "" : warrantyPeriod} />
                        </Col>
                        <Col md={12}>
                            <AvField name="sellPrice" label="Giá bán ra" type="number" required value={isEmpty(productSelected) ? "" : sellPrice} />
                        </Col>
                        <Col md={12}>
                            <p className="mb-1 font-weight-semibold">Hình ảnh</p>
                            <FileUploader
                                onFileUpload={files => {
                                    console.log(files);
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
                            Thêm
                        </Button>
                    </div>
                </AvForm>
            </Dialog>
            <DialogConfirm
                isOpen={isOpenDialogConfirm}
                width={400}
                onCancel={() => setIsOpenDialogConfirm(false)}
                title={"Xác nhận xóa"}
                description={`Bạn có chắc muốn xóa mặt hàng: "${productName}"`}
                onOk={onDelete}
            />
        </React.Fragment>
    );
};

export default Products;
