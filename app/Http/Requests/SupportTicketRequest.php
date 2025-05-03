<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupportTicketRequest extends FormRequest
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
            'title' => ['nullable', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'your_name' => ['nullable', 'string'],
            'your_email' => ['nullable', 'string'],
            'your_phone' => ['nullable', 'string'],
            'is_answered' => ['nullable', 'boolean'],
            'is_resolved' => ['nullable','boolean'],
            'status' => ['nullable', 'string'],
            'follow_up_date' => ['nullable', 'date'],
            'parent_name' => ['nullable', 'string'],
            'student_name' => ['nullable', 'string'],
            'parent_phone' => ['nullable', 'integer'],
            'request_type' => ['nullable', 'string'],
            'request_date' => ['nullable', 'date'],
            'solution_note' => ['nullable', 'string'],
            'previous_solution_note' => ['nullable', 'string'],
            'solution_status' => ['nullable', 'string'],
            'classroom_id' => ['nullable', 'integer'],
            'assigned_to' => ['nullable', 'integer'],
            'student_id' => ['nullable', 'integer'],
            'created_by' => ['nullable', 'integer'],
        ];
    }
}
