<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamMarkImportRequest extends FormRequest
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
            'classroom_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'exam_id' => ['required', 'integer'],
            'exam_mark_import_file' => ['required', 'file', 'mimes:xlsx'],
        ];
    }

    public function messages()
    {
        return [
            'exam_mark_import_file.required' => 'requierd',
            'exam_mark_import_file.file' => 'Must be a file',
            'exam_mark_import_file.mimes' => 'Supported file type is xlsx',
        ];
    }
}
