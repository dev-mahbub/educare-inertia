<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamBulkRoasterRequest extends FormRequest
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
            'exam_id' => ['required', 'integer'],
            'classroom_subject_id' => ['nullable', 'integer'],
            'classroom_exam_date_array' => ['required', 'array'],
            'classroom_exam_date_array.*.subject_id' => ['required', 'integer'],
            'classroom_exam_date_array.*.classroom_ids' => ['required', 'array'],
            'classroom_exam_date_array.*.classroom_subject_id' => ['required', 'integer'],
            'classroom_exam_date_array.*.full_mark' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.pass_mark' => ['nullable', 'integer'],
            'classroom_exam_date_array.*.converted_mark' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }
}
