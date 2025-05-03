<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Journal;
use App\Models\JournalLedger;

class JournalRepository implements IRepository, IJournalRepository
{
    public function getAll()
    {
        return Journal::where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Journal::findOrFail($id);
    }

    public function delete($id)
    {
        return Journal::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Journal::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Journal::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Journal::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getNextVoucherNo(int $schoolId =  null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $journal = Journal::where('school_id', $schoolId)
            ->orderBy('id', 'desc')
            ->select(
                'voucher_no'
            )
            ->first();

        return ($journal?->voucher_no ?? 0) + 1;
    }

    public function getActiveFilteredJournals(string $startDate = '', string $endDate = '', int $schoolId =  null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Journal::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('journal_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('journal_date', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'type_id',
                'journal_date',
                'voucher_no',
                'debit_amount',
                'credit_amount',
                'total_amount',
                'description'
            )
            ->with([
                'journalLedgers' => function ($query) {
                    $query->select(
                        'id',
                        'journal_id',
                        'ledger_id',
                        'debit_amount',
                        'credit_amount',
                        'mode'
                    )->with(['ledger:id,title']);
                },
                'type:id,title'
            ])
            ->get();
    }

    public function getJournalById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Journal::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'type_id',
                'journal_date',
                'voucher_no',
                'debit_amount',
                'credit_amount',
                'total_amount',
                'description'
            )
            ->first();
    }

    // journal ledger
    public function createJournalLedger(array $arrayData)
    {
        return JournalLedger::create($arrayData);
    }
}
