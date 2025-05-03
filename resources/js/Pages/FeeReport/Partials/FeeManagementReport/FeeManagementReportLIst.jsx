import { Link } from '@inertiajs/react';
const FeeManagementReport = () => {
    return (
        <>
            <div className="fee-management-list-area">
                <div className="grid maxMd:grid-cols-1 maxLg:grid-cols-2 grid-cols-4 gap-5">
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Collection</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-Coins"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('fee_report.daily_collection')}>Daily Collection Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.head_wise_daily_collection')}>HeadWise Daily Collection</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.head_wise_daily_summary')}>HeadWise Daily Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.yearly_head_wise_paid_summary')}>Yearly HeadWise Paid Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.date_wise_class_summary')}>Date Wise Class / Installment Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.complete_paid_report')}>Complete Paid Report</Link>
                                </li>
                                <li className="hidden">
                                    <Link href={route('fee_report.online_fee_transaction')}>Online Fee Transaction</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Dues</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-ArrowClockwise"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('fee_report.yearly_head_wise_dues_summary')}>Yearly HeadWise Dues Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.outstanding_due_summary')}>Student Due Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.complete_outstanding_dues')}>Complete Outstanding Dues</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.consolidated_dues_report')}>Consolidated Dues Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.fee_student_followup')}>Fee Student Follow Up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Student</h2>
                            </div>
                            <div className="fee-management-icon">
                            <span><i className="icon-student"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('fee_report.student_payments')}>Student Payments</Link>
                                </li>
                                <li className="hidden">
                                    <Link href={route('fee_report.student_hostel_report')}>Student Hostel Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.student_head_wise_fee_report')}>Student Head Wise Fee Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.student_ledger_report')}>Student Ledger Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.fee_agreement')}>Fee Agreement</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">General</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-bill"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('fee_report.class_wise_summary')}>Class / Installment Wise Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.fee_cancellation_report')}>Fee Cancellation Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.summary_report')}>Summary Report</Link>
                                </li>
                                <li className="hidden">
                                    <Link href={route('fee_report.daily_online_fee_payment')}>Daily Online Fee Payment</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.special_fee_type_report')}>Special Fee Type Report</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.guardian_wise_due_report')}>Guardian Wise Due Report</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeeManagementReport;
