<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'job_code' => ['required', 'integer'],
            'designation' => ['required'],
            'vacancy' => ['required', 'integer'],
            'gender' => ['required'],
            'start_date_at' => ['required'],
            'end_date_at' => ['required'],
            'qualification' => ['required'],
            'interview_date_at' => ['required'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'job_code.required' => 'Job code is required',
            'designation.required' => 'Designation is required',
            'vacancy.required' => 'Vacancy is required',
            'gender.required' => 'Gender is required',
            'start_date_at.required' => 'Start date is required',
            'end_date_at.required' => 'End date is required',
            'qualification.required' => 'Qualification is required',
            'interview_date_at.required' => 'Interview date is required',
            'status.required' => 'Status is required',
        ];
    }
}
