<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeePaymentRequest extends FormRequest
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
            'discount_id' => ['nullable', 'integer'],
            'fee_payment_type' => ['nullable', 'string'],
            'fee_installments_array' => ['required', 'array'],
            'fee_installments_array.*.id' => ['nullable'],
            'fee_installments_array.*.discount_id' => ['nullable'],
            'fee_installments_array.*.fee_id' => ['required'],
            'fee_installments_array.*.fee_type_id' => ['required'],
            'fee_installments_array.*.amount' => ['nullable'],
            'fee_installments_array.*.payable_amount' => ['nullable'],
            'fee_installments_array.*.paid_amount' => ['nullable'],
            'fee_installments_array.*.discount_amount' => ['nullable'],
            'fee_installments_array.*.fee_payment_type' => ['required'],
            'fee_installments_array.*.payment_status' => ['required'],
            'payment_mode' => ['required', 'string'],
            'payment_date' => ['required', 'date'],
            'school_receipt_no' => ['nullable', 'integer'],
            'payment_note' => ['nullable', 'string'],
            'cheque_no' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'cheque_date' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'date'],
            'cheque_amount' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'bank_id' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'branch' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'string'],
            'bank_account_id' => ['exclude_unless:payment_mode,Bank Process', 'required_if:payment_mode,Bank Process', 'integer'],
            'dd_bank' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'string'],
            'dd_number' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'integer'],
            'dd_date' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'date'],
            'dd_amount' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'integer'],
            'paytm_ref_no' => ['exclude_unless:payment_mode,Paytm', 'required_if:payment_mode,Paytm', 'integer'],
            'paytm_mobile' => ['exclude_unless:payment_mode,Paytm', 'required_if:payment_mode,Paytm', 'integer'],
            'neft_number' => ['exclude_unless:payment_mode,Neft', 'required_if:payment_mode,Neft', 'integer'],
            'neft_desc' => ['exclude_unless:payment_mode,Neft', 'required_if:payment_mode,Neft', 'string'],
            'transaction_id' => ['exclude_unless:payment_mode,Online Back Office', 'required_if:payment_mode,Online Back Office', 'integer'],
            'upi_transaction_id' => ['exclude_unless:payment_mode,UPI', 'required_if:payment_mode,UPI', 'integer'],
            'upi_description' => ['exclude_unless:payment_mode,UPI', 'required_if:payment_mode,UPI', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'fee_installments_array.required' => 'Please select at least one fee installment.',
            'payment_mode.required' => 'required',
            'payment_date.required' => 'required',
            'cheque_no.required_if' => 'required',
            'cheque_date.required_if' => 'required',
            'cheque_amount.required_if' => 'required',
            'bank_id.required_if' => 'required',
            'branch.required_if' => 'required',
            'bank_account_id.required_if' => 'required',
            'dd_bank.required_if' => 'required',
            'dd_number.required_if' => 'required',
            'dd_date.required_if' => 'required',
            'dd_amount.required_if' => 'required',
            'paytm_ref_no.required_if' => 'required',
            'paytm_mobile.required_if' => 'required',
            'neft_number.required_if' => 'required',
            'neft_desc.required_if' => 'required',
            'transaction_id.required_if' => 'required',
            'upi_transaction_id.required_if' => 'required',
            'upi_description.required_if' => 'required',
        ];
    }
}
