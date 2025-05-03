<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class FeeTypeRequest extends FormRequest
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
            'fee_type' => ['required', 'string', Rule::unique('fee_types', 'fee_type')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId());
            })->ignore($this->route('id'))],
            'installment_type' => ['required', 'string'],
            'category_id' => ['nullable', 'string'],
            'display_name' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_fee_refundable' => ['nullable', 'boolean'],
            'is_late_fee' => ['nullable', 'boolean', Rule::unique('fee_types', 'is_late_fee')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('is_late_fee', 1);
            })->ignore($this->route('id'))],
            'is_transport_fee' => ['nullable', 'boolean', Rule::unique('fee_types', 'is_transport_fee')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('is_transport_fee', 1);
            })->ignore($this->route('id'))],
        ];
    }


    public function messages()
    {
        return [
            'is_late_fee.unique' => 'late fee already exists.',
            'is_transport_fee.unique' => 'transport fee already exists.'
        ];
    }
}
