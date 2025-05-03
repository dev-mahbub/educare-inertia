<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\BookAccNo;
use App\Models\BookPurchase;
use App\Models\BookItem;

class BookPurchaseRepository implements IRepository, IBookPurchaseRepository
{
    public function getAll()
    {
        return BookPurchase::where('school_id', getUserSchoolId())->get();
    }

    public function getById($id)
    {
        return BookPurchase::findOrFail($id);
    }

    public function delete($id)
    {
        return BookPurchase::destroy($id);
    }

    public function create(array $arrayData)
    {
        return BookPurchase::create($arrayData);
    }

    public function updateOrCreate(array $checkedArrayData, array $arrayData)
    {
        return BookPurchase::updateOrCreate($checkedArrayData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return BookPurchase::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return BookPurchase::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->get();
    }

    public function getActiveAllBookPurchaseHistory($startDate, $endDate, $libraryVendorId)
    {

        $query = BookPurchase::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->with(
                [
                    'vendor' => function ($sq) {
                        $sq->select('id', 'vendor_name');
                    },
                    'purchaseBooks'
                ]
            );

        $query->when(function ($q) use ($startDate, $endDate, $libraryVendorId) {
            if ($startDate && $endDate) {
                $q->whereBetween('purchase_date_at', [$startDate, $endDate]);
            }
            if (!empty($libraryVendorId)) {
                $q->where('library_vendor_id', '=', $libraryVendorId);
            }
        });

        return $query->get();
    }

    // book item
    public function getAllBookItem()
    {
        return BookItem::where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getByIdBookItem($id)
    {
        return BookItem::findOrFail($id);
    }

    public function deleteBookItem($id)
    {
        return BookItem::destroy($id);
    }

    public function createBookItem(array $arrayData)
    {
        return BookItem::create($arrayData);
    }

    public function updateOrCreateBookItem(array $checkedArrayData, array $arrayData)
    {
        return BookItem::updateOrCreate($checkedArrayData, $arrayData);
    }

    public function updateBookItem($id, array $arrayData)
    {
        return BookItem::whereId($id)->update($arrayData);
    }

    public function getActiveAllBookItem()
    {
        return BookItem::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->latest()
            ->get();
    }

    public function getActiveAllMasterBookList($title, $author, $publisherName, $classNameId, $categoryId)
    {
        $query = BookItem::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->with(
                [
                    'className' => function ($field) {
                        $field->select('id', 'title');
                    },
                    'category' => function ($field) {
                        $field->select('id', 'title');
                    },
                    'bookAccNos',
                ]
            );
        $query->when(function ($q) use ($title, $author, $publisherName, $classNameId, $categoryId) {
            if (!empty($title)) {
                $q->where('book_title', 'like', '%' . $title . '%');
            }
            if (!empty($author)) {
                $q->where('author', 'like', '%' . $author . '%');
                $q->orWhere('author_two', 'like', '%' . $author . '%');
                $q->orWhere('author_three', 'like', '%' . $author . '%');
            }
            if (!empty($publisherName)) {
                $q->where('publisher_name', 'like', '%' . $publisherName . '%');
            }
            if (!empty($classNameId)) {
                $q->where('class_name_id', '=', $classNameId);
            }
            if (!empty($categoryId)) {
                $q->where('category_id', '=', $categoryId);
            }
        });

        return $query->latest()->get();
    }

    public function getSearchBookListForIssue($acc_no, $book_title, $author, $publisher_name,  $class_name_id, $subject_id)
    {
        $query = BookItem::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->withCount(['activeBookAccNos', 'issuedBookAccNos']);
        $query->when(function ($q) use ($acc_no, $book_title, $author, $publisher_name,  $class_name_id, $subject_id) {
            $q->whereHas('activeBookAccNos', function ($sq) use ($acc_no) {
                if (!empty($acc_no)) {
                    $sq->where('acc_no', $acc_no);
                }
            });
            if (!empty($book_title)) {
                $q->where('book_title', 'like', '%' . $book_title . '%');
            }
            if (!empty($author)) {
                $q->where('author', 'like', '%' . $author . '%');
                $q->orWhere('author_two', 'like', '%' . $author . '%');
                $q->orWhere('author_three', 'like', '%' . $author . '%');
            }
            if (!empty($publisher_name)) {
                $q->where('publisher_name', 'like', '%' . $publisher_name . '%');
            }
            if (!empty($class_name_id)) {
                $q->where('class_name_id', '=', $class_name_id);
            }
            if (!empty($subject_id)) {
                $q->where('subject_id', '=', $subject_id);
            }
        });

        return $query->latest()->get();
    }

    // book item acc no
    public function getAllBookAccNo()
    {
        return BookAccNo::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getByIdBookAccNo($id)
    {
        return BookAccNo::findOrFail($id);
    }

    // public function getActionBookAccNoBookItemId($id)
    // {
    //     return BookAccNo::where('school_id', getUserSchoolId())
    //         ->where('status', Status::ACTIVE->value)
    //         ->where('book_item_id', $)
    //         ->get();
    // }

    public function deleteBookAccNo($id)
    {
        return BookAccNo::destroy($id);
    }

    public function createBookAccNo(array $arrayData)
    {
        return BookAccNo::create($arrayData);
    }

    public function updateOrCreateBookAccNo(array $checkedArrayData, array $arrayData)
    {
        return BookAccNo::updateOrCreate($checkedArrayData, $arrayData);
    }

    public function updateBookAccNo($id, array $arrayData)
    {
        return BookAccNo::whereId($id)->update($arrayData);
    }

    public function getActiveAllBookAccNo()
    {
        return BookAccNo::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->get();
    }

    public function getTotalBookList($acc_no, $book_title, $author, $publisher_name, $class_name_id, $category_id, $type_id, $book_type_status, $status, $start_date_at, $end_date_at)
    {
        $query = BookAccNo::query();
        $query->where('school_id', getUserSchoolId())
            ->with(['bookItem.className', 'bookItem.category']);
        $query->when(function ($q) use ($acc_no, $book_title, $author, $publisher_name, $class_name_id, $category_id, $type_id, $book_type_status, $status, $start_date_at, $end_date_at) {
            if (!empty($acc_no)) {
                $q->where('acc_no', 'like', '%' . $acc_no . '%');
            }
            if (!empty($book_type_status)) {
                $q->where('book_type_status', '=', $book_type_status);
            }
            if (!empty($status)) {
                $q->where('status', '=', $status);
            }
            $q->whereHas('bookItem', function ($sq) use ($book_title, $author, $publisher_name, $class_name_id, $category_id, $type_id, $start_date_at, $end_date_at) {
                if (!empty($book_title)) {
                    $sq->where('book_title', 'like', '%' . $book_title . '%');
                }
                if (!empty($author)) {
                    $sq->where('author', 'like', '%' . $author . '%');
                    $sq->orWhere('author_two', 'like', '%' . $author . '%');
                    $sq->orWhere('author_three', 'like', '%' . $author . '%');
                }
                if (!empty($publisher_name)) {
                    $sq->where('publisher_name', 'like', '%' . $publisher_name . '%');
                }
                if (!empty($class_name_id)) {
                    $sq->where('class_name_id', '=', $class_name_id);
                }
                if (!empty($category_id)) {
                    $sq->where('category_id', '=', $category_id);
                }
                if (!empty($type_id)) {
                    $sq->where('type_id', '=', $type_id);
                }
                if ($start_date_at && $end_date_at) {
                    $sq->whereBetween('purchasing_date_at', [$start_date_at, $end_date_at]);
                }
            });
        });

        return $query->latest()->get();
    }

    public function getInActiveBookList($acc_no, $start_date_at, $end_date_at)
    {
        $query = BookAccNo::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::INACTIVE->value)
            ->with(
                [
                    'bookItem:id,user_id,category_id,book_title,author',
                    'bookItem.category:id,title',
                    'bookItem.user:id,username'
                ]
            );
        $query->when(function ($q) use ($acc_no, $start_date_at, $end_date_at) {
            if (!empty($acc_no)) {
                $q->where('acc_no', 'like', '%' . $acc_no . '%');
            }
            if ($start_date_at && $end_date_at) {
                $q->whereBetween('damage_lost_date_at', [$start_date_at, $end_date_at]);
            }
        });

        $query->select('id', 'acc_no', 'book_item_id', 'damage_lost_date_at', 'reason');

        return $query->latest()->get();
    }

    public function getBookDataForReturnByAccNo($acc_no)
    {
        return BookAccNo::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->where('is_available', 0)
            ->where('acc_no', $acc_no)
            ->with(
                [
                    'bookItem' => function ($query) {
                        $query->select('id', 'book_title', 'author', 'publisher_name', 'description');
                    },
                    'bookIssue' => function ($query) {
                        $query->select('id', 'issued_date_at', 'due_date_at', 'student_id', 'book_user_type', 'staff_id');
                    },
                    'bookIssue.student' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                    },
                    'bookIssue.student.classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'bookIssue.student.classroomRoll' => function ($query) {
                        $query->select('id', 'roll_no', 'student_id');
                    },
                    'bookIssue.staff' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name');
                    }
                ]
            )
            ->first();
    }
}
