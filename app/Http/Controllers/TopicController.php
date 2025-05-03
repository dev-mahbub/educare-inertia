<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicRequest;
use App\Repositories\TopicRepository;
use App\Repositories\ITopicRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;

class TopicController extends Controller
{
    
    public function __construct( 
        private ITopicRepository $topicRepository
    ) 
    {
        // do something
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Topic/Show', [
            'topics' => $topics,
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(TopicRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'],
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $topic = $this->topicRepository->create($dataArray);
        if (!$topic) {
            return redirect()->route('topic.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('topic.list')->with('message', 'Topic created successfully.');
    }
    

    /**
     * Update the user's profile information.
     */
    public function update(TopicRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'],
            'description' => $input['description'] ?? "",
        );

        $topic = $this->topicRepository->update($id, $dataArray);
        if (!$topic) {
            return redirect()->route('topic.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('topic.list')->with('message', 'Topic updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $topic = $this->topicRepository->getById($id);
        if (!$topic) {
            return redirect()->route('topic.list')->with('errors', 'Something goes wrong.');
        }
        $topic->delete($id);
        return redirect()->route('topic.list')->with('message', 'Topic deleted successfully.');
    }
}
