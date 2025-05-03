<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdmissionInqueryRegistrationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'classroom_id' => ['nullable', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'category_id' => ['nullable', 'integer'],
            'user_id' => ['nullable', 'integer'],
            'source_id' => ['required', 'integer'],
            'academic_year_id' => ['required', 'integer'],
            'state_id' => ['nullable', 'integer'],
            'employment_category_id' => ['nullable', 'integer'],
            'bank_account_id' => ['nullable', 'integer'],
            'bank_id' => ['nullable', 'integer'],
            'staff_id' => ['nullable', 'integer'],
            'enquiry_date_at' => ['nullable', 'string'],
            'birth_date_at' => ['nullable', 'string'],
            'contact_name' => ['required', 'string'],
            'enquiry_detail' => ['nullable', 'string'],
            'contact_number' => ['required', 'string'],
            'contact_email' => ['nullable', 'string'],
            'person_to_meet' => ['nullable', 'string'],
            'in_time' => ['nullable', 'string'],
            'refer_contact_person' => ['nullable', 'string'],
            'refer_mobile' => ['nullable', 'string'],
            'enquiry_address' => ['nullable', 'string'],
            'reference_by' => ['nullable', 'string'],
            'boarding_scholar' => ['nullable', 'string'],
            'first_name' => ['required', 'string'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'gender' => ['required', 'string'],
            'date_of_birth' => ['nullable', 'string'],
            'aadhar_card_no' => ['nullable', 'string'],
            'blood_group' => ['nullable', 'string'],
            'religion' => ['nullable', 'string'],
            'country_id' => ['nullable', 'string'],
            'date_of_registration' => ['nullable', 'string'],
            'form_no' => ['nullable', 'string'],
            'srn_no' => ['nullable', 'string'],
            'child_id' => ['nullable', 'string'],
            'samagra_id' => ['nullable', 'string'],
            'mother_tongue' => ['nullable', 'string'],
            'medical_condition' => ['nullable', 'string'],
            'is_transport_availed' => ['nullable', 'string'],
            'is_physically_disabled' => ['nullable', 'string'],
            'is_special_child' => ['nullable', 'string'],
            'conomically_weaker_section' => ['nullable', 'string'],
            'student_image' => ['nullable', 'string'],
            'father_image' => ['nullable', 'string'],
            'mother_image' => ['nullable', 'string'],
            'guardian_image' => ['nullable', 'string'],
            'school_name' => ['nullable', 'string'],
            'school_class' => ['nullable', 'string'],
            'school_year' => ['nullable', 'string'],
            'tc_no' => ['nullable', 'string'],
            'referred_by' => ['nullable', 'string'],
            'is_have_sibling' => ['nullable', 'string'],
            'present_address' => ['nullable', 'string'],
            'present_state' => ['nullable', 'string'],
            'landmark' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'district' => ['nullable', 'string'],
            'taluka' => ['nullable', 'string'],
            'pin_code' => ['nullable', 'string'],
            'permanent_address' => ['nullable', 'string'],
            'permanent_state' => ['nullable', 'string'],
            'permanent_city' => ['nullable', 'string'],
            'permanent_taluka' => ['nullable', 'string'],
            'permanent_district' => ['nullable', 'string'],
            'permanent_pin_code' => ['nullable', 'string'],
            'sibling_name' => ['nullable', 'string'],
            'sibling_std' => ['nullable', 'string'],
            'sibling_adm_no' => ['nullable', 'string'],
            'sibling_year' => ['nullable', 'string'],
            'reference_by_parent' => ['nullable', 'string'],
            'enquiry_type' => ['nullable', 'string'],
            'enquiry_status' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            // fee enquiry
            'enquiry_id' => ['nullable', 'integer'],
            'academic_fee' => ['nullable', 'string'],
            'fee_amount' => ['nullable', 'string'],
            'payment_mode' => ['nullable', 'string'],
            'payment_note' => ['nullable', 'string'],
            'cheque_no' => ['nullable', 'string'],
            'cheque_date' => ['nullable', 'string'],
            'bank_id' => ['nullable', 'string'],
            'bank_account_id' => ['nullable', 'string'],
            'paytm_ref_no' => ['nullable', 'string'],
            'paytm_mobile' => ['nullable', 'string'],
            'neft_number' => ['nullable', 'string'],
            'neft_desc' => ['nullable', 'string'],
            'upi_number' => ['nullable', 'string'],
            'upi_description' => ['nullable', 'string'],
            // guardian enquiry
            'father_first_name' => ['required', 'string'],
            'father_middle_name' => ['nullable', 'string'],
            'father_last_name' => ['nullable', 'string'],
            'father_email' => ['nullable', 'string'],
            'father_mobile' => ['required', 'string'],
            'father_sms_number' => ['nullable', 'string'],
            'father_occupation' => ['nullable', 'string'],
            'father_highest_qualification' => ['nullable', 'string'],
            'father_aadhar_card_no' => ['nullable', 'string'],
            'father_whatsapp_no' => ['nullable', 'string'],
            'father_income_per_year' => ['nullable', 'string'],
            'father_department' => ['nullable', 'string'],
            'father_designation' => ['nullable', 'string'],
            'father_pan_card_no' => ['nullable', 'string'],
            'father_company_name' => ['nullable', 'string'],
            'father_office_address' => ['nullable', 'string'],
            'mother_first_name' => ['nullable', 'string'],
            'mother_middle_name' => ['nullable', 'string'],
            'mother_last_name' => ['nullable', 'string'],
            'mother_email' => ['nullable', 'string'],
            'mother_mobile' => ['nullable', 'string'],
            'mother_highest_qualification' => ['nullable', 'string'],
            'mother_occupation' => ['nullable', 'string'],
            'mother_income_per_year' => ['nullable', 'string'],
            'mother_department' => ['nullable', 'string'],
            'mother_designation' => ['nullable', 'string'],
            'mother_aadhar_card_no' => ['nullable', 'string'],
            'mother_pan_card_no' => ['nullable', 'string'],
            'mother_company_name' => ['nullable', 'string'],
            'mother_office_address' => ['nullable', 'string'],
        ];
    }
}
