import { Tooltip } from '@mui/material';

const StudentHeadWiseFeeReportTopbar = ({
    totalReportCount,
    params
}) => {
    return (
        <>
            <div>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student Head Wise Fee Report
                        </h5>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {totalReportCount > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('export_excel.student_head_wise_fee_report', params)}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }

                        {totalReportCount > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Pdf"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('pdf_fee_demand_slip.student_head_wise_fee_report', params)}
                                        target="_blank"
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentHeadWiseFeeReportTopbar;
