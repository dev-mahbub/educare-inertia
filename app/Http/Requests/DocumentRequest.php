<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
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
            'with_document' => ['required', 'boolean'],
            'audience_type' => ['required', 'string'],
            'student_id' => ['exclude_unless:audience_type,Student', 'required_if:audience_type,Student', 'integer'],
            'teacher_id' => ['exclude_unless:audience_type,Teacher', 'required_if:audience_type,Teacher', 'integer'],
            'driver_id' => ['exclude_unless:audience_type,Driver', 'required_if:audience_type,Driver', 'integer'],
            'documents' => ['required', 'array'],
            // 'documents.*.document_category' => ['required', 'string'],
            'documents.*.document_category_id' => ['required', 'integer'],
            'documents.*.document_no' => ['nullable', 'string'],
            'documents.*.issued_by' => ['nullable', 'integer'],
            'documents.*.generated_for' => ['nullable', 'string'],
            'documents.*.notes' => ['nullable', 'string'],
            'documents.*.issued_date' => ['nullable', 'date'],
            'documents.*.file' => ['exclude_unless:with_document,true', 'required_if:with_document,true', 'file'],
            'is_with_document' => ['required', 'boolean']
        ];

        //old code
        // return [
        //     'school_id' => ['nullable', 'integer'],
        //     'name' => ['required', 'string', 'max:255'],
        //     'path' => ['required', 'string'],
        //     'documentable_type' => ['required', 'string', 'max:100'],
        //     'documentable_id' => ['required', 'integer'],
        //     'status' => ['nullable', 'string'],
        // ];
    }

    public function messages()
    {
        return [
            'audience_type.required' => 'required',
            'student_id.required_if' => 'required',
            'teacher_id.required_if' => 'required',
            'documents.required' => 'required',
            // 'documents.*.document_category.required' => 'required',
            'documents.*.document_category_id.required' => 'required',
            'documents.*.file.required_if' => 'required',
        ];
    }
}
