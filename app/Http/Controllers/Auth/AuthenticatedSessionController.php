<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IUserRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Repositories\IImageRepository;
use App\Repositories\SchoolRepository;
use App\Providers\RouteServiceProvider;
use App\Repositories\ISchoolRepository;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{

    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IImageRepository $imageRepository,
        private IUserRepository $userRepository,
    ) {
        // do something
    }

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $domain_url = request()->getHost();
        $mQStrings = request()->all();
        if( !empty($mQStrings['applogin']) && !empty($mQStrings['u']) && !empty($mQStrings['sid']) ) {
            $successLogin = $this->autoMobileLogin($mQStrings['applogin'], $mQStrings['u'], $mQStrings['sid']);
            // redirect after success login
            if( !empty($successLogin) ) {
                return redirect()->intended(RouteServiceProvider::HOME);
            }
        }

        $domain_name = env('DOMAIN_NAME', 'localhost');

        if ($domain_name !== $domain_url) {
            $domain_name = 'app.educarestudy.in';
        }

        if ($domain_name == $domain_url) {
            return Inertia::render('Auth/Login', [
                'canResetPassword' => Route::has('password.request'),
                'status' => session('status'),
            ]);
        } else {

            $code = explode('.', $domain_url);

            if (!empty($code[0])) {
                $school = $this->schoolRepository->getBySchoolCode($code[0]);
                $schoolId = !empty($school->id) ? $school->id : 1;
                $image = $this->imageRepository->getMorphSchool($schoolId);
            }

            return Inertia::render('AuthSite/Login', [
                'canResetPassword' => Route::has('password.request'),
                'status' => session('status'),
                'school' => $school,
                'domainName' => $domain_name,
                'image' => !empty($image->path) ? $image->path : ''
            ]);
        }
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = $this->userRepository->getUserByUsernameAndSchool($request->get('username'), $request->get('school_id'));
        $roleId = $user?->roles?->pluck('id')->first();
        if($roleId == null) {
            switch ($user?->role) {
                case 'Parent':
                    $user->assignRole('Parent');
                    $roleId = $user->roles->pluck('id')->first();
                    break;
                case 'Teacher':
                    $user->assignRole('Teacher');
                    $roleId = $user->roles->pluck('id')->first();
                    break;
                default:
                    $roleId = null;
                    break;
            }
        }
        
        if ((isset($user->is_inactive) && ($user->is_inactive == '0'))) {
            $isUserValid = true;
        } else {
            $isUserValid = false;
        }

        if ($isUserValid && $roleId != null) {
            $request->authenticate();
            $request->session()->regenerate();
            if (!empty($request->get('school_id'))) {
                setUserSchoolId($request->get('school_id'));
            } else {
                setSuperAdminSchoolId();
            }
            setSchoolTimeZone();
            return redirect()->intended(RouteServiceProvider::HOME);
        } else {
            return redirect()->back()->with('error', 'this user is not activated yet or did not assign any role!');
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        Session::forget('student_id');

        return redirect('/');
    }

    private function autoMobileLogin($userId, $username, $schoolId)
    {
        //$request = new LoginRequest(['username' => $username, 'school_id' => $schoolId, 'password' => 'SuperPass24$%' ]);
      //  $request->username = $username;  
       // $request->school_id = $schoolId;  
        $user = $this->userRepository->getUserByUsernameAndSchool($username, $schoolId);
        $roleId = $user?->roles?->pluck('id')->first();
        if ((isset($user->is_inactive) && ($user->is_inactive == '0'))) {
            $isUserValid = true;
        } else {
            $isUserValid = false;
        }

        if ($isUserValid && $roleId != null) {
            setAuthMobileLogin($schoolId);
            Auth::login($user);
            return true;
        } else {
            return redirect()->back()->with('error', 'this user is not activated yet or did not assign any role!');
        }
    }
}
