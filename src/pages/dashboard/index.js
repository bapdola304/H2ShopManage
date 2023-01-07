import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr'
import Statistics from './Statistics';
import { DATE_FORMAT } from '../../constants/common';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import * as FeatherIcon from 'react-feather';
import { getRevenue } from '../../redux/revenue/actions';
import { dateFormat } from '../../helpers/format';

const Dashboard = () => {

    const [dateValue, setDateValue] = useState(null);

    const dispatch = useDispatch();

    const handleDateChange = (date) => {
        console.log({date})
        setDateValue(date);
        if (date?.length === 2 || date === null) {
            const params = {
                fromDate: dateFormat(date?.[0], DATE_FORMAT.YYYY_MM_DD),
                toDate: dateFormat(date?.[1], DATE_FORMAT.YYYY_MM_DD)
            }
            dispatch(getRevenue(params));
        }
    }

    return (
        <React.Fragment>
            <div className="">
                <Row className="page-title align-items-center">
                    <Col sm={6} xl={8}>
                        <h4 className="mb-1 mt-0">Doanh thu Tiệm H2</h4>
                    </Col>
                    <Col sm={6} xl={4}>
                        <div className='date-wrapper'>
                            <Flatpickr
                                value={dateValue}
                                onChange={handleDateChange}
                                className="form-control"
                                placeholder='Chọn ngày'
                                options={
                                    {
                                        dateFormat: DATE_FORMAT.d_m_Y,
                                        locale: Vietnamese,
                                        mode: 'range'
                                    }
                                }
                            />
                            <a onClick={() => handleDateChange(null)} class="clear-button" title="clear" data-clear>
                                <FeatherIcon.X />
                            </a>
                        </div>
                    </Col>
                </Row>
                {/* stats */}
                <Statistics />

            </div>
        </React.Fragment>
    )
}


export default Dashboard;