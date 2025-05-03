<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResultCard extends FormRequest
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
            'board' => 'required',
            'rule_type' => 'required',
            'class_name_ids' => 'required',
            'exam_id' => 'required',
            'attendance_type' => 'required'

        ];
    }
}
