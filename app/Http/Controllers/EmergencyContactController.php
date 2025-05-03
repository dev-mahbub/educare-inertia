<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmergencyContactRequest;
use App\Repositories\EmergencyContactRepository;
use App\Repositories\IEmergencyContactRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Models\EmergencyContact;

class EmergencyContactController extends Controller
{

    public function __construct(
        private IEmergencyContactRepository $emergencyContactRepository
    ) {
        $this->middleware('permission:view emergency contacts', ['only' => ['index']]);
        $this->middleware('permission:add emergency contacts', ['only' => ['save']]);
        $this->middleware('permission:edit emergency contacts', ['only' => ['update']]);
        $this->middleware('permission:delete emergency contacts', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $contacts = $this->emergencyContactRepository->getActiveAll();
        return Inertia::render('EmergencyContact/Create', [
            'contacts' => $contacts
        ]);
    }

    /**
     * Display the user's profile form.
     */
    // public function create(Request $request): Response
    // {
    //     return Inertia::render('EmergencyContact/Create');
    // }

    /**
     * Update the user's profile information.
     */
    public function save(EmergencyContactRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'mobile_number' => $input['mobile_number'],
            'alter_mobile_number' => !empty($input['alter_mobile_number']) ? $input['alter_mobile_number'] : "",
            'phone_number' => !empty($input['phone_number']) ? $input['phone_number'] : "",
            'email_id' => !empty($input['email_id']) ? $input['email_id'] : "",
            'status' => Status::ACTIVE,
        );
        $contact = $this->emergencyContactRepository->create($dataArray);
        if (!$contact) {
            return redirect()->route('emergency_contact.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('emergency_contact.list')->with('message', 'Emergency contact created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(EmergencyContactRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'mobile_number' => $input['mobile_number'],
            'alter_mobile_number' => !empty($input['alter_mobile_number']) ? $input['alter_mobile_number'] : "",
            'phone_number' => !empty($input['phone_number']) ? $input['phone_number'] : "",
            'email_id' => !empty($input['email_id']) ? $input['email_id'] : "",
            'status' => Status::ACTIVE,
        );
        $contact = $this->emergencyContactRepository->update($id, $dataArray);
        if (!$contact) {
            return redirect()->route('emergency_contact.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('emergency_contact.list')->with('message', 'Emergency contact created successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id): RedirectResponse
    {
        $emergencyContact = $this->emergencyContactRepository->getById($id);
        if (!$emergencyContact) {
            return redirect()->route('emergency_contact.list')->with('errors', 'Something goes wrong.');
        }
        $emergencyContact->delete($id);
        return redirect()->route('emergency_contact.list')->with('message', 'Emergency contact deleted successfully.');
    }
}
