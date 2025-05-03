<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class LeaveApproverRequest extends FormRequest
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
            'staff_id' => ['required', Rule::unique('leave_approvers', 'staff_id')->where('school_id', getUserSchoolId()), 'integer']
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'required',
            'staff_id.unique' => 'Leave approver already exists!',
        ];
    }
}
