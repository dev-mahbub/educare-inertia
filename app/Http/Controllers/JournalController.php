<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use App\Http\Requests\CancelJournalRequest;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\JournalRequest;
use App\Repositories\ITypeRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use App\Repositories\IJournalRepository;

class JournalController extends Controller
{
    public function __construct(
        private IJournalRepository $journalRepository,
        private ILedgerRepository $ledgerRepository,
        private ITypeRepository $typeRepository,
    ) {}

    /**
     * Create Journal
     *
     */
    public function create(Request $request): Response
    {
        // ledgers
        $ledgers = $this->ledgerRepository->getActiveNameAndId();

        // mode options
        $modeOptions = [
            ['id' => 'By', 'title' => 'By'],
            ['id' => 'To', 'title' => 'To']
        ];

        // next voucher no
        $nextVoucherNo = $this->journalRepository->getNextVoucherNo();

        return Inertia::render('Inventory/Journal', [
            'ledgers' => $ledgers,
            'modeOptions' => $modeOptions,
            'nextVoucherNo' => $nextVoucherNo
        ]);
    }


    /**
     * Save Journal
     *
     */
    public function save(JournalRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // journal type
            $type = $this->typeRepository->getTypeByTitle('Journal');

            // next voucher no
            $nextVoucherNo = $this->journalRepository->getNextVoucherNo();

            // create journal
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'type_id' => $type?->id,
                'journal_date' => !empty($request->journal_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->journal_date)->timezone(getSchoolTimeZone())->toDateString() : "",
                'voucher_no' => $nextVoucherNo,
                'debit_amount' => $input['debit_amount'] ?? null,
                'credit_amount' => $input['credit_amount'] ?? null,
                'total_amount' => $input['total_amount'] ?? 0,
                'description' => $input['description'] ?? '',
                'status' => Status::ACTIVE
            ];

            $journal = $this->journalRepository->create($dataArray);

            // create journal ledger
            foreach ($input['journal_entries'] as $journalEntry) {
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'journal_id' => $journal->id,
                    'ledger_id' => $journalEntry['ledger_id'] ?? null,
                    'mode' => $journalEntry['mode'] ?? '',
                    'debit_amount' => $journalEntry['debit_amount'] ?? null,
                    'credit_amount' => $journalEntry['credit_amount'] ?? null,
                    'status' => Status::ACTIVE
                ];

                $this->journalRepository->createJournalLedger($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Journal created successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Journal Report
     *
     */
    public function journalReport(Request $request): Response
    {
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        }

        // journals
        $journals = $this->journalRepository->getActiveFilteredJournals($startDate, $endDate);

        if (count($journals) > 0) {
            $journals = $journals->map(function ($journal) {
                $ledgerTtiles = [];
                $journalLedgers = [];

                if ($journal?->journalLedgers?->count() > 0) {
                    foreach ($journal?->journalLedgers as $journalLedger) {
                        $ledgerTitle = $journalLedger?->ledger?->title ?? '';
                        $ledgerTtiles[] = $ledgerTitle;

                        $journalLedgers[] = [
                            'ledger_title' => $ledgerTitle,
                            'debit_amount' => $journalLedger?->debit_amount,
                            'credit_amount' => $journalLedger?->credit_amount
                        ];
                    }
                }

                return [
                    'id' => $journal->id,
                    'ledger_titles' => implode(',', $ledgerTtiles),
                    'journal_date' => !empty($journal->journal_date) ? Carbon::parse($journal->journal_date)->format('d-M-Y') : '',
                    'type' => $journal?->type?->title,
                    'voucher_no' => $journal->voucher_no,
                    'total_amount' => $journal->total_amount ?? 0,
                    'journal_ledgers' => $journalLedgers
                ];
            })->all();
        }

        return Inertia::render('Inventory/JournalReport', [
            'journals' => $journals
        ]);
    }

    /**
     * Cancel Journal
     *
     */
    public function cancelJournal(CancelJournalRequest $request, int $id): RedirectResponse
    {
        $journal = $this->journalRepository->getJournalById($id);

        abort_if(empty($journal), 404);

        $input = $request->validated();

        $dataArray = [
            'is_canceled' => true,
            'cancel_reason' => $input['cancel_reason'] ?? ''
        ];

        $cancelJournal = $this->journalRepository->update($id, $dataArray);

        if (!$cancelJournal) {
            return redirect()->back()->with('error', 'Somehting goes wrong!');
        }

        return redirect()->back()->with('message', 'Journal canceled successfully!');
    }
}
