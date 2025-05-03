<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentDueFollowUpRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'note' => ['required', 'string'],
            'commitment_date' => ['required', 'date'],
            'call_picked' => ['required', 'boolean'],
            'due_amount' => ['nullable', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'note.required' => 'required',
            'commitment_date.required' => 'required'
        ];
    }
}
