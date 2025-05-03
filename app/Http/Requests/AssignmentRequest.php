<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignmentRequest extends FormRequest
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
            'student_id' => ['nullable', 'integer'],
            'classroom_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'sub_title' => ['nullable', 'string'],
            'start_date_at' => ['nullable', 'string'],
            'end_date_at' => ['nullable', 'string'],
            'is_assigned_to_sections' => ['nullable', 'boolean'],
            'is_assigned_to_class' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
