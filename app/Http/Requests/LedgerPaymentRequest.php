<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LedgerPaymentRequest extends FormRequest
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
            // 'account_group_id' => ['required', 'integer'],
            // 'payment_mode' => ['required', 'string'],
            'bank_ledger_id' => ['required', 'integer'],
            'receipt_no' => ['nullable'],
            'payment_date_at' => ['required'],
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
            'bank_ledger_id.required' => 'Account group is required',
            'description.required' => 'required',
            // 'account_group_id.integer' => 'Account group is required',
            'payment_date_at.required' => 'Payment date is required',
            'items.required' => 'Ledger is required',
            'items.*.ledger_id.required' => 'required',
            'items.*.ledger_id.amount' => 'required',
        ];
    }
}
