import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import EditFeeDiscount from './EditFeeDiscount';



export default function ShowDiscountList({ className = '', showDiscountListPopup, setShowDiscountListPopup, selectedDiscountData = {}, feeTypes = [] }) {
    const [editFeeDiscountPopup, setEditFeeDiscountPopup] = useState(false);

    const [discountData, setDiscountData] = useState(selectedDiscountData);
    const [feesData, setFeesData] = useState({});
    const [feeData, setFeeData] = useState([]);
    const [selectedFeeId, setSelectedFeeId] = useState(null);


    const handleEditFeeDiscountPopup = () => {
        setEditFeeDiscountPopup(!editFeeDiscountPopup);
    };


    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    useEffect(() => {
        setDiscountData(selectedDiscountData);
    }, [selectedDiscountData]);

    useEffect(() => {
        if (Object.keys(discountData)?.length > 0){
            setFeesData(Object.values(discountData?.fees)?.map(item => ({
                fee:item?.fee,
                fee_type_amounts: item?.fee_type_amounts?.map(typeAmount => {
                    if (typeAmount?.id != null){
                        return {
                            id: typeAmount?.id,
                            student_id: typeAmount?.student_id,
                            discount_id: typeAmount?.discount_id,
                            fee_type_id: typeAmount?.fee_type_id,
                            amount: typeAmount?.amount,
                            fee_id: typeAmount?.fee_id,
                            fee_type_title: typeAmount?.fee_type?.fee_type,
                        }
                    }
                    else {
                        return null;
                    }
                })|| null,
                is_paid: item?.is_paid
            })));
        }
    }, [discountData]);


    const closeModal = () => {
        setShowDiscountListPopup(false);
        reset();
    };


    const feeTypeAmountDataFromChild = (data) => {

        const selectedFeeData = feesData?.find(dataArray => dataArray?.fee?.id === selectedFeeId);

        setFeesData(feesData?.map((item, index) => {
            let finalResultData;

            if (selectedFeeData?.fee?.id === item?.fee?.id) {
                finalResultData = {
                    fee: selectedFeeData?.fee,
                    fee_type_amounts: data?.map(dataItem => {

                        const currentItem = selectedFeeData?.fee_type_amounts?.find(amountArray => dataItem.fee_type_id === amountArray.fee_type_id);

                        let resultData;

                        if (dataItem.fee_type_id === currentItem?.fee_type_id) {
                            resultData = {
                                id: currentItem?.id,
                                student_id: currentItem?.student_id,
                                discount_id: currentItem?.discount_id,
                                fee_type_id: dataItem?.fee_type_id,
                                fee_id: currentItem?.fee_id,
                                amount: dataItem?.amount,
                                is_discount_percentage: currentItem?.is_discount_percentage,
                                status: currentItem?.status,
                                fee_type_title: currentItem?.fee_type_title,
                            }
                        }
                        else {
                            resultData = {
                                id: null,
                                student_id: currentItem?.student_id ?? discountData?.student?.id,
                                discount_id: currentItem?.discount_id ?? discountData?.discount?.id,
                                fee_type_id: dataItem?.fee_type_id,
                                fee_id: currentItem?.fee_id ?? selectedFeeId,
                                amount: dataItem?.amount,
                                is_discount_percentage: currentItem?.is_discount_percentage ?? discountData?.discount?.is_discount_percentage,
                                status: "",
                                fee_type_title: dataItem?.title,
                            }
                        }

                        return resultData
                    }),
                    is_paid: selectedFeeData?.is_paid,
                }
            }
            else {
                finalResultData = {
                    fee: item?.fee,
                    fee_type_amounts: item?.fee_type_amounts,
                    is_paid: item?.is_paid,
                }
            }

            return finalResultData;
        }));
    }


    const handleDeleteAllFeeDiscount = (discountId, studentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("fee_discount.delete_student_fee_discount", {
                    discountId: discountId,
                    studentId: studentId,
                }), {
                    onSuccess: ({ props }) => {
                        setFeesData(feesData?.map((item, index) => ({
                                fee: item?.fee,
                                fee_type_amounts: null,
                                is_paid: item?.is_paid,
                            })
                        ));
                        closeModal();
                    },
                    onError: (errors) => {
                    }
                });
            }
        });
    }


    const handleFeeDiscountDelete = (discountId, studentId, feeId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("fee_discount.delete_fee_discount", {
                    discountId: discountId,
                    studentId: studentId,
                    feeId: feeId
                }), {
                    onSuccess: ({ props }) => {
                        if (feeId !== null) {
                            setFeesData(feesData?.map((item, index) => {
                                const filteredAmounts = item?.fee_type_amounts
                                    ?.filter(dataItem => dataItem.fee_id !== feeId)
                                    .map(dataItem => ({
                                        id: dataItem?.id,
                                        student_id: dataItem?.student_id,
                                        discount_id: dataItem?.discount_id,
                                        fee_type_id: dataItem?.fee_type_id,
                                        fee_id: dataItem?.fee_id,
                                        amount: dataItem?.amount,
                                        is_discount_percentage: dataItem?.is_discount_percentage,
                                        status: dataItem?.status,
                                        fee_type_title: dataItem?.fee_type_title,
                                    }));

                                return {
                                    fee: item?.fee,
                                    fee_type_amounts: filteredAmounts && filteredAmounts.length > 0 ? filteredAmounts : null,
                                    is_paid: item?.is_paid,
                                };
                            }));
                        }
                    },
                    onError: (errors) => {

                    }
                });
            }
        });
    }


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={showDiscountListPopup} onClose={closeModal} className="lg:max-w-[60rem] xl:max-w-6xl sm:max-w-[calc(100%-60px)]">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="p-[30px] pt-2.5">
                                <div className="educare-common-card-title flex items-center flex-wrap">
                                    <h5 className="mb-2">
                                        <span>Student Name: </span>
                                        {`${discountData?.student?.first_name} ${discountData?.student?.middle_name} ${discountData?.student?.last_name}`}
                                    </h5>
                                    <h5 className="mb-2">
                                        <span>Admission No: </span>
                                        {discountData?.student?.admission_no}
                                    </h5>
                                    <h5 className="mb-2">
                                        <span>Discount Title: </span>
                                        {discountData?.discount?.title}
                                    </h5>
                                    <div className="mb-2">
                                        <PrimaryButton
                                            className="educare-danger-btn-md-fill"
                                            onClick={() => {
                                                handleDeleteAllFeeDiscount(discountData?.discount?.id, discountData?.student?.id);
                                            }}
                                            type="button"
                                        >
                                                Remove All Discount
                                        </PrimaryButton>
                                    </div>
                                </div>
                                <div className="educare-popup-form-wrapper border-y mb-5 border-border/50">
                                    <div className="grid grid-cols-12 gap-5 py-3">
                                        {feesData?.length ?? 0 > 0 ?
                                            feesData?.map((item, index) => (
                                                <div className="lg:col-span-4 md:col-span-6 col-span-12" key={index}>
                                                    <div className="educare-update-fee-structure">
                                                        <div className="educare-update-fee-structure-heading">
                                                            <h5 className="text-[15px] font-semibold text-headingLight">{item?.fee?.title}<span className={`badge ${item?.is_paid ? 'success' : 'warning'} ml-1`}>{item?.is_paid ? 'Paid' : 'Unpaid'}</span></h5>
                                                            {item?.is_paid === false &&
                                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            className="educare-warning-btn-sm-fill"
                                                                            aria-label="Edit"
                                                                            data-mui-internal-clone-element="true"
                                                                            onClick={() => {
                                                                                setFeeData(item);
                                                                                setSelectedFeeId(item?.fee?.id);
                                                                                handleEditFeeDiscountPopup();
                                                                            }}
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handleFeeDiscountDelete(discountData?.discount?.id, discountData?.student?.id, item?.fee?.id);
                                                                                }}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="border border-warning/10 border-t-0">
                                                            <ul>
                                                                {(item?.fee_type_amounts != null || item?.fee_type_amounts?.length > 0) && item?.fee_type_amounts[0]?.id != null ?
                                                                    item?.fee_type_amounts?.map((feeTypeAmount, index) => (
                                                                        <li key={index}>
                                                                            <span>{feeTypeAmount?.fee_type_title}</span>
                                                                            <span>{feeTypeAmount?.amount}</span>
                                                                        </li>
                                                                    ))
                                                                :
                                                                    <li className="!justify-center">
                                                                        <span>0</span>
                                                                    </li>
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                         :
                                            <div className="col-span-12">
                                                <div className="educare-update-fee-structure text-center">
                                                    <span>Data not found!</span>
                                                </div>
                                            </div>
                                            }
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-end gap-2.5">
                                    <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
            <EditFeeDiscount
                editFeeDiscountPopup={editFeeDiscountPopup}
                setEditFeeDiscountPopup={setEditFeeDiscountPopup}
                feeTypes={feeTypes}
                feeData={feeData}
                student_id={discountData?.student?.id ?? null}
                discount_id={discountData?.discount?.id ?? null}
                isDiscountPercentage={discountData?.discount?.is_discount_percentage}
                sendFeeTypeAmountDataToParent={feeTypeAmountDataFromChild}
            />
        </>
    );
}
