<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffProductAllocationRequest extends FormRequest
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
            'staff_id' => ['required', 'integer'],
            'date_at' => ['required', 'date'],
            'description' => ['required', 'string'],
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'integer'],
            'items.*.available_quantity' => ['required', 'numeric', 'min:1'],
            'items.*.allocate_quantity' => ['required', 'numeric', 'min:1'],
            'items.*.description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'staff_id.required' => 'required',
            'date_at.required' => 'required',
            'description.required' => 'required',
            'items.required' => 'required',
            'items.array' => 'required',
            'items.*.product_id.required' => 'required',
            'items.*.available_quantity.required' => 'required',
            'items.*.allocate_quantity.required' => 'required'
        ];
    }
}
