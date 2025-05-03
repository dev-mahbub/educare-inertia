<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\IImageRepository;
use App\Repositories\ISchoolRepository;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    public function __construct( 
        private ISchoolRepository $schoolRepository,
        private IImageRepository $imageRepository
    ) 
    {
        // do something
    }
    
    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        $domain_url = request()->getHost();
       
        $domain_name = env('DOMAIN_NAME', 'localhost');
        if($domain_name == $domain_url) {
            return Inertia::render('Auth/ResetPassword', [
                'status' => session('status'),
                'email' => $request->email,
                'token' => $request->route('token'),
            ]);
        }else{
            $code = explode('.', $domain_url);
            if( !empty($code[0]) ) {
                $school = $this->schoolRepository->getBySchoolCode($code[0]);
                $image = $this->imageRepository->getMorphSchool($school->id);
            }

            return Inertia::render('AuthSite/ResetPassword', [
                'status' => session('status'),
                'email' => $request->email,
                'token' => $request->route('token'),
                'school' => $school,
                'domainName' => $domain_name,
                'image' => !empty($image->path) ? $image->path : ''
            ]);
        }

        
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
