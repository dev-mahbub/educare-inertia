<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Complete Outstanding Due Summary</title>
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
                            <h5>{{ __($reportTitle) }}</h5>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Roll No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Adm.No') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Parent') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Mobile No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total Due Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Date of deposit') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Received amount') }}</th>
            </tr>

            @if (!empty($completeOutstandingDueReport['reports']))
            @foreach ($completeOutstandingDueReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['roll_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['father_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['sms_phone'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['classroom_title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_due_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __("") }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($completeOutstandingDueReport['total_due_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC;  color: #030105">{{ __("") }}</td>
            </tr>
        </tbody>
    </table>
</body>

</html>