<?php 

namespace App\Repositories;

interface IOnlineQuestionRepository
{
    public function getDiscussionById($id);
    public function deleteDiscussion($id);
    public function createDiscussion(array $arrayData);
    public function updateDiscussion($id, array $arrayData);
    public function getDiscussionActiveAll($type = null, $onlineQuestionId = null, $userId = null, $schoolId = null, $academicYearId = null);
}