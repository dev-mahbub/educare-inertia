<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\AssetRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\UpdateGuardianIdRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class DownloadController extends Controller
{
    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IGuardianRepository $guardianRepository
    ) {
        $this->middleware('permission:view download', ['only' => ['index', 'student', 'teacherDownload',
            'teacherRetirementReport', 'sibling', 'guardian', 'downloadTc', 'downloadCategoryWiseReport'
        ]]);
        $this->middleware('permission:add download', ['only' => ['registrationForm']]);
        $this->middleware('permission:edit download', ['only' => ['updateGuardianId']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Download/Show', []);
    }

    /**
     * Display the registration form.
     */
    public function registrationForm(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/RegistrationForm', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function student(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/Student', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function teacherDownload(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/TeacherDownload', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function teacherRetirementReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/TeacherRetirementReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function sibling(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/Sibling', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function guardian(): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        $guardiansData = [];

        $guardians = $this->guardianRepository->getActiveAllGuardians();

        if ($guardians->count() > 0) {
            $guardians = $guardians->map(function ($guardian) {
                if ($guardian?->student?->promotedClassroom != null) {
                    if (!empty($guardian['student']['classroom'])) {
                        unset($guardian['student']['classroom']);
                    }

                    $guardian['student']['classroom_id'] = $guardian?->student?->promotedClassroom?->id;
                    $guardian['student']['classroom'] = $guardian?->student?->promotedClassroom;
                }

                $classroomId = $guardian?->student?->classroom_id;

                $guardian?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $guardian;
            });

            $studentIds = [];

            foreach ($guardians as $guardian) {
                $guardianId = $guardian?->user_id;

                $guardian_name = "{$guardian?->first_name} {$guardian?->middle_name} {$guardian?->last_name}";

                $tempGuardianData = [
                    'id' => $guardian?->id,
                    'guardianid' => $guardian?->guardianid,
                    'guardian_name' => $guardian_name,
                    'guardian_phone' => $guardian?->phone ?? "",
                    'guardian_email' => $guardian?->email ?? "",
                ];

                $student_name = "";
                $father_name = "";
                $father_phone = "";

                if ($guardian?->student != null) {
                    $student_name = "{$guardian?->student?->first_name} {$guardian?->student?->middle_name} {$guardian?->student?->last_name}";
                }

                if ($guardian?->student?->father != null) {
                    $father_name = "{$guardian?->student?->father?->first_name} {$guardian?->student?->father?->middle_name} {$guardian?->student?->father?->last_name}";
                    $father_phone = $guardian?->student?->father?->phone ?? "";
                }

                $studentData = [
                    'name' => $student_name,
                    'admission_no' => $guardian?->student?->admission_no ?? "",
                    'roll_no' => $guardian?->student?->classroomRoll?->roll_no ?? "",
                    'classroom_title' => $guardian?->student?->classroom?->title ?? "",
                    'father_name' => $father_name,
                    'father_phone' => $father_phone,
                ];

                if (!isset($guardiansData[$guardianId])) {
                    $guardiansData[$guardianId] = $tempGuardianData;
                }

                if (!isset($guardiansData[$guardianId]['student_data'][$guardian?->student_id]) && !in_array($guardian?->student_id, $studentIds)) {
                    $guardiansData[$guardianId]['student_data'][$guardian?->student_id] = $studentData;
                }

                array_push($studentIds, $guardian?->student_id);
            }
        }

        return Inertia::render('Download/Guardian', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
            'guardians' => $guardiansData,
        ]);
    }


    /*
    * update guardian
    */
    public function updateGuardianId(int $id, UpdateGuardianIdRequest $request)
    {
        $input = $request->validated();

        $guardian = $this->guardianRepository->getByGuardianId($id);

        abort_if($guardian == null, 404);

        $updateGuardian = $guardian->update([
            'guardianid' => $input['guardianid'] ?? ""
        ]);

        if (!$updateGuardian) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'GuardianId updated successfully.');
    }

    /**
     * Display the student.
     */
    public function downloadTc(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/DownloadTc', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the student.
     */
    public function downloadCategoryWiseReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Download/DownloadCategoryWiseReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

}
