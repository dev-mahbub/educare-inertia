<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Imports\StaffImport;
use Illuminate\Http\Request;
use App\Imports\ProductImport;
use App\Imports\StudentImport;
use App\Imports\ExamMarkImport;
use App\Imports\QuestionImport;
use App\Http\Requests\JobRequest;
use Illuminate\Support\Facades\DB;
use App\Imports\StaffEarningImport;
use App\Repositories\JobRepository;
use App\Imports\StudentUpdateImport;
use App\Repositories\IJobRepository;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StaffImportRequest;
use App\Exports\StaffImportTemplateExport;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\ProductImportRequest;
use App\Http\Requests\StudentImportRequest;
use App\Exports\StudentImportTemplateExport;
use App\Exports\StudentUpdateTemplateExport;
use App\Http\Requests\ExamMarkImportRequest;
use App\Http\Requests\QuestionImportRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StaffEarningImportRequest;

class ImportController extends Controller
{

    private $studentColumns = [
        'admission_no' => false,
        'roll_number' => false,
        'student_first_name' => false,
        'student_middle_name' => false,
        'student_last_name' => false,
        'gender' => false,
        'address' => false,
        'category' => false,
        'dob' => false,
        'doa' => false,
        'blood_group' => false,
        'aadhar_card_no' => false,
        'religion' => false,
        'father_first_name' => false,
        'father_middle_name' => false,
        'father_last_name' => false,
        'father_phone' => false,
        'sms_no' => false,
        'father_email' => false,
        'primary_qualification' => false,
        'father_occupation' => false,
        'father_company' => false,
        'father_designation' => false,
        'mother_first_name' => false,
        'mother_middle_name' => false,
        'mother_last_name' => false,
        // 'secondary_phone' => false,
        // 'secondary_email' => false,
        // 'secondary_qualification' => false,
        // 'secondary_occupation' => false,
        // 'secondary_company' => false,
        // 'secondary_designation' => false,
        'guardian_name' => false,
        'guardian_relation' => false,
        'guardian_qualification' => false,
        'guardian_occupaiton' => false,
        'guardian_designation' => false,
        'guardian_department' => false,
        'guardian_office_address' => false,
        'guardian_contact_no' => false,
        'bank' => false,
        'bank_code_no' => false,
        'branch_name' => false,
        'ifsc' => false,
        'account_number' => false,
        'micr' => false,
        'house' => false,
        'mother_tongue' => false,
        'caste' => false,
        'father_aadhar' => false,
        'mother_aadhar' => false,
        'employment_category' => false,
        'admission_class' => false,
        'student_height' => false,
        'student_weight' => false,
        'samagra_id' => false,
        'child_id' => false,
    ];


    public function __construct(
        private IJobRepository $jobRepository,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
    ) {
        // do something
        $this->middleware('permission:view school import', ['only' => ['index']]);
        $this->middleware('permission:add school import', ['only' => [
            'importStudentData',
            'saveImportStudentData',
            'downloadStudentImportTemplate',
            'importUpdateStudentData',
            'saveImportStudentUpdateData',
            'downloadStudentUpdateImportTemplate',
            'importStaffData',
            'saveImportStaffData',
            'downloadStaffImportTemplate',
            'save'
        ]]);
        $this->middleware('permission:edit school import', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete school import', ['only' => ['destroy']]);

        //
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $jobs = $this->jobRepository->getActiveAll();

        return Inertia::render('Job/Show', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Import Student Data.
     */
    public function importStudentData(): Response
    {
        return Inertia::render('Import/StudentImportForm', [
            'status' => session('status'),
        ]);
    }


    /**
     *  save Import Student Data.
     */
    public function saveImportStudentData(StudentImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new StudentImport;

            Excel::import($import, $request->file('student_import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Student imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    /*
    *   download student import template
    */
    public function downloadStudentImportTemplate()
    {
        return Excel::download(new StudentImportTemplateExport, 'student_import_template.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }


    /**
     * Import Student Data.
     */
    public function importUpdateStudentData(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $columns = $this->studentColumns;

        $columnLabels = [
            'admission_no' => 'AdmissionNo',
            'roll_number' => 'RollNumber',
            'student_first_name' => 'StudentFirstName',
            'student_middle_name' => 'StudentMiddleName',
            'student_last_name' => 'StudentLastName',
            'gender' => 'Gender',
            'address' => 'Address',
            'category' => 'Category',
            'dob' => 'Dob',
            'doa' => 'Doa',
            'blood_group' => 'BloodGroup',
            'aadhar_card_no' => 'Aadharcardno',
            'religion' => 'Religion',
            'father_first_name' => 'FatherFirstName',
            'father_middle_name' => 'FatherMiddleName',
            'father_last_name' => 'FatherLastName',
            'father_phone' => 'FatherPhone',
            'sms_no' => 'SmsNo',
            'father_email' => 'FatherEmail',
            'primary_qualification' => 'PrimaryQualification',
            'father_occupation' => 'FatherOccupation',
            'father_company' => 'FatherCompany',
            'father_designation' => 'FatherDesignation',
            'mother_first_name' => 'MotherFirstName',
            'mother_middle_name' => 'MotherMiddleName',
            'mother_last_name' => 'MotherLastName',
            // 'secondary_phone' => 'SecondaryPhone',
            // 'secondary_email' => 'SecondaryEmail',
            // 'secondary_qualification' => 'SecondaryQualification',
            // 'secondary_occupation' => 'SecondaryOccupation',
            // 'secondary_company' => 'SecondaryCompany',
            // 'secondary_designation' => 'SecondaryDesignation',
            'guardian_name' => 'GuardianName',
            'guardian_relation' => 'GuardianRelation',
            'guardian_qualification' => 'GuardianQualification',
            'guardian_occupaiton' => 'GuardianOccupaiton',
            'guardian_designation' => 'GuardianDesignation',
            'guardian_department' => 'GuardianDepartment',
            'guardian_office_address' => 'GuardianOfficeAddress',
            'guardian_contact_no' => 'GuardianContactNo',
            'bank' => 'BankName',
            'bank_code_no' => 'BankCodeNo',
            'branch_name' => 'BranchName',
            'ifsc' => 'IFSC',
            'account_number' => 'AccountNumber',
            'micr' => 'MICR',
            'house' => 'House',
            'mother_tongue' => 'MotherTongue',
            'caste' => 'Caste',
            'father_aadhar' => 'FatherAadhar',
            'mother_aadhar' => 'MotherAadhar',
            'employment_category' => 'EmploymentCategory',
            'admission_class' => 'AdmissionClass',
            'student_height' => 'StudentHeight',
            'student_weight' => 'StudentWeight',
            'samagra_id' => 'SamagraId',
            'child_id' => 'ChildId',
        ];

        return Inertia::render('Import/UpdateStudentForm', [
            'status' => session('status'),
            'classrooms' => $classrooms,
            'columns' => $columns,
            'columnLabels' => $columnLabels,
        ]);
    }

    /**
     *  save Import Student Data.
     */
    public function saveImportStudentUpdateData(StudentImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new StudentUpdateImport;

            Excel::import($import, $request->file('student_import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Student updated successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    /*
    *   download student update import template
    */
    public function downloadStudentUpdateImportTemplate(Request $request)
    {
        // $classroomIds = !empty($request->classroom_ids) ? explode(',', $request->classroom_ids) : [];
        $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        $columns = [];

        // filter selected columns
        foreach ($request->all() as $attribute => $value) {
            if (!in_array($attribute, ['classroom_ids', 'all_select_checkbox_id']) && in_array($attribute, array_keys($this->studentColumns)) && ($value == true || $value == "true")) {
                $columns[$attribute] = $value;
            }
        }

        // validation for classroom ids
        if (empty($classroomIds)) {
            return redirect()->route('import.student_update')->with(['error' => 'Class is required to download template.']);
        }

        // validation for columns
        if (empty($columns)) {
            return redirect()->route('import.student_update')->with(['error' => 'Column is required to download template.']);
        }

        $export = new StudentUpdateTemplateExport($classroomIds, $columns, $this->studentRepository);

        return Excel::download($export, 'student_update_import_template.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }


    /**
     * Import Staff Data.
     */
    public function importStaffData(): Response
    {
        return Inertia::render('Import/StaffImportForm', [
            'status' => session('status'),
        ]);
    }



    /**
     *  save Import Staff Data.
     */
    public function saveImportStaffData(StaffImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new StaffImport;

            Excel::import($import, $request->file('staff_import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Staff imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    /*
    *   download staff import template
    */
    public function downloadStaffImportTemplate()
    {
        return Excel::download(new StaffImportTemplateExport, 'staff_import_template.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /**
     *  Save Import Exam Mark Data.
     */
    public function saveImportExamMarkData(ExamMarkImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new ExamMarkImport($request->classroom_id, $request->subject_id, $request->exam_id);

            Excel::import($import, $request->file('exam_mark_import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Exam mark imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     *  Save Import Product Data.
     */
    public function saveImportProductData(ProductImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new ProductImport();

            Excel::import($import, $request->file('import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Product imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     *  Save Import Question Data.
     */
    public function saveImportQuestionData(QuestionImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new QuestionImport($request->class_name_id, $request->subject_id, $request->language, $request->online_topic_id);

            Excel::import($import, $request->file('import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Question imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     *  Save Import Staff Earning Data.
     */
    public function saveImportStaffEarningData(StaffEarningImportRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new StaffEarningImport();

            Excel::import($import, $request->file('import_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Salary imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     * Update the user's profile information.
     */
    public function save(JobRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

        $school = $this->jobRepository->create();

        return Redirect::route('job.list');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Job/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(JobRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        //  return Redirect::route('job.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
