<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AcademicYearRequest extends FormRequest
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
            'academic_session' => ['required', 'string', 'max:255'],
            'start_date_at' => ['nullable', 'string'],
            'end_date_at' => ['nullable', 'string'],
            'display_order' => ['nullable', 'integer'],
            'is_copy_class' => ['nullable', 'boolean'],
            'is_copy_admission_criteria' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
