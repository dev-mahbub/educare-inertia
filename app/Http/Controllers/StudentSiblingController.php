<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssetRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\AssetRepository;
use App\Repositories\IAssetRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\TopicRepository;
use App\Repositories\ITopicRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class StudentSiblingController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IGuardianRepository $guardianRepository,
    ) {
        $this->middleware('permission:view student', ['only' => ['existingSiblings', 'possibleSiblings']]);
    }

    /**
     * Display the schools.
     */
    public function existingSiblings(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('StudentSibling/ExistingSiblings', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the schools.
     */
    public function possibleSiblings(Request $request): Response
    {
        $classroomId = '';
        $searchValue = '';
        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $searchValue = $request->input('search_value') ?? '';
        }

        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        $possibleSibling = $this->guardianRepository->getPossibleSiblingByPhone($classroomId, $searchValue);
        $parentRowData = array();

        if (!empty($possibleSibling)) {
            foreach ($possibleSibling as $siblingArray) {
                $tempArr = array(
                    'phone' => '',
                    'parent_name' => '',
                    'email' => ''
                );
                $phoneArr = array();
                $emailArr = array();
                $parentNameArr = array();
                if (!empty($siblingArray)) {
                    foreach ($siblingArray as $sibling) {
                        if (!in_array($sibling['phone'],  $phoneArr)) {
                            array_push($phoneArr, $sibling['phone']);
                        }
                        if (!in_array($sibling['email'],  $emailArr)) {
                            array_push($emailArr, $sibling['email']);
                        }
                        $parentName = getCocatenationTitle($sibling['father_first_name'], $sibling['father_middle_name'], $sibling['father_last_name']);
                        if (!in_array($parentName,  $parentNameArr)) {
                            array_push($parentNameArr, $parentName);
                        }
                    }
                }
                $tempArr['email'] = !empty($emailArr) ? implode(',', $emailArr) : '';
                $tempArr['phone'] = !empty($phoneArr) ? implode(',', $phoneArr) : '';
                $tempArr['parent_name'] = !empty($parentNameArr) ? implode(',', $parentNameArr) : '';
                array_push($parentRowData, $tempArr);
            }
        }

        return Inertia::render('StudentSibling/PossibleSiblings', [
            'possibleSibling' => $possibleSibling,
            'parentRowData' => $parentRowData,
            'classrooms' => $classrooms,
        ]);
    }
}
