<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarkStatus extends FormRequest
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
            'type' => ['required', 'string'],
            'exam_id' => ['required', 'integer'],
            'classroom_id' => ['required_if:type,subject_wise', 'nullable', 'integer'],
            'subject_id' => ['required_if:type,subject_wise', 'nullable', 'integer'],
            'class_name_ids' => ['required_if:type,class_wise', 'nullable', 'array'],
            'classroom_ids' => ['required_if:type,section_wise', 'nullable', 'array'],
            'status_type' => ['required', 'string'],
        ];
    }
}
