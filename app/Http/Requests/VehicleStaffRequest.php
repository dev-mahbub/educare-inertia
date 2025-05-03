<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleStaffRequest extends FormRequest
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
            'id' => ['nullable'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'type' => ['required'],
            'birth_date_at' => ['required', 'date'],
            'gender' => ['required', 'string'],
            'age' => ['required', 'integer'],
            'blood_group' => ['nullable', 'string'],
            'contact' => ['required', 'numeric', 'max_digits:10'],
            'emergency_no' => ['nullable', 'numeric', 'max_digits:10'],
            'driving_license' => ['nullable', 'string'],
            'proof_type' => ['required', 'string'],
            'proof_no' => ['required', 'string'],
            'experience' => ['nullable', 'string'],
            'relative_name' => ['nullable', 'string'],
            'pincode' => ['nullable', 'integer', 'max_digits:6'],
            'city' => ['required', 'string'],
            'state' => ['required', 'string'],
            'address' => ['nullable', 'string'],
            'driver_image' => ['nullable', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'status' => ['required', 'string']
        ];
    }
}
