import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const SetExamRemarkFilter = ({
    exams,
    classrooms,
    examId,
    setExamId,
    setLoading,
    data,
    setData,
    getFormField
}) => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState({});

    const handleClassNameChange = (event) => {
        const classroom_id = event.target.value;

        const selectedClass = Object.values(classrooms)?.find(
            (item) => item?.id == classroom_id
        );
        setSelectedClassroom(selectedClass);
        setFilteredExams(
            exams?.filter((item) => selectedClass?.exam_ids?.includes(item?.id))
        );
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            class_name_id: selectedClass?.class_name_id,
        }));
    };

    const handleExamChange = (event) => {
        setExamId(event.target.value);

        setData((prevData) => ({
            ...prevData,
            exam_id: event.target.value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form_data = {
            exam_id: examId,
            class_name_id: selectedClassroom?.class_name_id,
            classroom_id: selectedClassroom?.id,
        };
        router.post(route("exam.remarks"), form_data);
        setLoading(false);
    };

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <div>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Exam Remarks
                                    </h5>
                                </div>
                            </div>
                            {getFormField?.length > 0 &&
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn !order-1 ml-auto maxMd:ml-0">
                                    <div>
                                        <button
                                            type="submit"
                                            className="educare-primary-btn-md-fill"
                                        >
                                            All Save
                                        </button>
                                    </div>
                                </div>
                            }
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap">
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
                                                data={Object.values(classrooms)}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    handleClassNameChange(e)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Scheduled Test"
                                                data={filteredExams}
                                                value={data.exam_id}
                                                onChange={(e) =>
                                                    handleExamChange(e)
                                                }
                                                type="text"
                                                className="block"
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
                                {/* Replace changable buttons */}
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            onClick={(e) => handleSearch(e)}
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
                                        as="button"
                                    >
                                        <Link
                                            href={route("exam.remarks")}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetExamRemarkFilter;
