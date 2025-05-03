<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SurveyQuestionRequest extends FormRequest
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
            'survey_id' => ['required', 'integer'],
            'questions' => ['required', 'array'],
            'questions.*.id' => ['nullable', 'integer'],
            'questions.*.title' => ['required', 'string'],
            'questions.*.question_category' => ['nullable', 'string'],
            'questions.*.question_type' => ['required', 'string'],
            'questions.*.options' => ['nullable', 'array'],
            'questions.*.options.*.label' => ['nullable'],
            'questions.*.options.*.value' => ['nullable'],
            'questions.*.is_required_field' => ['nullable', 'boolean'],
            'questions.*.range_start' => ['nullable', 'integer'],
            'questions.*.range_end' => ['nullable', 'integer']
        ];
    }

    public function messages()
    {
        return [
            'questions.*.title.required' => 'required',
            'questions.*.question_type.required' => 'required',
        ];
    }
}
