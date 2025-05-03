<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class TypeRequest extends FormRequest
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
            'vendor_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255', Rule::unique('types', 'title')->where(function ($query) {
                $query->where(function ($query) {
                    $query->where('school_id', getUserSchoolId())
                        ->where('is_system_default', false);
                })->orWhere(function ($query) {
                    $query->whereNull('school_id')
                        ->where('is_system_default', true);
                });
            })->ignore($this->route('id'))],
            'sub_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'title.unique' => 'Title already exists',
            'sub_type.required' => 'Type is required',
        ];
    }
}
