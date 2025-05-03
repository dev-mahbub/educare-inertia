<?php

namespace App\Http\Controllers;

use App\Http\Requests\BloodGroupRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Repositories\IInfraLevelRepository;

class InfraLevelController extends Controller
{

    public function __construct(
        private IInfraLevelRepository $infraLevelRepository
    ) {
        $this->middleware('permission:view infra level', ['only' => ['infraLevel']]);
        $this->middleware('permission:delete infra level', ['only' => ['destroy']]);
    }

    /**
     * infraLevel
     */
    public function infraLevel(Request $request): Response|RedirectResponse
    {
        $infraLavelIdString = !empty($_GET['ids']) ? trim($_GET['ids']) : '';
        $is_open = !empty($_GET['is_open']) ? intval($_GET['is_open']) : 0;
        $currentLavelId = !empty($_GET['current']) ? trim($_GET['current']) : '';
        $infraLavelIds = !empty($infraLavelIdString) ? explode(',', $_GET['ids']) : [];
        $infraLavelIdString = !empty($infraLavelIds) ? @implode(',', array_unique($infraLavelIds)) : '';
        array_push($infraLavelIds, $currentLavelId);

        if ($request->isMethod('post')) {

            $id = $request->input('id') ?? '';
            $parentId = $request->input('parent_id') ?? Null;
            if (!empty($id)) {
                $dataArray = array(
                    'name' => $request->input('name') ?? '',
                    'description' => $request->input('description') ?? '',
                );
                $this->infraLevelRepository->update($id, $dataArray);

                return redirect()->back()->with('message', 'Updated successfully.');
            } else {
                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'parent_id' => $parentId,
                    'name' => $request->input('name') ?? '',
                    'description' => $request->input('description') ?? '',
                    'status' => Status::ACTIVE,
                );
                $this->infraLevelRepository->create($dataArray);

                return redirect()->back()->with('message', 'Created successfully.');
            }
        }

        $infraLevelData = $this->infraLevelRepository->getActiveAll();

        $infraLevels = array();
        $childLevels = array();
        $editLavels = array();
        if (!empty($infraLevelData)) {
            foreach ($infraLevelData as $lkey => $level) {
                if ($level->parent_id == NUll) {
                    array_push($infraLevels, ["id" => $level->id, "label" => $level->name, "name" => $level->name, "description" => $level->description]);
                } else {
                    $editLavels[$level->id] = ["id" => $level->id, "label" => $level->name, "name" => $level->name, "description" => $level->description];
                    $childLevels[$level->parent_id][] = ["id" => $level->id, "label" => $level->name, "name" => $level->name, "description" => $level->description];
                }
            }
        }

        return Inertia::render('Inventory/InfraLevel', [
            'infraLevels' => $infraLevels,
            'childLevels' => $childLevels,
            'infraLavelIds' => $infraLavelIds,
            'infraLavelIdString' => $infraLavelIdString,
            'currentLavelId' => $currentLavelId,
            'is_open' => $is_open,
        ]);
    }


    public function recursiveInfraLevels() {}

    /**
     * Delete
     */
    public function destroy(String $id): RedirectResponse
    {
        $infraLevel = $this->infraLevelRepository->getById($id);
        if (!$infraLevel) {
            return redirect()->route('infra_level.create_list')->with('errors', 'Something goes wrong.');
        }
        $this->infraLevelRepository->delete($id);
        return redirect()->route('infra_level.create_list')->with('message', 'Deleted successfully.');
    }
}
