import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const JournalHeaderFilter = ({
    journals,
    data,
    setData
}) => {

    const [params, setParams] = useState({});

    useEffect(() => {
        setParams({
            start_date: data.start_date,
            end_date: data.end_date
        });
    }, [data]);

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

    // handle filter journals start
    const handleFilterJournals = (e) => {
        e.preventDefault();

        router.post(route('journal.journal_report'), data);
    }
    // handle filter journals end


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Journal Register
                        </h5>
                    </div>
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {journals?.length}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date && new Date(data?.start_date)
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
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.end_date && new Date(data?.end_date)
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
                                                placeholderText="End Date"
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
                                            onClick={handleFilterJournals}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {journals?.length > 0 &&
                                    <>
                                        <div>
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    href={route('export_excel.inventory.journal_report', params)}
                                                    target="_blank"
                                                    className="educare-success-btn-md-fill"
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Download Pdf"
                                                placement="top"
                                                arrow
                                            >
                                                <a
                                                    href={route('pdf_account.journal_report', params)}
                                                    target="_blank"
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    </>
                                }
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('journal.journal_report')}
                                            className="educare-gray-btn-md-fill"
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

export default JournalHeaderFilter;
