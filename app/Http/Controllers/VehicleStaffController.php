<?php

namespace App\Http\Controllers;

use App\Enums\DriverProofType;
use App\Enums\DriverType;
use App\Enums\Gender;
use App\Enums\Status;
use App\Http\Requests\VehicleRequest;
use App\Http\Requests\VehicleStaffRequest;
use App\Repositories\DriverRepository;
use App\Repositories\IDriverRepository;
use App\Repositories\IImageRepository;
use App\Repositories\VehicleRepository;
use App\Repositories\IVehicleRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\StateRepository;
use App\Repositories\IStateRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class VehicleStaffController extends Controller
{
    private $_upload;
    public function __construct(
        private IVehicleRepository $vehicleRepository,
        private IDriverRepository $driverRepository,
        private IStateRepository $stateRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view vehicle staffs', ['only' => ['index']]);
        $this->middleware('permission:add vehicle staffs', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit vehicle staffs', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete vehicle staffs', ['only' => ['destroy']]);
    }

    /**
     * index.
     */
    public function index(Request $request): Response
    {
        $drivers = $this->driverRepository->getDriverAll();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        // driver type
        $driverTypeData = DriverType::cases();
        $driverType = array();
        foreach ($driverTypeData as $dt) {
            array_push($driverType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // driver proff type
        $driverProofTypeData = DriverProofType::cases();
        $driverProofType = array();
        foreach ($driverProofTypeData as $dft) {
            array_push($driverProofType, ['id' => $dft->value, 'title' => $dft->value]);
        }

        // types
        $statusType = Status::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        return Inertia::render('VehicleStaff/Show', [
            // 'VehicleStaffs' => $vehicles,
            'driverType' => $driverType,
            'driverProofType' => $driverProofType,
            'status' => $status,
            'genderArr' => $genderArr,
            'drivers' => $drivers,
            'states' => $states,
        ]);
    }

    /**
     * create
     */
    public function create(Request $request): Response
    {
        return Inertia::render('VehicleStaff/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * save
     */
    public function save(VehicleStaffRequest $request): RedirectResponse
    {
        $input = $request->validated();
        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'image' => 'image',
                'first_name' => $input['first_name'],
                'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
                'type' => $input['type'],
                'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : null,
                'gender' => $input['gender'],
                'age' => intval($input['age']),
                'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
                'contact' => ($input['contact']),
                'emergency_no' => !empty($input['emergency_no']) ? $input['emergency_no'] : null,
                'status' => $input['status'] ?? null,
                'driving_license' => !empty($input['driving_license']) ? $input['driving_license'] : null,
                'proof_type' => $input['proof_type'] ?? null,
                'proof_no' => $input['proof_no'] ?? null,
                'experience' => !empty($input['experience']) ? $input['experience'] : null,
                'relative_name' => !empty($input['relative_name']) ? $input['relative_name'] : null,
                'pincode' => !empty($input['pincode']) ? $input['pincode'] : null,
                'city' => $input['city'] ?? null,
                'state' => $input['state'] ?? null,
                'address' => !empty($input['address']) ? $input['address'] : null,
            );
            $vehicleStaff = $this->driverRepository->create($dataArray);
            if ($vehicleStaff) {
                if (!empty($input['driver_image'])) {
                    // $image_url = $this->_upload->uploadImage($request, 'driver_image', 'vehicle_staff_image');
                    $image_url = $this->_upload->uploadImage($request, 'driver_image', 'driver_image');
                } else {
                    $image_url = 'no image';
                }
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\Vehicle::class,
                    'imageable_id' => $vehicleStaff['id'],
                    'name' => 'vehicle_staff_image',
                    'path' => $image_url,
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->create($dataImage, $vehicleStaff['id']);
            }
            return redirect()->back()->with('message', 'Save successfully.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('vehicle_staff.list');
        }

        $drivers = $this->driverRepository->getDriverAll();
        $driverId = $this->driverRepository->getById($id);
        if (!empty($driverId)) {
            $driverId?->load('vehicleStaffImage');
        }

        // driver type
        $driverTypeData = DriverType::cases();
        $driverType = array();
        foreach ($driverTypeData as $dt) {
            array_push($driverType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // driver proff type
        $driverProofTypeData = DriverProofType::cases();
        $driverProofType = array();
        foreach ($driverProofTypeData as $dft) {
            array_push($driverProofType, ['id' => $dft->value, 'title' => $dft->value]);
        }

        // types
        $statusType = Status::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }
        return Inertia::render('VehicleStaff/Edit', [
            'drivers' => $drivers,
            'driverId' => $driverId,
            'driverType' => $driverType,
            'driverProofType' => $driverProofType,
            'status' => $status,
            'genderArr' => $genderArr,

        ]);
    }

    /**
     * update
     */
    public function update(VehicleStaffRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'image' => "image",
            'first_name' => $input['first_name'],
            'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
            'type' => $input['type'],
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : null,
            'gender' => $input['gender'],
            'age' => intval($input['age']),
            'blood_group' => !empty($input['blood_group']) ? ($input['blood_group']) : null,
            'contact' => ($input['contact']),
            'emergency_no' => !empty($input['emergency_no']) ? ($input['emergency_no']) : null,
            'status' => Status::ACTIVE,
            'driving_license' => !empty($input['driving_license']) ? $input['driving_license'] : null,
            'proof_type' => $input['proof_type'],
            'proof_no' => $input['proof_no'],
            'experience' => !empty($input['experience']) ? $input['experience'] : null,
            'relative_name' => !empty($input['relative_name']) ? $input['relative_name'] : null,
            'pincode' => !empty($input['pincode']) ? intval($input['pincode']) : null,
            'city' => $input['city'],
            'state' => $input['state'],
            'address' => !empty($input['address']) ? $input['address'] : null,
        );

        $vehicleStaff = $this->driverRepository->update($input['id'], $dataArray);

        if ($request->hasFile('driver_image')) {
            $image_url = $this->_upload->uploadImage($request, 'driver_image', 'driver_image');
            // $dataImage = array(
            //     'path' => !empty($image_url) ? $image_url : NULL,
            // );

            $attributesToCheck = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Vehicle::class,
                'imageable_id' => $input['id'],
                'name' => "vehicle_staff_image",
            );

            $valuesToUpdate = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            // $this->imageRepository->morphVehicleStaffImageUpdate($dataImage, $input['id']);
        }

        if (!$vehicleStaff) {
            return redirect()->route('vehicle_staff.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('vehicle_staff.list')->with('message', 'Vehicle satff updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $staff = $this->driverRepository->getById($id);
        if (!$staff) {
            return redirect()->route('vehicle_staff.list')->with('error', 'Staff not found.');
        }
        $this->driverRepository->delete($id);
        return redirect()->route('vehicle_staff.list')->with('message', 'satff deleted successfully.');
    }
}
