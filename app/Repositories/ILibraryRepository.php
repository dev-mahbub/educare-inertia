<?php

namespace App\Repositories;

interface ILibraryRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function saveData($arrayData);
    public function getActiveLibraries();
    public function findDataForShelf($id);
    public function updateDataForShelf($id, $arrayData);

    // LibraryVendor
    public function getAllLibraryVendor();
    public function getByIdLibraryVendor($id);
    public function deleteLibraryVendor($id);
    public function createLibraryVendor(array $arrayData);
    public function updateOrCreateLibraryVendor(array $checkData, array $arrayData);
    public function updateLibraryVendor($id, array $arrayData);
    public function getActiveAllLibraryVendor();
    public function getActiveAllLibraryVendorName();
}
