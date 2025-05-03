import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

const TeacherTimetableHeader = ({
    teachers,
    schoolShifts,
    schoolPeriods
}) => {

    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_id: "",
        school_shift_id: ""
    });

    useEffect(() => {
        setParams({
            staff_id: data.staff_id ?? "",
            school_shift_id: data.school_shift_id ?? ""
        });
    }, [data.staff_id, data.school_shift_id]);

    // handle change classroom start
    const handleClassroomChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: value
        }));

        const form_data = {
            staff_id: value,
            school_shift_id: data.school_shift_id ?? ""
        }

        router.post(route('timetable.teacher_timetable'), form_data);
    }
    // handle change classroom end

    // handle change school shift start
    const handleSchoolShiftChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            school_shift_id: value
        }));

        const form_data = {
            staff_id: data?.staff_id ?? "",
            school_shift_id: value
        }

        router.post(route('timetable.teacher_timetable'), form_data);
    }
    // handle change school shift end

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <div className=" educare-header-filtar-bar-inner-main">
                        <div className="educare-card-title pb-none">
                            <h5>
                                Teacher Timetable
                            </h5>
                        </div>
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span>Total: {schoolPeriods?.length}</span>
                        </div>
                        <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                            <div className="educare-header-filtar-bar-fields-area relative">
                                <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            data_label="Teacher"
                                            data={teachers}
                                            value={data.staff_id}
                                            onChange={(e) =>
                                                handleClassroomChange(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.staff_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            data_label="Shift"
                                            data={schoolShifts}
                                            value={data.school_shift_id}
                                            onChange={(e) =>
                                                handleSchoolShiftChange(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.school_shift_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                            </div>
                        </div>
                        <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                            {(data?.staff_id && data?.school_shift_id) &&
                                <>
                                    <div>
                                        <Tooltip
                                            title="Download Teacher Time Table"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('pdf_timetable.teacher_timetable_report', params)}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherTimetableHeader;
