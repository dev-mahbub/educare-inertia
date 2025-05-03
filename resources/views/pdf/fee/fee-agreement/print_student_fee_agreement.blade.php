<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Fee Agreement</title>
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
    @if (!empty($reports['reports']))
    <table class="defult-table" style="padding-top: 5px; padding-bottom: 5px; border-bottom: 10px;">
        <thead>
            <tr style="width: 100%;">
                <td style="width: 100%; vertical-align: top; text-align: center;">
                    <table>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h1>
                                    {{ __($schoolData['title'] ?? "") }}
                                </h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>
                                    @if (!empty($schoolData['academic_year']))
                                    {{ __("Fee Agreement ({$schoolData['academic_year']})") }}
                                    @else
                                    {{ __('Fee Agreement ()') }}
                                    @endif
                                </h3>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </thead>
    </table>

    <table class="defult-table" style="margin-top: 20px;">
        <caption style="text-align: right;">Date {{ __($agreementDate) }}</caption>
        <tbody>
            <tr>
                <td style="width:50%; vertical-align: top;">
                    <table class="defult-table">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:10px;">{{ __('Guardian Name') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:2px; border-bottom: 1px solid #000;">{{ __($reports['student']['father_name'] ?? "") }}</td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px;">{{ __('Village / City') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:2px; border-bottom: 1px solid #000;">{{ __($reports['student']['address'] ?? "") }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%; padding-left:30px; vertical-align: top;">
                    <table style="">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:10px;">{{ __('Agreement No./ G.ID No') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:2px; border-bottom: 1px solid #000;">{{ __('/') }}</td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px;">{{ __('Contact No. Guardian') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:2px; border-bottom: 1px solid #000;">{{ __($reports['student']['father_phone'] ?? "") }} </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>

    @if (!empty($reports['reports']))
    @foreach ($reports['reports'] as $studentId => $report)
    <table class="defult-table" style="margin-top: 30px;">
        <tbody>
            <tr>
                <th colspan="10" rowspan="10" style="margin:0;vertical-align: middle; text-align:start; border:1px solid #000; padding: 10px; font-weight: 700; width:220px">
                    <span>{{ __('Name- '. ($report['student']['name'] ?? "")) }}</span>
                    <span>{{ __('Father- '.($report['student']['father_name'] ?? "")) }}</span>
                    <span>{{ __('Father Phone- '.($report['student']['father_phone'] ?? "")) }}</span>
                    <span>{{ __('Class- '. ($report['student']['classroom_title'] ?? "")) }}</span>
                </th>
            </tr>
            <tr>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    <strong>{{ __('HEAD NAME') }}</strong>
                </td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    <strong>{{ __('TOTAL FEE') }}</strong>
                </td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    <strong>{{ __('DISCOUNT') }}</strong>
                </td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    <strong>{{ __('PAYABLE') }}</strong>
                </td>

                @if (!empty($report['installment_wise_amounts']))
                @foreach ($report['installment_wise_amounts'] as $feeAmountItem)
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    <strong>{{ __($feeAmountItem['title'] ?? "") }}</strong>
                </td>
                @endforeach
                @endif

            </tr>

            @if (!empty($report['fee_type_wise_amounts']))
            @foreach ($report['fee_type_wise_amounts'] as $feeTypeAmountItem)
            <tr>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">{{ __($feeTypeAmountItem['fee_type_title'] ?? "") }}</td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">{{ __($feeTypeAmountItem['total_amount'] ?? 0) }}</td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">{{ __($feeTypeAmountItem['total_discount'] ?? 0) }}</td>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">{{ __($feeTypeAmountItem['total_payable'] ?? 0) }}</td>

                @if (!empty($report['installment_wise_amounts']))
                @foreach ($report['installment_wise_amounts'] as $feeId => $feeAmountItem)
                <td style="margin:0;vertical-align: top; text-align: center; padding:5px; border:1px solid #000;">{{ __($feeTypeAmountItem['installment_wise_amounts'][$feeId]['amount'] ?? '-') }}</td>
                @endforeach
                @endif
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __('Total') }}</td>
                <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __($report['total_amount'] ?? 0) }}</td>
                <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __($report['total_discount'] ?? 0) }}</td>
                <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __($report['total_payable'] ?? 0) }}</td>

                @if (!empty($report['installment_wise_amounts']))
                @foreach ($report['installment_wise_amounts'] as $feeAmountItem)
                <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __($feeAmountItem['amount'] ?? 0) }}</td>
                @endforeach
                @endif

            </tr>
        </tbody>
    </table>
    @endforeach
    @endif

    <caption style="margin-top: 40px;">Fee Summary of Student</caption>
    <table class="defult-table" style=" margin-top: 20px;">
        <tr>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">NAME</th>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">FATHER</th>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">CLASSS</th>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">TOTAL FEE</th>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">DISCOUNT</th>
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">PAYABLE</th>

            @if (!empty($reports['fee_summary_report']['installment_wise_amounts']))
            @foreach ($reports['fee_summary_report']['installment_wise_amounts'] as $feeAmountItem)
            <th style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{ __($feeAmountItem['title'] ?? "") }}
            </th>
            @endforeach
            @endif
        </tr>

        @if (!empty($reports['fee_summary_report']['reports']))
        @foreach ($reports['fee_summary_report']['reports'] as $studentId => $report)
        <tr>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{__($report['student']['name'] ?? "")}}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{__($report['student']['father_name'] ?? "")}}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{__($report['student']['classroom_title'] ?? "")}}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{ __($report['total_amount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{ __($report['total_discount'] ?? 0) }}
            </td>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{ __($report['total_payable'] ?? 0) }}
            </td>

            @if (!empty($reports['fee_summary_report']['installment_wise_amounts']))
            @foreach ($reports['fee_summary_report']['installment_wise_amounts'] as $feeId => $feeAmountItem)
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                {{__( $report['installment_wise_amounts'][$feeId]['amount'] ?? '-')}}
            </td>
            @endforeach
            @endif
        </tr>
        @endforeach
        @endif

        <tr>
            <td colspan="3" rowspan="3" style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">{{ __('Total') }}</td>
            <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">
                {{ __($reports['fee_summary_report']['total_amount'] ?? 0) }}
            </td>
            <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">
                {{ __($reports['fee_summary_report']['total_discount'] ?? 0) }}
            </td>
            <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">
                {{ __($reports['fee_summary_report']['total_payable'] ?? 0) }}
            </td>


            @if (!empty($reports['fee_summary_report']['installment_wise_amounts']))
            @foreach ($reports['fee_summary_report']['installment_wise_amounts'] as $feeAmountItem)
            <td style="margin:0; vertical-align: top; text-align: left; padding:5px; border: 1px solid #000; color: #F30445;">
                {{ __($feeAmountItem['total_amount'] ?? "") }}
            </td>
            @endforeach
            @endif
        </tr>
    </table>


    <table class="defult-table" style="margin-top: 50px; text-align: center;">
        <tbody>
            <tr>
                <td style="width:50%; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:0px; padding-bottom:0px; border-top: 1px solid #000; padding-left:30px;">{{ __('Mother') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%; padding-left:30px; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:0px; padding-bottom:0px; border-top: 1px solid #000; padding-left:30px;">{{ __('Father') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%; padding-left:30px; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:0px; padding-bottom:0px; border-top: 1px solid #000; padding-left:30px;">{{ __('Guardian') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:50%; padding-left:30px; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:0px; padding-bottom:0px; border-top: 1px solid #000; padding-left:30px;">{{ __('Principal') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>