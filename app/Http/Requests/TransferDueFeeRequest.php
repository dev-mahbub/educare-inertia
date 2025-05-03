<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransferDueFeeRequest extends FormRequest
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
            'academic_year_id' => ['required', 'integer'],
            'late_fee' => ['nullable', 'boolean'],
            'late_fee_date' => ['exclude_unless:late_fee,true', 'required_if:late_fee,true', 'date'],
            'classroom_ids' => ['required', 'array'],
        ];
    }


    public function messages()
    {
        return [
            'academic_year_id.required' => 'required',
            'late_fee_date.required_if' => 'required',
            'classroom_ids.required' => 'Please select at least one class.',
        ];
    }
}
