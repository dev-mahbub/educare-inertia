<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeePaymentRefundRequest extends FormRequest
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
            'fee_payment_refund_array' => ['required', 'array'],
            'fee_payment_refund_array.*.fee_type_id' => ['required', 'integer'],
            'fee_payment_refund_array.*.refund_amount' => ['required', 'numeric', 'min:1'],
            'refund_mode' => ['required', 'string'],
            'refund_date' => ['required', 'date'],
            'refund_note' => ['required', 'string'],
            'cheque_no' => ['exclude_unless:refund_mode,Cheque', 'required_if:refund_mode,Cheque', 'integer'],
            'cheque_date' => ['exclude_unless:refund_mode,Cheque', 'required_if:refund_mode,Cheque', 'date'],
            'cheque_amount' => ['exclude_unless:refund_mode,Cheque', 'required_if:refund_mode,Cheque', 'integer'],
            'bank_id' => ['exclude_unless:refund_mode,Cheque', 'required_if:refund_mode,Cheque', 'integer'],
            'branch' => ['exclude_unless:refund_mode,Cheque', 'required_if:refund_mode,Cheque', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'fee_payment_refund_array' => 'Please select at least one fee type.',
            'fee_payment_refund_array.*.fee_type_id.required' => 'Please select at least one fee type.',
            'fee_payment_refund_array.*.refund_amount.required' => 'Refund amount value is required.',
            'fee_payment_refund_array.*.refund_amount.numeric' => 'Refund amount value must be numeric.',
            'fee_payment_refund_array.*.refund_amount.min' => 'Refund amount value cannot be empty or 0.',
            'refund_mode.required' => 'required',
            'refund_date.required' => 'required',
            'refund_note.required' => 'required',
            'cheque_no.required_if' => 'required',
            'cheque_date.required_if' => 'required',
            'cheque_amount.required_if' => 'required',
            'bank_id.required_if' => 'required',
            'branch.required_if' => 'required',
        ];
    }
}
