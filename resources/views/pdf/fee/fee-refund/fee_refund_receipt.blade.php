<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student Refund Receipt</title>
    <style>
        .total-due {
            margin-left: 5px;
        }

        @media print {
            #printButton {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div style="max-width:650px; margin: 0 auto; padding: 0 5px; font-size:10px;">
        <div style="width: 48%; padding: 15px 5px; margin-left: 15px;">
            <input id="printButton" type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>

        <div style="width: 90%; float: left; padding: 0 5px;">
            <div style="width: 100%; margin: auto; border: 2px solid #000; padding-bottom: 5px;">
                <table style="width: 100%; font-family: 'Inter', sans-serif;">
                    <thead>
                        <tr style="width: 100%;">
                            <td style="width: 10%; vertical-align: top; text-align: left;">
                                <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                            </td>
                            <td style="width: 80%; vertical-align: top; text-align: center;">
                                <table style="text-align: center; width: 100%">
                                    <tr>
                                        <td>
                                            <h3>
                                                @if (!empty($schoolData['title']))
                                                {{ __($schoolData['title']) }}
                                                @endif
                                            </h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small>
                                                @if (!empty($schoolData['street_address']))
                                                {{ __($schoolData['street_address']) }}
                                                @endif
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span style="padding-left: 10px; padding-right: 10px; padding-top: 3px; padding-bottom: 3px; background-color:#DDDDDD;">{{ __('FEE REFUND RECEIPT') }}</span>
                                            </strong>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 10%; vertical-align: top; text-align: right;">
                            </td>
                        </tr>
                    </thead>
                </table>
                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; margin-left: 5px;">
                    <tbody>
                        <tr>
                            <td style="vertical-align: top; width: 58%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Rec.No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['receipt_no']))
                                                {{ __($report['receipt_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Student Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['student']))
                                                {{ __("{$report['student']['first_name']} {$report['student']['middle_name']} {$report['student']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                                <strong>{{ __('Mode.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;">
                                                @if (!empty($report['refund_mode']))
                                                {{ __($report['refund_mode']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Father\'s Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['student']['father']))
                                                {{ __("{$report['student']['father']['first_name']} {$report['student']['father']['middle_name']} {$report['student']['father']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Class.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['student']['classroom']))
                                                {{ __($report['student']['classroom']['title']) }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding-left: 10px; vertical-align: top; width: 42%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;">
                                                <strong>{{ __('Date.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;">
                                                @if (!empty($report['refund_date']))
                                                {{ __($report['refund_date']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                                <strong>{{ __('Adm.No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;">
                                                @if (!empty($report['student']['admission_no']))
                                                {{ __($report['student']['admission_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 5px;">
                    <tr style="border: 1px solid #000; border-left: 0!important; border-right: 0!important;">
                        <th style="text-align: right; border-right: 1px solid #000; padding-right: 10px;">
                            <strong>
                                <small>{{ __('Particulars') }}</small>
                            </strong>
                        </th>
                        <th style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000;">
                            <strong>
                                <small>Amount (Rs.)</small>
                            </strong>
                        </th>
                    </tr>
                    @if (!empty($report) && count($report['refund_amounts']) > 0)
                    @foreach ($report['refund_amounts'] as $refundAmount)
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000;">
                            {{ __($refundAmount['fee_type']['fee_type'] ?? "") }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000;">
                            {{ __($refundAmount['refund_amount'] ?? 0) }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000;">
                            {{ __('Total Amount') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000;">
                            @if (!empty($report['total_amount']))
                            {{ __($report['total_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                </table>
                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 30px">
                    <tfoot>
                        <tr>
                            <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: left; padding-right: 10px; padding-left: 10px;">
                                <p>
                                    <strong>
                                        <small>
                                            @if (!empty($report['refund_note']))
                                            {{ __($report['refund_note']) }}
                                            @endif
                                        </small>
                                    </strong>
                                </p>
                            </td>
                            <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right; padding-right: 10px;">
                                <p>
                                    <strong>
                                        <small>
                                            @if (!empty($report['created_by']))
                                            {{ __("{$report['created_by']['first_name']} {$report['created_by']['middle_name']} {$report['created_by']['last_name']}") }}
                                            @endif
                                        </small>
                                    </strong>
                                </p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</body>

</html>
