<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HostelVoucherRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'hostel_fee_id' => ['required', 'integer'],
            'selected_vouchers' => ['required', 'array'],
            'selected_students' => ['required', 'array'],
            'status' => ['nullable', 'string'],
        ];
    }
}
