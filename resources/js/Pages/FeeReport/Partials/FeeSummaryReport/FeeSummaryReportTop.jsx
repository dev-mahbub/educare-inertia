import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const FeeSummaryReportTop = ({
    params,
    feeSummaryReport
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
    });

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={CommonHeaderFilterTopData}>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Summary Report
                        </h5>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        {Object.keys(feeSummaryReport)?.length > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('export_excel.fee_summary_report', params)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default FeeSummaryReportTop;
