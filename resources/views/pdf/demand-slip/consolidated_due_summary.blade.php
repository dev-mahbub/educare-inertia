<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Consolidated Due Summary</title>
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
                            <h4>{{ __("Fee Consolideted Due Report") }}</h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Expected Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Paid Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Due Amount') }}</th>
            </tr>

            @if (!empty($consolidatedDueReport['reports']))
            @foreach ($consolidatedDueReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['class_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payable_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['paid_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['due_amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($consolidatedDueReport['payable_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($consolidatedDueReport['paid_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($consolidatedDueReport['due_amount'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>