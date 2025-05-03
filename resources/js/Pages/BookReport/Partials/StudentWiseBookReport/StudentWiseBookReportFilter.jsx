import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const StudentWiseBookReportFilter = ({
    studentIssusBookCount = 0,
    setLoading,
    classrooms = [],
    students = [],
}) => {
    const [filterStudent, setFilterStudent] = useState([]);
    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        student_id: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(false);
        router.post(route('book_report.student_wise_book'), data);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setLoading(false);
        router.get(route('book_report.student_wise_book'));
    }

    const handleStudent = (e, classroom_id) => {
        e.preventDefault();
        setData({
            ...data,
            classroom_id: classroom_id,
            student_id: "",
        })
        const filterStudents = students?.filter(item => item?.classroom_id == classroom_id);
        setFilterStudent(filterStudents);
    }

    //scrollable filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollable filter bar end here


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <div className="educare-card-title pb-none mb-2.5">
                                    <h5>
                                        <i className="icon-ChartBar"></i>
                                        Student wise book report
                                    </h5>
                                </div>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) => handleStudent(e, e.target.value)}
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="student_id"
                                                data_label="Student"
                                                data={filterStudent}
                                                value={data.student_id}
                                                onChange={(e) =>
                                                    setData("student_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
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
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handleSearch(e)}
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
                                        <button
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => handleReset(e)}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {/* Replace changeable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentWiseBookReportFilter;
