<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublishStaffSalaryPaymentRequest extends FormRequest
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
            'staff_salary_payment_ids' => ['required', 'array'],
            'staff_salary_payment_ids.*' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'staff_salary_payment_id.required' => 'Please select at least one payment!'
        ];
    }
}
