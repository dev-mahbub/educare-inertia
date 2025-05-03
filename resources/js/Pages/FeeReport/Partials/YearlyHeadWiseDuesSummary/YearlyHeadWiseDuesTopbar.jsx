import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const YearlyHeadWiseDuesTopbar = ({
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

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };

    return (
        <>
            <form onSubmit={CommonHeaderFilterTopData}>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Yearly Headwise Dues Fee
                        </h5>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        <div>
                            <Tooltip
                                title="Download Summary"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target='_blank'
                                    href={route('pdf_fee_demand_slip.yearly_head_wise_due_report', params)}
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
                                    target='_blank'
                                    href={route('export_excel.yearly_head_wise_due_report', params)}
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
            <div className='mb-5'></div>
        </>
    );
};

export default YearlyHeadWiseDuesTopbar;
