<?php

namespace App\Http\Controllers;

use App\Enums\CustomFieldFormSection;
use App\Enums\StudentStaffFieldType;
use App\Enums\CustomFieldDataType;
use App\Http\Requests\CustomFieldRequest;
use App\Repositories\CustomFieldRepository;
use App\Repositories\ICustomFieldRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class CustomFieldController extends Controller
{

    public function __construct(
        private ICustomFieldRepository $customFieldRepository
    ) {
        $this->middleware('permission:view custom fields', ['only' => ['index']]);
        $this->middleware('permission:add custom fields', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit custom fields', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete custom fields', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(): Response
    {
        $custom_fields = $this->customFieldRepository->getActiveAll();

        //Staff Student Type
        $student_staff_type = StudentStaffFieldType::cases();
        $student_staff_types = array();
        foreach ($student_staff_type as $staff_student) {
            array_push($student_staff_types, ['id' => $staff_student->value, 'title' => $staff_student->value]);
        }

        //From section
        $field_form_section = CustomFieldFormSection::cases();
        $field_form_types = array();
        foreach ($field_form_section as $field_type) {
            if (in_array($field_type, [
                CustomFieldFormSection::STUDENT_DETAILS_FOR_REGISTRATION,
                CustomFieldFormSection::FATHER_DETAILS_FOR_REGISTRATION,
                CustomFieldFormSection::MOTHER_DETAILS_FOR_REGISTRATION,
                CustomFieldFormSection::PRESENT_ADDRESS_FOR_REGISTRATION,
                CustomFieldFormSection::PERMANENT_ADDRESS_FOR_REGISTRATION
            ])) {
                array_push($field_form_types, ['id' => $field_type->value, 'title' => $field_type->value, 'field_type' => StudentStaffFieldType::REGISTERFORSTUDENT->value]);
            } else {
                array_push($field_form_types, ['id' => $field_type->value, 'title' => $field_type->value, 'field_type' => StudentStaffFieldType::STUDENT->value]);
            }
        }

        //Data type
        $field_data_type = CustomFieldDataType::cases();
        $data_types = array();
        foreach ($field_data_type as $data_type) {
            array_push($data_types, ['id' => $data_type->value, 'title' => $data_type->value]);
        }

        return Inertia::render('CustomField/Show', [
            'custom_fields' => $custom_fields,
            'field_form_types' => $field_form_types,
            'student_staff_types' => $student_staff_types,
            'data_types' => $data_types,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $categories = $this->customFieldRepository->getActiveAll();

        return Inertia::render('CustomField/Create', [
            'categories' => $categories,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(CustomFieldRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'custom_field_type' => $input['custom_field_type'] ?? "",
            'form_section' =>  $input['form_section'] ?? "",
            'data_type' =>  $input['data_type'] ?? "",
            'input_length' =>  intval($input['input_length']) ?? "",
            'display_order' => intval($input['display_order']) ?? "",
            'is_required' => !empty($input['is_required']) ? true : false,
            'list_value' => $input['list_value'] ?? null,
            'status' => Status::ACTIVE
        );

        $custom_field = $this->customFieldRepository->create($dataArray);
        if (!$custom_field) {
            return redirect()->route('custom_field.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('custom_field.list')->with('message', 'Custom field created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('CustomField/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(CustomFieldRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'name' => $input['name'],
            'custom_field_type' => $input['custom_field_type'] ?? "",
            'form_section' =>  $input['form_section'] ?? "",
            'data_type' =>  $input['data_type'] ?? "",
            'input_length' =>  intval($input['input_length']) ?? "",
            'display_order' => intval($input['display_order']) ?? "",
            'is_required' => !empty($input['is_required']) ? true : false,
            'list_value' => $input['list_value'] ?? null
        );

        $custom_field = $this->customFieldRepository->update($id, $dataArray);
        if (!$custom_field) {
            return redirect()->route('custom_field.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('custom_field.list')->with('message', 'Custom field updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $customField = $this->customFieldRepository->getById($id);
        if (!$customField) {
            return redirect()->route('custom_field.list')->with('errors', 'Something goes wrong.');
        }
        $customField->delete($id);
        return redirect()->route('custom_field.list')->with('message', 'Custom field deleted successfully.');
    }
}
