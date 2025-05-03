<?php 

namespace App\Repositories;

interface IClassroomDiscussionRepository
{
    // public function getRegisterAll();
    public function getClassroomDiscussionsByClassroomIdAndSubjectId(int $classroomId, int $subjectId);
}