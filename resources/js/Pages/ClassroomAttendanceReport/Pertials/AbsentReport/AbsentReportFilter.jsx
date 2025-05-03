import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";

const AbsentReportFilter = ({
    setLoading,
    classNames = [],
    classrooms = [],
    boardingTypeArr = [],
    absentStudentsCount = '',
}) => {

    const [classroomData, setClassroomData] = useState([]);

    const {
        data,
        setData,
        errors,
    } = useForm({
        class_name_id: "",
        classroom_id: "",
        select_date: new Date(),
        absent_leave: "",
        boarding_type: "",
    });

    const handelClassName = (id) => {
        setData({
            ...data,
            "class_name_id" : id,
        });
        const filterClassrooms = classrooms?.filter((item) => item?.class_name_id == id);
        setClassroomData(filterClassrooms);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('classroom_attendance_report.absent_report'), data);
        setLoading(false);
    }

    const handleReset = () => {
        router.get(route('classroom_attendance_report.absent_report'));
        setLoading(false);
    }

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
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {absentStudentsCount}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="class_name_id"
                                                data_label="Class"
                                                data={classNames}
                                                value={data.class_name_id}
                                                onChange={(e) =>
                                                    handelClassName(e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Section"
                                                data={classroomData}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={data?.select_date && new Date(data?.select_date)}
                                                onChange={(date) =>
                                                    setData("select_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Select date"
                                                className="w-full"
                                            />
                                        </div>
                                        {/* <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="absent_leave"
                                                data_label="Status"
                                                data={[]}
                                                value={data.absent_leave}
                                                onChange={(e) =>
                                                    setData("absent_leave", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.absent_leave}
                                                className="mt-2"
                                            />
                                        </div> */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="boarding_type"
                                                data_label="Scholar"
                                                data={boardingTypeArr}
                                                value={data.boarding_type}
                                                onChange={(e) =>
                                                    setData("boarding_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.boarding_type}
                                                className="mt-2"
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
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                            type="button"
                                            onClick={(e) => handleSearch(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
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
                                            href="#"
                                            className="educare-gray-btn-md-fill"
                                            type="button"
                                            onClick={(e) => handleReset(e)}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AbsentReportFilter;
