import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr'
import { withRouter } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import { dateFormat, formatSelectInput, isEmpty, setFieldValue, VNDCurrencyFormatting } from '../../helpers/format';
import { getProductsType } from '../../redux/productType/actions';
import { getWarehouseList } from '../../redux/warehouse/actions';
import { createProductForWarehouse, getMyWarehouseDetail, resetActionSuccess, resetMyWarehouseDetail, updateProductWarehouse } from '../../redux/myWarehouse/actions';
import { DATE_FORMAT } from '../../constants/common';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import * as FeatherIcon from 'react-feather';
import Dialog from '../../components/Dialog';
import { createProduct, getProducts, resetActionSuccess as resetProductActionSuccess, resetProductCreatedData } from '../../redux/product/actions';

var rowId = 1;

const AddGoods = (props) => {
    const defaultColorsAndQuantity = [{ id: rowId, quantityName: `quantity${rowId}`, colorName: `color${rowId}`, quantity: '' }];
    const [warehouseValue, setWarehouseValue] = useState({});
    const [productTypeValue, setProductTypeValue] = useState({});
    const [productValue, setProductValue] = useState({});
    const [dateValue, setDateValue] = useState(new Date());
    const [totalValue, setTotalValue] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    var [colorAndQuantity, setColorAndQuantity] = useState(defaultColorsAndQuantity);

    const dispatch = useDispatch();
    const { items: productsType = [] } = useSelector(state => state.productType);
    const { warehouseList = [] } = useSelector(state => state.warehouse);
    const { productOfWarehouse = {}, isSuccess } = useSelector(state => state.myWarehouse);
    const { products = [], isSuccess: isSuccessCreateProduct, productCreated } = useSelector(state => state.product);
    let form = null;
    const { match } = props;
    const { params: { id } = {} } = match || {};
    const { sellPrice, price: productPrice, quantity: productQuantity, total, product, warehouse, inputDate, colorAndQuantityData = [], productType } = productOfWarehouse;

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
        const firstItem = productsType?.[0];
        setProductTypeValue({ value: firstItem?.id, label: firstItem?.productName });
        dispatch(getProducts({ productTypeId: firstItem?.id }));
    }, [productsType]);

    useEffect(() => {
        if (!isEmpty(productCreated) && !isEmpty(products)) {
            setProductValue({ value: productCreated?.id, label: productCreated?.productName });
            dispatch(resetProductCreatedData());
            return;
        }
        if (id) {
            if(!isEmpty(product)) {
                setProductValue({ value: product?._id, label: product?.productName });
            }
            return;
        } else {
            const firstItem = products?.[0];
            setProductValue({ value: firstItem?.id, label: firstItem?.productName });
        }
    }, [products]);

    useEffect(() => {
        if (id) return
        const firstItem = warehouseList?.[0];
        setWarehouseValue({ value: firstItem?.id, label: firstItem?.warehouseName });
    }, [warehouseList]);

    useEffect(() => {
        if (!id || isEmpty(productOfWarehouse)) return
        dispatch(getProducts({ productTypeId: productType?._id }));
        setProductTypeValue({ value: productType?._id, label: productType?.productName });
        setWarehouseValue({ value: warehouse?._id, label: warehouse?.warehouseName });
        setTotalValue(total);
        setPrice(productPrice);
        setQuantity(productQuantity);
        setDateValue(inputDate);
        const newColorAndQuantity = colorAndQuantityData.map(item => {
            return { id: item?._id, quantityName: `quantity${item?._id}`, colorName: `color${item?._id}`, quantity: item?.quantity, color: item?.color }
        })
        setColorAndQuantity(newColorAndQuantity);
        const totalQuantity = newColorAndQuantity.map(item => item?.quantity).reduce((a, b) => a + b, 0);
        setQuantity(totalQuantity);
        setTotalValue(totalQuantity * productPrice);
    }, [productOfWarehouse]);

    useEffect(() => {
        if (!isSuccess) return;
        form && form.reset();
        setQuantity(0);
        setPrice(0);
        setTotalValue(0);
        setColorAndQuantity(defaultColorsAndQuantity);
        dispatch(resetActionSuccess())
    }, [isSuccess]);

    useEffect(() => {
        if (!isSuccessCreateProduct) return;
        setIsOpenDialog(false);
        dispatch(getProducts({ productTypeId: productTypeValue?.value }));
        dispatch(resetProductActionSuccess())
    }, [isSuccessCreateProduct]);


    const handleWarehouseChange = (options) => {
        setWarehouseValue(options)
    }

    const handleProductTypeChange = (options) => {
        setProductTypeValue(options);
        dispatch(getProducts({ productTypeId: options?.value }));
        if (!id) {
            form && form.reset();
        }
    }

    const handleProductChange = (options) => {
        setProductValue(options)
    }

    const handleChangePrice = (event, value = 0) => {
        setPrice(parseInt(value));
        setTotalValue(quantity * parseInt(value));
    }

    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                productId: productValue?.value,
                price: values?.price,
                sellPrice: values?.sellPrice,
                total: totalValue,
                warehouseId: warehouseValue?.value,
                productTypeId: productTypeValue?.value,
                inputDate: dateFormat(dateValue, DATE_FORMAT.YYYY_MM_DD),
                colorAndQuantityData: getColorAndQuantityData(values)
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

    const getColorAndQuantityData = (values) => {
        return colorAndQuantity.map(item => {
            return {
                color: values[`color${item?.id}`],
                quantity: values[`quantity${item?.id}`]
            }
        })
    }

    const handleAddColorAndQuantity = () => {
        rowId++;
        setColorAndQuantity([...colorAndQuantity, { id: rowId, quantityName: `quantity${rowId}`, colorName: `color${rowId}`, quantity: 0 }])
    }

    const handleChangeQuantity = (event, value, rowChange) => {
        const newColorAndQuantity = colorAndQuantity.map(item => {
            if (item?.id == rowChange?.id) {
                item.quantity = parseInt(value == '' ? 0 : value)
            }
            return item;
        });
        const totalQuantity = setTotalQuantity(newColorAndQuantity);
        setTotalValue(totalQuantity * price);
    }

    const renderColorAndQuantity = () => {
        return colorAndQuantity.map((item, index) => {
            return (
                <Row>
                    <Col md={5}>
                        <AvField name={item?.colorName} label="Phân loại" type="text" value={setFieldValue(item?.color)} />
                    </Col>
                    <Col md={5}>
                        <AvField
                            name={item?.quantityName}
                            label="Số lượng"
                            type="number"
                            value={item?.quantity}
                            onChange={(event, value) => handleChangeQuantity(event, value, item)}
                            validate={{
                                required: { value: true, errorMessage: "Vui lòng nhập số lượng" },
                                min: { value: 1, errorMessage: 'Số lượng phải lớn hơn hoặc bằng 1' }
                            }}
                        />
                    </Col>
                    {index > 0 && (
                        <Col md={2} className="clear-row-button">
                            <a onClick={() => handleDeleteRow(item?.id)} class="clear-button" title="clear" data-clear>
                                <FeatherIcon.X />
                            </a>
                        </Col>
                    )}
                </Row>
            )
        })
    }

    const handleDeleteRow = (rowId) => {
        const newData = colorAndQuantity.filter(item => item?.id !== rowId);
        setColorAndQuantity(newData);
        setTotalQuantity(newData);
    }

    const setTotalQuantity = (data = []) => {
        const totalQuantity = data.map(item => item?.quantity).reduce((a, b) => a + b, 0);
        setQuantity(totalQuantity);
        return totalQuantity;
    }

    const handleSubmitProduct = (event, errors, values) => {
        if (!errors.length) {
            const body = {
                ...values,
                productTypeId: productTypeValue?.value
            }
            dispatch(createProduct(body));
        }
    };

    const handleCancel = () => {
        setIsOpenDialog(false)
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
                        title={id ? 'Cập nhật thông tin hàng' : 'Nhập hàng'}
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
                                                    <label className="font-weight-semibold">Nơi nhập hàng</label>
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        placeholder="Chọn nơi nhập hàng"
                                                        onChange={handleWarehouseChange}
                                                        value={warehouseValue}
                                                        options={formatSelectInput(warehouseList, "warehouseName")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className="form-group">
                                                    <label className="font-weight-semibold">Loại mặt hàng</label>
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        placeholder="Chọn loại mặt hàng"
                                                        onChange={handleProductTypeChange}
                                                        value={productTypeValue}
                                                        options={formatSelectInput(productsType, "productName")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={10}>
                                                        <div className="form-group">
                                                            <label className="font-weight-semibold">Tên mặt hàng</label>
                                                            <Select
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                placeholder="Chọn tên mặt hàng"
                                                                onChange={handleProductChange}
                                                                value={productValue}
                                                                options={formatSelectInput(products, "productName")}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={2} className='add-product-button'>
                                                        <Button color="primary" type="button" onClick={() => setIsOpenDialog(true)} >
                                                            Thêm
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={12}>
                                                <label style={{ marginTop: 32 }}>Thêm màu sắc và số lượng: <label onClick={handleAddColorAndQuantity} className='add-color-quantity-button btn-primary'>Thêm</label></label>
                                                {renderColorAndQuantity()}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={12}>
                                                <div className="form-group">
                                                    <label>Ngày</label>
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
                                                        <Col md={12}>
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
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col md={12}>
                                                <AvField
                                                    name="totalQuantity"
                                                    label="Tổng số lượng"
                                                    type="number"
                                                    value={quantity}
                                                    disabled={true}
                                                    style={{ fontWeight: 700 }}
                                                />
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
            <Dialog
                visible={isOpenDialog}
                title={"Thêm mặt hàng"}
                onCancel={handleCancel}
                isShowFooter={false}
            >
                <AvForm onSubmit={handleSubmitProduct}>
                    <Row>
                        <Col md={12}>
                            <AvField
                                name="productName"
                                label="Tên mặt hàng"
                                type="text"
                                validate={{
                                    required: { value: true, errorMessage: "Vui lòng nhập tên hàng" },
                                }}
                            />
                        </Col>
                    </Row>
                    <div style={{ float: "right", marginTop: 20 }}>
                        <Button
                            color="secondary mr-2"
                            onClick={handleCancel}
                        >
                            Hủy bỏ
                        </Button>
                        <Button color="primary" type="submit">
                            Thêm
                        </Button>
                    </div>
                </AvForm>
            </Dialog>
        </React.Fragment>
    );
};

export default withRouter(AddGoods);
