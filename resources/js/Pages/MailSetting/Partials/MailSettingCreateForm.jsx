import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import DatePicker from "react-datepicker";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MailSettingCreateForm = ({
    mailSettings = [],
    classrooms = [],
    staffData = [],
    mailEngineTypes,
    mailEncryptionTypes,
    mailAuthEnableTypes
}) => {
    const {
        data,
        setData,
        errors,
    } = useForm({
        mail_is_absent_student_sms_enabled_start_auto_task: mailSettings?.mail_is_absent_student_sms_enabled_start_auto_task,
        mail_is_absent_student_send_sms_to_parent: mailSettings?.mail_is_absent_student_send_sms_to_parent,
        mail_is_absent_student_send_notification_to_parent: mailSettings?.mail_is_absent_student_send_notification_to_parent,
        mail_is_absent_student_notification_sms_to_parent: mailSettings?.mail_is_absent_student_notification_sms_to_parent,
        mail_is_birthday_student_auto_task: mailSettings?.mail_is_birthday_student_auto_task,
        mail_is_holiday_sms_parent_auto_task: mailSettings?.mail_is_holiday_sms_parent_auto_task,
        mail_is_school_event_sms_parent_auto_task: mailSettings?.mail_is_school_event_sms_parent_auto_task,
        mail_is_birthday_wishes_teacher_start_auto_task: mailSettings?.mail_is_birthday_wishes_teacher_start_auto_task,
        mail_is_holiday_sms_staff_start_auto_task: mailSettings?.mail_is_holiday_sms_staff_start_auto_task,
        mail_is_school_event_sms_staff_start_auto_task: mailSettings?.mail_is_school_event_sms_staff_start_auto_task,
        mail_is_absent_student_scheduled_timings: mailSettings?.mail_is_absent_student_scheduled_timings,
        mail_selected_classroom_ids: mailSettings?.mail_selected_classroom_ids,
        mail_selected_staff_ids: mailSettings?.mail_selected_staff_ids,
        mail_is_absent_student_send_daily_report_school_team: mailSettings?.mail_is_absent_student_send_daily_report_school_team,
        mail_additional_emails: mailSettings?.mail_additional_emails,
        mail_is_daily_teacher_attendance_start_auto_task: mailSettings?.mail_is_daily_teacher_attendance_start_auto_task,
        mail_is_teacher_scheduled_attendance_timings: mailSettings?.mail_is_teacher_scheduled_attendance_timings,
        mail_is_daily_teacher_attendance_daily_report_school_team: mailSettings?.mail_is_daily_teacher_attendance_daily_report_school_team,
        mail_teacher_attendance_selected_staff_ids: mailSettings?.mail_teacher_attendance_selected_staff_ids,
        mail_teacher_attendance_additional_emails: mailSettings?.mail_teacher_attendance_additional_emails,
        mail_is_birthday_student_sms: mailSettings?.mail_is_birthday_student_sms,
        mail_is_birthday_student_email: mailSettings?.mail_is_birthday_student_email,
        mail_is_birthday_student_notification: mailSettings?.mail_is_birthday_student_notification,
        mail_birthday_wishes_to_students: mailSettings?.mail_birthday_wishes_to_students,
        mail_is_birthday_student_scheduled_timings: mailSettings?.mail_is_birthday_student_scheduled_timings,
        mail_is_birthday_daily_report_school_team: mailSettings?.mail_is_birthday_daily_report_school_team,
        mail_birthday_selected_staff_ids: mailSettings?.mail_birthday_selected_staff_ids,
        mail_birthday_additional_emails: mailSettings?.mail_birthday_additional_emails,
        mail_is_birthday_teachers_sms: mailSettings?.mail_is_birthday_teachers_sms,
        mail_is_birthday_teacher_email: mailSettings?.mail_is_birthday_teacher_email,
        mail_is_birthday_teacher_notification: mailSettings?.mail_is_birthday_teacher_notification,
        mail_birthday_wishes_to_teacher: mailSettings?.mail_birthday_wishes_to_teacher,
        mail_is_birthday_teacher_scheduled_timings: mailSettings?.mail_is_birthday_teacher_scheduled_timings,
        mail_is_birthday_teacher_daily_report_school_team: mailSettings?.mail_is_birthday_teacher_daily_report_school_team,

        // mail
        mail_mailer: mailSettings?.mail_mailer,
        mail_smtp_username: mailSettings?.mail_smtp_username,
        mail_smtp_password: mailSettings?.mail_smtp_password,
        mail_smtp_host: mailSettings?.mail_smtp_host,
        mail_smtp_port: mailSettings?.mail_smtp_port,
        mail_smtp_encryption: mailSettings?.mail_smtp_encryption,
        mail_smtp_auth: mailSettings?.mail_smtp_auth,
        // test mail 
        test_mail: "",
        
    });

    const handleSelectChange = (event, value, key) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    // handel radio button
    const handelChecked = (type, key, value, value2) => {
        const sendData = { type, key, value, value2 }
        router.post(route('account_setting_create_update'), sendData);
    }

    // handel check button
    const handelCheckedBox = (type, key, value, value2) => {
        const sendData2 = { type, key, value, value2 }
        router.post(route('setting_checkbox_create_update'), sendData2);
    }

    // handel check button
    const handelSelectBox = (type, key, value) => {
        const sendData3 = { type, key, value }
        router.post(route('setting_checkbox_create_update'), sendData3);
    }

    // handle send test mail start
    const handleSendTestMail = (e, testMail) => {
        e.preventDefault();

        router.post(route('mail_setting.send_test_mail'), {mail: testMail});
    }
    // handle send test mail end

    return (
        <div className="educare-create-school-area p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-[5px] rounded-[10px] bg-white/70">
            <form>
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-card-title">
                            <h5><i className="icon-ListBullets"></i>Email Setting</h5>
                        </div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        SMTP Setting
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Email Engine</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            id="mail_mailer"
                                                            data_label=""
                                                            data={mailEngineTypes}
                                                            value={
                                                                data?.mail_mailer
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_mailer",
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
                                                        onClick={() => handelChecked('Mail', 'mail_mailer', data?.mail_mailer)}
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
                                                    <h6>SMTP Username</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="mail_smtp_username"
                                                            value={
                                                                data?.mail_smtp_username
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_username",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_username', data?.mail_smtp_username)}
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
                                                    <h6>SMTP Password</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="mail_smtp_password"
                                                            value={
                                                                data?.mail_smtp_password
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_password",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_password', data?.mail_smtp_password)}
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
                                                    <h6>SMTP Server</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="mail_smtp_host"
                                                            value={
                                                                data?.mail_smtp_host
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_host",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_host', data?.mail_smtp_host)}
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
                                                    <h6>SMTP Port</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="mail_smtp_port"
                                                            value={
                                                                data?.mail_smtp_port
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_port",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_port', data?.mail_smtp_port)}
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
                                                    <h6>SMTP Security</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            id="mail_smtp_encryption"
                                                            data_labal=""
                                                            data={mailEncryptionTypes}
                                                            value={
                                                                data?.mail_smtp_encryption
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_encryption",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_encryption', data?.mail_smtp_encryption)}
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
                                                    <h6>SMTP Auth</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            id="mail_smtp_auth"
                                                            data_labal=""
                                                            data={mailAuthEnableTypes}
                                                            value={
                                                                data?.mail_smtp_auth
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mail_smtp_auth",
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
                                                        onClick={() => handelChecked('Mail', 'mail_smtp_auth', data?.mail_smtp_auth)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-12 mb-5 border-t">
                                            <div className="educare-create-school-settings-list pt-5">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="test_mail"
                                                        value={
                                                            data?.test_mail
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "test_mail",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <button
                                                        type="button"
                                                        className="educare-primary-btn bg-primary cursor-pointer"
                                                        onClick={(e) => handleSendTestMail(e, data.test_mail)}
                                                    >
                                                        Send Test Mail
                                                    </button>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>Auto SMS/Email Setting</h5></div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Absent student sms enabled
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_absent_student_sms_enabled_start_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_absent_student_sms_enabled_start_auto_task", "Yes")}
                                                            checked={data?.mail_is_absent_student_sms_enabled_start_auto_task && data?.mail_is_absent_student_sms_enabled_start_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_absent_student_sms_enabled_start_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_absent_student_sms_enabled_start_auto_task && data?.mail_is_absent_student_sms_enabled_start_auto_task === "No"}
                                                            onChange={() => setData("mail_is_absent_student_sms_enabled_start_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_absent_student_sms_enabled_start_auto_task', data?.mail_is_absent_student_sms_enabled_start_auto_task)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {data?.mail_is_absent_student_sms_enabled_start_auto_task == 'Yes' ?
                                            <>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Send notification to parents via?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="flex gap-3">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_absent_student_send_sms_to_parent"
                                                                            name="mail_is_absent_student_send_sms_to_parent"
                                                                            checked={
                                                                                data.mail_is_absent_student_send_sms_to_parent
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_absent_student_send_sms_to_parent",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_absent_student_send_sms_to_parent"
                                                                            value="Sms"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_absent_student_send_notification_to_parent"
                                                                            name="mail_is_absent_student_send_notification_to_parent"
                                                                            checked={
                                                                                data.mail_is_absent_student_send_notification_to_parent
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_absent_student_send_notification_to_parent",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_absent_student_send_notification_to_parent"
                                                                            value="Notification"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelCheckedBox(
                                                                    'Mail',
                                                                    'mail_is_absent_student_notification_sms_to_parent',
                                                                    data?.mail_is_absent_student_send_sms_to_parent,
                                                                    data?.mail_is_absent_student_send_notification_to_parent
                                                                )}
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
                                                            <h6>Scheduled Timings</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={data?.mail_is_absent_student_scheduled_timings && new Date(data.mail_is_absent_student_scheduled_timings)}
                                                                    onChange={(date) =>
                                                                        setData('mail_is_absent_student_scheduled_timings', date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={1}
                                                                    timeCaption="Time"
                                                                    dateFormat="h:mm aa"
                                                                    placeholderText="Start time"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_absent_student_scheduled_timings', data?.mail_is_absent_student_scheduled_timings)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Select Class"
                                                        />
                                                        <div className="grid grid-cols-12 gap-5">
                                                            <div className="col-span-11">
                                                                <div className="educare-input-type-file-styles">
                                                                    <Autocomplete
                                                                        multiple
                                                                        id="classroom_ids"
                                                                        options={classrooms}
                                                                        disableCloseOnSelect
                                                                        getOptionLabel={(option) => option.title}
                                                                        value={data?.mail_selected_classroom_ids}
                                                                        onChange={(event, value) => handleSelectChange(event, value, 'mail_selected_classroom_ids')}
                                                                        renderOption={(props, option, { selected }) => (
                                                                            <li {...props}>
                                                                                <CheckboxA
                                                                                    icon={icon}
                                                                                    checkedIcon={checkedIcon}
                                                                                    style={{ marginRight: 8 }}
                                                                                    checked={selected}
                                                                                />
                                                                                {option.title}
                                                                            </li>
                                                                        )}
                                                                        renderInput={(params) => <TextField {...params} placeholder="Classes" />}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="educare-list-action-btn">
                                                                    <button
                                                                        className="educare-success-btn-sm-fill"
                                                                        onClick={() => handelSelectBox('Mail', 'mail_selected_classroom_ids', data?.mail_selected_classroom_ids)}
                                                                        type="button"
                                                                    >
                                                                        <i className="icon-check-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Send daily report to school team?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="mail_is_absent_student_send_daily_report_school_team"
                                                                    value="Yes"
                                                                    onChange={() => setData("mail_is_absent_student_send_daily_report_school_team", "Yes")}
                                                                    checked={data?.mail_is_absent_student_send_daily_report_school_team && data?.mail_is_absent_student_send_daily_report_school_team === "Yes"}
                                                                />
                                                                <RadioInput
                                                                    name="mail_is_absent_student_send_daily_report_school_team"
                                                                    value="No"
                                                                    checked={data?.mail_is_absent_student_send_daily_report_school_team && data?.mail_is_absent_student_send_daily_report_school_team === "No"}
                                                                    onChange={() => setData("mail_is_absent_student_send_daily_report_school_team", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_absent_student_send_daily_report_school_team', data?.mail_is_absent_student_send_daily_report_school_team)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Select Staff"
                                                        />
                                                        <div className="grid grid-cols-12 gap-5">
                                                            <div className="col-span-11">
                                                                <div className="educare-input-type-file-styles">
                                                                    <Autocomplete
                                                                        multiple
                                                                        id="staff_ids"
                                                                        options={staffData}
                                                                        disableCloseOnSelect
                                                                        getOptionLabel={(option) => option.title}
                                                                        value={data?.mail_selected_staff_ids}
                                                                        onChange={(event, value) => handleSelectChange(event, value, 'mail_selected_staff_ids')}
                                                                        renderOption={(props, option, { selected }) => (
                                                                            <li {...props}>
                                                                                <CheckboxA
                                                                                    icon={icon}
                                                                                    checkedIcon={checkedIcon}
                                                                                    style={{ marginRight: 8 }}
                                                                                    checked={selected}
                                                                                />
                                                                                {option.title}
                                                                            </li>
                                                                        )}
                                                                        renderInput={(params) => <TextField {...params} placeholder="Select Staff" />}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="educare-list-action-btn">
                                                                    <button
                                                                        className="educare-success-btn-sm-fill"
                                                                        onClick={() => handelSelectBox('Mail', 'mail_selected_staff_ids', data?.mail_selected_staff_ids)}
                                                                        type="button"
                                                                    >
                                                                        <i className="icon-check-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Additional emails</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="mail_additional_emails"
                                                                    value={
                                                                        data.mail_additional_emails
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "mail_additional_emails",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                    placeHolder="Multiple email  separated by comma (,)"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_additional_emails', data?.mail_additional_emails)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :

                                            ' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Send Birthday wishes to students
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_birthday_student_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_birthday_student_auto_task", "Yes")}
                                                            checked={data?.mail_is_birthday_student_auto_task && data?.mail_is_birthday_student_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_birthday_student_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_birthday_student_auto_task && data?.mail_is_birthday_student_auto_task === "No"}
                                                            onChange={() => setData("mail_is_birthday_student_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_birthday_student_auto_task', data?.mail_is_birthday_student_auto_task)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {data?.mail_is_birthday_student_auto_task == 'Yes' ?
                                            <>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Send notification to parents via?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="flex gap-3">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_student_sms"
                                                                            name="mail_is_birthday_student_sms"
                                                                            checked={
                                                                                data.mail_is_birthday_student_sms
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_student_sms",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_student_sms"
                                                                            value="Sms"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_student_email"
                                                                            name="mail_is_birthday_student_email"
                                                                            checked={
                                                                                data.mail_is_birthday_student_email
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_student_email",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_student_email"
                                                                            value="Email"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_student_notification"
                                                                            name="mail_is_birthday_student_notification"
                                                                            checked={
                                                                                data.mail_is_birthday_student_notification
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_student_notification",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_student_notification"
                                                                            value="Notification"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelCheckedBox(
                                                                    'Mail',
                                                                    'mail_birthday_wishes_to_students',
                                                                    data?.mail_is_birthday_student_sms,
                                                                    data?.mail_is_birthday_student_email,
                                                                    data?.mail_is_birthday_student_notification,
                                                                )}
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
                                                            <h6>Scheduled Timings</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={data?.mail_is_birthday_student_scheduled_timings && new Date(data.mail_is_birthday_student_scheduled_timings)}
                                                                    onChange={(date) =>
                                                                        setData('mail_is_birthday_student_scheduled_timings', date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={1}
                                                                    timeCaption="Time"
                                                                    dateFormat="h:mm aa"
                                                                    placeholderText="Start time"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_birthday_student_scheduled_timings', data?.mail_is_birthday_student_scheduled_timings)}
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
                                                            <h6>Send daily report to school team?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="mail_is_birthday_daily_report_school_team"
                                                                    value="Yes"
                                                                    onChange={() => setData("mail_is_birthday_daily_report_school_team", "Yes")}
                                                                    checked={data?.mail_is_birthday_daily_report_school_team && data?.mail_is_birthday_daily_report_school_team === "Yes"}
                                                                />
                                                                <RadioInput
                                                                    name="mail_is_birthday_daily_report_school_team"
                                                                    value="No"
                                                                    checked={data?.mail_is_birthday_daily_report_school_team && data?.mail_is_birthday_daily_report_school_team === "No"}
                                                                    onChange={() => setData("mail_is_birthday_daily_report_school_team", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_birthday_daily_report_school_team', data?.mail_is_birthday_daily_report_school_team)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Select Staff"
                                                        />
                                                        <div className="grid grid-cols-12 gap-5">
                                                            <div className="col-span-11">
                                                                <div className="educare-input-type-file-styles">
                                                                    <Autocomplete
                                                                        multiple
                                                                        id="birthday_staff_ids"
                                                                        options={staffData}
                                                                        disableCloseOnSelect
                                                                        getOptionLabel={(option) => option.title}
                                                                        value={data?.mail_birthday_selected_staff_ids}
                                                                        onChange={(event, value) => handleSelectChange(event, value, 'mail_birthday_selected_staff_ids')}
                                                                        renderOption={(props, option, { selected }) => (
                                                                            <li {...props}>
                                                                                <CheckboxA
                                                                                    icon={icon}
                                                                                    checkedIcon={checkedIcon}
                                                                                    style={{ marginRight: 8 }}
                                                                                    checked={selected}
                                                                                />
                                                                                {option.title}
                                                                            </li>
                                                                        )}
                                                                        renderInput={(params) => <TextField {...params} placeholder="Select Staff" />}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="educare-list-action-btn">
                                                                    <button
                                                                        className="educare-success-btn-sm-fill"
                                                                        onClick={() => handelSelectBox('Mail', 'mail_birthday_selected_staff_ids', data?.mail_birthday_selected_staff_ids)}
                                                                        type="button"
                                                                    >
                                                                        <i className="icon-check-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Additional emails</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="mail_birthday_additional_emails"
                                                                    value={
                                                                        data.mail_birthday_additional_emails
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "mail_birthday_additional_emails",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                    placeHolder="Multiple email  separated by comma (,)"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_birthday_additional_emails', data?.mail_birthday_additional_emails)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :

                                            ' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Send holiday sms to parents
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_holiday_sms_parent_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_holiday_sms_parent_auto_task", "Yes")}
                                                            checked={data?.mail_is_holiday_sms_parent_auto_task && data?.mail_is_holiday_sms_parent_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_holiday_sms_parent_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_holiday_sms_parent_auto_task && data?.mail_is_holiday_sms_parent_auto_task === "No"}
                                                            onChange={() => setData("mail_is_holiday_sms_parent_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_holiday_sms_parent_auto_task', data?.mail_is_holiday_sms_parent_auto_task)}
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
                                        Send school event sms to parents
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_school_event_sms_parent_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_school_event_sms_parent_auto_task", "Yes")}
                                                            checked={data?.mail_is_school_event_sms_parent_auto_task && data?.mail_is_school_event_sms_parent_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_school_event_sms_parent_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_school_event_sms_parent_auto_task && data?.mail_is_school_event_sms_parent_auto_task === "No"}
                                                            onChange={() => setData("mail_is_school_event_sms_parent_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_school_event_sms_parent_auto_task', data?.mail_is_school_event_sms_parent_auto_task)}
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
                                        Send auto daily teacher attendance report
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_daily_teacher_attendance_start_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_daily_teacher_attendance_start_auto_task", "Yes")}
                                                            checked={data?.mail_is_daily_teacher_attendance_start_auto_task && data?.mail_is_daily_teacher_attendance_start_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_daily_teacher_attendance_start_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_daily_teacher_attendance_start_auto_task && data?.mail_is_daily_teacher_attendance_start_auto_task === "No"}
                                                            onChange={() => setData("mail_is_daily_teacher_attendance_start_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_daily_teacher_attendance_start_auto_task', data?.mail_is_daily_teacher_attendance_start_auto_task)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {data?.mail_is_daily_teacher_attendance_start_auto_task == 'Yes' ?
                                            <>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Scheduled Timings</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={data?.mail_is_teacher_scheduled_attendance_timings && new Date(data.mail_is_teacher_scheduled_attendance_timings)}
                                                                    onChange={(date) =>
                                                                        setData('mail_is_teacher_scheduled_attendance_timings', date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={1}
                                                                    timeCaption="Time"
                                                                    dateFormat="h:mm aa"
                                                                    placeholderText="Start time"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_teacher_scheduled_attendance_timings', data?.mail_is_teacher_scheduled_attendance_timings)}
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
                                                            <h6>Send daily Report to school team? </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="mail_is_daily_teacher_attendance_daily_report_school_team"
                                                                    value="Yes"
                                                                    onChange={() => setData("mail_is_daily_teacher_attendance_daily_report_school_team", "Yes")}
                                                                    checked={data?.mail_is_daily_teacher_attendance_daily_report_school_team && data?.mail_is_daily_teacher_attendance_daily_report_school_team === "Yes"}
                                                                />
                                                                <RadioInput
                                                                    name="mail_is_daily_teacher_attendance_daily_report_school_team"
                                                                    value="No"
                                                                    checked={data?.mail_is_daily_teacher_attendance_daily_report_school_team && data?.mail_is_daily_teacher_attendance_daily_report_school_team === "No"}
                                                                    onChange={() => setData("mail_is_daily_teacher_attendance_daily_report_school_team", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_daily_teacher_attendance_daily_report_school_team', data?.mail_is_daily_teacher_attendance_daily_report_school_team)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Select Staff"
                                                        />
                                                        <div className="grid grid-cols-12 gap-5">
                                                            <div className="col-span-11">
                                                                <div className="educare-input-type-file-styles">
                                                                    <Autocomplete
                                                                        multiple
                                                                        id="staff_ids"
                                                                        options={staffData}
                                                                        disableCloseOnSelect
                                                                        getOptionLabel={(option) => option.title}
                                                                        value={data?.mail_teacher_attendance_selected_staff_ids}
                                                                        onChange={(event, value) => handleSelectChange(event, value, 'mail_teacher_attendance_selected_staff_ids')}
                                                                        renderOption={(props, option, { selected }) => (
                                                                            <li {...props}>
                                                                                <CheckboxA
                                                                                    icon={icon}
                                                                                    checkedIcon={checkedIcon}
                                                                                    style={{ marginRight: 8 }}
                                                                                    checked={selected}
                                                                                />
                                                                                {option.title}
                                                                            </li>
                                                                        )}
                                                                        renderInput={(params) => <TextField {...params} placeholder="Select Staff" />}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="educare-list-action-btn">
                                                                    <button
                                                                        className="educare-success-btn-sm-fill"
                                                                        onClick={() => handelSelectBox('Mail', 'mail_teacher_attendance_selected_staff_ids', data?.mail_teacher_attendance_selected_staff_ids)}
                                                                        type="button"
                                                                    >
                                                                        <i className="icon-check-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Additional emails</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="mail_teacher_attendance_additional_emails"
                                                                    value={
                                                                        data.mail_teacher_attendance_additional_emails
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "mail_teacher_attendance_additional_emails",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                    placeHolder="Multiple email  separated by comma (,)"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_teacher_attendance_additional_emails', data?.mail_teacher_attendance_additional_emails)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :

                                            ' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Send Birthday wishes to students
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_birthday_wishes_teacher_start_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_birthday_wishes_teacher_start_auto_task", "Yes")}
                                                            checked={data?.mail_is_birthday_wishes_teacher_start_auto_task && data?.mail_is_birthday_wishes_teacher_start_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_birthday_wishes_teacher_start_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_birthday_wishes_teacher_start_auto_task && data?.mail_is_birthday_wishes_teacher_start_auto_task === "No"}
                                                            onChange={() => setData("mail_is_birthday_wishes_teacher_start_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_birthday_wishes_teacher_start_auto_task', data?.mail_is_birthday_wishes_teacher_start_auto_task)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {data?.mail_is_birthday_wishes_teacher_start_auto_task == 'Yes' ?
                                            <>
                                                <div className="col-span-12">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>Send notification to parents via?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="flex gap-3">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_teachers_sms"
                                                                            name="mail_is_birthday_teachers_sms"
                                                                            checked={
                                                                                data.mail_is_birthday_teachers_sms
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_teachers_sms",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_teachers_sms"
                                                                            value="Sms"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_teacher_email"
                                                                            name="mail_is_birthday_teacher_email"
                                                                            checked={
                                                                                data.mail_is_birthday_teacher_email
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_teacher_email",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_teacher_email"
                                                                            value="Email"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="mail_is_birthday_teacher_notification"
                                                                            name="mail_is_birthday_teacher_notification"
                                                                            checked={
                                                                                data.mail_is_birthday_teacher_notification
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "mail_is_birthday_teacher_notification",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="mail_is_birthday_teacher_notification"
                                                                            value="Notification"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelCheckedBox(
                                                                    'Mail',
                                                                    'mail_birthday_wishes_to_teacher',
                                                                    data?.mail_is_birthday_teachers_sms,
                                                                    data?.mail_is_birthday_teacher_email,
                                                                    data?.mail_is_birthday_teacher_notification,
                                                                )}
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
                                                            <h6>Scheduled Timings</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={data?.mail_is_birthday_teacher_scheduled_timings && new Date(data.mail_is_birthday_teacher_scheduled_timings)}
                                                                    onChange={(date) =>
                                                                        setData('mail_is_birthday_teacher_scheduled_timings', date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={1}
                                                                    timeCaption="Time"
                                                                    dateFormat="h:mm aa"
                                                                    placeholderText="Start time"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_birthday_teacher_scheduled_timings', data?.mail_is_birthday_teacher_scheduled_timings)}
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
                                                            <h6>Send daily report to school team?</h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="mail_is_birthday_teacher_daily_report_school_team"
                                                                    value="Yes"
                                                                    onChange={() => setData("mail_is_birthday_teacher_daily_report_school_team", "Yes")}
                                                                    checked={data?.mail_is_birthday_teacher_daily_report_school_team && data?.mail_is_birthday_teacher_daily_report_school_team === "Yes"}
                                                                />
                                                                <RadioInput
                                                                    name="mail_is_birthday_teacher_daily_report_school_team"
                                                                    value="No"
                                                                    checked={data?.mail_is_birthday_teacher_daily_report_school_team && data?.mail_is_birthday_teacher_daily_report_school_team === "No"}
                                                                    onChange={() => setData("mail_is_birthday_teacher_daily_report_school_team", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="educare-list-action-btn">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Mail', 'mail_is_birthday_teacher_daily_report_school_team', data?.mail_is_birthday_teacher_daily_report_school_team)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :

                                            ' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Send holiday sms to staff
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_holiday_sms_staff_start_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_holiday_sms_staff_start_auto_task", "Yes")}
                                                            checked={data?.mail_is_holiday_sms_staff_start_auto_task && data?.mail_is_holiday_sms_staff_start_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_holiday_sms_staff_start_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_holiday_sms_staff_start_auto_task && data?.mail_is_holiday_sms_staff_start_auto_task === "No"}
                                                            onChange={() => setData("mail_is_holiday_sms_staff_start_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_holiday_sms_staff_start_auto_task', data?.mail_is_holiday_sms_staff_start_auto_task)}
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
                                        Send school event sms to staff
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Do you want to start this auto task?</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="mail_is_school_event_sms_staff_start_auto_task"
                                                            value="Yes"
                                                            onChange={() => setData("mail_is_school_event_sms_staff_start_auto_task", "Yes")}
                                                            checked={data?.mail_is_school_event_sms_staff_start_auto_task && data?.mail_is_school_event_sms_staff_start_auto_task === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="mail_is_school_event_sms_staff_start_auto_task"
                                                            value="No"
                                                            checked={data?.mail_is_school_event_sms_staff_start_auto_task && data?.mail_is_school_event_sms_staff_start_auto_task === "No"}
                                                            onChange={() => setData("mail_is_school_event_sms_staff_start_auto_task", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Mail', 'mail_is_school_event_sms_staff_start_auto_task', data?.mail_is_school_event_sms_staff_start_auto_task)}
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

export default MailSettingCreateForm;
