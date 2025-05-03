import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const DayBookReportFilter = ({
    dayBookReport,
    setFilterText
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search:"",
        start_date: new Date(),
        end_date: new Date(),
    });

    useEffect(() => {
        setFilterText(data.search);
    }, [data.search]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // handle filter day book data start
    const handleFilterData = (e) => {
        e.preventDefault();

        const form_data = {
            start_date: data?.start_date,
            end_date: data?.end_date
        }

        router.post(route('day_book_report.list'), form_data);
    }
    // handle filter day book data end


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {dayBookReport?.length}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        {dayBookReport?.length > 0 &&
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={data.search}
                                                    onChange={(e) => setData("search", e.target.value)}
                                                    placeHolder="Search in below result"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.search} className="mt-2" />
                                            </div>
                                        }
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date
                                                        ? new Date(
                                                            data?.start_date
                                                        )
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    setData("start_date", date)
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
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.end_date
                                                        ? new Date(
                                                            data?.end_date
                                                        )
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    setData("end_date", date)
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
                                            onClick={handleFilterData}
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
                                        <Link
                                            href={route('day_book_report.list')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {dayBookReport?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Pdf"
                                            placement="top"
                                            arrow
                                        >
                                            <a
                                                href={route('pdf_account.daybook_report', {
                                                    start_date: data?.start_date,
                                                    end_date: data?.end_date
                                                })}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                {dayBookReport?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.inventory.day_book_report', {
                                                    start_date: data?.start_date,
                                                    end_date: data?.end_date
                                                })}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DayBookReportFilter;
