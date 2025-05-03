<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Salary Slip</title>

    <style>
        * {
            font-size: 12px;
            font-family: "'Inter', sans-serif";
        }

        @media print {

            #printButtonWrapper,
            #printButton {
                display: none;
            }

            #wrapper {
                padding: 0px !important;
                margin-top: 0px !important;
                width: 780px !important;
                max-width: 780px !important;
            }

            .single-slip-item {
                page-break-after: always;
                margin-top: 5px !important;
                margin-bottom: 0px !important;
            }
        }

        @page {
            size: A4;
        }

        @page rotated {
            size: A4;
        }

        @page {
            margin: 0cm;
        }
    </style>
</head>

<body>
    <div id="wrapper" style="max-width:735px; margin: 0 auto; padding: 15px 30px;font-size:10px; margin-top:40px;">
        <div id="printButtonWrapper" style="width: 100%; padding: 15px 5px; margin-left: 15px; text-align: right;">
            <input id="printButton" type="button" value="Print" onclick="window.print();"
                style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>

        @if (count($staffSalaryPayments) > 0)
        @foreach ($staffSalaryPayments as $staffSalaryPayment)
        <div class="single-slip-item" style="border: 1px solid gray; margin-bottom: 10px;">
            <div>
                <div>
                    <table style="width: 100%; font-family: 'Inter', sans-serif; padding: 25px 30px 10px 30px;">
                        <thead>
                            <tr style="width: 100%;">
                                <td colspan="3" style="text-align:right; ">
                                    <span style="font-size:16px; font-weight:600; text-decoration: underline;">Employee Copy</span>
                                </td>
                            </tr>
                            <tr style="width: 100%;">
                                <td style="width: 18%; vertical-align: top; text-align: left;">
                                    <!-- <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                                        style="width: 85px; height: 80px; margin-top: 0px;" /> -->
                                    <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                                        style="max-width: 100%; max-height:80px; object-fit: cover; margin-top: 0px;" />
                                </td>
                                <td style="width: 64%; vertical-align: top; text-align: center;">
                                    <table style="text-align: center; width: 100%; font-weight:bold; font-size:14px">
                                        <tr>
                                            <td>
                                                <h2 style="font-size:24px; margin:0 0 0px 0;">
                                                    {{ __($schoolData['title'] ?? '') }}
                                                </h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Address: {{ __($schoolData['street_address'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Affiliation No: {{ __($schoolData['affiliation_no'] ?? '') }}, UDISE CODE: {{ __($schoolData['udise_code'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Ph: {{ __($schoolData['phone'] ?? '') }}, Email: {{ __($schoolData['mail'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 18%; vertical-align: top; text-align: right;"></td>
                            </tr>
                        </thead>
                    </table>
                    <table style="width: 100%; margin-top: -25px">
                        <tbody>
                            <tr>
                                <td>
                                    <h2
                                        style="font-size:24px; text-align: center; vertical-align: center; text-decoration: underline;">
                                        Salary Slip
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 55%;">
                                    <table
                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 10px;">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align: top; width: 50%;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Name') }}</strong>
                                                                </td>
                                                                <td style="width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->first_name.' '.$staffSalaryPayment?->staff?->middle_name.' '.$staffSalaryPayment?->staff?->last_name) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('PF No') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->pf_account_number) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('UAN') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->uan) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Payment Date') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->payment_date) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 5px; vertical-align: top; width: 50%;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Pay Slip') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->paymentMonth?->title) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Bank Name') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->bank_name) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Account Number') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->bank_account_no) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Designation') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->designation?->name) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="border: 1px solid lightgray; margin: 2px;">
                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                            <thead style="width: 100%; background-color: lightgray;">
                                <th style=" padding: 3px; font-size: 14px">LEAVE DETAILS</th>
                            </thead>
                        </table>
                        <table>
                            <tbody style="width: 100%;">
                                <tr style="width: 100%;">
                                    <table
                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 0 10px;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="vertical-align: top; width: 50%; border-right: 1px solid lightgray;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(i) Total Leave Taken') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_absent ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(ii) Leave Entitled in Year') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_leave ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px;">
                                                                    @if ($staffSalaryPayment?->staff?->staffLeaveAllocations?->count() > 0)
                                                                    <table style="width:100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                @foreach ($staffSalaryPayment?->staff?->staffLeaveAllocations as $index => $leaveAllocation)
                                                                                <td
                                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px;">
                                                                                    <strong style="{{ $index == 0 ? 'margin-left: 15px;' : '' }}  font-size: 14px">{{ __($leaveAllocation?->leaveType?->title) }}</strong> ({{ __(number_format($leaveAllocation?->days ?? 0, 1)) }})
                                                                                </td>
                                                                                @endforeach
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    @endif
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(A) Balance / Extra Leave') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">{{ __(number_format($staffSalaryPayment->total_leave - $staffSalaryPayment->total_absent, 2, '.', '')) }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(iii) Extra Duty') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td
                                                    style="border-left: 1px solid lightgray; vertical-align: top; width: 2%; padding-left: 10px;">
                                                </td>
                                                <td
                                                    style=" border-left: 1px solid lightgray; vertical-align: top; width: 50%; padding-left: 20px;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Already Deducted') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_absent_deduction ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('DEDEUCTED IN CURRENT MONTH') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_deducted_absent ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Balance Leave') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->leave_balance ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Already Paid') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Paid in current month') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_paid_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin: 10px 15px 10px -5px">
                        <div>
                            <table>
                                <tbody style="width: 100%;">
                                    <tr style="width: 100%;">
                                        <table
                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 0 10px;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="vertical-align: top; width: 49%; border: 1px solid lightgray;">
                                                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                                                            <thead style="width: 100%; background-color: lightgray;">
                                                                <th style=" padding: 3px; font-size: 14px">EARNING</th>
                                                            </thead>
                                                        </table>
                                                        <table
                                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                            <tbody>
                                                                @if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0)
                                                                @foreach ($staffSalaryPayment?->staffSalaryPaymentEarnings as $earning)
                                                                <tr>
                                                                    <td
                                                                        style="margin-left: 10px;  padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __($earning?->earningType?->title) }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($earning?->amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endforeach
                                                                @endif

                                                                @if ($staffSalaryPayment->bonus_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Bonus') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->bonus_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->paid_due_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Previous Due') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->paid_due_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->advance_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Advance Payment') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->advance_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->total_extra_duty > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Extra Duty') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->extra_duty_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px"> {{ __('Total Earning') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __(number_format(($staffSalaryPayment?->total_earning_amount + ($staffSalaryPayment->bonus_amount ?? 0) +
                                                                            ($staffSalaryPayment->paid_due_amount ?? 0) +
                                                                            ($staffSalaryPayment->extra_duty_amount ?? 0) + ($staffSalaryPayment->advance_amount ?? 0)), 2, '.', '')) }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>

                                                                @if ($staffSalaryPayment->due_amount > 0)
                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px"> {{ __('Remaining Balance') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __($staffSalaryPayment->due_amount ?? '0.00') }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                                @endif
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="vertical-align: top; width: 2%;"></td>
                                                    <td
                                                        style=" border: 1px solid lightgray; vertical-align: top; width: 44%;">
                                                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                                                            <thead style="width: 100%; background-color: lightgray;">
                                                                <th style=" padding: 3px; font-size: 14px">DEDUCTION
                                                                </th>
                                                            </thead>
                                                        </table>
                                                        <table
                                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                            <tbody>
                                                                @if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0)
                                                                @foreach ($staffSalaryPayment?->staffSalaryPaymentDeductions as $deduction)
                                                                <tr>
                                                                    <td
                                                                        style="margin-left: 10px;  padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __($deduction?->deductionType?->title) }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($deduction?->amount) }}
                                                                    </td>
                                                                </tr>
                                                                @endforeach
                                                                @endif

                                                                @if ($staffSalaryPayment->advance_deducted_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Advance Payment Deduction') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->advance_deducted_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->payable_amount - $staffSalaryPayment->paid_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Due') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->due_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px">{{ __('Total Deduction') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __(number_format(($staffSalaryPayment?->total_deduction_amount + ($staffSalaryPayment->absent_deduction_amount ?? 0) + ($staffSalaryPayment->advance_deducted_amount ?? 0) +
                                                                                (($staffSalaryPayment->payable_amount - $staffSalaryPayment->paid_amount > 0) ? ($staffSalaryPayment->due_amount ?? 0) : 0)), 2, '.', '')) }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <table style="width: 99%; margin: 4px"> -->
                        <table style="width: 100%; margin: 4px 0px 4px 10px;">
                            <thead style="width: 100%; background-color: lightgray;">
                                <td style=" padding: 5px 10px; font-size: 14px">
                                    <strong style="width: 85%; float: left; font-size: 16px">Paid Net Salary</strong>
                                    <strong style="width: 15%; float: right; font-size: 16px">
                                        {{ __($staffSalaryPayment?->paid_amount ?? '0.00') }}/-
                                    </strong>
                                </td>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        @if ($isWithOfficeCopy == true)
        <div class="single-slip-item" style="border: 1px solid gray; margin-bottom: 10px;">
            <div>
                <div>
                    <table style="width: 100%; font-family: 'Inter', sans-serif; padding: 25px 30px 10px 30px;">
                        <thead>
                            <tr style="width: 100%;">
                                <td colspan="3" style="text-align:right; ">
                                    <span style="font-size:16px; font-weight:600; text-decoration: underline;">Office Copy</span>
                                </td>
                            </tr>
                            <tr style="width: 100%;">
                                <td style="width: 18%; vertical-align: top; text-align: left;">
                                    <!-- <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                                        style="width: 85px; height: 80px; margin-top: 0px;" /> -->
                                    <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                                        style="max-width: 100%; max-height:80px; object-fit: cover; margin-top: 0px;" />
                                </td>
                                <td style="width: 64%; vertical-align: top; text-align: center;">
                                    <table style="text-align: center; width: 100%; font-weight:bold; font-size:14px">
                                        <tr>
                                            <td>
                                                <h2 style="font-size:24px; margin:0 0 0px 0;">
                                                    {{ __($schoolData['title'] ?? '') }}
                                                </h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Address: {{ __($schoolData['street_address'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Affiliation No: {{ __($schoolData['affiliation_no'] ?? '') }}, UDISE CODE: {{ __($schoolData['udise_code'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; margin:0px;">
                                                    Ph: {{ __($schoolData['phone'] ?? '') }}, Email: {{ __($schoolData['mail'] ?? '') }}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 18%; vertical-align: top; text-align: right;"></td>
                            </tr>
                        </thead>
                    </table>
                    <table style="width: 100%; margin-top: -25px">
                        <tbody>
                            <tr>
                                <td>
                                    <h2
                                        style="font-size:24px; text-align: center; vertical-align: center; text-decoration: underline;">
                                        Salary Slip
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 55%;">
                                    <table
                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 10px;">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align: top; width: 50%;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Name') }}</strong>
                                                                </td>
                                                                <td style="width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->first_name.' '.$staffSalaryPayment?->staff?->middle_name.' '.$staffSalaryPayment?->staff?->last_name) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('PF No') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->pf_account_number) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('UAN') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->uan) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Payment Date') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->payment_date) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 5px; vertical-align: top; width: 50%;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Pay Slip') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->paymentMonth?->title) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Bank Name') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->bank_name) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Account Number') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->bank_account_no) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 33%;">
                                                                    <strong style="font-size: 14px">{{ __('Designation') }}</strong>
                                                                </td>
                                                                <td style=" width: 4%;">:</td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 63%;">
                                                                    {{ __($staffSalaryPayment?->staff?->designation?->name) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="border: 1px solid lightgray; margin: 2px;">
                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                            <thead style="width: 100%; background-color: lightgray;">
                                <th style=" padding: 3px; font-size: 14px">LEAVE DETAILS</th>
                            </thead>
                        </table>
                        <table>
                            <tbody style="width: 100%;">
                                <tr style="width: 100%;">
                                    <table
                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 0 10px;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="vertical-align: top; width: 50%; border-right: 1px solid lightgray;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(i) Total Leave Taken') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_absent ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(ii) Leave Entitled in Year') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_leave ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px;">
                                                                    @if ($staffSalaryPayment?->staff?->staffLeaveAllocations?->count() > 0)
                                                                    <table style="width:100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                @foreach ($staffSalaryPayment?->staff?->staffLeaveAllocations as $index => $leaveAllocation)
                                                                                <td
                                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px;">
                                                                                    <strong style="{{ $index == 0 ? 'margin-left: 15px;' : '' }}  font-size: 14px">{{ __($leaveAllocation?->leaveType?->title) }}</strong> ({{ __(number_format($leaveAllocation?->days ?? 0, 1)) }})
                                                                                </td>
                                                                                @endforeach
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    @endif
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(A) Balance / Extra Leave') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">{{ __(number_format($staffSalaryPayment->total_leave - $staffSalaryPayment->total_absent, 2, '.', '')) }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('(iii) Extra Duty') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td
                                                    style="border-left: 1px solid lightgray; vertical-align: top; width: 2%; padding-left: 10px;">
                                                </td>
                                                <td
                                                    style=" border-left: 1px solid lightgray; vertical-align: top; width: 50%; padding-left: 20px;">
                                                    <table
                                                        style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Already Deducted') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_absent_deduction ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('DEDEUCTED IN CURRENT MONTH') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_deducted_absent ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Balance Leave') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->leave_balance ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Already Paid') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_previous_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%;">
                                                                    {{ __('Paid in current month') }}
                                                                </td>
                                                                <td
                                                                    style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%;">
                                                                    <strong style="font-size: 14px">
                                                                        {{ __($staffSalaryPayment->total_paid_extra_duty ?? '0.00') }}
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin: 10px 15px 10px -5px">
                        <div>
                            <table>
                                <tbody style="width: 100%;">
                                    <tr style="width: 100%;">
                                        <table
                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin: 0 10px;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="vertical-align: top; width: 49%; border: 1px solid lightgray;">
                                                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                                                            <thead style="width: 100%; background-color: lightgray;">
                                                                <th style=" padding: 3px; font-size: 14px">EARNING</th>
                                                            </thead>
                                                        </table>
                                                        <table
                                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                            <tbody>
                                                                @if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0)
                                                                @foreach ($staffSalaryPayment?->staffSalaryPaymentEarnings as $earning)
                                                                <tr>
                                                                    <td
                                                                        style="margin-left: 10px;  padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __($earning?->earningType?->title) }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($earning?->amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endforeach
                                                                @endif

                                                                @if ($staffSalaryPayment->bonus_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Bonus') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->bonus_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->paid_due_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Previous Due') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->paid_due_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->advance_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Advance Payment') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->advance_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->total_extra_duty > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Extra Duty') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->extra_duty_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px"> {{ __('Total Earning') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __(number_format(($staffSalaryPayment?->total_earning_amount + ($staffSalaryPayment->bonus_amount ?? 0) +
                                                                            ($staffSalaryPayment->paid_due_amount ?? 0) +
                                                                            ($staffSalaryPayment->extra_duty_amount ?? 0) + ($staffSalaryPayment->advance_amount ?? 0)), 2, '.', '')) }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>

                                                                @if ($staffSalaryPayment->due_amount > 0)
                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px"> {{ __('Remaining Balance') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __($staffSalaryPayment->due_amount ?? '0.00') }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                                @endif
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="vertical-align: top; width: 2%;"></td>
                                                    <td
                                                        style=" border: 1px solid lightgray; vertical-align: top; width: 44%;">
                                                        <table style="width: 100%; border-bottom: 1px solid lightgray">
                                                            <thead style="width: 100%; background-color: lightgray;">
                                                                <th style=" padding: 3px; font-size: 14px">DEDUCTION
                                                                </th>
                                                            </thead>
                                                        </table>
                                                        <table
                                                            style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                                            <tbody>
                                                                @if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0)
                                                                @foreach ($staffSalaryPayment?->staffSalaryPaymentDeductions as $deduction)
                                                                <tr>
                                                                    <td
                                                                        style="margin-left: 10px;  padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __($deduction?->deductionType?->title) }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($deduction?->amount) }}
                                                                    </td>
                                                                </tr>
                                                                @endforeach
                                                                @endif

                                                                @if ($staffSalaryPayment->advance_deducted_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Advance Payment Deduction') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->advance_deducted_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if ($staffSalaryPayment->payable_amount - $staffSalaryPayment->paid_amount > 0)
                                                                <tr>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        {{ __('Due') }}
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        {{ __($staffSalaryPayment->due_amount ?? '0.00') }}
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                <tr style="border-top: 1px solid lightgray">
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 80%; padding-left: 10px">
                                                                        <strong style="font-size: 14px">{{ __('Total Deduction') }}</strong>
                                                                    </td>
                                                                    <td
                                                                        style="margin-bottom: 0px; padding-bottom: 3px; font-size: 14px; width: 20%; text-align:right;">
                                                                        <strong style="font-size: 14px">
                                                                            {{ __(number_format(($staffSalaryPayment?->total_deduction_amount + ($staffSalaryPayment->absent_deduction_amount ?? 0) + ($staffSalaryPayment->advance_deducted_amount ?? 0) +
                                                                                (($staffSalaryPayment->payable_amount - $staffSalaryPayment->paid_amount > 0) ? ($staffSalaryPayment->due_amount ?? 0) : 0)), 2, '.', '')) }}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <table style="width: 99%; margin: 4px"> -->
                        <table style="width: 100%; margin: 4px 0px 4px 10px;">
                            <thead style="width: 100%; background-color: lightgray;">
                                <td style=" padding: 5px 10px; font-size: 14px">
                                    <strong style="width: 85%; float: left; font-size: 16px">Paid Net Salary</strong>
                                    <strong style="width: 15%; float: right; font-size: 16px">
                                        {{ __($staffSalaryPayment?->paid_amount ?? '0.00') }}/-
                                    </strong>
                                </td>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        @endif

        @endforeach
        @endif

    </div>
</body>

</html>
