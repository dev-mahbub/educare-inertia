<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class TransportRouteRequest extends FormRequest
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
            'school_id'        => ['nullable', 'integer'],
            'name'             => [
                'required',
                'string',
                'max:255',
                Rule::unique('transport_routes', 'name')
                    ->where('school_id', getUserSchoolId())
                    ->ignore($this->route('id'))
            ],
            'pickup_time_at'   => ['nullable'], // Validates time in the specified format
            'drop_time_at'     => ['nullable'],
            'vehicle_id'       => ['required', 'integer'],
            'staff_id'         => ['nullable', 'integer'],
            'status'           => ['nullable', 'string'],
        ];
    }
}


// "pickup_time_at" => "2024-03-16T09:29:00.239Z"
//       "drop_time_at" => "2024-03-16T09:30:00.813Z"
