<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeeSettingRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'academic_year_id' => ['nullable', 'integer'],
            'key_value_array' => ['required', 'array'],
            'key_value_array.*.type' => ['required', 'string',],
            'key_value_array.*.key' => ['required', 'string',],
            'key_value_array.*.value' => ['nullable', 'string'],
            'staff_ids' => ['nullable', 'array'],
        ];
    }
}
