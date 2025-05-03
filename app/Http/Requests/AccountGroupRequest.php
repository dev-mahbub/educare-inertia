<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AccountGroupRequest extends FormRequest
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
            'parent_id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255', Rule::unique('account_groups', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId());
            })],
            'description' => ['nullable', 'string'],
            'is_system_default' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }
}
