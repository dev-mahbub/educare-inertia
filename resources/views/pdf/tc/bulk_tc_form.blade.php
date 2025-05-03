<!doctype html>
<html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta charset="UTF-8">
    <title>Transfer Certificate</title>
    <style>
        .educare-table {
            border: 1px solid #c8c8c8;
        }

        td,
        th {
            font-family: Inter;
            font-size: 15px;
            font-weight: 300;
        }

        table span {
            font-family: Inter;
            font-weight: 500;
        }

        table span.bold {
            font-family: Inter;
            font-weight: 600;
            font-size: 15px;
        }

        .educare-listinfo>tbody>tr>td {
            padding-top: 2px !important;
        }

        .educare-300 {
            width: 300px !important;
        }

        .educare-printarea th {
            text-align: right !important;
        }

        .educare-printarea a {
            color: #fff;
            background: #2196F3;
            padding: 3px 9px;
            margin-right: 5px;
            border-radius: 3px;
            text-decoration: none;
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            .educare-printarea {
                display: none;
            }

            .educare-table {
                border: 0;
            }

            .educare-maintable {
                margin-top: 60px;
            }

            .educare-lg-300 {
                width: 300px;
            }

            .educare-attence {
                width: 32% !important;
            }

            .educare-roll-no {
                width: 30% !important;
            }

            .educare-width-48 {
                width: 48% !important;
            }

            .educare-sign-paddng {
                padding-top: 57px !important;
            }

            .educare-table {
                margin-bottom: 10px !important;
            }

            .educare-page-repeat {
                page-break-after: always;
                margin-top: 20px;
            }

            .educare-page-repeat.educare-margin-left {
                margin-top: 20px;
            }
        }

        @page {
            size: portrait;
        }

        @page rotated {
            size: portrait;
        }

        table {
            page: rotated;
        }

        @page {
            margin: 0cm;
        }

        @page {
            size: 8in 13in;
        }
    </style>
</head>

<body>
    @forelse ($students as $student)

    @php
    $birthDate = date('d-m-Y', strtotime($student->birth_date_at ?? ''));
    $birthWordsDate = date('F jS Y', strtotime($student->birth_date_at ?? ''));
    @endphp

    <div>
        <div class="educare-page-repeat educare-margin-left">
            <table class="educare-table" style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->
                    <tr class="educare-printarea">
                        <th colspan="3" style="width: 100%; text-align: center; font-weight: 400; font-size: 13px; height: 30px;">

                            <input type="button" value="TC Generate" id="educare-tc-generate-btn" style="color: #fff; background: #0b52bd; border:0px; padding: 5px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                            <input type="submit" value="Save Draft" id="btnDraftTC" style=" color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                            <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width: 100%; text-align: center; font-weight: 600; font-size: 30px; padding-top: 0px;">
                            <table style="width:100%;" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="width:120px;padding-left: 15px;">
                                            @if (!empty($student['schoolLogo']['path']))
                                            <img src="{{ $student['schoolLogo']['path'] }}" style="width: 85px; height: 80px; margin-top: 0px;" />
                                            @else
                                            <img src="" style="width: 85px; height: 80px; margin-top: 0px;" />
                                            @endif
                                        </td>
                                        </td>
                                        <td style="width:95%">
                                            <p style="margin: 0; font-size: 28px; font-weight: 600;">
                                                {{ __($student['schoolData']['title'] ?? "") }}
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight: 300;">
                                                {{ __($student['schoolData']['street_address'] ?? "") }}
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight:300;">
                                                {{ __(($student['schoolData']['phone'] ?? "").', '.($student['schoolData']['mail'] ?? "")) }}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">

                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width: 100%; text-align: center; font-weight: 400; font-size: 13px;">
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:600;padding-top:0px;font-size:20px;text-decoration:underline;padding-top: 0px;">
                            <i style="">SCHOOL TRANSFER CERTIFICATE</i>
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:23%;padding:0 10px;text-align:left;">
                                            <span class="bold">School Key:</span>

                                            <span>
                                                <input id="SchoolNo" maxlength="20" name="SchoolNo" style="text-align: left;border: none;width: 67px;" type="text" value="{{ $schoolKey->school_key ?? '' }}" />
                                            </span>
                                        </td>

                                        <td style="width: 25%; padding: 0 10px; text-align: center;">
                                            <span class="bold">Admn No :</span>
                                            <span>
                                                <input id="educare-adm-no" maxlength="20" name="educare-adm-no" style="text-align: left;border: none;width: 90px;" type="text" value="{{ $student->admission_no ?? '' }}" />
                                            </span>
                                        </td>
                                        <td style="width:22%;text-align:right;">
                                            <span class="bold">TC No :</span>
                                            <span>
                                                <input id="TcNo" maxlength="20" name="TcNo" style="text-align: left;border: none;width: 100px;" type="text" value="{{ $student['studentTc']['certificate_no'] ?? '' }}" />
                                            </span>

                                        </td>
                                        <td style="width:25%;padding:0 10px;text-align:right;">
                                            <span class="bold">TC Date :</span>
                                            <span>
                                                <input style="text-align: left;border: none;width:49%" type="text" value="{{ date('d-m-Y', strtotime($student['studentTc']['generated_date_at'] ?? '')) }}" />
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-size:13px;color: rgb(33, 33, 33); padding:7px 13px 13px;font-weight:400;">
                            (No Change in any entry in this certificate shall be made except by the authority issuing it
                            and any infringement of this requirment is liable to involve the imposition of penality such
                            as that of rustication.)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                            <table style="width:100%;margin-top: 0px;padding-left: 15px;" class="educare-listinfo" cellspacing="0">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span></span>
                                        </td>
                                        <td class="educare-lg-300" style="width:46%;padding: 0px;text-align:left;">
                                            <span>Admission Number</span>
                                        </td>

                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input id="educare-adm-no" maxlength="20" name="educare-adm-no" style="text-align: left;border: none;width: 90px;" type="text" value="{{ $student->admission_no ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--name of pupil-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>1.</span>
                                        </td>
                                        <td class="educare-lg-300" style="width:46%;padding: 0px;text-align:left;">
                                            <span>Name of the Student</span>
                                        </td>

                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="educare-student-name" maxlength="50" name="educare-student-name" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ $student->first_name ?? '' }} {{ $student->middle_name ?? '' }} {{ $student->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Mother's Name-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>2.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Mother's Name</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="MotherName" maxlength="50" name="MotherName" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ optional($student)->mother->first_name ?? '' }} {{ optional($student)->mother->middle_name ?? '' }} {{ optional($student)->mother->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Father's Name-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>3.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Father's Name/Guardian's Name</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="FatherName" maxlength="50" name="FatherName" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Date of Birth-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>4.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Date of Birth (In Christian Era) Figure</span>
                                            <span style="display:block;text-align:left;">In Words</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                            <span class="bold" style="display:block;">:</span>
                                        </td>

                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="DobInFigure" maxlength="50" name="DobInFigure" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ $birthDate }}" />
                                            </div>
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="DobInWords1" maxlength="50" name="DobInWords1" style="text-align: left;border: none;float: left;width:410px !important;" type="text" value="{{ $birthWordsDate }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>5.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Last School Attended</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="LastSchoolAttended" maxlength="50" name="LastSchoolAttended" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of sex Name-->
                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>6.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Gender</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="GenderName" maxlength="50" name="GenderName" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ $student->gender ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--name of Nationality-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>7.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Nationality</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;font-size:15px;">
                                            <div style="height: 15px;">{{ $student->country->name ?? '' }}</div>
                                        </td>
                                    </tr>
                                    <!--name of Religion/caste-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>8.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Religion/Caste</span>
                                            <span style="display:block;text-align:left;">Schedule/Tribe
                                                Caste/OBC</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                            <span class="bold" style="display:block;">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="Religion" maxlength="50" name="Religion" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />
                                            </div>


                                            <div style="height: 15px;">
                                                <input class="educare-300" id="Caste" maxlength="50" name="Caste" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />
                                            </div>

                                        </td>
                                    </tr>
                                    <!--name of place of Birth-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>9.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Place of Birth</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="PlaceOfBirth" maxlength="50" name="PlaceOfBirth" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Admission Date-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>10.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Date of Admission in School & Class</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="AdmissionDate" maxlength="50" name="AdmissionDate" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Last studied school -->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>11.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">

                                            <span>Class in which student last studied</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>

                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="ClassSection" maxlength="50" name="ClassSection" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="{{ $student->classroom->title ?? '' }}" />
                                            </div>

                                        </td>
                                    </tr>
                                    <!--name of Subject Studied-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>12.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Subject Studied</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="SubjectsStudied" maxlength="70" name="SubjectsStudied" style="text-align: left;border: none;float: left;width:100% !important;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of last examination board-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>13.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>School/Board Last Examination Result</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="PreviousSchoolBoardExamResult" maxlength="50" name="PreviousSchoolBoardExamResult" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name whether qualified-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>14.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Whether qualified</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="WhetherQualified" maxlength="50" name="WhetherQualified" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Promoted to Class-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>15.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Promoted to class</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="PromotedToClass" maxlength="50" name="PromotedToClass" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name moth of fee paid-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>16.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Month up to which Student Paid Fees</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="MonthuptowhichPupilPaidFees" maxlength="50" name="MonthuptowhichPupilPaidFees" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee concession-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>17.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Any Fees availed of/ Concession</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="AnyFeesAvailedofConcession" maxlength="50" name="AnyFeesAvailedofConcession" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee total working days-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>18.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Total Number of Working Days</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="TotalNumberofWorkingDays" maxlength="50" name="TotalNumberofWorkingDays" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee total present days-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>19.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Total Numbers of Present Days</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="TotalNumbersofPresentDays" maxlength="50" name="TotalNumbersofPresentDays" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Whether In NCC/Scout-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>20.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Whether In NCC/Scout</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="WhetherInNccScout" maxlength="50" name="WhetherInNccScout" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Games Played/ Other Activity-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>21.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Games Played/ Other Activity</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="GamesPlayedOtherActivity" maxlength="50" name="GamesPlayedOtherActivity" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--General Conduct-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>22.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>General Conduct</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="GeneralConduct" maxlength="50" name="GeneralConduct" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Date of Issue of Certificate-->

                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>23.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Date on which student's name was struck of the school</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input id="DateOfStuckStudent" name="DateOfStuckStudent" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>24.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Date of Issue of Certificate</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="DateofIssueofCertificate" maxlength="50" name="DateofIssueofCertificate" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>


                                    <!--Reason for Leaving the School-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>25.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Reason for Leaving the School</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="ReasonforLeavingtheSchool" maxlength="50" name="ReasonforLeavingtheSchool" style="text-align: left;border: none;float: left;width: 454px;font-size:15px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>26.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Udise No</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>

                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">


                                        </td>
                                    </tr>

                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>27.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Address</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>

                                        <td style="width:50%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="Address1" maxlength="50" name="Address1" style="text-align: left;border: none;float: left;width: 454px !important;font-size:12px;" type="text" value="{{ $student->present_address ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>
                                    <!--Reason for Leaving the School-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>28.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Any Other Remarks</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-300" id="AnyOtherRemarks1" maxlength="150" name="AnyOtherRemarks1" style="text-align: left;border: none;float: left;width: 454px!important;font-size:15px;" type="text" value="" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--CONFERMATION-->
                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:center;font-weight:400;font-size:15px;padding:0px 0px 0px 0px;">
                                            CERTIFIED THAT THE ABOVE INFORMATION IS IN ACCORDANCE WITH THE SCHOOL
                                            REGISTER.
                                        </th>
                                    </tr>
                                    <!-- signatures-->
                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                                            <table style="width:100%;margin-top: 5px;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td style="width:33.3%;padding:0 10px;text-align:left;">
                                                            <span>Seal of the School</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td style="width:33.3%;padding:0 10px ;text-align:center;">
                                                            <span></span>
                                                        </td>

                                                    </tr>

                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                                            <table style="width:100%;margin-top: 30px;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td style="width:33.3%;padding:0 10px;text-align:left;bottom:20px;">
                                                            <span>Signature of Class Teacher</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td style="width:33.3%;padding:0 10px;text-align:center;bottom:20px;">
                                                            <span>Checked by(Name & Designation)</span>
                                                            <input class="educare-300" id="txtCoordinator" maxlength="50" name="txtCoordinator" style="text-align: left;border: none;float: left;width: 454px;text-align: center;font-family: Inter;font-weight: 500;" type="text" value="" />

                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td style="width:33.3%;padding:0 10px;text-align:left;padding-bottom:10px;">
                                                            <span>Signature of Principal</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>

                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->

                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:5px 10px 0px;">
                            I want to withdraw my ward from the school. You are requested to issue his/her transfer
                            certificate to me. The details of the ward are supplied her with in coloumn <b>B</b>.
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:70%;text-indent:0;">
                                            Address- <span style="display:inline-block;width: 90%;">
                                                <input id="Address1" maxlength="50" name="Address1" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="Bokaro" />

                                            </span>

                                            <span style="display:block;width: 100%;height: 20px;">
                                                <input id="Address1" maxlength="50" name="Address1" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="Bokaro" />

                                            </span>

                                        </td>

                                        <td class="educare-sign-paddng" style="width:30%;text-align:center;padding-top: 39px;">
                                            <span style="display:block;border-bottom:1px dotted #333;width: 100%"></span>
                                            Signature of parents
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 5px;"></div>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>B)</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Name of student

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="educare-student-name" maxlength="90" name="educare-student-name" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ optional($student)->first_name ?? '' }} {{ optional($student)->middle_name ?? '' }} {{ optional($student)->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Name of father/ guardian
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="FatherName" maxlength="90" name="FatherName" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Religion and Caste

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input Value=" " id="ReligionorCaste" maxlength="90" name="ReligionorCaste" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value=" " />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Place of Birth

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="BirthPlace" maxlength="90" name="BirthPlace" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>

                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Class/Section
                                            <div>(Studying as on today)</div>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="ClassSection" maxlength="90" name="ClassSection" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ $student->classroom->title }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Passed/Failed Classes
                                            <div>(if applicable)</div>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <div style="height: 15px;">
                                                    <input id="PassedFailedClasses" maxlength="90" name="PassedFailedClasses" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="" />

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Cause of withdrawal
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Causeofwithdrawal" maxlength="90" name="Causeofwithdrawal" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :
                                            <span>
                                                <input id="educare-fill-date" maxlength="60" name="educare-fill-date" style="text-align: left;border: none;width: 100px;" type="text" value="" />
                                            </span>
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 23px;text-align: right;">
                                                <div style="height: 15px;border-bottom: 1px dotted #000;width:37%;float:right;">
                                                </div>
                                            </div>
                                            <span style=" float right;margin-right 5%;"> Signature of Parent</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 0px;">
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;padding-top:20px;">
                            FOR OFFICE USE ONLY
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>C)</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Class teacher to fill in and certify.
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            1)
                                        </td>

                                        <td class="educare-width-48" style="width:44%;text-indent:0;text-align:left;">
                                            Registered name of student father/guardian-Mast./Ms.
                                        </td>

                                        <td class="" style="width:auto;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Registerednameofpupilfather" maxlength="80" name="Registerednameofpupilfather" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            &nbsp;
                                        </td>
                                        <td style="width:25%;text-indent:0;text-align:left;">
                                            Son/Daughter of Mr.

                                        </td>

                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="educare-son-daughter" maxlength="60" name="educare-son-daughter" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            2)
                                        </td>
                                        <td class="educare-roll-no" style="width:28%;text-indent:0;text-align:left;">
                                            Admission/registration No.
                                        </td>

                                        <td class="" style="width:20%;float:left;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="educare-adm-no" maxlength="25" name="educare-adm-no" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;" type="text" value="{{ $student->admission_no ?? '' }}" />

                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            3)
                                        </td>
                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                            Date of Birth-
                                        </td>
                                        <td class="" style="width:100%;float:left;text-align:center;">
                                            <table style="width:100%;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                                            In Figure
                                                        </td>
                                                        <td class="" style="text-align:center;">
                                                            <div style="height: 15px;">
                                                                <input id="DobInFigure" maxlength="80" name="DobInFigure" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="{{ $birthDate ?? '' }}" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style="vertical-align:top;">

                                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                                            In Words
                                                        </td>

                                                        <td class="" style="text-align:center;">
                                                            <div style="height: 15px;">
                                                                <input class="educare-300" id="DobInWords1" maxlength="50" name="DobInWords1" style="text-align: left;border: none;float: left;width:410px !important;" type="text" value="{{ $birthWordsDate ?? '' }}" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            4)
                                        </td>
                                        <td class="educare-attence" style="width:28%;text-indent:0;text-align:left;">
                                            Last day of attendance in the School
                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="LastdayofAttendanceofSchool" maxlength="60" name="LastdayofAttendanceofSchool" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            5)
                                        </td>
                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                            Total attendance
                                        </td>
                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="TotalAttendance" maxlength="30" name="TotalAttendance" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="" />

                                            </div>
                                        </td>
                                        <td class="" style="width:12%;text-indent:0;text-align:left;">
                                            Days out of

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Dayoutof" maxlength="30" name="Dayoutof" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            6)
                                        </td>
                                        <td class="" style="width:30%;text-indent:0;text-align:left;">
                                            Weather in NCC/Scout

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="WhetherInNccScout" maxlength="80" name="WhetherInNccScout" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            7)
                                        </td>
                                        <td class="" style="width:35%;text-indent:0;text-align:left;">
                                            Games Played/Other Activity

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="GamesPlayedOtherActivity" maxlength="80" name="GamesPlayedOtherActivity" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;" type="text" value="No" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            8)
                                        </td>
                                        <td class="" style="width:14%;text-indent:0;text-align:left;">
                                            Subject Studied

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="StudiedSubject1" maxlength="80" name="StudiedSubject1" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                            <div style="height: 15px;">
                                                <input id="StudiedSubject2" maxlength="80" name="StudiedSubject2" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :

                                            <span>
                                                <input id="educare-fill-date" maxlength="50" name="educare-fill-date" style="text-align: left;border: none;width: 100px;" type="text" value="" />

                                            </span>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 10px;text-align: right;">
                                                <div style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                </div>
                                            </div>
                                            <span style=" float right;margin-right 5%;"> Signature of Class
                                                Teacher</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 5px;">
                                            </div>
                                        </th>
                                    </tr>
                                    <table style="width:100%;">
                                        <tr style="vertical-align:top;">
                                            <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;line-height: 8px;margin-top:20px;">
                                                NO DUES CERTIFICATE
                                            </th>
                                        </tr>
                                    </table>
                                    <table style="width:100%;">
                                        <tbody>
                                            <tr style="vertical-align:top;">
                                                <td style="width:3%;text-indent:0;">
                                                    <b>D)</b>
                                                </td>
                                                <td style="width:3%;text-indent:0;">
                                                    1)
                                                </td>
                                                <td class="" style="width:14%;text-indent:0;text-align:left;">
                                                    Account Office
                                                </td>
                                                <td style="text-align:center;">
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    1)
                                                                </td>
                                                                <td class="" style="width:19%;text-indent:0;text-align:left;">
                                                                    Fees paid up to
                                                                </td>
                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="FeesPaidupto" maxlength="70" name="FeesPaidupto" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    2)
                                                                </td>
                                                                <td class="" style="width:19%;text-indent:0;text-align:left;">
                                                                    Dues (if any)

                                                                </td>

                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="DuesifAny" maxlength="70" name="DuesifAny" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    3)
                                                                </td>
                                                                <td class="" style="width:25%;text-indent:0;text-align:left;">
                                                                    Received fees/R No.
                                                                </td>

                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="DuesifAny" maxlength="25" name="DuesifAny" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                                                    </div>
                                                                </td>
                                                                <td class="" style="width:7%;text-indent:0;text-align:left;">
                                                                    Date
                                                                </td>
                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="NoDuesCertificateDate" maxlength="25" name="NoDuesCertificateDate" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">
                                                                <td class="" style="width:8%;text-indent:4px;text-align:left;">
                                                                    Dues
                                                                </td>
                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="Dues" maxlength="25" name="Dues" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style="width:100%;margin-top: 13px;">
                                        <tbody>
                                            <tr style="vertical-align:top;">
                                                <td style="width:3%;text-indent:0;">
                                                    <b>&nbsp;</b>
                                                </td>
                                                <td style="width:32%;text-indent:0;text-align:left;">
                                                    &nbsp;

                                                </td>
                                                <td style="width:5%;text-indent:0;">
                                                    &nbsp;

                                                </td>
                                                <td class="" style="width:60%;text-align:center;">
                                                    <div style="height: 10px;text-align: right;">
                                                        <div style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                        </div>
                                                    </div>
                                                    <span style="float: right;margin-right: 5%;"> Signature of
                                                        Accoutant</span>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <!-- Heading Row-->
                </thead>
            </table>
        </div>
        <div class="educare-maintable">
            <table class="educare-table" style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;    padding-top:50px;">
                            FOR OFFICE USE ONLY
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style=" width 100%;text-align center;font-weight 400;font-size 19px;line-height 9px;height 26px;vertical-align top;">
                            FOR ACCOUNT DEPARTMENT.
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:10%;text-indent:0;text-align:left;">
                                            T.C. NO.
                                        </td>
                                        <td class="" style="width:40%;text-align:center;float:left;">
                                            <div style="height: 15px;">
                                                <input id="TcNo" maxlength="25" name="TcNo" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="{{ $student->id }}" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:33%;text-indent:0;text-align:left;">
                                            TC to be handed on to the Parents

                                        </td>
                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="TcHandedToParent" maxlength="70" name="TcHandedToParent" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:21%;text-indent:0;text-align:left;">
                                            Cheque to be ready by
                                        </td>
                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Chequetobereadyby" maxlength="70" name="Chequetobereadyby" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="width: 100%;text-align: center;font-weight: 400;font-size: 16px;line-height: 23px;vertical-align: top;height: 20px;">
                                            (NOT TO BE FILLED BY PARENTS)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>

                                    <tr>
                                        <th colspan="4" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">

                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;">
                            TO BE FILLED BY PARENTS REFUND
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Dear Ma'am
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;"></div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">

                                        <td style="width:40%;text-indent:0;text-align:left;">
                                            With reference of the TC application of my child

                                        </td>
                                        <td colspan="2" style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="ChildName" maxlength="70" name="ChildName" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="{{ $student->first_name ?? '' }} {{ $student->middle_name ?? '' }} {{ $student->last_name ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input type="text" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;">
                                            </div>
                                        </td>

                                        <td class="" style="width:10%;text-indent:0;text-align:left;">
                                            of class
                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="ChildClassName" maxlength="70" name="ChildClassName" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="{{ $student->classroom->title }}" />

                                            </div>
                                        </td>

                                        <td class="" style="width:31%;text-indent:0;text-align:left;">
                                            Request you to kindly refund the

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            Caution Money of Rs.

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="CautionMoneyofRs" maxlength="50" name="CautionMoneyofRs" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:40%;text-indent:0;text-align:left;">
                                            Alogn with the T.C. The Cheque has to be

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            made in the name of

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="Checkmadeinthenameof" maxlength="50" name="Checkmadeinthenameof" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:10%;text-indent:0;text-align:left;">
                                            Payble

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            at Account Number

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="PaybleAccountNumber" maxlength="50" name="PaybleAccountNumber" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:13%;text-indent:0;text-align:left;">
                                            Bank Name

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="BankName" maxlength="50" name="BankName" style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;" type="text" value="" />

                                            </div>
                                        </td>

                                    </tr>
                                    <tr style="vertical-align:top;">

                                        <td colspan="4" style="text-indent:0;">
                                            <div style="height: 15px;">

                                            </div>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :

                                            <input type="text" id="txtfeeRefundDate" name="txtfeeRefundDate" maxlength=50 style="text-align: left;border: none;width: 100px;">

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 10px;text-align: right;">
                                                <div style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                </div>
                                            </div>
                                            <span style="float: right;margin-right: 5%;"> Parents Signature</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

    @empty
    <div>
        <h3>No Data Available</h3>
    </div>
    @endforelse


    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <script language="javascript" type="text/javascript">
        $(function() {
            const formData = {
                student_ids: "{{$studentIds}}",
                classroom_id: "{{$classroomId}}"
            }

            // generate tc
            $("#educare-tc-generate-btn").click(function() {
                var result = confirm(
                    "Are you sure to generate Transfer certificate? This process will make the student inactive in the current session."
                );
                if (result == true) {
                    let url = "{{ route('bulk_student_certificate_generate_tc_save') }}";

                    $.ajax({
                        url: url,
                        data: formData,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: "POST",
                        success: function(response) {
                            if (response.status == 200) {
                                alert(response.message);
                            } else {
                                alert(response.message);
                            }
                        }
                    });
                }
            });

            // save draft tc
            $("#btnDraftTC").click(function() {
                var result = confirm(
                    "Are you sure to save draft tc."
                );
                if (result == true) {
                    let url = "{{ route('bulk_student_certificate_generate_tc_draft_save') }}";

                    $.ajax({
                        url: url,
                        data: formData,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: "POST",
                        success: function(response) {
                            if (response.status == 200) {
                                alert(response.message);
                            } else {
                                alert(response.message);
                            }
                        }
                    });
                }
            });
        });
    </script>

</body>

</html>