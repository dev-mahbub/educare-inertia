<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamMarkRequest extends FormRequest
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
            'student_mark_array' => ['required', 'array'],
            'student_mark_array.*.student_id' => ['required', 'integer'],
            'student_mark_array.*.academic_grade_item_id' => ['nullable', 'integer'],
            'student_mark_array.*.mark' => ['nullable', 'numeric', 'min:0','max:100',],
            'student_mark_array.*.is_present' => ['nullable', 'boolean'],
            'student_mark_array.*.absence_reason' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
