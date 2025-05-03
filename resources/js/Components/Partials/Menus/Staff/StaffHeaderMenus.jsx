import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import StaffMobileNavs from './StaffMobileNavs'
import Dropdown from '@/Components/Dropdown';

const StaffHeaderMenus = ({ title }) => {

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
                                        <Link href={route('staff.list')}><i className='icon-alert'></i>Active Staffs</Link>
                                    </li>
                                    <li>
                                        <Link href={route('staff.inactive_list')}><i className='icon-alert'></i> Inactive Staffs</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Download <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('download.teacher_download')}>Teacher</Dropdown.Link>
                                                <Dropdown.Link href={route('download_report.teachers_audit')}>Teacher Audit Report</Dropdown.Link>
                                                <Dropdown.Link href={route('download_report.teachers_audit_summary')}>Teacher Audit Summary</Dropdown.Link>
                                                <Dropdown.Link href={route('download_report.teachers_parents_audit_list')}>Teacher Parent Audit List</Dropdown.Link>
                                                <Dropdown.Link href={route('download.all_menus')}>All Downloads</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('import.staff_create')}><i className='icon-upload'></i>Import</Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={route('staff.create')}><i className='icon-PlusCircle'></i>Create Staff</Link>
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
            <StaffMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default StaffHeaderMenus;
