<?php

namespace App\Repositories;

interface IBookRepository
{
    public function getAll();
    public function getActiveAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAllForReport($classroom_id, $student_id);
    public function getActiveAllForReportStudentWise($classroom_id, $student_id);
    public function getActiveAllTeacherIssuesBookByStaffId($staff_id);
    public function getAllActiveTeacherReturnBook($start_date_at, $end_date_at);
    public function getActiveAllTeacherIssuesBook($start_date_at, $end_date_at);
    public function getActionAllTeacherWiseBookReport($staff_id);
    public function getAllActiveStudentIssueBook($start_date_at, $end_date_at);
    public function getAllActiveStudentReturnBook($start_date_at, $end_date_at);

    // book return
    public function getAllBookReturn();
    public function getActiveAllBookReturn();
    public function getByIdBookReturn($id);
    public function deleteBookReturn($id);
    public function createBookReturn(array $arrayData);
    public function updateBookReturn($id, array $arrayData);
    public function getActiveAllBookIssueByAccNo($book_acc_no);

    // e-book
    public function getAllEBook();
    public function getActiveAllEBook();
    public function getByIdEBook($id);
    public function deleteEBook($id);
    public function createEBook(array $arrayData);
    public function updateEBook($id, array $arrayData);
    public function getIssuedBookListByStudentAndClassRoomId($student_id, $classroom_id, $school_id = null);
}
