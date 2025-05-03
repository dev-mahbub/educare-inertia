<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class FeeRequest extends FormRequest
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
            'academic_year_id' => ['nullable', 'integer'],
            'installment_no' => [
                'required', 'integer',
                Rule::unique('fees', 'installment_no')->where(function ($query) {
                    return $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId());
                })->ignore($this->route('id'))
            ],
            'title' => ['required', 'string'],
            'start_date_at' => ['required', 'date'],
            'end_date_at' => ['required', 'date'],
            'last_pay_date_at' => ['required', 'date'],
            'is_admission_install' => ['nullable', 'boolean'],
            'description' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'installment_no.required' => 'required',
            'installment_no.unique' => 'already taken.',
            'installment_no.integer' => 'must be an integer.',
            'title.required' => 'required.',
            'title.string' => 'must be string.',
            'start_date_at.required' => 'required.',
            'end_date_at.required' => 'required.',
            'last_pay_date_at.required' => 'required.',
        ];
    }
}
