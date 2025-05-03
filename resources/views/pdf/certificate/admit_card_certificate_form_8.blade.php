<!doctype html>
<title>Admit Card</title>
<meta charset="utf-8">

<head>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: roboto;
            font-size: 14px;
        }

        .examSchedule {
            width: 12.27in;
            height: 8.25in;
            margin: 0 auto;
            background-color: #fff;
            background-size: contain;
            background-repeat: no-repeat;
            box-sizing: border-box;
            /* margin-top: 50px; */
        }

        .examHeader thead tr th {
            font-size: 12px;
            text-align: center;
            border: 1px solid #000;
            border-left: 0;
        }

        .examHeader tbody tr td {
            font-size: 12px;
            text-align: center;
            font-weight: normal;
            border: 1px solid #000;
            border-left: 0;
        }

        .repeatingIdCards {
            padding-left: 0;
            margin: 0;
            list-style: none;
        }

        .repeatingIdCards1 li {
            margin: 0;
            width: 100%;
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
        }

        .repeatingIdCards li {
            margin: 0;
            width: calc(100%/2);
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
            page-break-inside: avoid;
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            .educare-printarea {
                display: none;
            }

            /*
      .repeatpage.lessmar{margin-top:140px;}
      .repeatpage {page-break-after: always; margin-top:221px;}
      */
        }

        @page {
            size: landscape;
        }

        @page rotated {
            size: landscape;
        }

        table {
            page: rotated;
        }

        @page {
            margin: 0cm;
        }

        /* All margins set to 2cm */
        @page {
            size: 11.69in 8.27in;
            /* width height 8.5in 14in */
        }

        /*@page{orphans:4; widows:2;}*/
        @media print {
            div {
                margin-left: 10px;
            }
        }
    </style>
</head>
<html>

<body style="font-family: sans-serif;">
    @if (!empty($students))
    <div class="educare-top-btn" style="width: 1010px; margin: auto; text-align:left;">
        <table style="width:100%;">
            <tr class="educare-printarea">
                <th style="width: 100%; text-align: right; font-weight: 400; font-size: 13px; height: 30px;">
                    <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                </th>
            </tr>
        </table>
    </div>
    <div class="examSchedule">
        <div class="receipt">
            <table class="examSchedule-head" cellspacing="0" style="width: 100%;">
                <tbody>
                    <tr>
                        <td>
                            <ul class="repeatingIdCards">

                                @foreach ($students as $student)
                                <!-- Single List Repeat -->
                                <li style="page-break-inside: avoid;">
                                    <div class="examScheduleReport">
                                        <table style="width: 550px;" cellpadding="0" cellspcing="0">
                                            <tr>
                                                <th style="border: 1px solid #d2cbcb; padding:5px 10px 5px;">
                                                    <table style="width: 100%;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: middle; text-align: center;">
                                                                <img src="{{ $schoolData['logo']['path'] ?? '' }}" style="width: 80px; height:75px; padding-top:5px">
                                                                <br />
                                                                <span style="font-size: 9px">Affiliation No.</span>
                                                            </td>
                                                            <td style="vertical-align:middle; text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 22px; font-weight:600;">{{ __($schoolData['title'] ?? '') }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-weight: 600; font-size: 14px; padding-top: 0px">{{ __(($exam['title'] ?? "") ." (".($schoolData['academic_year'] ?? "").")") }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-weight: 600; font-size:14px; padding-top: 0px">ADMIT CARD</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: center;">
                                                                @if (!empty($student['student_image']['path']))
                                                                <img src="{{ $student['student_image']['path'] }}" style="width: 80px; height: 80px;" alt="student-image">
                                                                @else
                                                                <!-- <img src="../../../images/user/person.png" style="width: 80px; height: 80px;"> -->
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px;">
                                                                @endif
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 100%; margin:0" cellspacing="0" cellpadding="0">
                                                        <tr style="display:flex; justify-content:space-between; align-items:top">
                                                            <td style="width: 47%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td style="padding-bottom: 0px; font-weight: 500; width: 19%; font-size: 12px">Name :</td>
                                                                        <td style="padding-bottom: 0px; font-size: 12px;">
                                                                            {{ __(($student['first_name'] ?? "")." ".($student['middle_name'] ?? "")." ".($student['last_name'] ?? "")) }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td style="padding-bottom: 0px; font-weight: 500; width: 19%; font-size: 12px">Father :</td>
                                                                        <td style="padding-bottom: 0px; font-size: 12px;">
                                                                            {{ __(($student['father']['first_name'] ?? "")." ".($student['father']['middle_name'] ?? "")." ".($student['father']['last_name'] ?? "")) }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 30%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td style="padding-bottom: 0px; font-weight: 500; width: 40%; font-size: 12px">Class :</td>
                                                                        <td style="padding-bottom: 0px; font-size: 12px;">
                                                                            {{ __($student['classroom']['title'] ?? "") }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td style="padding-bottom: 0px; font-weight: 500; width: 40%; font-size: 12px">Roll No. :
                                                                        </td>
                                                                        <td style="padding-bottom: 0px; font-size: 12px;">
                                                                            {{ __($student['classroom_roll']['roll_no'] ?? "") }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 23%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td style="padding-bottom: 0px; font-weight: 500; width: 50%; font-size: 12px">
                                                                            Adm. No :</td>
                                                                        <td style="padding-bottom: 0px; font-size: 12px;">
                                                                            {{ __($student['admission_no'] ?? "") }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--table area-->
                                                    <table class="subjects" style="font-size:11px; width:100%; border-collapse: collapse; text-align: center;" cellspacing="0" border="1">
                                                        <tbody>
                                                            <tr>
                                                                <td style="text-align: center" colspan="4">Seating - 1</td>
                                                                <td style="text-align: center" colspan="3">Seating - 2</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="font-weight: 600; width:15%;">Date</th>
                                                                <th style="font-weight: 600; width:15%;">Subject </th>
                                                                <th style="font-weight: 600; width:15%;">Start Time</th>
                                                                <th style="font-weight: 600; width:15%;">End Time</th>
                                                                <th style="font-weight: 600; width:10%;">Subject </th>
                                                                <th style="font-weight: 600; width:15%;">Start Time</th>
                                                                <th style="font-weight: 600; width:15%;">End Time</th>
                                                            </tr>
                                                            @if (!empty($examDateData))
                                                            @foreach ($examDateData as $examDate)
                                                            <tr>
                                                                <td style="font-weight: 400">{{ __($examDate['exam_date'] ?? "-") }}</td>
                                                                <td style="font-weight: 400">{{ __($examDate['subject_name'] ?? "-") }}</td>
                                                                <td style="font-weight: 400">{{ __($examDate['exam_start_time'] ?? "-") }}</td>
                                                                <td style="font-weight: 400">{{ __($examDate['exam_end_time'] ?? "-") }}</td>

                                                                @if (!empty($seatingTwoData[$examDate['exam_date']]))
                                                                <td style="font-weight: 400">{{ __($seatingTwoData[$examDate['exam_date']]['subject_name'] ?? "-") }}</td>
                                                                <td style="font-weight: 400">{{ __($seatingTwoData[$examDate['exam_date']]['exam_start_time'] ?? "-") }}</td>
                                                                <td style="font-weight: 400">{{ __($seatingTwoData[$examDate['exam_date']]['exam_end_time'] ?? "-") }}</td>
                                                                @else
                                                                <td style="font-weight: 400">-</td>
                                                                <td style="font-weight: 400">-</td>
                                                                <td style="font-weight: 400">-</td>
                                                                @endif
                                                            </tr>
                                                            @endforeach
                                                            @endif
                                                        </tbody>
                                                    </table>
                                                    <!-- signature area -->
                                                    <table style="width: 100%; margin-top: 5px; padding: 5px; border-bottom:1px solid #555" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align:bottom; width: 54.3%; text-align: left; font-size: 14px; font-weight: 600;">
                                                                <span>Sign of Class Teacher</span>
                                                            </td>
                                                            <td style="vertical-align:bottom; width: 33.3%; text-align: center; font-size: 14px; font-weight: 600;">
                                                                @if (!empty($digitalSignature))
                                                                <span style=" display:block; margin:0 auto; padding:0; text-align: center; height:30px">
                                                                    <img src="{{$digitalSignature}}" width="107" height="30">
                                                                </span>
                                                                @endif
                                                                <p style="margin:0; display:inline-block;">Principal's Signature</p>
                                                                <!-- <span>Principal's Signature</span> -->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table style="#555; width: 100%; font-weight:500; padding:5px 0px;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="font-size: 11px padding: 5px">
                                                                <span style="font-size: 14px; font-weight: 600">Note:</span>
                                                                <span style="font-size: 11px">Admit Card and full school uniform is compulsory to appear at the examination.</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="5" style="font-size: 11px; padding-top: 5px">No written Documents, Bags, Copy, Paper are allowed in the Examination Hall.</td>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </li>
                                @endforeach

                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    @else
    <h2>No Data Available</h2>
    @endif
</body>

</html>
