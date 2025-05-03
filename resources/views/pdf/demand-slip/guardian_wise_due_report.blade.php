<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Guardian Wise Due Report</title>
    <style>
    </style>
</head>

<body>
    @if (!empty($guardianWiseDueReport['reports']))
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td style="font-size: 10px;">
                            <h1>
                                @if (!empty($schoolData['title']))
                                {{ __($schoolData['title'] . " (". ($schoolData['academic_year'] ?? "").")") }}
                                @endif
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 14px;">
                            <h3>
                                {{ __($reportTitle) }}
                            </h3>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top:10px">
        <tbody>
            <tr>
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Sr. No.') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    @if ($guardianType == 'guardian')
                    <h4>{{ __('Guardian') }}</h4>
                    @else
                    <h4>{{ __('Father') }}</h4>
                    @endif
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Phone') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Student') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Adm. No') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Roll No') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Class') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Village/City') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Total Fee') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Concession') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Payable') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Paid') }}</h4>
                </th>
                <th style="margin:0;vertical-align: top; text-align: left; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __('Due') }}</h4>
                </th>
            </tr>
        </tbody>
        </tr>

        @php
        $srNo = 0;
        @endphp

        @foreach ($guardianWiseDueReport['reports'] as $report)

        @php
        $srNo++;
        @endphp

        @if (!empty($report['student_data']))
        @php
        $count = 0;
        @endphp

        @foreach ($report['student_data'] as $student)
        @php
        $count++;
        @endphp

        <tr>
            @if ($count == 1)
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; border-left:1px solid #000; #000; font-weight: 700;">
                {{ __($srNo) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000;  font-weight: 700;">
                {{ __($report['guardian_name'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-top:1px solid #000; font-weight: 700;">
                {{ __($report['guardian_phone'] ?? "") }}
            </td>
            @else
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-left:1px solid #000;  font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; font-weight: 700;"></td>
            @endif

            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['name'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['admission_no'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['roll_no'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['classroom_title'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['address'] ?? "") }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['total_amount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['total_discount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['total_payable'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['total_paid'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($student['total_due'] ?? 0) }}
            </td>
        </tr>
        @endforeach
        @endif

        <tr>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #000; border-left:1px solid #000; #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #000; font-weight: 700;"></td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; border-right: none; font-weight: 700;">
                <strong>
                    {{ __('Total') }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __('') }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __('') }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __('') }}
                </strong>
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                <strong>
                    {{ __('') }}
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
                    {{ __($report['total_payable'] ?? 0) }}
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
        </tbody>
    </table>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>