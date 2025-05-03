import React from "react";
import { Link } from '@inertiajs/react';
const FeeManagementReport = () => {
    return (
        <>
            <div className="fee-management-list-area">
                <div className="grid maxMd:grid-cols-1 maxLg:grid-cols-2 grid-cols-4 gap-5">
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Form Download</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-download"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('download.registration_form')}>Registration Form</Link>
                                </li>
                      
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Report Download</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-download"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('download_report.teachers_audit')}>Teacher Audit Report</Link>
                                </li>
                                <li>
                                    <Link href={route('download_report.parents_audit')}>Parent Audit Report</Link>
                                </li>
                                <li>
                                    <Link href={route('download_report.teachers_audit_summary')}>Teacher Audit Summary</Link>
                                </li>
                                <li>
                                    <Link href={route('download_report.teachers_parents_audit_list')}>Teacher Parent Audit List</Link>
                                </li>
                                <li>
                                    <Link href={route('download_report.parent_mobile_usage_report')}>Parent Mobile Usage Report</Link>
                                </li>
                                <li>
                                    <Link href={route('download.download_category_wise_report')}>Download Category Wise Report</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">List Download</h2>
                            </div>
                            <div className="fee-management-icon">
                            <span><i className="icon-download"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('fee_report.student_payments')}>Students</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.student_hostel_report')}>Teachers</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.student_head_wise_fee_report')}>Sibling</Link>
                                </li>
                                <li>
                                    <Link href={route('fee_report.student_ledger_report')}>Guardian</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fee-management-item">
                        <div className="fee-management-head">
                            <div className="fee-management-title-inner">
                                <h2 className="title">Certificate Download</h2>
                            </div>
                            <div className="fee-management-icon">
                                <span><i className="icon-download"></i></span>
                            </div>
                        </div>
                        <div className="fee-management-list">
                            <ul>
                                <li>
                                    <Link href={route('download.download_tc')}>Transfer Certificate(TC)</Link>
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
