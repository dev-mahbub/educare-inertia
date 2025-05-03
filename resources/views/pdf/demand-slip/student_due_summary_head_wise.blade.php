<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Download Class Wise Demand Slip Pdf</title>
    <style>
    </style>
</head>

<body>
    @if (count($reports) > 0)
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td style="font-size: 9px;">
                            <h2>
                                @if (!empty($schoolData['title']))
                                {{ __($schoolData['title']) }}
                                @endif
                                @if (!empty($schoolData['academic_year']))
                                ({{ __($schoolData['academic_year']) }})
                                @endif
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 9px;">
                            <h2>{{ __($reportTitle) }}</h2>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #ddd; border-right: 1px solid #ddd;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('ClassName') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Roll') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('AdmNum') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Parent') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Phone') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('EmploymentCategory') }}</th>

                @if(!empty($reports['head_wise_reports']))
                @foreach (array_keys($reports['head_wise_reports']) as $feeType)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __($feeType) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Total') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Installments') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('No Of Due Installments') }}</th>
            </tr>
            @if(!empty($reports['student_wise_reports']))
            @foreach ($reports['student_wise_reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['classroom']))
                    {{ __($report['student']['classroom']['title'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['classroom_roll']))
                    {{ __($report['student']['classroom_roll']['roll_no'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']))
                    {{ __($report['student']['admission_no'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']))
                    {{ __($report['student']['first_name'] ?? "") }}
                    {{ __($report['student']['middle_name'] ?? "") }}
                    {{ __($report['student']['last_name'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['father']))
                    {{ __($report['student']['father']['first_name'] ?? "") }}
                    {{ __($report['student']['father']['middle_name'] ?? "") }}
                    {{ __($report['student']['father']['last_name'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['father']))
                    {{ __($report['student']['father']['phone'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['employment_category']))
                    {{ __($report['student']['employment_category']['title'] ?? "") }}
                    @endif
                </td>

                @if(!empty($reports['head_wise_reports']))
                @foreach (array_keys($reports['head_wise_reports']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">{{ __($report['head_wise_amounts'][$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_due'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['installments'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_installments'] ?? 0) }}
                </td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>

                @if(!empty($reports['head_wise_reports']))
                @foreach (array_keys($reports['head_wise_reports']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __($reports['head_wise_reports'][$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($reports['total_due'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>