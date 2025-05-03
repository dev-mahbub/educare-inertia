import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import SalaryMobileNavs from './SalaryMobileNavs';

const SalaryHeaderMenu = ({ title }) => {

    {/* Toggle Mobile Navs function Start */}
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */}

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
                                                    Salary Masters
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/salary/paymentmonth">
                                                    Payment Month
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/earning">
                                                    Earnings
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/deduction">
                                                    Deductions
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/payscale">
                                                    Pay Scale
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/teacherearning">
                                                    Staff Earning/Deduction
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/importstaffearnings">
                                                    Import Earning/Deduction
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/incrementstaffsalary">
                                                    Increment
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/setting">
                                                    Salary Setting
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
                                                    Process Salary
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/salary/process">
                                                    Process Draft Salary
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/bulkprocess">
                                                    Bulk - Process Draft Salary
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/publish">
                                                    Publish Salary
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
                                                    Salary Report
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/salary/report/bankstatement">
                                                    Bank Statement
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/yearlystatement">
                                                    Yearly Bank Statement
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/cancelledreport">
                                                    Cancelled Statement
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/epf">
                                                    EPF Calculator
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/epf-wage">
                                                    EPF/EPF Wages Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/esi">
                                                    ESI Calculator
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/advance-payment">
                                                    Advance Payment Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/basic-salary">
                                                    Basic Salary Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/salary/report/payment">
                                                    Payment Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href="/salary/print-salary-slip">Print Salary Slip</Link>
                                    </li>
                                    <li>
                                        <Link href="/salary/advance-payment">Extra/Advance Payment</Link>
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
            <SalaryMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default SalaryHeaderMenu;