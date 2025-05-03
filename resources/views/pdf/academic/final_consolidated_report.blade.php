<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Final Consolidated Report</title>
    <style>
        .defult-table {
            width: 100%;
            font-family: 'Inter', sans-serif;
            border-collapse: collapse;
        }

        .table-caption-title {
            text-align: center;
            color: #000000;
        }
    </style>
</head>

<body>
    @if (!empty($finalConsolidatedReport['reports']))
    <table style="width: 100%; font-family: 'Inter', sans-serif; border: 1px solid #0D0D0D; padding-top: 5px; padding-bottom: 5px; border-bottom: 0;">
        <thead>
            <tr style="width: 100%;">
                <td style="width: 100%; vertical-align: top; text-align: center;">
                    <table>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>{{ __(($schoolData['title'] ?? "")."(".($schoolData['academic_year'] ?? "").")") }}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>{{ __("Class: ".$classroomTitle .", Teacher Name: ".$teacherName) }}</h3>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </thead>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Adm. No.') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Roll No') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Student Name') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Exam Name') }}
                        @if (!empty($finalConsolidatedReport['exam_subjects']))
                        @foreach ($finalConsolidatedReport['exam_subjects'] as $subjectTitle)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __($subjectTitle) }}</strong></th>
                @endforeach
                @endif
                </strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Total') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Grade') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Percentage') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Rank') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Attendance') }}</strong></th>
            </tr>

            @foreach ($finalConsolidatedReport['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">{{ __($report['student']['admission_no'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['student']['roll_no'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['student']['student_name'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                @if (!empty($finalConsolidatedReport['exam_subjects']))
                @foreach ($finalConsolidatedReport['exam_subjects'] as $subjectTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                @endforeach
                @endif
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['total_mark'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['grade'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['percentage'] ?? '0') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['rank'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($report['total_attendance'] ?? 0) }}
                </td>
            </tr>
            @if (!empty($report['exams']))
            @foreach ($report['exams'] as $exam)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __($exam['exam_title'] ?? '') }}
                </td>
                @if (!empty($finalConsolidatedReport['exam_subjects']))
                @foreach ($finalConsolidatedReport['exam_subjects'] as $subjectTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    @if (!empty($exam['subjects']))
                    @foreach ($exam['subjects'] as $subject)
                    @if($subject['subject_title'] == $subjectTitle)
                    {{ __($subject['mark'] ?? '') }}
                    @endif
                    @endforeach
                    @endif
                    {{ __('') }}
                </td>
                @endforeach
                @endif
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:1px solid #0D0D0D; color: #030105">
                    {{ __('') }}
                </td>
            </tr>
            @endforeach
            @endif
            @endforeach
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>