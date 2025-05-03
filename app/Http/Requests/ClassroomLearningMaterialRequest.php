<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomLearningMaterialRequest extends FormRequest
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
            'type' => ['required', 'string', 'in:all_group,single_group,single_material'],
            'class_name_id' => ['exclude_unless:type,all_group', 'required_if:type,all_group', 'integer'],
            'subject_id' => ['exclude_unless:type,all_group', 'required_if:type,all_group', 'integer'],
            'learning_material_group_id' => ['exclude_unless:type,single_group,single_material', 'required_if:type,single_group', 'required_if:type,single_material', 'integer'],
            'learning_material_id' => ['exclude_unless:type,single_material', 'required_if:type,single_material', 'integer'],
            'class_subject_id' => ['required', 'integer'],
            'classroom_ids' => ['required', 'array'],
        ];
    }

    public function messages()
    {
        return [
            'class_name_id.required_if' => 'required',
            'subject_id.required_if' => 'required',
            'learning_material_group_id.required_if' => 'required',
            'learning_material_id.required_if' => 'required',
            'class_subject_id.required' => 'required',
            'classroom_ids.required' => 'required'
        ];
    }
}
