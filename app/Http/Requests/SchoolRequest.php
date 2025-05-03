<?php

namespace App\Http\Requests;

use App\Models\Message;
use App\Models\School;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SchoolRequest extends FormRequest
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
        $id = getUserSchoolId();
        return [
            'parent_id' => ['nullable'],
            'school_name' => ['required', 'string', 'max:255'],
            'affiliation_no' => ['required', 'max:50'],
            'school_key' => ['required', 'max:50'],
            'school_number' => ['required', 'max:255'],
            'teaser' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'zip' => ['nullable'],
            'phone' => ['nullable'],
            'phone_2' => ['nullable'],
            'mail' => ['required', 'email', 'unique:schools,mail,'. $id ],
            'udise_code' => ['nullable', 'string'],
            'medium' => ['nullable', 'string'],
            'display_name_board' => ['nullable', 'string', 'max:255'],
            'street_address' => ['nullable', 'string', 'max:255'],
            'fb_url' => ['nullable'],
            'instagram_url' => ['nullable'],
            'twitter_url' => ['nullable'],
            'linkedin_url' => ['nullable'],
            'youtube_url' => ['nullable'],
            'android_app_url' => ['nullable'],
            'apple_app_url' => ['nullable'],
            'google_business_url' => ['nullable'],
            'established_at' => ['nullable'],
            'is_inactive' => ['nullable'],
            'status' => ['nullable', 'string'],
            'image' => ['nullable', 'image'],
            'academic_year_id' => ['nullable', 'integer'],
            'admission_seed' => ['nullable'],
            'admission_prefix' => ['nullable'],
            'admission_postfix' => ['nullable'],
            'ticket_url' => ['nullable', 'max:255'],
            'ticket_userid' => ['nullable'],
            'ticket_password' => ['nullable'],
            'admin_number' => ['nullable'],
            'training_url' => ['nullable'],
            'email_notification' => ['nullable'],
            'sms_notification' => ['nullable'],
            'is_email_notify' => ['nullable', 'boolean'],
            'is_sms_notify' => ['nullable'],
            'is_teacher_reply' => ['nullable', 'boolean'],
            'is_teacher_compose' => ['nullable', 'boolean'],
            'is_parent_reply' => ['nullable', 'boolean'],
            'is_parent_compose' => ['nullable', 'boolean'],
            'is_enable_email' => ['nullable'],
            'is_attendance_backdate' => ['nullable', 'boolean'],
            'is_parent_newsletter' => ['nullable', 'boolean'],
            'is_student_roll_softable' => ['nullable', 'boolean'],
            'is_class_wise_report' => ['nullable', 'boolean'],
            'is_teacher_self_attendance' => ['nullable', 'boolean'],
            'is_password_visible' => ['nullable', 'boolean'],
            'is_teacher_newsletter' => ['nullable', 'boolean'],
            'is_biometric_integration' => ['nullable', 'boolean'],
            'is_student_biometric_attendance' => ['nullable', 'boolean'],
            'is_view_parent_contact' => ['nullable', 'boolean'],
            'is_view_tc_copy' => ['nullable', 'boolean'],
            'is_pay_online_fee_voucher' => ['nullable', 'boolean'],
            'is_uploaded_photo_app' => ['nullable', 'boolean'],
            'is_transport_boarding_student' => ['nullable', 'boolean'],
            'is_event_module_teacher_login' => ['nullable', 'boolean'],
            'is_allow_upload_document' => ['nullable', 'boolean'],
            'is_weekly_status_send_to_parent' => ['nullable', 'boolean'],
            'duration' => ['nullable'],
            'country_id' => ['required'],
            'state_id' => ['required'],
            'timezone_id' => ['required'],
            'board_id' => ['required'],

            'school_board_id' => ['nullable'],
            'school_country_id' => ['nullable'],
            'school_setting_id' => ['nullable'],
            'school_state_id' => ['nullable'],
            'school_timezone_id' => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            'country_id.required' => 'Country is required.',
            'country_id.integer' => 'Country is required.',
            'state_id.required' => 'State is required.',
            'state_id.integer' => 'State is required.',
            'timezone_id.required' => 'Timezone is required.',
            'timezone_id.integer' => 'Timezone is required.',
            'board_id.required' => 'Board is required.',
            'board_id.integer' => 'Board is required.',
            'academic_year_id.required' => 'Academic year is required.',
            'academic_year_id.integer' => 'Academic year is required.',
        ];
    }
}
