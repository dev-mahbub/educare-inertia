<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Library extends FormRequest
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
            'parent_id' => 'nullable|integer',
            'document_name' => 'required',
            'description' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'document_name.required' => 'The Document Name field is required.',
        ];
    }
}
