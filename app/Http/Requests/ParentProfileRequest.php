<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParentProfileRequest extends FormRequest
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
            'parent_id' => ['required'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable'],
            'highest_qualification' => ['nullable'],
            'occupation' => ['nullable'],
            'company_name' => ['nullable'],
            'department' => ['nullable'],
            'spouse_id' => ['required'],
            'sp_email' => ['nullable', 'email'],
            'sp_phone' => ['nullable'],
            'sp_highest_qualification' => ['nullable'],
            'sp_occupation' => ['nullable'],
            'sp_company_name' => ['nullable'],
            'sp_department' => ['nullable'],
        ];
    }
}
