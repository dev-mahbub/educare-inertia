<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolShiftRequest;
use App\Repositories\SchoolShiftRepository;
use App\Repositories\ISchoolShiftRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\SchoolShiftType;
use App\Enums\Status;

class SchoolShiftController extends Controller
{
    public function __construct(
        private ISchoolShiftRepository $schoolShiftRepository
    )
    {
        $this->middleware('permission:view time_table', ['only' => ['index']]);
        $this->middleware('permission:add time_table', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit time_table', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete time_table', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        //school shift time type
        $shiftTypeData = SchoolShiftType::cases();
        $shiftType = array();
        foreach($shiftTypeData as $sType) {
            array_push($shiftType, ['id' => $sType->value, 'title' => $sType->value]);
        }

        return Inertia::render('SchoolShift/Show', [
            'schoolShifts' => $schoolShifts,
            'shiftType' => $shiftType
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(SchoolShiftRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'start_time_at' => !empty($input['start_time_at']) ? \Carbon\Carbon::parse($input['start_time_at'])->format('H:i:s') : now()->format('H:i:s'),
            'end_time_at' => !empty($input['end_time_at']) ? \Carbon\Carbon::parse($input['end_time_at'])->format('H:i:s') : now()->format('H:i:s'),
            'status' => Status::ACTIVE
        ];

        $shift = $this->schoolShiftRepository->create($dataArray);

        if (!$shift) {
            return redirect()->route('school_shift.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('school_shift.list')->with('message', 'Shift created successfully.');

    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('SchoolShift/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SchoolShiftRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = [
            'title' => $input['title'] ?? '',
            'start_time_at' => !empty($input['start_time_at']) ? \Carbon\Carbon::parse($input['start_time_at'])->format('H:i:s') : now()->format('H:i:s'),
            'end_time_at' => !empty($input['end_time_at']) ? \Carbon\Carbon::parse($input['end_time_at'])->format('H:i:s') : now()->format('H:i:s')
        ];
        $shift = $this->schoolShiftRepository->update($id, $dataArray);

        if (!$shift) {
            return redirect()->route('school_shift.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('school_shift.list')->with('message', 'Shift updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $shift = $this->schoolShiftRepository->getById($id);
        if (!$shift) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        $shift->delete($id);
        return redirect()->back()->with('message', 'Shift deleted successfully.');
    }
}
