<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
            'price' => ['required', 'string', 'max:50'],
            'discount' => ['required', 'string', 'max:255'],
            'teaser' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'more_info' => ['nullable', 'string'],
            'language' => ['nullable', 'string'],
            'level' => ['nullable', 'string'],
            'credit' => ['nullable','string'],
            'duration' => ['nullable','string'],
            'is_featured' => ['nullable', 'boolean'],
            'is_inactive' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
