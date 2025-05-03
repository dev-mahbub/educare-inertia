<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeworkRequest extends FormRequest
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
            'type' => ['nullable', 'string'],
            'classroom_ids' => ['nullable'],
            'assigned_to_class' => ['nullable'],
            'allow_submission' => ['nullable'],
            'home_file' => ['nullable','mimes:pdf,doc,docx,png,jpg,jpeg,bmp'],
            'home_camera_file' => ['nullable'],
            'home_doc_file' => ['nullable'],
            'home_file_url' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }
}

