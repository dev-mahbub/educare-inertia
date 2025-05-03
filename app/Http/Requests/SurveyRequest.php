<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SurveyRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'class_name_ids' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'instructions_desc' => ['nullable', 'string'],
            'survey_audience' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
