<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EBookRequest extends FormRequest
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
            'category_id' => ['nullable', 'integer'],
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'book_title' => ['required', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:255'],
            'edition' => ['nullable', 'string', 'max:255'],
            'document' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }
}
