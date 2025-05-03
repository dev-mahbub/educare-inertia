import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';

const HeadWiseTopBar = ({
    setFilterMode,
    filterMode,
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
        filter_mode: "",
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            filter_mode: filterMode
        }))
    }, [filterMode]);


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
                            Head Wise Fee summary
                        </h5>
                    </div>
                    <div className='ml-auto whitespace-nowrap'>
                        <div className="educare-create-school-settings-list-check">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="filter_mode"
                                    value="Head Wise Summary"
                                    checked={data.filter_mode === "head_wise"}
                                    onChange={() => setFilterMode('head_wise')}
                                />
                                <RadioInput
                                    name="filter_mode"
                                    value="Payment Mode Wise Summary"
                                    checked={data.filter_mode === "payment_mode_wise"}
                                    onChange={() => setFilterMode('payment_mode_wise')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        <div>
                            <Tooltip
                                title="Download Head Wise Fee Summary"
                                placement="top"
                                arrow
                            >
                                <a
                                    target="_blank"
                                    href={route('pdf_fee_demand_slip.head_wise_daily_fee_summary_report', params)}
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Download Summary"
                                placement="top"
                                arrow
                            >
                                <a
                                    target="_blank"
                                    href={route('pdf_fee_demand_slip.head_wise_daily_summary_report', params)}
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Download Summary"
                                placement="top"
                                arrow
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.head_wise_daily_fee_summary_report', params)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default HeadWiseTopBar;
