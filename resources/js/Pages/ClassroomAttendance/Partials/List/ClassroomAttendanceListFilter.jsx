import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import useScrollableFilterBar from "@/Utils/FilterArrow";


const ClassroomAttendanceListFilter = () => {
    const [startDate, setStartDate] = useState(new Date());

    const attendanceGradeInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        attendance_grade_id: "",
        attendance_subject_id: "",
        attendance_mode_id: "",
        attendance_publish_id: "",
    });

    const attendanceFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.attendance_grade_id) {
                    reset("attendance_grade_id");
                    attendanceGradeInput.current.focus();
                }
            },
        });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-admission-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={attendanceFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: 8</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <InputLabel
                                                htmlFor="attendance_grade_id"
                                                value=""
                                            />
                                            <SelectInput
                                                id="attendance_grade_id"
                                                data_label="Grade"
                                                data={[]}
                                                ref={attendanceGradeInput}
                                                value={data.attendance_grade_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "attendance_grade_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.attendance_grade_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <InputLabel
                                                htmlFor="attendance_subject_id"
                                                value=""
                                            />
                                            <SelectInput
                                                id="attendance_subject_id"
                                                data_label="Subject"
                                                data={[]}
                                                value={data.attendance_subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "attendance_subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.attendance_subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Start date"
                                            />
                                        </div>
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingA text-white font-medium text-[14px] font-primary"
                                        type="button"
                                    >
                                        Mark All Present
                                    </PrimaryButton>
                                </div>
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-danger/80 text-white font-medium text-[14px] font-primary"
                                        type="button"
                                    >
                                        Mark All Absent
                                    </PrimaryButton>
                                </div>
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingB text-white font-medium text-[14px] font-primary"
                                        type="button"
                                    >
                                        Clear
                                    </PrimaryButton>
                                </div>
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-primary text-white font-medium text-[14px] font-primary"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClassroomAttendanceListFilter;
