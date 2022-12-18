import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap';

import imgNotFound from '../../assets/images/not-found.png';


class Error404 extends Component {

    componentDidMount() {
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        document.body.classList.remove('authentication-bg');
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={4} lg={5}>
                                <div className="text-center">
                                    <div>
                                        <img src={imgNotFound} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">Không tìm thấy trang</h3>
                                <p className="text-muted mb-5">Không tìm thấy trang. <br /> Bạn có thể đã nhập sai địa chỉ hoặc trang có thể đã bị xóa.</p>

                                <Link to="/" className="btn btn-lg btn-primary mt-4">Quay lại trang chủ</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Error404;