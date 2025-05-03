<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentSiblingRequest extends FormRequest
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
            'f_first_name' => ['required', 'string'],
            'f_email' => ['required', 'email'],
            'f_phone' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'f_phone.required' => 'Phone is required.',
            'f_first_name.required' => 'Name is required.',
            'f_email.required' => 'Email is required.',
        ];
    }
}
