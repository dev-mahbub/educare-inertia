<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectRequest extends FormRequest
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
            'id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'e_learning_subject_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'is_practical_paper' => ['required', 'string', 'max:255'],
            'is_co_scholastic' => ['required', 'string', 'max:255'],
            'short_title' => ['nullable', 'string'],
            'grade' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
