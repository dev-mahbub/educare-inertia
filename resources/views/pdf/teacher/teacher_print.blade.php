<style>
    .table-border td {
        border: 1px solid rgba(241, 241, 241, 0.025);
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
</style>

@if ($staff != null)
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
                <td style="width: 10%; vertical-align: top; text-align: right;">
                    <img src="{{ $staff['staffProfileImage']['path'] ?? '' }}"
                        style="width: 85px; height: 80px; margin-top: 0px;" />
                </td>
            </tr>
        </thead>
    </table>
    <table class="table-border" style="width: 100%;margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:10px;">
                    Teacher Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%; padding:10px;">
                    Teacher Name :
                    <span style="font-weight: bold">
                        @if (!empty($staff))
                            {{ __("{$staff['first_name']} {$staff['middle_name']} {$staff['last_name']}") }}
                        @endif
                    </span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%; padding:10px;">
                    Father Name :
                    <span style="font-weight: bold">
                        @if (!empty($staff))
                            {{ __("{$staff['father_name']}") }}
                        @endif
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Phone No : <span style="font-weight: bold">{{ __($staff?->phone) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Email : <span style="font-weight: bold">{{ __($staff?->email) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Gender : <span style="font-weight: bold">{{ __($staff?->gender) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Date of birth : <span style="font-weight: bold">{{ __($staff?->birth_date_at) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Date of Joining : <span style="font-weight: bold">{{ __($staff?->join_date_at) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Date to Release : <span style="font-weight: bold">{{ __($staff?->leave_date_at) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Adhar No : <span style="font-weight: bold">{{ __($staff?->aadhar_card_no) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Religion : <span style="font-weight: bold">{{ __($staff?->religion?->name) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Blood Group : <span style="font-weight: bold">{{ __($staff?->bloodGroup?->name) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    House : <span
                        style="font-weight: bold">{{ __($staff?->house?->name) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Department : <span style="font-weight: bold">{{ __($staff?->department?->name) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Designation : <span style="font-weight: bold">{{ __($staff?->designation?->name) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Pan No : <span style="font-weight: bold">{{ __($staff?->pan_number) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Qualification : <span style="font-weight: bold">{{ __($staff?->qualification) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Voter No : <span style="font-weight: bold">{{ __($staff?->voter_card_no) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Adhar No : <span style="font-weight: bold">{{ __($staff?->aadhar_card_no) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Spouse's Name : <span style="font-weight: bold">{{ __($staff?->spouse_name) }}</span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    Emp Id : <span style="font-weight: bold">{{ __($staff?->employee_id) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%;padding: 10px;">
                    UAN ID : <span style="font-weight: bold">{{ __($staff?->uan) }}</span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%; margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding: 10px;">
                    Present Address
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td colspan="2" style="font-size: 12px; font-weight: 500; width: 100%; padding: 10px;">
                    Address :
                    <span style="font-weight: bold">
                        {{ __($staff?->address) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 12px; font-weight: 500; width: 50%; padding: 10px;">
                    City :
                    <span style="font-weight: bold">
                        {{ __($staff?->city) }}
                    </span>
                </td>
                <td style="font-size: 12px; font-weight: 500; width: 50%; padding: 10px;">
                    State :
                    <span style="font-weight: bold">
                        {{ __($staff?->state?->name) }}
                    </span>
                </td>
            </tr>
          
        </tbody>
    </table>
@endif
