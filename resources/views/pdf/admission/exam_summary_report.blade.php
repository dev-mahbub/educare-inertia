<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Admission Exam Summary</title>
    <style>
        .table-container {
            width: 30%;
            float: left;
            vertical-align: middle;
        }

        .table-container table {
            width: 100%;
            font-family: 'Inter', sans-serif;
            border-collapse: separate;
            /* Separate border model */
            border-spacing: 1px;
            /* Row and column gap */
        }

        .table-container th {
            margin: 0;
            vertical-align: middle;
            text-align: center;
            padding: 5px;
            background: #EEEEEE;
        }

        .table-container td {
            border-bottom: 1px solid #EEEEEE;
        }

        .table-container td:last-child {
            border-bottom: none;
            /* Remove border from last td in each row */
        }

        .table-container .highlight {
            color: #030105;
            background: #EEEEEE;
        }
    </style>
</head>

<body>
    @if (!empty($admissionExamSummary))
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h3>
                                @if(!empty($schoolData))
                                {{ __($schoolData['title']) }}
                                @endif
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>{{ __("Admission Exam Summary(".(!empty($schoolData['academic_year']) ? $schoolData['academic_year'] : '').")") }}</h4>
                            <h4>{{__("Class - {$classTitle} and Exam Status - {$examStatus}")}}</h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="font-size:11px; width: 100%; font-family: 'Inter' , sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Serial No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Reg No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __("Father's Name") }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Reg Date') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Exam Status') }}</th>
            </tr>
            @foreach ($admissionExamSummary as $index => $admissionData)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($index + 1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['registration_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['student_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['class_title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['father_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['registration_date'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($admissionData['exam_status'] ?? "") }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>