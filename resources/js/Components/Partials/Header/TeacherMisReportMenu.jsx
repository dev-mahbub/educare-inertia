import { Link } from "@inertiajs/react";
import MisReportIconOne from '../../../../images/mis-report/attendance.svg';
import MisReportIconThree from '../../../../images/mis-report/class-work.svg';
import MisReportIconSix from '../../../../images/mis-report/enter-marks.svg';
import MisReportIconEight from '../../../../images/mis-report/exam-attendance.svg';
import MisReportIconSeven from '../../../../images/mis-report/exam-remark.svg';
import MisReportIconNine from '../../../../images/mis-report/exam-report.svg';
import MisReportIconTwo from '../../../../images/mis-report/homework.svg';
import MisReportIconFour from '../../../../images/mis-report/lesson.svg';
import MisReportIconTen from '../../../../images/mis-report/student-report.svg';
import MisReportIconFive from '../../../../images/mis-report/syllabus.svg';

const TeacherMisReportMenu = ({title}) => {
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
                    <div className="educare-mis-report-category educare-mis-report-category-teacher">
                        <ul>
                            <li><Link href={route('classroom_attendance.take_attendance')}><i><img src={MisReportIconOne} alt="Enrollment" /></i> Student Attendance</Link></li>
                            <li><Link href={route('homework.list')}><i><img src={MisReportIconTwo} alt="Fees" /></i> Homework</Link></li>
                            <li><Link href={route('classwork.list')}><i><img src={MisReportIconThree} alt="Accountancy" /></i> Classwork</Link></li>
                            <li><Link href={route('lesson_plan.list')}><i><img src={MisReportIconFour} alt="Students" /></i> Lesson Plan</Link></li>
                            <li><Link href={route('academic_syllabus.list')}><i><img src={MisReportIconFive} alt="Employees" /></i> Syllabus</Link></li>
                            <li><Link href={route('exam.enter_marks')}><i><img src={MisReportIconSix} alt="Transportation" /></i> Enter Marks</Link></li>

                            <li><Link href={route('exam.remarks')}><i><img src={MisReportIconSeven} alt="Transportation" /></i> Exam Remark</Link></li>
                            <li><Link href={route('exam_attendance.list')}><i><img src={MisReportIconEight} alt="Transportation" /></i> Exam Attendance</Link></li>
                            <li><Link href={route('academic_report.exam_wise_report')}><i><img src={MisReportIconNine} alt="Transportation" /></i> Exam Wise Report</Link></li>
                            <li><Link href={route('fee_report.teacher.student_due_report')}><i><img src={MisReportIconTen} alt="Transportation" /></i> Student Dues Report</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherMisReportMenu;
