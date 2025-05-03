<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReligionRequest;
use App\Repositories\ReligionRepository;
use App\Repositories\IReligionRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class ReligionController extends Controller
{
    
    public function __construct( 
        private IReligionRepository $religionRepository
    ) 
    {
        $this->middleware('permission:view religions', ['only' => ['index']]);
        $this->middleware('permission:add religions', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit religions', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete religions', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $religions = $this->religionRepository->getActiveAll();
        return Inertia::render('Religion/Show', [
            'religions' => $religions,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Religion/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(ReligionRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
            'status' => Status::ACTIVE,
        );

        $religion = $this->religionRepository->create($dataArray);
        if (!$religion) {
            return redirect()->route('religion.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('religion.list')->with('message', 'Religion created successfully.');
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Religion/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ReligionRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
        );

        $religion = $this->religionRepository->update($id, $dataArray);
        if (!$religion) {
            return redirect()->route('religion.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('religion.list')->with('message', 'Religion updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $religion = $this->religionRepository->getById($id);
        if (!$religion) {
            return redirect()->route('religion.list')->with('errors', 'Something goes wrong.');
        }
        $religion->delete($id);
        return redirect()->route('religion.list')->with('message', 'Religion deleted successfully.');
    }
}
