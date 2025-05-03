import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from "@/Components/TextareaInput";
import Dropdown from '@/Components/Dropdown';
import { Link, useForm  } from '@inertiajs/react';
import { Tooltip } from '@mui/material'
import React from 'react';
import { useRef } from 'react';

const SmsCreateList = () => {
    const ComSmsAudienceInput = useRef();
    const ComSmsMessageFormatInput = useRef();
    const ComSmsNoticeInput = useRef();
    const ComSmsTemplatesInput = useRef();
    const ComSmsMessageInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        sms_templates_required: "",
        com_sms_audience: "",
        com_sms_message: "",
        com_sms_message_format: "",
        com_sms_templates: "",
        com_sms_notice: "",
        send_class_2nd_2nd: "",
        send_class_standard_1_a: "",
        send_class_standard_1st_a: "",
        send_class_first: "",
        send_class_vii_a: "",
        send_class_xi_a: "",
        send_class_second_a: "",
        send_class_third_a: "",
        send_class_kg_i_a: "",
        send_class_1_a: "",
        send_class_third_b: "",
        send_class_second_b: "",
        send_class_bsc_cbz: "",
        send_class_xi_d: "",
        send_class_bsc_pcb: "",
        send_class_i_a: "",
        send_class_ii_a: "",
        send_class_iii_a: "",
        send_class_iiii_a: "",
        send_class_iv_a: "",
        send_class_iv_b: "",
        send_class_v_a: "",
        send_class_ix_a: "",
        send_class_v_b: "",
        send_class_vi_b: "",
        send_class_smoke_test_a: "",
        send_class_smoke_test_b: "",
        send_class_smoke_test_c: "",
        send_class_smoke_test_d: "",
        send_class_transport_a: "",
        send_class_transport_b: "",
        send_class_transport_c: "",
        send_class_transport_d: "",
        dummy_checkbox_2: "",
    });
    
    const assessmentListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    return (
        <div className="educare-create-school-area">
            <form onSubmit={assessmentListData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12">
                        <div className="educare-card-title"><h5><i className="icon-event"></i><a href="#">Schedule a Training / Callback</a><span className='badge danger'>New Feature </span></h5></div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-supportingA/10 p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-sms-main-list mb-6">
                                  <div className="educare-sms-main-title">
                                    <p>Please complete the following below steps before sending the SMS otherwise your SMS will deduct and it will not deliver.</p>
                                  </div>
                                  <div className="educare-sms-main-list-content">
                                    <p>Step 1. DLT Registration- Get in Details Please Click on this Link: <Link href="#">https://t.ly/waCCU</Link></p>
                                    <p>Step 2. LT Header Approved-Get in Details Please Click on this Link: <Link href="#">https://t.ly/waCCU</Link></p>
                                    <p>DLT SMS content approved without variables- Get in Details Please Click on this Link: <Link href="#">https://t.ly/waCCU</Link></p>
                                    <p>Step 4. LT SMS content approved with variables Get in Details Please Click on this Link: <Link href="#">https://t.ly/waCCU</Link></p>
                                    <p>Step 5. Registraion required in Textlocal- It will be done by Support Manager. Please send Email to erpeducare@gmail.com with Screenshot of PE ID and DLT Header.</p>
                                    <p>Step 6. Same DLT approved SMS shoud be also approved in Textlocal without Variables-: <Link href="#">https://t.ly/waCCU</Link></p>
                                    <p>Step 7. Same DLT approved SMS shoud be also approved in Textlocal With Variables-: <Link href="#">https://t.ly/waCCU</Link></p>
                                  </div>
                                </div>
                                <div className="educare-sms-main-list mb-6">
                                  <div className="educare-sms-main-title">
                                    <p>Note: Please keep one of the following document ready before registration.</p>
                                  </div>
                                  <div className="educare-sms-main-list-content">
                                    <p>1. GST Number</p>
                                    <p>2. PAN/TAN</p>
                                    <p>3. Trade License</p>
                                    <p>4. Shops & Establishment Registration certificate</p>
                                    <p>5. Certificate of Incorporation/Registration</p>
                                    <p>6. Letter of Authentication    (Click here to download: <Link href="#">https://t.ly/waCCU</Link>)</p>
                                    <p>7. Letter of Authentication    (Click here to download: <Link href="#">https://t.ly/waCCU</Link>)</p>
                                    <p>Click here to download: <a href="#">Default Internal SMS Template</a></p>
                                  </div>
                                </div>
                                <div className="educare-sms-main-list">
                                  <div className="educare-sms-main-title">
                                    <p>Note:</p>
                                  </div>
                                  <div className="educare-sms-main-list-content">
                                    <p>1. Place holder same Name shoud not repeat in one SMS.</p>
                                    <p>2. Please do not press Enter key any where in the SMS content otherwise SMS will not deliver.</p>
                                    <p>3. SMS content shoud be same in all three places DLT, Textlocal and ERP. Even one space, Comma, Full stop, Brackets etc different will not deliver the SMS.</p>
                                    <p>4. All DLT variables shoud be replaced in Textlocal variables in textlocal otherwise SMS in Textlocal will be rejected even after approved in DLT.</p>
                                    <p>5. If SMS is approved with all above guideline then it will deliver successfully.</p>
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

export default SmsCreateList;