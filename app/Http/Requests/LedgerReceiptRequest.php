<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LedgerReceiptRequest extends FormRequest
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
            // 'account_group_id' => ['required', 'integer'],
            // 'receipt_no' => ['nullable'],
            // 'receipt_date_at' => ['required'],
            // 'description' => ['nullable', 'string'],
            // 'total' => ['nullable'],
            // 'items' => ['nullable'],
            // 'status' => ['nullable', 'string'],

            'school_id' => ['nullable', 'integer'],
            'bank_ledger_id' => ['required', 'integer'],
            'receipt_no' => ['nullable'],
            'receipt_date_at' => ['required'],
            'description' => ['required', 'string'],
            'total' => ['nullable'],
            'items' => ['required', 'array'],
            'items.*.ledger_id' => ['required', 'integer'],
            'items.*.amount' => ['required', 'numeric'],
            'items.*.description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            //old code
            // 'account_group_id.required' => 'Account group is required',
            // 'account_group_id.integer' => 'Account group is required',
            // 'receipt_date_at.required' => 'Receipt date is required',

            'bank_ledger_id.required' => 'Account group is required',
            'description.required' => 'required',
            'receipt_date_at.required' => 'Receipt date is required',
            'items.required' => 'Ledger is required',
            'items.*.ledger_id.required' => 'required',
            'items.*.ledger_id.amount' => 'required',
        ];
    }
}
