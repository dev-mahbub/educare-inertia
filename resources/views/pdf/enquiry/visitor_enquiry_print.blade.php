<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student Gate Pass</title>
</head>



<style>
    .table-border td {
        border: 1px solid rgba(241, 241, 241, 0.025);
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
</style>

<body>

    @if ($studentGatePass != null)
        <table
            style="width: 100%; font-family: 'Inter', sans-serif; padding-top: 5px; padding-bottom: 5px; border-bottom: 0;">
            <thead>
                <tr style="width: 100%;">
                    <td style="width: 10%; vertical-align: top; text-align: left;">
                        <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                            style="width: 85px; height: 80px; margin-top: 0px;" />
                    </td>
                    <td style="width: 90%; vertical-align: top; text-align: center;">
                        <table>
                            <tr>
                                <td style="font-size: 11px; font-weight: 400;">
                                    <h3>
                                        @if (!empty($schoolData['title']))
                                            {{ __($schoolData['title']) }}
                                        @endif
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 11px; font-weight: 400;">
                                    <h3>
                                        @if (!empty($schoolData['street_address']))
                                            {{ __($schoolData['street_address']) }}
                                        @endif
                                    </h3>
                                    <h3>
                                        Ph: @if (!empty($schoolData['phone']))
                                            {{ __($schoolData['phone']) }}
                                        @endif

                                        Email:
                                        @if (!empty($schoolData['mail']))
                                            {{ __($schoolData['mail']) }}
                                        @endif
                                    </h3>
                                    <h4>Session-
                                        @if (!empty($schoolData['academic_year']))
                                            {{ __($schoolData['academic_year']) }}
                                        @endif
                                    </h4>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 10%; vertical-align: top; text-align: right;"></td>
                </tr>
            </thead>
        </table>

        <table>
            <tbody>
                <tr>
                    <td style="width: 46%;padding:10px;">
                        {{ __('Student Gate Pass') }} :
                        @if (!empty($studentGatePass))
                            {{ $studentGatePass?->id }}
                        @endif
                    </td>

                    <td style="width: 46%;padding:10px; text-align:right">
                        {{ __('In date') }} :
                        @if (!empty($studentGatePass))
                            {{ $studentGatePass?->in_date_at }}
                        @endif

                        {{ __('In Time') }} :
                        @if (!empty($studentGatePass))
                            {{ $studentGatePass?->in_time_at }}
                        @endif

                        {{ __('Out date') }} :
                        @if (!empty($studentGatePass))
                            {{ $studentGatePass?->out_date_at }}
                        @endif

                        {{ __('Out Time') }} :
                        @if (!empty($studentGatePass))
                            {{ $studentGatePass?->out_time_at }}
                        @endif
                    </td>
                </tr>
            </tbody>
        </table>

        <br>
        <br>

        <table style="width:100%;" cellspacing="0">
            <tbody>
                <tr>
                    <td style="width: 46%;padding:10px; border: 1px solid #000; vertical-align: top;">
                        <table class="Student-details" style="width: 100%;">
                            <tbody>
                                <tr>
                                    <td style="vertical-align: top; width: 70px;padding-top: 8px;">
                                        @if (!empty($studentGatePass?->student?->studentImage))
                                            <img src="{{ $studentGatePass?->student?->studentImage->path }}"
                                                style="width: 70px;border: 1px solid #000;height: 95px;max-width: 65px;max-height: 75px;">
                                        @endif
                                    </td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 35%; font-weight: 600;">{{ __('Student') }}</td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->student))
                                                            {{ $studentGatePass?->student?->first_name }}
                                                            {{ $studentGatePass?->student?->last_name }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%; font-weight: 600;">{{ __('Admission No') }}
                                                    </td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->student))
                                                            {{ $studentGatePass?->student?->admission_no }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%; font-weight: 600;">{{ __('Email') }}</td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 72%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->student))
                                                            {{ $studentGatePass?->student?->email }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%; font-weight: 600;">{{ __('Class') }}</td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass?->classroom))
                                                            {{ $studentGatePass?->classroom?->title }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%; font-weight: 600;">{{ __('Phone') }}</td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->student))
                                                            {{ $studentGatePass?->student?->phone }}
                                                        @endif
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>

                    <td style="width: 2%; border: none;">&nbsp;</td>
                    <td style="width: 40%;padding:10px; border: 1px solid #000; vertical-align: top;">
                        <table class="Student-details" style="width: 100%;">
                            <tbody>
                                <tr>
                                    <td style="width:80px;vertical-align: top;">
                                        @if (!empty($studentGatePass?->visitorImage))
                                            <img src="{{ $studentGatePass?->visitorImage->path }}"
                                                style="height: 70px;width: 70px;border: 1px solid #000;max-width: 65px; max-height: 67px;margin-top:11px">
                                        @endif
                                    </td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 30%;"><b>{{ __('Visiting Person') }}</b></td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 85%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->visiting_person))
                                                            {{ $studentGatePass?->visiting_person }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%;"><b> {{ __('Relation') }}</b></td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->relation_type))
                                                            {{ $studentGatePass?->relation_type }}
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 35%;"><b>{{ __('Phone') }}</b></td>
                                                    <td style="width: 5%;">:</td>
                                                    <td style="width: 60%;font-family:sans-serif;">
                                                        @if (!empty($studentGatePass->phone))
                                                            {{ $studentGatePass?->phone }}
                                                        @endif
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
        
        <table style="width: 100%; margin-top:10px" cellspacing="0">
            <tbody>
                <tr>
                    <td>
                        <span style="font-size: 15px; font-weight: 900">
                            {{ __('Reason ') }} :  
                        </span>
                        @if (!empty($studentGatePass->reason_gate_pass))
                            {{ $studentGatePass?->reason_gate_pass }}
                        @endif
                    </td> 
                </tr>
            </tbody>
        </table>

        <br>
        <br>
        <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
            <tfoot>
                <tr>
                    <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: center;">
                        <p>{{ __('CLASS TEACHER') }}</p>
                        <small>{{ __('Signature') }}</small>
                    </td>
                    <td style="margin:0; padding:0; vertical-align:bottom; width:33%; text-align: center;">
                        <p>{{ __('HEAD MASTER / PRINCIPAL') }}</p>
                        <small>{{ __('Signature') }}</small>
                    </td>
                    <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: center;">
                        <p>{{ __('PARENT') }}</p>
                        <small>{{ __('Signature') }}</small>
                    </td>
                </tr>
            </tfoot>
        </table>
    @endif

</body>

</html>
