<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SmsCircularRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'template_category_id' => ['nullable'],
            'template_id' => ['nullable'],
            'title' => ['required', 'string'],
            'audience_type' => ['required', 'string'],
            'content' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'audience_type.required' => 'required',
            'content.required' => 'required'
        ];
    }
}
