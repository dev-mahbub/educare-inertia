import React from 'react';
import MisReportIconOne from '../../../../images/mis-report/admission.png'
import MisReportIconTwo from '../../../../images/mis-report/fees.png'
import MisReportIconThree from '../../../../images/mis-report/accounts.png'
import MisReportIconFour from '../../../../images/mis-report/student.png'
import MisReportIconFive from '../../../../images/mis-report/staffs.png'
import MisReportIconSix from '../../../../images/mis-report/transport.png'
import { Link } from '@inertiajs/react';

const MisReportMenu = () => {
    return (
        <div className='educare-mis-report-menu-area'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className="icon-details text-white"></i>
                        <h4>Quick Reports</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <ul>
                            <li><Link href={route('admission.mis_report')}><i><img src={MisReportIconOne} alt="Enrollment" /></i> Enrollment</Link></li>
                            <li><Link href={route('fee.mis_report')}><i><img src={MisReportIconTwo} alt="Fees" /></i> Fees</Link></li>
                            <li><Link href={route('inventory.mis_report')}><i><img src={MisReportIconThree} alt="Accountancy" /></i> Accountancy</Link></li>
                            <li><Link href={route('student.mis_report')}><i><img src={MisReportIconFour} alt="Students" /></i> Students</Link></li>
                            <li><Link href={route('staff.mis_report')}><i><img src={MisReportIconFive} alt="Employees" /></i> Employees</Link></li>
                            <li><Link href={route('transport.mis_report')}><i><img src={MisReportIconSix} alt="Transportation" /></i> Transportation</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisReportMenu;
