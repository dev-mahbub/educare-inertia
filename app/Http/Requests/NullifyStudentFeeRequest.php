<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NullifyStudentFeeRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'fee_ids' => ['required', 'array'],
            'fee_ids.*' => ['required', 'integer'],
            'status_date_at' => ['required', 'date'],
            'reason' => ['required', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'student_id.required' => 'required',
            'fee_ids.required' => 'Please select at least one fee installment.',
            'status_date_at.required' => 'required',
            'reason.required' => 'required',
        ];
    }
}
