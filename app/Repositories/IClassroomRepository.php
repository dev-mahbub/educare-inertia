<?php

namespace App\Repositories;

interface IClassroomRepository
{
    public function getAll();
    public function getById($id);
    public function getByIdForAssignRoll($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getClassroomFromClassNameId($classNameId, $classroomId);
    public function getActiveAll();
    public function getByClassNameParams($schoolId, $classNameId, $academicYearId, $title);
    public function getOnlineClassActiveAll();
    public function getTodayOnlineLiveClass();
    public function getRegisterAll();
    public function getSubject();
    public function getAllActiveClass();
    public function getActiveNameAndId($academicId = null);
    public function getActiveNameAndIdNotAcy();
    public function getActiveNameAndIdByClassNameId($class_id = null);
    public function getClassNameIdFromClassId($classId);
    public function getClassroomsFromClassId($classNameId);
    public function getActiveNameAndIdByClassNameIds(array $class_name_ids);
    public function getClassroomIdsByClassNameId($classNameId);
    public function getGraphWeakerReport($classroomId, $examId, $subjectId);
    public function getTopperReportFilter($classId, $examId, $subjectId);
    public function getStudentForSendMark($classId, $examID);
    public function getSubjectsCountStudents($classId, $examID);
    public function getClasses($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null);
    public function getAllClassesRaw($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null);
    public function getSingleClassroomRaw($classroomId = null, $subjectId = null, $schoolId = null, $academicYearId = null);
    public function getStudentSInfo($classId, $studentId, $schoolId = null, $academicYearId = null);
    public function getClassroomsByExamId(int $examId);
    public function getClassNamesByExamId(int $examId);
    public function getClassroomsByClassNameIds(array $classNameIds);
    public function getClassroomsByClassNameId(int $classNameId);
    public function getTeacherClassroomsRaw(int $teacherId, int $classNameId = null, $schoolId = null, $academicYearId = null);
    public function getTeacherClassrooms(int $teacherId, int $classNameId = null, $schoolId = null, $academicYearId = null);
    public function getByClassNameId(int $classNameId, $schoolId = null, $academicYearId = null);
    // Class name
    public function getActiveClassNameAll();
    public function getClassNameById($id);
    public function classNameCreate(array $arrayData);
    public function classNameModelUpdate($id, array $arrayData);
    public function classNameDelete($id);
    public function getAllActiveClassName();
    public function getActiveClassNameById($id);
    public function getActiveClassNameAndId();
    public function getActiveClassAndSection();
    public function getActiveClassNameForTD();

    // roll

    public function getRollFromClassAndStudent($classroomId, $studentId);

    // online class
    public function getOnlineClassById(int $id, int $userId = null);
    public function deleteOnlineClass(int $id);
    public function createOnlineClass(array $arrayData);
    public function updateOnlineClass(int $id, array $arrayData);
    public function getOnlineClasses(int $classroomId = null, int $subjectId = null, string $startDate = "", string $endDate = "", int $userId = null, int $academicYearId = null);
    public function getTodayOnlineClasses(int $classroomId = null, int $subjectId = null, int $userId = null, int $academicYearId = null);

    // timetable
    public function createTimeTable(array $arrayData);
    public function getTimeTableActiveAll($type = 'Morning', $classroomId = null, $schoolId = null, $academicYearId = null);
    public function getTeacherTimeTableActiveAll($type = 'Morning', $schoolId = null, $academicYearId = null);
    // getActiveNameAndIdByIds
    public function getActiveNameAndIdByClassRoomIds(array $ids, $schoolId = null, $academicYearId = null);
    public function getClassTeacherByClassRoomId(int $classroomId, $schoolId = null, $academicYearId = null);
}
