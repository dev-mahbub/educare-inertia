<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
        $id = $this->input('id');
        return [
            'id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'user_id' => ['nullable', 'integer'],
            'fee_structure_id' => ['required_if:fee_structure_setting,Yes'],
            'selectedSibling' => ['nullable'],
            'employment_cat_id' => ['nullable'],
            'classroom_id' => ['required', 'integer'],
            'house_id' => ['nullable', 'integer'],
            'admission_id.id' => ['nullable'],
            'sibling_student_id' => ['nullable'],
            'is_have_sibling' => ['nullable'],
            //'admission_no' => ['required', 'unique:students,admission_no,' . $id],
            'admission_no' => ['required', 'string', Rule::unique('students', 'admission_no')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId());
            })->ignore($id)],
            'admission_date_at' => ['nullable'],
            'student_type' => ['nullable', 'string'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'phone' => ['nullable'],
            'email' => ['nullable', 'email'],
            //'email' => ['nullable', 'email', 'unique:students,email,' . $id],
            // 'roll_no' => ['nullable', 'string'],
            'boarding_type' => ['nullable', 'string'],
            'caste_type' => ['nullable', 'string'],
            'is_computer_option' => ['nullable', 'boolean'],
            'is_social_studies_option' => ['nullable', 'boolean'],
            'gender' => ['nullable', 'string'],
            'aadhar_card_no' => ['nullable'],
            'blood_group' => ['nullable', 'string'],
            'religion' => ['nullable', 'string'],
            'srn_no' => ['nullable'],
            'child_id' => ['nullable'],
            'samagra_id' => ['nullable'],
            'birth_place' => ['nullable', 'string'],
            'caste' => ['nullable', 'string'],
            'sub_caste' => ['nullable', 'string'],
            'mother_tongue' => ['nullable', 'string'],
            'medical_condition' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'birth_date_at' => ['nullable'],
            'date_at' => ['nullable'],
            'height' => ['nullable'],
            'weight' => ['nullable'],
            'present_address' => ['nullable', 'string'],
            'present_state' => ['nullable'],
            'present_city' => ['nullable', 'string'],
            'present_taluka' => ['nullable', 'string'],
            'present_district' => ['nullable', 'string'],
            'present_pin_code' => ['nullable', 'string'],
            'permanent_address' => ['nullable', 'string'],
            'permanent_state' => ['nullable'],
            'permanent_city' => ['nullable', 'string'],
            'permanent_taluka' => ['nullable', 'string'],
            'permanent_district' => ['nullable', 'string'],
            'permanent_pin_code' => ['nullable', 'string'],
            'is_physical_disabled' => ['nullable', 'boolean'],
            'is_economically_weaker' => ['nullable', 'boolean'],
            'is_spacial_child' => ['nullable', 'boolean'],
            'prev_school_name' => ['nullable', 'string'],
            'prev_school_class' => ['nullable', 'string'],
            'prev_school_year' => ['nullable', 'string'],
            'prev_school_note' => ['nullable', 'string'],
            'prev_school_tc_no' => ['nullable'],
            'is_inactive' => ['nullable', 'string'],
            'status' => ['required', 'string'],
            'is_have_sibling' => ['nullable', 'boolean'],
            'sibling_student_id' => ['nullable'],
            'category_id' => ['nullable', 'integer'],
            'country_id' => ['nullable', 'integer'],
            'admission_class' => ['nullable'],
            'f_first_name' => ['required', 'string'],
            'f_middle_name' => ['nullable', 'string'],
            'f_last_name' => ['nullable', 'string'],
            'f_email' => ['nullable', 'email'],
            // 'f_email' => ['required', 'email', 'unique:users,email,'. $id],
            'f_company_name' => ['nullable'],
            'f_phone' => ['required', 'string'],
            'f_sms_phone' => ['required', 'string'],
            'f_highest_qualification' => ['nullable', 'string'],
            'f_income_per_year' => ['nullable'],
            'f_department' => ['nullable', 'string'],
            'f_designation' => ['nullable', 'string'],
            'f_aadhar_card_no' => ['nullable'],
            'f_pan_card_no' => ['nullable'],
            'f_office_address' => ['nullable'],
            'm_first_name' => ['nullable', 'string'],
            'm_middle_name' => ['nullable', 'string'],
            'm_last_name' => ['nullable', 'string'],
            'm_email' => ['nullable', 'email'],
            'm_phone' => ['nullable'],
            'm_company_name' => ['nullable'],
            'm_sms_phone' => ['nullable', 'string'],
            'm_highest_qualification' => ['nullable', 'string'],
            'm_income_per_year' => ['nullable'],
            'm_department' => ['nullable', 'string'],
            'm_designation' => ['nullable', 'string'],
            'm_aadhar_card_no' => ['nullable'],
            'm_pan_card_no' => ['nullable'],
            'm_office_address' => ['nullable', 'string'],
            'g_first_name' => ['nullable', 'string'],
            'g_email' => ['nullable', 'email'],
            'g_phone' => ['nullable'],
            'g_relation' => ['nullable', 'string'],
            'g_highest_qualification' => ['nullable', 'string'],
            'g_occupation' => ['nullable', 'string'],
            'g_department' => ['nullable', 'string'],
            'g_designation' => ['nullable', 'string'],
            'g_aadhar_card_no' => ['nullable'],
            'g_id_no' => ['nullable'],
            'g_city' => ['nullable', 'string'],
            'g_address' => ['nullable', 'string'],
            'bank_id' => ['nullable'],
            'account_name' => ['nullable'],
            'account_type' => ['nullable'],
            'account_no' => ['nullable'],
            'ifsc_code' => ['nullable'],
            'micr_no' => ['nullable'],
            'branch_name' => ['nullable'],
            'father_type' => ['nullable'],
            'mother_type' => ['nullable'],
            'guardian_type' => ['nullable'],
            'document_attached' => ['nullable'],
            'student_profile_image' => 'nullable|image|max:5120|mimes:jpeg,png,jpg,gif', // 5MB max size and allowed extensions
            'student_father_profile_image' => 'nullable|image|max:5120|mimes:jpeg,png,jpg,gif',
            'student_mother_profile_image' => 'nullable|image|max:5120|mimes:jpeg,png,jpg,gif',
            'student_guardian_profile_image' => 'nullable|image|max:5120|mimes:jpeg,png,jpg,gif',
            'father_occupation_id' => ['nullable', 'integer'],
            'mother_occupation_id' => ['nullable', 'integer'],
            'optional_subjects' => ['nullable', 'array'],

            'student_house_id' => ['nullable'],
            'father_id' => 'nullable',
            'mother_id' => 'nullable',
            'guardian_id' => 'nullable',
            'student_bank_account_id' => ['nullable'],
            'student_category_id' => ['nullable'],
            'custom_fields' => ['nullable', 'array']
        ];
    }


    public function messages(): array
    {
        return [
            'fee_structure_id.required_if' => 'Fee group is required.',
            'classroom_id.required' => 'Class is required.',
            'classroom_id.integer' => 'Class is required.',
            'house_id.required' => 'House is required.',
            'house_id.integer' => 'House is required.',
            'admission_id.integer' => 'Admission no is required.',
            'admission_id.required' => 'Admission no is required.',
            'first_name.required' => 'First name is required.',
            'country_id.required' => 'Nationality is required.',
            'country_id.integer' => 'Nationality is required.',
            'f_sms_phone.required' => 'SMS number is required.',
            'status.required' => 'Status is required.',
            'status.required' => 'Status is required.',
            'f_phone.required' => 'Phone is required.',
            'f_first_name.required' => 'Name is required.',
            'category_id.required' => 'Category is required.',
            'category_id.integer' => 'Category is required.',
            'email.required' => 'Email is required.',
            'f_email.required' => 'Email is required.',
            'f_email.unique' => 'The email has already been taken.',

            // image message
            'student_profile_image.max' => 'Max size 2MB.',
            'student_profile_image.mimes' => 'Supported extensions are jpeg,png,jpg,gif.',
            'student_father_profile_image.max' => 'Max size 2MB.',
            'student_father_profile_image.mimes' => 'Supported extensions are jpeg,png,jpg,gif.',
            'student_mother_profile_image.max' => 'Max size 2MB.',
            'student_mother_profile_image.mimes' => 'Supported extensions are jpeg,png,jpg,gif.',
            'student_guardian_profile_image.max' => 'Max size 2MB.',
            'student_guardian_profile_image.mimes' => 'Supported extensions are jpeg,png,jpg,gif.',
        ];
    }
}
