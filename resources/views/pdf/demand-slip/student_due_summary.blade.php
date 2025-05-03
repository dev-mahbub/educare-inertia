<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Download Student Due Summary</title>
    <style>
    </style>
</head>

<body>
    @if (!empty($reports))
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td style="font-size: 10px;">
                            <h1>
                                @if (!empty($schoolData['title']))
                                {{ __($schoolData['title']) }}
                                @endif
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 12px;">
                            <h2>
                                @if (!empty($schoolData['academic_year']))
                                {{ __('AcademicYear Name : '.$schoolData['academic_year']) }}
                                @else
                                {{ __('AcademicYear Name : ') }}
                                @endif
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 14px;">
                            <h3>{{ __("Class : {$classroomTitle}") }}</h3>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
        <tbody>
            <tr>
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Adm .No') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Student Name') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Father Name') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Phone') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Installment') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Total') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Concession') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Paid') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Balance') }}</h4>
                </th>
            </tr>
        </tbody>
        </tr>

        @if(!empty($reports['student_wise_reports']))
        @foreach ($reports['student_wise_reports'] as $report)

        @if (!empty($report['installment_wise_amounts']))
        @php
        $count = 0;
        @endphp

        @foreach ($report['installment_wise_amounts'] as $installment => $installmentAmounts)
        @php
        $count++;
        @endphp

        <tr>
            @if ($count == 1)
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; border-left:1px solid #000; #000; font-weight: 700;">
                @if (!empty($report['student']))
                {{ __($report['student']['admission_no'] ?? "") }}
                @endif
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; #000; font-weight: 700;">
                @if (!empty($report['student']))
                {{ __($report['student']['first_name'] ?? "") }}
                {{ __($report['student']['middle_name'] ?? "") }}
                {{ __($report['student']['last_name'] ?? "") }}
                @endif
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; #000; font-weight: 700;">
                @if (!empty($report['student']['father']))
                {{ __($report['student']['father']['first_name'] ?? "") }}
                {{ __($report['student']['father']['middle_name'] ?? "") }}
                {{ __($report['student']['father']['last_name'] ?? "") }}
                @endif
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; #000; font-weight: 700;">
                @if (!empty($report['student']['father']))
                {{ __($report['student']['father']['phone'] ?? "") }}
                @endif
            </td>
            @else
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-left:1px solid #000; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            @endif


            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($installment) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($installmentAmounts['payable_amount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($installmentAmounts['discount_amount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($installmentAmounts['paid_amount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($installmentAmounts['due_amount'] ?? 0) }}
            </td>
        </tr>
        @endforeach
        @endif
        <tr>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-left:1px solid #000; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __('Total') }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($report['total_amount'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($report['total_discount'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($report['total_paid'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($report['total_due'] ?? 0) }}
                </strong>
            </td>
        </tr>

        @endforeach
        @endif

        <tr>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-left:1px solid #000; border-top:1px solid #000; border-bottom:1px solid #000; font-weight: 700;"><strong></strong></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; border-bottom:1px solid #000; font-weight: 700;"><strong></strong></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; border-bottom:1px solid #000; font-weight: 700;"><strong></strong></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; border-bottom:1px solid #000; font-weight: 700;"><strong>{{ __('Grand Total') }}</strong></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;"><strong>{{ __('Total') }}</strong></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($reports['total_amount'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($reports['total_discount'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($reports['total_paid'] ?? 0) }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __($reports['total_due'] ?? 0) }}
                </strong>
            </td>
        </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>
