<?php

namespace App\Http\Controllers;

use App\Http\Requests\OccupationRequest;
use App\Repositories\OccupationRepository;
use App\Repositories\IOccupationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use PhpParser\Node\Expr\Cast\String_;

class OccupationController extends Controller
{
    
    public function __construct( 
        private IOccupationRepository $occupationRepository
    ) 
    {
        $this->middleware('permission:view occupations', ['only' => ['index']]);
        $this->middleware('permission:add occupations', ['only' => ['save']]);
        $this->middleware('permission:edit occupations', ['only' => ['update']]);
        $this->middleware('permission:delete occupations', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $occupations = $this->occupationRepository->getActiveAll();
        return Inertia::render('Occupation/Show', [
            'occupations' => $occupations,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(OccupationRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );
        $occupation = $this->occupationRepository->create($dataArray);
        if (!$occupation) {
            return redirect()->route('occupation.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('occupation.list')->with('message', 'Occupation created successfully.');

    }

    /**
     * Update the user's profile information.
     */
    public function update(OccupationRequest $request, $id)
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );
        $occupation = $this->occupationRepository->update($id, $dataArray);
        if (!$occupation) {
            return redirect()->route('occupation.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('occupation.list')->with('message', 'Occupation updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $occupation = $this->occupationRepository->getById($id);
        if (!$occupation) {
            return redirect()->route('occupation.list')->with('errors', 'Something goes wrong.');
        }
        $occupation->delete($id);
        return redirect()->route('occupation.list')->with('message', 'Occupation deleted successfully.');
    }
}
