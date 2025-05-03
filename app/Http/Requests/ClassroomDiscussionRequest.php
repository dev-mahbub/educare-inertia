<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomDiscussionRequest extends FormRequest
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
        // return [
        //     'school_id' => ['nullable', 'integer'],
        //     'subject_id' => ['required', 'integer'],
        //     'topic_id' => ['required', 'integer'],
        //     'title' => ['required', 'string', 'max:255'],
        //     'grade' => ['nullable', 'string'],
        //     'choice' => ['nullable', 'string'],
        //     'start_date_at' => ['nullable'],
        //     'end_date_at' => ['nullable'],
        //     'description' => ['nullable', 'string'],
        //     'status' => ['nullable', 'string'],
        // ];

        return [
            'school_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'topic_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'grade' => ['nullable', 'string'],
            'choice' => ['nullable', 'string'],
            'start_date_at' => ['nullable'],
            'end_date_at' => ['nullable'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'subject_id.required' => 'Subject is required.',
            'topic_id.required' => 'Topic is required.',
            'title.required' => 'Title is required',
        ];
    }
}