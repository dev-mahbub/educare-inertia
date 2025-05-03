<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeaveSettingRequest extends FormRequest
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
            'is_auto_approve_leave_enabled' => ['nullable', 'boolean'],
            'is_half_day_leave_enabled' => ['nullable', 'boolean'],
            'rule_one_in_time' => ['nullable', 'date'],
            'rule_two_total_hour' => ['nullable', 'integer'],
            'is_rule_one_in_time_enabled' => ['nullable', 'boolean'],
            'is_rule_two_total_hour_enabled' => ['nullable', 'boolean'],
            'is_saturday_exceptional' => ['nullable', 'boolean'],
            'is_sunday_exceptional' => ['nullable', 'boolean'],
        ];
    }
}
