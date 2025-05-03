<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentNoteRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'context' => ['required', 'string'],
            'notes' => ['required', 'string'],
            'note_status' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
