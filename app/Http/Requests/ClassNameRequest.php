<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ClassNameRequest extends FormRequest
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
            'title' => ['required', 'string', Rule::unique('class_names', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            })->ignore($this->route('id'))],
            'old_title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            // 'sections' => ['nullable', array()],
            'sections' => ['required', array()],
            'sections.*' => ['required', 'string'],
            'old_sections' => ['nullable', array()],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'subject_id.required' => 'Title is required'
        ];
    }
}
