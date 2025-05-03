<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PaymentMonthRequest extends FormRequest
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
            'title' => ['required', 'string', Rule::unique('payment_months', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            })->ignore($this->route('id'))],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'start_date.required' => 'required',
            'end_date.required' => 'required'
        ];
    }
}
