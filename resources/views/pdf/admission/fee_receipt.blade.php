<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Receipt</title>
</head>

<body>
    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
        <thead>
            <tr style="width:100%;">
                <td style="width:20%; vertical-align:middle;">
                    <img src="{{ $school?->logo?->path ?? '' }}">
                </td>
                <td style="width:60%; vertical-align:top;">
                    <table style="text-align:center; width:100%">
                        <tr>
                            <td>
                                <h1>{{ $school->title }}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    @if (!empty($school->phone))
                                    {{ $school->phone }},
                                    @endif
                                    @if (!empty($school->phone_2))
                                    {{ $school->phone_2 }},
                                    @endif
                                    @if (!empty($school->mail))
                                    {{ $school->mail }},
                                    @endif
                                </span>
                                <br>
                                <span>
                                    Affiliation No: {{ $school->affiliation_no }},
                                </span>
                                <span>
                                    UDISE Code: {{ $school->udise_code }}
                                </span>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td style="padding-top: 5px;padding-bottom: 5px;">
                                <h2>{{ __("(".$school?->academic_year.")") }}</h2>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td style="padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                <h3>{{ __('Registration Receipt  (Student Copy)') }}</h3>
                            </td>
                        </tr> -->
                    </table>
                </td>
                <td style="width:20%;"></td>
            </tr>
            <tr>
                <td style="width:20%;"></td>
                <td style="width:60%;">
                    <table style="text-align:center; width:100%">
                        <tr>
                            <td style="padding-top: 5px;padding-bottom: 5px;">
                                <h2>{{ __("(".$school?->academic_year.")") }}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                <h3>{{ __('Registration Receipt  (Student Copy)') }}</h3>
                            </td>
                        </tr>
                    </table>
                </td>
                <td style="width:20%;"></td>
            </tr>
        </thead>
    </table>

    <br>

    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
        <tbody>
            <tr>
                <td style="width:47%;">
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
                <td style="width:47%; padding-left:10px;">
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
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px; width:50%;">
                                    {{ __('Billing Period') }}
                                </td>
                                <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                    {{ __('') }}
                                </td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px; width:50%;">
                                    {{ __('Session') }}
                                </td>
                                <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                    {{ $enquiry?->admissionAcademicYear?->academic_session ?? "" }}
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
                    <h4>
                        {{ __('Fee Head ') }}
                    </h4>
                </th>
                <th style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700; width:50%;">
                    <h4>
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
                    <h4>
                        {{ __('Mode of Payment: '. $enquiry?->payment_mode) }}
                    </h4>
                </td>
            </tr>
        </tbody>
    </table>

    <br>

    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse; margin-top:35px;">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:50%; text-align:center;">
                    <h4>
                        {{ __('Auth. Signatory') }}
                    </h4>
                </td>
                <td style="margin:0; padding:0; width:50%; vertical-align:bottom; text-align:right;">
                </td>
            </tr>
            <tr>
                <td style="margin:0; padding:0; width:50%; text-align:left;">
                    <p>
                        <sup style="font-size: 12px;">*</sup>
                        {{ __('Cheques/Demand Drafts are subject to realization') }}
                    </p>
                </td>
                <td style="margin:0; padding:0; width:50%; vertical-align:bottom; text-align:right;">
                </td>
            </tr>
        </tfoot>
    </table>

    <p style="border-bottom: 1px dashed #ddd; margin-top:50px; margin-bottom:50px"></p>

    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
        <thead>
            <tr style="width:100%;">
                <td style="width:20%; vertical-align:middle;">
                    <img src="{{ $school?->logo?->path ?? '' }}">
                </td>
                <td style="width:60%; vertical-align:top;">
                    <table style="text-align:center; width:100%">
                        <tr>
                            <td>
                                <h1>{{ $school->title }}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    @if (!empty($school->phone))
                                    {{ $school->phone }},
                                    @endif
                                    @if (!empty($school->phone_2))
                                    {{ $school->phone_2 }},
                                    @endif
                                    @if (!empty($school->mail))
                                    {{ $school->mail }},
                                    @endif
                                </span>
                                <br>
                                <span>
                                    Affiliation No: {{ $school->affiliation_no }},
                                </span>
                                <span>
                                    UDISE Code: {{ $school->udise_code }}
                                </span>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td style="padding-top: 5px;padding-bottom: 5px;">
                                <h2>{{ __("(".$school?->academic_year.")") }}</h2>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td style="padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                <h3>{{ __('Registration Receipt  (Office Copy)') }}</h3>
                            </td>
                        </tr> -->
                    </table>
                </td>
                <td style="width:20%;"></td>
            </tr>
            <tr>
                <td style="width:20%;"></td>
                <td style="width:60%;">
                    <table style="text-align:center; width:100%">
                        <tr>
                            <td style="padding-top: 5px;padding-bottom: 5px;">
                                <h2>{{ __("(".$school?->academic_year.")") }}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                <h3>{{ __('Registration Receipt  (Office Copy)') }}</h3>
                            </td>
                        </tr>
                    </table>
                </td>
                <td style="width:20%;"></td>
            </tr>
        </thead>
    </table>

    <br>

    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
        <tbody>
            <tr>
                <td style="width:47%;">
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
                <td style="width:47%; padding-left:10px;">
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
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px; width:50%;">
                                    {{ __('Billing Period') }}
                                </td>
                                <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                    {{ __('') }}
                                </td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px; width:50%;">
                                    {{ __('Session') }}
                                </td>
                                <td style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                    {{ $enquiry?->admissionAcademicYear?->academic_session ?? "" }}
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
                    <h4>
                        {{ __('Fee Head ') }}
                    </h4>
                </th>
                <th style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700; width:50%;">
                    <h4>
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
                    <h4>
                        {{ __('Mode of Payment: '. $enquiry?->payment_mode) }}
                    </h4>
                </td>
            </tr>
        </tbody>
    </table>

    <br>

    <table style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse; margin-top:35px;">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:50%; text-align:center;">
                    <h4>
                        {{ __('Auth. Signatory') }}
                    </h4>
                </td>
                <td style="margin:0; padding:0; width:50%; vertical-align:bottom; text-align:right;">
                </td>
            </tr>
            <tr>
                <td style="margin:0; padding:0; width:50%; text-align:left;">
                    <p>
                        <sup style="font-size: 12px;">*</sup>
                        {{ __('Cheques/Demand Drafts are subject to realization') }}
                    </p>
                </td>
                <td style="margin:0; padding:0; width:50%; vertical-align:bottom; text-align:right;">
                </td>
            </tr>
        </tfoot>
    </table>
</body>

</html>