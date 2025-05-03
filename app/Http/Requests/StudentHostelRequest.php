<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentHostelRequest extends FormRequest
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
            'student_id' => ['nullable', 'integer'],
            'hostel_type' => ['nullable', 'string'],
            'note' => ['nullable', 'string'],
            'applied_date' => ['nullable', 'date'],
            'start_date' => ['nullable', 'date'],
        ];
    }
}
