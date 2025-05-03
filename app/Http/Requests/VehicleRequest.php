<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
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
            'driver_id' => ['nullable', 'integer'],
            'conductor_id' => ['nullable', 'integer'],
            'transport_provider_id' => ['nullable', 'integer'],
            'vehicle_number' => ['required', 'string', 'max:255'],
            'total_seat' => ['nullable', 'integer'],
            'registration_number' => ['nullable', 'string'],
            'chassis_number' => ['nullable', 'string'],
            'finance_name' => ['nullable', 'string'],
            'engine_number' => ['nullable', 'string'],
            'company_name' => ['nullable', 'string'],
            'tank_capacity' => ['nullable', 'string'],
            'model' => ['nullable', 'string'],
            'type' => ['nullable', 'string'],
            'fuel_type' => ['required', 'string'],
            'owner_name' => ['nullable', 'string'],
            'device_id' => ['nullable', 'string'],
            'insurance_upto' => ['nullable', 'date'],
            'road_tax_upto' => ['nullable', 'date'],
            'pollution_upto' => ['nullable', 'date'],
            'permit_upto' => ['required', 'date'],
            'registration_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
