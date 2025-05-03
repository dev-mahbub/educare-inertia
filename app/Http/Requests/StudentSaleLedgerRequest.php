<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentSaleLedgerRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'student_id' => ['required', 'integer'],
            'ledger_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'products' => ['required', 'array'],
            'products.*.product_id' => ['required', 'integer'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
            'products.*.rate' => ['required', 'numeric', 'min:1'],
            'products.*.item_discount_value' => ['nullable', 'numeric'],
            'products.*.item_discount_amount' => ['nullable', 'numeric'],
            'products.*.item_tax_amount' => ['nullable', 'numeric'],
            'products.*.item_total_amount' => ['nullable', 'numeric'],
            'sale_date_at' => ['required', 'date'],
            'admission_no' => ['nullable'],
            'father_name' => ['nullable'],
            'father_phone' => ['nullable'],
            'item_total_amount_total' => ['nullable'],
            'item_discount_value_total' => ['nullable'],
            'item_tax_amount_total' => ['nullable'],
            'item_total' => ['nullable'],
            'is_print_receipt' => ['nullable', 'boolean'],
            'paid_type' => ['required', 'string'],
            // 'payment_type' => ['exclude_unless:paid_type,Paid', 'required_if:paid_type,Paid', 'string'],
            'bank_ledger_id' => ['exclude_unless:paid_type,Paid', 'required_if:paid_type,Paid', 'string'],
            'transaction_no' => ['nullable'],
            'transaction_desc' => ['nullable', 'string'],
            'transaction_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'discount_type' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'sale_date_at.required' => 'required',
            'ledger_id.required' => 'Ledger is required.',
            'student_id.integer' => 'Student is required.',
            'classroom_id.required' => 'Class is required.',
            'products.required' => 'Product is required.',
            'products.*.product_id.required' => 'required',
            'products.*.quantity.required' => 'required',
            'products.*.quantity.min' => 'required',
            'products.*.rate.required' => 'required',
            'products.*.rate.min' => 'required',
            'paid_type.required' => 'required',
            'bank_ledger_id.required_if' => 'required',
        ];
    }
}
