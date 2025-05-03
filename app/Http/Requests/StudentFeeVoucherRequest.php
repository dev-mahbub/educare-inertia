<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StudentFeeVoucherRequest extends FormRequest
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
            'voucher_mode' => ['required', 'string', 'in:Individual,Multiple'],
            'student_id' => ['exclude_unless:voucher_mode,Individual', 'required_if:voucher_mode,Individual', 'nullable', 'integer'],
            'classroom_id' => ['exclude_unless:voucher_mode,Multiple', 'required_if:voucher_mode,Multiple', 'nullable', 'integer'],
            'title' => [
                'required',
                'string',
                Rule::unique('student_fee_vouchers', 'title')
                    ->ignore($this->route('studentFeeVoucher'))
                    ->where('student_id', $this->input('student_id')),
            ],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'fee_type_amounts' => ['required', 'array'],
            'fee_type_amounts.*.fee_type_id' => ['required', 'integer'],
            'fee_type_amounts.*.amount' => ['required'],
        ];
    }


    public function messages(): array
    {
        return [
            'student_id.required_if' => 'required',
            'classroom_id.required_if' => 'required',
        ];
    }
}
