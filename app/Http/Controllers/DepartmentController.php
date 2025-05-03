<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Repositories\DepartmentRepository;
use App\Repositories\IDepartmentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class DepartmentController extends Controller
{
    
    public function __construct( 
        private IDepartmentRepository $departmentRepository
    ) 
    {
        $this->middleware('permission:view departments', ['only' => ['index']]);
        $this->middleware('permission:add departments', ['only' => ['save']]);
        $this->middleware('permission:edit departments', ['only' => ['update']]);
        $this->middleware('permission:delete departments', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $departments = $this->departmentRepository->getActiveAll();

        return Inertia::render('Department/Show', [
            'departments' => $departments
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(DepartmentRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );

        $department = $this->departmentRepository->create($dataArray);
        if (!$department) {
            return redirect()->route('department.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('department.list')->with('message', 'Department created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(DepartmentRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
        );

        $department = $this->departmentRepository->update($id, $dataArray);
        if (!$department) {
            return redirect()->route('department.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('department.list')->with('message', 'Department updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $department = $this->departmentRepository->getById($id);
        if (!$department) {
            return redirect()->route('department.list')->with('errors', 'Something goes wrong.');
        }
        $department->delete($id);
        return redirect()->route('department.list')->with('message', 'Department deleted successfully.');
    }
}
