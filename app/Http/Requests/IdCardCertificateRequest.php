<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IdCardCertificateRequest extends FormRequest
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
            'is_with_backpage' => ['nullable', 'boolean'],
            'orientation' => ['required', 'string'],
            'audience_type' => ['required', 'string'],
            'template_name' => ['required', 'string'],
            'columns' => ['required', 'array'],
            'background_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            'header_background_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            'body_background_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            'footer_background_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            'footer_signature_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            'backpage_background_image' => ['nullable', 'mimes:jpg,jpeg,png'],
            // 'background_color' => ['nullable', 'string'],
            // 'header' => ['nullable', 'array'],
            // 'body' => ['nullable', 'array'],
            // 'footer' => ['nullable', 'array'],
            // 'back_page' => ['nullable', 'array'],
        ];
    }
}
