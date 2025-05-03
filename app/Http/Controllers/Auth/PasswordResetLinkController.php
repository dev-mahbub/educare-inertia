<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\IImageRepository;
use App\Repositories\ISchoolRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Services\MailService;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{

    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IImageRepository $imageRepository,
        private MailService $mailService,
    ) {
        // do something
    }

    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        // meta data
        $metaData = [
            'title' => getSiteSettingDataByTypeAndKey('Presence', 'forgot_password_title')?->value ?? '',
            'description' => getSiteSettingDataByTypeAndKey('Presence', 'forgot_password_description')?->value ?? '',
            'keywords' => getSiteSettingDataByTypeAndKey('Presence', 'forgot_password_keyword')?->value ?? ''
        ];

        $domain_url = request()->getHost();

        $domain_name = env('DOMAIN_NAME', 'localhost');
        if ($domain_name == $domain_url) {
            return Inertia::render('Auth/ForgotPassword', [
                'status' => session('status'),
                'metaData' => $metaData
            ]);
        } else {
            $code = explode('.', $domain_url);
            if (!empty($code[0])) {
                $school = $this->schoolRepository->getBySchoolCode($code[0]);
                $image = $this->imageRepository->getMorphSchool($school->id);
            }

            return Inertia::render('AuthSite/ForgotPassword', [
                'status' => session('status'),
                'school' => $school,
                'domainName' => $domain_name,
                'image' => !empty($image->path) ? $image->path : '',
                'metaData' => $metaData
            ]);
        }
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required',
        ]);

        $this->mailService->setMailConfiguration();
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
