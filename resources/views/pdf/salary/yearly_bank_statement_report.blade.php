<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Yearly Bank Statement</title>
</head>

<body>
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h3>{{ __($schoolData['title'] ?? "") }}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>
                                @if (!empty($schoolData['academic_year']))
                                {{ __('Staff Yearly Bank Statement For The Session '.$schoolData['academic_year']) }}
                                @else
                                {{ __('Staff Yearly Bank Statement For The Session') }}
                                @endif
                            </h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <table style="margin-bottom: 30px; width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 20px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <thead>
            <tr>
                <th colspan="2" style="margin:0;vertical-align: middle; text-align: left; padding: 5px; background: #EEEEEE;">
                    {{ __('Staff Details') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="width:50%;">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:22%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __('Name') }}
                                </td>
                                <td style="width:4%; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __(':') }}
                                </td>
                                <td style="width:74%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __($staff?->first_name .' '. $staff?->middle_name .' '. $staff?->last_name) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%;">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:22%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __('Email') }}
                                </td>
                                <td style="width:4%; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __(':') }}
                                </td>
                                <td style="width:74%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __($staff->email ?? '') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="width:50%;">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:22%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __('Employee Id') }}
                                </td>
                                <td style="width:4%; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __(':') }}
                                </td>
                                <td style="width:74%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __($staff->employee_id ?? '') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%;">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:22%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __('Phone') }}
                                </td>
                                <td style="width:4%; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __(':') }}
                                </td>
                                <td style="width:74%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __($staff->phone ?? '') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="width:50%;">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:22%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __('Address') }}
                                </td>
                                <td style="width:4%; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __(':') }}
                                </td>
                                <td style="width:74%; margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                                    {{ __($staff->address ?? '') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%"></td>
            </tr>
        </tbody>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <thead>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Sr. No.') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Month') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Payment Date') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Total Earning') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Total Deduction') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Due') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Amount Paid') }}
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
                    {{ __($staffSalaryPayment['payment_month'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['payment_date'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['total_earning_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['total_deduction_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['due_amount'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($staffSalaryPayment['paid_amount'] ?? 0) }}
                </td>
            </tr>
            @endforeach
            <tr>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('Total') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __('') }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_earning'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_deduction'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_due'] ?? 0) }}
                </td>
                <td style="background: #EEEEEE; margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_paid'] ?? 0) }}
                </td>
            </tr>
            @endif

        </tbody>
    </table>
</body>

</html>