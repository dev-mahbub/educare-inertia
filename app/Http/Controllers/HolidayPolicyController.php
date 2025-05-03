<?php

namespace App\Http\Controllers;

use App\Enums\HolidayPolicyDay;
use App\Enums\HolidayPolicyDayRule;
use App\Http\Requests\HolidayPolicyRequest;
use App\Repositories\HolidayRepository;
use App\Repositories\IHolidayRepository;
use App\Repositories\HolidayPolicyRepository;
use App\Repositories\IHolidayPolicyRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class HolidayPolicyController extends Controller
{
    
    public function __construct( 
        private IHolidayPolicyRepository $holidayPolicyRepository,
        private IHolidayRepository $holidayRepository
    ) 
    {
        $this->middleware('permission:view holiday policies', ['only' => ['index']]);
        $this->middleware('permission:add holiday policies', ['only' => ['save']]);
        $this->middleware('permission:edit holiday policies', ['only' => ['update']]);
        $this->middleware('permission:delete holiday policies', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {

        $holiday_polices = $this->holidayPolicyRepository->getActiveAll();
        $holiday_policy_type = HolidayPolicyDay::cases();
        $holiday_policy_type_rule = HolidayPolicyDayRule::cases();
        $holiday_policy_days = array();
        $holiday_policy_days_rule = array();

        foreach($holiday_policy_type as $holiday_policy) {
            array_push($holiday_policy_days, ['id' => $holiday_policy->value, 'title' => $holiday_policy->value]);
        }

        foreach($holiday_policy_type_rule as $holiday_policy_rule) {
            array_push($holiday_policy_days_rule, ['id' => $holiday_policy_rule->value, 'title' => $holiday_policy_rule->value]);
        }

        return Inertia::render('HolidayPolicy/Show', [
            'holiday_policy_days' => $holiday_policy_days,
            'holiday_policy_days_rule' => $holiday_policy_days_rule,
            'holiday_polices' => $holiday_polices 
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(HolidayPolicyRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'name' => !empty($input['name']) ? $input['name'] : "",
            'rule_title' => implode(", ", $input['rule_title']),
            'status' => Status::ACTIVE,
        );

        $holiday_policy = $this->holidayPolicyRepository->create($dataArray);
        if (!$holiday_policy) {
            return redirect()->route('holiday_policy.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('holiday_policy.list')->with('message', 'Holiday policy created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(HolidayPolicyRequest $request, $id): RedirectResponse
    {

        $input = $request->validated();
        $dataArray = array(
            'name' => !empty($input['name']) ? $input['name'] : "",
            'rule_title' => implode(", ", $input['rule_title']),
        );

        $holiday_policy = $this->holidayPolicyRepository->update($id, $dataArray);
        if (!$holiday_policy) {
            return redirect()->route('holiday_policy.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('holiday_policy.list')->with('message', 'Holiday policy updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $holiday_policy = $this->holidayPolicyRepository->getById($id);
        if (!$holiday_policy) {
            return redirect()->route('holiday_policy.list')->with('errors', 'Something goes wrong.');
        }
        $holiday_policy->delete($id);
        return redirect()->route('holiday_policy.list')->with('message', 'Holiday policy deleted successfully.');
    }
}
