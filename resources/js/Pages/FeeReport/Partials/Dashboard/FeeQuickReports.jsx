import { Link } from '@inertiajs/react';
import React from 'react';
const FeeQuickReports = () => {
    return (
        <div className='educare-quick-report-area mb-[20px]'>
            <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x[0]">
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-mis-report-item">
                        <div className='content'>
                            <h4 className='title'>Collection </h4>
                            <div className="content-menu">
                                <ul>
                                    <li className="pt-5 pb-2">
                                        <Link href={route('fee_report.daily_collection')}>Daily Collection Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.head_wise_daily_collection')}>HeadWise Daily Collection</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.head_wise_daily_summary')}>HeadWise Daily Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.yearly_head_wise_paid_summary')}>Yearly HeadWise Paid Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.date_wise_class_summary')}>Date Wise Class / Installment Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.complete_paid_report')}>Complete Paid Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.online_fee_transaction')}>Online Fee Transaction</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-mis-report-item">
                        <div className='content'>
                            <h4 className='title'>Dues</h4>
                            <div className="content-menu">
                                <ul>
                                    <li className="pt-1 pb-2">
                                        <Link href={route('fee_report.yearly_head_wise_dues_summary')}>Yearly HeadWise Dues Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.outstanding_due_summary')}>Student Due Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.complete_outstanding_dues')}>Complete Outstanding Dues</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.consolidated_dues_report')}>Consolidated Dues Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.fee_student_followup')}>Fee Student Follow Up</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-mis-report-item">
                        <div className='content'>
                            <h4 className='title'>Student</h4>
                            <div className="content-menu">
                                <ul>
                                    <li className="pt-1 pb-2">
                                        <Link href={route('fee_report.student_payments')}>Student Payments</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.student_hostel_report')}>Student Hostel Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.student_head_wise_fee_report')}>Student Head Wise Fee Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.student_ledger_report')}>Student Ledger Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.fee_agreement')}>Fee Agreement</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-mis-report-item">
                        <div className='content'>
                            <h4 className='title'>General</h4>
                            <div className="content-menu">
                                <ul>
                                    <li className="pt-1 pb-2">
                                        <Link href={route('fee_report.class_wise_summary')}>Class / Installment Wise Summary</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.fee_cancellation_report')}>Fee Cancellation Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.summary_report')}>Summary Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.daily_online_fee_payment')}>Daily Online Fee Payment</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.special_fee_type_report')}>Special Fee Type Report</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={route('fee_report.guardian_wise_due_report')}>Guardian Wise Due Report</Link>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeQuickReports;