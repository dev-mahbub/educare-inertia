import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const SetClassWorkingFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_month: "",
        select_year: "",
    });
    const headerTopData = (e) => {
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
        <form onSubmit={headerTopData}>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-WarningCircle"></i>
                        Set class wise working days.
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_month"
                            data_label="Month"
                            data={[]}
                            value={data.select_month}
                            onChange={(e) =>
                                setData("select_month", e.target.value)
                            }
                            className="block"
                        />
                        <InputError
                            message={errors.select_month}
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_year"
                            data_label="Year"
                            data={[]}
                            value={data.select_year}
                            onChange={(e) =>
                                setData("select_year", e.target.value)
                            }
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
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </Link>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-gray-btn-md-fill"
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SetClassWorkingFilter;
