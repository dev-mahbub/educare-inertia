<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\VehicleRequest;
use App\Repositories\VehicleRepository;
use App\Repositories\IVehicleRepository;
use App\Repositories\DriverRepository;
use App\Repositories\IDriverRepository;
use App\Repositories\IImageRepository;
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

class VehicleController extends Controller
{
    private $_upload;
    public function __construct(
        private IVehicleRepository $vehicleRepository,
        private IDriverRepository $driverRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view vehicle', ['only' => ['index']]);
        $this->middleware('permission:add vehicle', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit vehicle', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete vehicle', ['only' => ['destroy']]);
    }

    /**
     * index.
     */
    public function index(Request $request): Response
    {
        $vehicles = [];
        $vehiclesData = $this->vehicleRepository->getActiveAll();
        $currentDate = Carbon::now();
        $dateAfter30Days = $currentDate->copy()->addDays(30); // Make sure to copy the current date

        if (count($vehiclesData) > 0) {
            foreach ($vehiclesData as $vehicle) {
                // Parse insurance_upto date to Carbon instance
                $insurance_upto = Carbon::parse($vehicle->insurance_upto);
                $road_tax_upto = Carbon::parse($vehicle->road_tax_upto);
                $pollution_upto = Carbon::parse($vehicle->pollution_upto);
                $permit_upto = Carbon::parse($vehicle->permit_upto);
                $registration_date = Carbon::parse($vehicle->registration_date);

                $vehicles[] = [
                    'id' => $vehicle->id,
                    'vehicle_number' => $vehicle->vehicle_number,
                    'total_seat' => $vehicle->total_seat,
                    'device_id' => $vehicle->device_id,
                    'registration_number' => $vehicle->registration_number,

                    'insurance_upto' => $vehicle->insurance_upto,
                    'is_expired_insurance_upto' => $insurance_upto <= $dateAfter30Days,

                    'road_tax_upto' => $vehicle->road_tax_upto,
                    'is_expired_road_tax_upto' => $road_tax_upto <= $dateAfter30Days,

                    'pollution_upto' => $vehicle->pollution_upto,
                    'is_expired_pollution_upto' => $pollution_upto <= $dateAfter30Days,

                    'permit_upto' => $vehicle->permit_upto,
                    'is_expired_permit_upto' => $permit_upto <= $dateAfter30Days,

                    'registration_date' => $vehicle->registration_date,
                    'is_expired_registration_upto' => $registration_date <= $dateAfter30Days,
                ];
            }
        }

        $providers = $this->vehicleRepository->getTransportProviderAll();
        $drivers = $this->driverRepository->getActiveDriverAll();
        $conductors = $this->driverRepository->getActiveConductorAll();

        $driverArray = $drivers->map(fn($driver) => ['id' => $driver->id, 'title' => getCocatenationTitle($driver->first_name, '', $driver->last_name)])->all();
        $conductorArray = $conductors->map(fn($conductor) => ['id' => $conductor->id, 'title' => getCocatenationTitle($conductor->first_name, '', $conductor->last_name)])->all();
        $providerArray = $providers->map(fn($provider) => ['id' => $provider->id, 'title' => $provider->title])->all();

        return Inertia::render('Vehicle/Show', [
            'vehicles' => $vehicles,
            'drivers' => $driverArray,
            'conductors' => $conductorArray,
            'providers' => $providerArray,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Vehicle/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * vehicle save
     */
    public function save(VehicleRequest $request): RedirectResponse
    {
        $input = $request->validated();
        try {
            DB::beginTransaction();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'driver_id' => !empty($input['driver_id']) ? $input['driver_id'] : null,
                'conductor_id' => !empty($input['conductor_id']) ? $input['conductor_id'] : null,
                'transport_provider_id' => !empty($input['transport_provider_id']) ? $input['transport_provider_id'] : null,
                'vehicle_number' => $input['vehicle_number'] ?? null,
                'total_seat' => !empty($input['total_seat']) ? $input['total_seat'] : null,
                'registration_number' => !empty($input['registration_number']) ? $input['registration_number'] : null,
                'chassis_number' => $input['chassis_number'] ?? null,
                'finance_name' => !empty($input['finance_name']) ? $input['finance_name'] : null,
                'engine_number' => !empty($input['engine_number']) ? $input['engine_number'] : null,
                'company_name' => !empty($input['company_name']) ? $input['company_name'] : null,
                'tank_capacity' => !empty($input['tank_capacity']) ? $input['tank_capacity'] : null,
                'model' => !empty($input['model']) ? $input['model'] : null,
                'type' => !empty($input['type']) ? $input['type'] : null,
                'fuel_type' => $input['fuel_type'] ?? null,
                'owner_name' => !empty($input['owner_name']) ? $input['owner_name'] : null,
                'device_id' => !empty($input['device_id']) ? $input['device_id'] : null,
                'insurance_upto'    => !empty($input['insurance_upto']) ? \Carbon\Carbon::parse($input['insurance_upto'])->format('Y-m-d') : null,
                'road_tax_upto'    => !empty($input['road_tax_upto']) ? \Carbon\Carbon::parse($input['road_tax_upto'])->format('Y-m-d') : null,
                'pollution_upto'    => !empty($input['pollution_upto']) ? \Carbon\Carbon::parse($input['pollution_upto'])->format('Y-m-d') : null,
                'permit_upto'    => !empty($input['permit_upto']) ? \Carbon\Carbon::parse($input['permit_upto'])->format('Y-m-d') : null,
                'registration_date'    => !empty($input['registration_date']) ? \Carbon\Carbon::parse($input['registration_date'])->format('Y-m-d') : null,
                'description' => !empty($input['description']) ? $input['description'] : null,
                'status' => Status::ACTIVE,
            );
            $this->vehicleRepository->create($dataArray);
            DB::commit();
            return redirect()->back()->with('message', 'Vehicle created successfully.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * edit
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('vehicle.list');
        }

        $vehicles = [];
        $vehiclesData = $this->vehicleRepository->getActiveAll();
        $currentDate = Carbon::now();
        $dateAfter30Days = $currentDate->copy()->addDays(30); // Make sure to copy the current date

        if (count($vehiclesData) > 0) {
            foreach ($vehiclesData as $vehicle) {
                // Parse insurance_upto date to Carbon instance
                $insurance_upto = Carbon::parse($vehicle->insurance_upto);
                $road_tax_upto = Carbon::parse($vehicle->road_tax_upto);
                $pollution_upto = Carbon::parse($vehicle->pollution_upto);
                $permit_upto = Carbon::parse($vehicle->permit_upto);
                $registration_date = Carbon::parse($vehicle->registration_date);

                $vehicles[] = [
                    'id' => $vehicle->id,
                    'vehicle_number' => $vehicle->vehicle_number,
                    'total_seat' => $vehicle->total_seat,
                    'device_id' => $vehicle->device_id,
                    'registration_number' => $vehicle->registration_number,

                    'insurance_upto' => $vehicle->insurance_upto,
                    'is_expired_insurance_upto' => $insurance_upto <= $dateAfter30Days,

                    'road_tax_upto' => $vehicle->road_tax_upto,
                    'is_expired_road_tax_upto' => $road_tax_upto <= $dateAfter30Days,

                    'pollution_upto' => $vehicle->pollution_upto,
                    'is_expired_pollution_upto' => $pollution_upto <= $dateAfter30Days,

                    'permit_upto' => $vehicle->permit_upto,
                    'is_expired_permit_upto' => $permit_upto <= $dateAfter30Days,

                    'registration_date' => $vehicle->registration_date,
                    'is_expired_registration_upto' => $registration_date <= $dateAfter30Days,
                ];
            }
        }

        $vehicleId = $this->vehicleRepository->getById($id);
        // $vehicles = $this->vehicleRepository->getActiveAll();
        $drivers = $this->driverRepository->getActiveDriverAll();
        $conductors = $this->driverRepository->getActiveConductorAll();
        $providers = $this->vehicleRepository->getTransportProviderAll();

        $driverArray = $drivers->map(fn($driver) => ['id' => $driver->id, 'title' => getCocatenationTitle($driver->first_name, '', $driver->last_name)])->all();
        $conductorArray = $conductors->map(fn($conductor) => ['id' => $conductor->id, 'title' => getCocatenationTitle($conductor->first_name, '', $conductor->last_name)])->all();
        $providerArray = $providers->map(fn($provider) => ['id' => $provider->id, 'title' => $provider->title])->all();

        return Inertia::render('Vehicle/Edit', [
            'vehicleId' => $vehicleId,
            'vehicles' => $vehicles,
            'drivers' => $driverArray,
            'conductors' => $conductorArray,
            'providers' => $providerArray,
        ]);
    }

    /**
     * update
     */
    public function update(VehicleRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'driver_id' => !empty($input['driver_id']) ? $input['driver_id'] : null,
            'conductor_id' => !empty($input['conductor_id']) ? $input['conductor_id'] : null,
            'transport_provider_id' => !empty($input['transport_provider_id']) ? $input['transport_provider_id'] : null,
            'vehicle_number' => $input['vehicle_number'] ?? null,
            'total_seat' => !empty($input['total_seat']) ? $input['total_seat'] : null,
            'registration_number' => !empty($input['registration_number']) ? $input['registration_number'] : null,
            'chassis_number' => !empty($input['chassis_number']) ? intval($input['chassis_number']) : null,
            'finance_name' => !empty($input['finance_name']) ? $input['finance_name'] : null,
            'engine_number' => !empty($input['engine_number']) ? $input['engine_number'] : null,
            'company_name' => !empty($input['company_name']) ? $input['company_name'] : null,
            'tank_capacity' => !empty($input['tank_capacity']) ? $input['tank_capacity'] : null,
            'model' => !empty($input['model']) ? $input['model'] : null,
            'type' => !empty($input['type']) ? $input['type'] : null,
            'fuel_type' => !empty($input['fuel_type']) ? $input['fuel_type'] : null,
            'owner_name' => !empty($input['owner_name']) ? $input['owner_name'] : null,
            'device_id' => !empty($input['device_id']) ? $input['device_id'] : null,
            'insurance_upto'    => !empty($input['insurance_upto']) ? \Carbon\Carbon::parse($input['insurance_upto'])->format('Y-m-d') : null,
            'road_tax_upto'    => !empty($input['road_tax_upto']) ? \Carbon\Carbon::parse($input['road_tax_upto'])->format('Y-m-d') : null,
            'pollution_upto'    => !empty($input['pollution_upto']) ? \Carbon\Carbon::parse($input['pollution_upto'])->format('Y-m-d') : null,
            'permit_upto'    => !empty($input['permit_upto']) ? \Carbon\Carbon::parse($input['permit_upto'])->format('Y-m-d') : null,
            'registration_date'    => !empty($input['registration_date']) ? \Carbon\Carbon::parse($input['registration_date'])->format('Y-m-d') : null,
            'description' => !empty($input['description']) ? $input['description'] : null,
            'status' => Status::ACTIVE,
        );
        $vehicle = $this->vehicleRepository->update($id, $dataArray);
        if (!$vehicle) {
            return redirect()->route('vehicle.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('vehicle.list')->with('message', 'Vehicle updated successfully.');
    }

    /**
     * destroy
     */

    public function destroy(int $id): RedirectResponse
    {
        try {

            DB::beginTransaction();
            $vehicle = $this->vehicleRepository->getById($id);
            if (!$vehicle) {
                return redirect()->route('vehicle.list')->with('error', 'Not found.');
            }
            $this->vehicleRepository->delete($id);
            DB::commit();
            return redirect()->route('vehicle.list')->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('vehicle.list')->with('error', 'Something goes wrong.');
        }
    }
}
