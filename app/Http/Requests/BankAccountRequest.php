<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankAccountRequest extends FormRequest
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
            'bank_id' => ['nullable', 'integer'],
            'student_id' => ['nullable', 'integer'],
            'account_name' => ['required', 'string', 'max:255'],
            'account_display_name' => ['required', 'string', 'max:255'],
            'account_no' => ['required', 'string'],
            'account_type' => ['nullable', 'string'],
            'ifsc_code' => ['nullable', 'string'],
            'micr_no' => ['nullable', 'string'],
            'branch_name' => ['nullable', 'string'],
            'branch_address' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
