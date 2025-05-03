<?php

namespace App\Http\Controllers;

use App\Enums\HostelStaffType;
use App\Enums\Status;
use App\Repositories\IBoardRepository;

use App\Repositories\IResultCardRepository;
use App\Repositories\IExamRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISubjectRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SubjectGroupingController extends Controller
{
    public function __construct(
        private IResultCardRepository $resultCardRepository,
        private IExamRepository $examRepository,
        private IBoardRepository $boardRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
    ) {
        $this->middleware('permission:view classes', ['only' => ['subjectGroupList', 'subjectGroupDestroy']]);
    }

    /**
     * subject list.
     */
    public function subjectGroupList(Request $request): Response
    {
        $infraLavelIdString = !empty($_GET['ids']) ? trim($_GET['ids']) : '';
        $is_open = !empty($_GET['is_open']) ? intval($_GET['is_open']) : 0;
        $currentLavelId = !empty($_GET['current']) ? trim($_GET['current']) : '';
        $infraLavelIds = !empty($infraLavelIdString) ? explode(',', $_GET['ids']) : [];
        $infraLavelIdString = !empty($infraLavelIds) ? @implode(',', array_unique($infraLavelIds)) : '';
        array_push($infraLavelIds, $currentLavelId);
        $type = !empty($_GET['type']) ? $_GET['type'] : 'Lavel';

        if ($request->isMethod('post')) {

            $id = $request->input('id') ?? '';
            $parentId = $request->input('parent_id') ?? Null;
            $name = $request->input('name') ?? '';

            if (!empty($id)) {
                $dataArray = array(
                    'name' => $name,
                    'display_name' => $request->input('description') ?? '',
                );
                $this->subjectRepository->updateSubjectGroup($id, $dataArray);
            } else {
                if (!empty($name)) {
                    $dataArray = array(
                        'school_id' => getUserSchoolId(),
                        'parent_id' => $parentId,
                        'name' => $name,
                        'display_name' => $request->input('description') ?? '',
                        'status' => Status::ACTIVE,
                    );
                    $this->subjectRepository->createSubjectGroup($dataArray);
                }
            }
        }

        $infraLevelData = $this->subjectRepository->getActiveAllSubjectGroup();
        $infraLevels = array();
        $childLevels = array();
        $editLavels = array();
        if (!empty($infraLevelData)) {
            foreach ($infraLevelData as $lkey => $level) {
                if ($level->parent_id == NUll) {
                    array_push($infraLevels, [
                        "id" => $level->id,
                        "name" => $level->name,
                    ]);
                } else {
                    $editLavels[$level->id] = [
                        "id" => $level->id,
                        "name" => $level->name,
                    ];
                    $childLevels[$level->parent_id][] = [
                        "id" => $level?->id,
                        "name" => $level?->name,
                        "description" => $level?->display_name
                    ];
                }
            }
        }

        return Inertia::render('SubjectGroup/SubjectGroupList', [
            'infraLevels' => $infraLevels,
            'childLevels' => $childLevels,
            'infraLavelIds' => $infraLavelIds,
            'infraLavelIdString' => $infraLavelIdString,
            'currentLavelId' => $currentLavelId,
            'is_open' => $is_open,
            'type' => $type,
        ]);
    }

    /**
     * subject group destroy
     */
    public function subjectGroupDestroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->subjectRepository->deleteSubjectGroup($id);
            DB::commit();
            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('subject_group.list')->with('errors', 'Something goes wrong.');
        }
    }
}
