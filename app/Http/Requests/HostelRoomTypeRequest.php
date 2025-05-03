<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HostelRoomTypeRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:100'],
            'no_of_bed' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'id' => ['nullable'],
        ];
    }
}
