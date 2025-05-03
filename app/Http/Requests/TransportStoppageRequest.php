<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class TransportStoppageRequest extends FormRequest
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
            'area_id'          => ['required', 'integer'],
            'transport_route_id' => ['required', 'integer'],
            'order'            => ['nullable', 'numeric'],
            'stoppage'         => [
                'required',
                'string',
                Rule::unique('transport_stoppages', 'stoppage')
                    ->where('school_id', getUserSchoolId())
                    ->ignore($this->route('id'))
            ],
            'pick_price'       => ['nullable', 'string'],
            'drop_price'       => ['nullable', 'string'],
            'pick_drop_price'  => ['nullable', 'string'],
            'pickup_time_at'   => ['nullable', 'string'],
            'drop_time_at'     => ['nullable', 'string'],
            'distance'         => ['nullable', 'string'],
            'status'           => ['nullable', 'string'],
        ];
    }
}
