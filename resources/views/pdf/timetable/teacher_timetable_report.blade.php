<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Teacher Timetable Report</title>
</head>

<body>
    @if (count($timetables) > 0)
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
                            <span style="font-size:16px; font-weight:800; padding-right:20px">{{ __("Teacher Name: ". $teacherName ) }}</span>
                            <span style="font-size:16px; font-weight:800;">{{ __("Shift: ". $shiftTitle ) }}</span>
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
                @if (count($schoolPeriods) > 0)
                @foreach ($schoolPeriods as $index => $period)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Period - ').  $index + 1 }}
                    <br />
                    {{ $period['start_time'] . ' - ' . $period['end_time'] }}
                </th>
                @endforeach
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach ($timetables as $timetable)
            <tr>
                <th>{{ $timetable['day'] ?? '' }}</th>
                @foreach ($schoolPeriods as $period)
                @if (!empty($timetable['period_data'][$period['id']]))
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    @foreach ($timetable['period_data'][$period['id']] as $periodData)
                    <div>
                        <span style="font-size: 14px; font-weight: 600;">{{ $periodData['subject_title'] ?? '' }}</span>
                        <br />
                        <span style="font-size: 12px; font-weight: 400;">{{ $periodData['classroom_title'] ?? '' }}</span>
                    </div>
                    @endforeach
                </td>
                @else
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                </td>
                @endif
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