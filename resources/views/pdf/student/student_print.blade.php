<style>
    .table-border td {
        border: 1px solid rgba(241, 241, 241, 0.025);
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
</style>
@if ($student != null)
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
                                <h4>Admission Form</h4>
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
                    <img src="{{ $student['studentImage']['path'] ?? '' }}"
                        style="width: 85px; height: 80px; margin-top: 0px;" />
                </td>
            </tr>
        </thead>
    </table>
    <table class="table-border" style="width: 100%;margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:7px;">
                    Student Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Student Name :
                    <span style="font-weight: bold">
                        @if (!empty($student))
                            {{ __("{$student['first_name']} {$student['middle_name']} {$student['last_name']}") }}
                        @endif
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Admission No :
                    <span style="font-weight: bold">
                        @if (!empty($student['admission_no']))
                            {{ __($student['admission_no']) }}
                        @endif
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Class : <span style="font-weight: bold">
                        {{ __($student?->classroom?->title) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Roll No : <span style="font-weight: bold">
                        {{ __($student?->classroomRoll?->roll_no) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Gender : <span style="font-weight: bold">{{ __($student?->gender) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Date of birth : <span style="font-weight: bold">{{ __($student?->birth_date_at) }}</span>
                </td>
            </tr>

            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Adhar No : <span style="font-weight: bold">{{ __($student?->aadhar_card_no) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Religion : <span style="font-weight: bold">{{ __($student?->religion_name?->name) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Blood Group : <span style="font-weight: bold">{{ __($student?->blood_group_name?->name) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Category : <span
                        style="font-weight: bold">{{ __($student?->student_category?->category?->title) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Admission Date : <span style="font-weight: bold">{{ __($student?->admission_date_at) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    SRN Number : <span style="font-weight: bold">{{ __($student?->srn_no) }}</span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%; margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:7px;">
                    Parent Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Father Name :
                    <span style="font-weight: bold">
                        {{ __($student?->father?->first_name) }}
                        {{ __($student?->father?->middle_name) }}
                        {{ __($student?->father?->last_name) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Mother Name :
                    <span style="font-weight: bold">
                        {{ __($student?->mother?->first_name) }}
                        {{ __($student?->mother?->middle_name) }}
                        {{ __($student?->mother?->last_name) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Father Email : <span style="font-weight: bold">
                        {{ __($student?->father?->email) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Mother Email : <span style="font-weight: bold">
                        {{ __($student?->mother?->email) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Father Mobile : <span style="font-weight: bold">{{ __($student?->father?->phone) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Mother Mobile : <span style="font-weight: bold">{{ __($student?->mother?->phone) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Highest Qualification : <span
                        style="font-weight: bold">{{ __($student?->father?->highest_qualification) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Highest Qualification : <span
                        style="font-weight: bold">{{ __($student?->mother?->highest_qualification) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Occupation : <span style="font-weight: bold">{{ __($student?->father?->occupation) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Occupation : <span style="font-weight: bold">{{ __($student?->mother?->occupation) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Income Per Year : <span
                        style="font-weight: bold">{{ __($student?->father?->income_per_year) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Income Per Year : <span
                        style="font-weight: bold">{{ __($student?->mother?->income_per_year) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Designation : <span style="font-weight: bold">{{ __($student?->father?->designation) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Designation : <span style="font-weight: bold">{{ __($student?->mother?->designation) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Adhar Card No : <span style="font-weight: bold">{{ __($student?->father?->aadhar_card_no) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Adhar Card No : <span style="font-weight: bold">{{ __($student?->mother?->aadhar_card_no) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Pan Card No : <span style="font-weight: bold">{{ __($student?->father?->pan_card_no) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Pan Card No : <span style="font-weight: bold">{{ __($student?->mother?->pan_card_no) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Department : <span style="font-weight: bold">{{ __($student?->father?->department) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Department : <span style="font-weight: bold">{{ __($student?->mother?->department) }}</span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Office address : <span
                        style="font-weight: bold">{{ __($student?->father?->office_address) }}</span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%;padding:7px;">
                    Office address : <span
                        style="font-weight: bold">{{ __($student?->mother?->office_address) }}</span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%; margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:7px;">
                    Present Address
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td colspan="2" style="font-size: 11px; font-weight: 400; width: 100%; padding:7px;">
                    Address :
                    <span style="font-weight: bold">
                        {{ __($student?->present_address) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    City :
                    <span style="font-weight: bold">
                        {{ __($student?->present_city) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    State :
                    <span style="font-weight: bold">
                        {{ __($student?->present_state) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td colspan="2" style="font-size: 11px; font-weight: 400; width: 100%; padding:7px;">
                    Present Pin Number :
                    <span style="font-weight: bold">
                        {{ __($student?->present_pin_code) }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%; margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:7px;">
                    Previous School Detail
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Previous School Name :
                    <span style="font-weight: bold">
                        {{ __($student?->prev_school_name) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Previous School Class :
                    <span style="font-weight: bold">
                        {{ __($student?->prev_school_class) }}
                    </span>
                </td>
            </tr>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    Previous School Year :
                    <span style="font-weight: bold">
                        {{ __($student?->prev_school_year) }}
                    </span>
                </td>
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    TC Number,Date with Result :
                    <span style="font-weight: bold">
                        {{ __($student?->prev_school_tc_no) }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%;margin-top:5px;">
        <thead>
            <tr style="width: 100%; background-color:rgba(128, 128, 128, 0.064);">
                <th style="font-size: 15px; font-weight: 500; text-align:left; padding:7px;">
                    Declaration By The Parents
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style="width: 100%; vertical-align:top;">
                <td style="font-size: 11px; font-weight: 400; width: 50%; padding:7px;">
                    I hereby declare that the above information furnished by me is correct to the best of my knowledge &
                    belief, if any information or document
                    supplied by me found to be incorrect, I will be responsible for the same. I shall abide by the rules
                    of the Vidyalaya.
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table-border" style="width: 100%;margin-top:10px;">
        <thead>
            <tr style="width: 100%;">
                <th style="font-size: 15px; font-weight: 500; text-align:center; padding:7px;  width: 50%;">
                    Clerk Sign
                </th>
                <th style="font-size: 15px; font-weight: 500; text-align:center; padding:7px;  width: 50%;">
                    Parents Sign
                </th>
                <th style="font-size: 15px; font-weight: 500; text-align:center; padding:7px;  width: 50%;">
                    Principal Sign with Seal
                </th>
            </tr>
        </thead>
    </table>

@endif
