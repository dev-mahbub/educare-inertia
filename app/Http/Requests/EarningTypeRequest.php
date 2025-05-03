<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class EarningTypeRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                Rule::unique('earning_types', 'title')
                    ->where(function ($query) {
                        $query->whereNull('school_id')
                            ->orWhere('school_id', getUserSchoolId());
                    })
                    ->ignore($this->route('id'))
            ],
            'description' => ['nullable', 'string']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'title.unique' => 'This earning already exists!',
        ];
    }
}
