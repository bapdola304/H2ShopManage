import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import FileUploader from '../../components/FileUploader';
import Select from 'react-select';

import PageTitle from '../../components/PageTitle';

const AddGoods = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/validation' },
                            { label: 'Form Validation', path: '/forms/validation', active: true },
                        ]}
                        title={'Thêm hàng'}
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
                                        <AvField name="firstname" label="First Name" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="firstname" label="First Name" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-1 font-weight-semibold">Single Selection</p>
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
                                        <AvField name="firstname" label="First Name" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="firstname" label="First Name" type="text" required />
                                    </Col>
                                    <Col md={6}>
                                        <AvField name="firstname" label="First Name" type="text" required />
                                    </Col>
                                </Row>
                                <FileUploader
                                    onFileUpload={files => {
                                        console.log(files);
                                    }}
                                />
                                <div className="text-md-right">
                                    <Button color="primary" type="submit">
                                        Submit
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

export default AddGoods;
