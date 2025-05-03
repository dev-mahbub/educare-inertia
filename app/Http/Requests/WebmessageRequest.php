<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WebmessageRequest extends FormRequest
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
            'sender_id' => ['nullable', 'integer'],
            'parent_id' => ['nullable', 'integer'],
            'recipient_ids.*' => ['nullable', 'exists:users,id'],
            'audience_type' => ['nullable', 'string'],
            'audience_data' => ['nullable', 'string'],
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'read_at' => ['nullable', 'string'],
            'image' => ['nullable','mimes:pdf,doc,docx,png,jpg,jpeg,bmp'],
            'status' => ['nullable', 'string'],
            'classroom_ids.*' => ['nullable'],
            'student_ids.*' => ['nullable'],
            'teacher_ids.*' => ['nullable'],
            'admin_ids.*' => ['nullable'],
            'class_teacher_ids.*' => ['nullable'],
            'subject_teacher_ids.*' => ['nullable'],
            'enable_type' => ['nullable', 'string'],
        ];
    }
}
