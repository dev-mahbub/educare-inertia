<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductQuantityRequest extends FormRequest
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
            'product_id' => ['required', 'integer'],
            'vendor_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer'],
            'description' => ['nullable'],
            'type' => ['nullable'],
            'date_at' => ['nullable'],
            'status' => ['nullable'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Product is required',
            'product_id.integer' => 'Product is required',
            'vendor_id.required' => 'Vendor is required',
            'vendor_id.integer' => 'Vendor is required',
            'quantity.required' => 'Quantity is required',
        ];
    }
}
