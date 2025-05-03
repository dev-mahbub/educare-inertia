<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamAttendanceRequest extends FormRequest
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
            'classroom_id' => ['required', 'integer'],
            'exam_id' => ['required', 'integer'],
            'examAttendance_array' => ['required', 'array'],
            'examAttendance_array.*.student_id' => ['nullable', 'integer'],
            'examAttendance_array.*.present_day' => ['nullable', 'numeric'],
            'examAttendance_array.*.working_day' => ['nullable', 'numeric'],
            'status' => ['nullable', 'string'],
        ];
    }
}
