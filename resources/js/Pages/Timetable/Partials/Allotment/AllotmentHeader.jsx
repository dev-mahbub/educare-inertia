import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const AllotmentHeader = ({
    currentDate,
    schoolShifts,
    schoolPeriods,
    classNames
}) => {

    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
    } = useForm({
        class_name_id: "",
        school_shift_id: "",
    });

    useEffect(() => {
        setParams({
            class_name_id: data?.class_name_id ?? "",
            school_shift_id: data?.school_shift_id ?? ""
        });
    }, [data]);

    // handle class change start
    const handleClassChange = (value) => {
        setData((prevData) =>({
            ...prevData,
            class_name_id: value
        }));

        const form_data = {
            class_name_id: value,
            school_shift_id: data?.school_shift_id
        }

        router.post(route('timetable.allotment'), form_data);
    }
    // handle class change end

    // handle school shift change start
    const handleSchoolShiftChange = (value) => {
        setData((prevData) =>({
            ...prevData,
            school_shift_id: value
        }));

        const form_data = {
            class_name_id: data?.class_name_id,
            school_shift_id: value
        }

        router.post(route('timetable.allotment'), form_data);
    }
    // handle school shift change end

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
                    <div className="flex justify-between items-center mb-2.5 gap-5 flex-wrap">
                        <div className="educare-card-title pb-0">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Today Allotment
                            </h5>
                        </div>
                        <h5 className="bg-info px-4 py-[4px] text-white rounded-[6px] items-center">{currentDate}</h5>
                    </div>
                    <div className=" educare-header-filtar-bar-inner-main">
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span>Total: {schoolPeriods?.length}</span>
                        </div>
                        <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                            <div className="educare-header-filtar-bar-fields-area relative">
                                <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            data_label="Class"
                                            data={classNames}
                                            value={data.class_name_id}
                                            onChange={(e) =>
                                                handleClassChange(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.class_name_id}
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
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        href={route('export_excel.timetable_allotment_report', params)}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllotmentHeader;
