<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HostelStudentAllocationRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'admission_no' => ['required'],
            'room_id' => ['nullable'],
            'hostel_infra_level_id' => ['required'],
            'joining_date_at' => ['nullable'],
            'status' => ['nullable'],
            'infraLavelIds' => ['nullable'],
            'currentLavelId' => ['nullable'],
            'is_open' => ['nullable'],
            'type' => ['nullable'],
            'infraLavelIdString' => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            'student_id.required' => 'This field is required.',
            'student_id.integer' => 'This field is required.',
            'classroom_id.required' => 'This field is required.',
            'classroom_id.integer' => 'This field is required.',
            'hostel_infra_level_id.integer' => 'This field is required.',
            'hostel_infra_level_id.required' => 'This field is required.',
            'admission_no.required' => 'This field is required.',
        ];
    }
}
