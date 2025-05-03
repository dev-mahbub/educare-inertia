<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Installment Wise Fee Collection</title>
</head>

<body>
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h3>{{ __(($schoolData['title'] ?? "")." (".($schoolData['academic_year'] ?? "").")") }}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Installment wise fee collection</h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Installment') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Total Collection') }}
                </th>
            </tr>
            @if (!empty($installmentWiseFeeCollectionSummary['reports']))
            @foreach ($installmentWiseFeeCollectionSummary['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #EEEEEE; color: #030105">
                    {{ __('Total') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #EEEEEE; color: #030105">
                    {{ __($installmentWiseFeeCollectionSummary['amount'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>