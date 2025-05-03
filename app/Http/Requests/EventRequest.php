<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'academic_year_id' => ['nullable', 'integer'],
            'created_by' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'event_type' => ['nullable', 'string'],
            'event_level' => ['nullable', 'string'],
            'available_seat' => ['nullable', 'integer'],
            'teaser' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'start_time' => ['nullable', 'string'],
            'location' => ['nullable', 'string'],
            'join_url' => ['nullable', 'string'],
            'visible_from' => ['nullable', 'string'],
            'visible_to' => ['nullable', 'string'],
            'registration_start_at' => ['nullable', 'string'],
            'registration_end_at' => ['nullable', 'string'],
            'is_inactive' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'event_image' => ['nullable', 'file', 'mimes:png,bmp,jpg,jpeg', 'max:1024'],
            'event_budget' => ['nullable', 'numeric'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'required',
            'start_date.required' => 'required',
            'end_date.required' => 'required',
        ];
    }
}
