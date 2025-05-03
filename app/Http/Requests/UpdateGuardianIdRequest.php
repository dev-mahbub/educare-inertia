<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGuardianIdRequest extends FormRequest
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
            'guardianid' => ['nullable', 'string', Rule::unique('guardians', 'guardianid')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId());
            })->ignore($this->route('id'))],
        ];
    }


    public function messages()
    {
        return [
            'guardianid.unique' => 'already exists'
        ];
    }
}
