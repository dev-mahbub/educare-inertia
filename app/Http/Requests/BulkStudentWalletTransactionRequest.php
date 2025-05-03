<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStudentWalletTransactionRequest extends FormRequest
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
            'transaction_date' => ['required', 'date'],
            'student_data' => ['required', 'array'],
            'student_data.*.student_id' => ['required', 'integer'],
            'student_data.*.deduction_amount' => ['required', 'numeric', 'min:1'],
            'student_data.*.description' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'transaction_date.required' => 'Please select date',
            'student_data.required' => 'Please enter deduction amount of atleast one student',
            'student_data.*.deduction_amount.min' => 'Please enter deduction amount of atleast one student'
        ];
    }
}
