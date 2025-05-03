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

const CompleteOutstandingDuesFilter = ({
    classrooms,
    fees,
    setLoading,
    setCompleteOutstandingDueReportsData,
    student_status_array = [],
    student_active_status_array = [],
    totalDueAmount,
    setFilterFormData,
    employmentCategoryTypes,
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
        late_fee: "",
        voucher: "",
        employment_category_id: "",
        student_status: "",
        student_active_status: "",
        classroom_id: "",
        from_fee_id: "",
        to_fee_id: "",
    });

    useEffect(() => {
        setFilterFormData(data);
        setParams({
            late_fee: data?.late_fee ?? "",
            voucher: data?.voucher ?? "",
            employment_category_id: data?.employment_category_id ?? "",
            student_status: data?.student_status ?? "",
            student_active_status: data?.student_active_status ?? "",
            classroom_id: data?.classroom_id ?? "",
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
        });
    },[data]);

    // handle from fee installment change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: ""
        }))
    }
    // handle from fee installment change end


    // handle form reset start
    const handleReset = () => {
        reset();
        setFilteredToFees([]);
        setCompleteOutstandingDueReportsData([]);
        setLoading(false);
    }
    // handle form reset end


    // handle filter due report start
    const handleFilterDueReport = (e) => {
        e.preventDefault();

        if(data.from_fee_id == "" || data?.to_fee_id == "") {
            toast.error("Please select from and to fee installment", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            setLoading(false);

            router.post(route('fee_report.complete_outstanding_dues'), data);
        }

    }
    // handle filter due report end


    const CompleteOutstandingDuesFilterData = (e) => {
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

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
    }
    // format number end

    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CompleteOutstandingDuesFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Amount: {formatNumber(totalDueAmount)}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="late_fee"
                                                    name="late_fee"
                                                    checked={
                                                        data.late_fee
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "late_fee",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="late_fee"
                                                    value="Late Fee"
                                                />
                                            </div>
                                        </div>
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
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Employment Category"
                                                data={employmentCategoryTypes}
                                                value={data.employment_category_id}
                                                onChange={(e) =>
                                                    setData("employment_category_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.employment_category_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Student"
                                                data={student_status_array}
                                                value={data.student_status}
                                                onChange={(e) =>
                                                    setData("student_status", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_status}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Student"
                                                data={student_active_status_array}
                                                value={data.student_active_status}
                                                onChange={(e) =>
                                                    setData("student_active_status", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_active_status}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="From"
                                                data={fees}
                                                value={data.from_fee_id}
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
                                                data_label="To"
                                                data={filteredToFees}
                                                value={data.to_fee_id}
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
                                                handleFilterDueReport(e)
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompleteOutstandingDuesFilter;
