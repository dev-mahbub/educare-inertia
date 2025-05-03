import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import DownloadMobileNavs from './DownloadMobileNavs'

const DownloadHeaderMenus = ({ title }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            <div className='educare-mis-report-menu-area bg-white'>
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
                                        <Link href={route('download.registration_form')}>Registration Form</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Audit Reports
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('download_report.teachers_audit')}>
                                                    Teacher Audit Report
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('download_report.parents_audit')}>
                                                    Parent Audit Report
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('download_report.teachers_audit_summary')}>
                                                    Teacher Audit Summary
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('download_report.teachers_parents_audit_list')}>
                                                    Teacher Parent Audit List
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('download_report.parent_mobile_usage_report')}>
                                                    Parent Mobile Usage Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('download.student')}>Student</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Teacher
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('download.teacher_download')}>
                                                    Download
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('download.sibling')}>Sibling</Link>
                                    </li>
                                    <li>
                                        <Link href={route('download.guardian')}>Guardian</Link>
                                    </li>
                                    <li>
                                        <Link href={route('download.download_tc')}>Download TC</Link>
                                    </li>
                                    <li>
                                        <Link href={route('download.download_category_wise_report')}>Download Category Wise Report</Link>
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
            <DownloadMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default DownloadHeaderMenus;
