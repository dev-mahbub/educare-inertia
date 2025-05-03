<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDiscountRequest extends FormRequest
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
            'student_ids' => ['required', 'array'],
            'fee_ids' => ['required', 'array'],
            'discount_id' => ['required', 'integer'],
            'is_discount_percentage' => ['required', 'boolean'],
            'fee_type_amount_array' => ['required', 'array'],
            'fee_type_amount_array.*.fee_type_id' => ['required', 'integer'],
            'fee_type_amount_array.*.amount' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'student_ids.required' => 'Please select at least one student.',
            'discount_id.required' => 'Please select a discount.',
            'fee_ids.required' => 'Please select at least one fee',
            'fee_type_amount_array.required' => 'Please select at least one fee type',
            'fee_type_amount_array.*.amount.required' => 'Selected fee amount is required',
            'fee_type_amount_array.*.amount.integer' => 'Selected fee amount must be an integer',
        ];
    }
}
