<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ClassFeeStructureRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255', Rule::unique('class_fee_structures', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            })->ignore($this->route('id'))],
            'description' => ['nullable', 'string'],
            'structure_type' => ['required', 'string'],
            'selected_class_ids' => ['required', 'array'],
            'fee_type_amount_array' => ['nullable', 'array'],
            'fee_type_amount_array.*.fee_id' => ['required'],
            'fee_type_amount_array.*.fee_type_id' => ['required'],
            'fee_type_amount_array.*.amount' => ['required', 'numeric'],
            'fee_type_amount_array.*.semester' => ['required', 'integer'],
            'fee_type_amount_array.*.is_admission_installment' => ['required', 'boolean'],
            'old_fee_type_amount_array' => ['nullable', 'array'],
            'old_fee_type_amount_array.*.fee_id' => ['required'],
            'old_fee_type_amount_array.*.fee_type_id' => ['required'],
            'old_fee_type_amount_array.*.amount' => ['required', 'numeric'],
            'old_fee_type_amount_array.*.semester' => ['required', 'integer'],
            'old_fee_type_amount_array.*.is_admission_installment' => ['required', 'boolean'],
        ];
    }


    public function messages()
    {
        return [
            'selected_class_ids.required' => 'Please select at least one class.',
            'fee_type_amount_array.required' => 'Please select at least one fee.',
            'fee_type_amount_array.*.amount.required' => 'Selected fee type amount is required.',
            'fee_type_amount_array.*.amount.integer' => 'Selected fee type amount must be integer.',
            'fee_type_amount_array.*.semester.required' => 'Selected fee type semester is required.',
            'fee_type_amount_array.*.semester.integer' => 'Selected fee type semester must be integer.',
            'old_fee_type_amount_array.required' => 'Please select at least one fee.',
            'old_fee_type_amount_array.*.amount.required' => 'Selected fee type amount is required.',
            'old_fee_type_amount_array.*.amount.integer' => 'Selected fee type amount must be integer.',
            'old_fee_type_amount_array.*.semester.required' => 'Selected fee type semester is required.',
            'old_fee_type_amount_array.*.semester.integer' => 'Selected fee type semester must be integer.',
        ];
    }
}
