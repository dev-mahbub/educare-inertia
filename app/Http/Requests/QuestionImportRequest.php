<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionImportRequest extends FormRequest
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
            'language' => ['required'],
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'online_topic_id' => ['nullable', 'integer'],
            'import_file' => ['required', 'file', 'mimes:xls,xlsx']
        ];
    }

    public function messages()
    {
        return [
            'language.required' => 'required',
            'class_name_id.required' => 'required',
            'subject_id.required' => 'required',
            'import_file.required' => 'required',
            'import_file.file' => 'Must be a file',
            'import_file.mimes' => 'Supported file types: xls, xlsx',
        ];
    }
}
