<?php

namespace App\Repositories;

use App\Enums\BookTypeUser;
use App\Enums\Status;
use App\Models\BookIssue;
use App\Models\BookReturn;
use App\Models\EBook;

class BookRepository implements IRepository, IBookRepository
{
    public function getAll()
    {
        return BookIssue::where('school_id', getUserSchoolId())->get();
    }

    public function getActiveAll()
    {
        return BookIssue::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->get();
    }

    public function getAllActiveStudentIssueBook($start_date_at, $end_date_at)
    {
        $query = BookIssue::query();
        $query->where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('student_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'student' => function ($query) {
                    $query->select('id', 'classroom_id', 'first_name', 'middle_name', 'last_name', 'phone');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
            ]
        );
        $query->when(function ($q) use ($start_date_at, $end_date_at) {
            if ($start_date_at && $end_date_at) {
                $q->whereBetween('issued_date_at', [$start_date_at, $end_date_at]);
            }
        });

        return $query->latest()->get();
    }

    public function getActiveAllForReport($classroom_id, $student_id)
    {
        $query = BookIssue::query();
        $query->where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('student_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'student' => function ($query) {
                    $query->select('id', 'classroom_id', 'first_name', 'middle_name', 'last_name', 'phone');
                },
                'student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'student.classroomRoll' => function ($query) {
                    $query->select('id', 'roll_no', 'student_id');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
            ]
        );
        $query->when(function ($q) use ($classroom_id, $student_id) {
            if (!empty($classroom_id)) {
                $q->where('classroom_id', $classroom_id);
            }
            if (!empty($student_id)) {
                $q->where('student_id', $student_id);
            }
        });

        return $query->latest()->get();
    }

    public function getActiveAllForReportStudentWise($classroom_id, $student_id)
    {
        $query = BookIssue::where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
                'classroom_id' => $classroom_id,
                'student_id' => $student_id,
            ]
        )->whereNotNull('student_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no', 'is_available');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title', 'author');
                },
                'bookReturn' => function ($query) {
                    $query->select('id', 'return_date_at', 'book_issue_id');
                },
            ]
        );
        return $query->latest()->get();
    }

    public function getActiveAllTeacherIssuesBookByStaffId($staff_id)
    {
        $query = BookIssue::where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::TEACHER->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('staff_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
                'staff' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name');
                },
            ]
        );
        $query->when(function ($q) use ($staff_id) {
            if ($staff_id) {
                $q->where('staff_id', $staff_id);
            }
        });
        return $query->latest()->get();
    }

    public function getActionAllTeacherWiseBookReport($staff_id)
    {
        $query = BookIssue::where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::TEACHER->value,
                'status' => Status::ACTIVE->value,
                'staff_id' => $staff_id,
            ]
        )->whereNotNull('staff_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no', 'is_available');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title', 'author');
                },
                'staff' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name');
                },
                'bookReturn' => function ($query) {
                    $query->select('id', 'return_date_at', 'book_issue_id');
                },
            ]
        );
        return $query->latest()->get();
    }

    public function getActiveAllTeacherIssuesBook($start_date_at, $end_date_at)
    {
        $query = BookIssue::where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::TEACHER->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('staff_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
                'staff' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name');
                },
            ]
        );
        $query->where(function ($q) use ($start_date_at, $end_date_at) {
            if ($start_date_at && $end_date_at) {
                $q->whereBetween('issued_date_at', [$start_date_at, $end_date_at]);
            }
        });
        return $query->latest()->get();
    }

    public function getById($id)
    {
        return BookIssue::findOrFail($id);
    }

    public function delete($id)
    {
        return BookIssue::destroy($id);
    }

    public function create(array $arrayData)
    {
        return BookIssue::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return BookIssue::whereId($id)->update($arrayData);
    }

    // book return
    public function getAllBookReturn()
    {
        return BookReturn::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllBookReturn()
    {
        return BookReturn::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->get();
    }

    public function getAllActiveStudentReturnBook($start_date_at, $end_date_at)
    {
        $query = BookReturn::query();
        $query->where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('student_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'student' => function ($query) {
                    $query->select('id', 'classroom_id', 'first_name', 'middle_name', 'last_name', 'phone');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
            ]
        );
        $query->when(function ($q) use ($start_date_at, $end_date_at) {
            if ($start_date_at && $end_date_at) {
                $q->whereBetween('return_date_at', [$start_date_at, $end_date_at]);
            }
        });

        return $query->latest()->get();
    }

    public function getAllActiveTeacherReturnBook($start_date_at, $end_date_at)
    {
        $query = BookReturn::query();
        $query->where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::TEACHER->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('staff_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'staff' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
            ]
        );
        $query->when(function ($q) use ($start_date_at, $end_date_at) {
            if ($start_date_at && $end_date_at) {
                $q->whereBetween('return_date_at', [$start_date_at, $end_date_at]);
            }
        });

        return $query->latest()->get();
    }

    public function getActiveAllBookIssueByAccNo($book_acc_no)
    {
        $query = BookReturn::query();
        $query->where(
            [
                'school_id' => getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
            ]
        )->whereNotNull('student_id');
        $query->with(
            [
                'bookAccNo' => function ($query) {
                    $query->select('id', 'acc_no');
                },
                'student' => function ($query) {
                    $query->select('id', 'classroom_id', 'first_name', 'middle_name', 'last_name', 'phone');
                },
                'student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'student.classroomRoll' => function ($query) {
                    $query->select('id', 'roll_no', 'student_id');
                },
                'bookItem' => function ($query) {
                    $query->select('id', 'book_title');
                },
            ]
        );

        $query->whereHas('bookAccNo', function ($q) use ($book_acc_no) {
            $q->where('acc_no', $book_acc_no);
        });
        return $query->latest()->get();
    }

    public function getByIdBookReturn($id)
    {
        return BookReturn::findOrFail($id);
    }

    public function deleteBookReturn($id)
    {
        return BookReturn::destroy($id);
    }

    public function createBookReturn(array $arrayData)
    {
        return BookReturn::create($arrayData);
    }

    public function updateBookReturn($id, array $arrayData)
    {
        return BookReturn::whereId($id)->update($arrayData);
    }

    // e-book
    public function getAllEBook()
    {
        return EBook::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllEBook()
    {
        return EBook::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->get();
    }

    public function getByIdEBook($id)
    {
        return EBook::findOrFail($id);
    }

    public function deleteEBook($id)
    {
        return EBook::destroy($id);
    }

    public function createEBook(array $arrayData)
    {
        return EBook::create($arrayData);
    }

    public function updateEBook($id, array $arrayData)
    {
        return EBook::whereId($id)->update($arrayData);
    }

    public function getIssuedBookListByStudentAndClassRoomId($student_id, $classroom_id, $school_id = null)
    {
        return BookIssue::with(['bookItem' => function ($query) {
            $query->select('id', 'book_title', 'author');
        }])
        ->where(
            [
                'school_id' => $school_id ?? getUserSchoolId(),
                'book_user_type' => BookTypeUser::STUDENT->value,
                'status' => Status::ACTIVE->value,
                'student_id' => $student_id,
                'classroom_id' => $classroom_id,
            ]
        )->get();
    }
}
