import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OnlinePaymentForm = ({
    school
}) => {

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message, {
                position: 'top-right',
                autoClose: 1500,
            });
        }

        if (flash.error) {
            toast.error(flash.error, {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }, [flash]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        admission_no: "",
        father_phone: "",
    });

    // handle search student start
    const handleSearchStudent = (e) => {
        e.preventDefault();

        post(route('fee_online_payment.student_fee'));
    };
    // handle search student end

    return (
        <>
            <div className="educare-common-card">
                <div className="p-[30px] pt-[27px] maxXs:p-[15px] flex justify-center">
                    <div className="front-container">
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 lg:col-span-4">
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px]">
                                        <form onSubmit={handleSearchStudent}>
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12">
                                                    <InputError
                                                        message={
                                                            flash.error
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Admission Number"
                                                        />
                                                        <TextInput
                                                            value={
                                                                data.admission_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.admission_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Father Mobile Number"
                                                        />
                                                        <TextInput
                                                            value={
                                                                data.father_phone
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "father_phone",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.father_phone
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex justify-end">
                                                <PrimaryButton
                                                    // disabled={processing}
                                                    className="educare-primary-btn-md-fill"
                                                    type="submit"
                                                >
                                                    Submit
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px]">
                                        <div className="welcome-message">
                                            <h3>Welcome to</h3>
                                            <p>{school?.title} Online Fees Payment Platform.
                                                {school?.title}, "Educare" and Payment Gateway Company have partnered to offer you a secure online tool for online Fees payment. Please always use this page for payment.</p>
                                        </div>
                                        <div className="message-btn mt-[40px]">
                                            <div className="login-box">
                                                <a href={route('login')} target="_blank">
                                                    <i className="icon-lock"></i>
                                                    <p>Parent Login</p>
                                                </a>
                                            </div>
                                            <div className="login-box">
                                                <a href="#" target="_blank">
                                                    <i className="icon-DeviceMobile"></i>
                                                    <p>Download Phone App</p>
                                                </a>
                                            </div>
                                            <div className="login-box">
                                                <a href="#" target="_blank">
                                                    <i className="icon-PhoneCall"></i>
                                                    <p>Contact School Admin For Your Concerns</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-notes my-2">
                                    <ul className="leading-[25px]">
                                        <li><span className="text-primary">Tips:</span></li>
                                        <li>1. Please enter Admission Number and Registered Phone Number</li>
                                        <li>2. Click on "Submit" to get the details of the fee dues</li>
                                        <li>3. Verify the details & Click on "Pay Now" and you will be directed to online portal. You have to select your mode of payment such as credit card, debit card, net banking etc. Kindly follow the instructions as applicable to your choice of payment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnlinePaymentForm;
