
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';

const SmsSettingCreateForm = ({
    smsSettings = []
}) => {
    const {
        data,
        setData
    } = useForm({
        sms_is_sms_enable: smsSettings?.sms_is_sms_enable,
        // sms_vendor_sms_enable: smsSettings?.sms_vendor_sms_enable,
        sms_sender_id: smsSettings?.sms_sender_id,
        // sms_signature: smsSettings?.sms_signature,
        sms_is_fee_due_sms: smsSettings?.sms_is_fee_due_sms,
        sms_is_fee_sms_enable: smsSettings?.sms_is_fee_sms_enable,
        sms_is_due_report_sms: smsSettings?.sms_is_due_report_sms,
        sms_is_cheque_bounce_sms_enabled: smsSettings?.sms_is_cheque_bounce_sms_enabled,
        sms_is_online_fee_sms_enabled: smsSettings?.sms_is_online_fee_sms_enabled,
        sms_is_absent_student_sms_enabled: smsSettings?.sms_is_absent_student_sms_enabled,
        sms_is_present_student_sms_enabled: smsSettings?.sms_is_present_student_sms_enabled,
        sms_is_registration_sms_enabled: smsSettings?.sms_is_registration_sms_enabled,
        sms_is_admission_sms_enabled: smsSettings?.sms_is_admission_sms_enabled,
        sms_is_enquiry_creation: smsSettings?.sms_is_enquiry_creation,
        sms_is_enquiry_person_meet: smsSettings?.sms_is_enquiry_person_meet,
        sms_is_home_work_sms: smsSettings?.sms_is_home_work_sms,
        sms_is_class_work_sms: smsSettings?.sms_is_class_work_sms,
        sms_is_class_work_creation: smsSettings?.sms_is_class_work_creation,
        sms_is_homeWork_creation: smsSettings?.sms_is_homeWork_creation,
        sms_is_vehicle_sms_enabled: smsSettings?.sms_is_vehicle_sms_enabled,
        sms_is_timetable_allotment_sms_enabled: smsSettings?.sms_is_timetable_allotment_sms_enabled,
        sms_is_biometric_sms_enabled: smsSettings?.sms_is_biometric_sms_enabled,
        sms_is_exam_marks_sms: smsSettings?.sms_is_exam_marks_sms,
        sms_is_student_fee_sms_enabled: smsSettings?.sms_is_student_fee_sms_enabled,
        sms_is_student_birth_day_sms: smsSettings?.sms_is_student_birth_day_sms,
        sms_is_school_event_sms: smsSettings?.sms_is_school_event_sms,
        school_event_sms_before: smsSettings?.school_event_sms_before,
        sms_is_school_ptm_sms: smsSettings?.sms_is_school_ptm_sms,
        school_school_ptm_sms_before: smsSettings?.school_school_ptm_sms_before,
        sms_is_teacher_birthday_sms: smsSettings?.sms_is_teacher_birthday_sms,
        sms_is_teacher_holiday_sms: smsSettings?.sms_is_teacher_holiday_sms,
        send_holiday_sms_before: smsSettings?.send_holiday_sms_before,
        sms_is_teacher_school_event_sms: smsSettings?.sms_is_teacher_school_event_sms,
        teacher_school_event_sms_before: smsSettings?.teacher_school_event_sms_before,
        sms_training_url: smsSettings?.sms_training_url,

        sms_api_key: smsSettings?.sms_api_key,
        sms_fee_message_template: smsSettings?.sms_fee_message_template,
        sms_attendance_message_template: smsSettings?.sms_attendance_message_template,
        sms_admission_message_template: smsSettings?.sms_admission_message_template,
        sms_home_work_message_template: smsSettings?.sms_home_work_message_template,
        sms_timetable_message_template: smsSettings?.sms_timetable_message_template,
        sms_transport_message_template: smsSettings?.sms_transport_message_template,
        sms_biometric_message_template: smsSettings?.sms_biometric_message_template,
        sms_academic_message_template: smsSettings?.sms_academic_message_template,
        sms_student_message_template: smsSettings?.sms_student_message_template,
        sms_teacher_message_template: smsSettings?.sms_teacher_message_template
    });

    const handelChecked = (type, key, value) => {
        const sendData = { type, key, value }
        // router.post(route('account_setting_create_update'), sendData);
        router.post(route('sms_setting_create_update'), sendData);
    }

    return (
        <div className="educare-create-school-area p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-[5px] rounded-[10px] bg-white/70">
            <form>
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>SMS Setting</h5></div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        SMS Enable
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to enable SMS?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_sms_enable"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_sms_enable", "Yes")}
                                                            checked={data?.sms_is_sms_enable && data?.sms_is_sms_enable === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_sms_enable"
                                                            value="No"
                                                            checked={data?.sms_is_sms_enable && data?.sms_is_sms_enable === "No"}
                                                            onChange={() => setData("sms_is_sms_enable", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_sms_enable', data?.sms_is_sms_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Vendor SMS Enabled (SpiceDigital)</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_vendor_sms_enable"
                                                            value="Vendor"
                                                            onChange={() => setData("sms_vendor_sms_enable", "Vendor")}
                                                            checked={data?.sms_vendor_sms_enable && data?.sms_vendor_sms_enable === "Vendor"}
                                                        />
                                                        <RadioInput
                                                            name="sms_vendor_sms_enable"
                                                            value="ERP"
                                                            checked={data?.sms_vendor_sms_enable && data?.sms_vendor_sms_enable === "ERP"}
                                                            onChange={() => setData("sms_vendor_sms_enable", "ERP")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_vendor_sms_enable', data?.sms_vendor_sms_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Sender ID</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="sms_sender_id"
                                                            defaultValue={data?.sms_sender_id}
                                                            onChange={(e) =>
                                                                setData("sms_sender_id", e.target.value)
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_sender_id', data?.sms_sender_id)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Api Key</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="sms_api_key"
                                                            defaultValue={
                                                                data.sms_api_key
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "sms_api_key",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_api_key', data?.sms_api_key)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Fee SMS
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Send Scheduled Fee Due Sms?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_fee_due_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_fee_due_sms", "Yes")}
                                                            checked={data?.sms_is_fee_due_sms && data?.sms_is_fee_due_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_fee_due_sms"
                                                            value="No"
                                                            checked={data?.sms_is_fee_due_sms && data?.sms_is_fee_due_sms === "No"}
                                                            onChange={() => setData("sms_is_fee_due_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_fee_due_sms', data?.sms_is_fee_due_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Fee SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_fee_sms_enable"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_fee_sms_enable", "Yes")}
                                                            checked={data?.sms_is_fee_sms_enable && data?.sms_is_fee_sms_enable === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_fee_sms_enable"
                                                            value="No"
                                                            checked={data?.sms_is_fee_sms_enable && data?.sms_is_fee_sms_enable === "No"}
                                                            onChange={() => setData("sms_is_fee_sms_enable", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_fee_sms_enable', data?.sms_is_fee_sms_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Due Report SMS</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_due_report_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_due_report_sms", "Yes")}
                                                            checked={data?.sms_is_due_report_sms && data?.sms_is_due_report_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_due_report_sms"
                                                            value="No"
                                                            checked={data?.sms_is_due_report_sms && data?.sms_is_due_report_sms === "No"}
                                                            onChange={() => setData("sms_is_due_report_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_due_report_sms', data?.sms_is_due_report_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Cheque Bounce SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_cheque_bounce_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_cheque_bounce_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_cheque_bounce_sms_enabled && data?.sms_is_cheque_bounce_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_cheque_bounce_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_cheque_bounce_sms_enabled && data?.sms_is_cheque_bounce_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_cheque_bounce_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_cheque_bounce_sms_enabled', data?.sms_is_cheque_bounce_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Online Fee SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_online_fee_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_online_fee_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_online_fee_sms_enabled && data?.sms_is_online_fee_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_online_fee_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_online_fee_sms_enabled && data?.sms_is_online_fee_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_online_fee_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_online_fee_sms_enabled', data?.sms_is_online_fee_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_fee_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_fee_message_template"
                                                        defaultValue={
                                                            data.sms_fee_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_fee_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_fee_message_template', data?.sms_fee_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Attendance
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Absent Student SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_absent_student_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_absent_student_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_absent_student_sms_enabled && data?.sms_is_absent_student_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_absent_student_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_absent_student_sms_enabled && data?.sms_is_absent_student_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_absent_student_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_absent_student_sms_enabled', data?.sms_is_absent_student_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Present Student SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_present_student_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_present_student_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_present_student_sms_enabled && data?.sms_is_present_student_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_present_student_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_present_student_sms_enabled && data?.sms_is_present_student_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_present_student_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_present_student_sms_enabled', data?.sms_is_present_student_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_attendance_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_attendance_message_template"
                                                        defaultValue={
                                                            data.sms_attendance_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_attendance_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_attendance_message_template', data?.sms_attendance_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Admission
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Registration SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_registration_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_registration_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_registration_sms_enabled && data?.sms_is_registration_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_registration_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_registration_sms_enabled && data?.sms_is_registration_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_registration_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_registration_sms_enabled', data?.sms_is_registration_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Admission SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_admission_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_admission_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_admission_sms_enabled && data?.sms_is_admission_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_admission_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_admission_sms_enabled && data?.sms_is_admission_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_admission_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_admission_sms_enabled', data?.sms_is_admission_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>SMS On Enquiry Creation</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_enquiry_creation"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_enquiry_creation", "Yes")}
                                                            checked={data?.sms_is_enquiry_creation && data?.sms_is_enquiry_creation === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_enquiry_creation"
                                                            value="No"
                                                            checked={data?.sms_is_enquiry_creation && data?.sms_is_enquiry_creation === "No"}
                                                            onChange={() => setData("sms_is_enquiry_creation", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_enquiry_creation', data?.sms_is_enquiry_creation)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>SMS On Enquiry Person To Meet</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_enquiry_person_meet"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_enquiry_person_meet", "Yes")}
                                                            checked={data?.sms_is_enquiry_person_meet && data?.sms_is_enquiry_person_meet === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_enquiry_person_meet"
                                                            value="No"
                                                            checked={data?.sms_is_enquiry_person_meet && data?.sms_is_enquiry_person_meet === "No"}
                                                            onChange={() => setData("sms_is_enquiry_person_meet", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_enquiry_person_meet', data?.sms_is_enquiry_person_meet)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_admission_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_admission_message_template"
                                                        defaultValue={
                                                            data.sms_admission_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_admission_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_admission_message_template', data?.sms_admission_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Home/Class Work Sms
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>HomeWork SMS</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_home_work_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_home_work_sms", "Yes")}
                                                            checked={data?.sms_is_home_work_sms && data?.sms_is_home_work_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_home_work_sms"
                                                            value="No"
                                                            checked={data?.sms_is_home_work_sms && data?.sms_is_home_work_sms === "No"}
                                                            onChange={() => setData("sms_is_home_work_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_home_work_sms', data?.sms_is_home_work_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>ClassWork SMS</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_class_work_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_class_work_sms", "Yes")}
                                                            checked={data?.sms_is_class_work_sms && data?.sms_is_class_work_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_class_work_sms"
                                                            value="No"
                                                            checked={data?.sms_is_class_work_sms && data?.sms_is_class_work_sms === "No"}
                                                            onChange={() => setData("sms_is_class_work_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_class_work_sms', data?.sms_is_class_work_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>SMS On ClassWork Creation</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_class_work_creation"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_class_work_creation", "Yes")}
                                                            checked={data?.sms_is_class_work_creation && data?.sms_is_class_work_creation === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_class_work_creation"
                                                            value="No"
                                                            checked={data?.sms_is_class_work_creation && data?.sms_is_class_work_creation === "No"}
                                                            onChange={() => setData("sms_is_class_work_creation", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_class_work_creation', data?.sms_is_class_work_creation)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>SMS On HomeWork Creation</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_homeWork_creation"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_homeWork_creation", "Yes")}
                                                            checked={data?.sms_is_homeWork_creation && data?.sms_is_homeWork_creation === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_homeWork_creation"
                                                            value="No"
                                                            checked={data?.sms_is_homeWork_creation && data?.sms_is_homeWork_creation === "No"}
                                                            onChange={() => setData("sms_is_homeWork_creation", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_homeWork_creation', data?.sms_is_homeWork_creation)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_home_work_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_home_work_message_template"
                                                        defaultValue={
                                                            data.sms_home_work_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_home_work_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_home_work_message_template', data?.sms_home_work_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Time Table
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Timetable Allotment SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_timetable_allotment_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_timetable_allotment_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_timetable_allotment_sms_enabled && data?.sms_is_timetable_allotment_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_timetable_allotment_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_timetable_allotment_sms_enabled && data?.sms_is_timetable_allotment_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_timetable_allotment_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_timetable_allotment_sms_enabled', data?.sms_is_timetable_allotment_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_timetable_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_timetable_message_template"
                                                        defaultValue={
                                                            data.sms_timetable_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_timetable_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_timetable_message_template', data?.sms_timetable_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Transport
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Vehicle SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_vehicle_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_vehicle_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_vehicle_sms_enabled && data?.sms_is_vehicle_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_vehicle_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_vehicle_sms_enabled && data?.sms_is_vehicle_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_vehicle_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_vehicle_sms_enabled', data?.sms_is_vehicle_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_transport_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_transport_message_template"
                                                        defaultValue={
                                                            data.sms_transport_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_transport_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_transport_message_template', data?.sms_transport_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Biometric
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Biometric SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_biometric_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_biometric_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_biometric_sms_enabled && data?.sms_is_biometric_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_biometric_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_biometric_sms_enabled && data?.sms_is_biometric_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_biometric_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_biometric_sms_enabled', data?.sms_is_biometric_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_biometric_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_biometric_message_template"
                                                        defaultValue={
                                                            data.sms_biometric_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_biometric_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_biometric_message_template', data?.sms_biometric_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Academic
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Exam Marks Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_exam_marks_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_exam_marks_sms", "Yes")}
                                                            checked={data?.sms_is_exam_marks_sms && data?.sms_is_exam_marks_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_exam_marks_sms"
                                                            value="No"
                                                            checked={data?.sms_is_exam_marks_sms && data?.sms_is_exam_marks_sms === "No"}
                                                            onChange={() => setData("sms_is_exam_marks_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_exam_marks_sms', data?.sms_is_exam_marks_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Training URL</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="sms_training_url"
                                                            defaultValue={data?.sms_training_url}
                                                            onChange={(e) =>
                                                                setData("sms_training_url", e.target.value)
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_training_url', data?.sms_training_url)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_academic_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_academic_message_template"
                                                        defaultValue={
                                                            data.sms_academic_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_academic_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_academic_message_template', data?.sms_academic_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>Schedule SMS Setting</h5></div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Student
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Fee SMS Enabled</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_student_fee_sms_enabled"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_student_fee_sms_enabled", "Yes")}
                                                            checked={data?.sms_is_student_fee_sms_enabled && data?.sms_is_student_fee_sms_enabled === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_student_fee_sms_enabled"
                                                            value="No"
                                                            checked={data?.sms_is_student_fee_sms_enabled && data?.sms_is_student_fee_sms_enabled === "No"}
                                                            onChange={() => setData("sms_is_student_fee_sms_enabled", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_student_fee_sms_enabled', data?.sms_is_student_fee_sms_enabled)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Student BirthDay Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_student_birth_day_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_student_birth_day_sms", "Yes")}
                                                            checked={data?.sms_is_student_birth_day_sms && data?.sms_is_student_birth_day_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_student_birth_day_sms"
                                                            value="No"
                                                            checked={data?.sms_is_student_birth_day_sms && data?.sms_is_student_birth_day_sms === "No"}
                                                            onChange={() => setData("sms_is_student_birth_day_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_student_birth_day_sms', data?.sms_is_student_birth_day_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School Event Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_school_event_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_school_event_sms", "Yes")}
                                                            checked={data?.sms_is_school_event_sms && data?.sms_is_school_event_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_school_event_sms"
                                                            value="No"
                                                            checked={data?.sms_is_school_event_sms && data?.sms_is_school_event_sms === "No"}
                                                            onChange={() => setData("sms_is_school_event_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_school_event_sms', data?.sms_is_school_event_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School Event Sms Before</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="school_event_sms_before"
                                                            defaultValue={
                                                                data.school_event_sms_before
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_event_sms_before",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'school_event_sms_before', data?.school_event_sms_before)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School PTM Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_school_ptm_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_school_ptm_sms", "Yes")}
                                                            checked={data?.sms_is_school_ptm_sms && data?.sms_is_school_ptm_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_school_ptm_sms"
                                                            value="No"
                                                            checked={data?.sms_is_school_ptm_sms && data?.sms_is_school_ptm_sms === "No"}
                                                            onChange={() => setData("sms_is_school_ptm_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_school_ptm_sms', data?.sms_is_school_ptm_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School PTM Sms Before</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="school_school_ptm_sms_before"
                                                            defaultValue={
                                                                data.school_school_ptm_sms_before
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "school_school_ptm_sms_before",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'school_school_ptm_sms_before', data?.school_school_ptm_sms_before)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_student_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_student_message_template"
                                                        defaultValue={
                                                            data.sms_student_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_student_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_student_message_template', data?.sms_student_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Teacher
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Teacher Birthday Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_teacher_birthday_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_teacher_birthday_sms", "Yes")}
                                                            checked={data?.sms_is_teacher_birthday_sms && data?.sms_is_teacher_birthday_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_teacher_birthday_sms"
                                                            value="No"
                                                            checked={data?.sms_is_teacher_birthday_sms && data?.sms_is_teacher_birthday_sms === "No"}
                                                            onChange={() => setData("sms_is_teacher_birthday_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_teacher_birthday_sms', data?.sms_is_teacher_birthday_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Teacher Holiday Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_teacher_holiday_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_teacher_holiday_sms", "Yes")}
                                                            checked={data?.sms_is_teacher_holiday_sms && data?.sms_is_teacher_holiday_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_teacher_holiday_sms"
                                                            value="No"
                                                            checked={data?.sms_is_teacher_holiday_sms && data?.sms_is_teacher_holiday_sms === "No"}
                                                            onChange={() => setData("sms_is_teacher_holiday_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_teacher_holiday_sms', data?.sms_is_teacher_holiday_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Send Holiday Sms Before</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="send_holiday_sms_before"
                                                            defaultValue={
                                                                data.send_holiday_sms_before
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "send_holiday_sms_before",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'send_holiday_sms_before', data?.send_holiday_sms_before)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School Event Sms</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="sms_is_teacher_school_event_sms"
                                                            value="Yes"
                                                            onChange={() => setData("sms_is_teacher_school_event_sms", "Yes")}
                                                            checked={data?.sms_is_teacher_school_event_sms && data?.sms_is_teacher_school_event_sms === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="sms_is_teacher_school_event_sms"
                                                            value="No"
                                                            checked={data?.sms_is_teacher_school_event_sms && data?.sms_is_teacher_school_event_sms === "No"}
                                                            onChange={() => setData("sms_is_teacher_school_event_sms", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_is_teacher_school_event_sms', data?.sms_is_teacher_school_event_sms)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>School Event Sms Before</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="teacher_school_event_sms_before"
                                                            defaultValue={
                                                                data.teacher_school_event_sms_before
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "teacher_school_event_sms_before",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="number"
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'teacher_school_event_sms_before', data?.teacher_school_event_sms_before)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-input-field-styles w-full">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="sms_teacher_message_template"
                                                                value="Message Template"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="sms_teacher_message_template"
                                                        defaultValue={
                                                            data.sms_teacher_message_template
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "sms_teacher_message_template",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('SMS', 'sms_teacher_message_template', data?.sms_teacher_message_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
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

export default SmsSettingCreateForm;
