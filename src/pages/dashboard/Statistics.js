// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';
import { getRevenue } from '../../redux/revenue/actions';
import { VNDCurrencyFormatting } from '../../helpers/format';

const Statistics = () => {

    const dispatch = useDispatch();
    const { revenueData = {} } = useSelector(state => state.revenue);
    const {
        totalAmountImportedProducts = 0,
        totalAmountImportedProductsSold = 0,
        totalOtherFees = 0,
        totalShippingFees = 0,
        totalProfit = 0,
        currentMoney = 0
    } = revenueData

    useEffect(() => {
        dispatch(getRevenue())
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Tổng tiền nhập hàng"
                        title={VNDCurrencyFormatting(totalAmountImportedProducts)}
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
                        title={VNDCurrencyFormatting(totalAmountImportedProductsSold)}
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
                        title={VNDCurrencyFormatting(totalShippingFees)}
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
                        description="Vốn ban đầu"
                        title={VNDCurrencyFormatting(totalOtherFees)}
                        colors={['#ffbe0b']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>
                <Col md={12} xl={4}>
                    <StatisticsChartWidget
                        description="Tổng lợi nhuận bán hàng"
                        title={VNDCurrencyFormatting(totalProfit)}
                        colors={['#ffbe0b']}
                        isTotal={true}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%'
                        }}></StatisticsChartWidget>
                </Col>
                <Col md={12} xl={4}>
                    <StatisticsChartWidget
                        description="Số tiền mặt hiện có"
                        title={VNDCurrencyFormatting(currentMoney)}
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
            <Row>
                <Col md={6} xl={4}>
                    <StatisticsChartWidget
                        description="Số lượng khách hàng"
                        title="50"
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
                        description="Số mặt hàng đã bảo hành"
                        title="10"
                        colors={['#ffbe0b']}
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
