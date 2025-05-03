import React, { useState } from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const AbsentReportFilter = ({
    exams = [],
    classrooms = [],
    subjects = [],
    absentStudentDataLength = 0,
}) => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);

    const { data, setData, errors } = useForm({
        classroom_id: "",
        subject_id: "",
        exam_id: "",
    });

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        setFilteredSubjects(
            subjects?.filter((item) => item?.classroom_id == id)
        );
        setFilteredExams(
            exams?.filter(
                (item) =>
                    item?.classrooms?.find((item) => item?.id == id)?.id == id
            )
        );

        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: "",
            exam_id: "",
        }));
    };

    const handleFilter = (e) => {
        e.preventDefault();
        router.post(route("academic_report.absent"), data);
    };

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {absentStudentDataLength}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span
                                        className="educare-header-filter-prev"
                                        onClick={handlePrevClick}
                                    >
                                        <i className="icon-left-chevron"></i>
                                    </span>
                                    <div
                                        className="educare-header-filtar-bar-fields-wrap"
                                        ref={listRef}
                                        style={{
                                            transform: `translateX(-${
                                                currentIndex * 120
                                            }px)`,
                                        }}
                                    >
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) => handleClassroomChange(e.target.value)}
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Subject"
                                                data={filteredSubjects}
                                                value={data.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Scheduled"
                                                data={filteredExams}
                                                value={data.exam_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "exam_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.exam_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <span
                                        className="educare-header-filter-next"
                                        onClick={handleNextClick}
                                    >
                                        <i className="icon-chevron"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handleFilter(e)}
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AbsentReportFilter;
