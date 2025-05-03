<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookPurchaseRequest extends FormRequest
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
            'bank_id' => ['nullable', 'integer'],
            'bill_number' => ['required'],
            'purchase_date_at' => ['required', 'date'],
            'library_vendor_id' => ['nullable', 'integer'],
            'book_type_id' => ['nullable', 'integer'],
            'purchase_by' => ['nullable', 'string'],
            'payment_mode' => ['required', 'string'],
            'cheque_no' => ['nullable'],
            'cheque_date_at' => ['nullable', 'date'],
            'amount' => ['nullable', 'numeric'],
            'branch' => ['nullable', 'string'],
            'transaction_no' => ['nullable'],
            'purchase_note' => ['nullable', 'string'],

            // book item
            'discount_type' => ['nullable', 'string'],
            'discount_amount' => ['nullable', 'numeric'],
            'tax_amount' => ['nullable', 'numeric'],
            'discount' => ['nullable', 'numeric'],
            'grand_total' => ['nullable', 'numeric'],
            'grace_total_price' => ['nullable', 'numeric'],
            'book_items' => ['required', 'array'],
            'status' => ['nullable', 'string'],

            'book_items.*.category_id' => ['nullable'],
            'book_items.*.class_name_id' => ['nullable'],
            'book_items.*.subject_id' => ['nullable'],
            'book_items.*.book_title' => ['required', 'string'],
            'book_items.*.author' => ['nullable'],
            'book_items.*.quantity' => ['nullable', 'numeric'],
            'book_items.*.price' => ['nullable', 'numeric'],
            'book_items.*.item_total_price' => ['nullable', 'numeric'],
        ];
    }
}
