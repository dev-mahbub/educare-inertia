<?php

namespace App\Http\Controllers;

use App\Http\Requests\HostelRequest;
use App\Repositories\HostelRepository;
use App\Repositories\IHostelRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    
    /**
     * Display the schools.
     */
    public function index()
    {
        return Redirect::to('/login');
    }

}
