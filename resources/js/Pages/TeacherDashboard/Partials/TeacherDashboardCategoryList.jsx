import { Link } from '@inertiajs/react';
import CategoryBirthdayIcon from '../../../../images/category/birthday.png';
import CategoryEventIcon from '../../../../images/category/event.png';
import CategoryNewsIcon from '../../../../images/category/news.png';
import CategoryNoticeIcon from '../../../../images/category/notice.png';
import attendanceIcon from "../../../../images/category/teacher/attendance.png";
import documentIcon from "../../../../images/category/teacher/document.png";
import feeIcon from "../../../../images/category/teacher/fee.png";
import phoneIcon from "../../../../images/category/teacher/phone.png";
import rollIcon from "../../../../images/category/teacher/roll.png";
import detailsIcon from "../../../../images/category/teacher/student-details.png";

const TeacherDashboardCategoryList = ({siteData}) => {
    return (

        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Students</h5>
            </div>
            { (siteData?.authRoles.indexOf("Super Admin") > -1 || siteData?.authRoles.indexOf("Admin") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_admission || siteData?.isSuperAdmin) &&
                <Link href={route('admission.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Enrollment</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_salary || siteData?.isSuperAdmin) &&
                <Link href={route('salary.process')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>HR Management</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_accounts || siteData?.isSuperAdmin) &&
                <Link href={route('inventory.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Accountancy</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_fees || siteData?.isSuperAdmin) &&
                <Link href={route('fee.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNoticeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Fees</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }

            { (siteData?.authRoles.indexOf("Teacher") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { ( true || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={attendanceIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Student Attendance</h5>
                        </div>
                    </div>
                </Link>
                }
                { ( true || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={rollIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Assign Roll Number</h5>
                        </div>
                    </div>
                </Link>
                }
                { ( true || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={detailsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Students Details</h5>
                        </div>
                    </div>
                </Link>
                }
                { ( true || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={phoneIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Students Phone Number</h5>
                        </div>
                    </div>
                </Link>
                }
                { ( true || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={documentIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Students Documents</h5>
                        </div>
                    </div>
                </Link>
                }
                { ( true || siteData?.isSuperAdmin) &&
                <Link href={route('fee_report.teacher.student_due_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={feeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Students Fee Due</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }
        </div>
    );
};

export default TeacherDashboardCategoryList;
