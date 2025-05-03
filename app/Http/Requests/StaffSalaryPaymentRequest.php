<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffSalaryPaymentRequest extends FormRequest
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
            'earnings' => ['nullable', 'array'],
            'deductions' => ['nullable', 'array'],
            'payment_mode' => ['required', 'string'],
            'payment_date' => ['required', 'date'],
            'payment_note' => ['nullable', 'string'],
            'total_earning_amount' => ['nullable', 'numeric'],
            'total_deduction_amount' => ['nullable', 'numeric'],
            'advance_deducted_amount' => ['nullable', 'numeric'],
            'paid_due_amount' => ['nullable', 'numeric'],
            'bonus_amount' => ['nullable', 'numeric'],
            'advance_amount' => ['nullable', 'numeric'],
            'payable_amount' => ['required', 'numeric'],
            'paid_amount' => ['required', 'numeric'],
            'due_amount' => ['required', 'numeric'],
            'cheque_no' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'cheque_date' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'date'],
            'bank_id' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'branch' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'string'],
            'bank_account_id' => ['exclude_unless:payment_mode,Bank Process', 'required_if:payment_mode,Bank Process', 'integer'],
            'deduction_message' => ['nullable', 'string'],
            'absent_deductions' => ['nullable', 'array'],
            'extra_duties' => ['nullable', 'array'],
            'extra_duty_amount' => ['nullable', 'numeric'],
            'absent_deduction_amount' => ['nullable', 'numeric'],
            'total_leave' => ['nullable', 'numeric'],
            'leave_balance' => ['nullable', 'numeric'],
            'total_absent' => ['nullable', 'numeric'],
            'total_extra_duty' => ['nullable', 'numeric'],
            'total_paid_extra_duty' => ['nullable', 'numeric'],
            'total_previous_extra_duty' => ['nullable', 'numeric'],
            'total_deducted_absent' => ['nullable', 'numeric'],
            'total_previous_absent_deduction' => ['nullable', 'numeric'],
            'basic_pay' => ['nullable', 'numeric'],
            'grade_pay' => ['nullable', 'numeric']
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'payment_month_id.required' => 'required',
            'payment_mode.required' => 'required',
            'payment_date.required' => 'required',
            'payable_amount.required' => 'required',
            'paid_amount.required' => 'required',
            'due_amount.required' => 'required',
            'payment_mode.required' => 'required',
            'payment_date.required' => 'required',
            'cheque_no.required_if' => 'required',
            'cheque_date.required_if' => 'required',
            'bank_id.required_if' => 'required',
            'branch.required_if' => 'required',
            'bank_account_id.required_if' => 'required',
        ];
    }
}
