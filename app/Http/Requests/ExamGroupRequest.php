<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamGroupRequest extends FormRequest
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
            'report_card_type' => 'required|exists:result_card_configurations,id',
            'parent' => 'nullable|integer',
            'title' => 'required|string',
            'display_order' => 'nullable|integer',
            'is_exam' => 'nullable|boolean',
            'exam_id' => 'nullable|integer',
            'is_exam_mark_added_grandTotal' => 'nullable|boolean',
            'is_grand_total_row_to_be_show' => 'nullable|boolean',
            'is_grand_grade_row_to_be_show' => 'nullable|boolean',
            'is_exam_marks_to_be_added_in_grand_total' => 'nullable|boolean',
            'is_grand_percentage_row_to_be_show' => 'nullable|boolean',
            'grouping_type' => 'required|string|in:Scholastic,CoScholastic',
            'conversion_type' => 'required|string',
            'calculation_perform' => 'required|string',
            'calculation_type' => 'required|string',
            'weightage' => 'nullable|integer',
            'affiliated_title' => 'nullable|string',
            'show_children' => 'nullable|boolean',
            'is_rank_given' => 'nullable|boolean',
            'status' => 'nullable|string',
            'show_total' => 'nullable|boolean',
            'show_affiliation_no' => 'nullable|boolean',
            'show_school_code' => 'nullable|boolean',
            'show_date_of_birth' => 'nullable|boolean',
            'show_print_date' => 'nullable|boolean',
            'show_cbse_logo' => 'nullable|boolean',
            'show_icse_logo' => 'nullable|boolean',
            'show_grading_scale' => 'nullable|boolean',
            'show_optional_subject' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'report_card_type.required' => 'required',
            'report_card_type.exists' => 'This report card type does not exists.',
            'parent.required' => 'required',
            'title.required' => 'required',
            'grouping_type.required' => 'required',
            'conversion_type.required' => 'required',
            'calculation_perform.required' => 'required',
            'calculation_type.required' => 'required',
            'weightage.integer' => 'must be an integer value',
        ];
    }
}
