import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import modules from "@/data/modules.json"

const PermissionsForm = ({ roles, users, selectedPermissions, checkData, className = "" }) => {
    const [SetupYourSchoolActive, setSetupYourSchoolActive] = useState(true);
    const [AdministrationActive, setAdministrationActive] = useState(true);
    const [AcademicsActive, setAcademicsActive] = useState(true);
    const [FinanceActive, setFinanceActive] = useState(true);
    const [CommunicationActive, setCommunicationActive] = useState(true);
    const [OurServicesActive, setOurServicesActive] = useState(true);
    const [MyProfileActive, setMyProfileActive] = useState(true);
    const [AccountActive, setAccountActive] = useState(true);
    const [TransportationActive, setTransportationActive] = useState(true);

    const SetupYourSchoolToggle = () => {
        setSetupYourSchoolActive(!SetupYourSchoolActive);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const AdministrationToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(!AdministrationActive);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const AcademicsToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(!AcademicsActive);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const FinanceToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(!FinanceActive);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const CommunicationToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(!CommunicationActive);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const OurServicesToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(!OurServicesActive);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const MyProfileToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(!MyProfileActive);
        setAccountActive(false);
        setTransportationActive(false);
    };

    const AccountToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(!AccountActive);
        setTransportationActive(false);
    };

    const TransportationToggle = () => {
        setSetupYourSchoolActive(false);
        setAdministrationActive(false);
        setAcademicsActive(false);
        setFinanceActive(false);
        setCommunicationActive(false);
        setOurServicesActive(false);
        setMyProfileActive(false);
        setAccountActive(false);
        setTransportationActive(!TransportationActive);
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
        user_id: checkData?.check_user && checkData?.check_user,
        user_role: checkData?.check_role && checkData?.check_role,
        //parent of school
        permission_parent_school_view_all: selectedPermissions['permission_parent_school_view_all'],
        permission_parent_school_add_all: selectedPermissions['permission_parent_school_add_all'],
        permission_parent_school_edit_all: selectedPermissions['permission_parent_school_edit_all'],
        permission_parent_school_delete_all: selectedPermissions['permission_parent_school_delete_all'],
        // parent of Administration
        permission_parent_administration_view_all: selectedPermissions['permission_parent_administration_view_all'],
        permission_parent_administration_add_all: selectedPermissions['permission_parent_administration_add_all'],
        permission_parent_administration_edit_all: selectedPermissions['permission_parent_administration_edit_all'],
        permission_parent_administration_delete_all: selectedPermissions['permission_parent_administration_delete_all'],
        // parent of Academics
        permission_parent_academics_view_all: selectedPermissions['permission_parent_academics_view_all'],
        permission_parent_academics_add_all: selectedPermissions['permission_parent_academics_add_all'],
        permission_parent_academics_edit_all: selectedPermissions['permission_parent_academics_edit_all'],
        permission_parent_academics_delete_all: selectedPermissions['permission_parent_academics_delete_all'],
        // parent of Finance
        permission_parent_finance_view_all: selectedPermissions['permission_parent_finance_view_all'],
        permission_parent_finance_add_all: selectedPermissions['permission_parent_finance_add_all'],
        permission_parent_finance_edit_all: selectedPermissions['permission_parent_finance_edit_all'],
        permission_parent_finance_delete_all: selectedPermissions['permission_parent_finance_delete_all'],
        // parent of communication
        permission_parent_communication_view_all: selectedPermissions['permission_parent_communication_view_all'],
        permission_parent_communication_add_all: selectedPermissions['permission_parent_communication_add_all'],
        permission_parent_communication_edit_all: selectedPermissions['permission_parent_communication_edit_all'],
        permission_parent_communication_delete_all: selectedPermissions['permission_parent_communication_delete_all'],
        // parent of Our Services
        permission_parent_ourservices_view_all: selectedPermissions['permission_parent_ourservices_view_all'],
        permission_parent_ourservices_add_all: selectedPermissions['permission_parent_ourservices_add_all'],
        permission_parent_ourservices_edit_all: selectedPermissions['permission_parent_ourservices_edit_all'],
        permission_parent_ourservices_delete_all: selectedPermissions['permission_parent_ourservices_delete_all'],

        // parent of My Profile
        permission_parent_myprofile_view_all: selectedPermissions['permission_parent_myprofile_view_all'],
        permission_parent_myprofile_add_all: selectedPermissions['permission_parent_myprofile_add_all'],
        permission_parent_myprofile_edit_all: selectedPermissions['permission_parent_myprofile_edit_all'],
        permission_parent_myprofile_delete_all: selectedPermissions['permission_parent_myprofile_delete_all'],

        // parent of Account
        permission_parent_account_view_all: selectedPermissions['permission_parent_account_view_all'],
        permission_parent_account_add_all: selectedPermissions['permission_parent_account_add_all'],
        permission_parent_account_edit_all: selectedPermissions['permission_parent_account_edit_all'],
        permission_parent_account_delete_all: selectedPermissions['permission_parent_account_delete_all'],

        // parent of Transportation
        permission_parent_transportation_view_all: selectedPermissions['permission_parent_transportation_view_all'],
        permission_parent_transportation_add_all: selectedPermissions['permission_parent_transportation_add_all'],
        permission_parent_transportation_edit_all: selectedPermissions['permission_parent_transportation_edit_all'],
        permission_parent_transportation_delete_all: selectedPermissions['permission_parent_transportation_delete_all'],

        // view of school setup
        view_permission_academic_years: selectedPermissions['view_permission_academic_years'], // Start view - Setup Your School
        view_permission_blood_groups: selectedPermissions['view_permission_blood_groups'],
        view_permission_categories: selectedPermissions['view_permission_categories'],
        view_permission_classes: selectedPermissions['view_permission_classes'],
        view_permission_class_groups: selectedPermissions['view_permission_class_groups'],
        view_permission_custom_fields: selectedPermissions['view_permission_custom_fields'],
        view_permission_designations: selectedPermissions['view_permission_designations'],
        view_permission_departments: selectedPermissions['view_permission_departments'],
        view_permission_emergency_contacts: selectedPermissions['view_permission_emergency_contacts'],
        view_permission_holidays: selectedPermissions['view_permission_holidays'],
        view_permission_holiday_policies: selectedPermissions['view_permission_holiday_policies'],
        view_permission_houses: selectedPermissions['view_permission_houses'],
        view_permission_improve_presence_on_internet: selectedPermissions['view_permission_improve_presence_on_internet'],
        view_permission_religions: selectedPermissions['view_permission_religions'],
        view_permission_occupations: selectedPermissions['view_permission_occupations'],
        view_permission_schools: selectedPermissions['view_permission_schools'],
        view_permission_mail_settings: selectedPermissions['view_permission_mail_settings'],
        view_permission_school_settings: selectedPermissions['view_permission_school_settings'],
        view_permission_sms_settings: selectedPermissions['view_permission_sms_settings'],
        view_permission_social_shares: selectedPermissions['view_permission_social_shares'],
        view_permission_timezones: selectedPermissions['view_permission_timezones'],
        view_permission_permissions: selectedPermissions['view_permission_permissions'],
        view_permission_school_import: selectedPermissions['view_permission_school_import'], // End view - Setup Your School
      
        // Add of school setup
        add_permission_academic_years: selectedPermissions['add_permission_academic_years'], // Start add - Setup Your School
        add_permission_blood_groups: selectedPermissions['add_permission_blood_groups'],
        add_permission_categories: selectedPermissions['add_permission_categories'],
        add_permission_classes: selectedPermissions['add_permission_classes'],
        add_permission_class_groups: selectedPermissions['add_permission_class_groups'],
        add_permission_custom_fields: selectedPermissions['add_permission_custom_fields'],
        add_permission_designations: selectedPermissions['add_permission_designations'],
        add_permission_departments: selectedPermissions['add_permission_departments'],
        add_permission_emergency_contacts: selectedPermissions['add_permission_emergency_contacts'],
        add_permission_holidays: selectedPermissions['add_permission_holidays'],
        add_permission_holiday_policies: selectedPermissions['add_permission_holiday_policies'],
        add_permission_houses: selectedPermissions['add_permission_houses'],
        add_permission_improve_presence_on_internet: selectedPermissions['add_permission_improve_presence_on_internet'],
        add_permission_religions: selectedPermissions['add_permission_religions'],
        add_permission_occupations: selectedPermissions['add_permission_occupations'],
        add_permission_schools: selectedPermissions['add_permission_schools'],
        add_permission_mail_settings: selectedPermissions['add_permission_mail_settings'],
        add_permission_school_settings: selectedPermissions['add_permission_school_settings'],
        add_permission_sms_settings: selectedPermissions['add_permission_sms_settings'],
        add_permission_social_shares: selectedPermissions['add_permission_social_shares'],
        add_permission_timezones: selectedPermissions['add_permission_timezones'],
        add_permission_permissions: selectedPermissions['add_permission_permissions'],
        add_permission_school_import: selectedPermissions['add_permission_school_import'], // End add - Setup Your School

        // Edit of school setup
        edit_permission_academic_years: selectedPermissions['edit_permission_academic_years'], // Start edit - Setup Your School
        edit_permission_blood_groups: selectedPermissions['edit_permission_blood_groups'],
        edit_permission_categories: selectedPermissions['edit_permission_categories'],
        edit_permission_classes: selectedPermissions['edit_permission_classes'],
        edit_permission_class_groups: selectedPermissions['edit_permission_class_groups'],
        edit_permission_custom_fields: selectedPermissions['edit_permission_custom_fields'],
        edit_permission_designations: selectedPermissions['edit_permission_designations'],
        edit_permission_departments: selectedPermissions['edit_permission_departments'],
        edit_permission_emergency_contacts: selectedPermissions['edit_permission_emergency_contacts'],
        edit_permission_holidays: selectedPermissions['edit_permission_holidays'],
        edit_permission_holiday_policies: selectedPermissions['edit_permission_holiday_policies'],
        edit_permission_houses: selectedPermissions['edit_permission_houses'],
        edit_permission_improve_presence_on_internet: selectedPermissions['edit_permission_improve_presence_on_internet'],
        edit_permission_religions: selectedPermissions['edit_permission_religions'],
        edit_permission_occupations: selectedPermissions['edit_permission_occupations'],
        edit_permission_schools: selectedPermissions['edit_permission_schools'],
        edit_permission_mail_settings: selectedPermissions['edit_permission_mail_settings'],
        edit_permission_school_settings: selectedPermissions['edit_permission_school_settings'],
        edit_permission_sms_settings: selectedPermissions['edit_permission_sms_settings'],
        edit_permission_social_shares: selectedPermissions['edit_permission_social_shares'],
        edit_permission_timezones: selectedPermissions['edit_permission_timezones'],
        edit_permission_permissions: selectedPermissions['edit_permission_permissions'],
        edit_permission_school_import: selectedPermissions['edit_permission_school_import'], // End edit - Setup Your School

        // Delete of school setup
        delete_permission_academic_years: selectedPermissions['delete_permission_academic_years'], // Start delete - Setup Your School
        delete_permission_blood_groups: selectedPermissions['delete_permission_blood_groups'],
        delete_permission_categories: selectedPermissions['delete_permission_categories'],
        delete_permission_classes: selectedPermissions['delete_permission_classes'],
        delete_permission_class_groups: selectedPermissions['delete_permission_class_groups'],
        delete_permission_custom_fields: selectedPermissions['delete_permission_custom_fields'],
        delete_permission_designations: selectedPermissions['delete_permission_designations'],
        delete_permission_departments: selectedPermissions['delete_permission_departments'],
        delete_permission_emergency_contacts: selectedPermissions['delete_permission_emergency_contacts'],
        delete_permission_holidays: selectedPermissions['delete_permission_holidays'],
        delete_permission_holiday_policies: selectedPermissions['delete_permission_holiday_policies'],
        delete_permission_houses: selectedPermissions['delete_permission_houses'],
        delete_permission_improve_presence_on_internet: selectedPermissions['delete_permission_improve_presence_on_internet'],
        delete_permission_religions: selectedPermissions['delete_permission_religions'],
        delete_permission_occupations: selectedPermissions['delete_permission_occupations'],
        delete_permission_schools: selectedPermissions['delete_permission_schools'],
        delete_permission_mail_settings: selectedPermissions['delete_permission_mail_settings'],
        delete_permission_school_settings: selectedPermissions['delete_permission_school_settings'],
        delete_permission_sms_settings: selectedPermissions['delete_permission_sms_settings'],
        delete_permission_social_shares: selectedPermissions['delete_permission_social_shares'],
        delete_permission_timezones: selectedPermissions['delete_permission_timezones'],
        delete_permission_permissions: selectedPermissions['delete_permission_permissions'],
        delete_permission_school_import: selectedPermissions['delete_permission_school_import'], // End delete - Setup Your School

        // View of Administration
        view_permission_alumni: selectedPermissions['view_permission_alumni'], 
        view_permission_attendance_staff: selectedPermissions['view_permission_attendance_staff'], 
        view_permission_attendance_student: selectedPermissions['view_permission_attendance_student'], 
        view_permission_calendar: selectedPermissions['view_permission_calendar'], 
        view_permission_document: selectedPermissions['view_permission_document'], 
        view_permission_download: selectedPermissions['view_permission_download'], 
        view_permission_enquiry: selectedPermissions['view_permission_enquiry'], 
        view_permission_hostel: selectedPermissions['view_permission_hostel'], 
        view_permission_helpdesk: selectedPermissions['view_permission_helpdesk'], 
        view_permission_leave: selectedPermissions['view_permission_leave'],
        view_permission_library: selectedPermissions['view_permission_library'],
        view_permission_post_jobs: selectedPermissions['view_permission_post_jobs'],
        view_permission_staffs: selectedPermissions['view_permission_staffs'],
        view_permission_student: selectedPermissions['view_permission_student'],
        view_permission_summary: selectedPermissions['view_permission_summary'],
        view_permission_survey: selectedPermissions['view_permission_survey'],
        view_permission_team: selectedPermissions['view_permission_team'],
        view_permission_exam: selectedPermissions['view_permission_exam'],
        view_permission_transport: selectedPermissions['view_permission_transport'], // End view - Administration

        // Add of Administration
        add_permission_alumni: selectedPermissions['add_permission_alumni'], // Start add - Administration
        add_permission_attendance_staff: selectedPermissions['add_permission_attendance_staff'],
        add_permission_attendance_student: selectedPermissions['add_permission_attendance_student'],
        add_permission_calendar: selectedPermissions['add_permission_calendar'],
        add_permission_document: selectedPermissions['add_permission_document'],
        add_permission_download: selectedPermissions['add_permission_download'],
        add_permission_enquiry: selectedPermissions['add_permission_enquiry'],
        add_permission_hostel: selectedPermissions['add_permission_hostel'],
        add_permission_helpdesk: selectedPermissions['add_permission_helpdesk'],
        add_permission_leave: selectedPermissions['add_permission_leave'],
        add_permission_library: selectedPermissions['add_permission_library'],
        add_permission_post_jobs: selectedPermissions['add_permission_post_jobs'],
        add_permission_staffs: selectedPermissions['add_permission_staffs'],
        add_permission_student: selectedPermissions['add_permission_student'],
        add_permission_summary: selectedPermissions['add_permission_summary'],
        add_permission_survey: selectedPermissions['add_permission_survey'],
        add_permission_team: selectedPermissions['add_permission_team'],
        add_permission_exam: selectedPermissions['add_permission_exam'],
        add_permission_transport: selectedPermissions['add_permission_transport'], // End add - Administration

        // Edit of Administration
        edit_permission_alumni: selectedPermissions['edit_permission_alumni'], // Start edit - Administration
        edit_permission_attendance_staff: selectedPermissions['edit_permission_attendance_staff'],
        edit_permission_attendance_student: selectedPermissions['edit_permission_attendance_student'],
        edit_permission_calendar: selectedPermissions['edit_permission_calendar'],
        edit_permission_document: selectedPermissions['edit_permission_document'],
        edit_permission_download: selectedPermissions['edit_permission_download'],
        edit_permission_enquiry: selectedPermissions['edit_permission_enquiry'],
        edit_permission_hostel: selectedPermissions['edit_permission_hostel'],
        edit_permission_helpdesk: selectedPermissions['edit_permission_helpdesk'],
        edit_permission_leave: selectedPermissions['edit_permission_leave'],
        edit_permission_library: selectedPermissions['edit_permission_library'],
        edit_permission_post_jobs: selectedPermissions['edit_permission_post_jobs'],
        edit_permission_staffs: selectedPermissions['edit_permission_staffs'],
        edit_permission_student: selectedPermissions['edit_permission_student'],
        edit_permission_summary: selectedPermissions['edit_permission_summary'],
        edit_permission_survey: selectedPermissions['edit_permission_survey'],
        edit_permission_team: selectedPermissions['edit_permission_team'],
        edit_permission_exam: selectedPermissions['edit_permission_exam'],
        edit_permission_transport: selectedPermissions['edit_permission_transport'], // End edit - Administration

        // Delete of Administration
        delete_permission_alumni: selectedPermissions['delete_permission_alumni'], // Start delete - Administration
        delete_permission_attendance_staff: selectedPermissions['delete_permission_attendance_staff'],
        delete_permission_attendance_student: selectedPermissions['delete_permission_attendance_student'],
        delete_permission_calendar: selectedPermissions['delete_permission_calendar'],
        delete_permission_document: selectedPermissions['delete_permission_document'],
        delete_permission_download: selectedPermissions['delete_permission_download'],
        delete_permission_enquiry: selectedPermissions['delete_permission_enquiry'],
        delete_permission_hostel: selectedPermissions['delete_permission_hostel'],
        delete_permission_helpdesk: selectedPermissions['delete_permission_helpdesk'],
        delete_permission_leave: selectedPermissions['delete_permission_leave'],
        delete_permission_library: selectedPermissions['delete_permission_library'],
        delete_permission_post_jobs: selectedPermissions['delete_permission_post_jobs'],
        delete_permission_staffs: selectedPermissions['delete_permission_staffs'],
        delete_permission_student: selectedPermissions['delete_permission_student'],
        delete_permission_summary: selectedPermissions['delete_permission_summary'],
        delete_permission_survey: selectedPermissions['delete_permission_survey'],
        delete_permission_team: selectedPermissions['delete_permission_team'],
        delete_permission_exam: selectedPermissions['delete_permission_exam'],
        delete_permission_transport: selectedPermissions['delete_permission_transport'], // End delete - Administration

        // View of Academics Academic Grade
        view_permission_academic: selectedPermissions['view_permission_academic'], // Start view - Academics
        view_permission_academic_grade: selectedPermissions['view_permission_academic_grade'],
        view_permission_academic_content: selectedPermissions['view_permission_academic_content'],
        view_permission_academic_syllabus: selectedPermissions['view_permission_academic_syllabus'],
        view_permission_assessment: selectedPermissions['view_permission_assessment'],
        view_permission_classwork: selectedPermissions['view_permission_classwork'],
        view_permission_homework: selectedPermissions['view_permission_homework'],
        view_permission_lesson_plan: selectedPermissions['view_permission_lesson_plan'],
        view_permission_online_class: selectedPermissions['view_permission_online_class'],
        view_permission_online_exam: selectedPermissions['view_permission_online_exam'],
        view_permission_certificate: selectedPermissions['view_permission_certificate'],
        view_permission_time_table: selectedPermissions['view_permission_time_table'], // End view - Academics

        // Add of Academics
        add_permission_academic: selectedPermissions['add_permission_academic'], // Start add - Academics
        add_permission_academic_grade: selectedPermissions['add_permission_academic_grade'],
        add_permission_academic_content: selectedPermissions['add_permission_academic_content'],
        add_permission_academic_syllabus: selectedPermissions['add_permission_academic_syllabus'],
        add_permission_assessment: selectedPermissions['add_permission_assessment'],
        add_permission_classwork: selectedPermissions['add_permission_classwork'],
        add_permission_homework: selectedPermissions['add_permission_homework'],
        add_permission_lesson_plan: selectedPermissions['add_permission_lesson_plan'],
        add_permission_online_class: selectedPermissions['add_permission_online_class'],
        add_permission_online_exam: selectedPermissions['add_permission_online_exam'],
        add_permission_certificate: selectedPermissions['add_permission_certificate'],
        add_permission_time_table: selectedPermissions['add_permission_time_table'], // End add - Academics

        // Edit of Academics
        edit_permission_academic: selectedPermissions['edit_permission_academic'], // Start edit - Academics
        edit_permission_academic_grade: selectedPermissions['edit_permission_academic_grade'],
        edit_permission_academic_content: selectedPermissions['edit_permission_academic_content'],
        edit_permission_academic_syllabus: selectedPermissions['edit_permission_academic_syllabus'],
        edit_permission_assessment: selectedPermissions['edit_permission_assessment'],
        edit_permission_classwork: selectedPermissions['edit_permission_classwork'],
        edit_permission_homework: selectedPermissions['edit_permission_homework'],
        edit_permission_lesson_plan: selectedPermissions['edit_permission_lesson_plan'],
        edit_permission_online_class: selectedPermissions['edit_permission_online_class'],
        edit_permission_online_exam: selectedPermissions['edit_permission_online_exam'],
        edit_permission_certificate: selectedPermissions['edit_permission_certificate'],
        edit_permission_time_table: selectedPermissions['edit_permission_time_table'], // End edit - Academics

        // Delete of Academics
        delete_permission_academic: selectedPermissions['delete_permission_academic'], // Start delete - Academics
        delete_permission_academic_grade: selectedPermissions['delete_permission_academic_grade'],
        delete_permission_academic_content: selectedPermissions['delete_permission_academic_content'],
        delete_permission_academic_syllabus: selectedPermissions['delete_permission_academic_syllabus'],
        delete_permission_assessment: selectedPermissions['delete_permission_assessment'],
        delete_permission_classwork: selectedPermissions['delete_permission_classwork'],
        delete_permission_homework: selectedPermissions['delete_permission_homework'],
        delete_permission_lesson_plan: selectedPermissions['delete_permission_lesson_plan'],
        delete_permission_online_class: selectedPermissions['delete_permission_online_class'],
        delete_permission_online_exam: selectedPermissions['delete_permission_online_exam'],
        delete_permission_certificate: selectedPermissions['delete_permission_certificate'],
        delete_permission_time_table: selectedPermissions['delete_permission_time_table'], // End delete - Academics

        // view of Financial
        view_permission_admission: selectedPermissions['view_permission_admission'], // Start view - Financial
        view_permission_fees: selectedPermissions['view_permission_fees'],
        view_permission_accounts: selectedPermissions['view_permission_accounts'],
        view_permission_salary: selectedPermissions['view_permission_salary'], // End view - Financial

        // Add of Financial
        add_permission_admission: selectedPermissions['add_permission_admission'], // Start add - Financial
        add_permission_fees: selectedPermissions['add_permission_fees'],
        add_permission_accounts: selectedPermissions['add_permission_accounts'],
        add_permission_salary: selectedPermissions['add_permission_salary'], // End add - Financial

        // Edit of Financial
        edit_permission_admission: selectedPermissions['edit_permission_admission'], // Start edit - Financial
        edit_permission_fees: selectedPermissions['edit_permission_fees'],
        edit_permission_accounts: selectedPermissions['edit_permission_accounts'],
        edit_permission_salary: selectedPermissions['edit_permission_salary'], // End edit - Financial

        // Delete of Financial
        delete_permission_admission: selectedPermissions['delete_permission_admission'], // Start delete - Financial
        delete_permission_fees: selectedPermissions['delete_permission_fees'],
        delete_permission_accounts: selectedPermissions['delete_permission_accounts'],
        delete_permission_salary: selectedPermissions['delete_permission_salary'], // End delete - Financial

        // View of Communication
        view_permission_event: selectedPermissions['view_permission_event'], // Start view - Communication
        view_permission_message: selectedPermissions['view_permission_message'],
        view_permission_news: selectedPermissions['view_permission_news'],
        view_permission_notice: selectedPermissions['view_permission_notice'],
        view_permission_broadcast: selectedPermissions['view_permission_broadcast'],
        view_permission_birthday: selectedPermissions['view_permission_birthday'], // End view - Communication

        // Add of Communication
        add_permission_event: selectedPermissions['add_permission_event'], // Start add - Communication
        add_permission_message: selectedPermissions['add_permission_message'],
        add_permission_news: selectedPermissions['add_permission_news'],
        add_permission_notice: selectedPermissions['add_permission_notice'],
        add_permission_broadcast: selectedPermissions['add_permission_broadcast'],
        add_permission_birthday: selectedPermissions['add_permission_birthday'], // End add - Communication

        // Edit of Communication
        edit_permission_event: selectedPermissions['edit_permission_event'], // Start edit - Communication
        edit_permission_message: selectedPermissions['edit_permission_message'],
        edit_permission_news: selectedPermissions['edit_permission_news'],
        edit_permission_notice: selectedPermissions['edit_permission_notice'],
        edit_permission_broadcast: selectedPermissions['edit_permission_broadcast'],
        edit_permission_birthday: selectedPermissions['edit_permission_birthday'], // End edit - Communication

        // Delete of Communication
        delete_permission_event: selectedPermissions['delete_permission_event'], // Start delete - Communication
        delete_permission_message: selectedPermissions['delete_permission_message'],
        delete_permission_news: selectedPermissions['delete_permission_news'],
        delete_permission_notice: selectedPermissions['delete_permission_notice'],
        delete_permission_broadcast: selectedPermissions['delete_permission_broadcast'],
        delete_permission_birthday: selectedPermissions['delete_permission_birthday'], // End delete - Communication

        // View of Our Services
        view_permission_buy_sms: selectedPermissions['view_permission_buy_sms'], // Start view - our services
        view_permission_support_tickets: selectedPermissions['view_permission_support_tickets'],
        view_permission_billing: selectedPermissions['view_permission_billing'],
        view_permission_buy_services: selectedPermissions['view_permission_buy_services'],// End view - our services

        // Add of Our Services
        add_permission_buy_sms: selectedPermissions['add_permission_buy_sms'], // Start add - our services
        add_permission_support_tickets: selectedPermissions['add_permission_support_tickets'],
        add_permission_billing: selectedPermissions['add_permission_billing'],
        add_permission_buy_services: selectedPermissions['add_permission_buy_services'],// End add - our services

        // Edit of Our Services
        edit_permission_buy_sms: selectedPermissions['edit_permission_buy_sms'], // Start edit - our services
        edit_permission_support_tickets: selectedPermissions['edit_permission_support_tickets'],
        edit_permission_billing: selectedPermissions['edit_permission_billing'],
        edit_permission_buy_services: selectedPermissions['edit_permission_buy_services'],// End edit - our services

        // Delete of Our Services
        delete_permission_buy_sms: selectedPermissions['delete_permission_buy_sms'], // Start delete - our services
        delete_permission_support_tickets: selectedPermissions['delete_permission_support_tickets'],
        delete_permission_billing: selectedPermissions['delete_permission_billing'],
        delete_permission_buy_services: selectedPermissions['delete_permission_buy_services'],// End delete - our services

        // View of My Profile
        view_permission_pay_slip: selectedPermissions['view_permission_pay_slip'], // Start view - My Profile
        view_permission_attendance: selectedPermissions['view_permission_attendance'],
        view_permission_manage_leave: selectedPermissions['view_permission_manage_leave'],
        view_permission_manage_your_profile: selectedPermissions['view_permission_manage_your_profile'],
        view_permission_transport_details: selectedPermissions['view_permission_transport_details'],
        view_permission_extra_duty: selectedPermissions['view_permission_extra_duty'], // End view - My Profile

        // Add of My Profile
        add_permission_pay_slip: selectedPermissions['add_permission_pay_slip'], // Start Add - My Profile
        add_permission_attendance: selectedPermissions['add_permission_attendance'],
        add_permission_manage_leave: selectedPermissions['add_permission_manage_leave'],
        add_permission_manage_your_profile: selectedPermissions['add_permission_manage_your_profile'],
        add_permission_transport_details: selectedPermissions['add_permission_transport_details'],
        add_permission_extra_duty: selectedPermissions['add_permission_extra_duty'], // End Add - My Profile

        // Edit of My Profile
        edit_permission_pay_slip: selectedPermissions['edit_permission_pay_slip'], // Start Edit - My Profile
        edit_permission_attendance: selectedPermissions['edit_permission_attendance'],
        edit_permission_manage_leave: selectedPermissions['edit_permission_manage_leave'],
        edit_permission_manage_your_profile: selectedPermissions['edit_permission_manage_your_profile'],
        edit_permission_transport_details: selectedPermissions['edit_permission_transport_details'],
        edit_permission_extra_duty: selectedPermissions['edit_permission_extra_duty'], // End Edit - My Profile

        // Delete of My Profile
        delete_permission_pay_slip: selectedPermissions['delete_permission_pay_slip'], // Start Delete - My Profile
        delete_permission_attendance: selectedPermissions['delete_permission_attendance'],
        delete_permission_manage_leave: selectedPermissions['delete_permission_manage_leave'],
        delete_permission_manage_your_profile: selectedPermissions['delete_permission_manage_your_profile'],
        delete_permission_transport_details: selectedPermissions['delete_permission_transport_details'],
        delete_permission_extra_duty: selectedPermissions['delete_permission_extra_duty'], // End Delete - My Profile

        // View of Account
        view_permission_account_group: selectedPermissions['view_permission_account_group'], // Start view - Account
        view_permission_voucher_type: selectedPermissions['view_permission_voucher_type'],
        view_permission_stock_group: selectedPermissions['view_permission_stock_group'],
        view_permission_sale_group: selectedPermissions['view_permission_sale_group'],
        view_permission_ledger: selectedPermissions['view_permission_ledger'],
        view_permission_transaction: selectedPermissions['view_permission_transaction'],
        view_permission_inventory_allocation: selectedPermissions['view_permission_inventory_allocation'],
        view_permission_asset_allocation: selectedPermissions['view_permission_asset_allocation'],
        view_permission_account_setting: selectedPermissions['view_permission_account_setting'],
        view_permission_product: selectedPermissions['view_permission_product'],
        view_permission_sale: selectedPermissions['view_permission_sale'],
        view_permission_vendor: selectedPermissions['view_permission_vendor'],
        view_permission_infra_level: selectedPermissions['view_permission_infra_level'],
        view_permission_account_import_export: selectedPermissions['view_permission_account_import_export'],
        view_permission_account_company: selectedPermissions['view_permission_account_company'], // End view - Account

        // Add of Account
        add_permission_account_group: selectedPermissions['add_permission_account_group'], // Start Add - Account
        add_permission_voucher_type: selectedPermissions['add_permission_voucher_type'],
        add_permission_stock_group: selectedPermissions['add_permission_stock_group'],
        add_permission_sale_group: selectedPermissions['add_permission_sale_group'],
        add_permission_ledger: selectedPermissions['add_permission_ledger'],
        add_permission_transaction: selectedPermissions['add_permission_transaction'],
        add_permission_inventory_allocation: selectedPermissions['add_permission_inventory_allocation'],
        add_permission_asset_allocation: selectedPermissions['add_permission_asset_allocation'],
        add_permission_account_setting: selectedPermissions['add_permission_account_setting'],
        add_permission_product: selectedPermissions['add_permission_product'],
        add_permission_sale: selectedPermissions['add_permission_sale'],
        add_permission_vendor: selectedPermissions['add_permission_vendor'],
        add_permission_infra_level: selectedPermissions['add_permission_infra_level'],
        add_permission_account_import_export: selectedPermissions['add_permission_account_import_export'],
        add_permission_account_company: selectedPermissions['add_permission_account_company'], // End Add - Account

        // Edit of Account
        edit_permission_account_group: selectedPermissions['edit_permission_account_group'], // Start Edit - Account
        edit_permission_voucher_type: selectedPermissions['edit_permission_voucher_type'],
        edit_permission_stock_group: selectedPermissions['edit_permission_stock_group'],
        edit_permission_sale_group: selectedPermissions['edit_permission_sale_group'],
        edit_permission_ledger: selectedPermissions['edit_permission_ledger'],
        edit_permission_transaction: selectedPermissions['edit_permission_transaction'],
        edit_permission_inventory_allocation: selectedPermissions['edit_permission_inventory_allocation'],
        edit_permission_asset_allocation: selectedPermissions['edit_permission_asset_allocation'],
        edit_permission_account_setting: selectedPermissions['edit_permission_account_setting'],
        edit_permission_product: selectedPermissions['edit_permission_product'],
        edit_permission_sale: selectedPermissions['edit_permission_sale'],
        edit_permission_vendor: selectedPermissions['edit_permission_vendor'],
        edit_permission_infra_level: selectedPermissions['edit_permission_infra_level'],
        edit_permission_account_import_export: selectedPermissions['edit_permission_account_import_export'],
        edit_permission_account_company: selectedPermissions['edit_permission_account_company'], // End Edit - Account

        // Delete of Account
        delete_permission_account_group: selectedPermissions['delete_permission_account_group'], // Start Delete - Account
        delete_permission_voucher_type: selectedPermissions['delete_permission_voucher_type'],
        delete_permission_stock_group: selectedPermissions['delete_permission_stock_group'],
        delete_permission_sale_group: selectedPermissions['delete_permission_sale_group'],
        delete_permission_ledger: selectedPermissions['delete_permission_ledger'],
        delete_permission_transaction: selectedPermissions['delete_permission_transaction'],
        delete_permission_inventory_allocation: selectedPermissions['delete_permission_inventory_allocation'],
        delete_permission_asset_allocation: selectedPermissions['delete_permission_asset_allocation'],
        delete_permission_account_setting: selectedPermissions['delete_permission_account_setting'],
        delete_permission_product: selectedPermissions['delete_permission_product'],
        delete_permission_sale: selectedPermissions['delete_permission_sale'],
        delete_permission_vendor: selectedPermissions['delete_permission_vendor'],
        delete_permission_infra_level: selectedPermissions['delete_permission_infra_level'],
        delete_permission_account_import_export: selectedPermissions['delete_permission_account_import_export'],
        delete_permission_account_company: selectedPermissions['delete_permission_account_company'], // End Delete - Account

        // View of Transportation
        view_permission_transport: selectedPermissions['view_permission_transport'], // Start view - Transportation
        view_permission_area: selectedPermissions['view_permission_area'],
        view_permission_vehicle: selectedPermissions['view_permission_vehicle'],
        view_permission_vehicle_staffs: selectedPermissions['view_permission_vehicle_staffs'],
        view_permission_transport_allocation: selectedPermissions['view_permission_transport_allocation'],
        view_permission_transport_settings: selectedPermissions['view_permission_transport_settings'], 
        view_permission_transport_routes: selectedPermissions['view_permission_transport_routes'], 
        view_permission_transport_stoppages: selectedPermissions['view_permission_transport_stoppages'], // End view - Transportation

        // Add of Transportation
        add_permission_transport: selectedPermissions['add_permission_transport'], // Start add - Transportation
        add_permission_area: selectedPermissions['add_permission_area'],
        add_permission_vehicle: selectedPermissions['add_permission_vehicle'],
        add_permission_vehicle_staffs: selectedPermissions['add_permission_vehicle_staffs'],
        add_permission_transport_allocation: selectedPermissions['add_permission_transport_allocation'],
        add_permission_transport_settings: selectedPermissions['add_permission_transport_settings'], 
        add_permission_transport_routes: selectedPermissions['add_permission_transport_routes'], 
        add_permission_transport_stoppages: selectedPermissions['add_permission_transport_stoppages'], // End add - Transportation

        // Edit of Transportation
        edit_permission_transport: selectedPermissions['edit_permission_transport'], // Start edit - Transportation
        edit_permission_area: selectedPermissions['edit_permission_area'],
        edit_permission_vehicle: selectedPermissions['edit_permission_vehicle'],
        edit_permission_vehicle_staffs: selectedPermissions['edit_permission_vehicle_staffs'],
        edit_permission_transport_allocation: selectedPermissions['edit_permission_transport_allocation'],
        edit_permission_transport_settings: selectedPermissions['edit_permission_transport_settings'], 
        edit_permission_transport_routes: selectedPermissions['edit_permission_transport_routes'], 
        edit_permission_transport_stoppages: selectedPermissions['edit_permission_transport_stoppages'], // End edit - Transportation

        // Delete of Transportation
        delete_permission_transport: selectedPermissions['delete_permission_transport'], // Start delete - Transportation
        delete_permission_area: selectedPermissions['delete_permission_area'],
        delete_permission_vehicle: selectedPermissions['delete_permission_vehicle'],
        delete_permission_vehicle_staffs: selectedPermissions['delete_permission_vehicle_staffs'],
        delete_permission_transport_allocation: selectedPermissions['delete_permission_transport_allocation'],
        delete_permission_transport_settings: selectedPermissions['delete_permission_transport_settings'], 
        delete_permission_transport_routes: selectedPermissions['delete_permission_transport_routes'], 
        delete_permission_transport_stoppages: selectedPermissions['delete_permission_transport_stoppages'], // End delete - Transportation
    
    });

    useEffect(() => {
        let newFormData;
        newFormData = {
            ...data,
        //parent of school
        permission_parent_school_view_all: selectedPermissions['permission_parent_school_view_all'],
        permission_parent_school_add_all: selectedPermissions['permission_parent_school_add_all'],
        permission_parent_school_edit_all: selectedPermissions['permission_parent_school_edit_all'],
        permission_parent_school_delete_all: selectedPermissions['permission_parent_school_delete_all'],
        // parent of Administration
        permission_parent_administration_view_all: selectedPermissions['permission_parent_administration_view_all'],
        permission_parent_administration_add_all: selectedPermissions['permission_parent_administration_add_all'],
        permission_parent_administration_edit_all: selectedPermissions['permission_parent_administration_edit_all'],
        permission_parent_administration_delete_all: selectedPermissions['permission_parent_administration_delete_all'],
        // parent of Academics
        permission_parent_academics_view_all: selectedPermissions['permission_parent_academics_view_all'],
        permission_parent_academics_add_all: selectedPermissions['permission_parent_academics_add_all'],
        permission_parent_academics_edit_all: selectedPermissions['permission_parent_academics_edit_all'],
        permission_parent_academics_delete_all: selectedPermissions['permission_parent_academics_delete_all'],
        // parent of Finance
        permission_parent_finance_view_all: selectedPermissions['permission_parent_finance_view_all'],
        permission_parent_finance_add_all: selectedPermissions['permission_parent_finance_add_all'],
        permission_parent_finance_edit_all: selectedPermissions['permission_parent_finance_edit_all'],
        permission_parent_finance_delete_all: selectedPermissions['permission_parent_finance_delete_all'],
        // parent of communication
        permission_parent_communication_view_all: selectedPermissions['permission_parent_communication_view_all'],
        permission_parent_communication_add_all: selectedPermissions['permission_parent_communication_add_all'],
        permission_parent_communication_edit_all: selectedPermissions['permission_parent_communication_edit_all'],
        permission_parent_communication_delete_all: selectedPermissions['permission_parent_communication_delete_all'],
        // parent of Our Services
        permission_parent_ourservices_view_all: selectedPermissions['permission_parent_ourservices_view_all'],
        permission_parent_ourservices_add_all: selectedPermissions['permission_parent_ourservices_add_all'],
        permission_parent_ourservices_edit_all: selectedPermissions['permission_parent_ourservices_edit_all'],
        permission_parent_ourservices_delete_all: selectedPermissions['permission_parent_ourservices_delete_all'],

        // parent of My Profile
        permission_parent_myprofile_view_all: selectedPermissions['permission_parent_myprofile_view_all'],
        permission_parent_myprofile_add_all: selectedPermissions['permission_parent_myprofile_add_all'],
        permission_parent_myprofile_edit_all: selectedPermissions['permission_parent_myprofile_edit_all'],
        permission_parent_myprofile_delete_all: selectedPermissions['permission_parent_myprofile_delete_all'],

        // parent of Account
        permission_parent_account_view_all: selectedPermissions['permission_parent_account_view_all'],
        permission_parent_account_add_all: selectedPermissions['permission_parent_account_add_all'],
        permission_parent_account_edit_all: selectedPermissions['permission_parent_account_edit_all'],
        permission_parent_account_delete_all: selectedPermissions['permission_parent_account_delete_all'],

        // parent of Transportation
        permission_parent_transportation_view_all: selectedPermissions['permission_parent_transportation_view_all'],
        permission_parent_transportation_add_all: selectedPermissions['permission_parent_transportation_add_all'],
        permission_parent_transportation_edit_all: selectedPermissions['permission_parent_transportation_edit_all'],
        permission_parent_transportation_delete_all: selectedPermissions['permission_parent_transportation_delete_all'],

        // view of school setup
        view_permission_academic_years: selectedPermissions['view_permission_academic_years'], // Start view - Setup Your School
        view_permission_blood_groups: selectedPermissions['view_permission_blood_groups'],
        view_permission_categories: selectedPermissions['view_permission_categories'],
        view_permission_classes: selectedPermissions['view_permission_classes'],
        view_permission_class_groups: selectedPermissions['view_permission_class_groups'],
        view_permission_custom_fields: selectedPermissions['view_permission_custom_fields'],
        view_permission_designations: selectedPermissions['view_permission_designations'],
        view_permission_departments: selectedPermissions['view_permission_departments'],
        view_permission_emergency_contacts: selectedPermissions['view_permission_emergency_contacts'],
        view_permission_holidays: selectedPermissions['view_permission_holidays'],
        view_permission_holiday_policies: selectedPermissions['view_permission_holiday_policies'],
        view_permission_houses: selectedPermissions['view_permission_houses'],
        view_permission_improve_presence_on_internet: selectedPermissions['view_permission_improve_presence_on_internet'],
        view_permission_religions: selectedPermissions['view_permission_religions'],
        view_permission_occupations: selectedPermissions['view_permission_occupations'],
        view_permission_schools: selectedPermissions['view_permission_schools'],
        view_permission_mail_settings: selectedPermissions['view_permission_mail_settings'],
        view_permission_school_settings: selectedPermissions['view_permission_school_settings'],
        view_permission_sms_settings: selectedPermissions['view_permission_sms_settings'],
        view_permission_social_shares: selectedPermissions['view_permission_social_shares'],
        view_permission_timezones: selectedPermissions['view_permission_timezones'],
        view_permission_permissions: selectedPermissions['view_permission_permissions'],
        view_permission_school_import: selectedPermissions['view_permission_school_import'], // End view - Setup Your School
            // Add of school setup
        add_permission_academic_years: selectedPermissions['add_permission_academic_years'], // Start add - Setup Your School
        add_permission_blood_groups: selectedPermissions['add_permission_blood_groups'],
        add_permission_categories: selectedPermissions['add_permission_categories'],
        add_permission_classes: selectedPermissions['add_permission_classes'],
        add_permission_class_groups: selectedPermissions['add_permission_class_groups'],
        add_permission_custom_fields: selectedPermissions['add_permission_custom_fields'],
        add_permission_designations: selectedPermissions['add_permission_designations'],
        add_permission_departments: selectedPermissions['add_permission_departments'],
        add_permission_emergency_contacts: selectedPermissions['add_permission_emergency_contacts'],
        add_permission_holidays: selectedPermissions['add_permission_holidays'],
        add_permission_holiday_policies: selectedPermissions['add_permission_holiday_policies'],
        add_permission_houses: selectedPermissions['add_permission_houses'],
        add_permission_improve_presence_on_internet: selectedPermissions['add_permission_improve_presence_on_internet'],
        add_permission_religions: selectedPermissions['add_permission_religions'],
        add_permission_occupations: selectedPermissions['add_permission_occupations'],
        add_permission_schools: selectedPermissions['add_permission_schools'],
        add_permission_mail_settings: selectedPermissions['add_permission_mail_settings'],
        add_permission_school_settings: selectedPermissions['add_permission_school_settings'],
        add_permission_sms_settings: selectedPermissions['add_permission_sms_settings'],
        add_permission_social_shares: selectedPermissions['add_permission_social_shares'],
        add_permission_timezones: selectedPermissions['add_permission_timezones'],
        add_permission_permissions: selectedPermissions['add_permission_permissions'],
        add_permission_school_import: selectedPermissions['add_permission_school_import'], // End add - Setup Your School

        // Edit of school setup
        edit_permission_academic_years: selectedPermissions['edit_permission_academic_years'], // Start edit - Setup Your School
        edit_permission_blood_groups: selectedPermissions['edit_permission_blood_groups'],
        edit_permission_categories: selectedPermissions['edit_permission_categories'],
        edit_permission_classes: selectedPermissions['edit_permission_classes'],
        edit_permission_class_groups: selectedPermissions['edit_permission_class_groups'],
        edit_permission_custom_fields: selectedPermissions['edit_permission_custom_fields'],
        edit_permission_designations: selectedPermissions['edit_permission_designations'],
        edit_permission_departments: selectedPermissions['edit_permission_departments'],
        edit_permission_emergency_contacts: selectedPermissions['edit_permission_emergency_contacts'],
        edit_permission_holidays: selectedPermissions['edit_permission_holidays'],
        edit_permission_holiday_policies: selectedPermissions['edit_permission_holiday_policies'],
        edit_permission_houses: selectedPermissions['edit_permission_houses'],
        edit_permission_improve_presence_on_internet: selectedPermissions['edit_permission_improve_presence_on_internet'],
        edit_permission_religions: selectedPermissions['edit_permission_religions'],
        edit_permission_occupations: selectedPermissions['edit_permission_occupations'],
        edit_permission_schools: selectedPermissions['edit_permission_schools'],
        edit_permission_mail_settings: selectedPermissions['edit_permission_mail_settings'],
        edit_permission_school_settings: selectedPermissions['edit_permission_school_settings'],
        edit_permission_sms_settings: selectedPermissions['edit_permission_sms_settings'],
        edit_permission_social_shares: selectedPermissions['edit_permission_social_shares'],
        edit_permission_timezones: selectedPermissions['edit_permission_timezones'],
        edit_permission_permissions: selectedPermissions['edit_permission_permissions'],
        edit_permission_school_import: selectedPermissions['edit_permission_school_import'], // End edit - Setup Your School

        // Delete of school setup
        delete_permission_academic_years: selectedPermissions['delete_permission_academic_years'], // Start delete - Setup Your School
        delete_permission_blood_groups: selectedPermissions['delete_permission_blood_groups'],
        delete_permission_categories: selectedPermissions['delete_permission_categories'],
        delete_permission_classes: selectedPermissions['delete_permission_classes'],
        delete_permission_class_groups: selectedPermissions['delete_permission_class_groups'],
        delete_permission_custom_fields: selectedPermissions['delete_permission_custom_fields'],
        delete_permission_designations: selectedPermissions['delete_permission_designations'],
        delete_permission_departments: selectedPermissions['delete_permission_departments'],
        delete_permission_emergency_contacts: selectedPermissions['delete_permission_emergency_contacts'],
        delete_permission_holidays: selectedPermissions['delete_permission_holidays'],
        delete_permission_holiday_policies: selectedPermissions['delete_permission_holiday_policies'],
        delete_permission_houses: selectedPermissions['delete_permission_houses'],
        delete_permission_improve_presence_on_internet: selectedPermissions['delete_permission_improve_presence_on_internet'],
        delete_permission_religions: selectedPermissions['delete_permission_religions'],
        delete_permission_occupations: selectedPermissions['delete_permission_occupations'],
        delete_permission_schools: selectedPermissions['delete_permission_schools'],
        delete_permission_mail_settings: selectedPermissions['delete_permission_mail_settings'],
        delete_permission_school_settings: selectedPermissions['delete_permission_school_settings'],
        delete_permission_sms_settings: selectedPermissions['delete_permission_sms_settings'],
        delete_permission_social_shares: selectedPermissions['delete_permission_social_shares'],
        delete_permission_timezones: selectedPermissions['delete_permission_timezones'],
        delete_permission_permissions: selectedPermissions['delete_permission_permissions'],
        delete_permission_school_import: selectedPermissions['delete_permission_school_import'], // End delete - Setup Your School
        
        // View of Administration
        view_permission_alumni: selectedPermissions['view_permission_alumni'], 
        view_permission_attendance_staff: selectedPermissions['view_permission_attendance_staff'], 
        view_permission_attendance_student: selectedPermissions['view_permission_attendance_student'], 
        view_permission_calendar: selectedPermissions['view_permission_calendar'], 
        view_permission_document: selectedPermissions['view_permission_document'], 
        view_permission_download: selectedPermissions['view_permission_download'], 
        view_permission_enquiry: selectedPermissions['view_permission_enquiry'], 
        view_permission_hostel: selectedPermissions['view_permission_hostel'], 
        view_permission_helpdesk: selectedPermissions['view_permission_helpdesk'], 
        view_permission_leave: selectedPermissions['view_permission_leave'],
        view_permission_library: selectedPermissions['view_permission_library'],
        view_permission_post_jobs: selectedPermissions['view_permission_post_jobs'],
        view_permission_staffs: selectedPermissions['view_permission_staffs'],
        view_permission_student: selectedPermissions['view_permission_student'],
        view_permission_summary: selectedPermissions['view_permission_summary'],
        view_permission_survey: selectedPermissions['view_permission_survey'],
        view_permission_team: selectedPermissions['view_permission_team'],
        view_permission_exam: selectedPermissions['view_permission_exam'],
        view_permission_transport: selectedPermissions['view_permission_transport'], // End view - Administration

        // Add of Administration
        add_permission_alumni: selectedPermissions['add_permission_alumni'], // Start add - Administration
        add_permission_attendance_staff: selectedPermissions['add_permission_attendance_staff'],
        add_permission_attendance_student: selectedPermissions['add_permission_attendance_student'],
        add_permission_calendar: selectedPermissions['add_permission_calendar'],
        add_permission_document: selectedPermissions['add_permission_document'],
        add_permission_download: selectedPermissions['add_permission_download'],
        add_permission_enquiry: selectedPermissions['add_permission_enquiry'],
        add_permission_hostel: selectedPermissions['add_permission_hostel'],
        add_permission_helpdesk: selectedPermissions['add_permission_helpdesk'],
        add_permission_leave: selectedPermissions['add_permission_leave'],
        add_permission_library: selectedPermissions['add_permission_library'],
        add_permission_post_jobs: selectedPermissions['add_permission_post_jobs'],
        add_permission_staffs: selectedPermissions['add_permission_staffs'],
        add_permission_student: selectedPermissions['add_permission_student'],
        add_permission_summary: selectedPermissions['add_permission_summary'],
        add_permission_survey: selectedPermissions['add_permission_survey'],
        add_permission_team: selectedPermissions['add_permission_team'],
        add_permission_exam: selectedPermissions['add_permission_exam'],
        add_permission_transport: selectedPermissions['add_permission_transport'], // End add - Administration

        // Edit of Administration
        edit_permission_alumni: selectedPermissions['edit_permission_alumni'], // Start edit - Administration
        edit_permission_attendance_staff: selectedPermissions['edit_permission_attendance_staff'],
        edit_permission_attendance_student: selectedPermissions['edit_permission_attendance_student'],
        edit_permission_calendar: selectedPermissions['edit_permission_calendar'],
        edit_permission_document: selectedPermissions['edit_permission_document'],
        edit_permission_download: selectedPermissions['edit_permission_download'],
        edit_permission_enquiry: selectedPermissions['edit_permission_enquiry'],
        edit_permission_hostel: selectedPermissions['edit_permission_hostel'],
        edit_permission_helpdesk: selectedPermissions['edit_permission_helpdesk'],
        edit_permission_leave: selectedPermissions['edit_permission_leave'],
        edit_permission_library: selectedPermissions['edit_permission_library'],
        edit_permission_post_jobs: selectedPermissions['edit_permission_post_jobs'],
        edit_permission_staffs: selectedPermissions['edit_permission_staffs'],
        edit_permission_student: selectedPermissions['edit_permission_student'],
        edit_permission_summary: selectedPermissions['edit_permission_summary'],
        edit_permission_survey: selectedPermissions['edit_permission_survey'],
        edit_permission_team: selectedPermissions['edit_permission_team'],
        edit_permission_exam: selectedPermissions['edit_permission_exam'],
        edit_permission_transport: selectedPermissions['edit_permission_transport'], // End edit - Administration

        // Delete of Administration
        delete_permission_alumni: selectedPermissions['delete_permission_alumni'], // Start delete - Administration
        delete_permission_attendance_staff: selectedPermissions['delete_permission_attendance_staff'],
        delete_permission_attendance_student: selectedPermissions['delete_permission_attendance_student'],
        delete_permission_calendar: selectedPermissions['delete_permission_calendar'],
        delete_permission_document: selectedPermissions['delete_permission_document'],
        delete_permission_download: selectedPermissions['delete_permission_download'],
        delete_permission_enquiry: selectedPermissions['delete_permission_enquiry'],
        delete_permission_hostel: selectedPermissions['delete_permission_hostel'],
        delete_permission_helpdesk: selectedPermissions['delete_permission_helpdesk'],
        delete_permission_leave: selectedPermissions['delete_permission_leave'],
        delete_permission_library: selectedPermissions['delete_permission_library'],
        delete_permission_post_jobs: selectedPermissions['delete_permission_post_jobs'],
        delete_permission_staffs: selectedPermissions['delete_permission_staffs'],
        delete_permission_student: selectedPermissions['delete_permission_student'],
        delete_permission_summary: selectedPermissions['delete_permission_summary'],
        delete_permission_survey: selectedPermissions['delete_permission_survey'],
        delete_permission_team: selectedPermissions['delete_permission_team'],
        delete_permission_exam: selectedPermissions['delete_permission_exam'],
        delete_permission_transport: selectedPermissions['delete_permission_transport'], // End delete - Administration

        // View of Academics
        view_permission_academic: selectedPermissions['view_permission_academic'], // Start view - Academics
        view_permission_academic_grade: selectedPermissions['view_permission_academic_grade'],
        view_permission_academic_content: selectedPermissions['view_permission_academic_content'],
        view_permission_academic_syllabus: selectedPermissions['view_permission_academic_syllabus'],
        view_permission_assessment: selectedPermissions['view_permission_assessment'],
        view_permission_classwork: selectedPermissions['view_permission_classwork'],
        view_permission_homework: selectedPermissions['view_permission_homework'],
        view_permission_lesson_plan: selectedPermissions['view_permission_lesson_plan'],
        view_permission_online_class: selectedPermissions['view_permission_online_class'],
        view_permission_online_exam: selectedPermissions['view_permission_online_exam'],
        view_permission_certificate: selectedPermissions['view_permission_certificate'],
        view_permission_time_table: selectedPermissions['view_permission_time_table'], // End view - Academics

        // Add of Academics
        add_permission_academic: selectedPermissions['add_permission_academic'], // Start add - Academics
        add_permission_academic_grade: selectedPermissions['add_permission_academic_grade'],
        add_permission_academic_content: selectedPermissions['add_permission_academic_content'],
        add_permission_academic_syllabus: selectedPermissions['add_permission_academic_syllabus'],
        add_permission_assessment: selectedPermissions['add_permission_assessment'],
        add_permission_classwork: selectedPermissions['add_permission_classwork'],
        add_permission_homework: selectedPermissions['add_permission_homework'],
        add_permission_lesson_plan: selectedPermissions['add_permission_lesson_plan'],
        add_permission_online_class: selectedPermissions['add_permission_online_class'],
        add_permission_online_exam: selectedPermissions['add_permission_online_exam'],
        add_permission_certificate: selectedPermissions['add_permission_certificate'],
        add_permission_time_table: selectedPermissions['add_permission_time_table'], // End add - Academics

        // Edit of Academics
        edit_permission_academic: selectedPermissions['edit_permission_academic'], // Start edit - Academics
        edit_permission_academic_grade: selectedPermissions['edit_permission_academic_grade'],
        edit_permission_academic_content: selectedPermissions['edit_permission_academic_content'],
        edit_permission_academic_syllabus: selectedPermissions['edit_permission_academic_syllabus'],
        edit_permission_assessment: selectedPermissions['edit_permission_assessment'],
        edit_permission_classwork: selectedPermissions['edit_permission_classwork'],
        edit_permission_homework: selectedPermissions['edit_permission_homework'],
        edit_permission_lesson_plan: selectedPermissions['edit_permission_lesson_plan'],
        edit_permission_online_class: selectedPermissions['edit_permission_online_class'],
        edit_permission_online_exam: selectedPermissions['edit_permission_online_exam'],
        edit_permission_certificate: selectedPermissions['edit_permission_certificate'],
        edit_permission_time_table: selectedPermissions['edit_permission_time_table'], // End edit - Academics

        // Delete of Academics
        delete_permission_academic: selectedPermissions['delete_permission_academic'], // Start delete - Academics
        delete_permission_academic_grade: selectedPermissions['delete_permission_academic_grade'],
        delete_permission_academic_content: selectedPermissions['delete_permission_academic_content'],
        delete_permission_academic_syllabus: selectedPermissions['delete_permission_academic_syllabus'],
        delete_permission_assessment: selectedPermissions['delete_permission_assessment'],
        delete_permission_classwork: selectedPermissions['delete_permission_classwork'],
        delete_permission_homework: selectedPermissions['delete_permission_homework'],
        delete_permission_lesson_plan: selectedPermissions['delete_permission_lesson_plan'],
        delete_permission_online_class: selectedPermissions['delete_permission_online_class'],
        delete_permission_online_exam: selectedPermissions['delete_permission_online_exam'],
        delete_permission_certificate: selectedPermissions['delete_permission_certificate'],
        delete_permission_time_table: selectedPermissions['delete_permission_time_table'], // End delete - Academics

        // view of Financial
        view_permission_admission: selectedPermissions['view_permission_admission'], // Start view - Financial
        view_permission_fees: selectedPermissions['view_permission_fees'],
        view_permission_accounts: selectedPermissions['view_permission_accounts'],
        view_permission_salary: selectedPermissions['view_permission_salary'], // End view - Financial

        // Add of Financial
        add_permission_admission: selectedPermissions['add_permission_admission'], // Start add - Financial
        add_permission_fees: selectedPermissions['add_permission_fees'],
        add_permission_accounts: selectedPermissions['add_permission_accounts'],
        add_permission_salary: selectedPermissions['add_permission_salary'], // End add - Financial

        // Edit of Financial
        edit_permission_admission: selectedPermissions['edit_permission_admission'], // Start edit - Financial
        edit_permission_fees: selectedPermissions['edit_permission_fees'],
        edit_permission_accounts: selectedPermissions['edit_permission_accounts'],
        edit_permission_salary: selectedPermissions['edit_permission_salary'], // End edit - Financial

        // Delete of Financial
        delete_permission_admission: selectedPermissions['delete_permission_admission'], // Start delete - Financial
        delete_permission_fees: selectedPermissions['delete_permission_fees'],
        delete_permission_accounts: selectedPermissions['delete_permission_accounts'],
        delete_permission_salary: selectedPermissions['delete_permission_salary'], // End delete - Financial

        // View of Communication
        view_permission_event: selectedPermissions['view_permission_event'], // Start view - Communication
        view_permission_message: selectedPermissions['view_permission_message'],
        view_permission_news: selectedPermissions['view_permission_news'],
        view_permission_notice: selectedPermissions['view_permission_notice'],
        view_permission_broadcast: selectedPermissions['view_permission_broadcast'],
        view_permission_birthday: selectedPermissions['view_permission_birthday'], // End view - Communication

        // Add of Communication
        add_permission_event: selectedPermissions['add_permission_event'], // Start add - Communication
        add_permission_message: selectedPermissions['add_permission_message'],
        add_permission_news: selectedPermissions['add_permission_news'],
        add_permission_notice: selectedPermissions['add_permission_notice'],
        add_permission_broadcast: selectedPermissions['add_permission_broadcast'],
        add_permission_birthday: selectedPermissions['add_permission_birthday'], // End add - Communication

        // Edit of Communication
        edit_permission_event: selectedPermissions['edit_permission_event'], // Start edit - Communication
        edit_permission_message: selectedPermissions['edit_permission_message'],
        edit_permission_news: selectedPermissions['edit_permission_news'],
        edit_permission_notice: selectedPermissions['edit_permission_notice'],
        edit_permission_broadcast: selectedPermissions['edit_permission_broadcast'],
        edit_permission_birthday: selectedPermissions['edit_permission_birthday'], // End edit - Communication

        // Delete of Communication
        delete_permission_event: selectedPermissions['delete_permission_event'], // Start delete - Communication
        delete_permission_message: selectedPermissions['delete_permission_message'],
        delete_permission_news: selectedPermissions['delete_permission_news'],
        delete_permission_notice: selectedPermissions['delete_permission_notice'],
        delete_permission_broadcast: selectedPermissions['delete_permission_broadcast'],
        delete_permission_birthday: selectedPermissions['delete_permission_birthday'], // End delete - Communication

        // View of Our Services
        view_permission_buy_sms: selectedPermissions['view_permission_buy_sms'], // Start view - our services
        view_permission_support_tickets: selectedPermissions['view_permission_support_tickets'],
        view_permission_billing: selectedPermissions['view_permission_billing'],
        view_permission_buy_services: selectedPermissions['view_permission_buy_services'],// End view - our services

        // Add of Our Services
        add_permission_buy_sms: selectedPermissions['add_permission_buy_sms'], // Start add - our services
        add_permission_support_tickets: selectedPermissions['add_permission_support_tickets'],
        add_permission_billing: selectedPermissions['add_permission_billing'],
        add_permission_buy_services: selectedPermissions['add_permission_buy_services'],// End add - our services

        // Edit of Our Services
        edit_permission_buy_sms: selectedPermissions['edit_permission_buy_sms'], // Start edit - our services
        edit_permission_support_tickets: selectedPermissions['edit_permission_support_tickets'],
        edit_permission_billing: selectedPermissions['edit_permission_billing'],
        edit_permission_buy_services: selectedPermissions['edit_permission_buy_services'],// End edit - our services

        // Delete of Our Services
        delete_permission_buy_sms: selectedPermissions['delete_permission_buy_sms'], // Start delete - our services
        delete_permission_support_tickets: selectedPermissions['delete_permission_support_tickets'],
        delete_permission_billing: selectedPermissions['delete_permission_billing'],
        delete_permission_buy_services: selectedPermissions['delete_permission_buy_services'],// End delete - our services

        // View of My Profile
        view_permission_pay_slip: selectedPermissions['view_permission_pay_slip'], // Start view - My Profile
        view_permission_attendance: selectedPermissions['view_permission_attendance'],
        view_permission_manage_leave: selectedPermissions['view_permission_manage_leave'],
        view_permission_manage_your_profile: selectedPermissions['view_permission_manage_your_profile'],
        view_permission_transport_details: selectedPermissions['view_permission_transport_details'],
        view_permission_extra_duty: selectedPermissions['view_permission_extra_duty'], // End view - My Profile

        // Add of My Profile
        add_permission_pay_slip: selectedPermissions['add_permission_pay_slip'], // Start Add - My Profile
        add_permission_attendance: selectedPermissions['add_permission_attendance'],
        add_permission_manage_leave: selectedPermissions['add_permission_manage_leave'],
        add_permission_manage_your_profile: selectedPermissions['add_permission_manage_your_profile'],
        add_permission_transport_details: selectedPermissions['add_permission_transport_details'],
        add_permission_extra_duty: selectedPermissions['add_permission_extra_duty'], // End Add - My Profile

        // Edit of My Profile
        edit_permission_pay_slip: selectedPermissions['edit_permission_pay_slip'], // Start Edit - My Profile
        edit_permission_attendance: selectedPermissions['edit_permission_attendance'],
        edit_permission_manage_leave: selectedPermissions['edit_permission_manage_leave'],
        edit_permission_manage_your_profile: selectedPermissions['edit_permission_manage_your_profile'],
        edit_permission_transport_details: selectedPermissions['edit_permission_transport_details'],
        edit_permission_extra_duty: selectedPermissions['edit_permission_extra_duty'], // End Edit - My Profile

        // Delete of My Profile
        delete_permission_pay_slip: selectedPermissions['delete_permission_pay_slip'], // Start Delete - My Profile
        delete_permission_attendance: selectedPermissions['delete_permission_attendance'],
        delete_permission_manage_leave: selectedPermissions['delete_permission_manage_leave'],
        delete_permission_manage_your_profile: selectedPermissions['delete_permission_manage_your_profile'],
        delete_permission_transport_details: selectedPermissions['delete_permission_transport_details'],
        delete_permission_extra_duty: selectedPermissions['delete_permission_extra_duty'], // End Delete - My Profile

        // View of Account
        view_permission_account_group: selectedPermissions['view_permission_account_group'], // Start view - Account
        view_permission_voucher_type: selectedPermissions['view_permission_voucher_type'],
        view_permission_stock_group: selectedPermissions['view_permission_stock_group'],
        view_permission_sale_group: selectedPermissions['view_permission_sale_group'],
        view_permission_ledger: selectedPermissions['view_permission_ledger'],
        view_permission_transaction: selectedPermissions['view_permission_transaction'],
        view_permission_inventory_allocation: selectedPermissions['view_permission_inventory_allocation'],
        view_permission_asset_allocation: selectedPermissions['view_permission_asset_allocation'],
        view_permission_account_setting: selectedPermissions['view_permission_account_setting'],
        view_permission_product: selectedPermissions['view_permission_product'],
        view_permission_sale: selectedPermissions['view_permission_sale'],
        view_permission_vendor: selectedPermissions['view_permission_vendor'],
        view_permission_infra_level: selectedPermissions['view_permission_infra_level'],
        view_permission_account_import_export: selectedPermissions['view_permission_account_import_export'],
        view_permission_account_company: selectedPermissions['view_permission_account_company'], // End view - Account

        // Add of Account
        add_permission_account_group: selectedPermissions['add_permission_account_group'], // Start Add - Account
        add_permission_voucher_type: selectedPermissions['add_permission_voucher_type'],
        add_permission_stock_group: selectedPermissions['add_permission_stock_group'],
        add_permission_sale_group: selectedPermissions['add_permission_sale_group'],
        add_permission_ledger: selectedPermissions['add_permission_ledger'],
        add_permission_transaction: selectedPermissions['add_permission_transaction'],
        add_permission_inventory_allocation: selectedPermissions['add_permission_inventory_allocation'],
        add_permission_asset_allocation: selectedPermissions['add_permission_asset_allocation'],
        add_permission_account_setting: selectedPermissions['add_permission_account_setting'],
        add_permission_product: selectedPermissions['add_permission_product'],
        add_permission_sale: selectedPermissions['add_permission_sale'],
        add_permission_vendor: selectedPermissions['add_permission_vendor'],
        add_permission_infra_level: selectedPermissions['add_permission_infra_level'],
        add_permission_account_import_export: selectedPermissions['add_permission_account_import_export'],
        add_permission_account_company: selectedPermissions['add_permission_account_company'], // End Add - Account

        // Edit of Account
        edit_permission_account_group: selectedPermissions['edit_permission_account_group'], // Start Edit - Account
        edit_permission_voucher_type: selectedPermissions['edit_permission_voucher_type'],
        edit_permission_stock_group: selectedPermissions['edit_permission_stock_group'],
        edit_permission_sale_group: selectedPermissions['edit_permission_sale_group'],
        edit_permission_ledger: selectedPermissions['edit_permission_ledger'],
        edit_permission_transaction: selectedPermissions['edit_permission_transaction'],
        edit_permission_inventory_allocation: selectedPermissions['edit_permission_inventory_allocation'],
        edit_permission_asset_allocation: selectedPermissions['edit_permission_asset_allocation'],
        edit_permission_account_setting: selectedPermissions['edit_permission_account_setting'],
        edit_permission_product: selectedPermissions['edit_permission_product'],
        edit_permission_sale: selectedPermissions['edit_permission_sale'],
        edit_permission_vendor: selectedPermissions['edit_permission_vendor'],
        edit_permission_infra_level: selectedPermissions['edit_permission_infra_level'],
        edit_permission_account_import_export: selectedPermissions['edit_permission_account_import_export'],
        edit_permission_account_company: selectedPermissions['edit_permission_account_company'], // End Edit - Account

        // Delete of Account
        delete_permission_account_group: selectedPermissions['delete_permission_account_group'], // Start Delete - Account
        delete_permission_voucher_type: selectedPermissions['delete_permission_voucher_type'],
        delete_permission_stock_group: selectedPermissions['delete_permission_stock_group'],
        delete_permission_sale_group: selectedPermissions['delete_permission_sale_group'],
        delete_permission_ledger: selectedPermissions['delete_permission_ledger'],
        delete_permission_transaction: selectedPermissions['delete_permission_transaction'],
        delete_permission_inventory_allocation: selectedPermissions['delete_permission_inventory_allocation'],
        delete_permission_asset_allocation: selectedPermissions['delete_permission_asset_allocation'],
        delete_permission_account_setting: selectedPermissions['delete_permission_account_setting'],
        delete_permission_product: selectedPermissions['delete_permission_product'],
        delete_permission_sale: selectedPermissions['delete_permission_sale'],
        delete_permission_vendor: selectedPermissions['delete_permission_vendor'],
        delete_permission_infra_level: selectedPermissions['delete_permission_infra_level'],
        delete_permission_account_import_export: selectedPermissions['delete_permission_account_import_export'],
        delete_permission_account_company: selectedPermissions['delete_permission_account_company'], // End Delete - Account

        // View of Transportation
        view_permission_transport: selectedPermissions['view_permission_transport'], // Start view - Transportation
        view_permission_area: selectedPermissions['view_permission_area'],
        view_permission_vehicle: selectedPermissions['view_permission_vehicle'],
        view_permission_vehicle_staffs: selectedPermissions['view_permission_vehicle_staffs'],
        view_permission_transport_allocation: selectedPermissions['view_permission_transport_allocation'],
        view_permission_transport_settings: selectedPermissions['view_permission_transport_settings'], 
        view_permission_transport_routes: selectedPermissions['view_permission_transport_routes'], 
        view_permission_transport_stoppages: selectedPermissions['view_permission_transport_stoppages'], // End view - Transportation

        // Add of Transportation
        add_permission_transport: selectedPermissions['add_permission_transport'], // Start add - Transportation
        add_permission_area: selectedPermissions['add_permission_area'],
        add_permission_vehicle: selectedPermissions['add_permission_vehicle'],
        add_permission_vehicle_staffs: selectedPermissions['add_permission_vehicle_staffs'],
        add_permission_transport_allocation: selectedPermissions['add_permission_transport_allocation'],
        add_permission_transport_settings: selectedPermissions['add_permission_transport_settings'], 
        add_permission_transport_routes: selectedPermissions['add_permission_transport_routes'], 
        add_permission_transport_stoppages: selectedPermissions['add_permission_transport_stoppages'], // End add - Transportation

        // Edit of Transportation
        edit_permission_transport: selectedPermissions['edit_permission_transport'], // Start edit - Transportation
        edit_permission_area: selectedPermissions['edit_permission_area'],
        edit_permission_vehicle: selectedPermissions['edit_permission_vehicle'],
        edit_permission_vehicle_staffs: selectedPermissions['edit_permission_vehicle_staffs'],
        edit_permission_transport_allocation: selectedPermissions['edit_permission_transport_allocation'],
        edit_permission_transport_settings: selectedPermissions['edit_permission_transport_settings'], 
        edit_permission_transport_routes: selectedPermissions['edit_permission_transport_routes'], 
        edit_permission_transport_stoppages: selectedPermissions['edit_permission_transport_stoppages'], // End edit - Transportation

        // Delete of Transportation
        delete_permission_transport: selectedPermissions['delete_permission_transport'], // Start delete - Transportation
        delete_permission_area: selectedPermissions['delete_permission_area'],
        delete_permission_vehicle: selectedPermissions['delete_permission_vehicle'],
        delete_permission_vehicle_staffs: selectedPermissions['delete_permission_vehicle_staffs'],
        delete_permission_transport_allocation: selectedPermissions['delete_permission_transport_allocation'],
        delete_permission_transport_settings: selectedPermissions['delete_permission_transport_settings'], 
        delete_permission_transport_routes: selectedPermissions['delete_permission_transport_routes'], 
        delete_permission_transport_stoppages: selectedPermissions['delete_permission_transport_stoppages'], // End delete - Transportation
       
        };
        setData(newFormData);
    }, [selectedPermissions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            user_id: checkData?.check_user && checkData?.check_user,
            user_role: checkData?.check_role && checkData?.check_role
        }));
    }, [checkData]);

    const permissionsFormData = (e) => {
        e.preventDefault();

        post(route("permission.save"), {
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

    //handle school view all
    const permissionParentSchoolViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_school_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // view of school setup
                view_permission_academic_years: value,
                view_permission_blood_groups: value,
                view_permission_categories: value,
                view_permission_classes: value,
                view_permission_class_groups: value,
                view_permission_custom_fields: value,
                view_permission_designations: value,
                view_permission_departments: value,
                view_permission_emergency_contacts: value,
                view_permission_holidays: value,
                view_permission_holiday_policies: value,
                view_permission_houses: value,
                view_permission_improve_presence_on_internet: value,
                view_permission_religions: value,
                view_permission_occupations: value,
                view_permission_schools: value,
                view_permission_mail_settings: value,
                view_permission_school_settings: value,
                view_permission_sms_settings: value,
                view_permission_social_shares: value,
                view_permission_timezones: value,
                view_permission_permissions: value,
                view_permission_school_import: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_school_view_all = false;
            }
            // after all child checked, then parent will check - newFormData.permission_classes_subject_view_checkbox_id === true
            else if ( false ) {
                newFormData.permission_parent_school_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle school add all
    const permissionParentSchoolAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_school_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of school setup
                add_permission_academic_years: value,
                add_permission_blood_groups: value,
                add_permission_categories: value,
                add_permission_classes: value,
                add_permission_class_groups: value,
                add_permission_custom_fields: value,
                add_permission_designations: value,
                add_permission_departments: value,
                add_permission_emergency_contacts: value,
                add_permission_holidays: value,
                add_permission_holiday_policies: value,
                add_permission_houses: value,
                add_permission_improve_presence_on_internet: value,
                add_permission_religions: value,
                add_permission_occupations: value,
                add_permission_schools: value,
                add_permission_mail_settings: value,
                add_permission_school_settings: value,
                add_permission_sms_settings: value,
                add_permission_social_shares: value,
                add_permission_timezones: value,
                add_permission_permissions: value,
                add_permission_school_import: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_school_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_school_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle school edit all
    const permissionParentSchoolEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_school_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of school setup
                edit_permission_academic_years: value,
                edit_permission_blood_groups: value,
                edit_permission_categories: value,
                edit_permission_classes: value,
                edit_permission_class_groups: value,
                edit_permission_custom_fields: value,
                edit_permission_designations: value,
                edit_permission_departments: value,
                edit_permission_emergency_contacts: value,
                edit_permission_holidays: value,
                edit_permission_holiday_policies: value,
                edit_permission_houses: value,
                edit_permission_improve_presence_on_internet: value,
                edit_permission_religions: value,
                edit_permission_occupations: value,
                edit_permission_schools: value,
                edit_permission_mail_settings: value,
                edit_permission_school_settings: value,
                edit_permission_sms_settings: value,
                edit_permission_social_shares: value,
                edit_permission_timezones: value,
                edit_permission_permissions: value,
                edit_permission_school_import: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_school_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_school_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle school delete all
    const permissionParentSchoolDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_school_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of school setup
                delete_permission_academic_years: value,
                delete_permission_blood_groups: value,
                delete_permission_categories: value,
                delete_permission_classes: value,
                delete_permission_class_groups: value,
                delete_permission_custom_fields: value,
                delete_permission_designations: value,
                delete_permission_departments: value,
                delete_permission_emergency_contacts: value,
                delete_permission_holidays: value,
                delete_permission_holiday_policies: value,
                delete_permission_houses: value,
                delete_permission_improve_presence_on_internet: value,
                delete_permission_religions: value,
                delete_permission_occupations: value,
                delete_permission_schools: value,
                delete_permission_mail_settings: value,
                delete_permission_school_settings: value,
                delete_permission_sms_settings: value,
                delete_permission_social_shares: value,
                delete_permission_timezones: value,
                delete_permission_permissions: value,
                delete_permission_school_import: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_school_delete_all = false;
            }
            // after all child checked, then parent will check
              else if (false) {
                newFormData.permission_parent_school_delete_all = true;
              }
        }

        setData(newFormData);
    };
    
    //handle Administration view all
    const permissionParentAdministrationViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_administration_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Administration
                view_permission_alumni: value,
                view_permission_attendance_staff: value,
                view_permission_attendance_student: value, 
                view_permission_calendar: value,
                view_permission_document: value,
                view_permission_download: value,
                view_permission_enquiry: value,
                view_permission_hostel: value,
                view_permission_helpdesk: value,
                view_permission_leave: value,
                view_permission_library: value,
                view_permission_post_jobs: value,
                view_permission_staffs: value,
                view_permission_student: value,
                view_permission_summary: value,
                view_permission_survey: value,
                view_permission_team: value,
                view_permission_exam: value,
                view_permission_transport: value, 
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_administration_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_administration_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Administration add all
    const permissionParentAdministrationAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_administration_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                 // Add of Administration
                add_permission_alumni: value,
                add_permission_attendance_staff: value,
                add_permission_attendance_student: value,
                add_permission_calendar: value,
                add_permission_document: value,
                add_permission_download: value,
                add_permission_enquiry: value,
                add_permission_hostel: value,
                add_permission_helpdesk: value,
                add_permission_leave: value,
                add_permission_library: value,
                add_permission_post_jobs: value,
                add_permission_staffs: value,
                add_permission_student: value,
                add_permission_summary: value,
                add_permission_survey: value,
                add_permission_team: value,
                add_permission_exam: value,
                add_permission_transport: value,
               
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_administration_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_administration_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Administration edit all
    const permissionParentAdministrationEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_administration_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Administration
                // Edit of Administration
                edit_permission_alumni: value,
                edit_permission_attendance_staff: value,
                edit_permission_attendance_student: value,
                edit_permission_calendar: value,
                edit_permission_document: value,
                edit_permission_download: value,
                edit_permission_enquiry: value,
                edit_permission_hostel: value,
                edit_permission_helpdesk: value,
                edit_permission_leave: value,
                edit_permission_library: value,
                edit_permission_post_jobs: value,
                edit_permission_staffs: value,
                edit_permission_student: value,
                edit_permission_summary: value,
                edit_permission_survey: value,
                edit_permission_team: value,
                edit_permission_exam: value,
                edit_permission_transport: value,
               
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_administration_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_administration_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Administration delete all
    const permissionParentAdministrationDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_administration_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Administration
                delete_permission_alumni: value,
                delete_permission_attendance_staff: value,
                delete_permission_attendance_student: value,
                delete_permission_calendar: value,
                delete_permission_document: value,
                delete_permission_download: value,
                delete_permission_enquiry: value,
                delete_permission_hostel: value,
                delete_permission_helpdesk: value,
                delete_permission_leave: value,
                delete_permission_library: value,
                delete_permission_post_jobs: value,
                delete_permission_staffs: value,
                delete_permission_student: value,
                delete_permission_summary: value,
                delete_permission_survey: value,
                delete_permission_team: value,
                delete_permission_exam: value,
                delete_permission_transport: value,
              
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_administration_delete_all = false;
            }
            // after all child checked, then parent will check
              else if (false) {
                newFormData.permission_parent_administration_delete_all = true;
              }
        }

        setData(newFormData);
    };

    //handle Academics view all
    const permissionParentAcademicsViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_academics_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Academics
                view_permission_academic: value,
                view_permission_academic_grade: value,
                view_permission_academic_content: value,
                view_permission_academic_syllabus: value,
                view_permission_assessment: value,
                view_permission_classwork: value,
                view_permission_homework: value,
                view_permission_lesson_plan: value,
                view_permission_online_class: value,
                view_permission_online_exam: value,
                view_permission_certificate: value,
                view_permission_time_table: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_academics_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_academics_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Academics add all
    const permissionParentAcademicsAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_academics_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Academics
                add_permission_academic: value,
                add_permission_academic_grade: value,
                add_permission_academic_content: value,
                add_permission_academic_syllabus: value,
                add_permission_assessment: value,
                add_permission_classwork: value,
                add_permission_homework: value,
                add_permission_lesson_plan: value,
                add_permission_online_class: value,
                add_permission_online_exam: value,
                add_permission_certificate: value,
                add_permission_time_table: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_academics_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_academics_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Academics edit all
    const permissionParentAcademicsEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_academics_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Academics
                edit_permission_academic: value,
                edit_permission_academic_grade: value,
                edit_permission_academic_content: value,
                edit_permission_academic_syllabus: value,
                edit_permission_assessment: value,
                edit_permission_classwork: value,
                edit_permission_homework: value,
                edit_permission_lesson_plan: value,
                edit_permission_online_class: value,
                edit_permission_online_exam: value,
                edit_permission_certificate: value,
                edit_permission_time_table: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_academics_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_academics_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Academics delete all
    const permissionParentAcademicsDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_academics_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Academics
                delete_permission_academic: value,
                delete_permission_academic_grade: value,
                delete_permission_academic_syllabus: value,
                delete_permission_academic_content: value,
                delete_permission_assessment: value,
                delete_permission_classwork: value,
                delete_permission_homework: value,
                delete_permission_lesson_plan: value,
                delete_permission_online_class: value,
                delete_permission_online_exam: value,
                delete_permission_certificate: value,
                delete_permission_time_table: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_academics_delete_all = false;
            }
            // after all child checked, then parent will check
              else if (false) {
                newFormData.permission_parent_academics_delete_all = true;
              }
        }

        setData(newFormData);
    };

    //handle Finance view all
    const permissionParentFinanceViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_finance_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // view of Financial
                view_permission_admission: value,
                view_permission_fees: value,
                view_permission_accounts: value,
                view_permission_salary: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_finance_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_finance_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Finance add all
    const permissionParentFinanceAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_finance_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Financial
                add_permission_admission: value,
                add_permission_fees: value,
                add_permission_accounts: value,
                add_permission_salary: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_finance_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_finance_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Finance edit all
    const permissionParentFinanceEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_finance_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Financial
                edit_permission_admission: value,
                edit_permission_fees: value,
                edit_permission_accounts: value,
                edit_permission_salary: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_finance_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_finance_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Finance delete all
    const permissionParentFinanceDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_finance_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Financial
                delete_permission_admission: value,
                delete_permission_fees: value,
                delete_permission_accounts: value,
                delete_permission_salary: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_finance_delete_all = false;
            }
            // after all child checked, then parent will check
              else if (false) {
                newFormData.permission_parent_finance_delete_all = true;
              }
        }

        setData(newFormData);
    };

    //handle Communication view all
    const permissionParentCommunicationViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_communication_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Communication
                view_permission_event: value,
                view_permission_message: value,
                view_permission_news: value,
                view_permission_notice: value,
                view_permission_broadcast: value,
                view_permission_birthday: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_communication_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_communication_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Communication add all
    const permissionParentCommunicationAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_communication_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Communication
                add_permission_event: value,
                add_permission_message: value,
                add_permission_news: value,
                add_permission_notice: value,
                add_permission_broadcast: value,
                add_permission_birthday: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_communication_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_communication_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Communication edit all
    const permissionParentCommunicationEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_communication_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Communication
                edit_permission_event: value,
                edit_permission_message: value,
                edit_permission_news: value,
                edit_permission_notice: value,
                edit_permission_broadcast: value,
                edit_permission_birthday: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_communication_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_communication_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Communication delete all
    const permissionParentCommunicationDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_communication_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Communication
                delete_permission_event: value,
                delete_permission_message: value,
                delete_permission_news: value,
                delete_permission_notice: value,
                delete_permission_broadcast: value,
                delete_permission_birthday: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_communication_delete_all = false;
            }
            // after all child checked, then parent will check
              else if (false) {
                newFormData.permission_parent_communication_delete_all = true;
              }
        }

        setData(newFormData);
    };

    //handle Our Services view all
    const permissionParentOurServicesViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_ourservices_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Our Services
                view_permission_buy_sms: value,
                view_permission_support_tickets: value,
                view_permission_billing: value,
                view_permission_buy_services: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_ourservices_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_ourservices_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Our Services add all
    const permissionParentOurServicesAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_ourservices_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Our Services
                add_permission_buy_sms: value,
                add_permission_support_tickets: value,
                add_permission_billing: value,
                add_permission_buy_services: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_ourservices_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_ourservices_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Our Services edit all
    const permissionParentOurServicesEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_ourservices_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Our Services
                edit_permission_buy_sms: value,
                edit_permission_support_tickets: value,
                edit_permission_billing: value,
                edit_permission_buy_services: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_ourservices_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_ourservices_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Our Services delete all
    const permissionParentOurServicesDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_ourservices_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Our Services
                delete_permission_buy_sms: value,
                delete_permission_support_tickets: value,
                delete_permission_billing: value,
                delete_permission_buy_services: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_ourservices_delete_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
            newFormData.permission_parent_ourservices_delete_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile view all
    const permissionParentMyProfileViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_myprofile_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of My Profile
                view_permission_pay_slip: value,
                view_permission_attendance: value,
                view_permission_manage_leave: value,
                view_permission_manage_your_profile: value,
                view_permission_transport_details: value,
                view_permission_extra_duty: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_myprofile_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_myprofile_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile add all
    const permissionParentMyProfileAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_myprofile_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of My Profile
                add_permission_pay_slip: value,
                add_permission_attendance: value,
                add_permission_manage_leave: value,
                add_permission_manage_your_profile: value,
                add_permission_transport_details: value,
                add_permission_extra_duty: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_myprofile_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_myprofile_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile edit all
    const permissionParentMyProfileEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_myprofile_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of My Profile
                edit_permission_pay_slip: value,
                edit_permission_attendance: value,
                edit_permission_manage_leave: value,
                edit_permission_manage_your_profile: value,
                edit_permission_transport_details: value,
                edit_permission_extra_duty: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_myprofile_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_myprofile_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile delete all
    const permissionParentMyProfileDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_myprofile_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of My Profile
                delete_permission_pay_slip: value,
                delete_permission_attendance: value,
                delete_permission_manage_leave: value,
                delete_permission_manage_your_profile: value,
                delete_permission_transport_details: value,
                delete_permission_extra_duty: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_myprofile_delete_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
            newFormData.permission_parent_myprofile_delete_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Account view all
    const permissionParentAccountViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_account_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Account
                view_permission_account_group: value,
                view_permission_voucher_type: value,
                view_permission_stock_group: value,
                view_permission_sale_group: value,
                view_permission_ledger: value,
                view_permission_transaction: value,
                view_permission_inventory_allocation: value,
                view_permission_asset_allocation: value,
                view_permission_account_setting: value,
                view_permission_product: value,
                view_permission_sale: value,
                view_permission_vendor: value,
                view_permission_infra_level: value,
                view_permission_account_import_export: value,
                view_permission_account_company: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_account_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_account_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Account add all
    const permissionParentAccountAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_account_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Account
                add_permission_account_group: value,
                add_permission_voucher_type: value,
                add_permission_stock_group: value,
                add_permission_sale_group: value,
                add_permission_ledger: value,
                add_permission_transaction: value,
                add_permission_inventory_allocation: value,
                add_permission_asset_allocation: value,
                add_permission_account_setting: value,
                add_permission_product: value,
                add_permission_sale: value,
                add_permission_vendor: value,
                add_permission_infra_level: value,
                add_permission_account_import_export: value,
                add_permission_account_company: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_account_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_account_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Account edit all
    const permissionParentAccountEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_account_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Account
                edit_permission_account_group: value,
                edit_permission_voucher_type: value,
                edit_permission_stock_group: value,
                edit_permission_sale_group: value,
                edit_permission_ledger: value,
                edit_permission_transaction: value,
                edit_permission_inventory_allocation: value,
                edit_permission_asset_allocation: value,
                edit_permission_account_setting: value,
                edit_permission_product: value,
                edit_permission_sale: value,
                edit_permission_vendor: value,
                edit_permission_infra_level: value,
                edit_permission_account_import_export: value,
                edit_permission_account_company: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_account_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_account_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle Account delete all
    const permissionParentAccountDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_account_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Account
                delete_permission_account_group: value,
                delete_permission_voucher_type: value,
                delete_permission_stock_group: value,
                delete_permission_sale_group: value,
                delete_permission_ledger: value,
                delete_permission_transaction: value,
                delete_permission_inventory_allocation: value,
                delete_permission_asset_allocation: value,
                delete_permission_account_setting: value,
                delete_permission_product: value,
                delete_permission_sale: value,
                delete_permission_vendor: value,
                delete_permission_infra_level: value,
                delete_permission_account_import_export: value,
                delete_permission_account_company: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_account_delete_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
            newFormData.permission_parent_account_delete_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile view all
    const permissionParentTransportationViewToggle = (name, value) => {
        let newFormData;
        // parent will check, all child will check
        if (name === "permission_parent_transportation_view_all") {
            newFormData = {
                ...data,
                [name]: value,
                // View of Transportation
                view_permission_transport: value,
                view_permission_area: value,
                view_permission_vehicle: value,
                view_permission_vehicle_staffs: value,
                view_permission_transport_allocation: value,
                view_permission_transport_settings: value,
                view_permission_transport_routes: value,
                view_permission_transport_stoppages: value,
            };
        } 
        else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_transportation_view_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_transportation_view_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile add all
    const permissionParentTransportationAddToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_transportation_add_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Add of Transportation
                add_permission_transport: value,
                add_permission_area: value,
                add_permission_vehicle: value,
                add_permission_vehicle_staffs: value,
                add_permission_transport_allocation: value,
                add_permission_transport_settings: value,
                add_permission_transport_routes: value,
                add_permission_transport_stoppages: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_transportation_add_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_transportation_add_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile edit all
    const permissionParentTransportationEditToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_transportation_edit_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Edit of Transportation
                edit_permission_transport: value,
                edit_permission_area: value,
                edit_permission_vehicle: value,
                edit_permission_vehicle_staffs: value,
                edit_permission_transport_allocation: value,
                edit_permission_transport_settings: value,
                edit_permission_transport_routes: value,
                edit_permission_transport_stoppages: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_transportation_edit_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
                newFormData.permission_parent_transportation_edit_all = true;
            }
        }

        setData(newFormData);
    };

    //handle My Profile delete all
    const permissionParentTransportationDeleteToggle = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "permission_parent_transportation_delete_all") {
            newFormData = {
                ...data,
                [name]: value,
                // Delete of Transportation
                delete_permission_transport: value,
                delete_permission_area: value,
                delete_permission_vehicle: value,
                delete_permission_vehicle_staffs: value,
                delete_permission_transport_allocation: value,
                delete_permission_transport_settings: value,
                delete_permission_transport_routes: value,
                delete_permission_transport_stoppages: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.permission_parent_transportation_delete_all = false;
            }
            // after all child checked, then parent will check
            else if (false) {
            newFormData.permission_parent_transportation_delete_all = true;
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
                                id="user_id"
                                value={data?.user_id && data?.user_id}
                                type="hidden"
                                className="block"
                                required
                            />
                        </div>

                        <div className="educare-button-field-styles mb-[20px]">
                            <TextInput
                                id="user_role"
                                value={checkData?.check_role}
                           
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
                                            SetupYourSchoolActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                    Setup Your School
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={ data.permission_classes_parent_checkbox_id}
                                                                            onChange={(e) => setData("permission_classes_parent_checkbox_id", e.target.checked)}
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_school_view_all"
                                                                                name="permission_parent_school_view_all"
                                                                                checked={ data.permission_parent_school_view_all }
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor="permission_parent_school_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_school_add_all"
                                                                                name="permission_parent_school_add_all"
                                                                                checked={ data.permission_parent_school_add_all }
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor="permission_parent_school_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_school_edit_all"
                                                                                name="permission_parent_school_edit_all"
                                                                                checked={data.permission_parent_school_edit_all}
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor="permission_parent_school_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_school_delete_all"
                                                                                name="permission_parent_school_delete_all"
                                                                                checked={ data.permission_parent_school_delete_all }
                                                                                onChange={(e) => permissionParentSchoolDeleteToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor="permission_parent_school_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                 
                                                            {/* Start -  features of Setup Your School */}              
                                                            {modules[0].items && modules[0].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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
                                            Users Management
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
                                                                Users Management
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_administration_view_all"
                                                                                name="permission_parent_administration_view_all"
                                                                                checked={
                                                                                    data.permission_parent_administration_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAdministrationViewToggle(
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
                                                                        <label htmlFor="permission_parent_administration_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_administration_add_all"
                                                                                name="permission_parent_administration_add_all"
                                                                                checked={
                                                                                    data.permission_parent_administration_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAdministrationAddToggle(
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
                                                                        <label htmlFor="permission_parent_administration_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_administration_edit_all"
                                                                                name="permission_parent_administration_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_administration_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAdministrationEditToggle(
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
                                                                        <label htmlFor="permission_parent_administration_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_administration_delete_all"
                                                                                name="permission_parent_administration_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_administration_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAdministrationDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_administration_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            {/* Start -  features of Administration */}              
                                                            {modules[1].items && modules[1].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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

                             {/* Start - Account */}
                             <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            AccountActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={AccountToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Accountancy
                                        </h5>
                                        <span
                                            onClick={AccountToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    AccountActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            AccountActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                Accountancy
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_account_view_all"
                                                                                name="permission_parent_account_view_all"
                                                                                checked={
                                                                                    data.permission_parent_account_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAccountViewToggle(
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
                                                                        <label htmlFor="permission_parent_account_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_account_add_all"
                                                                                name="permission_parent_account_add_all"
                                                                                checked={
                                                                                    data.permission_parent_account_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAccountAddToggle(
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
                                                                        <label htmlFor="permission_parent_account_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_account_edit_all"
                                                                                name="permission_parent_account_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_account_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAccountEditToggle(
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
                                                                        <label htmlFor="permission_parent_account_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_account_delete_all"
                                                                                name="permission_parent_account_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_account_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAccountDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_account_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                     
                                                            {/* Start -  features of Our Services */}              
                                                            {modules[7].items && modules[7].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
                                                            {/* End -  Account */}
                                                        </div>
                                                    </div>
                                                     {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Account */}
                            
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
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_academics_view_all"
                                                                                name="permission_parent_academics_view_all"
                                                                                checked={
                                                                                    data.permission_parent_academics_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAcademicsViewToggle(
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
                                                                        <label htmlFor="permission_parent_academics_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_academics_add_all"
                                                                                name="permission_parent_academics_add_all"
                                                                                checked={
                                                                                    data.permission_parent_academics_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAcademicsAddToggle(
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
                                                                        <label htmlFor="permission_parent_academics_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_academics_edit_all"
                                                                                name="permission_parent_academics_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_academics_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAcademicsEditToggle(
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
                                                                        <label htmlFor="permission_parent_academics_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_academics_delete_all"
                                                                                name="permission_parent_academics_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_academics_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentAcademicsDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_academics_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Academics */}              
                                                            {modules[2].items && modules[2].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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
                                            Financials
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
                                                                Financials
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_finance_view_all"
                                                                                name="permission_parent_finance_view_all"
                                                                                checked={
                                                                                    data.permission_parent_finance_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentFinanceViewToggle(
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
                                                                        <label htmlFor="permission_parent_finance_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_finance_add_all"
                                                                                name="permission_parent_finance_add_all"
                                                                                checked={
                                                                                    data.permission_parent_finance_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentFinanceAddToggle(
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
                                                                        <label htmlFor="permission_parent_finance_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_finance_edit_all"
                                                                                name="permission_parent_finance_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_finance_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentFinanceEditToggle(
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
                                                                        <label htmlFor="permission_parent_finance_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_finance_delete_all"
                                                                                name="permission_parent_finance_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_finance_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentFinanceDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_finance_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Finance */}              
                                                            {modules[3].items && modules[3].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_communication_view_all"
                                                                                name="permission_parent_communication_view_all"
                                                                                checked={
                                                                                    data.permission_parent_communication_view_all
                                                                                }
                                                                                onChange={(e) => permissionParentCommunicationViewToggle(
                                                                                    e.target.name, e.target.checked
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor="permission_parent_communication_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_communication_add_all"
                                                                                name="permission_parent_communication_add_all"
                                                                                checked={
                                                                                    data.permission_parent_communication_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentCommunicationAddToggle(
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
                                                                        <label htmlFor="permission_parent_communication_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_communication_edit_all"
                                                                                name="permission_parent_communication_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_communication_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentCommunicationEditToggle(
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
                                                                        <label htmlFor="permission_parent_communication_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_communication_delete_all"
                                                                                name="permission_parent_communication_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_communication_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentCommunicationDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_communication_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Start -  features of Communication */}              
                                                            {modules[4].items && modules[4].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_ourservices_view_all"
                                                                                name="permission_parent_ourservices_view_all"
                                                                                checked={
                                                                                    data.permission_parent_ourservices_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentOurServicesViewToggle(
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
                                                                        <label htmlFor="permission_parent_ourservices_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_ourservices_add_all"
                                                                                name="permission_parent_ourservices_add_all"
                                                                                checked={
                                                                                    data.permission_parent_ourservices_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentOurServicesAddToggle(
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
                                                                        <label htmlFor="permission_parent_ourservices_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_ourservices_edit_all"
                                                                                name="permission_parent_ourservices_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_ourservices_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentOurServicesEditToggle(
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
                                                                        <label htmlFor="permission_parent_ourservices_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_ourservices_delete_all"
                                                                                name="permission_parent_ourservices_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_ourservices_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentOurServicesDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_ourservices_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                     
                                                            {/* Start -  features of Our Services */}              
                                                            {modules[5].items && modules[5].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
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


                            {/* Start - My Profile */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            MyProfileActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={MyProfileToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            My profile
                                        </h5>
                                        <span
                                            onClick={MyProfileToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    MyProfileActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            MyProfileActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                My Profile
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_myprofile_view_all"
                                                                                name="permission_parent_myprofile_view_all"
                                                                                checked={
                                                                                    data.permission_parent_myprofile_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentMyProfileViewToggle(
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
                                                                        <label htmlFor="permission_parent_myprofile_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_myprofile_add_all"
                                                                                name="permission_parent_myprofile_add_all"
                                                                                checked={
                                                                                    data.permission_parent_myprofile_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentMyProfileAddToggle(
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
                                                                        <label htmlFor="permission_parent_myprofile_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_myprofile_edit_all"
                                                                                name="permission_parent_myprofile_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_myprofile_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentMyProfileEditToggle(
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
                                                                        <label htmlFor="permission_parent_myprofile_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_myprofile_delete_all"
                                                                                name="permission_parent_myprofile_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_myprofile_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentMyProfileDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_myprofile_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                     
                                                            {/* Start -  features of Our Services */}              
                                                            {modules[6].items && modules[6].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
                                                            {/* End -  My Profile */}
                                                        </div>
                                                    </div>
                                                     {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - My Profile */}

                            {/* Start - Transportation */}
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div
                                        className={`educare-school-form-action-title ${
                                            TransportationActive ? "" : "pb-0"
                                        }`}
                                    >
                                        <h5
                                            onClick={TransportationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i className="icon-Buildings"></i>
                                            Transportation
                                        </h5>
                                        <span
                                            onClick={TransportationToggle}
                                            className="cursor-pointer"
                                        >
                                            <i
                                                className={`${
                                                    MyProfileActive
                                                        ? "icon-minus"
                                                        : "icon-plus"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                    <div
                                        className={`educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5 ${
                                            TransportationActive ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="permission-role-area">
                                            <div className="permission-role-inner">
                                                <div className="permission-role-inner-wrapper border  border-border/50 border-b-0">
                                                    <div className="permission-role-list border-b  border-border/50 flex items-center">
                                                        <div className="permission-role-left">
                                                            <div className="permission-role-topic">
                                                                <h5 className="text-[18px] font-semibold text-heading mb-3">
                                                                Transportation
                                                                </h5>
                                                                <div className="permission-role-checkbox permission-role-checkbox-all-hidden">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            id="permission_classes_parent_checkbox_id"
                                                                            name="permission_classes_parent_checkbox_id"
                                                                            checked={
                                                                                data.permission_classes_parent_checkbox_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "permission_classes_parent_checkbox_id",
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label htmlFor="permission_classes_parent_checkbox_id">
                                                                        All
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="permission-role-right w-full border-l  border-border/50">
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-semibold text-heading">
                                                                        Permission
                                                                    </h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_transportation_view_all"
                                                                                name="permission_parent_transportation_view_all"
                                                                                checked={
                                                                                    data.permission_parent_transportation_view_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentTransportationViewToggle(
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
                                                                        <label htmlFor="permission_parent_transportation_view_all">
                                                                            View All + Reports
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_transportation_add_all"
                                                                                name="permission_parent_transportation_add_all"
                                                                                checked={
                                                                                    data.permission_parent_transportation_add_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentTransportationAddToggle(
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
                                                                        <label htmlFor="permission_parent_transportation_add_all">
                                                                            Add All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_transportation_edit_all"
                                                                                name="permission_parent_transportation_edit_all"
                                                                                checked={
                                                                                    data.permission_parent_transportation_edit_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentTransportationEditToggle(
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
                                                                        <label htmlFor="permission_parent_transportation_edit_all">
                                                                            Edit All
                                                                        </label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox permission-role-checkbox-parent">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="permission_parent_transportation_delete_all"
                                                                                name="permission_parent_transportation_delete_all"
                                                                                checked={
                                                                                    data.permission_parent_transportation_delete_all
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    permissionParentTransportationDeleteToggle(
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
                                                                        <label htmlFor="permission_parent_transportation_delete_all">
                                                                            Delete All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                     
                                                            {/* Start -  features of Our Services */}              
                                                            {modules[8].items && modules[8].items.map((item) => (
                                                            <>
                                                            <div className="permission-role-category-list custom-height-70 flex items-center border-b  border-border/50">
                                                                <div className="permission-role-category">
                                                                    <h6 className="text-[15px] font-medium text-headingLight">{item.name}</h6>
                                                                </div>
                                                                <div className="permission-role-checkbox-wrapper">
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`view_permission_${item.key}`}
                                                                                name={`view_permission_${item.key}`}
                                                                                checked={ data[`view_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolViewToggle(e.target.name, e.target.checked)}
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`view_permission_${item.key}`}>View</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`add_permission_${item.key}`}
                                                                                name={`add_permission_${item.key}`}
                                                                                checked={ data[`add_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolAddToggle(e.target.name, e.target.checked)}  
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`add_permission_${item.key}`}>Add</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox border-r">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`edit_permission_${item.key}`}
                                                                                name={`edit_permission_${item.key}`}
                                                                                checked={ data[`edit_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`edit_permission_${item.key}`}>Edit</label>
                                                                    </div>
                                                                    <div className="permission-role-checkbox">
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id={`delete_permission_${item.key}`}
                                                                                name={`delete_permission_${item.key}`}
                                                                                checked={ data[`delete_permission_${item.key}`] } 
                                                                                onChange={(e) => permissionParentSchoolEditToggle(e.target.name, e.target.checked)} 
                                                                            />
                                                                        </div>
                                                                        <label htmlFor={`delete_permission_${item.key}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            ))}
                                                            {/* End -  My Profile */}
                                                        </div>
                                                    </div>
                                                     {/* Classes module form check end */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - Transportation */}

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

export default PermissionsForm;
