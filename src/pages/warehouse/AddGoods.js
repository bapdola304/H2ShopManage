import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import FileUploader from '../../components/FileUploader';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import { VNDCurrencyFormatting } from '../../helpers/format';

const AddGoods = (props) => {

    const [multiValue, setMultiValue] = useState([]);

    const handleMultiChange = (options) => {
        setMultiValue(options)
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
                                        <AvField name="placeOfEntry" label="Nơi nhập hàng" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="price" label="Đơn giá" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Tên mặt hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            isMulti
                                            onChange={handleMultiChange}
                                            value={multiValue}
                                            options={getMutilOptions()}></Select>
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="quantity" label="Số lượng" type="number" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="itemColor" label="Màu sắc" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="total" label="Thành tiền" type="number" value={VNDCurrencyFormatting(30000)} disabled={true} style={{fontWeight: 700}} />
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
