import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";


const RegistrationDailyCollectionFilter = ({
    registrationReport,
    academicYears,
    params,
    setParams,
    formatNumber
}) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        start_date: startDate,
        end_date: endDate,
        academic_year_id: "",
    });

    useEffect(() => {
        const total_amount = Object.values(registrationReport)?.reduce((total, item) => total + item.amount, 0);

        setTotalAmount(total_amount);
    }, [registrationReport]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }));
    }, [endDate]);

    useEffect(() => {
        setParams({
            academic_year_id : data?.academic_year_id ?? "",
            start_date : data?.start_date ?? "",
            end_date : data?.end_date ?? "",
        });
    }, [data]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    const handeleFilterData = (e) =>{
        e.preventDefault();

        router.post(route('admission_registration_report.daily_collection'), params)
    }

    const resetForm = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData} className="mb-2.5">
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {formatNumber(totalAmount)}</span>
                            </div>
                            {/* delete count if don't need */}
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

                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Select Year"
                                                data={academicYears}
                                                onChange={(e) =>{
                                                    setData('academic_year_id', e.target.value)
                                                }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) =>{
                                                    setStartDate(date)
                                                }
                                            }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Start date"
                                                className="w-full"
                                            />

                                        </div>

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) =>{
                                                    setEndDate(date)
                                                }
                                            }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Replace changable inputs */}
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
                                {/* Replace changable buttons */}
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type= "button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) =>{
                                                handeleFilterData(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>

                                {/* <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent default link behavior
                                                resetForm(); // Call your reset function
                                            }}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div> */}
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDailyCollectionFilter;
