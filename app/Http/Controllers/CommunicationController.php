<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommunicationRequest;
use App\Repositories\CommunicationRepository;
use App\Repositories\ICommunicationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CommunicationController extends Controller
{
    
    public function __construct( 
        private ICommunicationRepository $communicationRepository
    ) 
    {
        $this->middleware('permission:view communication all', ['only' => ['index']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Communication/Show');
    }

}
