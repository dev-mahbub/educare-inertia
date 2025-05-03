<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StaffRequest extends FormRequest
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
    /* School keywise unique
    'email' => ['required',
    Rule::unique('staff', 'email')->where(function ($query) {
        return $query->where('school_id', getUserSchoolId());
    })],
    */
    public function rules(): array
    {
        $id = $this->route('id');
        return [
            'school_id' => ['nullable'],
            'user_id' => ['nullable'],
            'user_roll_type' => ['required', 'string'],
            'state_id' => ['nullable'],
            'house_id' => ['nullable'],
            'category_id' => ['nullable'],
            'religion_id' => ['nullable'],
            'department_id' => ['nullable'],
            'designation_id' => ['nullable'],
            'blood_group_id' => ['nullable'],
            'employee_id' => ['nullable'],
            'employment_category_id' => ['nullable'],
            'staff_category_id' => ['nullable'],
            'staff_sub_category_id' => ['nullable'],
            'staff_type' => ['nullable'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'father_name' => ['nullable', 'string'],
            'spouse_name' => ['nullable', 'string'],
            'gender' => ['required', 'string'],
            'city' => ['nullable', 'string'],
            'join_date_at' => ['nullable'],
            'leave_date_at' => ['nullable'],
            'birth_date_at' => ['nullable'],
            'job_type' => ['nullable'],
            'pan_number' => ['nullable'],
            'qualification' => ['nullable'],
            'voter_card_no' => ['nullable'],
            'aadhar_card_no' => ['nullable'],
            'oasis_id' => ['nullable'],
            'address' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'bank_name' => ['nullable', 'string'],
            'bank_account_no' => ['nullable'],
            'uan' => ['nullable'],
            'ifsc' => ['nullable'],
            'pf_account_number' => ['nullable'],
            'experience_year' => ['nullable'],
            'esic_no' => ['nullable'],
            'status' => ['nullable', 'string'],
            'custom_fields' => ['nullable', 'array']

            // extra field
            // 'religion' => ['nullable', 'string'],
            // 'srn_no' => ['nullable', 'string'],
            // 'samagra_id' => ['nullable', 'string'],
            // 'birth_place' => ['nullable', 'string'],
            // 'caste' => ['nullable', 'string'],
            // 'sub_caste' => ['nullable', 'string'],
            // 'employment' => ['nullable', 'string'],
            // 'mother_tongue' => ['nullable', 'string'],
            // 'medical_condition' => ['nullable', 'string'],
            // 'notes' => ['nullable', 'string'],
            // 'birth_date_at' => ['nullable', 'string'],
            // 'date_at' => ['nullable', 'string'],
            // 'height' => ['nullable', 'string'],
            // 'weight' => ['nullable', 'string'],
            // 'present_address' => ['nullable', 'string'],
            // 'present_state' => ['nullable', 'string'],
            // 'present_city' => ['nullable', 'string'],
            // 'present_taluka' => ['nullable', 'string'],
            // 'present_district' => ['nullable', 'string'],
            // 'present_pin_code' => ['nullable', 'string'],
            // 'permanent_address' => ['nullable', 'string'],
            // 'permanent_state' => ['nullable', 'string'],
            // 'permanent_city' => ['nullable', 'string'],
            // 'permanent_taluka' => ['nullable', 'string'],
            // 'permanent_district' => ['nullable', 'string'],
            // 'permanent_pin_code' => ['nullable', 'string'],
            // 'is_physical_disabled' => ['nullable', 'string'],
            // 'is_economically_weaker' => ['nullable', 'string'],
            // 'prev_school_name' => ['nullable', 'string'],
            // 'prev_school_class' => ['nullable', 'string'],
            // 'prev_school_year' => ['nullable', 'string'],
            // 'prev_school_note' => ['nullable', 'string'],
            // 'prev_school_tc_no' => ['nullable', 'string'],
            // 'is_inactive' => ['nullable', 'boolean'],
            // 'status' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'First name is required',
            'user_roll_type.required' => 'Roll is required',
            'user_roll_type.string' => 'Roll is required',
            'gender.required' => 'Gender is required',
            'email.required' => 'Email is required',
        ];
    }
}
