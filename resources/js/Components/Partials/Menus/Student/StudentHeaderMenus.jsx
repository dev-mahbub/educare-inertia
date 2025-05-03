import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import StudentMobileNavs from './StudentMobileNavs';

const StudentHeaderMenus = ({ title = '' }) => {
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
                                        <Link href={route('student.create')}>Create Student</Link>
                                    </li>
                                    <li>
                                        <Link href={route('student.list')}>Students List</Link>
                                    </li>
                                    <li>
                                        <Link href={route('student.search')}>Search</Link>
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
                                                <Dropdown.Link
                                                    href={route('student.summary')}>
                                                    Class Summery
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.custom_download')}>
                                                    Custom Download
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.predefined_download')}>
                                                    Pre-defined Download
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.parent_income')}>
                                                    Parent Income
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.ewsreport')}>
                                                    EWS
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.student_age_report')}>
                                                    Student Age Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.student_document_report')}
                                                >
                                                    Document Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.monthly_admission')}
                                                >
                                                    Monthly Admission Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_report.student_promoted_report')}
                                                >
                                                    Student Promoted Report
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
                                                    Certificate
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('student_certificate.student_certificate')}>
                                                    Student
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.teacher_certificate')}
                                                >
                                                    Teacher
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.certificate_list')}
                                                >
                                                    Certificate List
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.generated_certificate')}
                                                >
                                                    Generated Certificate
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.custom_id_card')}
                                                >
                                                    Custom ID CARD
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
                                                    TC
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('student_certificate.generate_tc')}>
                                                    Generate TC
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.tc_summary_report')}
                                                >
                                                    TC Summary Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student_certificate.generated_tc_report')}
                                                >
                                                    Generated TC Report
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
                                                    Inactive
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('student.make_inactive')}>
                                                    Make Student Inactive
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.inactive_list')}
                                                >
                                                    Inactive Student Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    {/*<li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Sibling
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Existing Sibling
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Posible Sibling
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>*/}
                                    <li>
                                        <Link href={route('student.upgrade')}>Upgrade</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Change Academics
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('student.change_status')}>
                                                    Change Status
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.change_class')}
                                                >
                                                    Change Class
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.change_section')}
                                                >
                                                    Change Section
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.change_duration')}
                                                >
                                                    Change Course Duration
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
                                                    Update Student
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('student.update_details')}>
                                                    Update Details
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.update_biometric')}
                                                >
                                                    Update Biometric
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('student.update_user_password')}
                                                >
                                                    Update User Password
                                                </Dropdown.Link><Dropdown.Link
                                                    href={route('student.bulk_upload_image')}
                                                >
                                                    Bulk Upload Student Image
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
            <StudentMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default StudentHeaderMenus;
