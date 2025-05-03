<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamDateRequest extends FormRequest
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
            'exam_date_id' => ['nullable', 'integer'],
            'classroom_ids' => ['required', 'array'],
            'classroom_exam_date_array' => ['required', 'array'],
            'status' => ['nullable', 'string'],
        ];
    }
}
