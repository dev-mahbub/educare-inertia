<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\TransportRouteRequest;
use App\Repositories\IStaffRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\TransportRepository;
use App\Repositories\VehicleRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IVehicleRepository;
use App\Repositories\ITransportRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransportRouteController extends Controller
{

    public function __construct(
        private ITransportRepository $transportRepository,
        private IVehicleRepository $vehicleRepository,
        private ITeacherRepository $teacherRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view transport routes', ['only' => ['index']]);
        $this->middleware('permission:add transport routes', ['only' => ['save']]);
        $this->middleware('permission:edit transport routes', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete transport routes', ['only' => ['destroy']]);
    }


    public function index(Request $request): Response
    {
        $vehicles       = $this->vehicleRepository->getActiveAll();
        $teachers       = $this->staffRepository->getActiveNameId();
        $vehicle_no     = $this->transportRepository->getActiveAllTransportAndRoute();
        $vehicleArray   = $vehicles->map(fn($vehicle) => ['id' => $vehicle->id, 'title' => $vehicle->vehicle_number])->all();
        $teacherArray   = $teachers->map(fn($teacher) => ['id' => $teacher->id, 'title' => getCocatenationTitle($teacher->first_name, '', $teacher->last_name)])->all();

        return Inertia::render('TransportRoute/Show', [
            'vehicles' => $vehicleArray,
            'teachers' => $teacherArray,
            'vehicle_no' => $vehicle_no,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(TransportRouteRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $pickup_time_at = Carbon::parse($input['pickup_time_at'])->format('H:i:s');
        $drop_time_at = Carbon::parse($input['drop_time_at'])->format('H:i:s');

        $dataArray = array(
            'school_id'      => getUserSchoolId(),
            'name'           => $input['name'],
            'pickup_time_at' => !empty($pickup_time_at) ? $pickup_time_at : null,
            'drop_time_at' => !empty($drop_time_at) ? $drop_time_at : null,
            'vehicle_id'     => intval($input['vehicle_id']),
            'staff_id'       => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
            'status'         => Status::ACTIVE,
        );

        $routes = $this->transportRepository->createRoute($dataArray);
        if (!$routes) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Routes created successfully.');
    }

    /**
     * edit
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('transport_route.list');
        }

        $routeId = $this->transportRepository->getRouteById($id);
        $routes = $this->transportRepository->getActiveAllTransportAndRoute();
        $vehicles = $this->vehicleRepository->getActiveAll();
        $vehicleArray = $vehicles->map(fn($vehicle) => ['id' => $vehicle->id, 'title' => $vehicle->vehicle_number])->all();
        $teachers = $this->staffRepository->getActiveNameId();
        $teacherArray = $teachers->map(fn($teacher) => ['id' => $teacher->id, 'title' => getCocatenationTitle($teacher->first_name, '', $teacher->last_name)])->all();

        return Inertia::render('TransportRoute/Edit', [
            'vehicles' => $vehicleArray,
            'teachers' => $teacherArray,
            'routeId' => $routeId,
            'routes' => $routes,
        ]);
    }

    /**
     * update
     */
    public function update(TransportRouteRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id'      => getUserSchoolId(),
            'name'           => $input['name'],
            'pickup_time_at' => !empty($input['pickup_time_at']) ? \Carbon\Carbon::parse($input['pickup_time_at'])->format('H:i:s') : null,
            'drop_time_at'   => !empty($input['drop_time_at']) ? \Carbon\Carbon::parse($input['drop_time_at'])->format('H:i:s') : null,
            'vehicle_id'     => intval($input['vehicle_id']),
            'staff_id'       => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
            'status'         => Status::ACTIVE,
        );

        $routes = $this->transportRepository->updateRoute($id, $dataArray);
        if (!$routes) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->route('transport_route.list')->with('message', 'Routes Update successfully.');
    }

    /**
     * destroy
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->transportRepository->getRouteById($id);
            $this->transportRepository->deleteRoute($id);
            DB::commit();
            return redirect()->route('transport_route.list')->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->route('transport_route.list')->with('error', 'Something goes wrong.');
        }
    }
}
