<?php

namespace App\Http\Controllers;

use App\Enums\CertificateType;
use App\Enums\Status;
use App\Enums\CertificateViewName;
use App\Http\Requests\CertificateRequest;
use App\Repositories\CertificateRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\ICertificateRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IFeeRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{

    public function __construct(
        private ICertificateRepository $certificateRepository,
        private IStudentRepository $studentRepository,
        private IAcademicRepository $academicRepository,
        private IClassroomRepository $classroomRepository,
        private IFeeRepository $feeRepository,
        private IStaffRepository $staffRepository,
        private IFeeTypeRepository $feeTypeRepository,
    ) {
        $this->middleware('permission:view certificate', ['only' => ['index', 'certTemplate']]);
        $this->middleware('permission:add certificate', ['only' => ['saveTemplate']]);
        $this->middleware('permission:edit certificate', ['only' => ['editTemplate', 'updateTemplate']]);
        $this->middleware('permission:delete certificate', ['only' => ['deleteTemplate']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $certificates = $this->certificateRepository->getActiveAll();

        return Inertia::render('Certificate/Show', [
            'certificates' => $certificates,
        ]);
    }

    /**
     * certTemplate
     */
    public function certTemplate(Request $request): Response
    {
        $certificates = $this->certificateRepository->getCertificatesWithypesAll();
        $certTypesData = $this->certificateRepository->getCertTypesAll();

        $certTypes = array();
        $viewNames = array();
        $audiences = array(
            ['id' => 'Student', 'title' => 'Student'],
            ['id' => 'Teacher', 'title' => 'Teacher']
        );

        $tempArray = array();

        foreach ($certTypesData as $type) {
            if (!in_array($type->title, $tempArray)) {
                array_push($certTypes, ['id' => $type->id, 'title' => $type->title]);
                array_push($tempArray, $type->title);
            }
        }

        $certTypes = array_unique($certTypes, SORT_REGULAR);

        foreach (CertificateViewName::cases() as $case) {
            $type = "";

            foreach ($certTypes as $certType) {
                if (isset($certType['title'])) {
                    $titleArr = explode(' ', $certType['title']);

                    if (!empty($titleArr[0]) && strripos($case->value, $titleArr[0]) !== false) {
                        $type = $certType['title'];
                        break;
                    }
                }
            }

            array_push($viewNames, ['id' => $case->value, 'title' => $case->value, 'cert_type' => $type]);
        }

        // all restored data
        $students = $this->studentRepository->getListForCertificate();

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            })->toArray();

            // sort students by classroom roll
            usort($students, function ($a, $b) {
                $rollNoA = $a['roll_no'] ?? null;
                $rollNoB = $b['roll_no'] ?? null;

                if ($rollNoA == $rollNoB) {
                    return 0;
                }

                // If $rollNoA is null, move it to the end
                if ($rollNoA == null) {
                    return 1;
                }

                // If $rollNoB is null, move it to the end
                if ($rollNoB == null) {
                    return -1;
                }

                return ($rollNoA < $rollNoB) ? -1 : 1;
            });
        }

        // certificate type
        $certificateType = CertificateType::cases();
        $certificateArr = array();
        foreach ($certificateType as $certificate) {
            array_push($certificateArr, ['id' => $certificate->value, 'title' => $certificate->value]);
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'academic_year_id' => $classroom->academic_year_id])->all();

        // student names
        $studentNameData = $this->studentRepository->getActiveNameAndId()?->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
            }

            return $student;
        });
        $studentNames = $studentNameData->map(fn ($student) => ['id' => $student->id, 'title' => $student->first_name . ' ' . $student->middle_name . ' ' .  $student->last_name, 'classroom_id' => $student->classroom_id])->all();

        // fee type
        $feeTypes = $this->feeTypeRepository->getActiveIdName();

        // fee title
        $feeData = $this->feeRepository->getActiveIdTitle();
        $feeTitles = $feeData->map(fn ($fee) => ['id' => $fee->id, 'title' => $fee->title])->all();

        // student names
        $teacherNameData = $this->staffRepository->getActiveTeacherNameId();
        $teacherNames = $teacherNameData->map(fn ($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' .  $teacher->last_name])->all();

        // new code
        $classroomWithExamTitles = $this->classroomRepository->getClassroomWithExams();

        $tempArray = array();
        $classroomWithExam = array();

        // new code
        foreach ($classroomWithExamTitles as $type) {
            if (!in_array($type->exam_title . '_' . $type->classroom_id, $tempArray)) {
                array_push($classroomWithExam, ['id' => $type->exam_id, 'classroom_id' => $type->classroom_id, 'title' => $type->exam_title]);
                array_push($tempArray, $type->exam_title . '_' . $type->classroom_id);
            }
        }

        // old code
        // foreach ($classroomWithExamTitles as $type) {
        //     if (!in_array($type->exam_title, $tempArray)) {
        //         array_push($classroomWithExam, ['id' => $type->exam_id, 'classroom_id' => $type->classroom_id, 'title' => $type->exam_title]);
        //         array_push($tempArray, $type->exam_title);
        //     }
        // }

        return Inertia::render('Certificate/CertTemplate', [
            'certTypes' => $certTypes,
            'viewNames' => $viewNames,
            'audiences' => $audiences,
            'certificates' => $certificates,
            //stored
            'certificateArr' => $certificateArr,
            'classrooms' => $classrooms,
            'studentNames' => $studentNames,
            'students' => $students,
            'academicSession' => $academicSession,
            'feeTypes' => $feeTypes,
            'feeTitles' => $feeTitles,
            'teacherNames' => $teacherNames,
            'classroomWithExam' => $classroomWithExam,
        ]);
    }

    /**
     * saveTemplate
     */
    public function saveTemplate(CertificateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'certificate_type_id' => !empty($input['certificate_type_id']) ? $input['certificate_type_id'] : Null,
            'factory_name' => !empty($input['factory_role']) ? $input['factory_role'] : "",
            'view_name' => !empty($input['view_name']) ? $input['view_name'] : "",
            'audience_type' => !empty($input['audience_type']) ? trim($input['audience_type']) : "",
            'status' => Status::ACTIVE
        );

        $cert = $this->certificateRepository->create($dataArray);

        if (!empty($cert['id'])) {
            return Redirect::route('certificate.cert_template')->with('message', 'Certificate created');
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * editTemplate
     */
    public function editTemplate(int $id)
    {
        $certificateData = $this->certificateRepository->getById($id)->toArray();

        $certificates = $this->certificateRepository->getCertificatesWithypesAll();
        $certTypesData = $this->certificateRepository->getCertTypesAll();

        $certTypes = array();
        $viewNames = array();
        $audiences = array(
            ['id' => 'Student', 'title' => 'Student'],
            ['id' => 'Teacher', 'title' => 'Teacher']
        );

        $tempArray = array();

        foreach ($certTypesData as $type) {
            if (!in_array($type->title, $tempArray)) {
                array_push($certTypes, ['id' => $type->id, 'title' => $type->title]);
                array_push($tempArray, $type->title);
            }
        }

        $certTypes = array_unique($certTypes, SORT_REGULAR);

        foreach (CertificateViewName::cases() as $case) {
            $type = "";

            foreach ($certTypes as $certType) {
                if (isset($certType['title'])) {
                    $titleArr = explode(' ', $certType['title']);

                    if (!empty($titleArr[0]) && strripos($case->value, $titleArr[0]) !== false) {
                        $type = $certType['title'];
                        break;
                    }
                }
            }

            array_push($viewNames, ['id' => $case->value, 'title' => $case->value, 'cert_type' => $type]);
        }

        // all restored data
        $students = $this->studentRepository->getListForCertificate()->toArray();

        // certificate type
        $certificateType = CertificateType::cases();
        $certificateArr = array();
        foreach ($certificateType as $certificate) {
            array_push($certificateArr, ['id' => $certificate->value, 'title' => $certificate->value]);
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'academic_year_id' => $classroom->academic_year_id])->all();

        // student names
        $studentNameData = $this->studentRepository->getActiveNameAndId();
        $studentNames = $studentNameData->map(fn ($student) => ['id' => $student->id, 'title' => $student->first_name . ' ' . $student->middle_name . ' ' .  $student->last_name, 'classroom_id' => $student->classroom_id])->all();

        // fee type
        $feeTypes = $this->feeTypeRepository->getActiveIdName();

        // fee title
        $feeData = $this->feeRepository->getActiveIdTitle();
        $feeTitles = $feeData->map(fn ($fee) => ['id' => $fee->id, 'title' => $fee->title])->all();

        // student names
        $teacherNameData = $this->staffRepository->getActiveTeacherNameId();
        $teacherNames = $teacherNameData->map(fn ($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' .  $teacher->last_name])->all();

        return Inertia::render('Certificate/EditCertTemplate', [
            'certificateData' => $certificateData,
            'certTypes' => $certTypes,
            'viewNames' => $viewNames,
            'audiences' => $audiences,
            'certificates' => $certificates,
            //stored
            'certificateArr' => $certificateArr,
            'classrooms' => $classrooms,
            'studentNames' => $studentNames,
            'students' => $students,
            'academicSession' => $academicSession,
            'feeTypes' => $feeTypes,
            'feeTitles' => $feeTitles,
            'teacherNames' => $teacherNames,
        ]);
    }

    /**
     * saveTemplate
     */
    public function updateTemplate(CertificateRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            // 'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'certificate_type_id' => !empty($input['certificate_type_id']) ? $input['certificate_type_id'] : Null,
            'factory_name' => !empty($input['factory_role']) ? $input['factory_role'] : "",
            'view_name' => !empty($input['view_name']) ? $input['view_name'] : "",
            'audience_type' => !empty($input['audience_type']) ? trim($input['audience_type']) : "",
            'status' => Status::ACTIVE
        );

        $cert = $this->certificateRepository->update($id, $dataArray);

        if ($cert) {
            return redirect()->route('certificate.cert_template')->with('message', 'Certificate updated');
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * deleteTemplate
     */
    public function deleteTemplate(int $id): RedirectResponse
    {
        $certificate = $this->certificateRepository->getById($id);
        if (!$certificate) {

            return redirect()->route('certificate.cert_template')->with('error', 'Something goes wrong.');
        }
        $this->certificateRepository->delete($id);
        return redirect()->route('certificate.cert_template')->with('message', 'Certificate deleted.');
    }

}
