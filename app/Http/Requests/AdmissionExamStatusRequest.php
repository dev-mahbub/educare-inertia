<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdmissionExamStatusRequest extends FormRequest
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
            'enquiry_ids' => ['required', 'array'],
            'exam_status' => ['required', 'string', 'in:Selected,Not Selected'],
        ];
    }

    public function messages()
    {
        return [
            'enquiry_ids.required' => 'Please select at least a student',
            'exam_status.required' => 'Exam status is required.',
            'exam_status.in' => 'Exam status must be in: Selected,Not Selected.',
        ];
    }
}
