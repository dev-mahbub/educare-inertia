<?php

namespace App\Repositories;

interface ISurveyRepository
{
    public function getAll();

    public function getById($id);

    public function delete($id);

    public function create(array $arrayData);

    public function update($id, array $arrayData);

    public function getActiveAll();

    public function getRegisterAll();

    public function getSurveyById(int $id);

    public function getAudienceWiseSurveyReports(string $audienceType = "");

    public function getActiveSurveyLists(string $audienceType = "");

    public function getUserSurveyLists(string $audienceType = "");

    // survey class

    public function deleteSurveyClass($id);

    public function createSurveyClass(array $arrayData);

    public function updateSurveyClass($id, array $arrayData);

    public function getSurveyClassActiveAll();

    public function deleteSurveyClassesByIds(int $surveyId, array $classNameIds = []);

    public function updateOrCreateSurveyClass(array $attributesToCheck, array $valuesToUpdate);


    // survey question

    public function createSurveyQuestion(array $arrayData);

    public function updateSurveyQuestion($id, array $arrayData);

    public function deleteSurveyQuestionByIds(array $ids = []);

    public function getSurveyQuestionsBySurveyId(int $surveyId);

    // survey response

    public function createSurveyResponse(array $arrayData);
    public function getStudentAndParentSurveyList();
}
