<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\AcademicGradeRequest;
use App\Http\Requests\AcademicRequest;
use App\Http\Requests\AssetRequest;
use App\Repositories\AcademicRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\AssetRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IAssetRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\TopicRepository;
use App\Repositories\ITopicRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AcademicGradeController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IAcademicRepository $academicRepository,
    ) {
        $this->middleware('permission:view academic grade', ['only' => ['index','show']]);
        $this->middleware('permission:add academic grade', ['only' => ['create','store', 'saveAcademicGradeItem', 'markSave']]);
        $this->middleware('permission:edit academic grade', ['only' => ['edit','update']]);
        $this->middleware('permission:delete academic grade', ['only' => ['destroy', 'deleteAcademicGradeItem']]);
    }

    /**
     * Academic grade
     */
    public function index(Request $request): Response
    {
        $grade = null;

        if ($request->isMethod('POST')) {
            if (!empty($request->gradeId)) {
                $grade = $this->academicRepository->getAcademicGradeById($request->gradeId);
            }
        }

        $grades = $this->academicRepository->getActiveAllGrade();

        return Inertia::render('AcademicGrade/Show', [
            'grades' => $grades,
            'grade' => $grade,
        ]);
    }

    /**
     * save academic grade item
     */
    public function saveAcademicGradeItem(Request $request)
    {
        $request->validate(
            [
                'row.title' => ['required', 'string', Rule::unique('academic_grade_items', 'title')->where(function ($query) use ($request) {
                    return $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('academic_grade_id', $request->input('gradeId'));
                })->ignore($request->input('row')['id'])],
                'row.min_mark' => ['required', 'integer'],
                'row.max_mark' => ['required', 'integer'],
                'row.id' => ['nullable', 'integer'],
            ],
            [
                'row.title.required' => 'Grade is required.',
                'row.title.string' => 'Grade must be a string value.',
                'row.title.unique' => 'Grade has already been taken.',
                'row.min_mark.required' => 'Min mark is required.',
                'row.max_required.required' => 'Max mark is required.',
            ]
        );

        DB::beginTransaction();

        try {
            $id = $request->input('row')['id'] ?? null;
            $gradeId = $request->input('gradeId');
            $title = $request->input('row')['title'];
            $min_mark = $request->input('row')['min_mark'];
            $max_mark = $request->input('row')['max_mark'];

            if (!empty($id)) {
                $academicGradeItem = $this->academicRepository->getAcademicGradeItemByIdAndAcademicGradeId($id, $gradeId);

                if ($academicGradeItem != null) {
                    $dataArray = [
                        'title' => $title,
                        'min_mark' => $min_mark,
                        'max_mark' => $max_mark,
                        'status' => Status::ACTIVE->value,
                    ];

                    $academicGradeItem->update($dataArray);
                }
            } else {
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'academic_grade_id' => $gradeId,
                    'title' => $title,
                    'min_mark' => $min_mark,
                    'max_mark' => $max_mark,
                    'status' => Status::ACTIVE->value,
                ];

                $this->academicRepository->createGradeItem($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Saved successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * delete academic grade item
     */
    public function deleteAcademicGradeItem(int $id)
    {
        $deleteAcademicGradeItem = $this->academicRepository->deleteGradeItem($id);

        if (!$deleteAcademicGradeItem) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Deleted Successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {

        return Inertia::render('AcademicGrade/Create', []);
    }

    /**
     * save
     */
    public function save(AcademicGradeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $checkData = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'scale_name' => $input['scale_name'],
        ];

        $dataArray = array(
            'scale_description' => !empty($input['scale_description']) ? $input['scale_description'] : null,
            'status' => Status::ACTIVE->value,
        );

        $grade = $this->academicRepository->updateOrCreateGrade($checkData, $dataArray);

        if (!$grade) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Save successfully.');
    }

    /**
     * edit
     */
    public function edit(int $id): Response
    {
        $grades = $this->academicRepository->getActiveAllGrade();
        $grade = $this->academicRepository->getGradeById($id);

        return Inertia::render('AcademicGrade/Edit', [
            'grades' => $grades,
            'grade' => $grade,
        ]);
    }

    /**
     * Update
     */
    public function update(AcademicGradeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'scale_name' => $input['scale_name'],
            'scale_description' => !empty($input['scale_description']) ? $input['scale_description'] : null,
            'status' => Status::ACTIVE,
        );

        $grade = $this->academicRepository->updateGrade($id, $dataArray);

        if (!$grade) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('academic_grade.list')->with('message', 'Grade Updated Successfully.');
    }

    /**
     * Delete.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $grade =  $this->academicRepository->getGradeById($id);
            $grade->load(['academicGradeItems']);

            if (count($grade?->academicGradeItems) > 0) {
                foreach ($grade?->academicGradeItems as $gradeItem) {
                    $this->academicRepository->deleteGradeItem($gradeItem?->id);
                }
            }

            $this->academicRepository->deleteGrade($id);
            DB::commit();
            return redirect()->back()->with('message', 'Grade deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('academic_grade.list')->with('error', 'Something goes wrong.');
        }
    }

    public function markSave(Request $request)
    {
        $input = $request->all();
        $gradeScale = $this->academicRepository->getOpeningGradeById($input['id']);
        if ($gradeScale->is_opening_grade_name === 1) {
            $scale_name = true;
        } else {
            if (!empty($gradeScale)) {
                if ($gradeScale->scale_name === $input['scale_name']) {
                    $scale_name = false;
                } else {
                    $scale_name = true;
                }
            }
        }
        $dataArray = [
            'is_opening_grade_name' =>  $scale_name,
            'scale_name' => $input['scale_name'] ?? null,
            'min_mark' => intval($input['min_mark']) ?? null,
            'max_mark' => intval($input['max_mark']) ?? null,
        ];
        $gradeMark = $this->academicRepository->updateGrade($input['id'], $dataArray);
        if (!$gradeMark) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Grade Mark added successfully.');
    }
}
