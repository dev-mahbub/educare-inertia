<?php

namespace App\Http\Controllers;

use App\Enums\Gender;
use App\Enums\Status;
use App\Http\Requests\JobRequest;
use App\Repositories\JobRepository;
use App\Repositories\IJobRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicantController extends Controller
{

    public function __construct(
        private IJobRepository $jobRepository
    )
    {
        $this->middleware('permission:view post jobs', ['only' => ['index']]);
        $this->middleware('permission:add post jobs', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit post jobs', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete post jobs', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $jobs = []; // $this->jobRepository->getAll();
        return Inertia::render('JobApplicant/Show', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {

        //get status
        $statusType = Status::cases();
        $statues = array();
        foreach($statusType as $statusType) {
            array_push($statues, ['id' => $statusType->value, 'title' => $statusType->value]);
        }

        //get gender
        $genderType = Gender::cases();
        $genders = array();
        foreach($genderType as $genType) {
            array_push($genders, ['id' => $genType->value, 'title' => $genType->value]);
        }

        return Inertia::render('JobApplicant/Create', [
            'genders' => $genders,
            'statues' => $statues
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(JobRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'job_code' => $input['job_code'] ?? '',
            'designation' => $input['designation'] ?? '',
            'vacancy' => $input['vacancy'] ?? '',
            'gender' => $input['gender'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'qualification' => $input['qualification'] ?? '',
            'interview_date_at' => !empty($input['interview_date_at']) ? \Carbon\Carbon::parse($input['interview_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'] ?? '',
            'status' => $input['status'] ?? ''
        );

        $job = $this->jobRepository->create($dataArray);
        if (!$job) {
            return redirect()->route('job.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('job.list')->with('message', 'Job created successfully.');
    }



    /**
     * Display the user's profile form.
     */
    public function edit(string $id): Response
    {

        $job = $this->jobRepository->getById($id);

        //get status
        $statusType = Status::cases();
        $statues = array();
        foreach($statusType as $statusType) {
            array_push($statues, ['id' => $statusType->value, 'title' => $statusType->value]);
        }

        //get gender
        $genderType = Gender::cases();
        $genders = array();
        foreach($genderType as $genType) {
            array_push($genders, ['id' => $genType->value, 'title' => $genType->value]);
        }

        return Inertia::render('JobApplicant/Edit', [
            'job' => $job,
            'genders' => $genders,
            'statues' => $statues
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(JobRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? '',
            'job_code' => $input['job_code'] ?? '',
            'designation' => $input['designation'] ?? '',
            'vacancy' => $input['vacancy'] ?? '',
            'gender' => $input['gender'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'qualification' => $input['qualification'] ?? '',
            'interview_date_at' => !empty($input['interview_date_at']) ? \Carbon\Carbon::parse($input['interview_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'] ?? '',
            'status' => $input['status'] ?? ''
        );

        $job = $this->jobRepository->update($id, $dataArray);
        if (!$job) {
            return redirect()->route('job.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('job.list')->with('message', 'Job created successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(string $id): RedirectResponse
    {
        $job = $this->jobRepository->getById($id);
        if (!$job) {
            return redirect()->route('job.list')->with('errors', 'Something goes wrong.');
        }
        $job->delete($id);
        return redirect()->route('job.list')->with('message', 'Job deleted successfully.');
    }
}
