<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkingBonusDayClassroomRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'academic_year_id' => ['required', 'integer'],
            'month_id' => ['required', 'integer'],
            'working_days' => ['required', 'numeric'],
            'bonus_days' => ['required', 'numeric'],
        ];
    }
}

