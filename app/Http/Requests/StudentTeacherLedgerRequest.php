<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentTeacherLedgerRequest extends FormRequest
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
            'ledger_type' => ['required', 'string'],
            'selected_ids' => ['required', 'array']
        ];
    }

    public function messages()
    {
        return [
            'ledger_type.required' => 'Please select type!',
            'selected_ids.required' => 'Please select atleast one!',
        ];
    }
}
