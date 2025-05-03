<?php

namespace App\Http\Controllers;

use App\Repositories\IPageRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrontendPagesController extends Controller
{
    
    public function __construct( 
        private IPageRepository $pageRepository
    ) 
    {
        // do somethings!
    }
    
    /**
     * Display the Ticket List.
     */
    public function contact(Request $request): Response
    {
        $schoolId = getAnynomousSchoolId($request);
        $content = $this->pageRepository->getPageByType('Contact Us', $schoolId);
        return Inertia::render('FrontendPage/Contact', [
            'content' => $content,
        ]);
    }

    /**
     * Display the Ticket List.
     */
    public function about(Request $request): Response
    {
        $schoolId = getAnynomousSchoolId($request);
        $content = $this->pageRepository->getPageByType('About Us', $schoolId);
        return Inertia::render('FrontendPage/About', [
            'content' => $content,
        ]);
    }

    /**
     * Display the Ticket List.
     */
    public function privacyPolicy(Request $request): Response
    {
        $schoolId = getAnynomousSchoolId($request);
        $content = $this->pageRepository->getPageByType('Privacy Policy', $schoolId);
        return Inertia::render('FrontendPage/PrivacyPolicy', [
            'content' => $content,
        ]);
    }

    /**
     * Display the Ticket List.
     */
    public function term(Request $request): Response
    {
        $schoolId = getAnynomousSchoolId($request);
        $content = $this->pageRepository->getPageByType('Terms & Conditions', $schoolId);
        return Inertia::render('FrontendPage/Term', [
            'content' => $content,
        ]);
    }

    /**
     * Display the Ticket List.
     */
    public function cancellation(Request $request): Response
    {
        $schoolId = getAnynomousSchoolId($request);
        $content = $this->pageRepository->getPageByType('Cancellation/Refund Policy', $schoolId);
        return Inertia::render('FrontendPage/Cancellation', [
            'content' => $content,
        ]);
    }
 
}
