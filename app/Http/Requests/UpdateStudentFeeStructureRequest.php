<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentFeeStructureRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'student_id' => ['required', 'integer'],
            'is_admission_installment' => ['required', 'boolean'],
            'fee_type_amount_array' => ['required', 'array'],
            'fee_type_amount_array.*.fee_id' => ['required', 'integer'],
            'fee_type_amount_array.*.fee_type_id' => ['required', 'integer'],
            'fee_type_amount_array.*.amount' => ['required', 'integer'],
            'fee_type_amount_array.*.is_fee_special' => ['required', 'boolean'],
        ];
    }


    public function messages()
    {
        return [
            'fee_type_amount_array.required' => 'Please select at least one fee type.',
            'fee_type_amount_array.*.amount.required' => 'Selected fee type amount is required.',
            'fee_type_amount_array.*.amount.integer' => 'Selected fee type amount must be integer.',
        ];
    }
}
