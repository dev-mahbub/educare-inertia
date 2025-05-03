<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClassSubjectRequest extends FormRequest
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
            'id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'subject_group_id' => ['nullable', 'integer'],
            'subject_id' => [
                'required', 'integer',
                Rule::unique('class_subjects', 'subject_id')->where(function ($query) {
                    return $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('class_name_id', $this->input('class_name_id'));
                })->ignore($this->input('id'))
            ],
            'type' => ['required', 'string'],
            'academic_grade_id' => ['nullable', 'integer'],
            'is_marking' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'subject_id.required' => 'The subject is required.',
            'subject_id.integer' => 'The subject must be an integer.',
            'subject_id.unique' => 'The subject has already been assigned to this class.',
        ];
    }
}
