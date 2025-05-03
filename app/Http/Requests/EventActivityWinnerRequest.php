<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventActivityWinnerRequest extends FormRequest
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
            'participants' => ['required', 'array'],
            'participants.*.student_id' => ['required', 'integer'],
            'participants.*.is_winner' => ['required', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'participants.required' => "Please select at least one winner"
        ];
    }
}
