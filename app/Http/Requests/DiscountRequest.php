<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class DiscountRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                Rule::unique('student_fee_vouchers', 'title')
                    ->ignore($this->route('studentFeeVoucher'))
            ],
            'description' => ['nullable', 'string', 'max:255'],
            'is_discount_percentage' => ['nullable', 'boolean'],
            'fee_type_amount_array' => ['required', 'array'],
            'fee_type_amount_array.*.fee_type_id' => ['required', 'integer'],
            'fee_type_amount_array.*.amount' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'fee_type_amount_array.*.amount.required' => 'required',
            'fee_type_amount_array.*.amount.integer' => 'must be an integer',
        ];
    }
}
