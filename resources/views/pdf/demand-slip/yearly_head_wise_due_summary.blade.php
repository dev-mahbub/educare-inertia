<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Yearly Head Wise Due Summary</title>
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
                            <h5>{{ __("Yearly Fee Dues") }}</h5>
                            <h5>{{ __("Payment Mode - All") }}</h5>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Title') }}</th>

                @if (!empty($yearlyHeadWiseDueReport['installment_wise_amounts']))
                @foreach (array_keys($yearlyHeadWiseDueReport['installment_wise_amounts']) as $installmentTitle)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __($installmentTitle) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total') }}</th>
            </tr>
            @if (!empty($yearlyHeadWiseDueReport['reports']))
            @foreach ($yearlyHeadWiseDueReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['fee_type_title'] ?? "") }}</td>

                @if (!empty($yearlyHeadWiseDueReport['installment_wise_amounts']))
                @foreach (array_keys($yearlyHeadWiseDueReport['installment_wise_amounts']) as $installmentTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['installment_wise_amounts'][$installmentTitle] ?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>

                @if (!empty($yearlyHeadWiseDueReport['installment_wise_amounts']))
                @foreach (array_keys($yearlyHeadWiseDueReport['installment_wise_amounts']) as $installmentTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($yearlyHeadWiseDueReport['installment_wise_amounts'][$installmentTitle] ?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($yearlyHeadWiseDueReport['total_amount'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 15px">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>{{ __("Date : {$reportDate}") }}</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>Prepared by</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>Checked by</small></span>
                </td>
            </tr>
        </tfoot>
    </table>
</body>

</html>