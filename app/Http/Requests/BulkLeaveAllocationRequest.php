<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkLeaveAllocationRequest extends FormRequest
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
            'staff_leave_allocations' => ['required', 'array'],
            'staff_leave_allocations.*.staff_id' => ['required', 'integer'],
            'staff_leave_allocations.*.leave_allocations' => ['required', 'array'],
            'staff_leave_allocations.*.leave_allocations.*.leave_type_id' => ['required', 'integer'],
            'staff_leave_allocations.*.leave_allocations.*.days' => ['nullable'],
        ];
    }
}
