<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SubjectAssignRequest extends FormRequest
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
        // new code
        return [
            'id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'subject_id' => [
                'required', 'integer',
                Rule::unique('classroom_subjects', 'subject_id')->where(function ($query) {
                    return $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $this->input('classroom_id'));
                })->ignore($this->input('id'))
            ],
            'academic_grade_id' => ['nullable', 'integer'],
            'title' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string'],
            'grade_scale' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'display_order' => ['nullable', 'integer'],
            'is_marking' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];

        // old code
        // return [
        //     'id' => ['nullable', 'integer'],
        //     'school_id' => ['nullable', 'integer'],
        //     'classroom_id' => ['required', 'integer'],
        //     'subject_id' => ['required', 'integer'],
        //     'academic_grade_id' => ['nullable', 'integer'],
        //     'title' => ['nullable', 'string', 'max:255'],
        //     'type' => ['nullable', 'string'],
        //     'grade_scale' => ['nullable', 'string'],
        //     'description' => ['nullable', 'string'],
        //     'display_order' => ['nullable', 'integer'],
        //     'is_marking' => ['nullable', 'boolean'],
        //     'status' => ['nullable', 'string'],
        // ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Name is required',
            'type.required' => 'Type is required',
            'subject_id.required' => 'Subject is required',
            'subject_id.integer' => 'Subject is required',
            'classroom_id.required' => 'Class is required',
            'classroom_id.integer' => 'Class is required',
            'subject_id.unique' => 'The subject has already been taken.',
        ];
    }
}
