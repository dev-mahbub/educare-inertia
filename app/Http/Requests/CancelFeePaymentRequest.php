<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CancelFeePaymentRequest extends FormRequest
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
            'student_id' => ['required', 'integer'],
            'payment_method_id' => ['required', 'integer'],
            'cancel_reason' => ['required', 'string'],
        ];
    }
}
