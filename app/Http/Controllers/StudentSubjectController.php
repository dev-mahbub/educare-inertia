<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentSubjectRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\StudentRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\StudentSubjectRepository;
use App\Repositories\IStudentSubjectRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class StudentSubjectController extends Controller
{

    public function __construct(
        private IStudentSubjectRepository $studentSubjectRepository,
        private ISubjectRepository $subjectRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) {
        $this->middleware('permission:view student', ['only' => ['index']]);
        $this->middleware('permission:add student', ['only' => ['create', 'save', 'multipleSave']]);
        $this->middleware('permission:edit student', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete student', ['only' => ['destroy']]);
    }

    /**
     * index.
     */
    public function index(Request $request): Response
    {
        $studentData = [];
        $studentNames = [];
        $studentSubjects = [];
        $selected_subject_ids = [];
        $subject_numbers = [];
        $students = [];

        $classroom_id = null;
        $student_id = null;

        $sessionClassroomId = Session::get('customData');

        if ($request->isMethod('post') || $sessionClassroomId) {
            $input_classroom_id = $request->input('classroom_id') ?? null;
            $admission_no = $request->input('admission_no') ?? null;
            $input_student_id = $request->input('student_id') ?? null;
            $student_mode = $request->input('student_mode') ?? null;
            $request_type = $request->input('request_type') ?? null;

            if (!empty($sessionClassroomId)) {
                $input_classroom_id =  $sessionClassroomId;
            }

            if ($student_mode === 'Multiple') {
                $studentSubjects = $this->classroomSubjectRepository->getStudentSubjectByClassroomId($input_classroom_id);
                $studentData = $this->studentRepository->getStudentsByClassroomId($input_classroom_id);
                if (count($studentData) > 0) {
                    foreach ($studentData as $student) {
                        $student->load(['classroomRoll' => function ($query) use ($input_classroom_id) {
                            $query->where('classroom_id', $input_classroom_id);
                        }]);
                        array_push($students, [
                            'student_id' => $student?->id,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'admission_no' => $student?->admission_no,
                            'student_name' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name),
                        ]);
                    }

                    if (count($students) > 0) {
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
                }
            } else {
                // admission no
                if ($admission_no && $request_type == 'admission_no') {
                    $studentData = $this->studentRepository->getStudentByAdmissionNo($admission_no);
                    $classroom_id = $studentData?->classroom_id;
                    $student_id = $studentData?->id;
                    $studentNames = $this->studentRepository->getStudentsByClassroomId($studentData?->classroom_id)->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'title' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name),
                            'admission_no' => $student?->admission_no,
                        ];
                    });
                }
                // student and classroom
                else if ($input_classroom_id && $input_student_id) {
                    $classroom_id = $input_classroom_id;
                    $student_id = $input_student_id;
                    $studentNames = $this->studentRepository->getStudentsByClassroomId($input_classroom_id)->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'title' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name),
                            'admission_no' => $student?->admission_no,
                        ];
                    });
                }
                // classroom id
                else if ($input_classroom_id) {
                    $studentNames = $this->studentRepository->getStudentsByClassroomId($input_classroom_id)->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'title' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name),
                            'admission_no' => $student?->admission_no,
                        ];
                    });
                }

                // student subjects
                if ($classroom_id && $student_id) {
                    $studentSubjects = $this->classroomSubjectRepository->getStudentSubjectByClassroomIdStudentId($classroom_id, $student_id);
                    if ($studentSubjects?->isNotEmpty()) {
                        foreach ($studentSubjects as $studentSubject) {
                            array_push($selected_subject_ids, ['subject_id' => $studentSubject?->student_subject?->subject_id]);
                            array_push($subject_numbers, ['subject_id' => $studentSubject?->student_subject?->subject_id, 'subject_number' => $studentSubject?->student_subject?->subject_number]);
                        }
                    }
                }
            }
        }

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('StudentSubject/Show', [
            // 'students' => $students,
            'studentData' => $studentData,
            'classrooms' => $classrooms,
            'studentNames' => $studentNames,
            'studentSubjects' => $studentSubjects,
            'selected_subject_ids' => $selected_subject_ids,
            'subject_numbers' => $subject_numbers,
            'students' => $students,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $subjects = $this->subjectRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();

        return Inertia::render('StudentSubject/Create', [
            'subjects' => $subjects,
            'students' => $students,
            'status' => session('status'),
        ]);
    }

    /**
     * save
     */
    public function save(Request $request): RedirectResponse
    {
        $input = $request->validate([
            'academic_year_id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'student_id' => ['required', 'integer'],
            'selected_subject_ids' => ['nullable', 'array'],
            'subject_numbers' => ['nullable', 'array'],
        ]);

        try {
            DB::beginTransaction();
            $checkArrayData = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'],
                'student_id' => $input['student_id'],
            ];

            if (isset($input['subject_numbers']) && count($input['subject_numbers']) > 0) {
                foreach ($input['subject_numbers'] as $number) {
                    if ($number['subject_id'] !== null) {
                        $checkArrayData['subject_id'] = $number['subject_id'];
                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'classroom_id' => $input['classroom_id'],
                            'student_id' => $input['student_id'],
                            'subject_id' => $number['subject_id'],
                            'subject_number' => $number['subject_number'],
                        ];
                        $studentSubject = $this->studentSubjectRepository->updateOrCreate($checkArrayData, $dataArray);
                    }
                }
            }

            DB::commit();
            return redirect()->back()->with(
                [
                    'customData' => $input['classroom_id'],
                    'message', 'Save successful.'
                ]
            );
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function multipleSave(Request $request)
    {

        $input = $request->validate([
            'academic_year_id' => ['nullable', 'integer'],
            'school_id' => ['nullable', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'selected_subject_ids' => ['nullable', 'array'],
            'selected_student_ids' => ['nullable', 'array'],
            'subject_numbers' => ['nullable', 'array'],
        ]);

        try {
            DB::beginTransaction();
            $checkArrayData = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'],
            ];

            $dataArray = [];

            if (isset($input['selected_student_ids']) && count($input['selected_student_ids']) > 0) {
                if (isset($input['selected_subject_ids']) && count($input['selected_subject_ids']) > 0) {
                    foreach ($input['selected_student_ids'] as $student) {
                        $checkArrayData['student_id'] = $student['student_id'];
                        $dataArray['student_id'] = $student['student_id'];
                        foreach ($input['selected_subject_ids'] as $subject) {
                            $checkArrayData['subject_id'] = $subject['subject_id'];
                            $dataArray['subject_id'] = $subject['subject_id'];
                            foreach ($input['subject_numbers'] as $number) {
                                $dataArray['subject_number'] = $number['subject_number'];
                                $this->studentSubjectRepository->updateOrCreate($checkArrayData, $dataArray);
                            }
                        }
                    }
                }
            }

            DB::commit();
            return redirect()->back()->with('message', 'Save successful.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('StudentSubject/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(StudentSubjectRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('student_subject.edit');
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
