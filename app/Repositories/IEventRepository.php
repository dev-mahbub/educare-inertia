<?php

namespace App\Repositories;

interface IEventRepository
{
    public function getAll();

    public function getById($id);

    public function delete($id);

    public function create(array $arrayData);

    public function update($id, array $arrayData);

    public function getActiveAll();

    public function getFilteredEvents(string $eventStatus = "", string $eventType = "", string $startDate = "", string $endDate = "", int $academicYearId = null);

    public function getRegisterAll();

    public function getPublishedEvents(string $startDate = "", string $endDate = "", int $schoolId = null);

    public function getEventById(int $id);

    public function getEventActivityById(int $id, int $eventId = null);

    public function createEventActivity(array $arrayData);

    public function updateEventActivity(int $id, array $arrayData);
}
