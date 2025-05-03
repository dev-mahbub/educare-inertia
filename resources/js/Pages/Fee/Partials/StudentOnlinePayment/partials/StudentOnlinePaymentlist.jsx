import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from "@/Components/RadioInput";
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { useRazorpay } from "react-razorpay";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnlinePaymentFeeStructureList from './OnlinePaymentFeeStructureList';

const StudentOnlinePaymentlist = ({
    studentFeeInstallments,
    studentFeeVouchers,
    school,
    student
}) => {

    const { error, isLoading, Razorpay } = useRazorpay();
    const [selectedInstallments, setSelectedInstallments] = useState({
        fee_installment: [],
        general_voucher: []
    });

    const installmentsData = Object.values(selectedInstallments)?.flatMap(item => item);
    const feeInstallmentIds = selectedInstallments?.fee_installment?.map(item => item?.fee?.id);
    const voucherInstallmentIds = selectedInstallments?.general_voucher?.map(item => item?.fee?.id);
    const totalAmount = installmentsData?.flatMap(item => item?.fee_type_amounts)?.reduce((total, item) => total + (item?.payment_status != 'Paid' ? item?.payable_amount : 0), 0);
    const feeInstallmentsArray = installmentsData.flatMap(item => item.fee_type_amounts)?.filter(item => item?.payment_status != 'Paid')?.map(item => {
        let discount_amount = item?.discount_amount;

        if ((item?.payment_status === 'Partial' && item?.has_discount === true) || item?.payment_status === 'Paid') {
            discount_amount = 0;
        }

        return {
            id: item?.id,
            discount_id: item?.discount_id ?? null,
            fee_id: item?.fee_id,
            fee_type_id: item?.fee_type_id,
            amount: item?.amount,
            payable_amount: item?.payable_amount,
            paid_amount: item?.payable_amount,
            discount_amount: discount_amount > 0 ? parseFloat(discount_amount) : 0,
            fee_payment_type: item?.fee_payment_type,
            payment_status: item?.payment_status,
        }
    });

    const {
        data,
        setData
    } = useForm({
        type: 'fee',
        payment_method: 'razorpay',
        payment_mode: 'Online',
        fee_installments_array: feeInstallmentsArray,
        amount: totalAmount,
        student_id: student?.id
    });

    // handle select installment start
    const handleSelectInstallment = (id, type) => {
        const installmentIds = selectedInstallments[type]?.map(item => item?.fee?.id);

        if (installmentIds?.includes(id)) {
            const updatedData = selectedInstallments[type]?.filter(item => item?.fee?.id != id);

            setSelectedInstallments((prevData) => ({
                ...prevData,
                [type]: updatedData
            }));
        } else {
            const updatedData = [...selectedInstallments[type]];

            let installment = {};

            if(type == 'fee_installment') {
                installment = studentFeeInstallments?.find(item => item?.fee?.id == id) ?? {};
            } else if(type == 'general_voucher') {
                installment = studentFeeVouchers?.find(item => item?.fee?.id == id) ?? {};
            }

            setSelectedInstallments((prevData) => ({
                ...prevData,
                [type]: installment?.fee?.id != null ? [...updatedData, installment] : updatedData
            }));
        }
    }
    // handle select installment end

    // handle pay online fee start
    const handlePayOnlineFee = (e) => {
        e.preventDefault();

        if (feeInstallmentsArray?.length == 0) {
            toast.error("Please select installment", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.payment_method == '') {
            toast.error("Please select payment method!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const form_data = {
                type: 'fee',
                payment_method: data?.payment_method,
                payment_mode: data?.payment_mode,
                fee_installments_array: feeInstallmentsArray,
                amount: totalAmount,
                student_id: student?.id,
            }

            if (data?.payment_method == 'razorpay') {
                handlePayment(form_data);
            }
            else if (data?.payment_method == 'paytm') {
                // TODO: send a post request for paytm
                alert("Not avaialble PayTM Payment Method!")
            }
        }
    }
    // handle pay online fee end

    // handle payment start
    const handlePayment = (form_data) => {
        // send a request to process payment
        axios.post(route('razorpay.process_payment'), form_data)
            .then((response) => {
                const response_data = response.data;

                if (response_data.success == true) {
                    const options = {
                        key: response_data?.keyId,
                        amount: response_data?.amount, // Amount in paise
                        currency: response_data?.currency ?? "INR",
                        name: "ERP EduCare test",
                        description: "Test Transaction",
                        order_id: response_data?.orderId,
                        handler: (response) => {
                            router.post(route('razorpay.payment_callback'), {
                                order_id: response_data?.orderId,
                                fee_payment_method_id: response_data?.fee_payment_method_id,
                                student_id: response_data?.student_id,
                                type: response_data?.type,
                                razorpay_payment_id: response?.razorpay_payment_id,
                                razorpay_signature: response?.razorpay_signature,
                            });
                        },
                        theme: {
                            color: "#062C66",
                        },
                    };

                    const razorpayInstance = new Razorpay(options);

                    razorpayInstance.open();
                } else {
                    toast.error(response_data?.message, {
                        position: 'top-right',
                        autoClose: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);

                toast.error(error.message, {
                    position: 'top-right',
                    autoClose: 1500,
                });
            });
    };
    // handle payment end

    return (
        <>
            <div className="grid grid-cols-10 gap-5">
                <div className="col-span-10 lg:col-span-6">
                    {/* Fee Installment Table */}
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={3}>Fee Installment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFeeInstallments?.length > 0 ?
                                        studentFeeInstallments.map((item, index) => (
                                            <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                                <td>
                                                    { item?.payment_status != 'Paid' && (
                                                        <Checkbox
                                                            name={`fee_${item.id}`}
                                                            checked={feeInstallmentIds?.includes(item?.fee?.id)}
                                                            onChange={() => handleSelectInstallment(item?.fee?.id, 'fee_installment')}
                                                        />
                                                    )}
                                                </td>
                                                <td>{item?.fee?.title}</td>
                                                <td>
                                                    {`Payable = ${item?.total_payable_amount ?? 0} Paid = ${item?.total_paid_amount ?? 0} Due = ${item?.total_due_amount ?? 0}`}
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Voucher Installment Table */}
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={3}>Voucher's Installment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFeeVouchers?.length > 0 ?
                                        studentFeeVouchers.map((item, index) => (
                                            <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                                <td>
                                                    {item?.payment_status != 'Paid' && (
                                                        <Checkbox
                                                            name={`voucher_${item.id}`}
                                                            checked={voucherInstallmentIds?.includes(item?.fee?.id)}
                                                            onChange={() => handleSelectInstallment(item?.fee?.id, 'general_voucher')}
                                                        />
                                                    )}
                                                </td>
                                                <td>{item?.fee?.title}</td>
                                                <td>
                                                    {`Payable = ${item?.total_payable_amount ?? 0} Paid = ${item?.total_paid_amount ?? 0} Due = ${item?.total_due_amount ?? 0}`}
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-10 lg:col-span-4">
                    <OnlinePaymentFeeStructureList
                        installmentsData={installmentsData}
                        totalAmount={totalAmount}
                    />

                    {installmentsData?.length > 0 &&
                        <div className='mt-5'>
                            <div className="educare-input-field-notes my-2">
                                <ul>
                                    <li className='mb-2.5'><span className='text-primary'>Payment Terms and Conditions:</span></li>
                                    <li className='mb-2.5'><span>1. </span> Transection fee charges would not be refunded/reveresed under any circumstances for any refund/reversal/chargeback and any other reasons</li>
                                    <li className='mb-2.5'><span>2.</span>Transectoin fees charged would not be borne by card holder for any payment.</li>
                                    <li className='mb-2.5'><span>3.</span>Fees once paid which is neither cancelled nor refundable for any reason or any other clues of any {school?.title}</li>
                                    <li className='mb-2.5'><span>4.</span>T&C, privecy policy, entiry legal name & contact us details are need to be update on website.</li>
                                    <li className='mb-2.5'><span>5.</span>Transection fees are deducted by online payment company and banks</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-end mt-5">
                                <h5 className="font-semibold">
                                    Select Payment Method
                                </h5>
                                <div className="educare-radio-field-styles flex my-5 maxSm:mb-0 gap-3">
                                    <RadioInput
                                        name="payment_method"
                                        value="Razorpay"
                                        checked={data?.payment_method && data?.payment_method === "razorpay"}
                                        onChange={() => setData("payment_method", "razorpay")}
                                        className='my-5'
                                    />
                                    <RadioInput
                                        name="payment_method"
                                        value="Paytm"
                                        checked={data?.payment_method && data?.payment_method === "paytm"}
                                        onChange={() => setData("payment_method", "paytm")}
                                        className='my-5'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end mt-5'>
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick={handlePayOnlineFee}
                                >
                                    Pay Now
                                </PrimaryButton>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default StudentOnlinePaymentlist;
