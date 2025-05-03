<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NullifyFeeRequest extends FormRequest
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
            'fee_ids' => ['required', 'array'],
            'fee_ids.*' => ['required', 'integer'],
            'nullify_date' => ['required', 'date'],
            'nullify_reason' => ['required', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'student_id.required' => 'Please select a student.',
            'fee_ids.required' => 'Please select at least one fee installment.',
            'nullify_date.required' => 'required',
            'nullify_reason.required' => 'required',
        ];
    }
}
