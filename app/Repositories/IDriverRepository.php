<?php

namespace App\Repositories;

interface IDriverRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveDriverAll();
    public function getActiveConductorAll();
    public function getActiveVehicleStaffsByIds(array $ids, $schoolId = null);
    public function getDriverById(int $id, int $schoolId = null);

    // DriverLogBook
    public function getAllDriverLogBook();
    public function getByDriverLogBookId($id);
    public function deleteDriverLogBook($id);
    public function createDriverLogBook(array $arrayData);
    public function updateDriverLogBook($id, array $arrayData);
    public function getActiveAllDriverLogBook();
    public function getDriverLogBookReport($vehicleId, $startDate, $endDate);
}
