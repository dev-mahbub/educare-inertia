import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTimeTableHeader = ({
    classrooms,
    schoolShifts,
    classroomPeriods,
    timetableData
}) => {

    const[params, setParams] = useState({});

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
        school_shift_id: "",
        timetables: []
    });

    useEffect(() => {
        setParams({
            classroom_id: data.classroom_id ?? "",
            school_shift_id: data.school_shift_id ?? ""
        });
    }, [data.classroom_id, data.school_shift_id]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            timetables: timetableData
        }));
    }, [timetableData]);

    // handle change classroom start
    const handleClassroomChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: value
        }));

        const form_data = {
            classroom_id: value,
            school_shift_id: data.school_shift_id ?? ""
        }

        router.post(route('timetable.create'), form_data);
    }
    // handle change classroom end

    // handle change school shift start
    const handleSchoolShiftChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            school_shift_id: value
        }));

        const form_data = {
            classroom_id: data?.classroom_id ?? "",
            school_shift_id: value
        }

        router.post(route('timetable.create'), form_data);
    }
    // handle change school shift end

    // handle save timetable start
    const handleSaveTimetable = (e) => {
        e.preventDefault();

        if(!data?.classroom_id) {
            toast.error("Please select class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(!data?.school_shift_id) {
            toast.error("Please select shift.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('timetable.save'), {
                onSuccess: () => {
                    const form_data = {
                        classroom_id: data.classroom_id ?? "",
                        school_shift_id: data.school_shift_id ?? ""
                    }

                    router.post(route('timetable.create'), form_data);
                }
            });
        }
    };
    // handle save timetable end

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
                    <form onSubmit={handleSaveTimetable}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title pb-none">
                                <h5>
                                    Create Class Time Table
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {classroomPeriods?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    handleClassroomChange(e.target.value)
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
                                {(data?.classroom_id && data?.school_shift_id) &&
                                    <>
                                        <div>
                                            <Tooltip
                                                title="Download Teacher Time Table"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                href={route('pdf_timetable.classroom_timetable_report', params)}
                                                    target="_blank"
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                                type="submit"
                                            >
                                                Save Time Table
                                            </PrimaryButton>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTimeTableHeader;
