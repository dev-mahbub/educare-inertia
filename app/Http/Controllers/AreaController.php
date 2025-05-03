<?php

namespace App\Http\Controllers;

use App\Http\Requests\AreaRequest;
use App\Repositories\VehicleRepository;
use App\Repositories\TransportRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\IVehicleRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class AreaController extends Controller
{

    public function __construct(
        private IVehicleRepository $vehicleRepository,
        private ITransportRepository $transportRepository
    ) {
        $this->middleware('permission:view area', ['only' => ['index']]);
        $this->middleware('permission:add area', ['only' => ['save']]);
        $this->middleware('permission:edit area', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete area', ['only' => ['destroy']]);
    }

    /**
     * Area Lists
     */
    public function index(Request $request): Response
    {
        $areas = $this->transportRepository->getActiveAllAreas();
        return Inertia::render('Area/Show', [
            'areas' => $areas,
        ]);
    }


    /**
     * Save Area
     */
    public function save(AreaRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'pick_price' => !empty($input['pick_price']) ? $input['pick_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'pick_drop_price' => !empty($input['pick_drop_price']) ? $input['pick_drop_price'] : null,
            'description' => !empty($input['description']) ? $input['description'] : null,
            'status' => Status::ACTIVE,
        );

        $area = $this->transportRepository->createArea($dataArray);

        if (!$area) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Area created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('area.list');
        }

        $areas = $this->transportRepository->getActiveAllAreas();
        $area = $this->transportRepository->getAreaById($id);

        return Inertia::render('Area/Edit', [
            'area' => $area,
            'areas' => $areas,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(AreaRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'pick_price' => !empty($input['pick_price']) ? $input['pick_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'pick_drop_price' => !empty($input['pick_drop_price']) ? $input['pick_drop_price'] : null,
            'description' => !empty($input['description']) ? $input['description'] : null,
            'status' => Status::ACTIVE,
        );

        $area = $this->transportRepository->updateArea($id, $dataArray);

        if (!$area) {
            return redirect()->route('area.list')->with('error', 'Something goes wrong.');
        }

        return redirect()->route('area.list')->with('message', 'Area updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $area = $this->transportRepository->getAreaById($id);
        if (!$area) {
            return redirect()->route('area.list')->with('error', 'Area not found.');
        }
        $this->transportRepository->deleteArea($id);
        return redirect()->back()->with('message', 'Area deleted successfully.');
    }
}
