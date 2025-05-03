<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>PDF Student Report</title>
</head>

<body>
    @if (!empty($reports['reports']))
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
                            <h4>{{ __("Student Report : ".($schoolData['academic_year'] ?? "")." / Document Report") }}</h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Class Name') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __('Total Student') }}
                </th>
                @if (!empty($documentTitles))
                @foreach($documentTitles as $document)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">
                    {{ __($document) }}
                </th>
                @endforeach
                @endif
            </tr>

            @foreach ($reports['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['class_name'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report['total_student'] ?? 0) }}
                </td>
                @if (!empty($documentTitles))
                @foreach($documentTitles as $document)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($report[$document] ?? 0) }}
                </td>
                @endforeach
                @endif
            </tr>
            @endforeach

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __("Total") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($reports['total_student'] ?? 0) }}
                </td>
                @if (!empty($documentTitles))
                @foreach($documentTitles as $document)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($reports[$document] ?? 0) }}
                </td>
                @endforeach
                @endif
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>