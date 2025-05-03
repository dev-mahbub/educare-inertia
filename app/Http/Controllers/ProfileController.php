<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProfileRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\CountryRepository;
use App\Repositories\ProfileRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IProfileRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IStaffSalaryPaymentRepository;

class ProfileController extends Controller
{

    public function __construct(
        private IProfileRepository $profileRepository,
        private ICountryRepository $countryRepository,
        private IStaffRepository $staffRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
    ) {
        // do something
    }

    /**
     * Display the profiles.
     */
    public function index(Request $request): Response
    {
        $users = User::all();
        $profiles = $this->profileRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();

        $users = User::where('role', UserRole::ADMIN)
            ->get();

        return Inertia::render('Profile/Show', [
            'users' => $users,
        ]);
    }

    /**
     * Display the profiles.
     */
    public function myDetailSalary(Request $request): Response
    {
        $users = User::all();
        $profiles = $this->profileRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();

        $users = User::where('role', UserRole::ADMIN)
            ->get();

        return Inertia::render('Profile/MyDetailSalary', [
            'users' => $users,
        ]);
    }

    /**
     * My Salary
     */
    public function mySalary(): Response
    {
        $staff = $this->staffRepository->getStaffByUserId(78 ?? auth()->user()->id);
        $staffId = $staff?->id;
        $salaryPayments = [];

        if (!empty($staffId)) {
            // staff salary payments
            $salaryPayments = $this->staffSalaryPaymentRepository->getPublishedStaffSalaryPaymentsByStaffId($staffId);

            if (count($salaryPayments) > 0) {
                $salaryPayments->transform(function ($salaryPayment) {
                    $salaryPayment['payment_date'] = !empty($salaryPayment->payment_date) ? Carbon::parse($salaryPayment->payment_date)->format('d-M-Y') : '';

                    return $salaryPayment;
                });
            }
        }

        return Inertia::render('Profile/MySalary', [
            'salaryPayments' => $salaryPayments
        ]);
    }

    /**
     * Display the profiles.
     */
    public function myDetailAttendance(Request $request): Response
    {
        $users = User::all();
        $profiles = $this->profileRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();

        $users = User::where('role', UserRole::ADMIN)
            ->get();

        return Inertia::render('Profile/MyDetailAttendance', [
            'users' => $users,
        ]);
    }

    /**
     * Display the profiles.
     */
    public function myDetailLeave(Request $request): Response
    {
        $users = User::all();
        $profiles = $this->profileRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();

        $users = User::where('role', UserRole::ADMIN)
            ->get();

        return Inertia::render('Profile/MyDetailLeave', [
            'users' => $users,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $countries = $this->countryRepository->getActiveAll();

        return Inertia::render('Profile/Edit', [
            'countries' => $countries,
            'status' => session('status'),
        ]);
    }
}
