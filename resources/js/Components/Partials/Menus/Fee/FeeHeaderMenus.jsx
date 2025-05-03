import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import FeeMobileNavs from './FeeMobileNavs';


const FeeHeaderMenus = ({ title }) => {
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
                                                    Fee Masters
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('fee.installment')}>
                                                    Fee Installments
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('category.fee_create_list')}>
                                                    Fee Category
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/type">
                                                    Fee Type
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/special-type">
                                                    Special Fee Type
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/assign-special-type"
                                                >
                                                    Assign Special Fee Type
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/remove-special-type"
                                                >
                                                    Remove Special Fee Type
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    // href={route('bank_account.list')}
                                                    href="/bank-accounts"
                                                >
                                                    Manage Bank Account
                                                </Dropdown.Link>

                                                <Dropdown.Link
                                                    href="/fee/create-class-fee-structure"
                                                >
                                                    Create Class Fee Structure
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/update-class-fee-structure"
                                                >
                                                    Update Student Fee Structure
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/assign-fee-to-student"
                                                >
                                                    Assign Fee Group To Students
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/update-fee-to-student"
                                                >
                                                    Update Student Fee Group
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/transfer-due-fee"
                                                >
                                                    Transfer Fee Due
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/fee-setting"
                                                >
                                                    Fee Setting
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
                                                    Cheque
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/cheque/manage">
                                                    Manage Cheques
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/cheque/pdc">
                                                    Fee PDC
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/cheque/allpdc">
                                                    Fee All PDC
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/cheque/bouncedreport">
                                                    Bounced Cheque Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/cheque/chequereport">
                                                    Cheque Date Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/cheque/clearancereport">
                                                    Cheque Clearance Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('fee_report.dashboard')}>Fee Reports</Link>
                                    </li>
                                    <li>
                                        <Link href="/fee/installment/payment">Fee Payment</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Import Fee
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/fee/import">
                                                    Import
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/import/history"
                                                >
                                                    Import History
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/import/previousdue"
                                                >
                                                    Import Previous Due
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
                                                    Concession
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/fee/discount">
                                                    Concession Templete
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/discount/student"
                                                >
                                                    Set Student Concession
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/discount/bulk">
                                                    Set Bulk Concession
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/discount/report">
                                                    Student Availing Concessions
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/discount/paid-report">
                                                    Paid Concession Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/discount/expected-report">
                                                    Expected Concession Report
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
                                                    Refund
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/fee/refund">
                                                    Refund Fee
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/report"
                                                >
                                                    Refund Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/cancel-report">
                                                    Refund Cancel Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/adjust">
                                                    Adjust Fee
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/adjust-report">
                                                    Adjust Fee Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/nullify">
                                                    Nullify Fee
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/fee/refund/nullify-report">
                                                    Nullify Fee Report
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
                                                    Voucher
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/fee/voucher/create">
                                                    Create Voucher
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/fee/vouchers"
                                                >
                                                    Voucher List
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/transport/vouchers">
                                                    Transport Voucher
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('fee.bulk_fee_payment')}>Bulk Fee Payment</Link>
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
            <FeeMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default FeeHeaderMenus;
