<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassworkRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'subject_id' => ['required', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date_at' => ['required'],
            'end_date_at' => ['required'],
            'class_va' => ['nullable'],
            'class_vb' => ['nullable'],
            'classroom_ids' => ['nullable'],
            'assigned_to_class' => ['nullable'],
            'allow_submission' => ['nullable'],
            'class_file' => ['nullable','file','mimes:pdf,doc,docx,png,jpg,jpeg,bmp'],
            'class_camera_file' => ['nullable'],
            'class_doc_file' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }
}

