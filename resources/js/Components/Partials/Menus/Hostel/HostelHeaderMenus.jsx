import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import HostelMobileNavs from './HostelMobileNavs'

const HostelHeaderMenus = ({ title }) => {
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
                                        <Link href={route('hostel.setup_hostel')}>Setup Hostel</Link>
                                    </li>
                                    <li>
                                        <Link href={route('hostel.allocation')}>Allocation</Link>
                                    </li>
                                    <li>
                                        <Link href={route('hostel.deallocation')}>Deallocation</Link>
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
                                                <Dropdown.Link href={route('hostel_report.class_summary')}>
                                                    Class Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel_report.allocation')}>
                                                    Allocation Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel_report.deallocation')}>
                                                    Deallocation Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel_report.staff_allocation')}>
                                                    Staff Allocation Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('hostel_room.list')}>Room Type</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Gate Pass
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('hostel.gate_pass')}>
                                                    Student Safety Gate Pass
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel.gate_pass_class_wise')}>
                                                    Class wise Gate Pass
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Hostel Fee
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('hostel.fee_group')}>
                                                    Hostel Fee Group
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel.voucher')}>
                                                    Hostel Voucher
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('hostel.assign_fee')}>
                                                    Assign Hostel Fee To Student
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
            <HostelMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default HostelHeaderMenus;
