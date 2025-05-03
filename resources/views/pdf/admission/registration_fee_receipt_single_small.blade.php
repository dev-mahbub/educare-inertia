<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Registration Receipt</title>

    <style>
        @media print {

            #printButtonWrapper,
            #printButton {
                display: none;
            }
        }

        @page {
            margin: .5cm 0cm;
        }
    </style>

</head>

<body>
    <div id="wrapper" style="max-width:750px; margin: 0 auto; padding: 0px 5px;font-size:10px;">
        <div id="printButtonWrapper" style="width: 48%; padding: 15px 5px; margin-left: 230px;">
            <input id="printButton" type="button" value="Print" onclick="window.print()" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>

        <div style="width: 100%; float: left; padding: 0 5px;">
            <div style="width: 340px; margin: auto; border: 2px solid #000; padding: 5px;">
                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                    <thead>
                        <tr style="width:100%;">
                            <td style="width:15%; vertical-align:middle;">
                                <img style="max-width:100%" src="{{ $school?->logo?->path ?? '' }}">
                            </td>
                            <td style="width:70%; vertical-align:middle;">
                                <table style="text-align:center; width:100%">
                                    <tr>
                                        <td>
                                            <h1 style="margin: 0; font-size:16px;">{{ $school->title }}</h1>
                                        </td>
                                    </tr>
                                    <tr style="font-size:11px;">
                                        <td>
                                            <span>
                                                {{ $school?->street_address }},
                                            </span>
                                            <span>Ph:
                                                @if (!empty($school->phone))
                                                {{ $school->phone }},
                                                @endif
                                                @if (!empty($school->phone_2))
                                                {{ $school->phone_2 }}
                                                @endif
                                            </span>
                                            <br>
                                            <span>
                                                Website: {{ $school?->domain_url }},
                                            </span>
                                            <span>
                                                Email: {{ $school?->mail }}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width:15%;"></td>
                        </tr>
                        <tr>
                            <td style="width:15%;"></td>
                            <td style="width:70%;">
                                <table style="text-align:center; width:100%">
                                    <tr>
                                        <td>
                                            <h2 style="margin: 0; font-size:14px;">{{ __($school?->academic_year) }}</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 100%; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                            <h3 style="margin: 0;">{{ __('Reg. Receipt (Student Copy)') }}</h3>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width:15%;"></td>
                        </tr>
                    </thead>
                </table>

                <br>

                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="width:47%; vertical-align: top;">
                                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                                {{ __('Registration No') }}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ __($enquiry?->registration_no) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                                {{ __('Student Name')}}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ $enquiry->student_first_name }} {{ $enquiry->student_middle_name }} {{ $enquiry->student_last_name }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                                {{ __('Father Name')}}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ $enquiry->father_first_name }} {{ $enquiry->father_middle_name }} {{ $enquiry->father_last_name }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                                {{ __('Class / Sec') }}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ $enquiry->classTitle }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="width:47%; padding-left:10px; vertical-align: top;">
                                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                                {{ __('Receipt No ') }}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ __($enquiry?->receipt_no) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px; width:50%;">
                                                {{ __('Receipt Date') }}
                                            </td>
                                            <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                                {{ __($enquiry?->receipt_date) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br>

                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <th style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:50%;">
                                <h4 style="margin: 0;">
                                    {{ __('Particulars') }}
                                </h4>
                            </th>
                            <th style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700; width:50%;">
                                <h4 style="margin: 0;">
                                    {{ __('Amount(Rs.) ') }}
                                </h4>
                            </th>
                        </tr>
                        <tr>
                            <td style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:50%;">
                                {{ __('Registration Fee') }}
                            </td>
                            <td style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:50%;">
                                {{ $enquiry->academic_fee ?? 0}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;width:100%;">
                                <h4 style="margin: 0;">
                                    {{ __('Mode of Payment: '. $enquiry?->payment_mode) }}
                                </h4>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br>

                <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                    <tfoot>
                        <tr>
                            <td style="margin:0; padding:0; width:50%; text-align:left;">
                                <h4 style="margin: 0">Note:</h4>
                                <p style="margin:2px 0px 0px; font-size:11px;">{{ __($enquiry['payment_note'] ?? "") }}</p>
                            </td>
                            <td style="margin:0; padding:0; width:50%; text-align:right;">
                                <h4 style="margin: 0;">
                                    {{ __('Auth. Signatory') }}
                                </h4>
                                <span>{{ __($enquiry['created_by'] ?? "") }}</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</body>

</html>