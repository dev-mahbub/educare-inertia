<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EnquiryFollowUpRequest extends FormRequest
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
            'activity' => ['required', 'string'],
            'enquiry_id' => ['required'],
            'activity_date_at' => ['required'],
            'follow_date_at' => ['nullable', 'date'],
            'next_action' => ['nullable', 'string'],
            'is_next_action' => ['nullable', 'boolean'],
        ];
    }


    public function messages()
    {
        return [
            'activity' => 'required',
            'activity_date_at' => 'required',
        ];
    }
}
