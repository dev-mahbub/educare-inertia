<?php

namespace App\Http\Controllers;

use App\Http\Requests\SmsSettingRequest;
use App\Repositories\SmsSettingRepository;
use App\Repositories\ISmsSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SocialShareController extends Controller
{

    public function __construct(
        private ISmsSettingRepository $smsSettingRepository
    )
    {
        $this->middleware('permission:view social shares', ['only' => ['index']]);
        $this->middleware('permission:add social shares', ['only' => ['create', 'updateOrCreate', 'edit']]);
        $this->middleware('permission:edit social shares', ['only' => ['update']]);
        $this->middleware('permission:delete social shares', ['only' => ['destroy']]);
    }

    /**
     * create
     */
    public function create(Request $request): Response
    {
        $socialSettingsData = [];
        $socialButtonSettings = getSiteSettingDataByType('Social');
        if (!empty(getSiteSettingDataByType('Social'))) {
            $socialSettings = getSiteSettingDataByType('Social')['Social'];
            foreach ($socialSettings as $key => $value) {
                $socialSettingsData[] = [
                    'type' => 'Social',
                    'key' => $key,
                    'value' => $value,
                ];
            }
        }
        return Inertia::render('SocialShare/Create', [
            'socialSettings' => $socialSettingsData,
            'socialButtonSettings' => !empty($socialButtonSettings['Social']) ? $socialButtonSettings['Social'] : [],
        ]);
    }

    /**
     * updateOrCreate
     */
    public function updateOrCreate(Request $request): RedirectResponse
    {
        $input = $request->input('selected_data');
        if (!empty($input)) {
            foreach ($input as $item) {
                setSiteSettingData($item['type'], $item['key'], $item['value']);
            }
            return redirect()->back()->with('message', 'Setting save successfully.');
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('SocialShare/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SmsSettingRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('sms_setting.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
