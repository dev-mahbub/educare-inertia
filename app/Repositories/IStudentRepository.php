<?php

namespace App\Repositories;

interface IStudentRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function checkAdmNo($admNo);
    public function getNextAdmissionNo();
    public function getRelationalObjById($id);
    public function getActiveAll($classroom_id = null, $boarding_type = null);
    public function getListForUpdated();
    public function getListForChangeClass($classRoomId, $searchValue);
    public function getListForFee($classNameId = null, $searchValue = null);
    public function getListForChangeClassSelected();
    public function getActiveListForBiometric($classroomId, $searchValue);
    public function getRegisterAll();
    public function getActiveNameAndId();
    public function getSiblingById($id);
    public function getActiveNameAndIdWithoutSame($id);
    public function getActiveNameAndIdByClassroomId(int $id);
    public function getAllByClassroomId(int $classroomId);
    public function getAllStudents();
    public function getStudentsByClassroomWise();
    public function getCredentialList();
    public function getStatusList($classRoomId);
    public function getStudentInfoCredent();
    public function getUserId($id);
    public function getListForChangeDuration($classRoomId = null, $searchValue = null);
    public function getStudentsByClassNameId($id);
    public function getStudentsByClassNameIdAndClassroomId($classId, $classroomId);
    public function createSibling(array $arrayData);
    public function existStudentFromClassId(int $class_id);
    public function getStudentNameIdByClassroomId($id);
    public function getStudentInfoForSale($id);
    public function getClassWithStudentCount($type = null);
    public function getClassroomsWithStudent2($classNameId, $type = null);
    public function getListForSummery($classNameId, $classroomId, $searchValue, $type);
    public function getListForSearch($session, $admissionNumber, $studentName, $fatherName, $fatherNumber, $motherName);
    public function createClassroomStudent(array $arrayData);
    public function updateClassroomStudent($id, array $arrayData);
    public function getListForClassroomStudent($targetAcademicYearId, $targetClassroomId);
    public function getUpgradeStudents($academicYearId, $classroomId);
    public function getListForUpgrade($academicYearId, $classroomId, $upgradeStudents);
    public function getSubjectWiseDataByClassroomIdAndSubjectId($classId, $subjectId);
    public function getAllActiveStudents();
    public function getStudentsByClassroomId($classroomId, $schoolId = null, $academicYearId = null);
    public function getStudentByAdmissionNoAndStudentId($admissionNo = null, $studentId = null, $schoolId = null, $academicYearId = null);
    public function getStudentDetailsData($id, $schoolId = null);
    public function getStudentsForSmsCredentials(int $classroomId = null, int $schoolId = null, int $academicYearId = null);
    public function getStudentsByClassroomIdsForSmsCredentials(array $classroomIds, string $boardingType = '', int $schoolId = null, int $academicYearId = null);

    public function getStudentData();
    public function getStudentCounts();
    public function getClassWiseStudent($classroom_id, $subject_id, $exam_id, $schoolId = null, $academicYearId = null);
    public function remarkStudentList($examID, $classID, $classroomId = null);

    public function getStudentDataByStudentsIds($studentIds, $classroomId);
    public function getStudentDataExceptThisIds($excludeIds, $classroomId = null);
    public function getStudentForExamAttendance($exam_id, $classroom_id, $schoolId = null, $academicYearId = null);
    public function getStudentsForOnlineAttendance(int $classroomId, int $academicYearId = null);
    public function getStudentDocumentReports(int $classroomId, int $documentCategoryId);

    public function getStudentsByAssessmentClassroomIds($classroomIds, $assessmentId,  $schoolId = null, $academicYearId = null);
    public function getActiveRegistrationStudents($schoolId = null, $academicYearId = null);
    public function getActiveRegistrationStudentsWithoutLedger($schoolId = null, $academicYearId = null);
    public function getActiveStudentsWithoutLedger($schoolId = null, $academicYearId = null);
    public function getActiveBoardingStudents(int $classroomId = null, int $schoolId = null, int $academicYearId = null);
    public function getBoardingStudentById(int $id, int $schoolId = null, int $academicYearId = null);
    public function createStudentWalletTransaction(array $arrayData);
    public function getStudentByAdmissionNoAndFatherPhone(string $admissionNo, string $fatherPhone, int $schoolId = null);
    public function getStudentByUserId(int $userId, int $schoolId = null);
    public function filterStudentsForSaleDuePayment(string $admissionNo = "", string $studentName = "", string $fatherName = "");
}
