import React from 'react';
import { Row, Col, Card, CardBody, Input, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import PageTitle from '../../components/PageTitle';


const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const records = []

const Warehouse = () => {

    const { SearchBar } = Search;

    const columns = [
        {
            dataField: 'placeOfEntry',
            text: 'Nơi nhập hàng',
            sort: false,
        },
        {
            dataField: 'itemName',
            text: 'Loại mặt hàng',
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
        },
        {
            dataField: 'phone',
            text: 'Số lượng',
            sort: false,
        },
        {
            dataField: 'total',
            text: 'Thành tiền',
            sort: false,
        },
        {
            dataField: 'sellPrice',
            text: 'Giá bán ra',
            sort: false,
        },
        {
            dataField: 'dateTime',
            text: 'Thời gian',
            sort: false,
        },
        {
            text: "Thao tác",
            dataField: 'action',
            formatter: (record) => renderAction(record),
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
                <Button outline color="secondary" style={{ marginRight: 10 }}>
                    <i className="uil-edit"></i>
                </Button>
                <Button color="danger">
                    <i className="uil-trash"></i>
                </Button>
            </div>
        )
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
                                data={[]}
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
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({ sizePerPage: 20, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '5', value: 5, }, { text: '10', value: 10 }, { text: '25', value: 25 }, { text: 'All', value: records.length }] })}
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
