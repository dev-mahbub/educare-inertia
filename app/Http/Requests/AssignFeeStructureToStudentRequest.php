<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignFeeStructureToStudentRequest extends FormRequest
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
            'fee_structure_id' => ['required', 'integer'],
            'student_ids' => ['required', 'array'],
            'student_ids.*' => ['required', 'integer'],
        ];
    }


    public function messages()
    {
        return [
            'fee_structure_id.required' => 'Please select a fee structure.',
            'student_ids.required' => 'Please select at least one student.',
        ];
    }
}
