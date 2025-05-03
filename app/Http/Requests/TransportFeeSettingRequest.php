<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransportFeeSettingRequest extends FormRequest
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
            'school_id'        => ['nullable', 'integer'],
            'teacher_transport_payable' => ['nullable', 'string'],
            'company'          => ['nullable', 'string'],
            'fee_structure'    => ['nullable', 'integer'],
            'status'           => ['nullable', 'string'],
            
        ];
    }
}
