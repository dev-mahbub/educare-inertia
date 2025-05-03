<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Advance Pay Slip</title>
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
        <div style="border: 1px solid gray;">
            <div>
                <div>
                    <table style="width: 100%; font-family: 'Inter', sans-serif; padding: 25px 30px 10px 30px;">
                        <thead>
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
                                        Advance Pay Slip
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <div style="width: 55%;">
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
                                                                    {{ __($staffAdvancePayment?->staff?->first_name.' '.$staffAdvancePayment?->staff?->middle_name.' '.$staffAdvancePayment?->staff?->last_name) }}
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
                                                                    {{ __($staffAdvancePayment?->staff?->pf_account_number) }}
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
                                                                    {{ __($staffAdvancePayment?->staff?->uan) }}
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
                                                                    {{ __($staffAdvancePayment?->payment_date) }}
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
                                                                    {{ __($staffAdvancePayment?->paymentMonth?->title) }}
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
                                                                    {{ __($staffAdvancePayment?->staff?->bank_name) }}
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
                                                                    {{ __($staffAdvancePayment?->staff?->bank_account_no) }}
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
                                                                    {{ __($staffAdvancePayment?->staff?->designation?->name) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <table style="width: 99%; margin: 4px">
                            <thead style="width: 100%; background-color: lightgray;">
                                <td style=" padding: 5px 10px; font-size: 14px">
                                    <strong style="width: 85%; float: left; font-size: 16px">Paid Amount</strong>
                                    <strong style="width: 15%; float: right; font-size: 16px">{{ $staffAdvancePayment->paid_amount ?? 0 }}/-</strong>
                                </td>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
