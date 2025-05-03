<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Download Student deman-ship</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        ul {
            margin: 0px;
            padding: 0px;
        }

        .list ul li {
            font-size: 10px;
            position: relative;
            margin-left: 15px
        }

        .signature {
            font-size: 9px;
        }
    </style>
</head>

<body>
    @if(empty($studentLedgerReport) && empty($installmentWiseAmounts))
    <h3>No Data Available</h3>
    @endif

    @if (!empty($studentLedgerReport) && !empty($installmentWiseAmounts))
    <div class="single-item" style="margin-bottom: 10px;">
        <div class="header-top" style="margin-bottom: 20px;">
            <div style="width: 100%;">
                <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
                    <tr>
                        <td style="width: 100%; vertical-align: middle; text-align: center;">
                            <table style="width: 100%;">
                                <tr>
                                    <td>
                                        <h2>{{ __($schoolData['title'] ?? "") }}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>
                                            {{ __($schoolData['street_address'] ?? "sdfs df sdfs df") }}
                                        </h3>
                                        <h4 style="font-weight:normal;">
                                            {{ __($schoolData['mail'] ?? "") }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        @foreach ($studentLedgerReport as $studentId => $studentReport)
        <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 50px; margin-top: 10px;">
            <tbody>
                <tr>
                    <td colspan="{{ count(array_keys($installmentWiseAmounts[$studentId])) + 3 }}" style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105; font-weight:bold">
                        Student ledger for the session ({{ __($schoolData['academic_year'] ?? "") }})
                    </td>
                </tr>
                <tr>
                    <td colspan="{{ count(array_keys($installmentWiseAmounts[$studentId])) + 3 }}" style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105; font-weight:bold">
                        <span style="margin:0px 5px">
                            @if (!empty($studentReport['student']))
                            {{ __('Student: '.$studentReport['student']['first_name'] .' '. $studentReport['student']['middle_name'] .' '. $studentReport['student']['last_name']) }}
                            @else
                            {{ __('Student:')}}
                            @endif
                        </span>

                        <span style="margin:0px 5px">
                            @if(!empty($studentReport['student']['father']))
                            {{ __("Father's Name: ".$studentReport['student']['father']['first_name'] .' '. $studentReport['student']['father']['middle_name'] .' '. $studentReport['student']['father']['last_name']) }}
                            @else
                            {{ __("Father's Name:")}}
                            @endif
                        </span>

                        <span style="margin:0px 5px">
                            @if(!empty($studentReport['student']['admission_no']))
                            {{ __('Adm No.: '.$studentReport['student']['admission_no']) }}
                            @else
                            {{ __('Adm No.:')}}
                            @endif
                        </span>

                        <span style="margin:0px 5px">
                            @if(!empty($studentReport['student']['classroom']['title']))
                            {{ __('Class: '.$studentReport['student']['classroom']['title']) }}
                            @else
                            {{ __('Class:')}}
                            @endif
                        </span>

                        <span style="margin:0px 5px">
                            @if(!empty($studentReport['student']['classroom_roll']['roll_no']))
                            {{ __('Roll No.: '.$studentReport['student']['classroom_roll']['roll_no']) }}
                            @else
                            {{ __('Roll No.:')}}
                            @endif
                        </span>
                    </td>
                </tr>

                <tr>
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #ddd">{{ __('') }}</th>

                    @if(!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #ddd">{{ __($installment) }}</th>
                    @endforeach
                    @endif

                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #ddd">{{ __('Discount') }}</th>
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #ddd">{{ __('Total') }}</th>
                </tr>

                @if (!empty($studentReport['reports']))
                @foreach ($studentReport['reports'] as $report)
                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['fee_type_title'] ?? "") }}</td>

                    @if (!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['installment_wise_amounts'][$installment]['total_payable'] ?? '-') }}</td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['total_discount'] ?? 0) }}</td>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['total_payable'] ?? 0) }}</td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Total Due') }}</strong></td>

                    @if (!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($installmentWiseAmounts[$studentId][$installment]['total_due'] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                </tr>

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Concess. Amt.') }}</strong></td>

                    @if (!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($installmentWiseAmounts[$studentId][$installment]['total_discount'] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                </tr>

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Net Payable') }}</strong></td>

                    @if (!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($installmentWiseAmounts[$studentId][$installment]['total_payable'] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                </tr>

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Amt. Paid') }}</strong></td>

                    @if (!empty($installmentWiseAmounts[$studentId]))
                    @foreach (array_keys($installmentWiseAmounts[$studentId]) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($installmentWiseAmounts[$studentId][$installment]['total_paid'] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __('-') }}
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>
        @endforeach
    </div>
    @endif
</body>

</html>