<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeeAssignRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'special_fee_array' => ['required', 'array'],
            'special_fee_array.*.special_fee_type' => ['required', 'integer'],
            'special_fee_array.*.special_fee_type_amount' => ['required', 'numeric', 'min:1'],
            'selected_fee_ids' => ['required', 'array'],
            'selected_student_ids' => ['required', 'array'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'class_name_id.required' => 'Please select a class.',
            'special_fee_array.required' => 'Please select at least one fee type.',
            'special_fee_array.*.special_fee_type.required' => 'Please select at least one fee type.',
            'special_fee_array.*.special_fee_type_amount.required' => 'Fee type amount cannot be empty.',
            'special_fee_array.*.special_fee_type_amount.numeric' => 'Fee type amount must be a numeric value.',
            'special_fee_array.*.special_fee_type_amount.min' => 'Fee type amount cannot be empty.',
            'selected_fee_ids.required' => 'Please select at least one fee installment.',
            'selected_student_ids.required' => 'Please select at least one student.',
        ];
    }
}
