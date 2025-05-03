<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestLeaveRequest extends FormRequest
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
            'staff_id' => ['required', 'integer'],
            'leave_type_id' => ['required', 'integer'],
            'format_no' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'leave_reason' => ['required', 'string'],
            'leave_days' => ['required', 'array'],
            'leave_days.*.date' => ['required', 'date'],
            'leave_days.*.day' => ['required', 'string'],
            'leave_days.*.day_type' => ['required', 'string'],
            'leave_days.*.shift' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'leave_type_id.required' => 'required',
            'start_date.required' => 'required',
            'end_date.required' => 'required',
            'leave_reason.required' => 'required',
            'leave_days.required' => 'required',
            'leave_days.*.date.required' => 'required',
            'leave_days.*.day.required' => 'required',
            'leave_days.*.day_type.required' => 'required',
        ];
    }
}
