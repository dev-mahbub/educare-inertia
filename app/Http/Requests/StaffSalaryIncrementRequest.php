<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffSalaryIncrementRequest extends FormRequest
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
            'basic_amount' => ['required', 'numeric', 'min:0'],
            'earnings' => ['nullable', 'array'],
            'earnings.*.earning_type_id' => ['required', 'integer'],
            'earnings.*.expression' => ['nullable'],
            'earnings.*.amount' => ['required', 'numeric'],
            'earnings.*.increment_type' => ['nullable', 'string'],
            'earnings.*.increment_value' => ['nullable', 'numeric'],
            'earnings.*.increment_amount' => ['nullable', 'numeric'],
            'earnings.*.total_amount' => ['nullable', 'numeric'],
            'increment_date' => ['required', 'date'],
            'increment_note' => ['nullable', 'string']
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'basic_amount.required' => 'required',
            'earnings.required' => 'required',
            'increment_date.required' => 'required',
        ];
    }
}
