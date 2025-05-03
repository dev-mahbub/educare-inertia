<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisitorRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'height' => ['nullable', 'string'],
            'weight' => ['nullable','string'],
            'present_address' => ['nullable','string'],
            'present_state' => ['nullable', 'string'],
            'present_city' => ['nullable', 'string'],
            'present_taluka' => ['nullable', 'string'],
            'present_district' => ['nullable', 'string'],
            'present_pin_code' => ['nullable', 'string'],
            'permanent_address' => ['nullable', 'string'],
            'permanent_state' => ['nullable', 'string'],
            'permanent_city' => ['nullable', 'string'],
            'permanent_taluka' => ['nullable', 'string'],
            'permanent_district' => ['nullable', 'string'],
            'is_inactive' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
