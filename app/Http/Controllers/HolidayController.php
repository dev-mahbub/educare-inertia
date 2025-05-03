<?php

namespace App\Http\Controllers;

use App\Enums\HolidayType;
use App\Http\Requests\HolidayRequest;
use App\Repositories\HolidayRepository;
use App\Repositories\IHolidayRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use Nette\Utils\Strings;

class HolidayController extends Controller
{

    public function __construct(
        private IHolidayRepository $holidayRepository
    )
    {
        $this->middleware('permission:view holidays', ['only' => ['index']]);
        $this->middleware('permission:add holidays', ['only' => ['save']]);
        $this->middleware('permission:edit holidays', ['only' => ['update']]);
        $this->middleware('permission:delete holidays', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $holidays = $this->holidayRepository->getActiveAll();
        $holiday_types = HolidayType::cases();
        $types = array();

        foreach($holiday_types as $type) {
            array_push($types, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('Holiday/Show', [
            'holidays' => $holidays,
            'holiday_types' => $types
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(HolidayRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => $input['name'],
            'holiday_type' => $input['holiday_type'] ?? "",
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'details' => $input['details'] ?? "",
            'status' => Status::ACTIVE,
        );

        $holiday = $this->holidayRepository->create($dataArray);
        if (!$holiday) {
            return redirect()->route('holiday.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('holiday.list')->with('message', 'Holiday created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(HolidayRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'name' => $input['name'],
            'holiday_type' => $input['holiday_type'] ?? "",
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'details' => $input['details'] ?? ""
        );

        $holiday = $this->holidayRepository->update($id, $dataArray);
        if (!$holiday) {
            return redirect()->route('holiday.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('holiday.list')->with('message', 'Holiday updated successfully.');
    }

    /**
     * destroy
     */
    public function destroy(String $id): RedirectResponse
    {
        $holiday = $this->holidayRepository->getById($id);
        if (!$holiday) {
            return redirect()->route('holiday.list')->with('error', 'Something goes wrong.');
        }
        $holiday->delete($id);
        return redirect()->route('holiday.list')->with('message', 'Holiday deleted successfully.');
    }
}
