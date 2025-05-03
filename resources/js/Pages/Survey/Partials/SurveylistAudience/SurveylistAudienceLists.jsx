import { Link } from "@inertiajs/react";
import React from "react";

const SurveylistAudienceLists = () => {
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
                        href="#"
                        className=" transition ease-in-out duration-150 educare-primary-btn-md-fill"
                    >
                        <i className="icon-PlusCircle"></i>
                        Add New Survery
                    </Link>
                </div>
            </div>
            {/* card */}
            <div className="bg-white/70 mt-5 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="divSurveyList">
                    <h3 className="font-semibold">Test Parent</h3>
                    <small>
                        <strong> Created on: </strong> 21 January, 2024
                        <strong> Audience: </strong> Parent
                    </small>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                    <Link
                        href="#"
                        className="transition ease-in-out duration-150 educare-warning-btn-md-fill"
                    >
                        Edit
                    </Link>
                    <Link
                        href="#"
                        className=" transition ease-in-out duration-150 educare-success-btn-md-fill"
                    >
                        Design Survey
                    </Link>
                    <Link
                        href="#"
                        className=" transition ease-in-out duration-150 educare-primary-btn-md-fill"
                    >
                        Preview Take Survey
                    </Link>
                    <Link
                        href="#"
                        className=" transition ease-in-out duration-150 educare-danger-btn-md-fill"
                    >
                        Delete
                    </Link>
                    <div className="col-span-3">
                        <div className="educare-toggle-checkbox-button-styles educare-toggle-checkbox-button-styles-two">
                            <input
                                id="dummy_toggle_radio_2"
                                name="dummy_toggle_radio_2"
                                type="checkbox"
                                className="rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary"
                            />
                            <label htmlFor="dummy_toggle_radio_2">
                                <span className="on">Close</span>
                                <span className="off">Open</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SurveylistAudienceLists;
