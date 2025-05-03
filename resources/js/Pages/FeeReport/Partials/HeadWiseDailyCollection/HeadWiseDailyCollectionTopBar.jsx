import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';

const HeadWiseDailyCollectionTopBar = ({
    setSortBy,
    sortBy,
    totalReportCount,
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
        sort_by: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            sort_by: sortBy
        }))
    },[sortBy])

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
                             Head Wise Daily Collection
                        </h5>
                    </div>
                    <div className='ml-auto whitespace-nowrap'>
                        <div className="educare-create-school-settings-list-check">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="sort_by"
                                    value="Receipt No"
                                    checked={data.sort_by === "receipt_no"}
                                    onChange={() => {
                                            setData("sort_by", "receipt_no")
                                            setSortBy("receipt_no")
                                        }
                                    }
                                />
                                <RadioInput
                                    name="sort_by"
                                    value="Receipt Date"
                                    checked={data.sort_by === "receipt_date"}
                                    onChange={() =>  {
                                            setData("sort_by", "receipt_date")
                                            setSortBy("receipt_date")
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {totalReportCount > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('export_excel.head_wise_daily_collection', params)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Download Fee Daily Collection By Fee Wise"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('pdf_fee_demand_slip.daily_collection_fee_head_wise', params)}
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                    }
                </div>
            </form>
            <div className='mb-5'></div>
        </>
    );
};

export default HeadWiseDailyCollectionTopBar;
