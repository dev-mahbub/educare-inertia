<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AcademicGradeRequest extends FormRequest
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
        $id = $this->input('id');

        return [
            'id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'academic_year_id' => ['nullable', 'integer'],
            'scale_name' => ['required', 'string', Rule::unique('academic_grades', 'scale_name')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            })->ignore($id)],
            'scale_description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
