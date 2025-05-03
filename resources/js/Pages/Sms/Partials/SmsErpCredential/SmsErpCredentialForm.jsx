import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SmsErpCredentialForm = ({
    audienceTypes,
    data,
    setData,
    reset
}) => {

    // handle change audience type start
    const handleChangeAudienceType = (value) => {
        setData((prevData) => ({
            ...prevData,
            audience_type: value,
            recipient_type: "class_wise",
            boarding_type: "",
            classroom_id: "",
            selected_ids: [],
            select_all: false,
            search: ''
        }));

        const form_data = {
            audience_type: value
        }

        router.post(route('sms.sms_erp_credential'), form_data);
    }
    // handle change audience type end

    // handle send web logins start
    const handleSendWebLogins = (e) => {
        e.preventDefault();

        if(data?.selected_ids?.length == 0) {
            toast.error("Please select at least one user.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                audience_type: data?.audience_type,
                recipient_type: data?.recipient_type,
                boarding_type: data?.boarding_type,
                selected_ids: data?.selected_ids
            }

            router.post(route('send_sms.erp_credential_sms'), form_data, {
                onSuccess: () => {
                    reset();
                },
                onError: () => {
                    const form_data = {
                        audience_type: data?.audience_type,
                        classroom_id: data?.classroom_id
                    }

                    router.post(route('sms.sms_erp_credential'), form_data);
                }
            });
        }
    }
    // handle send web logins end

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="flex justify-between gap-5 flex-wrap">
                        <div className="flex gap-5">
                            <div className='flex gap-1 items-center text-headingLight text-[16px]'>
                                <i className='icon-email'></i>
                                <span className='text-[14px]'>Send Web logins</span>
                            </div>
                            {/* <Link href='#' className='text-[14px] text-primary hover:underline'>Get help</Link> */}
                        </div>
                        <div className='flex gap-5 text-headingLight text-[14px]'>
                            <span>( Available : 0 )</span>
                            <span>( Consumed : 0 )</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Audience"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Audience"
                                        data={audienceTypes}
                                        value={
                                            data.audience_type
                                        }
                                        onChange={(e) =>
                                            handleChangeAudienceType(e.target.value)
                                        }
                                        className="block"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-notes my-2">
                                    <ul>
                                        <li> <strong>Note:</strong> We will send below message to all users</li>
                                        <li> {"Dear Parent, Login https://{#var#}.educarestudy.in UserName {#var#} and password {#var#}"}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <Link
                                        className="educare-gray-btn-lg-stroke"
                                        href={route('sms.sms_erp_credential')}
                                    >
                                        Reset
                                    </Link>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        onClick={handleSendWebLogins}
                                    >
                                        Send Web  Logins
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-input-field-notes my-2">
                <ul>
                    <li> <strong>Note:</strong></li>
                    <li className='mb-1'>
                        <span className='font-semibold text-danger'> 1. The above message is approved by DLT for sender ID - <span className='text-warning'>SSTUDY</span>. We will send this message with a dynamic username, password and link. In case if your sender id is different. Please approve the same message in your DLT (if school sender id is different)</span>
                    </li>
                    <li className='mb-1'> 2. If english sms characters is 160 or less then sms count will be 1 otherwise sms count will be increased at multiple of 153 characters.</li>
                    <li className='mb-1'>3. Non english sms characters is 70 or less then sms count will be 1 otherwise sms count will be increased at multiple of 64 characters.</li>
                    <li>4. Message length also includes your SMS Signature. You Can also send messages in your local languages.</li>
                </ul>
            </div>
        </>
    );
};

export default SmsErpCredentialForm;
