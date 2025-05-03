<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CertificateRequest extends FormRequest
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
            'certificate_type_id' => ['required', 'integer'],
            // 'factory_role' => ['required', 'string', 'max:255'],
            'view_name' => ['required', 'string', 'max:255'],
            'audience_type' => ['required', 'string', 'max:255'],
            'status' => ['nullable', 'string']
        ];
    }

    public function messages()
    {
        return [
            'certificate_type_id' => 'The certificate type field is required.'
        ];
    }
}
