<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            'reviewable_type' => ['required', 'string', 'max:150'],
            'reviewable_id' => ['required', 'integer'],
            'message' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
