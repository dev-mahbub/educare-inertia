import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const StudentAgeReportFilter = ({
    studentCount = '',
    setLoading,
    setParams
}) => {
    const {
        data,
        setData
    } = useForm({
        selected_date: new Date(),
        min_age: 0,
        max_age: 10,
    });

    useEffect(() => {
        setParams({
            selected_date: data?.selected_date ?? "",
            min_age: data?.min_age ?? 0,
            max_age: data?.max_age ?? 0,
        });
    },[data]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student_report.student_age_report'), data);
            setLoading(false);
        }
    }

    const handleReset = () => {
        router.get(route('student_report.student_age_report'));
        setLoading(false);
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
                                <span>Total: {studentCount}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changeable inputs */}
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={data?.selected_date}
                                                onChange={(date) =>
                                                    setData("selected_date", date)
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
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="min_age"
                                                value={data.min_age}
                                                onChange={(e) => setData("min_age", e.target.value)}
                                                placeHolder="Min age"
                                                type="number"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="max_age"
                                                value={data.max_age}
                                                onChange={(e) => setData("max_age", e.target.value)}
                                                placeHolder="Max age"
                                                type="number"
                                                className="block"
                                            />
                                        </div>
                                        {/* Replace changeable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                {/* Replace changeable buttons */}
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
                                            onClick={handleSearch}
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
                                            onClick={handleReset}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
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

export default StudentAgeReportFilter;
