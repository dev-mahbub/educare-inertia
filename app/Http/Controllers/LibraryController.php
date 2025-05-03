<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\LibraryRequest;
use App\Models\SiteSetting;
use App\Repositories\LibraryRepository;
use App\Repositories\ILibraryRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LibraryController extends Controller
{

    public function __construct(
        private ILibraryRepository $libraryRepository
    ) {
        $this->middleware('permission:view library', ['only' => ['index']]);
        $this->middleware('permission:add library', ['only' => ['setting']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $libraries = $this->libraryRepository->getActiveAll();

        return Inertia::render('Library/IndexMessage', [
            'libraries' => $libraries,
        ]);
    }

    /**
     * setting
     */
    public function setting(Request $request): Response
    {
        $siteSettings = SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', 'Library')
            ->get()
            ->groupBy('type');

        $librarySiteSettings = [];

        foreach ($siteSettings as $key => $siteSettingGroup) {
            foreach ($siteSettingGroup as $data) {
                $librarySiteSettings[$key][$data->key_name] = $data->value;
            }
        }

        return Inertia::render('Library/Setting', [
            'librarySiteSettings' => !empty($librarySiteSettings['Library']) ? $librarySiteSettings['Library'] : [],
        ]);
    }
}
