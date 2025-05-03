<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JournalRequest extends FormRequest
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
            'journal_date' => ['required', 'date'],
            'journal_entries' => ['required', 'array'],
            'journal_entries.*.mode' => ['required', 'string'],
            'journal_entries.*.ledger_id' => ['required', 'integer'],
            'journal_entries.*.debit_amount' => ['nullable', 'required_unless:journal_entries.*.mode,To', 'numeric'],
            'journal_entries.*.credit_amount' => ['nullable', 'required_unless:journal_entries.*.mode,By', 'numeric'],
            'debit_amount' => ['nullable', 'numeric'],
            'credit_amount' => ['nullable', 'numeric'],
            'total_amount' => ['required', 'numeric'],
            'description' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            'journal_date.required' => 'required',
            'description.required' => 'required',
        ];
    }
}
