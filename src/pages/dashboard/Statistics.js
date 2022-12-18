// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = () => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Tổng tiền nhập hàng"
                        title="$2100"
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '10.21%'
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Tổng tiền bán hàng"
                        title="1065"
                        colors={['#f77e53']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Phí vận chuyển"
                        title="11"
                        colors={['#43d39e']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '25.16%'
                        }}></StatisticsChartWidget>
                </Col>
                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Số lượng khách hàng"
                        title="750"
                        colors={['#ffbe0b']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>
                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Chi phí phát sinh"
                        title="750"
                        colors={['#ffbe0b']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
            <Row>
                <Col md={12} xl={8}>
                    <StatisticsChartWidget
                        description="Tổng lợi nhuận"
                        title="750"
                        colors={['#ffbe0b']}
                        isTotal={true}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
