<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportPreviousDueFeeRequest extends FormRequest
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
            'fee_id' => ['required', 'integer'],
            'fee_type_id' => ['required', 'integer'],
            'is_fee_special' => ['required', 'boolean'],
            'due_fee_file' => ['required', 'file', 'mimes:xlsx'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'fee_id.required' => 'required',
            'fee_type_id.required' => 'required',
            'due_fee_file.required' => 'required',
            'due_fee_file.file' => 'Must be a file',
            'due_fee_file.mimes' => 'Supported file type is xlsx',
        ];
    }
}
