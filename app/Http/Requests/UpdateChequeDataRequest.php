<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChequeDataRequest extends FormRequest
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
            'type' => ['required', 'string'],
            'cheque_status' => ['exclude_unless:type,cheque_status', 'required_if:type,cheque_status', 'string'],
            'cheque_no' => ['exclude_unless:type,cheque_no', 'required_if:type,cheque_no', 'integer'],
            'cheque_date' => ['exclude_unless:type,cheque_no', 'required_if:type,cheque_no', 'date'],
            'clearance_date' => ['exclude_unless:type,clearance_date', 'required_if:type,clearance_date', 'date'],
            'clearance_note' => ['exclude_unless:type,clearance_date', 'required_if:type,clearance_date', 'string', 'max:255'],
        ];
    }


    public function messages(): array
    {
        return [
            'cheque_status.required_if' => 'required',
            'cheque_no.required_if' => 'required',
            'cheque_date.required_if' => 'required',
            'clearance_date.required_if' => 'required',
            'clearance_note.required_if' => 'required',
        ];
    }
}
