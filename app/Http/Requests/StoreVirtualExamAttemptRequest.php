<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVirtualExamAttemptRequest extends FormRequest
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
            'virtual_exam_id' => 'required|integer',
            'student_id' => 'required|integer',
            'attempt_number' => 'required|integer',
            
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|integer',
            'answers.*.question_type' => 'required|string',
            'answers.*.is_required_field' => 'required|boolean',
            'answers.*.answer' => 'nullable|string',

            'response' => 'required|array',
            'response.*.question_id' => 'required|integer',
            'response.*.question_type' => 'required|string',
            'response.*.is_required_field' => 'required|boolean',
            'response.*.answer' => 'nullable|string',
        ];
    }

    
    public function messages(): array
    {
        return [
            'virtual_exam_id.required' => 'Exam ID is required',
            'student_id.required' => 'Student ID is required',
            'attempt_number.required' => 'Attempt number is required',
            'answers.required' => 'Answers are required',
            'response.required' => 'Response is required',
        ];
    }
}

