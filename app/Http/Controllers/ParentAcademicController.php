<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\AssetRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\UpdateGuardianIdRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ParentAcademicController extends Controller
{
    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IGuardianRepository $guardianRepository
    ) {
        // do something
    }

    /**
     * Display the schools.
     */
    public function indexAcademic(Request $request): Response
    {
        return Inertia::render('ParentAcademic/Show', []);
    }
}
