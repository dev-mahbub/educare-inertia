<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdmissionProcessRequest extends FormRequest
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
            'school_id' => ['nullable'],
            'academic_year_id' => ['required', 'integer'],
            'admission_type' => ['nullable'],
            'title' => ['required', 'string'],
            'admission_number'  => ['nullable'],
            'registration_seed' => ['nullable'],
            'start_date_at' => ['required'],
            'end_date_at' => ['required'],
            'contact_email' => ['nullable', 'string'],
            'contact_mobile' => ['nullable', 'string'],
            'is_open_or_close' => ['nullable'],
            'is_current' => ['nullable'],
            'is_online_registration' => ['nullable'],
            'is_result' => ['nullable'],
            'items' => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Title is required.',
            'start_date_at.required' => 'Start date is required.',
            'end_date_at.required' => 'Start date is required.',
            'academic_year_id.required' => 'Academic year is required.',
            'academic_year_id.integer' => 'Academic year is required.',
        ];
    }
}
