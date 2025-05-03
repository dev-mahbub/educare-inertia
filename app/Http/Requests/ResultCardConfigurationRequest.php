<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResultCardConfigurationRequest extends FormRequest
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
            'board_id' => ['required', 'integer'],
            'rule_type' => ['required'],
            'exam_id' => ['required', 'integer'],
            'class_name_ids' => ['required', 'array'],
            'attendance_type' => ['required', 'string'],
        ];
    }



    public function messages()
    {
        return [
            'board_id.required' => 'required',
            'rule_type.required' => 'required',
            'exam_id.required' => 'required',
            'class_name_ids.required' => 'required',
            'attendance_type.required' => 'required',
        ];
    }
}
