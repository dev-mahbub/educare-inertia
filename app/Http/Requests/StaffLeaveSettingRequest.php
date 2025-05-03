<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffLeaveSettingRequest extends FormRequest
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
            'staff_ids' => ['required', 'array'],
            'is_rule_one_in_time_enabled' => ['nullable', 'boolean', function ($attribute, $value, $fail) {
                if (!$value && empty($this->is_rule_two_total_hour_enabled)) {
                    $fail('Either rule one or rule two must be enabled.');
                }
            }],
            'is_rule_two_total_hour_enabled' => ['nullable', 'boolean', function ($attribute, $value, $fail) {
                if (!$value && empty($this->is_rule_one_in_time_enabled)) {
                    $fail('Either rule one or rule two must be enabled.');
                }
            }],
            'is_saturday_exceptional' => ['nullable', 'boolean'],
            'is_sunday_exceptional' => ['nullable', 'boolean'],
        ];
    }
}
