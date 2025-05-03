<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HostelFeeRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'total' => ['required', 'numeric'],
            'hostel_fee_types' => ['required', 'array'],
            'hostel_fee_types.*.fee_type_id' => ['required'],
            'hostel_fee_types.*.amount' => ['required', 'numeric'],
            'status' => ['nullable', 'string'],
        ];
    }


    // public function messages(): array
    // {
    //     return [
    //         'student_id.required' => 'required',
    //         'cheque_array.*.bank_id.required' => 'required',
    //         'cheque_array.*.cheque_no.required' => 'required',
    //         'cheque_array.*.cheque_date.required' => 'required',
    //         'cheque_array.*.amount.required' => 'required',
    //         'cheque_array.*.branch.required' => 'required',
    //         'cheque_array.*.cheque_no.integer' => 'must be an integer',
    //         'cheque_array.*.amount.integer' => 'must be an integer',
    //         'cheque_array.*.branch.string' => 'must be string',
    //     ];
    // }
}
