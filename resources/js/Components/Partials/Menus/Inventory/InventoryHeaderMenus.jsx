import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';
import InventoryMobileNavs from './InventoryMobileNavs';

const InventoryHeaderMenus = ({ title = '' }) => {
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
                                                    Stock master
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('category.product_list')}>
                                                    Stock group
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('sale_group.list')}
                                                >
                                                    Sale group
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('create_single_product.list')}
                                                >
                                                    Add single product
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('create_multiple_product.list')}
                                                >
                                                    Add multi product
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('opening_stock_product.list')}
                                                >
                                                    Set opening stock
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('set_sale_price.create_list')}
                                                >
                                                    Set sale price
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('uom.list')}
                                                >
                                                    Unit of measurement
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('infra_level.create_list')}
                                                >
                                                    Infra level
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('product_production.list')}
                                                >
                                                    Production
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('product_consumption.list')}
                                                >
                                                    Consumption
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('product_vendor.list')}
                                                >
                                                    Add vendor
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('import_item.create_list')}
                                                >
                                                    Import item
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
                                                    Account Master
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('account_group.list')}>
                                                    Account group
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_voucher_type.list')}>
                                                    Voucher type
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger.list')}>
                                                    Add ledger
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('student_teacher_ledger.list')}>
                                                    Make All Students/Teachers As Ledger
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger_search.list')}>
                                                    Ledger search
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('company.list')}>
                                                    Add company
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('account_setting_show')}>
                                                    Account setting
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
                                                    Transaction
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('product_purchase.list')}>
                                                    Purchase
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('student_sale.create')}>
                                                    Sale for student
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('teacher_sale.create')}>
                                                    Sale for teacher
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('student_sale_return.create')}>
                                                    Sale return for student
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('teacher_sale_return.create')}>
                                                    Sale return for teacher
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger_payment')}>
                                                    Payment
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger_receipt')}>
                                                    Receipt
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('sale_due_payment')}>
                                                    Sale due payment
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('bulk_wallet.list')}>
                                                    Bulk wallet deduction
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('journal.create')}>
                                                    Journal
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
                                                    Account Report
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('ledger_payment_report.list')}>
                                                    Payment report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger_receipt_report.list')}>
                                                    Receipt report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ledger_report.list')}>
                                                    Ledger report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('date_wise_payment_receipt.list')}>
                                                    Head wise Payment/Receipt Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('day_book_report.list')}>
                                                    Day book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('group_summary_report.list')}>
                                                    Group summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('cancelled_payment_receipt.list')}>
                                                    Payment/Receipt Cancelled Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('trial_balance_report.list')}>
                                                    Trial balance
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('cash_book_report.list')}>
                                                    Cash book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('journal.journal_report')}>
                                                    Journal Register
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
                                                    Inventory Report
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('purchase_report.list')}>
                                                    Purchase register
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('purchase_summary_report.list')}>
                                                    Purchase summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('sale_register_report.list')}>
                                                    Sale register
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('sale_return_report.list')}>
                                                    Sale return register
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('sale_summary_report.list')}>
                                                    Sale Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_report.list')}>
                                                    Product report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_transaction_report.list')}>
                                                    Product transaction report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_sale_report.list')}>
                                                    Product wise sale Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('party_sale_report.list')}>
                                                    Party wise Sale Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('due_paid_report.list')}>
                                                    Sale Due/Paid Report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('consolidated_sale_report.list')}>
                                                    Consolidated sale report
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
                                                    Inventory Allocation
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('product_staff_allocation.create')}>
                                                    Product allocation
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('allocation_summary.list')}>
                                                    Allocation summary
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('allocation_report.list')}>
                                                    Allocation wise report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_return.list')}>
                                                    Issued product return
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('product_return_report.list')}>
                                                    Product return report
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
                                                    Asset Allocation
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('allocate_product_location.list')}>
                                                    Allocate product to location
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('allocate_product_location_report.list')}>
                                                    Product location report
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('location_product.list')}>
                                                    Location Wise Product List
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    {/* <li>
                                    <Link href={route('student.list')}>Students</Link>
                                </li> */}
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
            <InventoryMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default InventoryHeaderMenus;
