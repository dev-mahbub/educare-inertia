<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRoasterRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'exam_id' => ['required', 'integer'],
            'classroom_subject_id' => ['nullable', 'integer'],
            'full_mark' => ['nullable', 'string'],
            'pass_mark' => ['nullable', 'string'],
            'converted_mark' => ['nullable', 'string'],
            'classroom_exam_date_array' => ['required', 'array'],
            'classroom_exam_date_array.*.classroom_id' => ['required', 'integer'],
            'classroom_exam_date_array.*.subject_id' => ['required', 'integer'],
            'classroom_exam_date_array.*.classroom_subject_id' => ['required', 'integer'],
            'classroom_exam_date_array.*.exam_id' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.full_mark' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.pass_mark' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.converted_mark' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.is_marking' => ['required', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'class_name_id.required' => 'This field is required.',
            'class_name_id.integer' => 'This field is required.',
            'exam_id.required' => 'This field is required.',
            'exam_id.integer' => 'This field is required.',
        ];
    }
}
