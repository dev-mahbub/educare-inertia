<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'order_type' => ['required', 'string', 'max:100'],
            'order_id' => ['required', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer'],
            'fee' => ['nullable', 'string'],
            'details' => ['nullable', 'string'],
            'payment_status' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
