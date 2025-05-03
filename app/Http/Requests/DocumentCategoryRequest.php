<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class DocumentCategoryRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                Rule::unique('document_categories', 'title')
                    ->where('school_id', getUserSchoolId())
                    ->where('type', $this->type)
                    ->ignore($this->route('id'))
            ],
            'type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'is_published' => ['nullable', 'boolean']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'type.required' => 'required',
        ];
    }
}
