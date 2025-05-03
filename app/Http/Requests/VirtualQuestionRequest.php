<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VirtualQuestionRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'language' => ['required', 'string'],
            'question_type' => ['required', 'string'],
            'difficulty_level' => ['required', 'string'],
            'online_topic_id' => ['nullable', 'integer'],
            'virtual_asset_id' => ['nullable', 'integer'],
            'question' => ['required', 'string'],
            'answer_options' => ['nullable', 'required_unless:question_type,Descriptive', 'array'],
            'answer_options.*.is_correct' => ['nullable', 'boolean'],
            'answer_options.*.answer' => ['required', 'string'],
            'answer_options.*.alternate_answers' => ['nullable', 'array'],
            'answer_options.*.alternate_answers.*.answer' => ['required', 'string'],
            'answer_explanation' => ['nullable', 'string'],
            'mark' => ['required', 'numeric'],
            'share_with' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean']
        ];
    }

    public function messages()
    {
        return [
            'class_name_id.required' => 'required',
            'subject_id.required' => 'required',
            'language.required' => 'required',
            'question_type.required' => 'required',
            'difficulty_level.required' => 'required',
            'question.required' => 'required',
            'answer_options.required_unless' => 'required',
            'answer_options.*.answer.required' => 'required',
            'answer_options.*.alternate_answers.*.answer.required' => 'required',
            'mark.required' => 'required',
            'share_with.required' => 'required'
        ];
    }
}
