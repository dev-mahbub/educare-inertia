import DarkButton from "@/Components/DarkButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useRazorpay } from "react-razorpay";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceCreateForm = ({
    services,
    gstValue
}) => {
    // const nonGstSelectIdInput = useRef();
    // const gstAmountIdInput = useRef();
    // const buyServiceNoteInput = useRef();

    const { error, isLoading, Razorpay } = useRazorpay();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        payment_method: "razorpay",
        quantity: 1,
        is_gst_aplicable: false,
        service: "",
        service_type: "",
        price: 0,
        amount: 0,
        gst_amount: 0,
        gst_value: gstValue,
        note: ""
    });

    // handle change price start
    const handleChangePrice = (value) => {
        const price = value == '' ? 0 : parseFloat(value);
        const gst_amount = data?.is_gst_aplicable ? (price / 100) * 18 : 0;

        setData((prevData) => ({
            ...prevData,
            price: value,
            gst_amount: gst_amount,
            amount: price + gst_amount
        }));
    }
    // handle change price end

    // handle change tax type start
    const handleChangeTaxType = (value) => {
        const price = data?.price ?? 0;
        const gst_amount = value ? (price / 100) * 18 : 0;

        setData((prevData) => ({
            ...prevData,
            is_gst_aplicable: value,
            gst_amount: gst_amount,
            amount: price + gst_amount
        }));
    }
    // handle change tax type end

    // handle change service start
    const handleChangeService = (value) => {
        const selected_service = services?.find((item) => item?.id == value);

        const price = selected_service?.price ?? 0;
        const gst_amount = data?.is_gst_aplicable ? (price / 100) * 18 : 0;

        setData((prevData) => ({
            ...prevData,
            service: value,
            service_type: selected_service?.type,
            price: price,
            gst_amount: gst_amount,
            amount: price + gst_amount
        }));
    }
    // handle change service end

    // handle payment start
    const handleBuyService = (e) => {
        e.preventDefault();

        if(data?.service == '' || data?.note == '' || data?.price == '') {
            toast.error("Required fields cannot be empty!", {
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
                type: 'service',
                payment_method: data?.payment_method,
                quantity: data?.quantity,
                is_gst_aplicable: data?.is_gst_aplicable,
                service: data?.service,
                service_type: data?.service_type,
                price: data?.price,
                amount: data?.amount,
                gst_amount: data?.gst_amount,
                gst_value: data?.gst_value,
                note: data?.note
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

                            router.post(route('razorpay.payment_callback'), {
                                order_id: response_data?.orderId,
                                service_order_id: response_data?.service_order_id,
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

    // handle cancel start
    const handleCancel = () => {
        router.get(route('our_service.buy_service'));
    }
    // handle cancel end

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={handleBuyService}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Buy Services
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles">
                                                        <RadioInput
                                                            name="is_gst_aplicable"
                                                            value="Non GST"
                                                            checked={
                                                                data.is_gst_aplicable == false
                                                            }
                                                            onChange={(e) =>
                                                                handleChangeTaxType(false)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles">
                                                        <RadioInput
                                                            name="is_gst_aplicable"
                                                            value="GST"
                                                            checked={
                                                                data.is_gst_aplicable == true
                                                            }
                                                            onChange={(e) =>
                                                                handleChangeTaxType(true)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="service"
                                                                value="Item"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="service"
                                                        data_label="Item"
                                                        data={services}
                                                        // ref={
                                                        //     nonGstSelectIdInput
                                                        // }
                                                        value={
                                                            data.service
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeService(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.service
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="price"
                                                                value="Amount"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="price"
                                                        // ref={
                                                        //     gstAmountIdInput
                                                        // }
                                                        value={
                                                            data.price
                                                        }
                                                        onChange={(e) =>
                                                            handleChangePrice(isNaN(e.target.value) ? 0 : e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.price
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                {data?.is_gst_aplicable == true &&
                                                    <div
                                                        className="mt-2"
                                                    >
                                                        <div
                                                            className="flex justify-between"
                                                        >
                                                            <h4
                                                                className="text-danger font-semibold"
                                                            >
                                                                {data?.gst_value}%
                                                            </h4>
                                                            <h4
                                                                className="font-semibold"
                                                            >
                                                                {data?.gst_amount}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                }

                                                <div
                                                    className="mt-2"
                                                >
                                                    <div
                                                        className="flex justify-between"
                                                    >
                                                        <h4
                                                            className="font-semibold"
                                                        >
                                                            Total Amount:
                                                        </h4>
                                                        <h4
                                                            className="font-semibold"
                                                        >
                                                            {data?.amount}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="note"
                                                                value="Note"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="note"
                                                        // ref={
                                                        //     buyServiceNoteInput
                                                        // }
                                                        value={
                                                            data.note
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "note",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.note
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-col items-end mt-2">
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
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-4 justify-end">
                                                    <DarkButton
                                                        disabled={processing}
                                                        className="educare-dark-btn-lg-stroke"
                                                        type="button"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </DarkButton>
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                    >
                                                        Pay Now
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ServiceCreateForm;
