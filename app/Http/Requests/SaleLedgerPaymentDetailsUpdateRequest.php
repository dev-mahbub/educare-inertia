<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleLedgerPaymentDetailsUpdateRequest extends FormRequest
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
            'description' => ['required', 'string'],
            'receipt_date' => ['required', 'date'],
        ];
    }

    public function messages()
    {
        return [
            'description.required' => 'required',
            'receipt_date.required' => 'required',
        ];
    }
}
