<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentGatePassRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'academic_year_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'student_id' => ['required', 'integer'],
            'relation_type' => ['required', 'string'],
            'visiting_person' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'email' => ['nullable', 'string'],
            'in_date_at' => ['nullable', 'string'],
            'out_date_at' => ['nullable', 'string'],
            'in_time_at' => ['nullable', 'string'],
            'out_time_at' => ['nullable', 'string'],
            'reason_gate_pass' => ['required', 'string'],
            'visitor_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'student_id.required' => 'The student field is required.',
            'student_id.integer' => 'The student field is required.',
            'classroom_id.required' => 'The classroom field is required.',
            'classroom_id.integer' => 'The classroom field is required.',
        ];
    }
}
