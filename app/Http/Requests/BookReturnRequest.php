<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class BookReturnRequest extends FormRequest
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
            'school_id' => ['nullable', 'integer'],
            'book_item_id' => ['required', 'integer'],
            'book_acc_no_id' => ['required', 'integer'],
            'book_issue_id' => ['required', 'integer'],
            'student_id' => ['nullable', 'integer'],
            'staff_id' => ['nullable', 'integer'],
            'late_by_day' => ['nullable'],
            'late_by_fine' => ['nullable'],
            'return_date' => ['required', 'date'],
            'return_note' => ['nullable', 'string'],
            'book_user_type' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }
}
