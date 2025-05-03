import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";



const DeletedRegistrationFilter = ({
    registrations,
    academicYears
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
        academic_year_id: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };

    const handleDateWiseData = (e) => {
        e.preventDefault
        router.post(route('admission_registration_report.deleted'), data)
    }

    return (
        <>
            <form onSubmit={CommonHeaderFilterData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Deleted Registration
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5  items-center">
                        <div className="educare-header-filtar-bar-countsdfs">
                            <span className="h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">Total: {registrations?.length}</span>
                        </div>
                        <div className="flex gap-2.5">
                            <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Select Year"
                                data={academicYears}
                                onChange={(e) =>{
                                    setData('academic_year_id', e.target.value)
                                }
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.select_year}
                                className="mt-2"
                            />
                            </div>
                            <div className="educare-filter-action-btn flex flex-wrap gap-2">
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                    >
                                        <button type='button'
                                            onClick={(e) => {
                                                handleDateWiseData(e)
                                            }}
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            className="educare-gray-btn-md-fill"
                                            href={route('admission_registration_report.deleted')}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DeletedRegistrationFilter;
