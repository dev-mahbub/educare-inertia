import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from "@/Components/RadioInput";
import { router, useForm } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useRazorpay } from "react-razorpay";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErpUnpaidInvoiceList = ({
    dueInvoices
}) => {

    const { error, isLoading, Razorpay } = useRazorpay();
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [invoiceIds, setInvoiceIds] = useState([]);

    // total due amount
    const totalDueAmount = dueInvoices?.reduce((total, item) => total + parseFloat(item?.due_amount) , 0);

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        payment_method: "razorpay",
        type: "invoice",
        invoice_ids: invoiceIds,
        amount: 0
    });

    useEffect(() => {
        const selected_invoices = dueInvoices?.filter(item => invoiceIds?.includes(item?.id));

        setSelectedInvoices(selected_invoices);

        setData((prevData) => ({
            ...prevData,
            invoice_ids: invoiceIds,
            amount: selected_invoices?.reduce((total, item) => total + parseFloat(item?.due_amount), 0)
        }));
    }, [invoiceIds]);

    // handle select invoice start
    const handleSelectInvoice = (id) => {
        if(invoiceIds?.includes(id)) {
            setInvoiceIds(invoiceIds?.filter(item => item != id));
        } else {
            setInvoiceIds([...invoiceIds, id]);
        }
    }
    // handle select invoice end

    const erpUnpaidInvoiceListData = (e) => {
        e.preventDefault();
    };
    //form validation end

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (num != '' && !isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    // handle payment start
    const handlePayInvoiceDue = (e) => {
        e.preventDefault();

        if (data?.invoice_ids?.length == 0) {
            toast.error("Please select invoice!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.payment_method == '') {
            toast.error("Please select payment method!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const form_data = {
                type: 'invoice',
                payment_method: data?.payment_method,
                amount: data?.amount,
                invoice_ids: data?.invoice_ids
            }

            if (data?.payment_method == 'razorpay') {
                handlePayment(form_data);
            }
            else if (data?.payment_method == 'paytm') {
                // TODO: send a post request for paytm
                alert("Not avaialble PayTM Payment Method!")
            }
        }
    };

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
                            // send a callback request
                            router.post(route('razorpay.payment_callback'), {
                                order_id: response_data?.orderId,
                                type: response_data?.type,
                                razorpay_payment_id: response?.razorpay_payment_id,
                                razorpay_signature: response?.razorpay_signature,
                                invoice_ids: response_data?.invoice_ids
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
        <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={erpUnpaidInvoiceListData}>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="lg:col-span-9 col-span-12">
                                    <div className="educare-admission-list pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Invoice Date</th>
                                                    <th>Invoice Number</th>
                                                    <th>Invoice Description</th>
                                                    <th>Balance Due</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dueInvoices?.length > 0 ?
                                                    <>
                                                        {dueInvoices.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className='inline-flex items-center gap-x-1'>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                name="invoice_ids"
                                                                                checked={
                                                                                    invoiceIds?.includes(item?.id)
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleSelectInvoice(item?.id)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        {item?.invoice_date}
                                                                    </div>
                                                                </td>
                                                                <td>{item?.invoice_no}</td>
                                                                <td>{item?.invoice_description}</td>
                                                                <td>
                                                                    <div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(item?.due_amount ?? 0)}</div>
                                                                </td>
                                                                <td><span className='badge danger'>{item?.payment_status}</span></td>
                                                            </tr>
                                                        ))}

                                                        <tr>
                                                            <td colSpan={3}><b>Total</b></td>
                                                            <td colSpan={2}>
                                                            <div><b className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(totalDueAmount)}</b></div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="9">Data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {selectedInvoices?.length > 0 &&
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="educare-admission-list pb-none table-width-full">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Invoice Number</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedInvoices.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.invoice_no}</td>
                                                            <td>
                                                                <div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(item?.due_amount ?? 0)}</div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    <tr>
                                                        <td><b>Total</b></td>
                                                        <td>
                                                            <div><b className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(data?.amount)}</b></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex flex-col items-end mt-3">
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
                                        <div className='text-end mt-5'>
                                            <PrimaryButton
                                                disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                                type="button"
                                                onClick={handlePayInvoiceDue}
                                            >
                                                Pay Now
                                            </PrimaryButton>
                                        </div>
                                        <div className='mt-5 bg-white/70 p-5 rounded-lg'>
                                            <h4 className='text-[18px] font-semibold text-headingLight mb-1.5'>Transaction Charges :</h4>
                                            <ul className='flex flex-col gap-1.5'>
                                                <li className='flex justify-between gap-2.5'>
                                                    <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Net Banking :</span>
                                                    <span className='text-[14px] font-medium text-headingLight'>1.55%</span>
                                                </li>
                                                <li className='flex justify-between gap-2.5'>
                                                    <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Credit Card :</span>
                                                    <span className='text-[14px] font-medium text-headingLight'>1.85%</span>
                                                </li>
                                                <li className='flex justify-between gap-2.5'>
                                                    <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Debit Card :</span>
                                                    <span className='text-[14px] font-medium text-headingLight'>0.9% below & 1% above 2k</span>
                                                </li>
                                                <li className='flex justify-between gap-2.5'>
                                                    <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>UPI Card :</span>
                                                    <span className='text-[14px] font-medium text-headingLight'>Free</span>
                                                </li>
                                                <li className='flex justify-between gap-2.5'>
                                                    <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Wallet :</span>
                                                    <span className='text-[14px] font-medium text-headingLight'>2%</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default ErpUnpaidInvoiceList;
