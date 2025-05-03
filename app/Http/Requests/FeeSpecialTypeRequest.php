<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeeSpecialTypeRequest extends FormRequest
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
            'fee_type' => ['required', 'string'],
            'installment_type' => ['required', 'string'],
            'category_id' => ['nullable', 'string'],
            'display_name' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_fee_refundable' => ['nullable', 'boolean'],
        ];
    }
}
