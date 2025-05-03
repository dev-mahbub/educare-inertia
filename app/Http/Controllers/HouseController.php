<?php

namespace App\Http\Controllers;

use App\Http\Requests\HouseRequest;
use App\Repositories\HouseRepository;
use App\Repositories\IHouseRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class HouseController extends Controller
{
    
    public function __construct( 
        private IHouseRepository $houseRepository
    ) 
    {
        $this->middleware('permission:view houses', ['only' => ['index']]);
        $this->middleware('permission:add houses', ['only' => ['save']]);
        $this->middleware('permission:edit houses', ['only' => ['update']]);
        $this->middleware('permission:delete houses', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $houses = $this->houseRepository->getActiveAll();
        return Inertia::render('House/Show', [
            'houses' => $houses,
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(HouseRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
            'status' => Status::ACTIVE,
        );

        $house = $this->houseRepository->create($dataArray);
        if (!$house) {
            return redirect()->route('house.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('house.list')->with('message', 'House created successfully.');
    }
    

    /**
     * Update the user's profile information.
     */
    public function update(HouseRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'details' => $input['details'] ?? "",
        );
        $house = $this->houseRepository->update($id, $dataArray);
        if (!$house) {
            return redirect()->route('house.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('house.list')->with('message', 'House updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $house = $this->houseRepository->getById($id);
        if (!$house) {
            return redirect()->route('house.list')->with('errors', 'Something goes wrong.');
        }
        $house->delete($id);
        return redirect()->route('house.list')->with('message', 'House deleted successfully.');
    }
}
