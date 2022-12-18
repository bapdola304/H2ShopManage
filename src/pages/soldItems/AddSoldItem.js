import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import FileUploader from '../../components/FileUploader';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import PageTitle from '../../components/PageTitle';
import { VNDCurrencyFormatting } from '../../helpers/format';

const AddSoldItem = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: 'Form Validation', path: '/forms/validation', active: true },
                        ]}
                        title={'Thêm thông tin hàng đã bán'}
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
                                        <AvField name="customer" label="Tên người mua" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="price" label="Giá bán" type="number" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="phoneNumber" label="SĐT người mua" type="number" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="quantity" label="Số lượng" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Tên mặt hàng</p>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={[
                                                { value: 'chocolate', label: 'Chocolate' },
                                                { value: 'strawberry', label: 'Strawberry' },
                                                { value: 'vanilla', label: 'Vanilla' },
                                            ]}></Select>
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="total" label="Thành tiền" type="text" value={VNDCurrencyFormatting(30000)} disabled={true} style={{fontWeight: 700}} />
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

export default withRouter(AddSoldItem);
