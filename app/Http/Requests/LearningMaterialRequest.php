<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LearningMaterialRequest extends FormRequest
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
            'learning_material_group_id' => ['required', 'integer'],
            'online_topic_id' => ['nullable', 'integer'],
            'title' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'resources' => ['nullable', 'array'],
            'resources.*.resourse_type' => ['required', 'string'],
            'resources.*.title' => ['nullable', 'string'],
            'resources.*.link' => ['nullable', 'string'],
            'resources.*.youtube_link' => ['nullable', 'string'],
            'resources.*.worksheet' => ['nullable', 'file', 'mimes:pdf,doc,ppt,docx'],
            'resources.*.document' => ['nullable', 'file', 'mimes:pdf,doc,ppt,docx'],
            'resources.*.upload_picture' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'resources.*.upload_audio' => ['nullable', 'file', 'mimes:aac,amr,mpeg,mp3'],
            'resources.*.description' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'resources.*.resourse_type.required' => 'required',
        ];
    }
}
