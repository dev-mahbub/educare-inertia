import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YearlyHeadWiseDuesFilter = ({
    fees = [],
    setLoading,
    totalCount,
    setTotalCount,
    setInstallmentWiseAmountData,
    setDueSummaryData,
    setParams
}) => {

    const [filteredToFees, setFilteredToFees] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        include_voucher: "",
        from_fee_id: "",
        to_fee_id: "",
    });

    useEffect(() => {
        setParams({
            include_voucher: data?.include_voucher ?? "",
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
        });
    }, [data]);

    //handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: ""
        }));
    }
    //handle from fee change end

    // handle reset data start\
    const handleReset = () => {
        reset();
        setLoading(false);
        setTotalCount(0);
        setInstallmentWiseAmountData([]);
        setDueSummaryData([]);
    }
    // handle reset data end


    // handle filter data start\
    const filterDueSummaryData = (e) => {
        e.preventDefault();

        if (data?.from_fee_id == "" || data?.to_fee_id == "") {
            toast.error("Please select from and to installment", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            setLoading(false);

            router.post(route('fee_report.yearly_head_wise_dues_summary'), data)
        }

    }
    // handle filter data end

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


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {totalCount}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="include_voucher"
                                                    name="include_voucher"
                                                    checked={
                                                        data?.include_voucher
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "include_voucher",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="include_voucher"
                                                    value="Include Voucher"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="from_fee_id"
                                                data_label="Fee From"
                                                data={fees}
                                                value={data?.from_fee_id}
                                                onChange={(e) =>
                                                   handleFromFeeChange(e)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.from_fee_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="to_fee_id"
                                                data_label="Fee To"
                                                data={filteredToFees}
                                                value={data?.to_fee_id}
                                                onChange={(e) =>
                                                    setData("to_fee_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.to_fee_id}
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
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                filterDueSummaryData(e)
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
                                            onClick={() => {
                                                handleReset()
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

export default YearlyHeadWiseDuesFilter;
