<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class OnlineTopicRequest extends FormRequest
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
            'class_name_id' => ['required', 'integer'],
            'subject_id' => ['required', 'integer'],
            'title' => ['required', 'string', Rule::unique('online_topics', 'title')->where(function ($query) {
                return $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId())
                    ->where('class_name_id', $this->input('class_name_id'))
                    ->where('subject_id', $this->input('subject_id'));
            })->ignore($this->route('id'))]
        ];
    }
}
