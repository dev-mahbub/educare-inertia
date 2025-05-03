<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdmissionExamRequest extends FormRequest
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
            "academic_year_id" => ['required', 'integer'],
            "class_name_id" => ['required', 'integer'],
            "test_date" => ['required'],
            "test_time" => ['required'],
            "enquiry_ids" => ['required', 'array'],
        ];
    }
}
