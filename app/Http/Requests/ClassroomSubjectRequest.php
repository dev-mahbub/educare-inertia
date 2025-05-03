<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomSubjectRequest extends FormRequest
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
            'classroom_id' => ['nullable', 'integer'],
            'parent_subject_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'type' => ['nullable', 'string'],
            'academic_grade_id' => ['nullable', 'integer'],
            'is_marking' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }
}

