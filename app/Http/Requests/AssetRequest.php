<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssetRequest extends FormRequest
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
            'classroom_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'topic_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'video_link' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'is_publish' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
