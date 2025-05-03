<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleDuePaymentRequest extends FormRequest
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
            'audience_type' => ['required', 'string'],
            'staff_id' => ['exclude_unless:audience_type,Teacher', 'required_if:audience_type,Teacher', 'integer'],
            'student_id' => ['exclude_unless:audience_type,Student', 'required_if:audience_type,Student', 'integer'],
            'bank_ledger_id' => ['required', 'integer'],
            'payment_date' => ['required', 'date'],
            'transaction_no' => ['nullable', 'string'],
            'transaction_details' => ['nullable', 'string'],
            'transaction_date' => ['nullable', 'date'],
            'sale_ledger_id' => ['required', 'integer'],
            'paid_amount' => ['required', 'numeric', 'min:1'],
            'due_amount' => ['required', 'numeric'],
        ];
    }


    public function messages()
    {
        return [
            'staff_id.required_if' => 'Please select teacher',
            'student_id.required_if' => 'Please select student',
            'bank_ledger_id.required' => 'required',
            'payment_date.required' => 'required',
            'sale_ledger_id.required' => 'Please select any sale',
            'paid_amount.required' => "Paid Amount can't be zero",
            'paid_amount.min' => "Paid Amount can't be zero",
        ];
    }
}
