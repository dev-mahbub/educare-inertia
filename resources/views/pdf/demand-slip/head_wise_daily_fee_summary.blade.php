<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Head WiseSummary Report </title>
</head>

<body>
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h5>{{ __(($schoolData['title'] ?? "")." (".($schoolData['academic_year'] ?? "").")") }}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Head Wise Daily Collection</h5>
                            <h5>{{ __($reportDateTitle) }}</h5>
                            <h5>{{ __("Payment mode - ". $paymentMode) }}</h5>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Date.') }}</th>

                @if (!empty($headWiseDailySummaryReport['head_wise_amounts']))
                @foreach (array_keys($headWiseDailySummaryReport['head_wise_amounts']) as $headTitle)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __($headTitle) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Concession') }}</th>
            </tr>
            @if (!empty($headWiseDailySummaryReport['reports']))
            @foreach ($headWiseDailySummaryReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['date'] ?? "") }}</td>

                @if (!empty($headWiseDailySummaryReport['head_wise_amounts']))
                @foreach (array_keys($headWiseDailySummaryReport['head_wise_amounts']) as $headTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['head_wise_amounts'][$headTitle] ?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['concession'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>

                @if (!empty($headWiseDailySummaryReport['head_wise_amounts']))
                @foreach (array_keys($headWiseDailySummaryReport['head_wise_amounts']) as $headTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($headWiseDailySummaryReport['head_wise_amounts'][$headTitle] ?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($headWiseDailySummaryReport['total'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($headWiseDailySummaryReport['concession'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 15px">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>{{ __("Date : ". $reportDate) }}</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align:center">
                    <span><small>Prepared by</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align:right">
                    <span><small>Checked by</small></span>
                </td>
            </tr>
        </tfoot>
    </table>
</body>

</html>