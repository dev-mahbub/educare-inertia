<?php

namespace App\Repositories;

interface IAdmissionRepository
{
    // public function getRegisterAll();
    public function getActiveAllAdmissions();
    public function createEnquiry(array $data);
    public function createEnquiryFee(array $data);
    public function createEnquiryParents(array $data);
    public function getAdmissionFromSessionId();
    public function getMarksForFreezeMark(int $examId, int $classroomId, int $subjectId = null);
    public function updateMarkStatus(int $examId, array $classroomIds, $newStatus, int $subjectId = null);
    public function checkFreezedMarkExists(int $examId, array|int $classroomId, int $schoolId = null, int $academicYearId = null);
}
