<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdjustFeeRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'from_fee_id' => ['required', 'integer'],
            'to_fee_id' => ['required', 'integer'],
            'adjust_amount_array' => ['required', 'array'],
            'adjust_amount_array.*.fee_type_id' => ['required', 'integer'],
            'adjust_amount_array.*.adjust_amount' => ['required', 'numeric', 'min:1'],
            'adjust_amount_array.*.is_fee_special' => ['required', 'boolean'],
            'adjust_date' => ['required', 'date'],
            'adjust_note' => ['required', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'student.required' => 'required.',
            'from_fee_id.required' => 'required.',
            'to_fee_id.required' => 'required.',
            'adjust_amount_array.required' => 'Adjust fee cannot be empty.',
            'adjust_amount_array.*.fee_type_id.required' => 'Adjust fee type id is required.',
            'adjust_amount_array.*.adjust_amount.required' => 'Adjust fee amount is required.',
            'adjust_amount_array.*.adjust_amount.numeric' => 'Adjust amount must be numeric.',
            'adjust_amount_array.*.adjust_amount.min' => 'Adjust amount must be greater than 0.',
            'adjust_date.required' => 'required',
            'adjust_note.required' => 'required',
        ];
    }
}
