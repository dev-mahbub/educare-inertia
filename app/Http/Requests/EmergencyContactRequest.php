<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmergencyContactRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'mobile_number' => ['required', 'string'],
            'alter_mobile_number' => ['nullable', 'string'],
            'phone_number' => ['nullable', 'string'],
            'email_id' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}