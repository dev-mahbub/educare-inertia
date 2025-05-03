<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use App\Repositories\EarningTypeRepository;
use App\Repositories\StaffEarningRepository;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Repositories\DeductionTypeRepository;

class StaffEarningImport implements ToCollection
{
    protected $validationErrors = [];
    protected $earningTypeRepository;
    protected $deductionTypeRepository;
    protected $staffEarningRepository;

    public function __construct()
    {
        $this->earningTypeRepository = new EarningTypeRepository;
        $this->deductionTypeRepository = new DeductionTypeRepository;
        $this->staffEarningRepository = new StaffEarningRepository;
    }

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        // filter empty rows
        $rows = $rows->filter(function ($row) {
            return !empty(array_filter($row->toArray()));
        });

        if ($rows->count() > 0) {
            // get headers (first two rows)
            $headers = $rows->take(2)->toArray();

            // get column ranges and mappings
            $ranges = $this->getColumnRanges($headers);

            // Basic Earning type
            $basicEarningType = $this->earningTypeRepository->getDefaultEarningTypeByTitle('Basic');

            // earning types
            $earningTypes = $this->earningTypeRepository->getActiveAll()?->filter(function ($earningType) use ($basicEarningType) {
                return $basicEarningType?->id != $earningType->id;
            })?->keyBy('title')?->toArray();

            // deductions types
            $deductionTypes = $this->deductionTypeRepository->getActiveAll()?->keyBy('title')?->toArray();

            // process data rows (skip first three header rows)
            foreach ($rows->slice(3) as $row) {
                if (empty($row[1]) || empty($row[2]) || empty($row[3])) {
                    continue;
                }

                $staffId = $row[1];

                // staff earning
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffId);

                if ($staffEarning == null) {
                    continue;
                }

                $basicPay = $staffEarning->basic_pay ?? 0;
                $gradePay = $staffEarning->grade_pay ?? 0;

                // earnings
                $earnings = [];

                // old earnings
                $oldEarnings = !empty($staffEarning->earnings) ? json_decode($staffEarning->earnings, true) : [];

                // basic earning
                $basicEarning = array_filter($oldEarnings, function ($earning) use ($basicEarningType) {
                    return $basicEarningType?->id == $earning['earning_type_id'];
                })[0];

                if (empty($basicEarning)) {
                    $basicEarning = [
                        'expression' => null,
                        'amount' => $basicPay + $gradePay,
                        'description' => null,
                        'earning_type_id' => $basicEarningType?->id
                    ];
                }

                $earnings[] = $basicEarning;
                $totalEarning = $basicEarning['amount'];

                foreach ($ranges['earnings']['columns'] as $earning) {
                    $amount = !empty($row[$earning['amount_index']]) ? (int) $row[$earning['amount_index']] : 0;
                    $earningTypeId = $earningTypes[$earning['name']]['id'] ?? null;

                    if ($amount <= 0 && !empty($row[$earning['expression_index']])) {
                        $amount = $this->evaluateExpression($row[$earning['expression_index']], $basicPay + $gradePay);
                    }

                    if ($earningTypeId != null && $earning['name'] != 'Basic' && $amount > 0) {
                        $earnings[] = [
                            'expression' => $row[$earning['expression_index']] ?? null,
                            'amount' => $amount,
                            'description' => null,
                            'earning_type_id' => $earningTypeId
                        ];

                        $totalEarning += $amount;
                    }
                }

                // deductions
                $deductions = [];
                $totalDeduction = 0;

                foreach ($ranges['deductions']['columns'] as $deduction) {
                    $amount = $row[$deduction['amount_index']] ?? 0;
                    $deductionTypeId = $deductionTypes[$deduction['name']]['id'] ?? null;

                    if ($amount <= 0 && !empty($row[$deduction['expression_index']])) {
                        $amount = $this->evaluateExpression($row[$deduction['expression_index']], $basicPay + $gradePay);
                    }

                    if ($deductionTypeId != null && $amount > 0) {
                        $deductions[] = [
                            'expression' => $row[$deduction['expression_index']] ?? null,
                            'amount' => $amount,
                            'description' => null,
                            'deduction_type_id' => $deductionTypeId
                        ];

                        $totalDeduction += $amount;
                    }
                }

                // update staff earnings
                $dataArray = [
                    'net_salary' => $totalEarning - $totalDeduction,
                    'earnings' => !empty($earnings) ? json_encode($earnings) : null,
                    'deductions' => !empty($deductions) ? json_encode($deductions) : null,
                ];

                $this->staffEarningRepository->updateByStaffId($staffId, $dataArray);
            }
        } else {
            $this->validationErrors['import_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }

    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }

    protected function getColumnRanges($headers)
    {
        $ranges = [
            'earnings' => ['start' => null, 'end' => null, 'columns' => []],
            'deductions' => ['start' => null, 'end' => null, 'columns' => []]
        ];

        // earnings
        $earningsStart = null;
        $earningsEnd = null;

        for ($i = 0; $i < count($headers[0]); $i++) {
            if (stripos($headers[0][$i], 'Earnings') !== false) {
                $earningsStart = $i;
            } elseif ($earningsStart && stripos($headers[0][$i], 'Deductions') !== false) {
                $earningsEnd = $i - 1;
                break;
            }
        }

        if ($earningsStart !== null) {
            $ranges['earnings']['start'] = $earningsStart;
            $ranges['earnings']['end'] = $earningsEnd ?? count($headers[0]) - 1;

            // earnings column names
            for ($i = $earningsStart; $i <= $ranges['earnings']['end']; $i += 2) {
                if (!empty($headers[1][$i])) {
                    $ranges['earnings']['columns'][] = [
                        'name' => trim($headers[1][$i]),
                        'expression_index' => $i,
                        'amount_index' => $i + 1
                    ];
                }
            }
        }

        // deductions
        $deductionsStart = null;

        for ($i = 0; $i < count($headers[0]); $i++) {
            if (stripos($headers[0][$i], 'Deductions') !== false) {
                $deductionsStart = $i;
                break;
            }
        }

        if ($deductionsStart !== null) {
            $ranges['deductions']['start'] = $deductionsStart;
            $ranges['deductions']['end'] = count($headers[0]) - 1;

            // deductions column names
            for ($i = $deductionsStart; $i <= $ranges['deductions']['end']; $i += 2) {
                if (!empty($headers[1][$i])) {
                    $ranges['deductions']['columns'][] = [
                        'name' => trim($headers[1][$i]),
                        'expression_index' => $i,
                        'amount_index' => $i + 1
                    ];
                }
            }
        }

        return $ranges;
    }

    protected function evaluateExpression(string $expression, $basicPay)
    {
        $amount = 0;

        $expression = preg_replace_callback('/\b[a-zA-Z_][a-zA-Z0-9_]*\b/', function ($matches) use ($basicPay) {
            return $matches[0] === 'basic' ? $basicPay : 0;
        }, $expression);

        if (!preg_match('/[^0-9+\-\*\/(). ]/', $expression)) {
            eval('$amount = ' . $expression . ';');
        }

        return $amount;
    }
}
