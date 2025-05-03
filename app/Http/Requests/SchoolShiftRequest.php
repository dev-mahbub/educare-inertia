<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SchoolShiftRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('school_shifts', 'title')
                    ->where('school_id', getUserSchoolId())
                    ->ignore($this->route('id'))
            ],
            'description' => ['nullable', 'string'],
            'start_time_at' => ['required', 'string'],
            'end_time_at' => ['required', 'string'],
            'start_date_at' => ['nullable', 'string'],
            'end_date_at' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'start_time_at.required' => 'required',
            'end_time_at.required' => 'required'
        ];
    }
}
