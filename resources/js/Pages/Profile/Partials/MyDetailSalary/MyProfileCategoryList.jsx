import { Link } from '@inertiajs/react';
import CategoryEventIcon from '../../../../../images/administrator/attendance-student.png';
import CategoryNewsIcon from '../../../../../images/administrator/leave.png';
import CategoryMessageIcon from '../../../../../images/administrator/student.png';
import CategoryBirthdayIcon from '../../../../../images/category/active.png';
import busIcon from "../../../../../images/category/teacher/bus.png";
import lampIcon from "../../../../../images/category/teacher/lamp.png";

const MyProfileCategoryList = ({siteData}) => {
    return (
        <div className="educare-academic-category mt-5">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage My Profile</h5>
            </div>
            { (siteData?.authRoles.indexOf("Super Admin") > -1 || siteData?.authRoles.indexOf("Admin") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_pay_slip || siteData?.isSuperAdmin) &&
                <Link href={route('profile.mydetail.salary')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Pay Slip</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_attendance || siteData?.isSuperAdmin) &&
                <Link href={route('profile.mydetail_attendance')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Attendance</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_manage_leave || siteData?.isSuperAdmin) &&
                <Link href={route('profile.mydetail_leave')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Leave</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_manage_your_profile || siteData?.isSuperAdmin) &&
                <Link href="/mydetail">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryMessageIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Your Profile</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }


            { (siteData?.authRoles.indexOf("Teacher") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_manage_leave || siteData?.isSuperAdmin) &&
                <Link href={route('profile.mydetail_leave')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Leave</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_attendance || siteData?.isSuperAdmin) &&
                <Link href={route('profile.mydetail_attendance')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Attendance</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_pay_slip || siteData?.isSuperAdmin) &&
                        <Link href={route('profile.mydetail.salary')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Pay Slip</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_transport_details || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={busIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Transport Details</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_extra_duty || siteData?.isSuperAdmin) &&
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={lampIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Extra Duty</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }
        </div>
    );
};

export default MyProfileCategoryList;
