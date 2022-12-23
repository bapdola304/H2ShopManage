import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import FileUploader from '../../components/FileUploader';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr'
import { withRouter } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import { VNDCurrencyFormatting } from '../../helpers/format';
import { getProducts } from '../../redux/product/actions';
import { getWarehouseList } from '../../redux/warehouse/actions';

const AddGoods = (props) => {

    const [warehouseValue, setWarehouseValue] = useState([]);
    const [productValue, setProductValue] = useState([]);

    const dispatch = useDispatch();
    const { items: products = [] } = useSelector(state => state.product);
    const { warehouseList = [] } = useSelector(state => state.warehouse);

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getWarehouseList())
    }, []);

    const handleWarehouseChange = (options) => {
        setWarehouseValue(options)
    }

    const handleProductChange = (options) => {
        setProductValue(options)
    }

    const formatSelectInput = (data = [], labelField) => {
        return data.map(item => {
            return {
                value: item.id,
                label: item[labelField]
            }
        })
    }

    const getMutilOptions = () => {
        var arr = []
        for (let index = 0; index < 100; index++) {
            arr.push({ value: `chocolate${index}`, label: `Chocolate${index}` },)
        }
        return arr
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: 'Form Validation', path: '/forms/validation', active: true },
                        ]}
                        title={'Thêm hàng vào kho'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <AvForm>
                                <Row>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Nơi nhập hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            onChange={handleWarehouseChange}
                                            value={warehouseValue}
                                            options={formatSelectInput(warehouseList, "warehouseName")}></Select>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Ngày</label> <br />
                                            <div className="form-group mb-sm-0 mr-2">
                                                <Flatpickr value={new Date()}
                                                    onChange={date => { console.log(date) }}
                                                    className="form-control" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Tên mặt hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            onChange={handleProductChange}
                                            value={productValue}
                                            options={formatSelectInput(products, "productName")}></Select>
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="price" label="Đơn giá" type="number" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="itemColor" label="Màu sắc" type="text" />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="quantity" label="Số lượng" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="sellPrice" label="Giá bán ra" type="number" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="total" label="Thành tiền" type="number" value={VNDCurrencyFormatting(30000)} disabled={true} style={{ fontWeight: 700 }} />
                                    </Col>
                                </Row>
                                <div className="text-md-right">
                                    <Button color="secondary" type="button" className="mr-2" onClick={() => props.history.goBack()}>
                                        Hủy bỏ
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Thêm hàng
                                    </Button>
                                </div>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default withRouter(AddGoods);
