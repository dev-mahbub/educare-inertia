<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Fee Summary</title>
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
                            <h5>{{ __($reportTitle) }}</h5>
                            <h5>{{ __("(Total - ". ($installmentWiseFeeCollectionReport['total_report'] ?? "").")") }}</h5>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sr No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total Collection: '. ($installmentWiseFeeCollectionReport['total_amount'] ?? 0)) }}</th>
            </tr>
            @if (!empty($installmentWiseFeeCollectionReport['reports']))

            @php
            $count = 0;
            @endphp

            @foreach ($installmentWiseFeeCollectionReport['reports'] as $report)
            @php
            $count++;
            @endphp
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($count) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['fee_title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif
        </tbody>
    </table>
</body>

</html>