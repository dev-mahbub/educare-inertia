<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AllocateTransportRequest extends FormRequest
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
            'student_id' => ['nullable', 'required_if:allocate_type_for,Student', 'integer'],
            'classroom_id' => ['nullable', 'required_if:allocate_type_for,Student', 'integer'],
            'staff_id' => ['nullable', 'required_if:allocate_type_for,Teacher', 'integer'],
            'voucher_id' => ['nullable', 'required_if:allocate_type_for,Student', 'integer'],
            'transport_route_id' => ['required', 'integer'],
            'transport_stoppage_id' => ['required', 'integer'],
            'allocate_type_for' => ['required', 'string'],
            'transport_type' => ['nullable'],
            'applied_on_date_at' => ['nullable'],
            'start_from_date' => ['nullable'],
            'student_ids' => ['nullable'],
            'amount' => ['required'],
            'status' => ['nullable'],

            // old
            // 'school_id' => ['nullable', 'integer'],
            // 'student_id' => ['required', 'integer'],
            // 'classroom_id' => ['required', 'integer'],
            // 'staff_id' => ['nullable', 'integer'],
            // 'voucher_id' => ['required', 'integer'],
            // 'transport_route_id' => ['required', 'integer'],
            // 'transport_stoppage_id' => ['required', 'integer'],
            // 'allocate_type_for' => ['nullable'],
            // 'transport_type' => ['nullable'],
            // 'applied_on_date_at' => ['nullable'],
            // 'start_from_date' => ['nullable'],
            // 'student_ids' => ['nullable'],
            // 'amount' => ['required'],
            // 'status' => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            'student_id.required_if' => 'This field is required.',
            'classroom_id.required_if' => 'This field is required.',
            'staff_id.required_if' => 'This field is required.',
            'voucher_id.required_if' => 'This field is required.',
            'voucher_id.integer' => 'This field is required.',
            'transport_route_id.required' => 'This field is required.',
            'transport_route_id.integer' => 'This field is required.',
            'transport_stoppage_id.integer' => 'This field is required.',
            'transport_stoppage_id.required' => 'This field is required.',
            'amount.required' => 'This field is required.',

            // old
            // 'student_id.required' => 'This field is required.',
            // 'classroom_id.required' => 'This field is required.',
            // 'voucher_id.required' => 'This field is required.',
            // 'voucher_id.integer' => 'This field is required.',
            // 'transport_route_id.required' => 'This field is required.',
            // 'transport_route_id.integer' => 'This field is required.',
            // 'transport_stoppage_id.integer' => 'This field is required.',
            // 'transport_stoppage_id.required' => 'This field is required.',
            // 'amount.required' => 'This field is required.',
        ];
    }
}
