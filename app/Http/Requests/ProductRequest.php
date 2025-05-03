<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'category_id' => ['required', 'integer'],
            'sub_category_id' => ['nullable'],
            'uom_id' => ['nullable'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'type' => ['required'],
            'opening_stock' => ['nullable', 'integer'],
            'rate_per_product' => ['nullable', 'integer'],
            'gst_tax' => ['nullable', 'integer'],
            'product_code' => ['nullable'],
            'product_size' => ['nullable'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Category is required',
            'category_id.integer' => 'Category is required',
            'title.required' => 'Title is required',
            'description.required' => 'Description is required',
            'type.required' => 'Type is required',
        ];
    }
}
