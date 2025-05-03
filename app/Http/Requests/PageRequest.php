<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
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
            'image' => ['nullable', 'file', 'mimes:png,bmp,jpg', 'max:1024'],
            'body_text' => ['nullable', 'string'],
            'page_type' => ['required', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
