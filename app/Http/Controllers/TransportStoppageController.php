<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\TransportStoppageRequest;
use App\Repositories\TransportRepository;
use App\Repositories\ITransportRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransportStoppageController extends Controller
{

    public function __construct(
        private ITransportRepository $transportRepository
    ) {
        $this->middleware('permission:view transport stoppages', ['only' => ['index']]);
        $this->middleware('permission:add transport stoppages', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit transport stoppages', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete transport stoppages', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $transports = $this->transportRepository->getActiveTransportAll()?->sortBy(['order'])?->values();

        return Inertia::render('TransportStoppage/Show', [
            'transports' => $transports,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $areaData = $this->transportRepository->getActiveAreaNameAndId();
        $routeData = $this->transportRepository->getActiveAllRoute();
        $areas = $areaData->map(fn($area) => [
            'id' => $area->id,
            'title' => $area->title,
            'pick_price' => $area->pick_price,
            'drop_price' => $area->drop_price,
            'pick_drop_price' => $area->pick_drop_price
        ])->all();
        $routes = $routeData->map(fn($route) => ['id' => $route->id, 'title' => $route->name])->all();

        return Inertia::render('TransportStoppage/Create', [
            'areas' => $areas,
            'routes' => $routes,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(TransportStoppageRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'order' => !empty($input['order']) ? $input['order'] : null,
            'stoppage' => !empty($input['stoppage']) ? $input['stoppage'] : null,
            'area_id' => !empty($input['area_id']) ? $input['area_id'] : null,
            'transport_route_id' => !empty($input['transport_route_id']) ? $input['transport_route_id'] : null,
            'pick_price' => !empty($input['pick_price']) ? $input['pick_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'pick_drop_price' => !empty($input['pick_drop_price']) ? $input['pick_drop_price'] : null,
            'pickup_time_at' => !empty($input['pickup_time_at']) ? \Carbon\Carbon::parse($input['pickup_time_at'])->format('H:i:s') : null,
            'drop_time_at' => !empty($input['drop_time_at']) ? \Carbon\Carbon::parse($input['drop_time_at'])->format('H:i:s') : null,
            'distance' => !empty($input['distance']) ? ($input['distance']) : null,
            'status' => Status::ACTIVE,
        );

        $transportStoppage = $this->transportRepository->create($dataArray);
        if (!$transportStoppage) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Transport Stopage created successfully.');
    }

    /**
     * Display edit
     */
    public function edit(Request $request): Response
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('transport_stoppage.list');
        }

        $transport = $this->transportRepository->getById($id);

        $areaData = $this->transportRepository->getActiveAreaNameAndId();
        $routeData = $this->transportRepository->getActiveAllRoute();

        $areas = $areaData->map(fn($area) => [
            'id' => $area->id,
            'title' => $area->title,
            'pick_price' => $area->pick_price,
            'drop_price' => $area->drop_price,
            'pick_drop_price' => $area->pick_drop_price
        ])->all();
        $routes = $routeData->map(fn($route) => ['id' => $route->id, 'title' => $route->name])->all();


        return Inertia::render('TransportStoppage/Edit', [
            'transport' => $transport,
            'areas' => $areas,
            'routes' => $routes,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(TransportStoppageRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'order' => !empty($input['order']) ? $input['order'] : null,
            'stoppage' => !empty($input['stoppage']) ? $input['stoppage'] : null,
            'area_id' => !empty($input['area_id']) ? $input['area_id'] : null,
            'transport_route_id' => !empty($input['transport_route_id']) ? $input['transport_route_id'] : null,
            'pick_price' => !empty($input['pick_price']) ? $input['pick_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'drop_price' => !empty($input['drop_price']) ? $input['drop_price'] : null,
            'pick_drop_price' => !empty($input['pick_drop_price']) ? $input['pick_drop_price'] : null,
            'pickup_time_at' => !empty($input['pickup_time_at']) ? \Carbon\Carbon::parse($input['pickup_time_at'])->format('H:i:s') : null,
            'drop_time_at' => !empty($input['drop_time_at']) ? \Carbon\Carbon::parse($input['drop_time_at'])->format('H:i:s') : null,
            'distance' => !empty($input['distance']) ? ($input['distance']) : null,
            'status' => Status::ACTIVE,
        );
        $transportStoppage = $this->transportRepository->update($id, $dataArray);
        if (!$transportStoppage) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return to_route('transport_stoppage.list')->with('message', 'Transport Stopage update successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $transportStoppage = $this->transportRepository->getById($id);
        if (!$transportStoppage) {
            return redirect()->route('vehicle.list')->with('error', 'vehicle not found.');
        }
        $this->transportRepository->delete($id);
        return redirect()->route('transport_stoppage.list')->with('message', 'Transport stopage deleted successfully.');
    }
}
