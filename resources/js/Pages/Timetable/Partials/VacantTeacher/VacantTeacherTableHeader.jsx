import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const VacantTeacherTableHeader = ({
    schoolShifts,
    schoolPeriods,
    totalTeacherCount
}) => {

    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
    } = useForm({
        school_shift_id: "",
        school_period_id: "",
    });

    useEffect(() => {
        setParams({
            school_shift_id: data?.school_shift_id ?? "",
            school_period_id: data?.school_period_id ?? ""
        });
    },[data]);

    // handle change school shift start
    const handleSchoolShiftChange = (value) => {
        const newData = {
            school_shift_id: value,
            school_period_id: ""
        }

        setData((prevData) => ({
            ...prevData,
            ...newData
        }));

        router.post(route('timetable.vacant_teacher'), newData);
    }
    // handle change school shift end

    // handle change school period start
    const handleSchoolPeriodChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            school_period_id: value
        }));

        const form_data = {
            school_shift_id: data?.school_shift_id,
            school_period_id: value
        }

        router.post(route('timetable.vacant_teacher'), form_data);
    }
    // handle change school period end

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
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span>Total Period: {totalTeacherCount}</span>
                        </div>
                        <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                            <div className="educare-header-filtar-bar-fields-area relative">
                                <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
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
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            data_label="Period"
                                            data={schoolPeriods}
                                            value={data.school_period_id}
                                            onChange={(e) =>
                                                handleSchoolPeriodChange(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.school_period_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                            </div>
                        </div>
                        <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                            {totalTeacherCount > 0 &&
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            href={route('export_excel.vacant_teacher_report', params)}
                                            target="_blank"
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacantTeacherTableHeader;
