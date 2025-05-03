<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcademicYearRequest;
use App\Repositories\AcademicYearRepository;
use App\Repositories\IAcademicYearRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Models\AcademicYear;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISectionRepository;

class AcademicYearController extends Controller
{

    public function __construct(
        private IAcademicYearRepository $academicYearRepository,
        private IClassroomRepository $classroomRepository,
        private IAdmissionRepository $admissionRepository,
        private ISectionRepository $sectionRepository
    ) {
        $this->middleware('permission:view academic years', ['only' => ['index', 'setAcademicYearSession']]);
        $this->middleware('permission:add academic years', ['only' => ['edit', 'save']]);
        $this->middleware('permission:edit academic years', ['only' => ['update']]);
        $this->middleware('permission:delete academic years', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $academicYears = $this->academicYearRepository->getActiveAll();

        return Inertia::render('AcademicYear/Show', [
            'academicYears' => $academicYears
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(AcademicYearRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'academic_session' => $input['academic_session'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'is_copy_class' => $input['is_copy_class'] ?? false,
            'is_copy_admission_criteria' => $input['is_copy_admission_criteria'] ?? false,
            'status' => Status::ACTIVE,
        );
        $academicYear = $this->academicYearRepository->create($dataArray);
        if (!$academicYear) {
            return redirect()->route('academic_year.list')->with('errors', 'Something goes wrong.');
        }

        // copy admission process
        if ( !empty($academicYear->is_copy_admission_criteria) ) {
            $admissions = $this->admissionRepository->getAdmissionFromSessionId();
            $admissions = !empty($admissions[0]) ? $admissions[0] : [];
            // create admission process
            $conditionArr = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $academicYear->id,
            );

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $academicYear->id,
                'start_date_at' => $admissions->start_date_at,
                'end_date_at' => $admissions->end_date_at,
                'admission_type' => $admissions->admission_type,
                'admission_number' => $admissions->admission_number,
                'title' => $admissions->title,
                'registration_seed' => $admissions->registration_seed,
                'contact_email' => $admissions->contact_email,
                'contact_mobile' => $admissions->contact_mobile,
                'is_current' => $admissions->is_current,
                'is_online_registration' => $admissions->is_online_registration,
                'is_open_or_close' => $admissions->is_open_or_close,
                'status' => Status::ACTIVE,
            );
            $admissionCreate = $this->admissionRepository->updateOrCreate($conditionArr, $dataArray);
            
            $admissionClassrooms = !empty($admissions->classrooms) ? $admissions->classrooms : [];
            if (!empty($admissionClassrooms)) {
                foreach ($admissionClassrooms as $classroom) {
                    $conditionArrTwo = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYear->id,
                        'admission_id' => $admissionCreate->id,
                        'classroom_id' => $classroom->classroom_id,
                    );
    
                    $admissionClassroomArr = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYear->id,
                        'admission_id' => $admissionCreate->id,
                        'classroom_id' => $classroom->classroom_id,
                        'min_age' => $classroom->min_age,
                        'max_age' => $classroom->max_age,
                        'on_date_at' => $classroom->on_date_at,
                        'reg_fee' => $classroom->reg_fee,
                        'reg_limit' => $classroom->reg_limit,
                        'adm_limit' => $classroom->adm_limit,
                        'adm_postfix' => $classroom->adm_postfix,
                        'reg_fee' => $classroom->reg_fee,
                        'is_open_offline' => $classroom->is_open_offline,
                        'is_open_online' => $classroom->is_open_online,
                        'is_result' => $classroom->is_result,
                        'status' => Status::ACTIVE,
                    ];
                    $admissionClassroomCreate = $this->admissionRepository->updateOrCreateAdmissionClassroom($conditionArrTwo, $admissionClassroomArr);
                }
            }
        }

        // copy classes
        if ( !empty($academicYear->is_copy_class) ) {
            $classNames = $this->classroomRepository->getAllActiveClassName();
            // create class name
            if( !empty($classNames) ) {
                foreach($classNames as $class) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYear->id,
                        'title' => $class->title,
                        'description' => $class->description,
                        'status' => Status::ACTIVE,
                    ];

                    $classNameCreate = $this->classroomRepository->classNameCreate($dataArray);

                    // create sections
                    $section = $this->sectionRepository->getSectionsByClassId($class->id);
                    $section = !empty($section[0]) ? $section[0] : [];
                    if (!empty($section->title)) {
                        // create section
                        $sectionArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => $academicYear->id,
                            'class_name_id' => $classNameCreate->id,
                            'title' =>  $section->title,
                            'description' => $section->description,
                            'display_order' => 0,
                            'status' => Status::ACTIVE,
                        ];
                        $sectionCreate = $this->sectionRepository->create($sectionArray); 
                    } 

                    // create classrooms
                    $classrooms = $this->classroomRepository->getClassroomsFromClassId($class->id);
                    if( !empty($classrooms) ) {
                        foreach($classrooms as $classroom) { 
                            $crArray = array(
                                'school_id' => getUserSchoolId(),
                                'class_name_id' => $classNameCreate->id,
                                'academic_year_id' => $academicYear->id,
                                'class_monitor_id' => $classroom->class_monitor_id,
                                'class_teacher_id' => $classroom->class_teacher_id,
                                'title' => $classroom->title,
                                'section_title' => $classroom->section_title,
                                'display_order' => $classroom->display_order,
                                'status' => Status::ACTIVE,
                            );
                            $this->classroomRepository->create($crArray);
                        }
                    }
                }
            }
        }

        return redirect()->route('academic_year.list')->with('message', 'Academic year created successfully.');
    }



    /**
     * Update the user's profile information.
     */
    public function update(AcademicYearRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'academic_session' => $input['academic_session'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'is_copy_class' => $input['is_copy_class'] ?? false,
            'is_copy_admission_criteria' => $input['is_copy_admission_criteria'] ?? false,
            'status' => Status::ACTIVE,
        );
        $academicYear = $this->academicYearRepository->update($id, $dataArray);
        if (!$academicYear) {
            return redirect()->route('academic_year.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('academic_year.list')->with('message', 'Academic year updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id): RedirectResponse
    {
        $academicYear = $this->academicYearRepository->getById($id);
        if (!$academicYear) {
            return redirect()->route('academic_year.list')->with('errors', 'Something goes wrong.');
        }
        $academicYear->delete($id);
        return redirect()->route('academic_year.list')->with('message', 'Academic year deleted successfully.');
    }

    /**
     * Set Academic Year in session.
     */
    public function setAcademicYearSession(Request $request)
    {
        $academicYearId = !empty($_GET['ay']) ? $_GET['ay'] : '';
        $academicYear = $this->academicYearRepository->getById($academicYearId);

        try {
            if( !empty($academicYear->id) ) {
                \Session::put('academic_year_id', $academicYear->id);
                \Session::put('academic_year_session', $academicYear->academic_session);
            }
        }
        catch (\Throwable $th) {
            // something
        }

        return redirect()->back();
    }
}
