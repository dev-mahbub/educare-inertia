<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImageRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'path' => ['required', 'string'],
            'imageable_type' => ['required', 'string', 'max:100'],
            'imageable_id' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
        ];
    }
}
