import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr'
import { withRouter } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import { dateFormat, formatSelectInput, setFieldValue, VNDCurrencyFormatting } from '../../helpers/format';
import { getProductsType } from '../../redux/productType/actions';
import { getWarehouseList } from '../../redux/warehouse/actions';
import { createProductForWarehouse, getMyWarehouseDetail, resetActionSuccess, resetMyWarehouseDetail, updateProductWarehouse } from '../../redux/myWarehouse/actions';
import { DATE_FORMAT } from '../../constants/common';
import { Vietnamese } from  'flatpickr/dist/l10n/vn.js';

const AddGoods = (props) => {

    const [warehouseValue, setWarehouseValue] = useState({});
    const [productValue, setProductValue] = useState({});
    const [dateValue, setDateValue] = useState(new Date());
    const [totalValue, setTotalValue] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const { items: products = [] } = useSelector(state => state.product);
    const { warehouseList = [] } = useSelector(state => state.warehouse);
    const { productOfWarehouse = {}, isSuccess } = useSelector(state => state.myWarehouse);
    let form = null;
    const { match } = props;
    const { params: { id } = {} } = match || {};
    const { warehouseProductName, color, sellPrice, price: productPrice, quantity: productQuantity, total, productId, warehouseId, inputDate } = productOfWarehouse;

    useEffect(() => {
        if (id) {
            dispatch(getMyWarehouseDetail(id))
        }
        dispatch(getProductsType())
        dispatch(getWarehouseList())
        return function cleanup() {
            dispatch(resetMyWarehouseDetail());
        };
    }, []);

    useEffect(() => {
        if (id) return
        const firstItem = products?.[0];
        setProductValue({ value: firstItem?.id, label: firstItem?.productName });
    }, [products]);

    useEffect(() => {
        if (id) return
        const firstItem = warehouseList?.[0];
        setWarehouseValue({ value: firstItem?.id, label: firstItem?.warehouseName });
    }, [warehouseList]);

    useEffect(() => {
        if (!id) return
        setProductValue({ value: productId?._id, label: productId?.productName });
        setWarehouseValue({ value: warehouseId?._id, label: warehouseId?.warehouseName });
        setTotalValue(total);
        setPrice(productPrice);
        setQuantity(productQuantity);
        setDateValue(inputDate);
    }, [productOfWarehouse]);

    useEffect(() => {
        if (!isSuccess) return;
        form && form.reset();
        setQuantity(0);
        setPrice(0);
        setTotalValue(0);
        dispatch(resetActionSuccess())
    }, [isSuccess]);


    const handleWarehouseChange = (options) => {
        setWarehouseValue(options)
    }

    const handleProductChange = (options) => {
        setProductValue(options);
        form && form.reset();
    }

    const handleChangeQuantity = (event, value = 0) => {
        setTotalValue(parseInt(value) * price);
        setQuantity(parseInt(value));
    }

    const handleChangePrice = (event, value = 0) => {
        setPrice(parseInt(value));
        setTotalValue(quantity * parseInt(value));
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                ...values,
                total: totalValue,
                warehouseId: warehouseValue?.value,
                productId: productValue?.value,
                inputDate: dateFormat(dateValue, DATE_FORMAT.YYYY_MM_DD)
            }
            if (!id) {
                dispatch(createProductForWarehouse(body))
            } else {
                const payload = {
                    id,
                    body
                }
                dispatch(updateProductWarehouse(payload))
            }
        }
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: 'Form Validation', path: '/forms/validation', active: true },
                        ]}
                        title={id ? 'Cập nhật thông tin hàng' : 'Thêm hàng vào kho'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <AvForm onSubmit={handleSubmit} ref={c => (form = c)}>
                                <Row>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Nơi nhập hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Chọn nơi nhập hàng"
                                            onChange={handleWarehouseChange}
                                            value={warehouseValue}
                                            options={formatSelectInput(warehouseList, "warehouseName")}></Select>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label>Ngày</label> <br />
                                            <div className="form-group mb-sm-0 mr-2">
                                                <Flatpickr
                                                    value={dateValue}
                                                    onChange={date => { setDateValue(date) }}
                                                    className="form-control"
                                                    options={
                                                        {
                                                            dateFormat: DATE_FORMAT.d_m_Y,
                                                            locale: Vietnamese
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Loại mặt hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Chọn loại mặt hàng"
                                            onChange={handleProductChange}
                                            value={productValue}
                                            options={formatSelectInput(products, "productName")}></Select>
                                    </Col>
                                    <Col md={6}>
                                        <AvField
                                            name="price"
                                            label="Đơn giá nhập vào"
                                            type="number"
                                            onChange={handleChangePrice}
                                            value={productPrice}
                                            validate={{
                                                required: { value: true, errorMessage: "Vui lòng nhập đơn giá" },
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={8}>
                                                <AvField
                                                    name="warehouseProductName"
                                                    label="Tên mặt hàng"
                                                    type="text"
                                                    value={setFieldValue(warehouseProductName)}
                                                    validate={{
                                                        required: { value: true, errorMessage: "Vui lòng nhập tên mặt hàng" },
                                                    }}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <AvField name="color" label="Màu sắc" type="text" value={setFieldValue(color)} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <AvField
                                            name="quantity"
                                            label="Số lượng"
                                            type="number"
                                            onChange={handleChangeQuantity}
                                            value={productQuantity}
                                            validate={{
                                                required: { value: true, errorMessage: "Vui lòng nhập số lượng" },
                                                min: { value: 1, errorMessage: 'Số lượng phải lớn hơn hoặc bằng 1' }
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <AvField
                                            name="sellPrice"
                                            label="Giá bán ra"
                                            type="number"
                                            value={sellPrice}
                                            validate={{
                                                required: { value: true, errorMessage: "Vui lòng nhập giá bán" },
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <AvField
                                            name="total"
                                            label="Thành tiền"
                                            type="text"
                                            value={VNDCurrencyFormatting(totalValue || 0)}
                                            disabled={true}
                                            style={{ fontWeight: 700 }}
                                            required={false}
                                        />
                                    </Col>
                                </Row>
                                <div className="text-md-right">
                                    <Button color="secondary" type="button" className="mr-2" onClick={() => props.history.goBack()}>
                                        Hủy bỏ
                                    </Button>
                                    <Button color="primary" type="submit">
                                        {id ? "Cập nhật" : "Thêm hàng"}
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
