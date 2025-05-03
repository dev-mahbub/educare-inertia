<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AreaRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('areas', 'title')
                    ->where('school_id', getUserSchoolId())
                    ->ignore($this->route('id'))
            ],
            'pick_price' => ['nullable', 'numeric'],
            'drop_price' => ['nullable', 'numeric'],
            'pick_drop_price' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
