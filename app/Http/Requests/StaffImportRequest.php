<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffImportRequest extends FormRequest
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
            'staff_import_file' => ['required', 'file', 'mimes:xlsx'],
        ];
    }

    public function messages()
    {
        return [
            'staff_import_file.required' => 'requierd',
            'staff_import_file.file' => 'Must be a file',
            'staff_import_file.mimes' => 'Supported file type is xlsx',
        ];
    }
}
