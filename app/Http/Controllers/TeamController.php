<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Repositories\BookRepository;
use App\Repositories\IBookRepository;
use App\Repositories\AuthorRepository;
use App\Repositories\IAuthorRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function __construct( 
        private IBookRepository $bookRepository,
        private IAuthorRepository $authorRepository
    ) 
    {
        $this->middleware('permission:view team', ['only' => ['teamManage', 'memberManage', 'teamReport']]);
    }
    
    /**
     * Display the schools.
     */
    public function teamManage(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Team/TeamManage', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

    /**
     * Display the schools.
     */
    public function memberManage(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Team/MemberManage', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

    /**
     * Display the schools.
     */
    public function teamReport(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Team/TeamReport', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

}
