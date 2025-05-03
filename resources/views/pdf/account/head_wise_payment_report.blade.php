<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Head Wise Payment Report </title>
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
    @if (!empty($headWisePaymentReport))
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
                            <h6 style="font-size: 13px">{{__("Head Wise Payment Report")}}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Date') }}</th>

                @if (count($ledgerTitles) > 0)
                @foreach ($ledgerTitles as $ledgerTitle)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __($ledgerTitle) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total') }}</th>
            </tr>

            @foreach ($headWisePaymentReport as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_date'] ?? '') }}</td>

                @if (count($ledgerTitles) > 0)
                @foreach (array_keys($ledgerTitles) as $key)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['head_wise_data'][$key] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total'] ?? 0) }}</td>
            </tr>
            @endforeach

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('Total') }}</td>

                @if (count($ledgerTitles) > 0)
                @foreach (array_keys($ledgerTitles) as $key)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($headWiseSummary[$key] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($headWiseSummary['total'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>
