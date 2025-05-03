<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'audience_type' => ['required', 'string'],
            'news_type' => ['required', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_inactive' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
            'news_image' => ['nullable', 'file', 'mimes:png,bmp,jpg', 'max:1024'],
            'classroom_ids' => ['nullable', 'array'],
        ];
    }
}
