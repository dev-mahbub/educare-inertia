import React from 'react';
import categoryAlumniIcon from '../../../../images/administrator/alumni.png'
import categoryAttendanceStudentIcon from '../../../../images/administrator/attendance-student.png'
import categoryDocumentIcon from '../../../../images/administrator/document.png'
import categoryDownloadIcon from '../../../../images/administrator/download.png'
import categoryEnquiryIcon from '../../../../images/administrator/enquiry.png'
import categoryCalendarIcon from '../../../../images/administrator/calendar.png'
import categoryHelpDeskIcon from '../../../../images/category/administrator/helpdesk.png'
import categoryHostelDeskIcon from '../../../../images/category/administrator/hostel.png'
import categoryJopPostIcon from '../../../../images/category/administrator/jop-post.png'
import categoryLeaveIcon from '../../../../images/category/administrator/leave.png'
import categoryLibraryIcon from '../../../../images/category/administrator/library.png'
import categorySummaryIcon from '../../../../images/category/administrator/survey.png'
import categoryStudentIcon from '../../../../images/category/administrator/student.png'
import categorySurveyIcon from '../../../../images/category/administrator/survey.png'
import categoryAttendanceStaffsIcon from '../../../../images/category/administrator/student.png'
import categoryStaffsIcon from '../../../../images/category/administrator/student.png'
import categoryTeamIcon from '../../../../images/category/administrator/team.png'
import categoryTransportIcon from '../../../../images/category/administrator/transport.png'
import { Link } from '@inertiajs/react';

const AcademicCategoryList = ({siteData}) => {
    return (

        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Administrator</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                { (siteData?.authModules?.module_alumni || siteData?.isSuperAdmin) && 
                <Link href={route('alumni.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryAlumniIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Alumni</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_attendance_student || siteData?.isSuperAdmin) && 
                <Link href={route('classroom_attendance.take_attendance')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryAttendanceStudentIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Student Attendance</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_document || siteData?.isSuperAdmin) && 
                <Link href={route('document.dashboard')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryDocumentIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>School Documents</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_download || siteData?.isSuperAdmin) && 
                <Link href={route('download.registration_form')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryDownloadIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Reports Download</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_visitor_enquiry || siteData?.isSuperAdmin) && 
                <Link href={route('visitor_enquiry.list')}> 
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryEnquiryIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Visitor Enquiry</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_calendar || siteData?.isSuperAdmin) && 
                <Link href={route('event_calendar.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryCalendarIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Academic Calender</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_helpdesk || siteData?.isSuperAdmin) && 
                <Link href={route('support_ticket.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryHelpDeskIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Complaints</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_hostel || siteData?.isSuperAdmin) && 
                <Link href={route('hostel.setup_hostel')}> 
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryHostelDeskIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Boarding</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_post_jobs || siteData?.isSuperAdmin) && 
                <Link href={route('job.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryJopPostIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Employeer</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_leave || siteData?.isSuperAdmin) && 
                <Link href={route('leave.type')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryLeaveIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Leave</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_library || siteData?.isSuperAdmin) && 
                <Link href={route('library.message')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryLibraryIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Library</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_summary || siteData?.isSuperAdmin) && 
                <Link href={route('summary_report.summary_report')}> 
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categorySummaryIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Overall Summary</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_student || siteData?.isSuperAdmin) && 
                <Link href={route('student.list')}> 
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryStudentIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Students</h5>
                        </div>
                    </div>
                </Link> 
                }
                { (siteData?.authModules?.module_survey || siteData?.isSuperAdmin) && 
                <Link href={route('survey.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categorySurveyIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Feedback</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_attendance_staff || siteData?.isSuperAdmin) && 
                <Link href={route('staff_attendance.take_attendance')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryAttendanceStaffsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Employee Attendance</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_staffs || siteData?.isSuperAdmin) && 
                <Link href={route('staff.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryStaffsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Employees</h5>
                        </div>
                    </div>
                </Link> 
                }
                { (siteData?.authModules?.module_team || siteData?.isSuperAdmin) && 
                <Link href={route('team.team_manage')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryTeamIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Team</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_transport || siteData?.isSuperAdmin) && 
                <Link href={route('transport.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={categoryTransportIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Buses</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
        </div>
    );
};

export default AcademicCategoryList;