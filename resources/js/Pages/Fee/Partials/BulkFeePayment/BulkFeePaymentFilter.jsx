import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BulkFeePaymentFilter = ({
    classrooms = [],
    fees = [],
    employmentCategories = [],
    setLoading,
    students = [],
    setFeeId,
    selectedStudentIds,
    setSelectedStudentIds,
    setFormFields,
    formFields
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
        classroom_id: "",
        fee_id: "",
        employment_category_id: "",
        student_data_array: [],
        student_ids: []
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_ids: selectedStudentIds,
            student_data_array: Object.values(formFields)?.filter(item => selectedStudentIds?.includes(item?.student_id))
        }));
    }, [selectedStudentIds, formFields]);

    // show error toast message start
    const showErrorToastMessage = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 1500,
        });
    }
    // show error toast message end


    // handle take bulk fee payment form submit start
    const handleTakeBulkPayment = (e) => {
        e.preventDefault();

        if (Object.keys(data?.student_data_array)?.length > 0) {
            let hasEmpty = false;

            data?.student_data_array?.forEach(item => {
                const totalPaidAmount = item?.fee_installments_array?.reduce((total, item) => total + item?.payable_amount ?? 0, 0);

                if (item?.fee_installments_array?.length <= 0) {
                    hasEmpty = true;

                    showErrorToastMessage("Please select at least one student.");
                }
                else if (
                    item?.payment_mode == "" ||
                    item?.payment_date == "" ||
                    (item?.payment_mode == "Cheque" && (item?.bank_id == "" || item?.cheque_no == "" || item?.cheque_date == "" || item?.cheque_amount == "" || item?.bank_id == "" || item?.branch == "")) ||
                    (item?.payment_mode == "Bank Process" && item?.bank_account_id == "") ||
                    (item?.payment_mode == "Demand Draft" && (item?.dd_bank == "" || item?.dd_number == "" || item?.dd_date == "" || item?.dd_amount == "")) ||
                    (item?.payment_mode == "Paytm" && (item?.paytm_ref_no == "" || item?.paytm_mobile == "")) ||
                    (item?.payment_mode == "Neft" && (item?.neft_number == "" || item?.neft_desc == "")) ||
                    (item?.payment_mode == "UPI" && (item?.upi_transaction_id == "" || item?.upi_description == ""))
                ) {
                    hasEmpty = true;

                    showErrorToastMessage("Required fields cannot be empty.");
                }
                else if (
                    (item?.payment_mode == "Cheque" && item?.cheque_amount != totalPaidAmount) ||
                    (item?.payment_mode == "Demand Draft" && item?.dd_amount != totalPaidAmount)
                ) {
                    hasEmpty = true;

                    showErrorToastMessage("Paid amount should match with given amount.");
                }
            });

            if (!hasEmpty) {
                post(route('fee.bulk_fee_payment.save'), {
                    onSuccess: (props) => {
                        setSelectedStudentIds([]);

                        const form_data = {
                            classroom_id: data?.classroom_id ?? "",
                            fee_id: data?.fee_id ?? "",
                            employment_category_id: data?.employment_category_id ?? "",
                        }

                        router.post(route('fee.bulk_fee_payment'), form_data);
                    },
                    onError: (errors) => {
                        if (errors['student_data_array'] != "") {
                            showErrorToastMessage(errors['student_data_array'])
                        }
                    }
                });
            }
        }
        else {
            showErrorToastMessage("Please select at least one student.");
        }
    }
    // handle take bulk fee payment form submit end


    // handle filter data start
    const BulkFeePaymentFilterData = (e) => {
        e.preventDefault();

        if(data?.classroom_id == "") {
            toast.error("Please select class", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            setSelectedStudentIds([]);
            setFormFields({});
            setFeeId(data?.fee_id)
            setLoading(false);

            const form_data = {
                classroom_id: data?.classroom_id ?? "",
                fee_id: data?.fee_id ?? "",
                employment_category_id: data?.employment_category_id ?? "",
            }

            router.post(route('fee.bulk_fee_payment'), form_data);
        }
    };
    // handle filter data end

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
                    <form onSubmit={BulkFeePaymentFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {Object.keys(students)?.length}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
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
                                                id="fee_id"
                                                data_label="Installment"
                                                data={fees}
                                                value={data.fee_id}
                                                onChange={(e) => {
                                                    setData("fee_id", e.target.value)
                                                }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.fee_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="employment_category_id"
                                                data_label="Employment Category"
                                                data={employmentCategories}
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
                                    >
                                        <button type="submit"
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
                                    >
                                        <Link
                                            href={route('fee.bulk_fee_payment')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {selectedStudentIds?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Take Fee"
                                            placement="top"
                                            arrow
                                        >
                                            <button type="button"
                                                className="educare-primary-btn-md-fill"
                                                onClick={handleTakeBulkPayment}
                                            >
                                                Take Fee
                                            </button>
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

export default BulkFeePaymentFilter;
