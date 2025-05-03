<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TimezoneRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'standard_timezone_id' => ['required', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }
}
