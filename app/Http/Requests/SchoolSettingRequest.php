<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'school_id' => ['nullable', 'integer'],
            'academic_year_id' => ['nullable', 'string'],
            'admission_seed' => ['nullable', 'string'],
            'admission_prefix' => ['nullable', 'string'],
            'admission_postfix' => ['nullable', 'string'],
            'ticket_url' => ['nullable', 'string'],
            'ticket_userid' => ['nullable','string'],
            'ticket_password' => ['nullable','string'],
            'admin_number' => ['nullable', 'string'],
            'training_url' => ['nullable', 'string'],
            'email_notification' => ['nullable', 'string'],
            'sms_notification' => ['nullable', 'string'],
            'is_email_notify' => ['nullable', 'string'],
            'is_sms_notify' => ['nullable', 'string'],
            'is_teacher_reply' => ['nullable', 'string'],
            'is_teacher_compose' => ['nullable', 'string'],
            'is_parent_reply' => ['nullable', 'string'],
            'is_parent_compose' => ['nullable', 'string'],
            'is_enable_email' => ['nullable', 'string'],
            'is_attendance_backdate' => ['nullable', 'string'],
            'is_parent_newsletter' => ['nullable', 'string'],
            'is_student_roll_softable' => ['nullable', 'string'],
            'is_class_wise_report' => ['nullable', 'string'],
            'is_teacher_self_attendance' => ['nullable', 'string'],
            'is_password_visible' => ['nullable', 'string'],
            'is_biometric_integration' => ['nullable', 'string'],
            'is_student_biometric_attendance' => ['nullable', 'string'],
            'is_view_parent_contact' => ['nullable', 'string'],
            'is_view_tc_copy' => ['nullable', 'string'],
            'is_pay_online_fee_voucher' => ['nullable', 'string'],
            'is_uploaded_photo_app' => ['nullable', 'string'],
            'is_transport_boarding_student' => ['nullable', 'string'],
            'is_event_module_teacher_login' => ['nullable', 'string'],
            'is_allow_upload_document' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],

            'country_id' => ['nullable', 'integer'],
        ];
    }
}
