<?php

namespace App\Http\Controllers;

use App\Http\Requests\BloodGroupRequest;
use App\Repositories\BloodGroupRepository;
use App\Repositories\IBloodGroupRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class BloodGroupController extends Controller
{
    public function __construct( 
        private IBloodGroupRepository $bloodGroupRepository
    ) 
    {
        $this->middleware('permission:view blood groups', ['only' => ['index']]);
        $this->middleware('permission:add blood groups', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit blood groups', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete blood groups', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $blood_groups = $this->bloodGroupRepository->getActiveAll();

        return Inertia::render('BloodGroup/Show', [
            'blood_groups' => $blood_groups,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('BloodGroup/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(BloodGroupRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );

        $blood_group = $this->bloodGroupRepository->create($dataArray);
        if (!$blood_group) {
            return redirect()->route('blood_group.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('blood_group.list')->with('message', 'Blood group created successfully.');
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('BloodGroup/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(BloodGroupRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
        );

        $blood_group = $this->bloodGroupRepository->update($id, $dataArray);
        if (!$blood_group) {
            return redirect()->route('blood_group.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('blood_group.list')->with('message', 'Blood group updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $blood_group = $this->bloodGroupRepository->getById($id);
        if (!$blood_group) {
            return redirect()->route('blood_group.list')->with('errors', 'Something goes wrong.');
        }
        $blood_group->delete($id);
        return redirect()->route('blood_group.list')->with('message', 'Blood group deleted successfully.');
    }
}
