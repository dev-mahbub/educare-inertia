<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class AdmissionEnquiryRequest extends FormRequest
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
        $id = $this->route('id');

        return [
            'sibling_id' => ['nullable', 'integer'],
            'enquiry_id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'academic_year_id' => ['required', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'classroom_id' => ['nullable', 'integer'],
            'staff_id' => ['nullable'],
            'country_id' => ['nullable'],
            'academic_fee' => ['required'],
            'user_id' => ['nullable'],
            'source_id' => ['nullable', 'integer'],
            'reference_by' => ['nullable'],
            'employment_category_id' => ['nullable'],
            'payment_mode' => ['required'],
            'is_have_sibling' => ['nullable'],
            'payment_note' => ['nullable'],
            'school_receipt_no' => ['nullable'],
            'keep_same_payment_detail' => ['nullable'],
            'cheque_no' => ['nullable', 'integer'],
            'bank_name' => ['nullable'],
            'branch' => ['nullable'],
            'bank_account_id' => ['nullable'],
            'bank_id' => ['nullable'],
            'paytm_ref_no' => ['nullable'],
            'paytm_mobile' => ['nullable'],
            'neft_number' => ['nullable'],
            'neft_desc' => ['nullable'],
            'upi_description' => ['nullable'],
            'upi_number' => ['nullable'],
            'first_name' => ['nullable'],
            'middle_name' => ['nullable'],
            'last_name' => ['nullable'],
            'gender' => ['required'],
            'contact_email' => [
                'nullable',
                Rule::unique('enquiries', 'contact_email')->ignore($id),
            ],
            'blood_group' => ['nullable'],
            'date_of_birth' => ['nullable'],
            'religion' => ['nullable'],
            'category_id' => ['nullable'],
            'contact_number' => ['nullable'],
            'date_of_registration' => ['required'],
            'form_no' => ['nullable'],
            'aadhar_card_no' => ['nullable'],
            'srn_no' => ['nullable', 'max:100'],
            'child_id' => ['nullable', 'max:50'],
            'samagra_id' => ['nullable', 'max:50'],
            'mother_tongue' => ['nullable', 'max:100'],
            'medical_condition' => ['nullable', 'max:100'],
            'is_physically_disabled' => ['nullable'],
            'is_special_child' => ['nullable'],
            'conomically_weaker_section' => ['nullable'],
            'father_first_name' => ['required', 'max:50'],
            'father_middle_name' => ['nullable', 'max:50'],
            'father_last_name' => ['nullable', 'max:50'],
            'father_email' => ['nullable', 'email'],
            'father_mobile' => ['required', 'max:50'],
            'sms_number' => ['nullable'],
            'father_highest_qualification' => ['nullable', 'max:50'],
            'father_occupation' => ['nullable', 'max:50'],
            'father_income_per_year' => ['nullable'],
            'father_department' => ['nullable', 'max:50'],
            'father_designation' => ['nullable', 'max:50'],
            'father_aadhar_card_no' => ['nullable', 'max:50'],
            'father_pan_card_no' => ['nullable', 'max:50'],
            'father_office_address' => ['nullable', 'max:50'],
            'father_company_name' => ['nullable', 'max:50'],
            'mother_first_name' => ['required', 'max:50'],
            'mother_middle_name' => ['nullable', 'max:50'],
            'mother_last_name' => ['nullable', 'max:50'],
            'mother_email' => ['nullable', 'email', 'max:50'],
            'mother_mobile' => ['nullable', 'max:50'],
            'mother_highest_qualification' => ['nullable', 'max:50'],
            'mother_occupation' => ['nullable', 'max:50'],
            'mother_income_per_year' => ['nullable', 'max:50'],
            'mother_department' => ['nullable', 'max:50'],
            'mother_designation' => ['nullable', 'max:50'],
            'mother_aadhar_card_no' => ['nullable', 'max:50'],
            'mother_pan_card_no' => ['nullable', 'max:50'],
            'mother_company_name' => ['nullable', 'max:50'],
            'mother_office_address' => ['nullable', 'max:50'],
            'present_address' => ['nullable', 'max:50'],
            'present_state' => ['nullable', 'max:50'],
            'city' => ['nullable', 'max:50'],
            'taluka' => ['nullable', 'max:50'],
            'district' => ['nullable', 'max:50'],
            'pin_code' => ['nullable', 'max:50'],
            'permanent_address' => ['nullable', 'max:50'],
            'permanent_state' => ['nullable', 'max:50'],
            'permanent_city' => ['nullable', 'max:50'],
            'permanent_taluka' => ['nullable', 'max:50'],
            'permanent_district' => ['nullable', 'max:50'],
            'permanent_pin_code' => ['nullable', 'max:50'],
            'document_attached' => ['nullable'],
            'school_name' => ['nullable', 'max:100'],
            'school_class' => ['nullable', 'max:50'],
            'school_year' => ['nullable', 'max:50'],
            'tc_no' => ['nullable'],
            'referred_by' => ['nullable', 'max:50'],
            'boarding_scholar' => ['nullable'],
            'is_transport_availed' => ['nullable'],
            'sibling_name' => ['nullable', 'max:50'],
            'sibling_std' => ['nullable', 'max:50'],
            'sibling_adm_no' => ['nullable', 'max:50'],
            'sibling_year' => ['nullable', 'max:50'],
            'student_image' => ['nullable', 'file'],
            'father_image' => ['nullable', 'file'],
            'mother_image' => ['nullable', 'file'],
            // 'guardian_image' => ['nullable'],
            'student_id' => ['nullable'],
            'reference_by_parent' => ['nullable'],
            // extra
            'enquiry_guardian_id' => ['nullable'],
            'enquery_fee_id' => ['nullable'],
            'father_sms_number' => ['nullable'],
            'payment_date' => ['nullable'],
            'custom_fields' => ['nullable', 'array']
        ];
    }


    public function messages(): array
    {
        return [
            'medical_condition.max' => 'Max length 100.',
            'srn_no.max' => 'Max length 100.',
            'child_id.max' => 'Max length 50.',
            'samagra_id.max' => 'Max length 50.',
            'mother_tongue.max' => 'Max length 100.',
            'medical_condition.max' => 'Max length 100.',
            'father_first_name.max' => 'Max length 50.',
            'father_last_name.max' => 'Max length 50.',
            'father_mobile.max' => 'Max length 50.',
            'father_highest_qualification.max' => 'Max length 50.',
            'father_occupation.max' => 'Max length 50.',
            'father_department.max' => 'Max length 50.',
            'father_designation.max' => 'Max length 50.',
            'father_aadhar_card_no.max' => 'Max length 50.',
            'father_pan_card_no.max' => 'Max length 50.',
            'father_office_address.max' => 'Max length 50.',
            'father_company_name.max' => 'Max length 50.',
            'mother_first_name.max' => 'Max length 50.',
            'mother_middle_name.max' => 'Max length 50.',
            'mother_last_name.max' => 'Max length 50.',
            'mother_email.max' => 'Max length 50.',
            'mother_mobile.max' => 'Max length 50.',
            'mother_highest_qualification.max' => 'Max length 50.',
            'mother_occupation.max' => 'Max length 50.',
            'mother_income_per_year.max' => 'Max length 50.',
            'mother_department.max' => 'Max length 50.',
            'mother_designation.max' => 'Max length 50.',
            'mother_aadhar_card_no.max' => 'Max length 50.',
            'mother_pan_card_no.max' => 'Max length 50.',
            'mother_company_name.max' => 'Max length 50.',
            'mother_office_address.max' => 'Max length 50.',
            'present_address.max' => 'Max length 50.',
            'present_state.max' => 'Max length 50.',
            'city.max' => 'Max length 50.',
            'taluka.max' => 'Max length 50.',
            'district.max' => 'Max length 50.',
            'pin_code.max' => 'Max length 50.',
            'permanent_address.max' => 'Max length 50.',
            'permanent_state.max' => 'Max length 50.',
            'permanent_city.max' => 'Max length 50.',
            'permanent_taluka.max' => 'Max length 50.',
            'permanent_district.max' => 'Max length 50.',
            'permanent_pin_code.max' => 'Max length 50.',
            'school_name.max' => 'Max length 100.',
            'school_class.max' => 'Max length 50.',
            'school_year.max' => 'Max length 50.',
            'referred_by.max' => 'Max length 50.',
            'sibling_name.max' => 'Max length 50.',
            'sibling_std.max' => 'Max length 50.',
            'sibling_adm_no.max' => 'Max length 50.',
            'sibling_year.max' => 'Max length 50.',
        ];
    }
}
