<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            // 'flash' => [
            //     'message' => fn () => $request->session()->get('message')
            // ],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'siteData' => [
                'appName' => config('app.name'),
                'loginCredential' => getParentLoginCredential(),
                'authUser' => getAuthUser(),
                'authProfileImage' => getAuthProfileImage(),
                'authRoles' => getUserRoleArray(),
                'isSuperAdmin' => getIsSuperAdmin(),
                'isMainPortal' => getIsMainPortal(),
                'schoolCode' => getSchoolCode(),
                'schoolLogo' => getSchoolLogo(),
                'schoolName' => getUserSchoolName(),
                'AcademicYears' => getAcademicYearsAll(),
                'ActiveAcademicYear' => getAcademicYear(),
                'ActiveAcademicYearId' => getAcademicYearId(),
                'authModules' => getAccessModulesFromSession(),
            ],

        ];
    }
}
