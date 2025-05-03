<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequest;
use App\Repositories\LeaveRepository;
use App\Repositories\ILeaveRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LeaveReportController extends Controller
{
    
    public function __construct( 
        private ILeaveRepository $leaveRepository
    ) 
    {
        $this->middleware('permission:view leave', ['only' => ['staffOnLeaveToday', 'staffWiseLeaveReport',
        'monthWiseLeaveReport', 'staffWiseMonthLeaveReport', 'leaveTypeWiseMonthLeaveReport',
        'staffWiseLeaveSummary', 'staffWiseAttendanceReport', 'monthWiseAttendanceReport', 
        'extraDayReport', 'outdoorReport', 'registerViewReport']]);
    }
    
    /**
     * Display the schools.
     */
    public function staffOnLeaveToday(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/StaffOnLeaveToday', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function staffWiseLeaveReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/StaffWiseLeaveReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function monthWiseLeaveReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/MonthWiseLeaveReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function staffWiseMonthLeaveReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/StaffWiseMonthLeaveReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function leaveTypeWiseMonthLeaveReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/LeaveTypeWiseMonthLeaveReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function staffWiseLeaveSummary(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/StaffWiseLeaveSummary', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function staffWiseAttendanceReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/StaffWiseAttendanceReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function monthWiseAttendanceReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/MonthWiseAttendanceReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function extraDayReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/ExtraDayReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function outdoorReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/OutdoorReport', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Display the schools.
     */
    public function registerViewReport(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('LeaveReport/RegisterViewReport', [
            'leaves' => $leaves,
        ]);
    }

}
