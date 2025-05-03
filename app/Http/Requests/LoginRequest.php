<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'details' => ['nullable', 'string'],
            'admission_no' => ['nullable', 'string'],
            'classroom_id' => ['nullable', 'integer'],
            'parent_phone' => ['required', 'integer'],
            'status' => ['nullable', 'string'],
            'parent_name' => ['nullable', 'string'],
            'student_name' => ['required', 'string'],
            'request_type' => ['nullable', 'string'],
            'request_date' => ['nullable', 'date'],
        ];
    }
}
