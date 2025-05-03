<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
            'country_id' => ['nullable', 'integer'],
            'first_name' => ['required', 'string', 'max:255'],
            'profileable_type' => ['required', 'string', 'max:150'],
            'profileable_id' => ['required', 'integer'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['nullable', 'string'],
            'street_address' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'zip' => ['nullable', 'string'],
            'teaser' => ['nullable','string'],
            'description' => ['nullable','string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
