<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VirtualAssetRequest extends FormRequest
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
            'created_by' => ['nullable', 'integer'],
            'class_name_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'online_topic_id' => ['nullable', 'integer'],
            'title' => ['required', 'string'],
            'asset_type' => ['nullable', 'string'],
            'video_link' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_publish' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}