import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const CompleteOutstandingDuesTopbar = ({
    totalCount,
    params
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
        staffType: "",
    });

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Complete Outstanding Dues
                </h5>
            </div>
            <form onSubmit={CommonHeaderFilterTopData}>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-header-filtar-bar-count mr-auto">
                        <span>Total: {totalCount}</span>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {totalCount > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target='_blank'
                                        href={route('export_excel.complete_outstanding_due_report', params)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }

                        {totalCount > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Pdf"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target='_blank'
                                        href={route('pdf_fee_demand_slip.complete_outstanding_due_report', params)}
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                    </div>
                </div>
            </form>
            <div className='mb-5'></div>
        </>
    );
};

export default CompleteOutstandingDuesTopbar;
