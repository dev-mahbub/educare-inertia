import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const InactiveBooksFilter = ({
    setLoading,
    inactiveBookListCount = 0,
}) => {

    const {
        data,
        setData
    } = useForm({
        acc_no: "",
        start_date_at: "",
        end_date_at: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('book.inactive'), data);
        setLoading(false);
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('book.inactive'));
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
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Inactive Books
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {inactiveBookListCount}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changeable inputs */}
                                        <div className="educare-select-field-styles">
                                            <TextInput
                                                id="acc_no"
                                                value={
                                                    data.acc_no
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "acc_no",
                                                        e.target.value
                                                    )
                                                }
                                                placeHolder="AccNo"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date_at
                                                    && new Date(
                                                        data?.start_date_at
                                                    )
                                                }
                                                onChange={(date) =>
                                                    setData("start_date_at", date)
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
                                                    data?.end_date_at
                                                    && new Date(
                                                        data?.end_date_at
                                                    )
                                                }
                                                onChange={(date) =>
                                                    setData("end_date_at", date)
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
                                        <button
                                            onClick={(e) => handleSearch(e)}
                                            className="educare-secondary-btn-md-fill"
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
                                        <button
                                            onClick={(e) => handleReset(e)}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>

                                {/* Replace changeable buttons */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InactiveBooksFilter;
