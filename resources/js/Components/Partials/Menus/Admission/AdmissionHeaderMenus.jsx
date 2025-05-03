import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import AdmissionMobileNavs from './AdmissionMobileNavs';

const AdmissionHeaderMenus = ({ title }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            <div className='educare-mis-report-menu-area'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <span className="hidden"><Link className="hidden" href='#'>Social Enquiry generation</Link></span>
                                    </li>

                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Admission Enquiry
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('admission_enquery_reg.enquiry_form')}>
                                                    Add Admission Enquiry
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/registration/enquiry/report"
                                                >
                                                    Admission Enquiry Report
                                                </Dropdown.Link>
                                                {/* <Dropdown.Link href="/admission/registration/enquiry/activity-report-datewise">
                                                    Activity Date Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/registration/enquiry/follow-report-datewise"
                                                >
                                                    Follow Date Wise Report
                                                </Dropdown.Link> */}
                                                <Dropdown.Link href="/admission/registration/enquiry/status-summary">
                                                    Admission Status Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/registration/enquiry/class-wise-summary"
                                                >
                                                    Admission Class Wise Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/registration/enquiry/registration-and-sourcebyreport"
                                                >
                                                    Registration & Source By Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Exam
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('admission_exam.set_exam_date')} >
                                                    Set Admission Exam Date
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_exam.change_selected_status')}>
                                                    Exam Change Status
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_exam.exam_summary')}>
                                                    Admission Exam Summary
                                                </Dropdown.Link>
                                                {/* <Dropdown.Link href={route('admission_exam.send_student_message')}>
                                                    Send Message
                                                </Dropdown.Link> */}
                                                <Dropdown.Link href={route('admission_exam.registration_marks_entry')}>
                                                    Enter Registration Subject Marks
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_exam.registration_exam_report')}>
                                                    Registration Exam Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('admission_enquery_reg.create_registration')}>New Registration</Link>
                                    </li>
                                    <li>
                                        <Link href={route('admission.registration_list')}>Registrations</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Report
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('admission_registration_report.registration_report')}>
                                                    Registration Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_registration_report.daily_collection')}>
                                                    Registration Daily Collection
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_registration_report.monthly_collection')}>
                                                    Registration Monthly Collection
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admission_registration_report.deleted')}>
                                                    Deleted Registration
                                                </Dropdown.Link>
                                                {/* <Dropdown.Link  href={route('admission_registration_report.due_Amount')}>
                                                    Due Registration Amount
                                                </Dropdown.Link> */}
                                                <Dropdown.Link href={route('admission_registration_report.daily_admission')}>
                                                    Daily Admission Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li className='educare-dropdown-menu-width-220'>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Masters
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/admission/process">
                                                    Start Admission Process
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/enquirysource"
                                                >
                                                    Admission Source
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/enquirystatus"
                                                >
                                                    Admission Enquiry Status
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/studenttype"
                                                >
                                                    Student Type Category
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/admission/registration/setting"
                                                >
                                                    Setting
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <AdmissionMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default AdmissionHeaderMenus;
