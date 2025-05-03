import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SelectFeeTypePopup from './Popup/SelectFeeTypePopup';

const FeeStructure = ({
    feeInstallments = [],
    sendFeeInstallmentsDataToParent,
    selectedDiscount,
    setSelectedDiscount,
    discounts = [],
    selectedStudent,
    feePaymentType,
    studenHasDiscount,
    extraFeeTypes = [],
    setTotalAmountPaid,
    setTotalAmountDiscount,
    setSelectedInstallments,
    selectedInstallments
}) => {

    const [formFields, setFormFields] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
    const [totalDueAmount, setTotalDueAmount] = useState(0);
    const [discountRemoveable, setDiscountRemoveable] = useState(false);
    const [feeInstallmentsData, setFeeInstallmentsData] = useState([]);
    const [selectedExtraFeeTypes, setSelectedExtraFeeTypes] = useState([]);
    const [feeTypePopup, setFeeTypePopup] = useState(false);
    const [feeData, setFeeData] = useState([]);
    const [selectedExtraFeeTypeIds, setSelectedExtraFeeTypeIds] = useState([]);
    const [discountRemoved, setDiscountRemoved] = useState(false);


    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(formFields?.length).fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    const [feeInstallmentsDataArray, setFeeInstallmentsDataArray] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm ({
        fee_installments_array: formFields?.fee_type_amounts,
        discount_id: "",
        total_paid_single: "",
        paid_amount: "",
        discount_amount: "",
        total_paid_amount: "",
    });


    useEffect(() => {
        setTotalAmountPaid(totalPaidAmount)
    },[totalPaidAmount])

    useEffect(() => {
        setTotalAmountDiscount(totalDiscountAmount)
    },[totalDiscountAmount])


    useEffect(() => {
        const prevFeeInstallmentIds = Object.values(feeInstallmentsData)?.filter(item => item?.fee_payment_type == 'fee_installment')?.map(item => item?.fee?.id);
        const prevVoucherIds = Object.values(feeInstallmentsData)?.filter(item => item?.fee_payment_type == 'general_voucher')?.map(item => item?.fee?.id);
        const prevTransportIds = Object.values(feeInstallmentsData)?.filter(item => item?.fee_payment_type == 'transport_voucher')?.map(item => item?.fee?.id);

        const newInstallments = feeInstallments?.filter(item => {
            if (
                (item?.fee_payment_type == 'fee_installment' && !prevFeeInstallmentIds?.includes(item?.fee?.id)) ||
                (item?.fee_payment_type == 'general_voucher' && !prevVoucherIds?.includes(item?.fee?.id)) ||
                (item?.fee_payment_type == 'transport_voucher' && !prevTransportIds?.includes(item?.fee?.id))
            ) {
                return true;
            }
            else {
                return false;
            }
        })

        setFeeInstallmentsData((prevData) => ([
            ...prevData?.filter(item => {
                if (
                    (item?.fee_payment_type == 'fee_installment' && selectedInstallments['fee_installment']?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'general_voucher' && selectedInstallments['general_voucher']?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'transport_voucher' && selectedInstallments['transport_voucher']?.includes(item?.fee?.id))
                ) {
                    return true;
                }
                else {
                    return false;
                }
            }),
            ...newInstallments
        ]));

        // old code
        // setFeeInstallmentsData(feeInstallments)
    },[feeInstallments]);


    // useEffect(() => {
    //     setSelectedExtraFeeTypeIds(selectedExtraFeeTypes?.map(item => item?.fee_type_id));

    //     const feeIds = selectedExtraFeeTypes?.map(item => item?.fee_type_id)

    //     setFeeInstallmentsData((prevData) => {
    //         let updatedData = prevData.map(item => ({
    //             ...item,
    //             fee_type_amounts: item?.fee_type_amounts?.filter(feeTypeItem => {
    //                     if (feeTypeItem?.payment_status === 'Due') {
    //                         return !feeIds?.includes(feeTypeItem?.fee_type_id)
    //                     }
    //                     else {
    //                         return true;
    //                     }
    //                 }
    //             )
    //         }));

    //         updatedData = updatedData?.map(item => {
    //             if (item?.fee?.id == feeData?.fee?.id && item?.payment_status === 'Due') {
    //                 return {
    //                     ...item,
    //                     fee_type_amounts: [...item?.fee_type_amounts,...selectedExtraFeeTypes]
    //                 }
    //             }
    //             else {
    //                 return item;
    //             }
    //         })

    //         return [...updatedData];
    //     });

    //     // setSelectedExtraFeeTypeIds([]);
    //     // setSelectedExtraFeeTypes([]);
    // }, [selectedExtraFeeTypes]);

    // filter unpaid fees and send to parent component and set total fee amount values
    useEffect(() => {
        sendFeeInstallmentsDataToParent(formFields.flatMap(item => item.fee_type_amounts.map(feeTypeAmount => {
            if (feeTypeAmount?.payment_status !== 'Paid') {
                let discount_amount = feeTypeAmount?.discount_amount;

                if ((feeTypeAmount?.payment_status === 'Partial' && feeTypeAmount?.has_discount === true) || feeTypeAmount?.payment_status === 'Paid') {
                    discount_amount = 0;
                }

                return {
                    id: feeTypeAmount?.id,
                    discount_id: feeTypeAmount?.discount_id ?? null,
                    fee_id: feeTypeAmount?.fee_id,
                    fee_type_id: feeTypeAmount?.fee_type_id,
                    amount: feeTypeAmount?.amount,
                    payable_amount: feeTypeAmount?.payable_amount,
                    paid_amount: feeTypeAmount?.paid_amount,
                    discount_amount: discount_amount > 0 ? parseFloat(discount_amount) : 0,
                    fee_payment_type: feeTypeAmount?.fee_payment_type,
                    payment_status: feeTypeAmount?.payment_status,
                };
            }

            return null; // Return null for elements where payment status is 'Paid'
        })).filter(Boolean))

        if (enqInnerActive?.length !== formFields?.length) {
            setEnqInnerActive(new Array(formFields?.length).fill(false))
        }

        let total_amount = Object.values(formFields).reduce((total, item) => {
            const amountValue = parseFloat(item.total_amount, 10) || 0;
            return total + amountValue;
        }, 0);

        if (total_amount > 0) {
            total_amount = parseFloat(total_amount.toFixed(2))
        }
        else {
            total_amount = 0;
        }

        setTotalAmount(total_amount);

        let total_payable = Object.values(formFields).reduce((total, item) => {
            const amountValue = parseFloat(item.total_payable_amount, 10) || 0;
            return total + amountValue;
        }, 0);

        if (total_payable > 0) {
            total_payable = parseFloat(total_payable.toFixed(2))
        }
        else {
            total_payable = 0;
        }

        setTotalPayableAmount(total_payable);

        let total_discount = Object.values(formFields).reduce((total, item) => {
            // const amountValue = parseFloat(item.total_discount_amount, 10) || 0;

            // new code start
            const amountValue = Object.values(item?.fee_type_amounts)?.reduce((total_discount_amount, feeItem) => {
                if (feeItem?.payment_status == 'Due' || (feeItem?.payment_status == 'Partial' && feeItem?.has_discount == false)) {
                    return total_discount_amount + (feeItem?.discount_amount ?? 0);
                }else {
                    return total_discount_amount;
                }
            }, 0);

            if (item?.payment_status == 'Paid') {
                return 0;
            }
            else {
                return total + amountValue;
            }
            // new code end

            // if (item?.payment_status != 'Due') {
            //     return 0;
            // }
            // else {
            //     return total + amountValue;
            // }
        }, 0);

        if (total_discount > 0) {
            total_discount = parseFloat(total_discount.toFixed(2))
        }
        else {
            total_discount = 0;
        }

        setTotalDiscountAmount(total_discount);

        let total_paid = Object.values(formFields).reduce((total, item) => {
            const amountValue = parseFloat(item.total_paid_amount, 10) || 0;
            return total + amountValue;
        }, 0);

        if (total_paid > 0) {
            total_paid = parseFloat(total_paid.toFixed(2))
        }
        else {
            total_paid = 0;
        }

        setTotalPaidAmount(total_paid);

        let total_due = Object.values(formFields).reduce((total, item) => {
            const amountValue = parseFloat(item.total_due_amount, 10) || 0;
            return total + amountValue;
        }, 0);

        if(total_due > 0) {
            total_due = parseFloat(total_due.toFixed(2))
        }
        else{
            total_due = 0;
        }

        setTotalDueAmount(total_due);

    }, [formFields]);
    // end filter unpaid fees and send to parent component


    // initialize form data and add discount to fee start
    useEffect(() => {
        setFormFields((prevData) => {
            const prevFeeInstallmentIds = Object.values(formFields)?.filter(item => item?.fee_payment_type == 'fee_installment')?.map(item => item?.fee?.id);
            const prevVoucherIds = Object.values(formFields)?.filter(item => item?.fee_payment_type == 'general_voucher')?.map(item => item?.fee?.id);
            const prevTransportIds = Object.values(formFields)?.filter(item => item?.fee_payment_type == 'transport_voucher')?.map(item => item?.fee?.id);

            const newInstallments = feeInstallmentsData?.filter(item => {
                if (
                    (item?.fee_payment_type == 'fee_installment' && !prevFeeInstallmentIds?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'general_voucher' && !prevVoucherIds?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'transport_voucher' && !prevTransportIds?.includes(item?.fee?.id))
                ) {
                    return true;
                }
                else {
                    return false;
                }
            })?.map((item, parentIndex) => {
                const feeInstallment = {
                    index: parentIndex,
                    fee: {
                        id: item?.fee?.id,
                        title: item?.fee?.title,
                    },
                    has_transport_fee: item?.has_transport_fee,
                    fee_type_amounts: item?.fee_type_amounts?.map((feeTypeAmount, index) => {
                        let discount_amount = feeTypeAmount?.discount_amount;
                        let payable_amount = feeTypeAmount?.payable_amount;
                        let paid_amount = feeTypeAmount?.payment_status == 'Paid' ? feeTypeAmount?.paid_amount : feeTypeAmount?.payable_amount - discount_amount;

                        let discount_id = null;

                        if (feeTypeAmount?.payment_status == 'Partial') {
                            paid_amount = feeTypeAmount?.payable_amount;
                        }

                        if (feeTypeAmount?.payment_status == 'Paid' || feeTypeAmount?.discount_amount > 0) {
                            discount_amount = feeTypeAmount?.discount_amount;

                            if (feeTypeAmount?.is_new) {
                                payable_amount = feeTypeAmount?.payable_amount - discount_amount;
                                paid_amount = payable_amount;

                            }
                        }
                        else if (feeTypeAmount?.payment_status == 'Partial') {
                            discount_amount = feeTypeAmount?.discount_amount;
                            payable_amount = feeTypeAmount?.payable_amount;
                            paid_amount = payable_amount;
                        }
                        else if (selectedDiscount?.id != null && selectedDiscount?.discount_fee_type_amounts?.length > 0 && feePaymentType == 'fee_installment' && feeTypeAmount?.fee_payment_type == 'fee_installment') {
                            selectedDiscount?.discount_fee_type_amounts?.forEach(discountAmount => {
                                if (discountAmount?.fee_type_id == feeTypeAmount?.fee_type_id) {
                                    //old code
                                    // discount_amount = parseFloat(discountAmount?.amount);

                                    // new code
                                    if (selectedDiscount?.is_discount_percentage == true) {
                                        discount_amount = (parseFloat(discountAmount?.amount ?? 0) / 100) * parseFloat(feeTypeAmount?.amount ?? 0);
                                    }
                                    else {
                                        discount_amount = parseFloat(discountAmount?.amount);
                                    }

                                    if (discount_amount > feeTypeAmount?.payable_amount) {
                                        discount_amount = feeTypeAmount?.payable_amount;
                                    }

                                    // old
                                    // payable_amount = feeTypeAmount?.payable_amount - discount_amount;
                                    // paid_amount = payable_amount;

                                    // new
                                    paid_amount = feeTypeAmount?.payable_amount - discount_amount;
                                    discount_id = discountAmount?.discount_id ?? null;
                                }
                            });
                        }

                        return {
                            index: index,
                            id: feeTypeAmount?.id,
                            discount_id: feeTypeAmount?.discount_id ?? discount_id,
                            fee_id: feeTypeAmount?.fee_id,
                            fee_type_id: feeTypeAmount?.fee_type_id,
                            fee_type_title: feeTypeAmount?.fee_type_title,
                            fee_installment_type: feeTypeAmount?.fee_installment_type,
                            amount: feeTypeAmount?.amount,
                            payable_amount: payable_amount > 0 ? parseFloat(payable_amount) : 0,
                            paid_amount: paid_amount > 0 ? parseFloat(paid_amount) : 0,
                            due_amount: 0,
                            discount_amount: discount_amount > 0 ? parseFloat(discount_amount) : 0,
                            semester: feeTypeAmount?.semester,
                            is_fee_special: feeTypeAmount?.is_fee_special,
                            is_extra_charge: feeTypeAmount?.is_extra_charge,
                            fee_payment_type: feeTypeAmount?.fee_payment_type,
                            payment_status: feeTypeAmount?.payment_status,
                            adjusted: false,
                            is_new: feeTypeAmount?.is_new ?? false,
                            has_discount: feeTypeAmount?.has_discount ?? false,

                        }
                    }
                    ),
                    total_amount: 0,
                    total_payable_amount: 0,
                    total_paid_amount: 0,
                    total_due_amount: 0,
                    total_discount_amount: 0,
                    fee_payment_type: item?.fee_payment_type,
                    payment_status: item?.payment_status,
                    adjusted: false
                }

                const total_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                    const amountValue = parseFloat(feeAmount.amount) || 0;
                    return total + amountValue;
                }, 0);

                const total_payable_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                    const amountValue = parseFloat(feeAmount.payable_amount) || 0;
                    return total + amountValue;
                }, 0);

                const total_paid_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                    let amountValue = parseFloat(feeAmount.payable_amount - feeAmount?.discount_amount) || 0;

                    if ((feeInstallment?.payment_status == 'Partial' && feeAmount?.has_discount == true) || feeAmount?.is_new) {
                        amountValue = parseFloat(feeAmount?.paid_amount) || 0;
                    }

                    return total + amountValue;
                }, 0);

                const total_discount_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                    // const amountValue = parseFloat(feeAmount.discount_amount) || 0;
                    let amountValue = parseFloat(feeAmount.discount_amount) || 0;

                    if (feeAmount?.payment_status == 'Partial' && feeAmount?.has_discount == true) {
                        amountValue = 0;
                    }
                    return total + amountValue;
                }, 0);

                //old
                // const total_due_amount = total_payable_amount - total_paid_amount;

                // new
                let total_due_amount = (total_payable_amount - (total_paid_amount + total_discount_amount));

                if (total_due_amount > 0) {
                    total_due_amount = parseFloat(total_due_amount)
                }
                else {
                    total_due_amount = 0;
                }

                feeInstallment.total_amount = total_amount > 0 ? parseFloat(total_amount) : 0;
                feeInstallment.total_payable_amount = total_payable_amount > 0 ? parseFloat(total_payable_amount) : 0;
                feeInstallment.total_paid_amount = total_paid_amount > 0 ? parseFloat(total_paid_amount) : 0;
                feeInstallment.total_due_amount = total_due_amount;
                feeInstallment.total_discount_amount = total_discount_amount > 0 ? parseFloat(total_discount_amount) : 0;

                return feeInstallment;
            });

            // new code
            const previousData = prevData?.filter(item => {
                if (
                    (item?.fee_payment_type == 'fee_installment' && selectedInstallments['fee_installment']?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'general_voucher' && selectedInstallments['general_voucher']?.includes(item?.fee?.id)) ||
                    (item?.fee_payment_type == 'transport_voucher' && selectedInstallments['transport_voucher']?.includes(item?.fee?.id))
                ) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return [
                ...previousData,
                ...newInstallments
            ];

        });

        // old code
        // setFormFields(feeInstallmentsData?.map((item, parentIndex) => {
        //     const feeInstallment = {
        //         index: parentIndex,
        //         fee: {
        //             id: item?.fee?.id,
        //             title: item?.fee?.title,
        //         },
        //         fee_type_amounts: item?.fee_type_amounts?.map((feeTypeAmount, index) => {
        //                 let discount_amount = 0;
        //                 let payable_amount = feeTypeAmount?.payable_amount;
        //                 let paid_amount = feeTypeAmount?.payment_status === 'Paid' ? feeTypeAmount?.paid_amount : feeTypeAmount?.payable_amount - discount_amount;

        //                 if (feeTypeAmount?.payment_status === 'Paid' || feeTypeAmount?.discount_amount > 0) {
        //                     discount_amount = feeTypeAmount?.discount_amount;

        //                     if (feeTypeAmount?.is_new) {
        //                         payable_amount = feeTypeAmount?.payable_amount - discount_amount;
        //                         paid_amount = payable_amount;
        //                     }
        //                 }
        //                 else if (feeTypeAmount?.payment_status === 'Partial') {
        //                     discount_amount = feeTypeAmount?.discount_amount;
        //                     payable_amount = feeTypeAmount?.payable_amount;
        //                     paid_amount = payable_amount;
        //                 }
        //                 else if (selectedDiscount?.id != null && selectedDiscount?.discount_fee_type_amounts?.length > 0 && feePaymentType == 'fee_installment') {
        //                     selectedDiscount?.discount_fee_type_amounts?.forEach(discountAmount => {
        //                         if (discountAmount?.fee_type_id == feeTypeAmount?.fee_type_id) {
        //                             discount_amount = parseFloat(discountAmount?.amount);

        //                             if (discount_amount > feeTypeAmount?.payable_amount) {
        //                                 discount_amount = feeTypeAmount?.payable_amount;
        //                             }

        //                             payable_amount = feeTypeAmount?.payable_amount - discount_amount;
        //                             paid_amount = payable_amount;
        //                         }
        //                     });
        //                 }

        //                 return {
        //                     index: index,
        //                     id: feeTypeAmount?.id,
        //                     fee_id: feeTypeAmount?.fee_id,
        //                     fee_type_id: feeTypeAmount?.fee_type_id,
        //                     fee_type_title: feeTypeAmount?.fee_type_title,
        //                     fee_installment_type: feeTypeAmount?.fee_installment_type,
        //                     amount: feeTypeAmount?.amount,
        //                     payable_amount: payable_amount,
        //                     paid_amount: paid_amount,
        //                     due_amount: 0,
        //                     discount_amount: discount_amount,
        //                     semester: feeTypeAmount?.semester,
        //                     is_fee_special: feeTypeAmount?.is_fee_special,
        //                     is_extra_charge: feeTypeAmount?.is_extra_charge,
        //                     fee_payment_type: feeTypeAmount?.fee_payment_type,
        //                     payment_status: feeTypeAmount?.payment_status,
        //                     adjusted: false,
        //                     is_new: feeTypeAmount?.is_new ?? false,
        //                 }
        //             }
        //         ),
        //         total_amount: 0,
        //         total_payable_amount: 0,
        //         total_paid_amount: 0,
        //         total_due_amount: 0,
        //         total_discount_amount: 0,
        //         fee_payment_type: item?.fee_payment_type,
        //         payment_status: item?.payment_status,
        //         adjusted: false
        //     }

        //     const total_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
        //         const amountValue = parseFloat(feeAmount.amount) || 0;
        //         return total + amountValue;
        //     }, 0);

        //     const total_payable_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
        //         const amountValue = parseFloat(feeAmount.payable_amount) || 0;
        //         return total + amountValue;
        //     }, 0);

        //     const total_paid_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
        //         let amountValue = parseFloat(feeAmount.payable_amount - feeAmount?.discount_amount) || 0;

        //         if (feeInstallment?.payment_status == 'Partial' || feeAmount?.is_new) {
        //             amountValue = parseFloat(feeAmount?.paid_amount) || 0;
        //         }

        //         return total + amountValue;
        //     }, 0);

        //     const total_discount_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
        //         const amountValue = parseFloat(feeAmount.discount_amount) || 0;
        //         return total + amountValue;
        //     }, 0);

        //     const total_due_amount = total_payable_amount - total_paid_amount;

        //     feeInstallment.total_amount = total_amount;
        //     feeInstallment.total_payable_amount = total_payable_amount;
        //     feeInstallment.total_paid_amount = total_paid_amount;
        //     feeInstallment.total_due_amount = total_due_amount;
        //     feeInstallment.total_discount_amount = total_discount_amount;

        //     return feeInstallment;
        // }));

        if (!discountRemoveable) {
            setData((prevData) => ({
                ...prevData,
                discount_id: ""
            }));
        }
    }, [feeInstallmentsData, discountRemoveable])
    // initialize form data and add discount to fee end

    // update form data
    const handleFormChange = (event, parentIndex, index, field) => {
        const updatedFields = [...formFields];

        let value = Number.isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value) ;

        if (value > updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount']) {
            value = updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'];
        }

        if (value < 0) {
            value = 0;
        }

        if (field === 'paid_amount' && updatedFields[parentIndex]['fee_type_amounts'][index]['discount_amount'] >= updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount']) {
            value = 0;
        }

        if (
            field === 'discount_amount' &&
            (
                updatedFields[parentIndex]['payment_status'] == 'Partial' &&
                updatedFields[parentIndex]['fee_type_amounts'][index]['has_discount'] == false
            ) || updatedFields[parentIndex]['payment_status'] != 'Paid'
        ) {
            if (
                updatedFields[parentIndex]['fee_type_amounts'][index]['adjusted'] === true &&
                updatedFields[parentIndex]['fee_type_amounts'][index]['paid_amount'] > (updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] - value)
            ) {
                updatedFields[parentIndex]['fee_type_amounts'][index]['paid_amount'] = updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] - value;
            }
            else if (
                value >= updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] ||
                (updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] - value < updatedFields[parentIndex]['fee_type_amounts'][index]['paid_amount'])
            ) {
                updatedFields[parentIndex]['fee_type_amounts'][index]['paid_amount'] = updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] - value;
            }

            updatedFields[parentIndex]['fee_type_amounts'][index]['discount_id'] = null;
            updatedFields[parentIndex]['fee_type_amounts'][index][field] = value;
        }
        else {
            updatedFields[parentIndex]['fee_type_amounts'][index][field] = value;

        }

        // if (field === 'discount_amount' && updatedFields[parentIndex]['fee_type_amounts'][index]['adjusted'] === false) {
        //     updatedFields[parentIndex]['fee_type_amounts'][index]['paid_amount'] = updatedFields[parentIndex]['fee_type_amounts'][index]['payable_amount'] - value;
        // }

        // updatedFields[parentIndex]['fee_type_amounts'][index][field] = value;


        const total_payable_amount = updatedFields[parentIndex]['fee_type_amounts']?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
            const amountValue = parseFloat(feeAmount.payable_amount ?? 0, 10) || 0;
            return total + amountValue;
        }, 0);

        const total_paid_amount = updatedFields[parentIndex]['fee_type_amounts']?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
            const amountValue = parseFloat(feeAmount.paid_amount ?? 0, 10) || 0;
            return total + amountValue;
        }, 0);

        const total_discount_amount = updatedFields[parentIndex]['fee_type_amounts']?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
            // const amountValue = parseFloat(feeAmount.discount_amount ?? 0, 10) || 0;
            let amountValue = parseFloat(feeAmount.discount_amount ?? 0, 10) || 0;;

            if(feeAmount?.payment_status == 'Partial' && feeAmount?.has_discount == true) {
                amountValue = 0;
            }

            return total + amountValue;
        }, 0);

        updatedFields[parentIndex]['total_payable_amount'] = total_payable_amount > 0 ? parseFloat(total_payable_amount) : 0;

        updatedFields[parentIndex]['total_paid_amount'] = total_paid_amount > 0 ? parseFloat(total_paid_amount) : 0;

        updatedFields[parentIndex]['total_discount_amount'] = total_discount_amount > 0 ? parseFloat(total_discount_amount) : 0;

        if (
            updatedFields[parentIndex]['payment_status'] == 'Partial' &&
            updatedFields[parentIndex]['fee_type_amounts'][index]['has_discount'] == true
        ) {
            updatedFields[parentIndex]['total_due_amount'] = (total_payable_amount - total_paid_amount) > 0 ? parseFloat((total_payable_amount - total_paid_amount)) : 0;
        }
        else {
            updatedFields[parentIndex]['total_due_amount'] = (total_payable_amount - (total_discount_amount + total_paid_amount)) > 0 ? parseFloat((total_payable_amount - (total_discount_amount + total_paid_amount))) : 0;
        }

        setFormFields(updatedFields);
    };
    // end update form data


    // handle total fee paid amount change start
    const handleTotalPaidChange = (e) => {
        let amount = e.target.value;

        // if (amount > (totalPayableAmount)) {
        //     amount = totalPayableAmount - totalDiscountAmount
        // }

        setData("total_paid_amount", amount)
        setTotalPaidAmount(amount);
    }
    // handle total fee paid amount change end


    // filter and update form data based on paid amount.
    const handleFeeAdjustment = (e) => {
        // const givenAmount = e.target.value;
        if(e.key == 'Enter' || e.type == 'click') {
            const givenAmount = totalPaidAmount;
            let remainingAmount = givenAmount;
            let groupRemainingAmount = givenAmount;

            const updatedFees = formFields.map(feeGroup => {
                if (
                    (
                        groupRemainingAmount >= feeGroup.total_payable_amount ||
                        (groupRemainingAmount <= feeGroup.total_payable_amount && groupRemainingAmount > 0)
                    )
                    // ) && !feeGroup.adjusted
                ) {
                    // const total_paid_amount = groupRemainingAmount >= feeGroup.total_payable_amount ? feeGroup?.total_paid_amount : groupRemainingAmount;
                    // const total_discount_amount = feeGroup?.total_discount_amount > total_paid_amount ? total_paid_amount : feeGroup?.total_discount_amount;
                    // const total_due_amount = (feeGroup?.total_payable_amount - total_paid_amount) - total_discount_amount;

                    const feeTypeAmounts = feeGroup.fee_type_amounts.map(fee => {
                        if (remainingAmount >= fee.payable_amount || (remainingAmount <= fee.payable_amount && remainingAmount > 0)) {
                            // if ((remainingAmount >= fee.payable_amount || (remainingAmount <= fee.payable_amount && remainingAmount > 0)) && !fee.adjusted) {
                            // const paid_amount = remainingAmount >= fee.payable_amount ? fee?.paid_amount : remainingAmount;
                            // const discount_amount = fee?.discount_amount > paid_amount ? paid_amount : fee?.discount_amount;

                            let paid_amount = remainingAmount >= fee.payable_amount - fee?.discount_amount ? fee.payable_amount - fee?.discount_amount : remainingAmount;
                            if (fee.payment_status != 'Due' && (fee.payment_status == 'Partial' && fee?.has_discount == true)) {
                                paid_amount = remainingAmount >= fee.payable_amount ? fee.payable_amount : remainingAmount;
                            }

                            let discount_amount = fee?.discount_amount > fee.payable_amount ? fee.payable_amount : fee?.discount_amount;
                            if (fee.payment_status != 'Due' && (fee.payment_status == 'Partial' && fee?.has_discount == true)) {
                                discount_amount = fee?.discount_amount;
                            }

                            let due_amount = (fee?.payable_amount - discount_amount) - parseFloat(paid_amount);
                            if (fee.payment_status != 'Due' && (fee.payment_status == 'Partial' && fee?.has_discount == true)) {
                                due_amount = fee?.payable_amount - parseFloat(paid_amount);
                            }

                            const feeData = {
                                index: fee?.index,
                                id: fee?.id,
                                discount_id: fee?.discount_id ?? null,
                                fee_id: fee?.fee_id,
                                fee_type_id: fee?.fee_type_id,
                                fee_type_title: fee?.fee_type_title,
                                fee_installment_type: fee?.fee_installment_type,
                                amount: fee?.amount,
                                payable_amount: fee?.payable_amount,
                                paid_amount: parseFloat(paid_amount),
                                // due_amount: 0,
                                due_amount: due_amount > 0 ? parseFloat(due_amount) : 0,
                                discount_amount: discount_amount > 0 ? parseFloat(discount_amount) : 0,
                                semester: fee?.semester,
                                is_fee_special: fee?.is_fee_special,
                                is_extra_charge: fee?.is_extra_charge,
                                fee_payment_type: fee?.fee_payment_type,
                                payment_status: fee?.payment_status,
                                adjusted: true,
                                is_new: fee?.is_new,
                                has_discount: fee?.has_discount ?? false
                            };

                            if (fee.payment_status != 'Due' && (fee.payment_status == 'Partial' && fee?.has_discount == true)) {
                                remainingAmount -= fee.payable_amount;
                            }
                            else {
                                remainingAmount -=(fee.payable_amount - discount_amount);
                            }

                            // remainingAmount -= fee.payable_amount;

                            return feeData;
                        } else {
                            return {
                                index: fee?.index,
                                id: fee?.id,
                                discount_id: fee?.discount_id ?? null,
                                fee_id: fee?.fee_id,
                                fee_type_id: fee?.fee_type_id,
                                fee_type_title: fee?.fee_type_title,
                                fee_installment_type: fee?.fee_installment_type,
                                amount: fee?.amount,
                                payable_amount: fee?.payable_amount,
                                paid_amount: 0,
                                due_amount: fee?.payable_amount,
                                discount_amount: 0,
                                semester: fee?.semester,
                                is_fee_special: fee?.is_fee_special,
                                is_extra_charge: fee?.is_extra_charge,
                                fee_payment_type: fee?.fee_payment_type,
                                payment_status: fee?.payment_status,
                                adjusted: true,
                                is_new: fee?.is_new,
                                has_discount: fee?.has_discount ?? false
                            };
                        }
                    }).filter(Boolean);

                    const total_paid_amount = parseFloat(feeTypeAmounts?.reduce((total, item) => total + item?.paid_amount, 0));
                    const total_discount_amount = parseFloat(feeTypeAmounts?.reduce((total, item) => total + item?.discount_amount, 0));
                    const total_due_amount = parseFloat(feeTypeAmounts?.reduce((total, item) => total + item?.due_amount, 0));
                    // const total_discount_amount = feeGroup?.total_discount_amount > total_paid_amount ? total_paid_amount : feeGroup?.total_discount_amount;
                    // const total_due_amount = (feeGroup?.total_payable_amount - total_paid_amount) - total_discount_amount;
                    // const total_due_amount = (feeGroup?.total_payable_amount - (total_paid_amount + total_discount_amount)).toFixed(2);

                    const feeGroupData = {
                        index: feeGroup?.index,
                        fee: feeGroup?.fee,
                        has_transport_fee: feeGroup?.has_transport_fee,
                        fee_type_amounts: feeTypeAmounts,
                        total_payable_amount: feeGroup?.total_payable_amount,
                        total_paid_amount: parseFloat(total_paid_amount),
                        total_due_amount: total_due_amount,
                        total_discount_amount: total_discount_amount,
                        fee_payment_type: feeGroup?.fee_payment_type,
                        payment_status: feeGroup?.payment_status,
                        adjusted: true,
                    }

                    // const feeGroupData = {
                    //     index: feeGroup?.index,
                    //     fee: feeGroup?.fee,
                    //     fee_type_amounts: feeGroup.fee_type_amounts.map(fee => {
                    //         if (remainingAmount >= fee.payable_amount || (remainingAmount <= fee.payable_amount && remainingAmount > 0)) {
                    //         // if ((remainingAmount >= fee.payable_amount || (remainingAmount <= fee.payable_amount && remainingAmount > 0)) && !fee.adjusted) {
                    //             const paid_amount = remainingAmount >= fee.payable_amount ? fee?.paid_amount : remainingAmount;
                    //             const discount_amount = fee?.discount_amount > paid_amount ? paid_amount : fee?.discount_amount;

                    //             const feeData = {
                    //                 index: fee?.index,
                    //                 id: fee?.id,
                    //                 fee_id: fee?.fee_id,
                    //                 fee_type_id: fee?.fee_type_id,
                    //                 fee_type_title: fee?.fee_type_title,
                    //                 fee_installment_type: fee?.fee_installment_type,
                    //                 amount: fee?.amount,
                    //                 payable_amount: fee?.payable_amount,
                    //                 paid_amount: parseFloat(paid_amount),
                    //                 // due_amount: 0,
                    //                 due_amount: (fee?.payable_amount - discount_amount) - parseFloat(paid_amount),
                    //                 discount_amount: discount_amount,
                    //                 semester: fee?.semester,
                    //                 is_fee_special: fee?.is_fee_special,
                    //                 is_extra_charge: fee?.is_extra_charge,
                    //                 payment_status: fee?.payment_status,
                    //                 adjusted: true,
                    //                 is_new: fee?.is_new
                    //             };

                    //             remainingAmount -= fee.payable_amount;

                    //             return feeData;
                    //         } else {
                    //             return {
                    //                 index: fee?.index,
                    //                 id: fee?.id,
                    //                 fee_id: fee?.fee_id,
                    //                 fee_type_id: fee?.fee_type_id,
                    //                 fee_type_title: fee?.fee_type_title,
                    //                 fee_installment_type: fee?.fee_installment_type,
                    //                 amount: fee?.amount,
                    //                 payable_amount: fee?.payable_amount,
                    //                 paid_amount: 0,
                    //                 due_amount: fee?.payable_amount,
                    //                 discount_amount: 0,
                    //                 semester: fee?.semester,
                    //                 is_fee_special: fee?.is_fee_special,
                    //                 is_extra_charge: fee?.is_extra_charge,
                    //                 payment_status: fee?.payment_status,
                    //                 adjusted: true,
                    //                 is_new: fee?.is_new
                    //             };
                    //         }
                    //     }).filter(Boolean),
                    //     total_payable_amount: feeGroup?.total_payable_amount,
                    //     total_paid_amount: parseFloat(total_paid_amount),
                    //     total_due_amount: total_due_amount,
                    //     total_discount_amount: total_discount_amount,
                    //     payment_status: feeGroup?.payment_status,
                    //     adjusted: true,
                    // }

                    if (feeGroup.payment_status != 'Due') {
                        // groupRemainingAmount -= feeGroup?.total_payable_amount;
                        groupRemainingAmount -= Object.values(feeGroup?.fee_type_amounts)?.reduce((total, feeItem) => {
                            if(feeItem?.payment_status == 'Partial' && feeItem?.has_discount == false) {
                                return total + ((feeItem?.payable_amount ?? 0) - (feeItem?.discount_amount ?? 0));
                            }
                            else {
                                return total + (feeItem?.payable_amount ?? 0);
                            }
                        }, 0);
                    }
                    else {
                        groupRemainingAmount -= (feeGroup?.total_payable_amount - feeGroup?.total_discount_amount);
                    }

                    // groupRemainingAmount -= feeGroup?.total_payable_amount;

                    return feeGroupData
                }
                else {
                    return null
                }
            }).filter(Boolean);

            const updatedInstallments = {
                fee_installment: updatedFees?.filter(item => item?.fee_payment_type == 'fee_installment')?.map(item => item?.fee?.id),
                general_voucher: updatedFees?.filter(item => item?.fee_payment_type == 'general_voucher')?.map(item => item?.fee?.id),
                transport_voucher: updatedFees?.filter(item => item?.fee_payment_type == 'transport_voucher')?.map(item => item?.fee?.id)
            };

            setSelectedInstallments(updatedInstallments)

            setFormFields(updatedFees);
        }
    };
    // filter and update form data based on paid amount


    // handle discount change start
    const handleDiscountChange = () => {
        const selectedDiscountData = discounts?.find(item => item?.id == data?.discount_id);
        setSelectedDiscount(selectedDiscountData)
        setDiscountRemoveable(true)

        const updatedData = formFields?.map((item, parentIndex) => {
            const feeInstallment = {
                index: parentIndex,
                fee: {
                    id: item?.fee?.id,
                    title: item?.fee?.title,
                },
                has_transport_fee: item?.has_transport_fee,
                fee_type_amounts: item?.fee_type_amounts?.map((feeTypeAmount, index) => {
                    let discount_amount = 0;
                    let payable_amount = feeTypeAmount?.payable_amount;
                    let paid_amount = feeTypeAmount?.payment_status === 'Paid' ? feeTypeAmount?.paid_amount : feeTypeAmount?.payable_amount - discount_amount;

                    let discountId = null

                    if (feeTypeAmount?.payment_status === 'Paid' || feeTypeAmount?.discount_amount > 0) {
                        discount_amount = feeTypeAmount?.discount_amount;

                        if (feeTypeAmount?.is_new) {
                            payable_amount = feeTypeAmount?.payable_amount - discount_amount;
                            paid_amount = payable_amount;
                        }
                    }
                    else if (feeTypeAmount?.payment_status === 'Partial' && feeTypeAmount?.has_discount == true) {
                        discount_amount = feeTypeAmount?.discount_amount;
                        payable_amount = feeTypeAmount?.payable_amount;
                        paid_amount = payable_amount;
                    }
                    else if (selectedDiscountData?.id != null && selectedDiscountData?.discount_fee_type_amounts?.length > 0 && feePaymentType == 'fee_installment' && feeTypeAmount?.fee_payment_type == 'fee_installment') {
                        selectedDiscountData?.discount_fee_type_amounts?.forEach(discountAmount => {
                            if (discountAmount?.fee_type_id == feeTypeAmount?.fee_type_id) {
                                //old code
                                // discount_amount = parseFloat(discountAmount?.amount);

                                // new code
                                if (selectedDiscountData?.is_discount_percentage == true) {
                                    discount_amount = (parseFloat(discountAmount?.amount ?? 0) / 100) * parseFloat(feeTypeAmount?.amount ?? 0);
                                }
                                else {
                                    discount_amount = parseFloat(discountAmount?.amount);
                                }

                                if (discount_amount > feeTypeAmount?.payable_amount) {
                                    discount_amount = feeTypeAmount?.payable_amount;
                                }

                                paid_amount = feeTypeAmount?.payable_amount - discount_amount;

                                discountId = discountAmount?.discount_id ?? null;
                            }
                        });
                    }

                    return {
                        index: index,
                        id: feeTypeAmount?.id,
                        discount_id: discountId,
                        fee_id: feeTypeAmount?.fee_id,
                        fee_type_id: feeTypeAmount?.fee_type_id,
                        fee_type_title: feeTypeAmount?.fee_type_title,
                        fee_installment_type: feeTypeAmount?.fee_installment_type,
                        amount: feeTypeAmount?.amount,
                        payable_amount: payable_amount,
                        paid_amount: paid_amount,
                        due_amount: 0,
                        discount_amount: discount_amount,
                        semester: feeTypeAmount?.semester,
                        is_fee_special: feeTypeAmount?.is_fee_special,
                        is_extra_charge: feeTypeAmount?.is_extra_charge,
                        fee_payment_type: feeTypeAmount?.fee_payment_type,
                        payment_status: feeTypeAmount?.payment_status,
                        adjusted: false,
                        is_new: feeTypeAmount?.is_new ?? false,
                        has_discount: feeTypeAmount?.has_discount ?? false,
                    }
                }
                ),
                total_amount: 0,
                total_payable_amount: 0,
                total_paid_amount: 0,
                total_due_amount: 0,
                total_discount_amount: 0,
                fee_payment_type: item?.fee_payment_type,
                payment_status: item?.payment_status,
                adjusted: false
            }

            const total_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.amount) || 0;
                return total + amountValue;
            }, 0);

            const total_payable_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.payable_amount) || 0;
                return total + amountValue;
            }, 0);

            const total_paid_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                let amountValue = parseFloat(feeAmount.payable_amount - feeAmount?.discount_amount) || 0;

                if ((feeInstallment?.payment_status == 'Partial' && feeAmount?.has_discount == true) || feeAmount?.is_new) {
                    amountValue = parseFloat(feeAmount?.paid_amount) || 0;
                }

                return total + amountValue;
            }, 0);

            const total_discount_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.discount_amount) || 0;
                return total + amountValue;
            }, 0);

            // const total_due_amount = total_payable_amount - total_paid_amount;
            // const total_due_amount = (total_payable_amount - total_discount_amount) - total_paid_amount;
            let total_due_amount = (total_payable_amount - (total_paid_amount + total_discount_amount));

            if (total_due_amount > 0) {
                total_due_amount = parseFloat(total_due_amount)
            }
            else {
                total_due_amount = 0;
            }

            feeInstallment.total_amount = total_amount;
            feeInstallment.total_payable_amount = total_payable_amount;
            feeInstallment.total_paid_amount = total_paid_amount;
            feeInstallment.total_due_amount = total_due_amount;
            feeInstallment.total_discount_amount = total_discount_amount;

            return feeInstallment;
        });

        setFormFields(updatedData);
    }

    const handleDiscountRemove = () => {
        setSelectedDiscount({})
        setDiscountRemoveable(false)
        const discount_removed = true;
        setDiscountRemoved(discount_removed);

        const updatedData = formFields?.map((item, parentIndex) => {
            const feeInstallment = {
                index: parentIndex,
                fee: {
                    id: item?.fee?.id,
                    title: item?.fee?.title,
                },
                has_transport_fee: item?.has_transport_fee,
                fee_type_amounts: item?.fee_type_amounts?.map((feeTypeAmount, index) => {
                    let discount_amount = 0;
                    let payable_amount = feeTypeAmount?.payable_amount;
                    let paid_amount = feeTypeAmount?.payment_status === 'Paid' ? feeTypeAmount?.paid_amount : feeTypeAmount?.payable_amount - discount_amount;

                    if (feeTypeAmount?.payment_status === 'Paid' || feeTypeAmount?.discount_amount > 0) {
                        discount_amount = feeTypeAmount?.discount_amount;

                        if (discount_removed){
                            discount_amount = 0;
                        }

                        if (feeTypeAmount?.is_new) {
                            payable_amount = feeTypeAmount?.payable_amount - discount_amount;
                            paid_amount = payable_amount;
                        }
                    }
                    else if (feeTypeAmount?.payment_status === 'Partial' && feeTypeAmount?.has_discount == true) {
                        discount_amount = feeTypeAmount?.discount_amount;
                        payable_amount = feeTypeAmount?.payable_amount;
                        paid_amount = payable_amount;
                    }
                    else if (selectedDiscount?.id != null && selectedDiscount?.discount_fee_type_amounts?.length > 0 && feePaymentType == 'fee_installment' && feeTypeAmount?.fee_payment_type == 'fee_installment') {
                        selectedDiscount?.discount_fee_type_amounts?.forEach(discountAmount => {
                            if (discountAmount?.fee_type_id == feeTypeAmount?.fee_type_id) {
                                // old code
                                // discount_amount = parseFloat(discountAmount?.amount);

                                // new code
                                if (selectedDiscount?.is_discount_percentage == true) {
                                    discount_amount = (parseFloat(discountAmount?.amount ?? 0) / 100) * parseFloat(feeTypeAmount?.amount ?? 0);
                                }
                                else {
                                    discount_amount = parseFloat(discountAmount?.amount);
                                }

                                if (discount_amount > feeTypeAmount?.payable_amount) {
                                    discount_amount = feeTypeAmount?.payable_amount;
                                }

                                paid_amount = feeTypeAmount?.payable_amount - discount_amount;
                            }
                        });
                    }

                    return {
                        index: index,
                        id: feeTypeAmount?.id,
                        discount_id: null,
                        fee_id: feeTypeAmount?.fee_id,
                        fee_type_id: feeTypeAmount?.fee_type_id,
                        fee_type_title: feeTypeAmount?.fee_type_title,
                        fee_installment_type: feeTypeAmount?.fee_installment_type,
                        amount: feeTypeAmount?.amount,
                        payable_amount: payable_amount,
                        paid_amount: paid_amount,
                        due_amount: 0,
                        discount_amount: discount_amount,
                        semester: feeTypeAmount?.semester,
                        is_fee_special: feeTypeAmount?.is_fee_special,
                        is_extra_charge: feeTypeAmount?.is_extra_charge,
                        fee_payment_type: feeTypeAmount?.fee_payment_type,
                        payment_status: feeTypeAmount?.payment_status,
                        adjusted: false,
                        is_new: feeTypeAmount?.is_new ?? false,
                        has_discount: feeTypeAmount?.has_discount ?? false,
                    }
                }
                ),
                total_amount: 0,
                total_payable_amount: 0,
                total_paid_amount: 0,
                total_due_amount: 0,
                total_discount_amount: 0,
                fee_payment_type: item?.fee_payment_type,
                payment_status: item?.payment_status,
                adjusted: false
            }

            const total_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.amount) || 0;
                return total + amountValue;
            }, 0);

            const total_payable_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.payable_amount) || 0;
                return total + amountValue;
            }, 0);

            const total_paid_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                let amountValue = parseFloat(feeAmount.payable_amount - feeAmount?.discount_amount) || 0;

                if ((feeInstallment?.payment_status == 'Partial' && feeAmount?.has_discount == true) || feeAmount?.is_new) {
                    amountValue = parseFloat(feeAmount?.paid_amount) || 0;
                }

                return total + amountValue;
            }, 0);

            const total_discount_amount = Object.values(feeInstallment?.fee_type_amounts)?.filter(item => item?.payment_status !== 'Paid').reduce((total, feeAmount) => {
                const amountValue = parseFloat(feeAmount.discount_amount) || 0;
                return total + amountValue;
            }, 0);

            // const total_due_amount = total_payable_amount - total_paid_amount;
            // const total_due_amount = (total_payable_amount - total_discount_amount) - total_paid_amount;
            let total_due_amount = (total_payable_amount - (total_paid_amount + total_discount_amount));

            if (total_due_amount) {
                total_due_amount = parseFloat(total_due_amount)
            }

            feeInstallment.total_amount = total_amount;
            feeInstallment.total_payable_amount = total_payable_amount;
            feeInstallment.total_paid_amount = total_paid_amount;
            feeInstallment.total_due_amount = total_due_amount;
            feeInstallment.total_discount_amount = total_discount_amount;

            return feeInstallment;
        });

        setFormFields(updatedData);
    }
    // handle discount change end


    // handle remove extra fee start
    const handleRemoveExtraFee = (parentIndex, index) => {
        // old code
        // feeInstallmentsData[parentIndex]?.fee_type_amounts?.splice(index, 1);
        // const updatedData = [...feeInstallmentsData];
        // setFeeInstallmentsData(updatedData);

        const removeableItem = formFields[parentIndex]?.fee_type_amounts[index];

        formFields[parentIndex]?.fee_type_amounts?.splice(index, 1);

        formFields[parentIndex]['total_amount'] = formFields[parentIndex]['total_amount'] - removeableItem['amount']
        formFields[parentIndex]['total_discount_amount'] = formFields[parentIndex]['total_discount_amount'] - removeableItem['discount_amount']
        formFields[parentIndex]['total_payable_amount'] = formFields[parentIndex]['total_payable_amount'] - removeableItem['payable_amount']
        formFields[parentIndex]['total_paid_amount'] = formFields[parentIndex]['total_paid_amount'] - removeableItem['paid_amount']
        // formFields[parentIndex]['total_due_amount'] = formFields[parentIndex]['total_due_amount'] - removeableItem['due_amount']
        formFields[parentIndex]['total_due_amount'] = parseFloat(formFields[parentIndex]['total_payable_amount']) - formFields[parentIndex]['total_paid_amount']

        const updatedFormFields = [...formFields];

        setFormFields(updatedFormFields);
    }
    // handle remove extra fee end

    // handle extra fee pop start
    const handleExtraFeePopupClick = () => {
        setFeeTypePopup(true);
    }
    // handle extra fee pop end


    const handleFeePaymentData = (e) => {
        e.preventDefault();
    };


    const extraFeeDataFromChild = (data) => {
        setSelectedExtraFeeTypeIds(data?.map(item => item?.fee_type_id));

        const feeIds = data?.map(item => item?.fee_type_id)

        // old code
        // setFeeInstallmentsData((prevData) => {
        //     let updatedData = prevData.map(item => ({
        //         ...item,
        //         fee_type_amounts: item?.fee_type_amounts?.filter(feeTypeItem => {
        //             if (feeTypeItem?.payment_status === 'Due') {
        //                 return !feeIds?.includes(feeTypeItem?.fee_type_id)
        //             }
        //             else {
        //                 return true;
        //             }
        //         }
        //         )
        //     }));

        //     updatedData = updatedData?.map(item => {
        //         if (item?.fee?.id == feeData?.fee?.id && item?.payment_status === 'Due') {
        //             return {
        //                 ...item,
        //                 fee_type_amounts: [...item?.fee_type_amounts, ...data]
        //             }
        //         }
        //         else {
        //             return item;
        //         }
        //     })

        //     return [...updatedData];
        // });

        setFormFields((prevData) => {
            let updatedData = prevData.map(item => ({
                ...item,
                fee_type_amounts: item?.fee_type_amounts?.filter(feeTypeItem => {
                    if (feeTypeItem?.payment_status === 'Due' && feeTypeItem?.fee_payment_type == 'fee_installment') {
                        return !feeIds?.includes(feeTypeItem?.fee_type_id)
                    }
                    else {
                        return true;
                    }
                })
            }));

            updatedData = updatedData?.map(item => {
                if (item?.fee?.id == feeData?.fee?.id && item?.payment_status === 'Due' && item?.fee_payment_type == 'fee_installment') {
                    return {
                        ...item,
                        fee_type_amounts: [...item?.fee_type_amounts,...data]
                    }
                }
                else {
                    return item;
                }
            });

            updatedData = updatedData?.map(item => {
                return {
                    ...item,
                    total_amount:item?.fee_type_amounts?.reduce((total, item) => total + item?.amount, 0),
                    total_discount_amount:item?.fee_type_amounts?.reduce((total, item) => total + item?.discount_amount, 0),
                    total_paid_amount:item?.fee_type_amounts?.reduce((total, item) => total + item?.paid_amount, 0),
                    // total_payable_amount: item?.fee_type_amounts?.reduce((total, item) => total + (item?.payable_amount - item?.discount_amount), 0),
                    total_payable_amount: item?.fee_type_amounts?.reduce((total, item) => total + item?.payable_amount, 0),
                    total_due_amount: item?.fee_type_amounts?.reduce((total, item) => total + item?.due_amount, 0),
                }
            })

            return [...updatedData];
        });
    }

    return (
        <>
        <div className="educare-admission-list-area">
            <div className="educare-card-title flex flex-wrap items-center justify-between gap-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Fee Structure
                </h5>
                {(selectedStudent?.id != null && feePaymentType === 'fee_installment') &&
                    <div className='flex flex-wrap gap-1 items-end'>
                        {/* {selectedDiscount?.id != null && studenHasDiscount ? */}
                        {selectedDiscount?.id != null ?
                            <div className="educare-input-field-styles">
                                <span className="educare-success-btn-md-fill">
                                    {selectedDiscount?.title}
                                </span>
                                {(discountRemoveable && !studenHasDiscount) &&
                                    <div className="educare-filter-action-btn">
                                        <div>
                                            <Tooltip
                                                title="Remove Discount"
                                                placement="top"
                                                arrow
                                            >
                                                <button type='button'
                                                    className="educare-danger-btn-md-fill"
                                                    onClick={(e) => {
                                                        handleDiscountRemove()
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                }
                            </div>
                        :
                            <>
                                <div className="educare-input-field-styles">
                                    <SelectInput
                                        id="discount_id"
                                        data_label="Discount"
                                        data={discounts}
                                        value={
                                            data.discount_id
                                        }
                                        onChange={(e) =>
                                            setData('discount_id', e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.discount_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-filter-action-btn">
                                    <div>
                                        <Tooltip
                                            title="Apply To Discount"
                                            placement="top"
                                            arrow
                                        >
                                            <button type='button'
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) => {
                                                    handleDiscountChange()
                                                }}
                                            >
                                                Apply
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                }
            </div>
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <form onSubmit={handleFeePaymentData}>
                            <div className="educare-admission-list pb-none">
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>Sr.	</th>
                                        <th>Title</th>
                                        <th>Payable</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                        <th>Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Admission Fee</td>
                                        <td>5500</td>
                                        <td>5500</td>
                                        <td>0</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Amount</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>0</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Concession</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>0</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Payable(Amount - Concession)</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>0</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>Hit "ENTER" button after entering "Paid" amount</div>
                                        </td>
                                        <td><div className='text-end pr-2.5'>Paid</div></td>
                                        <td>
                                            <div className='max-w-[80px] font-primary educare-input-field-styles-px-8'>
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="total_paid_single"
                                                        value={
                                                            data.total_paid_single
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "total_paid_single",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Due (Payable - Paid)</div>
                                        </td>
                                        <td>
                                            <strong className='text-danger'>0</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <table className='mt-4'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Payable</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formFields?.length > 0 &&
                                        formFields?.map((item, parentIndex) => (
                                            <>
                                                <tr key={parentIndex}>
                                                    <td>
                                                        <div className='inline-block'>
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => handleEnqToggle(parentIndex)}
                                                            >
                                                                <i
                                                                    className={`${enqInnerActive[parentIndex]
                                                                            ? "icon-arrow-up"
                                                                            : "icon-down-arrow"}`}
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item?.fee?.title}

                                                        {(item?.fee_payment_type == 'fee_installment' && item?.has_transport_fee == true) &&
                                                            <span className="icon-bus ml-2 text-danger"></span>
                                                        }

                                                        {item?.fee_payment_type == 'general_voucher' &&
                                                            <span className="text-primary"> ( General Voucher )</span>
                                                        }
                                                        {item?.fee_payment_type == 'transport_voucher' &&
                                                            <span className="text-primary"> ( Transport Voucher )</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        {item?.payment_status == 'Partial'?
                                                            item?.total_payable_amount > 0 ? parseFloat((Object.values(item?.fee_type_amounts)?.reduce((total, feeItem) => {
                                                                if (feeItem?.payment_status == 'Due' || (feeItem?.payment_status == 'Partial' && feeItem?.has_discount == false)) {
                                                                    return total + ((feeItem?.payable_amount ?? 0) - (feeItem?.discount_amount ?? 0));
                                                                } else {
                                                                    return total + (feeItem?.payable_amount ?? 0);
                                                                }
                                                            }, 0)).toFixed(2)) : 0
                                                            // item?.total_payable_amount > 0 ? parseFloat(item?.total_payable_amount.toFixed(2)) : 0
                                                        :
                                                            (item?.total_payable_amount - item?.total_discount_amount) > 0 ? parseFloat((item?.total_payable_amount - item?.total_discount_amount).toFixed(2)) : 0
                                                        }
                                                    </td>
                                                    <td>{item?.total_paid_amount > 0 ? parseFloat(item?.total_paid_amount.toFixed(2)) : 0}</td>
                                                    <td>{item?.total_due_amount > 0 ? parseFloat(item?.total_due_amount.toFixed(2)) : 0}</td>
                                                    <td>
                                                        {item?.fee_payment_type === 'fee_installment' &&
                                                            <button type='button'
                                                                className="educare-secondary-btn-sm-stroke"
                                                                onClick={(e) => {
                                                                    handleExtraFeePopupClick()
                                                                    setFeeData(item);
                                                                    setSelectedExtraFeeTypeIds([])
                                                                    // setSelectedExtraFeeTypes(item?.fee_type_amounts?.filter(item => item?.is_extra_charge && item?.payment_status === 'Due'));
                                                                }}
                                                            >
                                                                <i className="icon-PlusCircle"></i>
                                                                Extra Charge
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr className={`${enqInnerActive[parentIndex] ? "" : "hidden"}`}>
                                                    <td
                                                        colSpan="12"
                                                        className="educare-admission-list-enq-inner-wrap"
                                                    >
                                                        <table className="educare-admission-list-enq-inner educare-admission-list-enq-inner-head-bg">
                                                            <thead>
                                                                <tr>
                                                                    <th>Fee Type</th>
                                                                    <th>Amount</th>
                                                                    <th>Concession</th>
                                                                    <th>Amt. Payable</th>
                                                                    <th>Amt. Paid</th>
                                                                    <th>Due</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item?.fee_type_amounts?.length > 0 && (
                                                                    item?.fee_type_amounts?.map((feeTypeAmount, index) => (
                                                                        <tr key={index} className={feeTypeAmount?.payment_status == 'Partial' ? 'bg-rose-300' : (feeTypeAmount?.payment_status == 'Paid' ? 'bg-green-200' : '')}>
                                                                            <td>
                                                                                {feeTypeAmount?.fee_type_title}
                                                                                {feeTypeAmount?.is_extra_charge &&
                                                                                    <span className="badge bg-primary">Extra</span>
                                                                                }
                                                                            </td>
                                                                            <td>{feeTypeAmount?.amount}</td>
                                                                            <td>
                                                                                <div className='max-w-[80px] font-primary educare-input-field-styles-px-8'>
                                                                                    <div className="educare-input-field-styles">
                                                                                        <TextInput
                                                                                            disabled={
                                                                                                (feeTypeAmount?.has_discount == true) ||
                                                                                                feeTypeAmount?.payment_status == 'Paid' ? true: false
                                                                                            }
                                                                                            // disabled={
                                                                                            //     feeTypeAmount?.payment_status == 'Partial' || feeTypeAmount?.payment_status == 'Paid' ? true: false
                                                                                            // }
                                                                                            id="discount_amount"
                                                                                            name="discount_amount"
                                                                                            value={feeTypeAmount?.discount_amount > 0 ? parseFloat(feeTypeAmount?.discount_amount.toFixed(2)): 0}
                                                                                            onChange={(e) => {
                                                                                                    handleFormChange(e, parentIndex, index,"discount_amount")
                                                                                                }
                                                                                            }
                                                                                            className={`${
                                                                                                (feeTypeAmount?.has_discount == true) ||feeTypeAmount?.payment_status == 'Paid' ? 'cursor-not-allowed' : ''}  block`}
                                                                                            // className={`${feeTypeAmount?.payment_status == 'Partial' || feeTypeAmount?.payment_status == 'Paid' ? 'cursor-not-allowed' : ''}  block`}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <td>
                                                                                    {feeTypeAmount?.payment_status == 'Partial'?
                                                                                    // {feeTypeAmount?.payment_status == 'Partial' || feeTypeAmount?.is_new == true ?
                                                                                        //new code start
                                                                                        `(${feeTypeAmount?.amount}-${(feeTypeAmount?.amount) - feeTypeAmount?.payable_amount})=${feeTypeAmount?.payable_amount > 0 ? parseFloat(feeTypeAmount?.payable_amount.toFixed(2)) : 0}`

                                                                                        // `(${feeTypeAmount?.amount - feeTypeAmount?.discount_amount}-${(feeTypeAmount?.amount - feeTypeAmount?.discount_amount) - feeTypeAmount?.payable_amount})=${feeTypeAmount?.payable_amount > 0 ? parseFloat(feeTypeAmount?.payable_amount.toFixed(2)) : 0}`

                                                                                        //new code end
                                                                                        // feeTypeAmount?.payable_amount > 0 ? parseFloat(feeTypeAmount?.payable_amount.toFixed(2)) : 0
                                                                                    :
                                                                                        (feeTypeAmount?.payable_amount - feeTypeAmount?.discount_amount) <= 0 ? 0 : parseFloat((feeTypeAmount?.payable_amount - feeTypeAmount?.discount_amount).toFixed(2))
                                                                                        // feeTypeAmount?.discount_id == null ?
                                                                                        //     : feeTypeAmount?.payable_amount > 0 ? parseFloat(feeTypeAmount?.payable_amount.toFixed(2)) : 0

                                                                                    }
                                                                                </td>
                                                                            </td>
                                                                            <td>
                                                                                <div className='max-w-[80px] font-primary educare-input-field-styles-px-8'>
                                                                                    <div className="educare-input-field-styles">
                                                                                        <TextInput
                                                                                            disabled={
                                                                                                feeTypeAmount?.payment_status == 'Paid' ? true : false
                                                                                            }
                                                                                            id="paid_amount"
                                                                                            value={
                                                                                                feeTypeAmount?.paid_amount <= 0 ? 0 : parseFloat(feeTypeAmount?.paid_amount.toFixed(2))
                                                                                            }
                                                                                            onChange={(e) => {
                                                                                                    setData("paid_amount", e.target.value)
                                                                                                    handleFormChange(e, parentIndex, index, "paid_amount")
                                                                                                }
                                                                                            }
                                                                                            className={`${feeTypeAmount?.payment_status == 'Paid' ? 'cursor-not-allowed' : ''} block`} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="flex justify-between">
                                                                                    <span>
                                                                                        {feeTypeAmount?.payment_status == 'Partial' &&
                                                                                            feeTypeAmount?.has_discount == true?
                                                                                            ((feeTypeAmount?.payable_amount - feeTypeAmount?.paid_amount)) <= 0 ? 0 : parseFloat((feeTypeAmount?.payable_amount - feeTypeAmount?.paid_amount).toFixed(2))
                                                                                        :
                                                                                            (feeTypeAmount?.payable_amount - (feeTypeAmount?.paid_amount + feeTypeAmount?.discount_amount)) <= 0 ? 0 : parseFloat((feeTypeAmount?.payable_amount - (feeTypeAmount?.paid_amount + feeTypeAmount?.discount_amount)).toFixed(2))
                                                                                        }
                                                                                    </span>

                                                                                    {(feeTypeAmount?.is_extra_charge && feeTypeAmount?.payment_status == 'Due') &&
                                                                                        <div className="educare-list-button-field-styles">
                                                                                            <Tooltip title="Delete" placement="top" arrow>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="educare-danger-btn-sm-fill"
                                                                                                    onClick={(e) => {
                                                                                                        // old code
                                                                                                        // handleRemoveExtraFee(item?.index, feeTypeAmount?.index);
                                                                                                        handleRemoveExtraFee(parentIndex, index);
                                                                                                    }}
                                                                                                >
                                                                                                    <i className="icon-TrashSimple"></i>
                                                                                                </button>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                )}
                                                                <tr>
                                                                    <td><strong className='text-heading'>SubTotal</strong></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        <strong className='text-heading'>
                                                                            {item?.payment_status == 'Partial'?
                                                                                item?.total_payable_amount > 0 ? parseFloat((Object.values(item?.fee_type_amounts)?.reduce((total, feeItem) => {
                                                                                    if (feeItem?.payment_status == 'Due' || (feeItem?.payment_status == 'Partial' && feeItem?.has_discount == false)) {
                                                                                        return total + ((feeItem?.payable_amount ?? 0) - (feeItem?.discount_amount ?? 0));
                                                                                    } else {
                                                                                        return total + (feeItem?.payable_amount ?? 0);
                                                                                    }
                                                                                }, 0)).toFixed(2)) : 0
                                                                                // item?.total_payable_amount > 0 ? parseFloat(item?.total_payable_amount.toFixed(2)) : 0
                                                                            :
                                                                                item?.total_payable_amount - item?.total_discount_amount > 0 ? parseFloat((item?.total_payable_amount - item?.total_discount_amount).toFixed(2)) : 0
                                                                            }
                                                                            {/* {item?.total_payable_amount  - item?.total_discount_amount} */}
                                                                        </strong>
                                                                    </td>
                                                                    <td><strong className='text-heading'>{ item?.total_paid_amount > 0 ?parseFloat(item?.total_paid_amount.toFixed(2)) : 0}</strong></td>
                                                                    <td><strong className='text-danger'>{ item?.total_due_amount > 0 ?parseFloat(item?.total_due_amount.toFixed(2)) : 0}</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }

                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Amount</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>
                                                {totalPayableAmount}
                                                    {/* {totalAmount} */}
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Concession</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>
                                                {totalDiscountAmount}
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Payable(Amount - Concession)</div>
                                        </td>
                                        <td>
                                            <strong className='text-heading'>
                                                    {/* {totalAmount - totalDiscountAmount} */}
                                                    {(totalPayableAmount - totalDiscountAmount) > 0 ? parseFloat((totalPayableAmount - totalDiscountAmount).toFixed(2)) : 0}
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>After entering "Paid" Amount Please Hit "ENTER" (Keyboard)  or Equal(=) Button</div>
                                        </td>
                                        <td><div className='text-end pr-2.5'>Paid</div></td>
                                        <td>
                                            <div className='font-primary educare-input-field-styles-px-8'>
                                                <div className="educare-input-field-styles flex gap-2 items-center">
                                                    <TextInput
                                                        // readOnly
                                                        id="total_paid_amount"
                                                        value={totalPaidAmount}
                                                        onChange={(e) => {
                                                                handleTotalPaidChange(e)
                                                                // handleFeeAdjustment(e);
                                                            }
                                                        }
                                                        onKeyUp={(e) => {
                                                            handleFeeAdjustment(e);
                                                        }}
                                                        // onKeyPress={(e) => {
                                                        //     handleFeeAdjustment(e);
                                                        // }}
                                                            className="block max-w-[80px]"
                                                    />
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleFeeAdjustment(e)
                                                        }}
                                                    >
                                                            <i className="icon-Equals"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='text-end pr-2.5'>Due (Payable - Paid)</div>
                                        </td>
                                        <td>
                                            <strong className='text-danger'>
                                                {totalDueAmount}
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <SelectFeeTypePopup
            setSelectedExtraFeeTypes={setSelectedExtraFeeTypes}
            selectedFeeTypes={selectedExtraFeeTypes}
            feeTypePopup={feeTypePopup}
            setFeeTypePopup={setFeeTypePopup}
            feeTypes={extraFeeTypes}
            selectedExtraFeeTypes={selectedExtraFeeTypes}
            feeData={feeData}
            setSelectedFeeTypeIds={setSelectedExtraFeeTypeIds}
            selectedFeeTypeIds={selectedExtraFeeTypeIds}
            sendExtraFeeDataToParent={extraFeeDataFromChild}
            // formReset={formReset}
        />
    </>
    );
};

export default FeeStructure;
