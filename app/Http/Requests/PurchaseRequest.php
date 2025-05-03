<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
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
            'ledger_id' => ['required', 'integer'],
            'party_account_id' => ['required', 'integer'],
            'receipt_no' => ['required', 'integer'],
            'supplier_invoice_no' => ['nullable', 'string'],
            'purchase_date_at' => ['required', 'date'],
            'description' => ['nullable', 'string'],
            'products' => ['required', 'array'],
            'products.*.product_id' => ['required', 'integer'],
            'products.*.quantity' => ['required', 'integer'],
            'products.*.rate' => ['required', 'numeric'],
            'products.*.amount' => ['required', 'numeric'],
            'products.*.description' => ['nullable', 'string'],
            'sub_total' => ['required', 'numeric'],
            'grand_total' => ['required', 'numeric'],
            'discount_type' => ['nullable', 'string'],
            'discount_value' => ['nullable', 'numeric'],
            'discount_amount' => ['nullable', 'numeric'],
            'tax_amount' => ['nullable', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'ledger_id.required' => 'required',
            'party_account_id.required' => 'required',
            'receipt_no.required' => 'required',
            'purchase_date_at.required' => 'required',
            'products.required' => 'Please add products.',
            'products.*.product_id.required' => 'required',
            'products.*.quantity.required' => 'required',
            'products.*.rate.required' => 'required',
            'products.*.amount.required' => 'required',
            'sub_total.required' => 'required',
            'grand_total.required' => 'required',
        ];
    }
}
