<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Class Timetable Report</title>
</head>

<body>
    @if (!empty($classTimeTables))
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
                            <h4>{{ __("Class Time Table report (".($schoolData['academic_year'] ?? "").")") }}</h4>
                            <span style="font-size:16px; font-weight:800; padding-right:20px">{{ __("Class Name: ". $classroomTitle ?? $classroomTitle ) }}</span>
                            <span style="font-size:16px; font-weight:800;">{{ __("Shift: ". $shiftType ?? $shiftType ) }}</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <thead>
            <tr>
                <th></th>
                @foreach ($classTimeTables as $key => $period)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Period - ').  $key + 1 }}
                    <br/>
                    {{ \Carbon\Carbon::parse($period['start_time'] ?? '00:00')->format('h:i A') . ' - ' . \Carbon\Carbon::parse($period['end_time'] ?? '00:00')->format('h:i A') }}
                </th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @php
                $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            @endphp
            @foreach ($days as $dey)
            <tr>
                <th>{{ $dey }}</th>
                @foreach ($classTimeTables as $period)
                @php 
                    $repeatable_days = !empty($period['repeatable_days']) ? json_decode($period['repeatable_days'], true) : [];
                    $startDateDay = date('l', strtotime($period['start_date'] ?? ''));
                    $teacherData = !empty($period['teachers']) && isset($period['teachers'][0]) ? $period['teachers'][0] : null;
                    $teacherName = $teacherData ? ($teacherData['teacher_details']['name'] ?? $teacherData['teacher_name'] ?? '') : '';
                    $scheduleInfo = [];
                    if (empty($repeatable_days) || !in_array($dey, $repeatable_days)) {
                        if ($startDateDay === $dey) {
                            $scheduleInfo = [
                                'subject' => $period['subject']['title'] ?? '',
                                'teacher' => $teacherName
                            ];
                        } else {
                            $scheduleInfo = [
                                'subject' => '',
                                'teacher' => ''
                            ];
                        }
                    } else {
                        $scheduleInfo = [
                            'subject' => $period['subject']['title'] ?? '',
                            'teacher' => $teacherName
                        ];
                    }
                @endphp
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    <span style="font-size: 14px; font-weight: 600;">{{ $scheduleInfo['subject'] }}</span>
                    <br/>
                    <span style="font-size: 12px; font-weight: 400;">{{ $scheduleInfo['teacher'] }}</span>
                </td>
                @endforeach
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>