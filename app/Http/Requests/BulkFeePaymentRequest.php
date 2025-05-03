<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkFeePaymentRequest extends FormRequest
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
            'student_data_array' => ['required', 'array'],
            'student_data_array.*.student_id' => ['required', 'integer'],
            'student_data_array.*.fee_installments_array' => ['required', 'array'],
            'student_data_array.*.fee_installments_array.*.id' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.discount_id' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.fee_id' => ['required'],
            'student_data_array.*.fee_installments_array.*.fee_type_id' => ['required'],
            'student_data_array.*.fee_installments_array.*.amount' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.payable_amount' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.paid_amount' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.discount_amount' => ['nullable'],
            'student_data_array.*.fee_installments_array.*.payment_status' => ['required'],
            'student_data_array.*.payment_mode' => ['required', 'string'],
            'student_data_array.*.payment_date' => ['required', 'date'],
            'student_data_array.*.school_receipt_no' => ['nullable', 'integer'],
            'student_data_array.*.payment_note' => ['nullable', 'string'],
            'student_data_array.*.cheque_no' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'student_data_array.*.cheque_date' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'date'],
            'student_data_array.*.cheque_amount' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'student_data_array.*.bank_id' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'integer'],
            'student_data_array.*.branch' => ['exclude_unless:payment_mode,Cheque', 'required_if:payment_mode,Cheque', 'string'],
            'student_data_array.*.bank_account_id' => ['exclude_unless:payment_mode,Bank Process', 'required_if:payment_mode,Bank Process', 'integer'],
            'student_data_array.*.dd_bank' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'string'],
            'student_data_array.*.dd_number' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'integer'],
            'student_data_array.*.dd_date' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'date'],
            'student_data_array.*.dd_amount' => ['exclude_unless:payment_mode,Demand Draft', 'required_if:payment_mode,Demand Draft', 'integer'],
            'student_data_array.*.paytm_ref_no' => ['exclude_unless:payment_mode,Paytm', 'required_if:payment_mode,Paytm', 'integer'],
            'student_data_array.*.paytm_mobile' => ['exclude_unless:payment_mode,Paytm', 'required_if:payment_mode,Paytm', 'integer'],
            'student_data_array.*.neft_number' => ['exclude_unless:payment_mode,Neft', 'required_if:payment_mode,Neft', 'integer'],
            'student_data_array.*.neft_desc' => ['exclude_unless:payment_mode,Neft', 'required_if:payment_mode,Neft', 'string'],
            'student_data_array.*.upi_transaction_id' => ['exclude_unless:payment_mode,UPI', 'required_if:payment_mode,UPI', 'integer'],
            'student_data_array.*.upi_description' => ['exclude_unless:payment_mode,UPI', 'required_if:payment_mode,UPI', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'student_data_array.required' => 'Please select at least one student.',
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
            'upi_transaction_id.required_if' => 'required',
            'upi_description.required_if' => 'required',
        ];
    }
}
