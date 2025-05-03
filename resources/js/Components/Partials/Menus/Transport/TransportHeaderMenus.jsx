import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import TransportMobileNavs from './TransportMobileNavs'

const TransportHeaderMenus = ({ title }) => {

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
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Master
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('area.list')}>
                                                    Area
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('vehicle.list')}>
                                                    Vehicle
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('vehicle_staff.list')}>
                                                    Vehicle Staff
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
                                                    Allocation
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('transport.allocation')}>
                                                    Transport Allocation
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport.allocation_bulk')}>
                                                    Bulk Transport Allocation
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Route Management <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('transport_route.list')}>
                                                    Routes
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_stoppage.list')}>
                                                    Stoppage List
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_stoppage.create')}>
                                                    Add New Stoppage
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Report <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('transport_report.route_summary')}>
                                                    Route Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.stoppage_summary')}>
                                                    Stoppage Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.areawise_summary')}>
                                                    Area Wise Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.route_stoppages')}>
                                                    Route Stoppages
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.vehiclewise_report')}>
                                                    Vehicle Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.classwise_report')}>
                                                    Class Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.student_payment_details')}>
                                                    Student Payment Report
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('transport_report.teacher_transport_report')}>
                                                    Teacher Transport Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.drivers_log_book')}>
                                                    Driver's Log Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.driver_log_book_report')}>
                                                    Driver's Log Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.update_transport_fee')}>
                                                    Update Transport Fee
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.vehicle_summary')}>
                                                    Vehicle Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport_report.routewise_due_report')}>
                                                    Route Wise Due
                                                </Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li className='educare-dropdown-menu-width-220'>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2">
                                                    Setting <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('transport.fee_setting')}>
                                                    Transport Fee Setting
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport.voucher_setting')}>
                                                    Create Transport Voucher
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('transport.voucher_due_setting')}>
                                                    Transport Voucher Due
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('transport_report.track_your_vehicle')}> Track Bus</Link>
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
            <TransportMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default TransportHeaderMenus;
