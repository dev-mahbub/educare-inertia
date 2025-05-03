import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const ExamListFilter = ({students, studentId, examSchedule}) => {

    const [startDate, setStartDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        student_id: "",
        exam_id: "",
    });

    const examFilterData = (e) => {
        e.preventDefault();
    };

    
    const studentChange = (e) => {
        const updatedData = { ...data, student_id: e.target.value };
        setData(updatedData);

        router.post(route("student.exam_schedule_list"), updatedData, {
            preserveScroll: true,
        });
    };

    const handleExamChange = (e) => {
        const updatedData = { ...data, exam_id: e.target.value };
        setData(updatedData);

        router.post(route("student.exam_schedule_list"), updatedData, {
            preserveScroll: true,
        });
    };

    const studentsList = students?.map(student => ({
        id: student.id,
        title: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
    })) || [];

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId
        }));
    }, [studentId]);

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-admission-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={examFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
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
                                        <div className="educare-card-title">
                                            <h5>
                                                Dear siblings
                                            </h5>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={studentsList}
                                                value={data.student_id}
                                                onChange={(e) => studentChange(e)}
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="exam_id"
                                                data_label="Publish"
                                                data={examSchedule}
                                                value={data.exam_id}
                                                onChange={(e) => handleExamChange(e)}
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExamListFilter;
