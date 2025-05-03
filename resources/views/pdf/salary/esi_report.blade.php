<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>ESI Report</title>
</head>

<body>
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h3>{{ __(($schoolData['title'] ?? "").' ('.($schoolData['academic_year'] ?? '').')') }}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>
                                @if (!empty($paymentMonth->title))
                                {{ __('ESI statement for the month of '.$paymentMonth->title) }}
                                @else
                                {{ __('ESI statement for the month of') }}
                                @endif
                            </h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <thead>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Sr. No.') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Employee Id') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Name') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('UAN') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Gross Salary') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Employees') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Employers') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Total') }}
                </th>
            </tr>
        </thead>
        <tbody>

            @if (!empty($report['staff_salary_payments']))
            @foreach ($report['staff_salary_payments'] as $index => $staffSalaryPayment)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($index + 1) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['staff']['employee_id'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __(($staffSalaryPayment['staff']['first_name'] ?? '').' '.($staffSalaryPayment['staff']['middle_name'] ?? '').' '.($staffSalaryPayment['staff']['last_name'] ?? '')) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['staff']['uan'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['gross_salary'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['employees_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['employers_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['total_amount'] ?? 0) }}
                </td>
            </tr>
            @endforeach
            <tr>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('Total') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_gross_salary'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_employee_amount'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_employer_amount'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_amount'] ?? 0) }}
                </td>
            </tr>
            @endif

        </tbody>
    </table>
</body>

</html>