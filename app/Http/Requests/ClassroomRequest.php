<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomRequest extends FormRequest
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
            'subject_id' => ['required', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'grade' => ['nullable', 'string'],
            'classDays' => ['required', 'array'],
            'class_notes' => ['nullable', 'string'],
            'start_time_at' => ['nullable'],
            'end_time_at' => ['nullable'],
            'start_date_at' => ['nullable'],
            'end_date_at' => ['required'],
            'live_class_url' => ['nullable','string'],
            'is_copy_others_class' => ['nullable', 'boolean'],
            'is_online_class' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'subject_id.required' => 'Subject is required',
            'class_name_id.required' => 'Class name is required',
            'end_date_at.required' => 'End date is required',
            'classDays.required' => 'Class day is required',
        ];
    }
}
