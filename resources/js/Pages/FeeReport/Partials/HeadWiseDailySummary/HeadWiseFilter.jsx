import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const HeadWiseFilter = ({
    paymentModes = [],
    setLoading,
    setSummaryData,
    filterMode,
    setFilterMode,
    setPaymentFeeTypeData,
    setPaymentModeTypeData,
    setTotalSummaryCount,
    totalSummaryCount,
    setParams
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
        filter_mode: filterMode,
        payment_mode: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    useEffect(() => {
        setParams({
            filter_mode: data?.filter_mode ?? "head_wise",
            payment_mode: data?.payment_mode ?? "",
            start_date: data?.start_date ?? new Date(),
            end_date: data?.end_date ?? new Date(),
        });
    }, [data]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            filter_mode: filterMode
        }));
    }, [filterMode])

    // handle fee payment summary filter start
    const filterFeePaymentSummarytData = (e) => {
        e.preventDefault();

        setLoading(false);

        router.post(route('fee_report.head_wise_daily_summary'), data);
    }
    // handle fee payment summary filter end

    // handle reset start
    const handleReset = () => {
        setSummaryData([]);
        setPaymentFeeTypeData([]);
        setPaymentModeTypeData([]);
        setTotalSummaryCount(0)
        setFilterMode("head_wise");
        setLoading(false);
        reset();
    }
    // handle reset end


    const HeadWiseFilterData = (e) => {
        e.preventDefault();

        // post(route("school.save"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.landmarks_id) {
        //         //     reset("landmarks_id");
        //         //     landmarksInput.current.focus();
        //         // }
        //     },
        // });
    };

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
                    <form onSubmit={HeadWiseFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {totalSummaryCount}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="payment_mode"
                                                    data_label="Payment"
                                                    data={paymentModes}
                                                    value={
                                                        data.payment_mode
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "payment_mode",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.payment_mode
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={data.start_date && new Date(data.start_date)}
                                                    onChange={(date) =>
                                                        setData(
                                                            "start_date",
                                                           date
                                                        )
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
                                                    selected={data.end_date && new Date(data.end_date)}
                                                    onChange={(date) =>
                                                        setData(
                                                            "end_date",
                                                           date
                                                        )
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
                                            onClick={(e) => {
                                                filterFeePaymentSummarytData(e)
                                            }}
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
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => {
                                                handleReset();
                                            }}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
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

export default HeadWiseFilter;
