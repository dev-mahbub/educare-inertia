<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomTimetableRequest extends FormRequest
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
            'school_shift_id' => ['required', 'integer'],
            'timetables' => ['nullable', 'array'],
            'timetables.*.day' => ['required', 'string'],
            'timetables.*.period_data' => ['nullable', 'array'],
            'timetables.*.period_data.*.id' => ['nullable', 'integer'],
            'timetables.*.period_data.*.classroom_period_id' => ['required', 'integer'],
            'timetables.*.period_data.*.type' => ['required', 'string'],
            'timetables.*.period_data.*.subject_id' => ['required', 'integer'],
            'timetables.*.period_data.*.staff_id' => ['required', 'integer'],
        ];
    }
}
