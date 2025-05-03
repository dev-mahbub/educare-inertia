import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const SubjectWiseFilter = ({
    classrooms,
    subjects,
    exams = [],
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    fullMinMark,
    grade,
    classWiseData
}) => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [params, setParams] = useState({});

    useEffect(() => {
        setParams({
            classroom_id: data?.classroom_id ?? "",
            subject_id: data?.subject_id ?? "",
            exam_id: data?.exam_id ?? "",
        });
    }, [data]);

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

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route("exam.enter_marks"), data);
    };

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route("exam.enter_marks"));
    };

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here


    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto flex flex-wrap gap-1.5">
                                <span>
                                    Full Marks:{" "}
                                    {fullMinMark?.full_mark
                                        ? fullMinMark?.full_mark
                                        : 0}
                                </span>
                                <span>
                                    Pass Marks:{" "}
                                    {fullMinMark?.pass_mark
                                        ? fullMinMark?.pass_mark
                                        : 0}
                                </span>
                                {grade?.scale_name ? (
                                    <span>{grade?.scale_name}</span>
                                ) : (
                                    ""
                                )}
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
                                {classWiseData?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                target="_blank"
                                                href={route('export_excel.subject_mark', params)}
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => handleReset(e)}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-secondary-btn-md-fill"
                                        type="button"
                                    >
                                        <button
                                            onClick={(e) => {
                                                handleSearch(e);
                                            }}
                                        >
                                            Get Marks
                                        </button>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectWiseFilter;
