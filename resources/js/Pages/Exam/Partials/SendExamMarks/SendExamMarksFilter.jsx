import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const SendExamMarksFilter = ({
    totalCount,
    exams = [],
    classrooms = [],
    studentSubject = [],
}) => {
    const [filteredExams, setFilteredExams] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        exam_id: "",
    });

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        setFilteredExams(
            exams?.filter(
                (item) =>
                    item?.classrooms?.find((item) => item?.id == id)?.id == id
            )
        );

        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            exam_id: "",
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route("exam.send_exam_marks", data));
    };

    const handleReset = (e) => {
        reset();
    };

    const sendExamMarksData = (e) => {
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

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="educare-card-title leading-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Send Exam Marks
                    </h5>
                </div>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total Student: {totalCount}</span>
                                </div>
                                {/* delete count if don't need */}
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
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        handleClassroomChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Scheduled Test"
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
                                            {/* Replace changable inputs */}
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
                                    {/* Replace changable buttons */}
                                    <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleSearch(e)}
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </div>
                                        <div> 
                                            <Tooltip
                                                title="Reset"
                                                placement="top"
                                                arrow
                                                as="button">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleReset(e)}
                                                    className="educare-gray-btn-md-fill">
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendExamMarksFilter;
