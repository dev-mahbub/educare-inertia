<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Download Student demand-slip</title>
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
    @if (count($reports) > 0)
    @foreach ($reports as $studentReport)
    @if (!empty($studentReport['installments']))
    <div class="single-item" style="margin-bottom: 10px;">
        <div class="header-top">
            <div style="width: 40%; float:left;">
                <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
                    <tr>
                        <td style="width: 10%; vertical-align: top; text-align: left;">
                            <img style="width: 65px; height: 65px;" src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo">
                        </td>
                        <td style="width: 90%; vertical-align: middle; text-align: center;">
                            <table>
                                <tr>
                                    <td style="font-size: 10px;">
                                        <h3>{{ __($schoolData['title'] ?? "") }}</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 10px;">{{ __($schoolData['street_address'] ?? "") }}</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 10px;">
                                        @if(!empty($schoolData['academic_year']))
                                        {{ __("Fee Demand Bill- {$schoolData['academic_year']}") }}
                                        @else
                                        {{ __("Fee Demand Bill- ") }}
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="width: 55%; float:left; border-left: 1px solid #000;">
                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-left: 5px">
                    <tbody>
                        <tr>
                            <td style="vertical-align: top; width: 55%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;"><strong>{{ __('Student Name:') }}</strong></td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                <strong>
                                                    @if (!empty($studentReport['student']))
                                                    {{ __("{$studentReport['student']['first_name']} {$studentReport['student']['middle_name']} {$studentReport['student']['last_name']}") }}
                                                    @endif
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">{{ __('Father\'s Name:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                @if (!empty($studentReport['student']['father']))
                                                {{ __("{$studentReport['student']['father']['first_name']} {$studentReport['student']['father']['middle_name']} {$studentReport['student']['father']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">{{ __('Mobile:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                @if (!empty($studentReport['student']['father']))
                                                {{ __($studentReport['student']['father']['phone'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding-left: 5px; vertical-align: top; width: 40%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px; font-size: 10px;">{{ __('Admission No:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['admission_no']))
                                                {{ __($studentReport['student']['admission_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size: 10px;">{{ __('Class:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['classroom']))
                                                {{ __($studentReport['student']['classroom']['title'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size: 10px;">{{ __('Roll No:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['classroom_roll']))
                                                {{ __($studentReport['student']['classroom_roll']['roll_no'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px;">
            <tbody>
                <tr>
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Fee item') }}</th>

                    @if (!empty($studentReport['installments']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['installments']['installment_wise_amounts']) as $installment)
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __($installment) }}</th>
                    @endforeach
                    @endif

                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Total') }}</th>
                </tr>
                @if (!empty($studentReport['installments']['head_wise_reports']))
                @foreach ($studentReport['installments']['head_wise_reports'] as $report)
                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['fee_type_title'] ?? "") }}</td>

                    @if (!empty($studentReport['installments']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['installments']['installment_wise_amounts']) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['installment_wise_amounts'][$installment] ?? 0) }}</td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['total_due'] ?? 0) }}</td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Total') }}</strong></td>

                    @if (!empty($studentReport['installments']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['installments']['installment_wise_amounts']) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($studentReport['installments']['installment_wise_amounts'][$installment] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __($studentReport['installments']['total_due'] ?? 0) }}
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="bottom-content" style="width: 100%; text-align: left;">
            <div class="list" style="width: 50%; padding: 0; float:left;">
                <ul>
                    <li>
                        @if (!empty($studentReport['installments']))
                        {{ __("Total payable amount Rs.{$studentReport['installments']['total_due']} (Rs. {$studentReport['installments']['total_due_in_word']} )") }}
                        @else
                        {{ __('Total payable amount Rs. (Rs. )') }}
                        @endif
                    </li>
                    <li>{{ __('One month notice must be given prior to the withdraw of the child from the School') }}</li>
                    <li><strong>{{ __('Note : Late fine will be include during payment time') }}</strong></li>
                </ul>
            </div>
            <div class="list" style="width: 30%; padding: 0 15px; float:left;">
                <ul>
                    <li>{{ __('Payment once paid is not refundable') }}</li>
                    <li>{{ __('Cheques are Subject to Realization') }}</li>
                </ul>
            </div>
            <div class="list" style="width: 15%; float:left;">
                <small Class="signature"><strong>Authorize Signatory</strong></small>
            </div>
        </div>
    </div>
    @endif

    @if (!empty($studentReport['vouchers']))
    <div class="single-item" style="margin-bottom: 10px;">
        <div class="header-top">
            <div style="width: 40%; float:left;">
                <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
                    <tr>
                        <td style="width: 10%; vertical-align: top; text-align: left;">
                            <img style="width: 65px; height: 65px;" src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo">
                        </td>
                        <td style="width: 90%; vertical-align: middle; text-align: center;">
                            <table>
                                <tr>
                                    <td style="font-size: 10px;">
                                        <h3>{{ __($schoolData['title'] ?? "") }}</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 10px;">{{ __($schoolData['street_address'] ?? "") }}</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 10px;">
                                        @if(!empty($schoolData['academic_year']))
                                        {{ __("Fee Demand Bill- {$schoolData['academic_year']}") }}
                                        @else
                                        {{ __("Fee Demand Bill- ") }}
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="width: 55%; float:left; border-left: 1px solid #000;">
                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-left: 5px">
                    <tbody>
                        <tr>
                            <td style="vertical-align: top; width: 55%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;"><strong>{{ __('Student Name:') }}</strong></td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                <strong>
                                                    @if (!empty($studentReport['student']))
                                                    {{ __("{$studentReport['student']['first_name']} {$studentReport['student']['middle_name']} {$studentReport['student']['last_name']}") }}
                                                    @endif
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">{{ __('Father\'s Name:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                @if (!empty($studentReport['student']['father']))
                                                {{ __("{$studentReport['student']['father']['first_name']} {$studentReport['student']['father']['middle_name']} {$studentReport['student']['father']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">{{ __('Mobile:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size: 10px;">
                                                @if (!empty($studentReport['student']['father']))
                                                {{ __($studentReport['student']['father']['phone'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding-left: 5px; vertical-align: top; width: 40%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px; font-size: 10px;">{{ __('Admission No:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['admission_no']))
                                                {{ __($studentReport['student']['admission_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size: 10px;">{{ __('Class:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['classroom']))
                                                {{ __($studentReport['student']['classroom']['title'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size: 10px;">{{ __('Roll No:') }}</td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size: 10px;">
                                                @if (!empty($studentReport['student']['classroom_roll']))
                                                {{ __($studentReport['student']['classroom_roll']['roll_no'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px;">
            <tbody>
                <tr>
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Fee item') }}</th>

                    @if (!empty($studentReport['vouchers']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['vouchers']['installment_wise_amounts']) as $installment)
                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __($installment) }}</th>
                    @endforeach
                    @endif

                    <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #ebebeb;">{{ __('Total') }}</th>
                </tr>

                @if (!empty($studentReport['vouchers']['head_wise_reports']))
                @foreach ($studentReport['vouchers']['head_wise_reports'] as $report)
                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['fee_type_title'] ?? "") }}</td>

                    @if (!empty($studentReport['vouchers']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['vouchers']['installment_wise_amounts']) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">{{ __($report['installment_wise_amounts'][$installment] ?? 0) }}</td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        {{ __($report['total_due'] ?? 0) }}
                    </td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __('Total') }}</strong></td>

                    @if (!empty($studentReport['vouchers']['installment_wise_amounts']))
                    @foreach (array_keys($studentReport['vouchers']['installment_wise_amounts']) as $installment)
                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105"><strong>{{ __($studentReport['vouchers']['installment_wise_amounts'][$installment] ?? 0) }}</strong></td>
                    @endforeach
                    @endif

                    <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #ddd; color: #030105">
                        <strong>
                            {{ __($studentReport['vouchers']['total_due'] ?? 0) }}
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="bottom-content" style="width: 100%; text-align: left;">
            <div class="list" style="width: 50%; padding: 0; float:left;">
                <ul>
                    @if (!empty($studentReport['vouchers']))
                    {{ __("Total payable amount Rs.{$studentReport['vouchers']['total_due']} (Rs. {$studentReport['vouchers']['total_due_in_word']} )") }}
                    @else
                    {{ __('Total payable amount Rs. (Rs. )') }}
                    @endif
                    <li>{{ __('One month notice must be given prior to the withdraw of the child from the School') }}</li>
                    <li><strong>{{ __('Note : Late fine will be include during payment time') }}</strong></li>
                </ul>
            </div>
            <div class="list" style="width: 30%; padding: 0 15px; float:left;">
                <ul>
                    <li>{{ __('Payment once paid is not refundable') }}</li>
                    <li>{{ __('Cheques are Subject to Realization') }}</li>
                </ul>
            </div>
            <div class="list" style="width: 15%; float:left;">
                <small Class="signature"><strong>Authorize Signatory</strong></small>
            </div>
        </div>
    </div>
    @endif
    @endforeach

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>