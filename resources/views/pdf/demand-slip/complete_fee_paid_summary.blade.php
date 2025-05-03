<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Complete Paid Report </title>
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
                            <h5>{{ __("Class: ". $classroomTitle) }}</h5>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('AdmNum') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Parent') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('MobileNo') }}</th>

                @if (!empty($completeFeePaidReport['installment_wise_amounts']))
                @foreach ($completeFeePaidReport['installment_wise_amounts'] as $installment)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __($installment['title'] ?? "") }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total Paid Amount') }}</th>
            </tr>
            @if (!empty($completeFeePaidReport['reports']))
            @foreach ($completeFeePaidReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['student_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['parent_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['classroom_title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['phone'] ?? "") }}</td>

                @if (!empty($completeFeePaidReport['installment_wise_amounts']))
                @foreach ($completeFeePaidReport['installment_wise_amounts'] as $installmentId => $installment)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['installment_wise_amounts'][$installmentId] ?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_paid_amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>

                @if (!empty($completeFeePaidReport['installment_wise_amounts']))
                @foreach ($completeFeePaidReport['installment_wise_amounts'] as $installment)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($installment['amount']?? 0) }}
                </td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($completeFeePaidReport['total_paid_amount'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>