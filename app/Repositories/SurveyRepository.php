<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Survey;
use App\Models\SurveyClass;
use App\Models\SurveyQuestion;
use App\Models\SurveyResponse;

class SurveyRepository implements IRepository, ISurveyRepository
{
    public function getAll()
    {
        return Survey::all();
    }

    public function getById($id)
    {
        return Survey::findOrFail($id);
    }

    public function delete($id)
    {
        return Survey::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Survey::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Survey::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Survey::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return Survey::where('status', Status::ACTIVE);
    }

    public function getSurveyById(int $id)
    {
        return Survey::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->with(['surveyClasses', 'surveyQuestions'])
            ->first();
    }


    public function getAudienceWiseSurveyReports(string $audienceType = "")
    {
        return Survey::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when(!empty($audienceType), function ($query) use ($audienceType) {
                $query->where('survey_audience', $audienceType);
            })
            ->with(['openedBy', 'closedBy', 'surveyResponses.user'])
            ->select(
                'id',
                'title',
                'opened_date',
                'closed_date',
                'opened_by',
                'closed_by',
            )
            ->get();
    }

    public function getActiveSurveyLists(string $audienceType = "")
    {
        return Survey::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when(!empty($audienceType), function ($query) use ($audienceType) {
                $query->where('survey_audience', $audienceType);
            })
            ->select(
                'id',
                'title',
                'survey_audience',
                'is_open',
                'created_at',
            )
            ->get();
    }

    public function getUserSurveyLists(string $audienceType = "")
    {
        return Survey::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_open', true)
            ->when(!empty($audienceType), function ($query) use ($audienceType) {
                $query->where('survey_audience', $audienceType);
            })
            ->select(
                'id',
                'title',
                'survey_audience',
                'opened_date',
            )
            ->get();
    }

    public function getStudentAndParentSurveyList()
    {
        return Survey::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('survey_audience', 'student')
            ->orWhere('survey_audience', 'parent')
            ->where('is_open', true)
            ->select(
                'id',
                'title',
                'survey_audience',
                'is_open',
                'created_at',
            )
            ->get();
    }

    // survey class

    public function deleteSurveyClass($id)
    {
        return SurveyClass::destroy($id);
    }

    public function createSurveyClass(array $arrayData)
    {
        return SurveyClass::create($arrayData);
    }

    public function updateSurveyClass($id, array $arrayData)
    {
        return SurveyClass::whereId($id)->update($arrayData);
    }

    public function getSurveyClassActiveAll()
    {
        return SurveyClass::where('status', Status::ACTIVE);
    }

    public function deleteSurveyClassesByIds(int $surveyId, array $classNameIds = [])
    {
        return SurveyClass::where('school_id', getUserSchoolId())
            ->where('survey_id', $surveyId)
            ->whereIn('class_name_id', $classNameIds)
            ->delete();
    }

    public function updateOrCreateSurveyClass(array $attributesToCheck, array $valuesToUpdate)
    {
        return SurveyClass::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }


    // survey question

    public function createSurveyQuestion(array $arrayData)
    {
        return SurveyQuestion::create($arrayData);
    }

    public function updateSurveyQuestion($id, array $arrayData)
    {
        return SurveyQuestion::whereId($id)->update($arrayData);
    }

    public function deleteSurveyQuestionByIds(array $ids = [])
    {
        return SurveyQuestion::where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->delete();
    }

    public function getSurveyQuestionsBySurveyId(int $surveyId)
    {
        return SurveyQuestion::where('school_id', getUserSchoolId())
            ->where('survey_id', $surveyId)
            ->get();
    }

    public function getSurveyQuestionById(int $id)
    {
        return SurveyQuestion::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    // survey response

    public function createSurveyResponse(array $arrayData)
    {
        return SurveyResponse::create($arrayData);
    }
}
