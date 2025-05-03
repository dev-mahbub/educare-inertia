<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChequeRequest extends FormRequest
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
            'classroom_id' => ['required', 'integer'],
            'student_id' => ['required', 'integer'],
            'cheque_array' => ['required', 'array'],
            'cheque_array.*.bank_id' => ['required', 'integer'],
            'cheque_array.*.cheque_no' => ['required', 'integer'],
            'cheque_array.*.cheque_date' => ['required', 'date'],
            'cheque_array.*.pay_date' => ['nullable', 'date'],
            'cheque_array.*.amount' => ['required', 'integer'],
            'cheque_array.*.branch' => ['required', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'classroom_id.required' => 'required',
            'student_id.required' => 'required',
            'cheque_array.*.bank_id.required' => 'required',
            'cheque_array.*.cheque_no.required' => 'required',
            'cheque_array.*.cheque_date.required' => 'required',
            'cheque_array.*.amount.required' => 'required',
            'cheque_array.*.branch.required' => 'required',
            'cheque_array.*.cheque_no.integer' => 'must be an integer',
            'cheque_array.*.amount.integer' => 'must be an integer',
            'cheque_array.*.branch.string' => 'must be string',
        ];
    }
}
