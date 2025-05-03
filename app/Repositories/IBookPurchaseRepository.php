<?php

namespace App\Repositories;

interface IBookPurchaseRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $checkedArrayData, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getSearchBookListForIssue($acc_no, $book_title, $author, $publisher_name,  $class_name_id, $subject_id);
    public function getActiveAllBookPurchaseHistory($startDate, $endDate, $libraryVendorId);

    // book item
    public function getAllBookItem();
    public function getByIdBookItem($id);
    public function deleteBookItem($id);
    public function createBookItem(array $arrayData);
    public function updateOrCreateBookItem(array $checkedArrayData, array $arrayData);
    public function updateBookItem($id, array $arrayData);
    public function getActiveAllBookItem();

    // book item acc no
    public function getAllBookAccNo();
    public function getByIdBookAccNo($id);
    public function deleteBookAccNo($id);
    public function createBookAccNo(array $arrayData);
    public function updateOrCreateBookAccNo(array $checkedArrayData, array $arrayData);
    public function updateBookAccNo($id, array $arrayData);
    public function getActiveAllBookAccNo();
    public function getTotalBookList($acc_no, $book_title, $author, $publisher_name, $class_name_id, $category_id, $type_id, $book_type_status, $status, $start_date_at, $end_date_at);
    public function getInActiveBookList($acc_no, $start_date_at, $end_date_at);
    public function getBookDataForReturnByAccNo($acc_no);
}
