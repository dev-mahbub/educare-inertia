<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimezoneRequest;
use App\Repositories\TimezoneRepository;
use App\Repositories\ITimezoneRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class TimezoneController extends Controller
{

    public function __construct(
        private ITimezoneRepository $timezoneRepository
    )
    {
        $this->middleware('permission:view timezones', ['only' => ['index']]);
        $this->middleware('permission:add timezones', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit timezones', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete timezones', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $timezones = $this->timezoneRepository->getActiveAll();
        $standard_timezones = $this->timezoneRepository->getStandardTimezoneAll();

        // get times
        $timezone_array = [];
        foreach ($standard_timezones as $time) {
            $timezone_array[] = [
                'id' => $time->id,
                'title' => $time->standard_timezone
            ];
        }

        return Inertia::render('Timezone/Show', [
            'timezones' => $timezones,
            'timezone_array' => $timezone_array
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Timezone/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(TimezoneRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $standard_timezone = $this->timezoneRepository->getStandardTimezoneFromId($input['standard_timezone_id']);

        $dataArray = array(
            'name' => $input['name'],
            'utc_date' => $standard_timezone['utc_date'] ?? "",
            'local_date' => $standard_timezone['local_date'] ?? "",
            'standard_timezone_id' => $input['standard_timezone_id'] ?? "",
            'timezone' => $standard_timezone['standard_timezone'] ?? "",
            'status' => Status::ACTIVE,
        );

        $timezone = $this->timezoneRepository->create($dataArray);
        if (!$timezone) {
            return redirect()->route('timezone.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('timezone.list')->with('message', 'Timezone created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Timezone/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(TimezoneRequest $request, $id): RedirectResponse
    {

        $input = $request->validated();
        $standard_timezone = $this->timezoneRepository->getStandardTimezoneFromId($input['standard_timezone_id']);

        $dataArray = array(
            'name' => $input['name'],
            'standard_timezone_id' => $input['standard_timezone_id'] ?? "",
            'utc_date' => $standard_timezone['utc_date'] ?? "",
            'local_date' => $standard_timezone['local_date'] ?? "",
            'timezone' => $standard_timezone['standard_timezone'] ?? ""
        );

        $timezone = $this->timezoneRepository->update($id, $dataArray);
        if (!$timezone) {
            return redirect()->route('timezone.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('timezone.list')->with('message', 'Timezone updated successfully.');

    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $timezone = $this->timezoneRepository->getById($id);
        if (!$timezone) {
            return redirect()->route('timezone.list')->with('errors', 'Something goes wrong.');
        }
        $timezone->delete($id);
        return redirect()->route('timezone.list')->with('message', 'Timezone deleted successfully.');
    }
}
