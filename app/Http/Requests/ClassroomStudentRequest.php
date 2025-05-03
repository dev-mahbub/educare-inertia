<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomStudentRequest extends FormRequest
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
            'academic_year_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'target_academic_year_id' => ['required', 'integer'],
            'target_classroom_id' => ['required', 'integer'],
            'selected_student' => ['required', 'array'],
            'promoted_date_at' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }
}
