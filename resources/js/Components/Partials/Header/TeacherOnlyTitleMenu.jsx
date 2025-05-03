import React from "react";
import { Link } from "@inertiajs/react";
import MisReportIconOne from '../../../../images/mis-report/attendance.svg'
import MisReportIconTwo from '../../../../images/mis-report/homework.svg'
import MisReportIconThree from '../../../../images/mis-report/class-work.svg'
import MisReportIconFour from '../../../../images/mis-report/lesson.svg'
import MisReportIconFive from '../../../../images/mis-report/syllabus.svg'
import MisReportIconSix from '../../../../images/mis-report/enter-marks.svg'
import MisReportIconSeven from '../../../../images/mis-report/exam-remark.svg'
import MisReportIconEight from '../../../../images/mis-report/exam-attendance.svg'
import MisReportIconNine from '../../../../images/mis-report/exam-report.svg'
import MisReportIconTen from '../../../../images/mis-report/student-report.svg'

const TeacherOnlyTitleMenu = ({title}) => {
    return (
        <div className="educare-mis-report-menu-area">
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className="icon-details text-white"></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

export default TeacherOnlyTitleMenu;
