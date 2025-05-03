<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalePriceRequest extends FormRequest
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
            'category_id' => ['nullable', 'integer'],
            'sub_category_id' => ['nullable', 'integer'],
            'sale_price' => ['required', 'integer'],
            'applied_date_at' => ['required'],
            'note' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }
}
