<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResultCardRequest extends FormRequest
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
            'board_id' => ['nullable', 'integer'],
            'exam_id' => ['nullable', 'integer'],
            'classroom_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'is_exam' => ['nullable', 'boolean'],
            'is_publish' => ['nullable', 'boolean'],
            'is_send_message' => ['nullable', 'boolean'],
            'is_show_children' => ['nullable', 'boolean'],
            'is_given_rank' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
