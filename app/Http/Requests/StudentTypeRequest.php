<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StudentTypeRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', Rule::unique('student_types', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId());
            })->ignore($this->route('id'))],
            'student_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'title.unique' => 'already exists',
            'title.string' => 'must be a string',
            'student_type.required' => 'required',
            'description.string' => 'must be a string',
        ];
    }
}
