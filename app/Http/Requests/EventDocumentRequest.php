<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventDocumentRequest extends FormRequest
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
            'event_id' => ['required', 'integer'],
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'file_type' => ['required', 'string'],
            'event_document' => ['required', 'file', 'mimes:png,jpg,jpeg,doc,docx,pdf,txt'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'required',
            'file_type.required' => 'required',
            'event_document.required' => 'required',
            'event_document.mimes' => 'Supported file formats: png,jpg,jpeg,doc,docx,pdf,txt',
        ];
    }
}
