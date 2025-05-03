<?php

namespace App\Http\Requests;

use App\Models\CustomField;
use App\Enums\StudentStaffFieldType;
use Illuminate\Foundation\Http\FormRequest;

class CustomFieldRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if ($this->input('custom_field_type') == StudentStaffFieldType::TEACHER->value) {
                        $exists = CustomField::where($attribute, $value)
                            ->where('school_id', getUserSchoolId())
                            ->where('custom_field_type', StudentStaffFieldType::TEACHER->value)
                            ->where('id', '!=', $this->route('id'))
                            ->exists();

                        if ($exists) {
                            $fail("The {$attribute} has already been taken.");
                        }
                    }
                }
            ],
            'form_section' => ['nullable', 'required_unless:custom_field_type,Teacher', 'string'],
            'data_type' => ['required', 'string'],
            'input_length' => ['nullable', 'required_unless:data_type,Date,List', 'integer'],
            'is_required' => ['nullable', 'boolean'],
            'custom_field_type' => ['required', 'string'],
            'display_order' => ['nullable', 'integer'],
            'list_value' => ['nullable', 'required_if:data_type,List', 'string'],
            'status' => ['nullable', 'string']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'required',
            'form_section.required_unless' => 'required',
            'data_type.required' => 'required',
            'input_length.required_unless' => 'required',
            'list_value.required_if' => 'required',
            'custom_field_type.required' => 'required'
        ];
    }
}
