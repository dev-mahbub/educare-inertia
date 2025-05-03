<?php

namespace App\Repositories;

interface ITransportRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getActiveTransportAll();
    public function getMisReportCounts();

    // area
    public function getAllAreas();
    public function getAreaById($id);
    public function deleteArea($id);
    public function createArea(array $arrayData);
    public function updateArea($id, array $arrayData);
    public function getActiveAllAreas();
    public function getRegisterAllAreas();
    public function getActiveAreaNameAndId();
    public function getLastItem();

    // Transport Routes
    public function getAllRoute();
    public function getRouteById($id);
    public function deleteRoute($id);
    public function createRoute(array $arrayData);
    public function updateRoute($id, array $arrayData);
    public function getActiveAllRoute();
    public function getRegisterAllRoute();
    public function getActiveRouteNameAndId();
    public function getActiveAllTransportAndRoute();
    public function getSeatCount();

    //Transport fee setting
    public function getAllFeeSetting();
    public function getFeeSettingById($id);
    public function deleteFeeSetting($id);
    public function createFeeSetting(array $arrayData);
    public function updateFeeSetting($id, array $arrayData);
    public function getActiveAllFeeSetting();
    public function getRegisterAllFeeSetting();
    public function getAllRouteSummary();

    // AllocateTransport
    public function getAllAllocateTransport();
    public function getAllAllocateStudentDetails();
    public function getAllocateTransportById($id);
    public function deleteAllocateTransport($id);
    public function createAllocateTransport(array $arrayData);
    public function updateAllocateTransport($id, array $arrayData);
    public function getActiveAllAllocateTransport();
    public function getAllocateTransportFromStudent($stdId);
    public function getRegisterAllAllocateTransport();
    public function getStudentPaymentReport();
    public function getActiveAllArea();
    public function getAllAllocateTransportStudentIds($classroomId = null);
    public function getAllCurrentAllocateTransport($classroomId);
    public function getAllPreviousAllocateTransport($classroomId);
    public function getAllAllocateTransportCount();
    public function getAllocateTransportByStudentId($sId);
    public function getAllocateTransportByTeacherId($tId);
    public function getCurrentAllocateTransportByTeacherId($tId);
    public function getCurrentAllocateTransportByStudentId($sId, int $schoolId = null, int $academicYearId = null);
    public function getRoutesAllFromSession($schoolId = null, $academicYearId = null);
    public function getStaffCurrentAllocateTransportByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function getStaffAllPreviousAllocateTransports(int $staffId = null, int $schoolId = null,  int $academicYearId = null);
    public function getStudentCurrentAllocateTransportByStudentId(int $studentId, int $schoolId = null, int $academicYearId = null);
    public function getStudentAllPreviousAllocateTransports(int $studentId = null, int $schoolId = null, int $academicYearId = null);
    public function getActiveRoutesWithAllocation(int $schoolId = null, int $academicYearId = null);
    public function getTransportRouteById(int $id, int $schoolId = null);
    public function getActiveStoppagesWithAllocation(int $schoolId = null, int $academicYearId = null);
    public function getTransportStoppageById(int $id, int $schoolId = null);

    // DeallocateTransport
    public function getAllDeallocateTransport();
    public function getByDeallocateTransportId($id);
    public function deleteDeallocateTransport($id);
    public function createDeallocateTransport(array $arrayData);
    public function getReportAllocateTransportFromClassroom();
    public function getReportAllocateTransportFromArea();
}
