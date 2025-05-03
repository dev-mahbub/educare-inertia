<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeaveTypeRequest extends FormRequest
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
            'title' => ['required', 'string'],
            'acronym' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'display_order' => ['nullable', 'integer'],
            'auto_leave_deduction_order' => ['required', 'integer']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'acronym.required' => 'required',
            'auto_leave_deduction_order.required' => 'required',
            'auto_leave_deduction_order.integer' => 'must be an integer',
            'display_order.integer' => 'must be an integer',
        ];
    }
}
