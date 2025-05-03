<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class LedgerRequest extends FormRequest
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
            'account_group_id' => ['required', 'integer'],
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('ledgers', 'title')->where(function ($query) {
                    return $query->where('school_id', getUserSchoolId());
                })->ignore($this->route('id'))
            ],
            'mobile' => ['nullable'],
            'alt_mobile' => ['nullable'],
            'email' => ['nullable', 'email'],
            'address' => ['nullable'],
            'opening_balance' => ['nullable', 'integer'],
            'amount_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'is_system_default' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'account_group_id.required' => 'Account Group is required',
            'account_group_id.integer' => 'Account Group is required',
            'title.required' => 'Title is required',
            'title.unique' => 'Title already exists',
            'amount_type.required' => 'Amount type is required',
        ];
    }
}
