<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Journal Report </title>
    <style>
        .table-container {
            width: 30%;
            float: left;
            vertical-align: middle;
        }

        .table-container table {
            width: 100%;
            font-family: 'Inter', sans-serif;
            border-collapse: separate;
            /* Separate border model */
            border-spacing: 1px;
            /* Row and column gap */
        }

        .table-container th {
            margin: 0;
            vertical-align: middle;
            text-align: center;
            padding: 5px;
            background: #EEEEEE;
        }

        .table-container td {
            border-bottom: 1px solid #EEEEEE;
        }

        .table-container td:last-child {
            border-bottom: none;
            /* Remove border from last td in each row */
        }

        .table-container .highlight {
            color: #030105;
            background: #EEEEEE;
        }
    </style>
</head>

<body>
    @if (!empty($journalReport))
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h6 style="font-size: 14px">
                                @if(!empty($schoolData))
                                {{ __("{$schoolData['title']} ({$schoolData['academic_year']})") }}
                                @endif
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6 style="font-size: 13px">{{__("Journal Report")}}</h6>
                            <h6 style="font-size: 13px">{{ __(!empty($reportDateTitle) ? $reportDateTitle : '') }}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sr No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Particulars') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Transaction Date') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Voucher Type') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Voucher No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total') }}</th>
            </tr>
            @if (!empty($journalReport['reports']))
            @foreach ($journalReport['reports'] as $index => $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($index + 1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['ledger_titles'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['journal_date'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['type'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['voucher_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_amount'] ?? 0) }}</td>
            </tr>

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ 'Particulars' }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ 'Debit' }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ 'Credit' }}</td>
            </tr>

            @if (!empty($report['journal_ledgers']))
            @foreach ($report['journal_ledgers'] as $journalLedger)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ $journalLedger['ledger_title'] ?? '' }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ $journalLedger['debit_amount'] ?? '' }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ $journalLedger['credit_amount'] ?? '' }}</td>
            </tr>
            @endforeach
            @endif

            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($journalReport['total_amount'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>