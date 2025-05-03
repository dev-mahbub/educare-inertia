<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class AcademicSyllabusRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            // 'image' => ['nullable', File::types(['jpg', 'png', 'bmp'])->max(1 * 1024),],
            'file' => ['nullable', File::types(['png', 'bmp', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'pdf'])->max(1 * 1024)],
            'status' => ['nullable', 'string'],
        ];
    }
}
