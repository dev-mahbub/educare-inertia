import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const PurchaseHistoryFilter = ({
    setLoading,
    libraryVendor = [],
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        start_date_at: "",
        end_date_at: "",
        library_vendor_id: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(false);
        router.post(route('book.purchase_history'), data);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setLoading(false);
        router.get(route('book.purchase_history'));
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
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={handleSearch}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-card-title pb-none mb-2.5">
                                    <h5>
                                        <i className="icon-ShoppingCart"></i>
                                        New Purchase History
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
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
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="library_vendor_id"
                                                    data_label="Vendor list"
                                                    data={libraryVendor}
                                                    value={
                                                        data.library_vendor_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "library_vendor_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.library_vendor_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
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
                                                className="educare-secondary-btn-md-fill"
                                                type="submit"
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
                                                className="educare-gray-btn-md-fill"
                                                onClick={(e) => handleReset(e)}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>

                                    {/* Replace changeable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryFilter;
