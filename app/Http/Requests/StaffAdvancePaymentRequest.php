<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffAdvancePaymentRequest extends FormRequest
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
            'staff_id' => ['required', 'integer'],
            'payment_month_id' => ['required', 'integer'],
            'payment_mode' => ['required', 'string'],
            'amount' => ['required', 'numeric', 'min:0'],
            'payment_date' => ['required', 'date'],
            'payment_note' => ['nullable', 'string'],
            'cheque_no' => ['nullable', 'integer'],
            'cheque_date' => ['nullable', 'date'],
            'bank_id' => ['nullable', 'integer'],
            'branch' => ['nullable', 'string'],
            // 'cheque_no' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            // 'cheque_date' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'date'],
            // 'bank_id' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            // 'branch' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'payment_month_id.required' => 'required',
            'payment_mode.required' => 'required',
            'amount.required' => 'required',
            'amount.min' => 'required',
            'payment_date.required' => 'required',
            // 'cheque_no.required_if' => 'required',
            // 'cheque_date.required_if' => 'required',
            // 'bank_id.required_if' => 'required',
            // 'branch.required_if' => 'required',
        ];
    }
}
