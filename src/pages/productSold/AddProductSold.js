import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr'
import PageTitle from '../../components/PageTitle';
import { dateFormat, formatSelectInput, isEmpty, VNDCurrencyFormatting } from '../../helpers/format';
import { goBack } from '../../helpers/navigation';
import { getMyWarehouseList } from '../../redux/myWarehouse/actions';
import { createProductSold, getProductSoldDetail, resetActionSuccess, resetProductSoldDetail, updateProductSold } from '../../redux/productSold/actions';
import { DATE_FORMAT } from '../../constants/common';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import { getProductsType } from '../../redux/actions';

const AddProductSold = (props) => {

    const dispatch = useDispatch();
    const { myWarehouseList = [] } = useSelector(state => state.myWarehouse);
    const { productSold = {}, isSuccess } = useSelector(state => state.productSold);
    const { items: productsType = [] } = useSelector(state => state.productType);

    const [productWarehouseValue, setProductWarehouseValue] = useState({});
    const [dateValue, setDateValue] = useState(new Date());
    const [totalValue, setTotalValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [sellPrice, setSellPrice] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(99);
    const [productTypeValue, setProductTypeValue] = useState({});

    let form = null;
    const { match } = props;
    const { params: { id } = {} } = match || {};
    const { customer, customerPhone, sellPrice: productSellPrice, quantity: productQuantity, total, productWarehouseId = {}, inputDate, colorId } = productSold;

    useEffect(() => {
        if (id) {
            dispatch(getProductSoldDetail(id));
        }
        dispatch(getProductsType());
        return function cleanup() {
            dispatch(resetProductSoldDetail());
        };
    }, []);

    useEffect(() => {
        if (id) return
        const firstItem = productsType?.[0];
        setProductTypeValue({ value: firstItem?.id, label: firstItem?.productName });
        dispatch(getMyWarehouseList({ productTypeId: firstItem?.id }));
    }, [productsType]);


    useEffect(() => {
        if (id) return
        const firstItem = myWarehouseList?.[0];
        setProductWarehouseValue({ value: firstItem?.id, label: `${firstItem?.product?.productName}${(firstItem?.inputDate) ? ` - ${dateFormat(firstItem?.inputDate)}` : ''}` });
        handleSetSellPriceByProductSelected(firstItem?.id);
    }, [myWarehouseList]);

    useEffect(() => {
        if (!id || isEmpty(productSold)) return
        setProductWarehouseValue({ value: productWarehouseId?._id, label: productWarehouseId?.product?.productName });
        setTotalValue(total);
        setSellPrice(productSellPrice);
        setQuantity(productQuantity);
        setDateValue(inputDate);
        setProductTypeValue({ value: productWarehouseId?.productType?._id, label: productWarehouseId?.productType?.productName  })
        dispatch(getMyWarehouseList({ productTypeId: productWarehouseId?.productType?._id }));
    }, [productSold]);

    useEffect(() => {
        if (!isSuccess) return;
        form && form._inputs.customer.reset();
        form && form._inputs.customerPhone.reset();
        setQuantity(1);
        setTotalValue(sellPrice);
        dispatch(resetActionSuccess());
    }, [isSuccess]);

    useEffect(() => {
        if (isEmpty(productWarehouseValue)) return;
        const data = colorAndQuantityDataByProduct();
        if (data?.colorAndQuantityData.length === 1) {
            handleChangeColor(null, data?.colorAndQuantityData?.[0]?._id);
        }
    }, [productWarehouseValue]);

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

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                ...values,
                productWarehouseId: productWarehouseValue?.value,
                inputDate: dateFormat(dateValue, DATE_FORMAT.YYYY_MM_DD),
                total: totalValue,
                colorId: values.colorId || colorAndQuantityDataByProduct()?.colorAndQuantityData?.[0]?._id
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

    const renderColors = () => {
        const data = colorAndQuantityDataByProduct();
        return data?.colorAndQuantityData?.map(item => {
            return (
                <AvRadio customInput label={item?.color} value={item?._id} disabled={item?.quantity <= 0} />
            )
        })
    }

    const colorAndQuantityDataByProduct = () => {
        return myWarehouseList.find(item => item?.id === productWarehouseValue?.value);
    }

    const handleChangeColor = (e, value) => {
        const maxQuantity = colorAndQuantityDataByProduct()?.colorAndQuantityData.find(item => item?._id === value);
        setMaxQuantity(maxQuantity?.quantity);
    }

    const formatProrductSelectInput = (data = []) => {
        return data.map(item => {
            return {
                value: item.id,
                label: `${item?.product?.productName}${(item?.inputDate) ? ` - ${dateFormat(item?.inputDate)}` : ''}` 
            }
        })
    }

    const isShowClassify = () => {
       return (
        colorAndQuantityDataByProduct()?.colorAndQuantityData.length > 1 ||
        (colorAndQuantityDataByProduct()?.colorAndQuantityData.length == 1 && colorAndQuantityDataByProduct()?.colorAndQuantityData?.[0].color !== "" )
       )
    }

    const handleProductTypeChange = (options) => {
        setProductTypeValue(options);
        dispatch(getMyWarehouseList({ productTypeId: options?.value }));
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
                        title={!id ? 'Th??m th??ng tin b??n h??ng' : 'C???p nh???t th??ng tin b??n h??ng'}
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
                                        <Row>
                                        <Col md={12}>
                                                <div className="form-group">
                                                    <label className="font-weight-semibold">Lo???i m???t h??ng</label>
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        placeholder="Ch???n lo???i m???t h??ng"
                                                        onChange={handleProductTypeChange}
                                                        value={productTypeValue}
                                                        options={formatSelectInput(productsType, "productName")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12} style={{ marginBottom: 19 }}>
                                                <p className="mb-1 font-weight-semibold">T??n m???t h??ng</p>
                                                <Select
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder="Ch???n h??ng"
                                                    onChange={handleProductWarehouseChange}
                                                    value={productWarehouseValue}
                                                    options={formatProrductSelectInput(myWarehouseList)}
                                                />
                                            </Col>
                                            {isShowClassify() && (
                                                <Col md={12}>
                                                    <AvRadioGroup
                                                        inline
                                                        name="colorId"
                                                        label="Ph??n lo???i"
                                                        className="color-select"
                                                        value={colorId}
                                                        onChange={handleChangeColor}
                                                        validate={{
                                                            required: { value: true, errorMessage: "Vui l??ng ch???n lo???i" },
                                                        }}>
                                                        {renderColors()}
                                                    </AvRadioGroup>
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                        <Col md={12}>
                                                <Row>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="customer"
                                                            label="T??n ng?????i mua"
                                                            type="text"
                                                            value={customer}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="customerPhone"
                                                            label="S??? ??i???n tho???i"
                                                            type="number"
                                                            value={customerPhone}
                                                            validate={{
                                                                minLength: { value: 10, errorMessage: 'S??T ph???i l?? 10 s???' },
                                                                maxLength: { value: 10, errorMessage: 'S??T ph???i l?? 10 s???' }
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={12}>
                                                <div className="form-group">
                                                    <label>Ng??y</label> <br />
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
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="sellPrice"
                                                            label="Gi?? b??n ra"
                                                            type="number"
                                                            onChange={handleChangePrice}
                                                            value={sellPrice}
                                                            validate={{
                                                                required: { value: true, errorMessage: "Vui l??ng nh???p gi?? b??n" },
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            name="quantity"
                                                            label="S??? l?????ng"
                                                            type="number"
                                                            onChange={handleChangeQuantity}
                                                            value={quantity}
                                                            validate={{
                                                                required: { value: true, errorMessage: "Vui l??ng nh???p s??? l?????ng" },
                                                                min: { value: 1, errorMessage: 'S??? l?????ng ph???i l???n h??n ho???c b???ng 1' },
                                                                max: { value: maxQuantity, errorMessage: `S??? l?????ng ph???i nh??? h??n ho???c b???ng ${maxQuantity}` }
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={12}>
                                                <AvField
                                                    name="total"
                                                    label="Th??nh ti???n"
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
                                        H???y b???
                                    </Button>
                                    <Button color="primary" type="submit">
                                        {id ? 'C???p nh???t' : 'Th??m h??ng'}
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
