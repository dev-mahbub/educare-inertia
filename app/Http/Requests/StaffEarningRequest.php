<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffEarningRequest extends FormRequest
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
            'staff_id' => ['required', 'integer'],
            'pay_scale_id' => ['required', 'integer'],
            'basic_pay' => ['required', 'numeric', 'min:0'],
            'grade_pay' => ['required', 'numeric', 'min:0'],
            'net_salary' => ['required', 'numeric', 'min:0'],
            'earnings' => ['nullable', 'array'],
            'earnings.*.earning_type_id' => ['nullable', 'integer'],
            'earnings.*.expression' => ['nullable', 'string'],
            'earnings.*.description' => ['nullable', 'string'],
            'earnings.*.amount' => ['nullable', 'numeric'],
            'deductions' => ['nullable', 'array'],
            'deductions.*.deduction_type_id' => ['nullable', 'integer'],
            'deductions.*.expression' => ['nullable', 'string'],
            'deductions.*.description' => ['nullable', 'string'],
            'deductions.*.amount' => ['nullable', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'pay_scale_id.required' => 'required',
            'basic_pay.required' => 'required',
            'basic_pay.numeric' => 'must be numeric',
            'basic_pay.min' => 'required',
            'grade_pay.required' => 'required',
            'grade_pay.numeric' => 'must be numeric',
            'grade_pay.min' => 'required',
        ];
    }
}
