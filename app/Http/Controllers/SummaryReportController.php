<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupportTicketRequest;
use App\Repositories\SupportTicketRepository;
use App\Repositories\ISupportTicketRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SummaryReportController extends Controller
{
    
    public function __construct( 
        private ISupportTicketRepository $supportTicketRepository
    ) 
    {
        $this->middleware('permission:view staffs', ['only' => ['summaryReport']]);
    }
    
    /**
     * Display the Ticket List.
     */
    public function summaryReport(Request $request): Response
    {
        $supportTickets = $this->supportTicketRepository->getActiveAll();

        return Inertia::render('SummaryReport/SummaryReport', [
            'supportTickets' => $supportTickets,
        ]);
    }

   
}
