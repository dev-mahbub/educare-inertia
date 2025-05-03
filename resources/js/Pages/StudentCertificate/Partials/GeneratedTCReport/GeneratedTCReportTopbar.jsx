import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const GeneratedTCReportTopbar = ({
    params,
    generatedTcLength
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
            <form onSubmit={CommonHeaderFilterTopData} className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Generated TC Report
                        </h5>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        {generatedTcLength > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('export_excel.generated_tc_report', params)}
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

export default GeneratedTCReportTopbar;
