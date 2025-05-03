import { Tooltip } from '@mui/material';

const DailyCollectionTopBar = ({
    params,
    totalReportCount
}) => {
    return (
        <>
            <div className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Daily Collection Report
                        </h5>
                    </div>
                    {totalReportCount > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            {/* Replace changable buttons */}
                            <div>
                                <Tooltip
                                    title="Download Fee Report Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('export_excel.daily_collection', params)}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Download Fee Report Pdf"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('pdf_fee_demand_slip.daily_collection_report', params)}
                                        target="_blank"
                                        className="educare-dark-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Download Installment Wise Fee Report"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('export_excel.installment_wise_daily_collection', params)}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            {/* Replace changable buttons */}
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default DailyCollectionTopBar;
