<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkProcessSalaryRequest extends FormRequest
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
            'payment_month_id' => ['required', 'integer'],
            'payment_mode' => ['required', 'string'],
            'payment_date' => ['required', 'date'],
            'payment_note' => ['nullable', 'string'],
            'cheque_no' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'cheque_date' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'date'],
            'bank_id' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'branch' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'string'],
            'bank_account_id' => ['exclude_unless:payment_mode,Bank Process', 'required_if:payment_mode,Bank Process', 'integer'],
            'staff_earnings' => ['required', 'array'],
            'staff_earnings.*.staff_id' => ['required', 'integer'],
            'staff_earnings.*.earnings' => ['nullable', 'array'],
            'staff_earnings.*.deductions' => ['nullable', 'array'],
            'staff_earnings.*.total_earning_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.total_deduction_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.advance_deducted_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.paid_due_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.bonus_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.advance_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.payable_amount' => ['required', 'numeric'],
            'staff_earnings.*.paid_amount' => ['required', 'numeric'],
            'staff_earnings.*.due_amount' => ['required', 'numeric'],
            'staff_earnings.*.absent_deductions' => ['nullable', 'array'],
            'staff_earnings.*.extra_duties' => ['nullable', 'array'],
            'staff_earnings.*.extra_duty_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.absent_deduction_amount' => ['nullable', 'numeric'],
            'staff_earnings.*.total_leave' => ['nullable', 'numeric'],
            'staff_earnings.*.leave_balance' => ['nullable', 'numeric'],
            'staff_earnings.*.total_absent' => ['nullable', 'numeric'],
            'staff_earnings.*.total_extra_duty' => ['nullable', 'numeric'],
            'staff_earnings.*.total_paid_extra_duty' => ['nullable', 'numeric'],
            'staff_earnings.*.total_previous_extra_duty' => ['nullable', 'numeric'],
            'staff_earnings.*.total_deducted_absent' => ['nullable', 'numeric'],
            'staff_earnings.*.total_previous_absent_deduction' => ['nullable', 'numeric'],
            'staff_earnings.*.basic_pay' => ['nullable', 'numeric'],
            'staff_earnings.*.grade_pay' => ['nullable', 'numeric']
        ];
    }

    public function messages()
    {
        return [
            'payment_month_id.required' => 'required',
            'payment_mode.required' => 'required',
            'payment_date.required' => 'required',
            'payment_note.required' => 'required',
            'cheque_no.required_if' => 'required',
            'cheque_date.required_if' => 'required',
            'bank_id.required_if' => 'required',
            'branch.required_if' => 'required',
            'bank_account_id.required_if' => 'required',
        ];
    }
}
