<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student Head Wise Fee Report</title>
    <style>
    </style>
</head>

<body>
    @if (!empty($studentHeadWiseReport['reports']) > 0)
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle;">
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 10%; vertical-align: top; text-align: left;">
                            <img style="width: 65px; height: 65px;" src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo">
                        </td>
                        <td style="width: 80%; vertical-align: top; text-align: center;">
                            <table style="width: 100%;">
                                <tr>
                                    <td>
                                        <h2 style="font-weight: normal">
                                            @if (!empty($schoolData['title']))
                                            {{ __($schoolData['title']) }}
                                            @endif
                                        </h2>

                                        <p>{{ __($schoolData['street_address'] ?? "") }}</p>
                                    </td>
                                </tr>
                            </table>
                            <table style="margin-top: 10px; width: 100%;">
                                <tr>
                                    <td style="font-weight: bold;">
                                        <h4>{{ __('ACADEMIC SESSION : '. ($schoolData['academic_year'] ?? "")) }}</h4>
                                        <h4>{{ __('STUDENT WISE HEAD WISE SUMMARY REPORT ('. $classroomTitle .")") }}</h4>
                                        <h4>{{ __('Installments : from '. $fromFeeTitle . " to ". $toFeeTitle) }}</h4>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 10%;"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #ddd; border-right: 1px solid #ddd;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('S.N.') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('ADM. N.') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('NAME') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('ROLL NO.') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('CLASS') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('FATHER NAME') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('FATHER MOBILE') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('TOTAL FEE') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('CONCESSION') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('TOTAL PAYABLE') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('TOTAL PAID') }}
                </th>

                @if(!empty($studentHeadWiseReport['fee_type_amounts']))
                @foreach (array_keys($studentHeadWiseReport['fee_type_amounts']) as $feeType)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __($feeType) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('TOTAL DUE') }}
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">
                    {{ __('STATUS') }}
                </th>
            </tr>
            @if(!empty($studentHeadWiseReport['reports']))

            @php
            $count = 0;
            @endphp

            @foreach ($studentHeadWiseReport['reports'] as $report)

            @php
            $count++;
            @endphp

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($count) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['admission_no'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['name'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['roll_no'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['class'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['father_name'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['father_mobile'] ?? "") }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_fee'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['concession'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_payable'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_paid'] ?? 0) }}
                </td>

                @if(!empty($studentHeadWiseReport['fee_type_amounts']))
                @foreach (array_keys($studentHeadWiseReport['fee_type_amounts']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">{{ __($report[$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['total_due'] ?? 0) }}
                </td>

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #ddd; color: #030105">
                    {{ __($report['status'] ?? "") }}
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
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __('Totals') }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($studentHeadWiseReport['total_fee'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($studentHeadWiseReport['concession'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($studentHeadWiseReport['total_payable'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($studentHeadWiseReport['total_paid'] ?? 0) }}
                </td>

                @if(!empty($studentHeadWiseReport['fee_type_amounts']))
                @foreach (array_keys($studentHeadWiseReport['fee_type_amounts']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">{{ __($studentHeadWiseReport['fee_type_amounts'][$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;">
                    {{ __($studentHeadWiseReport['total_due'] ?? 0) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CFCFCF;"></td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>