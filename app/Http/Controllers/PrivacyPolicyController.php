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

class PrivacyPolicyController extends Controller
{
    /**
     * Display the Ticket List.
     */
    public function indexPrivacy(Request $request): Response
    {
       return Inertia::render('PrivacyPolicy/Index');
   
    }

    /**
     * Display the Ticket List.
     */
    public function termUse(Request $request): Response
    {
       return Inertia::render('PrivacyPolicy/termUse');
   
    }

    /**
     * Display the Ticket List.
     */
    public function about(Request $request): Response
    {
       return Inertia::render('PrivacyPolicy/About');
   
    }


    
}
