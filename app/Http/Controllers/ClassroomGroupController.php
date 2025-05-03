<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomGroupRequest;
use App\Repositories\ClassroomGroup;
use App\Repositories\IClassroomGroupRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use Nette\Utils\Strings;

class ClassroomGroupController extends Controller
{
    
    public function __construct( 
        private IClassroomGroupRepository $classroomGroupRepository
    ) 
    {
        $this->middleware('permission:view class groups', ['only' => ['index', 'classIndex', 'className']]);
        $this->middleware('permission:add class groups', ['only' => ['edit','save']]);
        $this->middleware('permission:edit class groups', ['only' => ['update']]);
        $this->middleware('permission:delete class groups', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $classroomGroups = $this->classroomGroupRepository->getActiveAll();

        return Inertia::render('ClassroomGroup/Show', [
            'classroomGroups' => $classroomGroups
        ]);
    }

    /**
     * Display the user's profile form.
     */
    // public function create(Request $request): Response
    // {
    //     $classrooms = $this->classroomRepository->getActiveAll();
    //     $students = $this->studentRepository->getActiveAll();

    //     return Inertia::render('ClassroomGroup/Create', [
    //         'classrooms' => $classrooms,
    //         'students' => $students,
    //         'status' => session('status'),
    //     ]);
    // }

    /**
     * Update the user's profile information.
     */
    public function save(ClassroomGroupRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'discussion' => !empty($input['discussion']) ? $input['discussion'] : "",
            'status' => Status::ACTIVE,
        );
        $classroomGroup = $this->classroomGroupRepository->create($dataArray);
        if (!$classroomGroup) {
            return redirect()->route('classroom_group.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classroom_group.list')->with('message', 'Classroom group created successfully.');

    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('ClassroomGroup/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ClassroomGroupRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'],
            'discussion' => !empty($input['discussion']) ? $input['discussion'] : "",
        );
        $classroomGroup = $this->classroomGroupRepository->update($id, $dataArray);
        if (!$classroomGroup) {
            return redirect()->route('classroom_group.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classroom_group.list')->with('message', 'Classroom group updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $classroomGroups = $this->classroomGroupRepository->getById($id);
        if (!$classroomGroups) {
            return redirect()->route('classroom_group.list')->with('errors', 'Something goes wrong.');
        }
        $classroomGroups->delete($id);
        return redirect()->route('classroom_group.list')->with('message', 'Classroom group deleted successfully.');
    }
}
