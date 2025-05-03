<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LibraryVendorRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'id' => ['nullable', 'integer'],
            'vendor_name' => ['required', 'string'],
            'company_name' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'website' => ['nullable', 'string', 'url'],
            'contact_no' => ['nullable', 'string'],
            'contact_no_two' => ['nullable', 'string'],
            'company_address' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
