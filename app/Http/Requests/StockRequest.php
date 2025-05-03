<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StockRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'quantity' => ['nullable', 'string'],
            'amount' => ['nullable', 'string'],
            'is_not_available' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
