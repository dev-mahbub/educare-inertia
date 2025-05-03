<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IFileRepository;
use App\Repositories\IUserRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\SubjectRepository;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\LessonPlanRequest;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\LessonPlanRepository;
use App\Repositories\ILessonPlanRepository;
use App\Http\Controllers\UploadFileController;
use App\Http\Requests\LessonPlanRemarkRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;



class LessonPlanController extends Controller
{
    private $_upload;

    public function __construct(
        private ILessonPlanRepository $lessonPlanRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITeacherRepository $teacherRepository,
        private IFileRepository $fileRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view lesson plan', ['only' => ['index', 'downloadLessonPlanFile', 'teacherWiseLessonPlanReport', 'classWiseLessonPlanReport']]);
        $this->middleware('permission:add lesson plan', ['only' => ['create', 'save', 'saveLessonPlanRemark', 'sharedByOtherLessonPlan']]);
        $this->middleware('permission:edit lesson plan', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete lesson plan', ['only' => ['destroy']]);
    }

    /**
     * Display lesson plans.
     */
    public function index(Request $request): Response
    {
        $lessonPlans = [];
        $classrooms = [];
        $subjects = [];

        $role = auth()->user()->role;
        // $teacherId = auth()->user()->id;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;
        $subjectId = null;
        $startDate = "";
        $endDate = "";
        $filterDataType = "lesson_plan";

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $filterDataType = $request->filter_data ?? "lesson_plan";
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classroomId)) {
            $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId) && !empty($classroomId)) {
            $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
        }

        if ($filterDataType == "subject") {
            $classroomId = null;
            $subjectId = null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
            $lessonPlans = $this->lessonPlanRepository->getActiveAllLessonPlans($classroomId, $subjectId, $startDate, $endDate);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
            // $lessonPlans = $this->lessonPlanRepository->getActiveAllByTeacher($teacherId, $classroomId, $subjectId, $startDate, $endDate);
            $lessonPlans = $this->lessonPlanRepository->getActiveAllByTeacher($userId, $classroomId, $subjectId, $startDate, $endDate);
        }

        if (count($lessonPlans) > 0) {
            $lessonPlans = $lessonPlans->map(function ($lessonPlan) {
                $classroomTitles = $lessonPlan?->classrooms?->pluck('title')->toArray() ?? [];

                $lessonPlan['classroom_titles'] = !empty($classroomTitles) ? implode(', ', $classroomTitles) : "";
                $lessonPlan['start_date'] = !empty($lessonPlan->start_date_at) ? Carbon::parse($lessonPlan->start_date_at)->format('d M, Y') : "";
                $lessonPlan['end_date'] = !empty($lessonPlan->end_date_at) ? Carbon::parse($lessonPlan->end_date_at)->format('d M, Y') : "";
                return $lessonPlan;
            });
        }

        return Inertia::render('LessonPlan/Show', [
            'lessonPlans' => $lessonPlans,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
        ]);
    }

    /**
     * create lesson plan
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        // $teacherId = auth()->user()->id;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
        }

        $classrooms = [];
        $subjects = [];
        $teachers = $this->teacherRepository->getActiveTeachersAll();
        $classNames = [];

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classNameId)) {
            $classrooms = $this->classroomRepository->getByClassNameId($classNameId);
            $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($classNameId) && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, $classNameId);
            $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
        }

        return Inertia::render('LessonPlan/Create', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'teachers' => $teachers
        ]);
    }


    /**
     * save lesson plan.
     */
    public function save(LessonPlanRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'title' => $input['title'] ?? '',
                'lesson_topic' => $input['lesson_topic'] ?? '',
                'subject_id' => $input['subject_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'teacher_id' => auth()->user()->id,
                'description' => $input['description'] ?? '',
                'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'methodology' => !empty($input['methodology']) ? json_encode($input['methodology']) : null,
                'is_notification_teacher' => $input['is_notification_teacher'] ?? 0,
                'is_mail_teacher' => $input['is_mail_teacher'] ?? 0,
                'is_lesson_va' => $input['is_lesson_va'] ?? 0,
                'is_lesson_vb' => $input['is_lesson_vb'] ?? 0,
                // 'lesson_file' => $input['lesson_file'] ?? '',
                'lesson_file' => null,
                'status' => Status::ACTIVE,
            );

            $lessonPlan = $this->lessonPlanRepository->create($dataArray);

            if (!empty($input['classroom_ids'])) {
                foreach ($input['classroom_ids'] as $classroomId) {
                    $classroomDataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'lesson_plan_id' => $lessonPlan->id,
                        'classroom_id' => $classroomId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->lessonPlanRepository->createLessonPlanClassroom($classroomDataArray);
                }
            }

            if (!empty($input['teacher_ids'])) {
                foreach ($input['teacher_ids'] as $teacherId) {
                    $teacherDataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'lesson_plan_id' => $lessonPlan->id,
                        'teacher_id' => $teacherId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->lessonPlanRepository->createLessonPlanTeacher($teacherDataArray);
                }
            }

            // upload file
            if (!empty($input['lesson_file'])) {
                $file_urls = $this->_upload->uploadMultipleFiles($request, 'lesson_file', 'teacher');

                if (!empty($file_urls)) {
                    foreach ($file_urls as $file) {
                        if (!empty($file['path'])) {
                            $dataFile = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'fileable_type' => $lessonPlan->getMorphClass(),
                                'fileable_id' => $lessonPlan->id,
                                'name' => $file['name'] ?? "teacher_file",
                                'file_name' => $file['file_name'] ?? "",
                                'path' => $file['path'],
                                'status' => Status::ACTIVE,
                            );
                        }

                        $this->fileRepository->morphCreate($dataFile);
                    }
                }
            }

            DB::commit();

            return redirect()->route('lesson_plan.list')->with('message', 'Lesson plan created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('lesson_plan.create')->with('errors', 'Something goes wrong.');
        }
    }


    /**
     * Edit lesson plan.
     */
    public function edit(int $id, Request $request): Response
    {
        $lessonPlan = $this->lessonPlanRepository->getLessonPlanById($id);

        abort_if(empty($lessonPlan), 404);

        $lessonPlan->loadMissing(['lessonPlanRemarks.teacher']);

        if (!empty($lessonPlan->methodology)) {
            $lessonPlan['methodology'] = json_decode($lessonPlan->methodology);
        }

        if (count($lessonPlan?->lessonPlanRemarks) > 0) {
            $lessonPlan['lessonPlanRemarks'] = $lessonPlan->lessonPlanRemarks->map(function ($remark) {
                $remarkDate = !empty($remark->created_at) ? Carbon::parse($remark->created_at)->format('d/m/Y H:i:s A') : "";

                $remark['remark_date'] = $remarkDate;

                return $remark;
            });
        }

        $role = auth()->user()->role;
        // $teacherId = auth()->user()->id;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = $lessonPlan?->class_name_id ?? null;

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
        }

        $classrooms = [];
        $subjects = [];
        $teachers = $this->teacherRepository->getActiveTeachersAll();
        $classNames = [];

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll($teacherId);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classNameId)) {
            $classrooms = $this->classroomRepository->getByClassNameId($classNameId);
            $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($classNameId) && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, $classNameId);
            $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
        }

        return Inertia::render('LessonPlan/Edit', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'teachers' => $teachers,
            'lessonPlan' => $lessonPlan
        ]);
    }


    /**
     * Update lesson plan.
     */
    public function update(LessonPlanRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $lessonPlan = $this->lessonPlanRepository->getLessonPlanById($id);

            abort_if(empty($lessonPlan), 404);

            $dataArray = array(
                'title' => $input['title'] ?? '',
                'lesson_topic' => $input['lesson_topic'] ?? '',
                'subject_id' => $input['subject_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'description' => $input['description'] ?? '',
                'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'methodology' => !empty($input['methodology']) ? json_encode($input['methodology']) : null,
                'is_notification_teacher' => $input['is_notification_teacher'] ?? 0,
                'is_mail_teacher' => $input['is_mail_teacher'] ?? 0,
                'is_lesson_va' => $input['is_lesson_va'] ?? 0,
                'is_lesson_vb' => $input['is_lesson_vb'] ?? 0,
                'lesson_file' => null,
            );

            $this->lessonPlanRepository->update($lessonPlan->id, $dataArray);

            $oldClassroomIds = $lessonPlan?->lessonPlanClassrooms?->pluck('classroom_id')->toArray();
            $oldTeacherIds = $lessonPlan?->lessonPlanTeachers?->pluck('teacher_id')->toArray();
            $classroomIdsToDelete = array_diff($oldClassroomIds, $input['classroom_ids']);
            $teacherIdsToDelete = array_diff($oldTeacherIds, $input['teacher_ids']);

            if (!empty($classroomIdsToDelete)) {
                $this->lessonPlanRepository->deleteLessonPlanClassrooms($classroomIdsToDelete);
            }

            if (!empty($teacherIdsToDelete)) {
                $this->lessonPlanRepository->deleteLessonPlanTeachers($teacherIdsToDelete);
            }

            if (!empty($input['classroom_ids'])) {
                foreach ($input['classroom_ids'] as $classroomId) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'lesson_plan_id' => $lessonPlan->id,
                    ];

                    $valuesToUpdate = [
                        'classroom_id' => $classroomId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->lessonPlanRepository->updateOrCreateLessonPlanClassroom($attributesToCheck, $valuesToUpdate);
                }
            }

            if (!empty($input['teacher_ids'])) {
                foreach ($input['teacher_ids'] as $teacherId) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'lesson_plan_id' => $lessonPlan->id,
                    ];

                    $valuesToUpdate = [
                        'teacher_id' => $teacherId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->lessonPlanRepository->updateOrCreateLessonPlanTeacher($attributesToCheck, $valuesToUpdate);
                }
            }

            // upload file
            if (!empty($input['lesson_file'])) {
                $file_urls = $this->_upload->uploadMultipleFiles($request, 'lesson_file', 'teacher');

                if (!empty($file_urls)) {
                    foreach ($file_urls as $file) {
                        if (!empty($file['path'])) {
                            $attributesToCheck = [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'fileable_type' => $lessonPlan->getMorphClass(),
                                'fileable_id' => $lessonPlan->id,
                                'name' => $file['name'] ?? "teacher_file",
                                'file_name' => $file['file_name'] ?? "",
                            ];

                            $valuesToUpdate = [
                                'path' => $file['path'],
                                'status' => Status::ACTIVE,
                            ];
                        }

                        $this->fileRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                    }
                }
            }

            DB::commit();

            return redirect()->route('lesson_plan.list')->with('message', 'Lesson plan updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }


    /**
     * Delete lesson plan.
     */
    public function destroy(int $id): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $lessonPlan = $this->lessonPlanRepository->getLessonPlanById($id);

            abort_if(empty($lessonPlan), 404);

            $lessonPlan->loadMissing(['lessonPlanRemarks']);

            $relations = [
                'lessonPlanClassrooms',
                'lessonPlanTeachers',
                'lessonPlanRemarks',
                'files'
            ];

            // delete lesson plan relation data
            foreach ($relations as $relation) {
                if (count($lessonPlan?->$relation) > 0) {
                    $lessonPlan?->$relation->each(function ($item) {
                        $item->delete();
                    });
                }
            }

            // delete lesson plan
            $lessonPlan->delete();

            DB::commit();

            return redirect()->route('lesson_plan.list')->with('message', 'Lesson plan deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('lesson_plan.list')->with('errors', 'Something goes wrong.');
        }
    }


    /*
    *   download lesson plan file
    */
    public function downloadLessonPlanFile(int $id)
    {
        try {
            $file = $this->fileRepository->getFileById($id);

            abort_if(empty($file), 404);

            $path = !empty($file->path) ? explode('/', $file->path) : [];

            $fileName = end($path);

            $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file->fileable->teacher_id . "/" . $fileName;

            $disk = Storage::disk('s3');

            $stream = $disk->readStream($filePath);

            return response()->stream(function () use ($stream) {
                fpassthru($stream);
            }, 200, [
                'Content-Type' => $disk->mimeType($filePath),
                'Content-Length' => $disk->size($filePath),
                'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('lesson_plan.list')->with('error', 'Something goes wrong.');
        }
    }


    /*
    * save lesson plan remark
    */
    public function saveLessonPlanRemark(LessonPlanRemarkRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'lesson_plan_id' => $input['lesson_plan_id'] ?? null,
            'teacher_id' => auth()->user()->id,
            'remark' => $input['remark'] ?? "",
            'status' => Status::ACTIVE,
        ];

        $lessonPlanRemark = $this->lessonPlanRepository->createLessonPlanRemark($dataArray);

        if (!$lessonPlanRemark) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Remarks added successfully.');
    }


    /*
    * lesson plan shared by other report
    */
    public function sharedByOtherLessonPlan(): Response
    {
        $role = auth()->user()->role;
        $teacherId = auth()->user()->id;
        $lessonPlans = [];

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $lessonPlans = $this->lessonPlanRepository->getActiveAllLessonPlans();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $lessonPlans = $this->lessonPlanRepository->getShareByOtherLessonPlanByTeacher($teacherId);
        }

        if (count($lessonPlans) > 0) {
            $lessonPlans = $lessonPlans->map(function ($lessonPlan) {
                $classroomTitles = $lessonPlan?->classrooms?->pluck('title')->toArray() ?? [];

                $lessonPlan['classroom_titles'] = !empty($classroomTitles) ? implode(', ', $classroomTitles) : "";
                $lessonPlan['start_date'] = !empty($lessonPlan->start_date_at) ? Carbon::parse($lessonPlan->start_date_at)->format('d M, Y') : "";
                $lessonPlan['end_date'] = !empty($lessonPlan->end_date_at) ? Carbon::parse($lessonPlan->end_date_at)->format('d M, Y') : "";

                return $lessonPlan;
            });
        }

        return Inertia::render('LessonPlan/SharedByOther', [
            'lessonPlans' => $lessonPlans
        ]);
    }

    /*
    * teacher wise lesson plan report
    */
    public function teacherWiseLessonPlanReport(Request $request): Response
    {
        $role = auth()->user()->role;
        // $teacherId = auth()->user()->id;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $teacherWiseReport = [];
        $classrooms = [];
        $subjects = [];
        $lessonPlans = [];

        $startDate = "";
        $endDate = "";

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
            $subjects = $this->subjectRepository->getActiveAll();
            $lessonPlans = $this->lessonPlanRepository->getTeacherWiseLessonPlanReport(null, $startDate, $endDate);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
            $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherId($teacherId);
            $lessonPlans = $this->lessonPlanRepository->getTeacherWiseLessonPlanReport($userId, $startDate, $endDate);
        }

        if (count($subjects) > 0 && count($classrooms) > 0) {
            $classroomIdMap = [];

            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $subjects->loadMissing(['classroomSubjects']);
            } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $subjects->loadMissing(['classroomSubjects' => function ($query) use ($teacherId) {
                    $query->whereJsonContains('teachers_data', ['teacher_id' => $teacherId]);
                }]);
            }

            foreach ($subjects as $subject) {
                $classroomIdMap[$subject->id] = $subject?->classroomSubjects?->pluck('classroom_id')?->toArray();
            }

            foreach ($classrooms as $classroom) {
                foreach ($subjects as $subject) {
                    if (!empty($classroomIdMap[$subject->id]) && in_array($classroom->id, $classroomIdMap[$subject->id])) {
                        $key = $classroom->id . "_" . $subject->id;

                        $teacherWiseReport[$key] = [
                            'classroom_id' => $classroom->id,
                            'subject_id' => $subject->id,
                            'class_title' => $classroom->title,
                            'subject_title' => $subject->title,
                            'lesson_plans' => [],
                            'total_count' => 0
                        ];

                        if (count($lessonPlans) > 0) {
                            $teacherWiseReport[$key]['lesson_plans'] = $lessonPlans->filter(function ($lessonPlan) use ($subject, $classroom) {
                                $classroomIds = $lessonPlan->lessonPlanClassrooms?->pluck('classroom_id')?->toArray() ?? [];

                                if ($lessonPlan?->subject_id == $subject?->id && in_array($classroom->id, $classroomIds)) {
                                    return true;
                                }

                                return false;
                            })->map(function ($lessonPlan) {
                                $startDate = !empty($lessonPlan->start_date_at) ? Carbon::parse($lessonPlan->start_date_at)->format('d M, Y') : "";
                                $endDate = !empty($lessonPlan->end_date_at) ? Carbon::parse($lessonPlan->end_date_at)->format('d M, Y') : "";

                                return [
                                    'id' => $lessonPlan->id,
                                    'title' => $lessonPlan->title,
                                    'topic' => $lessonPlan->lesson_topic,
                                    'activity' => $lessonPlan->description,
                                    'start_date' => $startDate,
                                    'end_date' => $endDate,
                                ];
                            })->toArray();

                            $teacherWiseReport[$key]['total_count'] = count($teacherWiseReport[$key]['lesson_plans']);
                        }
                    }
                }
            }
        }

        return Inertia::render('LessonPlan/TeacherWiseReport', [
            'teacherWiseReport' => $teacherWiseReport
        ]);
    }

    /*
    * class wise lesson plan report
    */
    public function classWiseLessonPlanReport(Request $request): Response
    {
        $role = auth()->user()->role;
        // $teacherId = auth()->user()->id;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classWiseReport = [];
        $classrooms = [];
        $subjects = [];
        $lessonPlans = [];
        $teachers = [];

        $classroomId = null;
        $startDate = "";
        $endDate = "";

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $classroomId = $request->classroom_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                $lessonPlans = $this->lessonPlanRepository->getClassWiseLessonPlanReport($classroomId, null, $startDate, $endDate);
            }

            $teachers = $this->staffRepository->getActiveTeacherAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
                $lessonPlans = $this->lessonPlanRepository->getClassWiseLessonPlanReport($classroomId, $userId, $startDate, $endDate);
            }

            // $teacher = $this->staffRepository->getTeacherByUserId($userId);

            if ($teacher != null) {
                array_push($teachers, $teacher);
            }
        }

        if (count($subjects) > 0 && count($teachers) > 0) {
            foreach ($subjects as $subject) {
                foreach ($teachers as $teacher) {
                    $key = $subject->id . "_" . $teacher->user_id;
                    $teacherName = $teacher?->first_name . " " . $teacher?->middle_name . " " . $teacher?->last_name;

                    $classWiseReport[$key] = [
                        'subject_id' => $subject->id,
                        'teacher_id' => $teacher->user_id,
                        'subject_title' => $subject->title,
                        'teacher_name' => $teacherName,
                        'lesson_plans' => [],
                        'total_count' => 0
                    ];

                    if (count($lessonPlans) > 0) {
                        $classWiseReport[$key]['lesson_plans'] = $lessonPlans->filter(function ($lessonPlan) use ($subject, $teacher) {
                            return $lessonPlan?->subject_id == $subject->id && $teacher->user_id == $lessonPlan->teacher_id;
                        })->map(function ($lessonPlan) {
                            $startDate = !empty($lessonPlan->start_date_at) ? Carbon::parse($lessonPlan->start_date_at)->format('d M, Y') : "";
                            $endDate = !empty($lessonPlan->end_date_at) ? Carbon::parse($lessonPlan->end_date_at)->format('d M, Y') : "";

                            return [
                                'id' => $lessonPlan->id,
                                'title' => $lessonPlan->title,
                                'topic' => $lessonPlan->lesson_topic,
                                'activity' => $lessonPlan->description,
                                'start_date' => $startDate,
                                'end_date' => $endDate,
                            ];
                        })->toArray();

                        $classWiseReport[$key]['total_count'] = count($classWiseReport[$key]['lesson_plans']);
                    }
                }
            }
        }

        return Inertia::render('LessonPlan/ClassWiseReport', [
            'classWiseReport' => $classWiseReport,
            'classrooms' => $classrooms,
        ]);
    }
}
