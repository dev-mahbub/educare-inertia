<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TeacherReportController extends Controller
{
    
    public function __construct(
        // private ISubjectRepository $subjectRepository,
    )
    {
        $this->middleware('permission:view staffs', ['only' => ['classReport', 'classSummaryReport', 'studentTeacherReport', 'studentTeacherReport']]);
    }


    /**
     * Class Report
     */
    public function classReport()
    {
        return Inertia::render('TeacherClassReport/Show', []);
    }

    /**
     * Class Summary Report
     */
    public function classSummaryReport()
    {
        return Inertia::render('TeacherClassSummaryReport/Show', []);
    }


    /**
     * Student Teacher Report
     */
    public function studentTeacherReport()
    {
        return Inertia::render('StudentTeacherReport/Show', []);
    }

}
