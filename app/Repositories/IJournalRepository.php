<?php

namespace App\Repositories;

interface IJournalRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getNextVoucherNo(int $schoolId =  null);
    public function getActiveFilteredJournals(string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null);
    public function getJournalById(int $id, int $schoolId = null, int $academicYearId = null);

    // journal ledger
    public function createJournalLedger(array $arrayData);
}
