import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const CommonHeaderFilter = ({
    surveys,
    audienceTypes
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
        audience_type: "",
    });

    const headerTopData = (e) => {
        e.preventDefault();
    };

    // handle filter report start
    const handleFilterSurveyReport = (e) => {
        e.preventDefault();

        const form_data = {
            audience_type: data?.audience_type
        }

        router.post(route('survey.audiencewise_report'), form_data);
    }
    // handle filter report end


    return (
        <form onSubmit={headerTopData}>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Audience Wise Report
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div>
                        <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                            Total : {surveys?.length}
                        </span>
                    </div>
                    <div className="educare-select-field-styles">
                        <SelectInput
                            id="audience_type"
                            data_label="All Audience"
                            data={audienceTypes}
                            value={data.status}
                            onChange={(e) =>
                                setData('audience_type', e.target.value)
                            }
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.audience_type}
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
                                <button type="button"
                                    className="educare-secondary-btn-md-fill"
                                    onClick={handleFilterSurveyReport}
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CommonHeaderFilter;
