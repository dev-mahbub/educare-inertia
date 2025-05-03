<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentHouseRequest extends FormRequest
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
            'house_id' => ['nullable', 'integer'],
            'is_approved' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
