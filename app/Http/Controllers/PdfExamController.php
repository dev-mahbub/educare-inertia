<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Repositories\IVirtualExamRepository;

class PdfExamController extends Controller
{
    public function __construct(
        private IVirtualExamRepository $virtualExamRepository
    ) {
        //
    }

    /**
     * Preview Online Exam Questions
     */
    public function previewOnlineExamQuestions()
    {
        $virtualExamId = $_COOKIE['virtual_exam_id'] ?? null;

        $virtualExam = null;

        if ($virtualExamId != null) {
            $virtualExam = $this->getVirtualExamData($virtualExamId);
        }

        $schoolData = $this->getSchoolData();

        return view('pdf.exam.preview_online_exam_question', [
            'virtualExam' => $virtualExam,
            'schoolData' => $schoolData
        ]);
    }

    /**
     * Download Online Exam Questions
     */
    public function downloadOnlineExamQuestions()
    {
        $virtualExamId = $_COOKIE['virtual_exam_id'] ?? null;

        $virtualExam = null;

        if ($virtualExamId != null) {
            $virtualExam = $this->getVirtualExamData($virtualExamId);
        }

        $schoolData = $this->getSchoolData();

        return view('pdf.exam.download_online_exam_question', [
            'virtualExam' => $virtualExam,
            'schoolData' => $schoolData
        ]);
    }

    /**
     * Preview online Exam Question Banks Questions 
     */
     public function previewOnlineExamQuestionBankQuestions(){
        $questionBankId = $_COOKIE['question_bank_id'] ?? null;
        $questionBank = null;
        
        if ($questionBankId != null) {
            $questionBank = $this->getQuestionBankData($questionBankId);
        }

        $schoolData = $this->getSchoolData();

        return view('pdf.exam.preview_question_bank_online_exam_question', [
            'questionBank' => $questionBank,
            'schoolData' => $schoolData
        ]);
     }

    /**
     * Download online Exam Question Banks Questions 
     */

    public function downloadOnlineExamQuestionBankQuestions(){
        $questionBankId = $_COOKIE['question_bank_id'] ?? null;
        $questionBank = null;
        
        if ($questionBankId != null) {
            $questionBank = $this->getQuestionBankData($questionBankId);
        }

        $schoolData = $this->getSchoolData();

        return view('pdf.exam.download_question_bank_online_exam_question', [
            'questionBank' => $questionBank,
            'schoolData' => $schoolData
        ]);
    }

    /*
    * helper method to get virtual exam data
    */
    private function getVirtualExamData(int $virtualExamId)
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        if ($virtualExam != null) {
            // assigned questions
            $assignedQuestions = [];

            if (!empty($virtualExam->questions)) {
                $questions = json_decode($virtualExam->questions);

                $virtualQuestionIds = collect($questions)->pluck('virtual_question_id')->toArray();

                $assignedQuestions = $this->virtualExamRepository->getVirtualQuestionsByIds($virtualQuestionIds);

                if (count($assignedQuestions) > 0) {
                    $assignedQuestions = $assignedQuestions->map(function ($assignedQuestion) use ($questions) {
                        $question = collect($questions)->filter(function ($question) use ($assignedQuestion) {
                            return $question->virtual_question_id == $assignedQuestion->id;
                        })->first();

                        $assignedQuestion['display_order'] = $question->display_order ?? '';
                        $assignedQuestion['assigned_mark'] = $question->mark ?? 0;
                        $assignedQuestion['answer_options'] = !empty($assignedQuestion->answer_options) ? json_decode($assignedQuestion->answer_options) : [];

                        return $assignedQuestion;
                    });
                }
            }

            $virtualExam['virtual_questions'] = $assignedQuestions;
            $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
            $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
            $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
            $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';
            $virtualExam['duration'] = ($virtualExam?->duration_hour ?? 0) . "h, " . ($virtualExam?->duration_minute ?? 0) . "min";
        }

        return $virtualExam;
    }

    /**
     * helper method to get question bank data
    */

    private function getQuestionBankData(int $questionBankId)
    {
        $questionBank = $this->virtualExamRepository->getVirtualQuestionBankById($questionBankId);
        if ($questionBank != null) {
            // assigned questions
            $assignedQuestions = [];
            if (!empty($questionBank->questions)) {
                $questions = json_decode($questionBank->questions);
               
                $assignedQuestions = $this->virtualExamRepository->getVirtualQuestionsByIds($questions);
                
                if (count($assignedQuestions) > 0) {
                    $assignedQuestions = $assignedQuestions->map(function ($assignedQuestion) {
                        
                        $assignedQuestion['answer_options'] = !empty($assignedQuestion->answer_options) ? json_decode($assignedQuestion->answer_options) : [];
                        return $assignedQuestion;
                    });
                }
            }

            $questionBank['virtual_questions'] = $assignedQuestions;
        }

        return $questionBank;
    }

    /*
    * helper method to get school data
    */
    private function getSchoolData()
    {
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

        if (!empty($schoolData)) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
                'school_number' => $schoolData->school_number,
            ];
        }

        return $schoolData;
    }
}
