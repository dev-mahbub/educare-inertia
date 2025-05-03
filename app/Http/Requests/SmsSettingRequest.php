<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SmsSettingRequest extends FormRequest
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
            'audience' => ['nullable'],
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sms_settings', 'title')
                    ->where('school_id', getUserSchoolId())
                    ->ignore($this->route('id'))
            ],
            'context' => ['nullable'],
            'description' => ['nullable', 'string'],
            'web_page_message' => ['nullable', 'string'],
            'use_tagsArr' => ['nullable', 'array'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'title.unique' => 'This template already exists!'
        ];
    }
}
