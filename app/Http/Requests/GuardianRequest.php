<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardianRequest extends FormRequest
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
            'user_id' => ['nullable', 'integer'],
            'student_id' => ['nullable', 'integer'],
            'first_name' => ['required', 'string', 'max:255'],
            'guardian_type' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'religion' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'email' => ['nullable','string'],
            'sms_phone' => ['nullable','string'],
            'highest_qualification' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string'],
            'income_per_year' => ['nullable', 'string'],
            'department' => ['nullable', 'string'],
            'designation' => ['nullable', 'string'],
            'aadhar_card_no' => ['nullable', 'string'],
            'pan_card_no' => ['nullable', 'string'],
            'company_name' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'office_address' => ['nullable', 'string'],
            'is_inactive' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
