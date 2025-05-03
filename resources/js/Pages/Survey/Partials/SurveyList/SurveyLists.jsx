import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const SurveyLists = ({
    surveys
}) => {

    // handle delete start
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('survey.destroy', id));
            }
        });
    }
    // handle delete end

    const [formData, setFormData] = useState(() => {
        let tempData = {};
        surveys?.forEach((item) => {
            tempData[item?.id] = {
                is_open: item?.is_open || false
            };
        });

        return tempData;
    });

    const handleToggleChange = (id, status) => {
        setFormData((prevData) => ({
            ...prevData,
            is_open: !prevData.is_open
        }));

        const form_data = {
            is_open: status
        }

        router.patch(route('survey.update_status', id), form_data);
    }
    return (
        <>
            <div className="flex justify-between items-center flex-wrap mb-5">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Survey
                    </h5>
                </div>
            </div>
            <div className="extraGroup_bgImg">
                <div className="add_new_survey">
                    <Link
                        href={route('survey.create')}
                        className=" transition ease-in-out duration-150 educare-primary-btn-md-fill"
                    >
                        <i className="icon-PlusCircle"></i>
                        Add New Survery
                    </Link>
                </div>
            </div>

            {/* card */}
            {surveys?.length > 0 &&
                surveys?.map((survey, index) => (
                    <div key={index} className="bg-white/70 mt-5 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="divSurveyList">
                            <h3 className="font-semibold">{survey?.title}</h3>
                            <small>
                                <strong> Created on: </strong> {survey?.created_on}
                                <strong> Audience: </strong> {survey?.survey_audience}
                            </small>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-5">
                            <Link
                                href={route('survey.edit', survey?.id)}
                                className="transition ease-in-out duration-150 educare-warning-btn-md-fill"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('survey.design', { survey_id: survey?.id })}
                                className=" transition ease-in-out duration-150 educare-success-btn-md-fill"
                            >
                                Design Survey
                            </Link>
                            <Link
                                href={route('survey.take_survey_preview', survey?.id)}
                                className=" transition ease-in-out duration-150 educare-primary-btn-md-fill"
                            >
                                Preview Take Survey
                            </Link>
                            <div className="col-span-3">
                                <div className="educare-list-button-field-styles">
                                    <Tooltip title="Delete" placement="top" arrow>
                                        <button
                                            className="ransition ease-in-out duration-150 educare-danger-btn-md-fill"
                                            onClick={() => handleDelete(survey?.id)}
                                        >
                                            Delete
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="educare-toggle-checkbox-button-styles educare-toggle-checkbox-button-styles-three">
                                    <input
                                        id={`toggle_radio_${survey?.id}`}
                                        name={`toggle_radio_${survey?.id}`}
                                        className="rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary"
                                        type="checkbox"
                                        checked={formData[survey.id].is_open}
                                        onChange={() => handleToggleChange(survey.id, !formData[survey.id].is_open)}
                                    />
                                    <label htmlFor={`toggle_radio_${survey?.id}`}>
                                        <span className={formData[survey.id].is_open ? 'on' : 'off'}>{formData[survey.id].is_open ? 'Open' : 'Close'}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default SurveyLists;
