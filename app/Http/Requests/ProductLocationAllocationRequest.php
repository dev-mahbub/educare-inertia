<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductLocationAllocationRequest extends FormRequest
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
            'product_id' => ['required', 'integer'],
            'infra_level_id' => ['required', 'integer'],
            'allocate_date' => ['required', 'date'],
            'allocate_quantity' => ['required', 'numeric', 'min:1']
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'Please select an item !',
            'infra_level_id.required' => 'Please select infra level !',
            'allocate_date.required' => 'required',
            'allocate_quantity.required' => 'required',
            'allocate_quantity.numeric' => 'Must be numeric',
            'allocate_quantity.min' => 'Minimum quantity is 1'
        ];
    }
}
