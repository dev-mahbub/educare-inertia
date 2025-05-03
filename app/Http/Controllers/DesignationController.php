<?php

namespace App\Http\Controllers;

use App\Http\Requests\DesignationRequest;
use App\Repositories\DesignationRepository;
use App\Repositories\IDesignationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class DesignationController extends Controller
{
    
    public function __construct( 
        private IDesignationRepository $designationRepository,
    ) 
    {
        $this->middleware('permission:view designations', ['only' => ['index']]);
        $this->middleware('permission:add designations', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit designations', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete designations', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $designations = $this->designationRepository->getActiveAll();

        return Inertia::render('Designation/Show', [
            'designations' => $designations,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $designations = $this->designationRepository->getActiveAll();
        return Inertia::render('Designation/Create', [
            'designations' => $designations,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(DesignationRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE
        );

        $designation = $this->designationRepository->create($dataArray);
        if (!$designation) {
            return redirect()->route('designation.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('designation.list')->with('message', 'Designation created successfully.');
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Designation/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(DesignationRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
        );

        $designation = $this->designationRepository->update($id, $dataArray);
        if (!$designation) {
            return redirect()->route('designation.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('designation.list')->with('message', 'Designation update successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $designation = $this->designationRepository->getById($id);
        if (!$designation) {
            return redirect()->route('designation.list')->with('errors', 'Something goes wrong.');
        }
        $designation->delete($id);
        return redirect()->route('designation.list')->with('message', 'Designation deleted successfully.');
    }
}
