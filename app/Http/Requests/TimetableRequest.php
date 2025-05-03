<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TimetableRequest extends FormRequest
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
            'classroom_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'shift_type' => ['required', 'string'],
            'start_date' => ['required', 'date'],
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
            'repeat_date' => ['nullable', 'date'],
            'repeatable_days' => ['nullable', 'array'],
            'type' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'classroom_id.required' => 'required',
            'subject_id.required' => 'required',
            'shift_type.required' => 'required',
            'start_date.required' => 'required',
            'start_time.required' => 'required',
            'end_time.required' => 'required',
            'type.required' => 'required',
        ];
    }
}
