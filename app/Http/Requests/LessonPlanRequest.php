<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonPlanRequest extends FormRequest
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
            'lesson_topic' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'start_date_at' => ['required', 'date'],
            'end_date_at' => ['required', 'date'],
            'methodology' => ['nullable'],
            'is_notification_teacher' => ['nullable'],
            'is_lesson_va' => ['nullable'],
            'is_lesson_vb' => ['nullable'],
            'is_mail_teacher' => ['nullable'],
            'lesson_file.*' => ['nullable', 'file', 'mimes:png,jpg,jpeg,doc,docx,pdf', 'max:4096'],
            'status' => ['nullable', 'string'],
            'classroom_ids' => ['required', 'array'],
            'teacher_ids' => ['nullable', 'array'],
        ];
    }

    public function messages()
    {
        return [
            'subject_id.required' => 'required',
            'class_name_id.required' => 'required',
            'title.required' => 'required',
            'start_date_at.required' => 'required',
            'end_date_at.required' => 'required',
            'classroom_ids.required' => 'Please select at least one class.',
        ];
    }
}
