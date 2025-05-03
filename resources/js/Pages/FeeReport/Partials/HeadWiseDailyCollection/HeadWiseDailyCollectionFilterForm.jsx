import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const HeadWiseDailyCollectionFilterForm = ({
    classNames = [],
    paymentModes = [],
    feeTypes = [],
    setLoading,
    setStudentPaymentReportsData,
    totalReportCount,
    sortBy,
    setSortBy,
    setPaymentFeeTypeData,
    setTotalReportCount,
    setParams
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        fee_type_id: "",
        payment_mode: "",
        start_date: startDate,
        end_date: endDate,
        cancelled_fee: false,
        voucher: false,
        sort_by: sortBy,
    });

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            sort_by: sortBy
        }))
    },[sortBy]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }))
    },[startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }))
    },[endDate]);
    // handle form data end

    useEffect(() => {
        setParams({
            class_name_id: data?.class_name_id ?? "",
            fee_type_id: data?.fee_type_id ?? "",
            payment_mode: data?.payment_mode ?? "",
            start_date: data?.start_date ?? startDate,
            end_date: data?.end_date ?? endDate,
            cancelled_fee: data?.cancelled_fee ?? false,
            voucher: data?.voucher ?? false,
            sort_by: data?.sort_by ?? sortBy,
        })
    }, [data]);

    // handle filter data start
    const handleFilterData = (e) => {
        e.preventDefault();

        setLoading(false);

        router.post(route('fee_report.head_wise_daily_collection'), data);
    }
    // handle filter data end

    // handle reset data start
    const handleReset = () => {
        setStudentPaymentReportsData([]);
        setStartDate(new Date())
        setEndDate(new Date())
        setLoading(false)
        setSortBy("receipt_no")
        setPaymentFeeTypeData([])
        setTotalReportCount(0)
        reset();
    }
    // handle reset data end


    const HeadWiseDailyCollectionFilterFormData = (e) => {
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
                    <form onSubmit={HeadWiseDailyCollectionFilterFormData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total Count: {totalReportCount}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="ml-auto whitespace-nowrap flex items-center gap-2">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="voucher"
                                                        name="voucher"
                                                        checked={
                                                            data.voucher
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "voucher",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="voucher"
                                                        value="Voucher"
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="cancelled_fee"
                                                        name="cancelled_fee"
                                                        checked={
                                                            data.cancelled_fee
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "cancelled_fee",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="cancelled_fee"
                                                        value="Cancelled Fee"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
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
                                            <InputError
                                                message={errors.start_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
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
                                            <InputError
                                                message={errors.end_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Payment Type"
                                                data={paymentModes}
                                                value={data.payment_mode}
                                                onChange={(e) =>
                                                    setData("payment_mode", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.payment_mode}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Fee Type"
                                                data={feeTypes}
                                                value={data.fee_type_id}
                                                onChange={(e) =>
                                                    setData("fee_type_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.fee_type_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Class"
                                                data={classNames}
                                                value={data.class_name_id}
                                                onChange={(e) =>
                                                    setData("class_name_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.class_name_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles"></div>
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
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
                                                handleFilterData(e)
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
                                                handleReset(e)
                                            }}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeadWiseDailyCollectionFilterForm;
