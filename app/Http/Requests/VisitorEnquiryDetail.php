<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisitorEnquiryDetail extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'visitor_enquiry_id' => ['nullable'],
            'activity_date' => ['nullable'],
            'follow_date' => ['nullable'],
            'created_by' => ['nullable'],
            'status' => ['nullable'],
        ];
    }
}
