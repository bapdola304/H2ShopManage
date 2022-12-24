import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr'
import PageTitle from '../../components/PageTitle';
import { formatSelectInput, VNDCurrencyFormatting } from '../../helpers/format';
import { goBack } from '../../helpers/navigation';
import { getMyWarehouseList } from '../../redux/myWarehouse/actions';
import { createProductSold, getProductSoldDetail, resetProductSoldDetail, updateProductSold } from '../../redux/productSold/actions';

const AddProductSold = (props) => {

    const dispatch = useDispatch();
    const { myWarehouseList = [] } = useSelector(state => state.myWarehouse);
    const { productSold = {} } = useSelector(state => state.productSold);

    const [productWarehouseValue, setProductWarehouseValue] = useState({});
    const [dateValue, setDateValue] = useState(new Date());
    const [totalValue, setTotalValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [sellPrice, setSellPrice] = useState(0);

    const { match } = props;
    const { params: { id } = {} } = match || {};
    const { customer, customerPhone, sellPrice: productSellPrice, quantity: productQuantity, total, productWarehouseId = {} } = productSold;

    useEffect(() => {
        if (id) {
            dispatch(getProductSoldDetail(id));
        }
        dispatch(getMyWarehouseList());
        return function cleanup() {
            dispatch(resetProductSoldDetail());
        };
    }, []);

    useEffect(() => {
        if (id) return
        const firstItem = myWarehouseList?.[0];
        setProductWarehouseValue({ value: firstItem?.id, label: `${firstItem?.warehouseProductName}${firstItem?.color && ` - ${firstItem?.color}`}` });
        handleSetSellPriceByProductSelected(firstItem?.id);
    }, [myWarehouseList]);

    useEffect(() => {
        if (!id) return
        setProductWarehouseValue({ value: productWarehouseId?._id, label: `${productWarehouseId?.warehouseProductName}${productWarehouseId?.color && ` - ${productWarehouseId?.color}`}` });
        setTotalValue(total)
        setSellPrice(productSellPrice)
        setQuantity(productQuantity)
    }, [productSold]);

    const handleChangeQuantity = (event, value = 0) => {
        setTotalValue(parseInt(value) * sellPrice);
        setQuantity(parseInt(value));
    }

    const handleChangePrice = (event, value = 0) => {
        setSellPrice(parseInt(value));
        setTotalValue(quantity * parseInt(value));
    }

    const handleProductWarehouseChange = (options) => {
        setProductWarehouseValue(options);
        handleSetSellPriceByProductSelected(options?.value);
    }

    const handleSetSellPriceByProductSelected = (id) => {
        const sellPriceByProductSelected = myWarehouseList.find(item => item?.id == id)?.sellPrice;
        setSellPrice(sellPriceByProductSelected);
        setTotalValue(quantity * sellPriceByProductSelected);
    }

    const getMaxQuantity = () => {
        return myWarehouseList.find(item => item?.id == productWarehouseValue?.value)?.quantity || 1;
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                ...values,
                total: totalValue,
                productWarehouseId: productWarehouseValue?.value,
                inputDate: dateValue
            }
            if (!id) {
                dispatch(createProductSold(body));
            } else {
                const payload = {
                    id,
                    body
                }
                dispatch(updateProductSold(payload))
            }
        }
    };

    console.log({productWarehouseId})

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: 'Form Validation', path: '/forms/validation', active: true },
                        ]}
                        title={!id ? 'Thêm thông tin hàng đã bán' : 'Cập nhật thông tin hàng đã bán'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <AvForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={12} style={{ marginBottom: 19 }}>
                                                <p className="mb-1 font-weight-semibold">Tên hàng</p>
                                                <Select
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder="Chọn hàng"
                                                    onChange={handleProductWarehouseChange}
                                                    value={productWarehouseValue}
                                                    options={formatSelectInput(myWarehouseList, "warehouseProductName", true)}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <AvField
                                                    name="customer"
                                                    label="Tên người mua"
                                                    type="text"
                                                    value={customer}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <AvField
                                                    name="customerPhone"
                                                    label="Số điện thoại"
                                                    type="number"
                                                    value={customerPhone}
                                                    validate={{
                                                        minLength: {value: 10, errorMessage: 'SĐT phải là 10 số'},
                                                        maxLength: {value: 10, errorMessage: 'SĐT phải là 10 số'}
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={12}>
                                                <div className="form-group">
                                                    <label>Ngày</label> <br />
                                                    <div className="form-group mb-sm-0 mr-2">
                                                        <Flatpickr
                                                            value={dateValue}
                                                            onChange={date => { setDateValue(date) }}
                                                            className="form-control" />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="sellPrice"
                                                            label="Giá bán ra"
                                                            type="number"
                                                            onChange={handleChangePrice}
                                                            value={sellPrice}
                                                            validate={{
                                                                required: { value: true, errorMessage: "Vui lòng nhập giá bán" },
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="quantity"
                                                            label="Số lượng"
                                                            type="number"
                                                            onChange={handleChangeQuantity}
                                                            value={quantity}
                                                            validate={{
                                                                required: { value: true, errorMessage: "Vui lòng nhập số lượng" },
                                                                min: {value: 1, errorMessage: 'Số lượng phải lớn hơn hoặc bằng 1'},
                                                                max: {value: getMaxQuantity(), errorMessage: `Số lượng phải nhỏ hơn hoặc bằng ${getMaxQuantity()}`}
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={12}>
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
                                    </Col>
                                </Row>
                                <div className="text-md-right">
                                    <Button color="secondary" type="button" className="mr-2" onClick={() => goBack()}>
                                        Hủy bỏ
                                    </Button>
                                    <Button color="primary" type="submit">
                                        {id ? 'Cập nhật' : 'Thêm hàng'}
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

export default AddProductSold;
