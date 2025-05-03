<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdmissionRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'admission_type' => ['required', 'string', 'max:50'],
            'admission_number' => ['required', 'string', 'max:255'],
            'fee' => ['nullable', 'string'],
            'date_at' => ['nullable', 'string'],
            'time_at' => ['nullable', 'string'],
            'is_inactive' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
