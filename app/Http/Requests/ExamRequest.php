<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRequest extends FormRequest
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
            'academic_year_id' => ['nullable', 'integer'],
            'classroom_ids' => ['nullable', 'array'],
            'classroom_ids.*' => ['required', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'start_date_at' => ['nullable', 'string'],
            'end_date_at' => ['nullable', 'string'],
            'display_order' => ['nullable', 'integer'],
            'is_registration' => ['nullable', 'boolean'],
            'is_display_on_calender' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
