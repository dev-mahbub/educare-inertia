<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisitorEnquiryRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email'],
            'enquiry_type' => ['nullable'],
            'enquiry_date' => ['nullable'],
            'in_time' => ['nullable'],
            'appointment_date' => ['nullable'],
            'appointment_time' => ['nullable'],
            'person_to_meet' => ['nullable'],
            'purpose_of_visit' => ['nullable'],
            'vehicle_no' => ['nullable'],
            'enquiry_message' => ['nullable'],
            'address' => ['nullable'],
            'visitor_photo' => ['nullable'],
            'created_by' => ['nullable'],
        ];
    }
}
