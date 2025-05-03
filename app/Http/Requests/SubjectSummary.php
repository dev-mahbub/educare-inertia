<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectSummary extends FormRequest
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
            
            'exam_data_array.*.rule_type' => 'nullable',
            'exam_data_array.*.board' => 'required',
            'exam_data_array.*.display_name' => 'required',
            'exam_data_array.*.subject_id' => 'required',
            'exam_data_array.*.percentage' => 'required',
        ];
    }
}



