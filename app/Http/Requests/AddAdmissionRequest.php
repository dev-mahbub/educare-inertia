<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AddAdmissionRequest extends FormRequest
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
            'fee_structure_id' => ['required_if:fee_structure_setting,Yes'],
            'admission_type' => ['required', 'in:Provisional,Permanent'],
            'date_of_admission' => ['required', 'date'],
            'house_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'first_name' => ['required', 'string'],
            'middle_name' => ['nullable'],
            'last_name' => ['nullable'],
            'gender' => ['required'],
            'blood_group' => ['nullable'],
            'date_of_birth' => ['nullable'],
            'religion' => ['nullable'],
            'category_id' => ['nullable'],
            'contact_number' => ['nullable'],
            'aadhar_card_no' => ['nullable'],
            'father_first_name' => ['required', 'max:50'],
            'father_middle_name' => ['nullable', 'max:50'],
            'father_last_name' => ['nullable', 'max:50'],
            'father_email' => ['required', 'email'],
            'father_mobile' => ['required', 'max:50'],
            'sms_number' => ['nullable'],
            'father_highest_qualification' => ['nullable', 'max:50'],
            'father_occupation' => ['nullable', 'max:50'],
            'father_income_per_year' => ['nullable'],
            'father_aadhar_card_no' => ['nullable', 'max:50'],
            'father_pan_card_no' => ['nullable', 'max:50'],
            'mother_first_name' => ['required', 'max:50'],
            'mother_middle_name' => ['nullable', 'max:50'],
            'mother_last_name' => ['nullable', 'max:50'],
            'mother_email' => ['nullable', 'email', 'max:50'],
            'mother_mobile' => ['nullable', 'max:50'],
            'mother_highest_qualification' => ['nullable', 'max:50'],
            'mother_occupation' => ['nullable', 'max:50'],
            'mother_income_per_year' => ['nullable', 'max:50'],
            'mother_aadhar_card_no' => ['nullable', 'max:50'],
            'mother_pan_card_no' => ['nullable', 'max:50'],
            'present_address' => ['nullable', 'max:50'],
            'present_state' => ['nullable', 'max:50'],
            'city' => ['nullable', 'max:50'],
            'pin_code' => ['nullable', 'max:50'],
            'permanent_address' => ['nullable', 'max:50'],
            'permanent_state' => ['nullable', 'max:50'],
            'permanent_city' => ['nullable', 'max:50'],
            'permanent_pin_code' => ['nullable', 'max:50'],
            'document_attached' => ['nullable'],
        ];
    }
}
