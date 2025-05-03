<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeedbackRequest extends FormRequest
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
            'details' => ['required', 'string'],
            'status' => ['nullable', 'string'],
            'parent_name' => ['nullable', 'string'],
            'student_name' => ['required', 'string'],
            'parent_phone' => ['nullable', 'integer'],
            'request_type' => ['required', 'string'],
            'request_date' => ['nullable', 'date'],
            'solution_status' => ['nullable', 'string'],
        ];
    }
}
