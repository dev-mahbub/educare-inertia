<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceRequest extends FormRequest
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
            'attendanceable_type' => ['required', 'string', 'max:255'],
            'attendanceable_id' => ['required', 'integer'],
            'is_presented' => ['required', 'boolean'],
            'is_approved' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
