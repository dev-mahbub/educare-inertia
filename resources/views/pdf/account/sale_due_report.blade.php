<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Sale Due Report</title>
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
    @if (!empty($saleDueReport['reports']))
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
                            <h6 style="font-size: 13px">{{ __('Student Sale Due Register') }}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            Tax Total Due Paid PaymentMode Transaction No. Invoice No. TakenBy
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Serial No.') }}</th>
                <th colspan="3" style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Admission No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Mobile') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Due') }}</th>
            </tr>

            @foreach ($saleDueReport['reports'] as $index => $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['sr_no'] ?? '') }}</td>
                <td colspan="3" style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['name'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['classroom_title'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['phone'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['due_amount'] ?? 0) }}</td>
            </tr>
            @endforeach

            <tr>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td colspan="3" style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('Total') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($saleDueReport['total_due_amount'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>