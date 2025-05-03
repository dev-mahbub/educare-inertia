<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OnlineExamRequest extends FormRequest
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
            'created_by' => ['nullable', 'integer'],
            'title' => ['required', 'string'],
            'exam_code' => ['required', 'string'],
            'exam_mode' => ['required', 'string'],
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'start_date_at' => ['required', 'string'],
            'end_date_at' => ['required', 'string'],
            'start_time_at' => ['required', 'string'],
            'end_time_at' => ['required', 'string'],
            'duration_hour' => ['required', 'numeric', 'min:0'],
            'duration_minute' => ['required', 'numeric', 'min:0'],
            'instruction_hour' => ['required', 'numeric', 'min:0'],
            'instruction_minute' => ['nullable', 'numeric'],
            'instruction_details' => ['nullable', 'string'],
            'total_mark' => ['required', 'numeric', 'min:0'],
            'pass_mark' => ['required', 'numeric', 'min:0'],
            'display_order' => ['nullable', 'string'],
            'is_schedule_exam' => ['nullable', 'boolean'],
            'is_shuffle_question' => ['nullable', 'boolean'],
            'live_link' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'exam_code.required' => 'required',
            'exam_mode.required' => 'required',
            'class_name_id.required' => 'required',
            'subject_id.required' => 'required',
            'start_date_at.required' => 'required',
            'end_date_at.required' => 'required',
            'start_time_at.required' => 'required',
            'end_time_at.required' => 'required',
            'duration_hour.required' => 'required',
            'duration_minute.required' => 'required',
            'instruction_hour.required' => 'required',
            'total_mark.required' => 'required',
            'pass_mark.required' => 'required',
        ];
    }
}
