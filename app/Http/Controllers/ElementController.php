<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomPeriodRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ClassroomPeriodRepository;
use App\Repositories\IClassroomPeriodRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ElementController extends Controller
{
    
    public function __construct( 
        private IClassroomPeriodRepository $classroomPeriodRepository,
        private IClassroomRepository $classroomRepository
    ) 
    {
        // do something
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $classroomPeriods = $this->classroomPeriodRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('Element/Show', [
            'classroomPeriods' => $classroomPeriods,
            'classrooms' => $classrooms,
        ]);
    }
}
