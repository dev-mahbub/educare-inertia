import React from 'react';
import chatIcon from '../../../../images/icon/chat.png'
import MisReportIconOne from '../../../../images/mis-report/admission.png'
import MisReportIconTwo from '../../../../images/mis-report/fees.png'
import MisReportIconThree from '../../../../images/mis-report/accounts.png'
import MisReportIconFour from '../../../../images/mis-report/student.png'
import MisReportIconFive from '../../../../images/mis-report/staffs.png'
import MisReportIconSix from '../../../../images/mis-report/transport.png'
import { Link } from '@inertiajs/react';

const TeacherDashboardMisReport = () => {
    return (
        <div className='educare-mis-report-menu-area'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i><img src={chatIcon} alt="" /></i>
                        <h4>Financial</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <ul>
                            <li><Link href={route('admission.mis_report')}><i><img src={MisReportIconOne} alt="Admission" /></i> Admission</Link></li>
                            <li><Link href={route('fee.list')}><i><img src={MisReportIconTwo} alt="Fees" /></i> Fees</Link></li>
                            <li><Link href={route('account.list')}><i><img src={MisReportIconThree} alt="Accounts" /></i> Accounts</Link></li>
                            <li><Link href={route('student.list')}><i><img src={MisReportIconFour} alt="Student" /></i> Student</Link></li>
                            <li><Link href={route('staff.list')}><i><img src={MisReportIconFive} alt="Staffs" /></i> Staffs</Link></li>
                            <li><Link href={route('transport.list')}><i><img src={MisReportIconSix} alt="Transport" /></i> Transport</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardMisReport;