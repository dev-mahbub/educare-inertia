<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OnlineAttendanceRequest extends FormRequest
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
            'classroom_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'attendance_date' => ['required', 'date'],
            'students' => ['required', 'array'],
            'students.*.student_id' => ['required', 'integer'],
            'students.*.attendance_status' => ['nullable', 'string']
        ];
    }
}
