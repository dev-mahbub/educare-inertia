import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const ExamWiseReportFilter = ({
    classrooms = [],
    exams = [],
    examData
}) => {
    const [params, setParams] = useState({});
    const [filteredExams, setFilteredExams] = useState([]);

    const { data, setData, errors } = useForm({
        classroom_id: "",
        exam_id: "",
        // with_converted_marks: "",
        // with_round_off: "",
    });

    useEffect(() => {
        setParams(() => ({
            classroom_id:data?.classroom_id ?? "",
            exam_id:data?.exam_id ?? ""
        }));
    }, [data]);

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

    const handeSearchField = (e) => {
        e.preventDefault();
        router.post(route("academic_report.exam_wise_report"), data);
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
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Exam Wise Report
                                </h5>
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
                                                data={Object.values(classrooms)}
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
                                                data_label="Exam"
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
                                        {/* <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="with_converted_marks"
                                                    name="with_converted_marks"
                                                    checked={
                                                        data.with_converted_marks
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "with_converted_marks",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="with_converted_marks"
                                                    value="With Converted Marks"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="with_round_off"
                                                    name="with_round_off"
                                                    checked={
                                                        data.with_round_off
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "with_round_off",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="with_round_off"
                                                    value="With Round Off"
                                                />
                                            </div>
                                        </div> */}
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
                                            onClick={(e) => handeSearchField(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {Object.keys(examData)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.exam_wise', params)}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                {Object.keys(examData)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download PDF"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('pdf_generator.print_academic_exam_wise_report', params)}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
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
                                        <Link
                                            href={route('academic_report.exam_wise_report')}
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

export default ExamWiseReportFilter;
