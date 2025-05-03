<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductImportRequest extends FormRequest
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
            'import_file' => ['required', 'file', 'mimes:xlsx,xls'],
        ];
    }

    public function messages()
    {
        return [
            'import_file.required' => 'requierd',
            'import_file.file' => 'Must be a file',
            'import_file.mimes' => 'Supported file types are .xlsx and .xls',
        ];
    }
}
