import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { router, useForm } from '@inertiajs/react';
import axios from "axios";
import { useEffect } from 'react';
import { useRazorpay } from "react-razorpay";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuySmsList = ({
    selectedSmsQuantity,
    // selectedSmsQuantities,
    // orderId,
    // keyId,
    // amount
}) => {

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        payment_method: "razorpay",
        quantity: "",
        price: "",
        amount: ""
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            quantity: selectedSmsQuantity?.id,
            price: selectedSmsQuantity?.sms_price,
            amount: selectedSmsQuantity?.amount,
            // orderId: orderId,
            // keyId: keyId,
        }));
    }, [selectedSmsQuantity]);

    const buySmsListData = (e) => {
        e.preventDefault();

        if (data?.quantity == 0 || data?.quantity == '') {
            toast.error("Please select sms!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.payment_method == '') {
            toast.error("Please select payment method!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                type: 'sms',
                payment_method: data?.payment_method,
                quantity: data?.quantity,
                price: data?.price,
                amount: data?.amount
            }

            if(data?.payment_method == 'razorpay') {
                handlePayment(form_data);
                //router.post(route('razorpay.process_payment'), form_data);
            }
            else if(data?.payment_method == 'paytm') {
                // TODO: send a post request for paytm
                alert("Not avaialble PayTM Payment Method!")
            }
        }
    };
    //form validation end

    const { error, isLoading, Razorpay } = useRazorpay();
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
                                service_order_id: response_data?.service_order_id,
                                type: response_data?.type,
                                razorpay_payment_id: response?.razorpay_payment_id,
                                razorpay_signature: response?.razorpay_signature,
                            });

                            // axios.post(route('razorpay.payment_callback'), {
                            //     order_id: response_data?.orderId,
                            //     service_order_id: response_data?.service_order_id,
                            //     type: response_data?.type,
                            //     razorpay_payment_id: response?.razorpay_payment_id,
                            //     razorpay_signature: response?.razorpay_signature,
                            // }).then((response) => {
                            //     if(response.data.success == true) {
                            //         window.location.href = response.data.redirect_url;
                            //     }
                            // })
                            // .catch((error) => {
                            //     console.error("callback Error:", error);

                            //     toast.error(error.message, {
                            //         position: 'top-right',
                            //         autoClose: 1500,
                            //     });
                            // });
                        },
                        // prefill: {
                        //     name: "John Doe",
                        //     email: "john.doe@example.com",
                        //     contact: "9999999999",
                        // },
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

    // const handlePayment = () => {
    //     const options = {
    //         key: data?.keyId,
    //         amount: selectedSmsQuantities?.amount, // Amount in paise
    //         currency: "INR",
    //         name: "ERP EduCare test",
    //         description: "Test Transaction",
    //         order_id: data?.orderId, // Generate order_id on server
    //         handler: (response) => {
    //             console.log(response);
    //             alert("Payment Successful!");
    //         },
    //         prefill: {
    //             name: "John Doe",
    //             email: "john.doe@example.com",
    //             contact: "9999999999",
    //         },
    //         theme: {
    //             color: "#F37254",
    //         },
    //     };

    //     const razorpayInstance = new Razorpay(options);
    //     razorpayInstance.open();
    // };

    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    {selectedSmsQuantity?.id &&
                        <form onSubmit={buySmsListData}>
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Total Sms</th>
                                            <th>Rate</th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedSmsQuantity?.title}</td>
                                            <td>{selectedSmsQuantity?.sms_price} paisa</td>
                                            <td>{selectedSmsQuantity?.amount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col items-end">
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
                                {error && <p>Error loading Razorpay: {error}</p>}
                                <PrimaryButton
                                    disabled={isLoading}
                                    className="educare-primary-btn-md-fill"
                                >
                                    Pay Now
                                </PrimaryButton>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default BuySmsList;
