import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const ConsolidatedSaleReportFilter = ({
    setFilterText,
    consolidatedSaleReport
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
        search: "",
        start_date: new Date(),
        end_date: new Date()
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

    // handle filter report start
    const handleFilterReport = (e) => {
        e.preventDefault();

        const form_data = {
            start_date: data?.start_date,
            end_date: data?.end_date
        }

        router.post(route('consolidated_sale_report.list'), form_data);
    }
    // handle filter report end

    return (
        <>
            <div>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ShoppingCart"></i>
                        Consolidated Sale Report
                    </h5>
                </div>
                <div className='educare-header-filtar-bar-area z-[4] relative'>
                    <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                        <div className="educare-header-filtar-bar-main">
                            <form onSubmit={CommonHeaderFilterData}>
                                <div className=" educare-header-filtar-bar-inner-main">
                                    {/* delete count if don't need */}
                                    <div className="educare-header-filtar-bar-count mr-auto">
                                        <span>Total: {consolidatedSaleReport?.length ?? 0}</span>
                                    </div>
                                    {/* delete count if don't need */}
                                    <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                        <div className="educare-header-filtar-bar-fields-area relative">
                                            <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                            <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                                {/* Replace changable inputs */}
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="search"
                                                        value={data.search}
                                                        onChange={(e) => setData("search", e.target.value)}
                                                        placeHolder="Search"
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError message={errors.search} className="mt-2" />
                                                </div>
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
                                                        placeholderText="Start date"
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
                                                    onClick={handleFilterReport}
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
                                                    href={route('consolidated_sale_report.list')}
                                                    className="educare-gray-btn-md-fill"
                                                >
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        {consolidatedSaleReport?.length > 0 &&
                                            <div>
                                                <Tooltip
                                                    title="Download Pdf"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <a
                                                        target='_blank'
                                                        href={route('pdf_account.consolidated_sale_report', {start_date: data.start_date, end_date: data.end_date})}
                                                        className="educare-warning-btn-md-fill"
                                                    >
                                                        <i className="icon-FilePdf"></i>
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
                </div >
            </div >
        </>
    );
};

export default ConsolidatedSaleReportFilter;
