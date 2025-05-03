import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import schoolModules from "@/data/schoolModules.json";

const ModuleForm = ({ schools, modules = [], schoolId, className = "" }) => {
    const [SetupYourSchoolActive, setSetupYourSchoolActive] = useState(true);
    const [AdministrationActive, setAdministrationActive] = useState(true);
    const [AcademicsActive, setAcademicsActive] = useState(true);
    const [DashboardActive, setDashboardActive] = useState(true);
    const [FinanceActive, setFinanceActive] = useState(true);
    const [CommunicationActive, setCommunicationActive] = useState(true);
    const [OurServicesActive, setOurServicesActive] = useState(true);
    const [MyDetailsActive, setMyDetailsActive] = useState(true);

    

    const SetupYourSchoolToggle = () => {
        setSetupYourSchoolActive(!SetupYourSchoolActive);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyDetailsActive(false);
    };

    const AdministrationToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(!AdministrationActive);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyDetailsActive(false);
    };

    const AcademicsToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(!AcademicsActive);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyDetailsActive(false);
    };

    const FinanceToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(!FinanceActive);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyDetailsActive(false);
    };

    const CommunicationToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(!CommunicationActive);
        setOurServicesActive(false);
        setMyDetailsActive(false);
    };

    const OurServicesToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(!OurServicesActive);
        setMyDetailsActive(false);
    };

    const MyDetailsToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyDetailsActive(!MyDetailsActive);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        school: schoolId,
        //parent of school
        module_parent_school_all: modules?.module_parent_school_all,
        // parent of Administration
        module_parent_administration_all:
            modules?.module_parent_administration_all,
        // parent of Academics
        module_parent_academics_all: modules?.module_parent_academics_all,
        // parent of Finance
        module_parent_finance_all: modules?.module_parent_finance_all,
        // parent of communication
        module_parent_communication_all:
            modules?.module_parent_communication_all,
        // parent of Our Services
        module_parent_ourservices_all: modules?.module_parent_ourservices_all,
        // parent of My Details
        module_parent_mydetails_all: modules?.module_parent_mydetails_all,

        // modules of school setup
        module_enquiry: modules?.module_enquiry,
        module_registration: modules?.module_registration,
        module_academic_years: modules?.module_academic_years,
        module_blood_groups: modules?.module_blood_groups,
        module_categories: modules?.module_categories,
        module_classes: modules?.module_classes,
        module_class_groups: modules?.module_class_groups,
        module_custom_fields: modules?.module_custom_fields,
        module_designations: modules?.module_designations,
        module_departments: modules?.module_departments,
        module_emergency_contacts: modules?.module_emergency_contacts,
        module_holidays: modules?.module_holidays,
        module_holiday_policies: modules?.module_holiday_policies,
        module_houses: modules?.module_houses,
        module_improve_presence_on_internet:
        modules?.module_improve_presence_on_internet,
        module_religions: modules?.module_religions,
        module_occupations: modules?.module_occupations,
        module_schools: modules?.module_schools,
        module_mail_settings: modules?.module_mail_settings,
        module_school_settings: modules?.module_school_settings,
        module_sms_settings: modules?.module_sms_settings,
        module_social_shares: modules?.module_social_shares,
        module_timezones: modules?.module_timezones,
        module_permissions: modules?.module_permissions,
        module_school_import: modules?.module_school_import,
        module_school_export: modules?.module_school_export,

        // modules of Administration
        module_alumni: modules?.module_alumni,
        module_attendance_staff: modules?.module_attendance_staff,
        module_attendance_student: modules?.module_attendance_student,
        module_calendar: modules?.module_calendar,
        module_document: modules?.module_document,
        module_download: modules?.module_download,
        module_visitor_enquiry: modules?.module_visitor_enquiry,
        module_hostel: modules?.module_hostel,
        module_helpdesk: modules?.module_helpdesk,
        module_leave: modules?.module_leave,
        module_library: modules?.module_library,
        module_post_jobs: modules?.module_post_jobs,
        module_staffs: modules?.module_staffs,
        module_student: modules?.module_student,
        module_summary: modules?.module_summary,
        module_survey: modules?.module_survey,
        module_team: modules?.module_team,
        module_transport: modules?.module_transport,

        // modules of Academics
        module_academic: modules?.module_academic,
        module_academic_content: modules?.module_academic_content,
        module_assessment: modules?.module_assessment,
        module_classwork: modules?.module_classwork,
        module_homework: modules?.module_homework,
        module_lesson_plan: modules?.module_lesson_plan,
        module_online_class: modules?.module_online_class,
        module_online_exam: modules?.module_online_exam,
        module_time_table: modules?.module_time_table,
        module_syllabus: modules?.module_syllabus,
        module_academic_grade: modules?.module_academic_grade,
        module_certificate: modules?.module_certificate,

        // modules of Finance
        module_admission: modules?.module_admission,
        module_fees: modules?.module_fees,
        module_accounts: modules?.module_accounts,
        module_salary: modules?.module_salary,

        // modules of Communication
        module_event: modules?.module_event,
        module_message: modules?.module_message,
        module_news: modules?.module_news,
        module_notice: modules?.module_notice,
        module_broadcast: modules?.module_broadcast,
        module_birthday: modules?.module_birthday,
        module_notification: modules?.module_notification,
        module_mail: modules?.module_mail,
        module_sms: modules?.module_sms,
        module_complaints: modules?.module_complaints,
        module_feedback: modules?.module_feedback,

        // modules of Our Services
        module_buy_sms: modules?.module_buy_sms,
        module_support_tickets: modules?.module_support_tickets,
        module_billing: modules?.module_billing,
        module_buy_services: modules?.module_buy_services,

        // modules of my details
        module_pay_slip: modules?.module_pay_slip,
        module_attendance: modules?.module_attendance,
        module_manage_leave: modules?.module_manage_leave,
        module_manage_your_profile: modules?.module_manage_your_profile,
        module_transport_details: modules?.module_transport_details,
        module_extra_duty: modules?.module_extra_duty,
    });

    useEffect(() => {
        let newFormData;
        newFormData = {
            ...data,
            school: schoolId,
            //parent of school
            module_parent_school_all: modules?.module_parent_school_all,
            // parent of Administration
            module_parent_administration_all:
                modules?.module_parent_administration_all,
            // parent of Academics
            module_parent_academics_all: modules?.module_parent_academics_all,
            // parent of Finance
            module_parent_finance_all: modules?.module_parent_finance_all,
            // parent of communication
            module_parent_communication_all:
                modules?.module_parent_communication_all,
            // parent of Our Services
            module_parent_ourservices_all:
                modules?.module_parent_ourservices_all,
            // parent of My Details
            module_parent_mydetails_all:
            modules?.module_parent_mydetails_all,

            // modules of school setup
            module_enquiry: modules?.module_enquiry,
            module_registration: modules?.module_registration,
            module_academic_years: modules?.module_academic_years,
            module_blood_groups: modules?.module_blood_groups,
            module_categories: modules?.module_categories,
            module_classes: modules?.module_classes,
            module_class_groups: modules?.module_class_groups,
            module_custom_fields: modules?.module_custom_fields,
            module_designations: modules?.module_designations,
            module_departments: modules?.module_departments,
            module_emergency_contacts: modules?.module_emergency_contacts,
            module_holidays: modules?.module_holidays,
            module_holiday_policies: modules?.module_holiday_policies,
            module_houses: modules?.module_houses,
            module_improve_presence_on_internet:
            modules?.module_improve_presence_on_internet,
            module_religions: modules?.module_religions,
            module_occupations: modules?.module_occupations,
            module_schools: modules?.module_schools,
            module_mail_settings: modules?.module_mail_settings,
            module_school_settings: modules?.module_school_settings,
            module_sms_settings: modules?.module_sms_settings,
            module_social_shares: modules?.module_social_shares,
            module_timezones: modules?.module_timezones,
            module_permissions: modules?.module_permissions,
            module_school_import: modules?.module_school_import,
            module_school_export: modules?.module_school_export,

            // modules of Administration
            module_alumni: modules?.module_alumni,
            module_attendance_staff: modules?.module_attendance_staff,
            module_attendance_student: modules?.module_attendance_student,
            module_calendar: modules?.module_calendar,
            module_document: modules?.module_document,
            module_download: modules?.module_download,
            module_visitor_enquiry: modules?.module_visitor_enquiry,
            module_hostel: modules?.module_hostel,
            module_helpdesk: modules?.module_helpdesk,
            module_leave: modules?.module_leave,
            module_library: modules?.module_library,
            module_post_jobs: modules?.module_post_jobs,
            module_staffs: modules?.module_staffs,
            module_student: modules?.module_student,
            module_summary: modules?.module_summary,
            module_survey: modules?.module_survey,
            module_team: modules?.module_team,
            module_transport: modules?.module_transport,

            // modules of Academics
            module_academic: modules?.module_academic,
            module_academic_content: modules?.module_academic_content,
            module_assessment: modules?.module_assessment,
            module_classwork: modules?.module_classwork,
            module_homework: modules?.module_homework,
            module_lesson_plan: modules?.module_lesson_plan,
            module_online_class: modules?.module_online_class,
            module_online_exam: modules?.module_online_exam,
            module_time_table: modules?.module_time_table,
            module_syllabus: modules?.module_syllabus,
            module_academic_grade: modules?.module_academic_grade,
            module_certificate: modules?.module_certificate,

            // modules of Finance
            module_admission: modules?.module_admission,
            module_fees: modules?.module_fees,
            module_accounts: modules?.module_accounts,
            module_salary: modules?.module_salary,

            // modules of Communication
            module_event: modules?.module_event,
            module_message: modules?.module_message,
            module_news: modules?.module_news,
            module_notice: modules?.module_notice,
            module_broadcast: modules?.module_broadcast,
            module_birthday: modules?.module_birthday,
            module_notification: modules?.module_notification,
            module_mail: modules?.module_mail,
            module_sms: modules?.module_sms,
            module_complaints: modules?.module_complaints,
            module_feedback: modules?.module_feedback,

            // modules of Our Services
            module_buy_sms: modules?.module_buy_sms,
            module_support_tickets: modules?.module_support_tickets,
            module_billing: modules?.module_billing,
            module_buy_services: modules?.module_buy_services,

            // modules of my details
            module_pay_slip: modules?.module_pay_slip,
            module_attendance: modules?.module_attendance,
            module_manage_leave: modules?.module_manage_leave,
            module_manage_your_profile: modules?.module_manage_your_profile,
            module_transport_details: modules?.module_transport_details,
            module_extra_duty: modules?.module_extra_duty,
        };
        setData(newFormData);
    }, [modules]);

    const permissionsFormData = (e) => {
        e.preventDefault();

        post(route("module.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    //handle school all
    const permissionParentSchoolToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_school_all") {
            newFormData = {
                ...data,
                [name]: value,
                //modules of school setup
                module_enquiry: value,
                module_registration: value,
                module_academic_years: value,
                module_blood_groups: value,
                module_categories: value,
                module_classes: value,
                module_class_groups: value,
                module_custom_fields: value,
                module_designations: value,
                module_departments: value,
                module_emergency_contacts: value,
                module_holidays: value,
                module_holiday_policies: value,
                module_houses: value,
                module_improve_presence_on_internet: value,
                module_religions: value,
                module_occupations: value,
                module_schools: value,
                module_mail_settings: value,
                module_school_settings: value,
                module_sms_settings: value,
                module_social_shares: value,
                module_timezones: value,
                module_permissions: value,
                module_school_import: value,
                module_school_export: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_school_all = false;
            }
            // after all child checked, then parent will check - newFormData.module_classes_subject_view_checkbox_id === true
            else if (false) {
                newFormData.module_parent_school_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Administration all
    const permissionParentAdministrationToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_administration_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Administration
                module_alumni: value,
                module_attendance_staff: value,
                module_attendance_student: value,
                module_calendar: value,
                module_document: value,
                module_download: value,
                module_visitor_enquiry: value,
                module_hostel: value,
                module_helpdesk: value,
                module_leave: value,
                module_library: value,
                module_post_jobs: value,
                module_staffs: value,
                module_student: value,
                module_summary: value,
                module_survey: value,
                module_team: value,
                module_transport: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_administration_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_administration_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Academics all
    const permissionParentAcademicsToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_academics_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Academics
                module_academic: value,
                module_academic_content: value,
                module_assessment: value,
                module_classwork: value,
                module_homework: value,
                module_lesson_plan: value,
                module_online_class: value,
                module_online_exam: value,
                module_time_table: value,
                module_syllabus: value,
                module_academic_grade: value,
                module_certificate: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_academics_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_academics_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Finance all
    const permissionParentFinanceToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_finance_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Finance
                module_admission: value,
                module_fees: value,
                module_accounts: value,
                module_salary: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_finance_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_finance_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Communication all
    const permissionParentCommunicationToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_communication_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Communication
                module_event: value,
                module_message: value,
                module_news: value,
                module_notice: value,
                module_broadcast: value,
                module_birthday: value,
                module_notification: value,
                module_mail: value,
                module_sms: value,
                module_complaints: value,
                module_feedback: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_communication_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_communication_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Our Services all
    const permissionParentOurServicesToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_ourservices_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Our Services
                module_buy_sms: value,
                module_support_tickets: value,
                module_billing: value,
                module_buy_services: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_ourservices_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_ourservices_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Details all
    const permissionParentMyDetailsToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "module_parent_mydetails_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of My Details
                module_pay_slip: value,
                module_attendance: value,
                module_manage_leave: value,
                module_manage_your_profile: value,
                module_transport_details: value,
                module_extra_duty: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.module_parent_mydetails_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.module_parent_mydetails_all = true;
            }
        }

        setData(newFormData);
    };

    return (
        <div className="educare-create-school-area mt-[30px] p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={permissionsFormData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-button-field-styles mb-[20px]">
                            <TextInput
                                id="school"
                                value={data?.school}
                                type="hidden"
                                className="block"
                                required
                            />
                        </div>

                        <div className="educare-button-field-styles mb-[20px] text-end">
                            <PrimaryButton
                                disabled={processing}
                                className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                            >
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Save</p>
                            </Transition>
                        </div>
                        <div className="educare-create-school-details">
                            {/* Start - Setup Your School */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            SetupYourSchoolActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={SetupYourSchoolToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Setup Your School
                                        </h5>
                                        <span
                                            onClick={SetupYourSchoolToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    SetupYourSchoolActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            SetupYourSchoolActive
                                                ? ""
                                                : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Setup Your
                                                                    School
                                                                </h5>
                                                                <div className="permission-role-checkbox ">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_school_all"
                                                                            name="module_parent_school_all"
                                                                            checked={
                                                                                data.module_parent_school_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentSchoolToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_school_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                        Name
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50"></div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                        Name
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper"></div>
                                                            </div>

                                                            {/* Start -  features of Setup Your School */}
                                                            {schoolModules[0]
                                                                .items &&
                                                                schoolModules[0].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentSchoolToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentSchoolToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  features of Setup Your School */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end Setup Your School */}

                            {/* Start - Administration */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            AdministrationActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={AdministrationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Administration
                                        </h5>
                                        <span
                                            onClick={AdministrationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    AdministrationActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            AdministrationActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Administration
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_administration_all"
                                                                            name="module_parent_administration_all"
                                                                            checked={
                                                                                data.module_parent_administration_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentAdministrationToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_administration_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/*modules[1].items && modules[1].items.map((item) => (
                                                                <>
                                                                {`module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[1].items && modules[1].items.map((item) => (
                                                                <>
                                                                {`add_module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[1].items && modules[1].items.map((item) => (
                                                                <>
                                                                {`edit_module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[1].items && modules[1].items.map((item) => (
                                                                <>
                                                                {`delete_module_${item.key}: false,` }<br />
                                                                </>
                                                            )) */}

                                                            {/* Start -  features of Administration */}
                                                            {schoolModules[1]
                                                                .items &&
                                                                schoolModules[1].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentAdministrationToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentAdministrationToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  Administration */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Administration */}

                            {/* Start - Academics */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            AcademicsActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={AcademicsToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Academics
                                        </h5>
                                        <span
                                            onClick={AcademicsToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    AcademicsActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            AcademicsActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Academics
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_academics_all"
                                                                            name="module_parent_academics_all"
                                                                            checked={
                                                                                data.module_parent_academics_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentAcademicsToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_academics_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/* modules[2].items && modules[2].items.map((item) => (
                                                                <>
                                                                {`module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[2].items && modules[2].items.map((item) => (
                                                                <>
                                                                {`add_module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[2].items && modules[2].items.map((item) => (
                                                                <>
                                                                {`edit_module_${item.key}: false,` }<br />
                                                                </>
                                                            ))}

                                                            {modules[2].items && modules[2].items.map((item) => (
                                                                <>
                                                                {`delete_module_${item.key}: false,` }<br />
                                                                </>
                                                            )) */}

                                                            {/* Start -  features of Academics */}
                                                            {schoolModules[2]
                                                                .items &&
                                                                schoolModules[2].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentAcademicsToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentAcademicsToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  Academics */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Academics */}

                            {/* Start - Finance */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            FinanceActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={FinanceToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Finance
                                        </h5>
                                        <span
                                            onClick={FinanceToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    FinanceActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            FinanceActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Finance
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_finance_all"
                                                                            name="module_parent_finance_all"
                                                                            checked={
                                                                                data.module_parent_finance_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentFinanceToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_finance_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Finance */}
                                                            {schoolModules[3]
                                                                .items &&
                                                                schoolModules[3].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentFinanceToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key2}`}
                                                                                                name={`module_${item.key2}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key2}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentFinanceToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key2}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  Finance */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Finance */}

                            {/* Start - Communication */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            CommunicationActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={CommunicationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Communication
                                        </h5>
                                        <span
                                            onClick={CommunicationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    CommunicationActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            CommunicationActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Communication
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_communication_all"
                                                                            name="module_parent_communication_all"
                                                                            checked={
                                                                                data.module_parent_communication_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentCommunicationToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_communication_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Communication */}
                                                            {schoolModules[4]
                                                                .items &&
                                                                schoolModules[4].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentCommunicationToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentCommunicationToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  Communication */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Communication */}

                            {/* Start - Our Services */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            OurServicesActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={OurServicesToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Our Services
                                        </h5>
                                        <span
                                            onClick={OurServicesToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    OurServicesActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            OurServicesActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Our Services
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_ourservices_all"
                                                                            name="module_parent_ourservices_all"
                                                                            checked={
                                                                                data.module_parent_ourservices_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentOurServicesToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_ourservices_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Our Services */}
                                                            {schoolModules[5]
                                                                .items &&
                                                                schoolModules[5].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentOurServicesToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentOurServicesToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  Our Services */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Our Services */}

                            {/* Start - My Details */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            MyDetailsActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={MyDetailsToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            My Details
                                        </h5>
                                        <span
                                            onClick={MyDetailsToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    OurServicesActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            OurServicesActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    My Details
                                                                </h5>
                                                                <div className="permission-role-checkbox">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="module_parent_mydetails_all"
                                                                            name="module_parent_mydetails_all"
                                                                            checked={
                                                                                data.module_parent_mydetails_all
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                permissionParentMyDetailsToggle(
                                                                                    e
                                                                                        .target
                                                                                        .name,
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="module_parent_mydetails_all">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right permission-role-module-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Module
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-module-checkbox-parent"></div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Our Services */}
                                                            {schoolModules[6]
                                                                .items &&
                                                                schoolModules[6].items.map(
                                                                    (item) => (
                                                                        <>
                                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="permission-role-checkbox-wrapper border-r border-border/50">
                                                                                    <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                        <div className="educare-checkbox-field-styles">
                                                                                            <Checkbox
                                                                                                id={`module_${item.key}`}
                                                                                                name={`module_${item.key}`}
                                                                                                checked={
                                                                                                    data[
                                                                                                        `module_${item.key}`
                                                                                                    ]
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    permissionParentMyDetailsToggle(
                                                                                                        e
                                                                                                            .target
                                                                                                            .name,
                                                                                                        e
                                                                                                            .target
                                                                                                            .checked
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <label
                                                                                            htmlFor={`module_${item.key}`}
                                                                                        >
                                                                                            Assign
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="permission-role-category">
                                                                                    <h6 className="text-[15px] font-medium text-headingLight">
                                                                                        {
                                                                                            item.name2
                                                                                        }
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="permission-role-checkbox-wrapper">
                                                                                    {item.name2 && (
                                                                                        <div className="permission-role-checkbox permission-role-module-checkbox">
                                                                                            <div className="educare-checkbox-field-styles">
                                                                                                <Checkbox
                                                                                                    id={`module_${item.key2}`}
                                                                                                    name={`module_${item.key2}`}
                                                                                                    checked={
                                                                                                        data[
                                                                                                            `module_${item.key2}`
                                                                                                        ]
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        permissionParentMyDetailsToggle(
                                                                                                            e
                                                                                                                .target
                                                                                                                .name,
                                                                                                            e
                                                                                                                .target
                                                                                                                .checked
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <label
                                                                                                htmlFor={`module_${item.key2}`}
                                                                                            >
                                                                                                Assign
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                )}
                                                            {/* End -  My Details */}
                                                        </div>
                                                    </div>
                                                    {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - My Details */}
                        </div>
                        <div className="educare-button-field-styles mt-2.5 text-end">
                            <PrimaryButton
                                disabled={processing}
                                className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                            >
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Save</p>
                            </Transition>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModuleForm;
