<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Exam Wise Report</title>
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
    @if (!empty($examWiseReport['reports']))
    <table style="width: 100%; font-family: 'Inter', sans-serif; border: 2px solid #0D0D0D; padding-top: 5px; padding-bottom: 5px; border-bottom: 0;">
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
                                <h3>{{ __("Class: ".$classroomTitle .", Exam: ".$examTitle) }}</h3>
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
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Adm. No.') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Roll No') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Student Name') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Exam Name') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Father Name') }}</strong></th>
                @if (!empty($examWiseReport['exam_subjects']))
                @foreach ($examWiseReport['exam_subjects'] as $subjectTitle)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __($subjectTitle) }}</strong></th>
                @endforeach
                @endif
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Total') }}</strong></th>
            </tr>

            @foreach ($examWiseReport['reports'] as $report)
            @php
            $exams = array_values($report['exams']);
            @endphp
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __($report['student']['admission_no'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    {{ __($report['student']['roll_no'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    {{ __($report['student']['student_name'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    {{ __($exams[0]['exam_title'] ?? '') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    {{ __($report['student']['father_name'] ?? '') }}
                </td>
                @if (!empty($examWiseReport['exam_subjects']))
                @foreach ($examWiseReport['exam_subjects'] as $subjectTitle)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    @if (!empty($exams[0]['subjects']))
                    @foreach ($exams[0]['subjects'] as $subject)
                    @if($subject['subject_title'] == $subjectTitle)
                    {{ __($subject['mark'] ?? '') }}
                    @endif
                    @endforeach
                    @endif
                    {{ __('') }}
                </td>
                @endforeach
                @endif
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                    {{ __($exams[0]['total_mark'] ?? 0) }}
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