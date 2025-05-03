<?php

namespace App\Repositories;

interface IOnlineTopicRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getOnlineDiscussionsByClassroomIdAndSubjectId(int $classroomId, int $subjectId);
    public function getOnlineDiscussionsByClassNameIdAndSubjectId(int $classNameId, int $subjectId);
}
