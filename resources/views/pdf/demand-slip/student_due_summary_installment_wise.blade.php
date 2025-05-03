<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Download Installment Wise Summary Report</title>
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
                        <td style="font-size: 10px;">
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
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Roll No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Adm No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Student Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Parent Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Phone') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Address') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('City') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('EmploymentCategory') }}</th>

                @if(!empty($reports['installment_wise_reports']))
                @foreach (array_keys($reports['installment_wise_reports']) as $installment)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __($installment) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Total') }}</th>
            </tr>
            @if(!empty($reports['student_wise_reports']))
            @foreach ($reports['student_wise_reports'] as $report)
            <tr>
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
                    @if (!empty($report['student']))
                    {{ __($report['student']['present_address'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']))
                    {{ __($report['student']['present_city'] ?? "") }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    @if (!empty($report['student']['employment_category']))
                    {{ __($report['student']['employment_category']['title'] ?? "") }}
                    @endif
                </td>

                @if(!empty($reports['installment_wise_reports']))
                @foreach (array_keys($reports['installment_wise_reports']) as $installment)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">{{ __($report['installment_wise_amounts'][$installment] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">{{ __($report['total_due'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __('Total') }}</td>

                @if(!empty($reports['installment_wise_reports']))
                @foreach (array_keys($reports['installment_wise_reports']) as $installment)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __($reports['installment_wise_reports'][$installment] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __($reports['total_due'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>