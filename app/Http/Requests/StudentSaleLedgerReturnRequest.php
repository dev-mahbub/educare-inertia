<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StudentSaleLedgerReturnRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // old code
            // 'school_id' => ['nullable', 'integer'],
            // 'student_id' => ['required', 'integer'],
            // 'ledger_id' => ['required', 'integer'],
            // 'classroom_id' => ['required', 'integer'],
            // 'products' => ['required', 'array'],
            // 'receipt_no' => ['nullable'],
            // 'sale_invoice_no' => ['required'],
            // 'return_date_at' => ['nullable'],
            // 'admission_no' => ['nullable'],
            // 'father_name' => ['nullable'],
            // 'father_phone' => ['nullable'],
            // 'item_total_amount_total' => ['nullable'],
            // 'item_discount_value_total' => ['nullable'],
            // 'item_tax_amount_total' => ['nullable'],
            // 'item_total' => ['nullable'],
            // 'is_print_receipt' => ['nullable', 'boolean'],
            // 'paid_type' => ['nullable', 'string'],
            // 'payment_type' => ['nullable', 'string'],
            // 'transaction_no' => ['nullable'],
            // 'transaction_desc' => ['nullable', 'string'],
            // 'transaction_date' => ['nullable'],
            // 'description' => ['nullable', 'string'],
            // 'status' => ['nullable', 'string'],

            'school_id' => ['nullable', 'integer'],
            'student_id' => ['required', 'integer'],
            'ledger_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'products' => ['required', 'array'],
            'products.*.product_id' => ['required', 'integer'],
            'products.*.quantity' => ['required', 'integer'],
            'products.*.rate' => ['required', 'numeric', 'min:1'],
            'products.*.description' => ['nullable', 'string'],
            'receipt_no' => ['required', 'integer'],
            'sale_invoice_no' => ['required', Rule::exists('sale_ledgers', 'invoice_no')->where(function ($query) {
                $query->where('school_id', getUserSchoolId())
                    ->where('sale_type_for', 'Student');
            })],
            'return_date_at' => ['required', 'date'],
            'admission_no' => ['nullable', 'string'],
            'father_name' => ['nullable', 'string'],
            'father_phone' => ['nullable', 'string'],
            'item_total_amount_total' => ['nullable', 'numeric'],
            'item_discount_value_total' => ['nullable', 'numeric'],
            'item_tax_amount_total' => ['nullable', 'numeric'],
            'item_total' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'student_id.required' => 'required',
            'ledger_id.required' => 'required',
            'classroom_id.required' => 'required',
            'products.required' => 'Please add product.',
            'products.*.product_id.required' => 'required',
            'products.*.quantity.required' => 'required',
            'products.*.rate.required' => 'required',
            'sale_invoice_no.required' => 'required',
            'sale_invoice_no.exists' => 'Sale receipt number entered wrong!',
        ];
    }
}
