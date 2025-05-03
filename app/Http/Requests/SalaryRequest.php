<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalaryRequest extends FormRequest
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
            'salary_id' => ['nullable', 'integer'],
            'salary_type' => ['required', 'string', 'max:150'],
            'gross_amount' => ['required', 'string'],
            'transport_amount' => ['nullable', 'string'],
            'medical_amount' => ['nullable', 'string'],
            'additional_amount' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'paid_status' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
