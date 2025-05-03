<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomPeriodRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'school_id' => ['nullable', 'integer'],
            // 'title' => ['required', 'string', 'max:255'],
            // 'description' => ['nullable', 'string'],
            // 'start_time_at' => ['nullable', 'string'],
            // 'end_time_at' => ['nullable', 'string'],
            // 'start_date_at' => ['nullable', 'string'],
            // 'end_date_at' => ['nullable','string'],
            // 'status' => ['nullable', 'string'],
            'classroom_id' => ['required', 'integer'],
            'school_shift_id' => ['required', 'integer'],
            'school_period_ids' => ['required', 'array'],
            'type' => ['required', 'string']
        ];
    }
}
