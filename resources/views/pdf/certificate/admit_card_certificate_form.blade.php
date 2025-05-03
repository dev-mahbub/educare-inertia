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
            margin-top: 50px;
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
    <div class="educare-top-btn" style="width: 1010px; margin: auto; text-align: left;">
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
                                                            </td>
                                                            <td style="vertical-align: middle; text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 22px; font-weight:400;">
                                                                            {{ __($schoolData['title'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-weight: 500; font-size: 12px; padding-top: 5px">
                                                                            {{ __($schoolData['street_address'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-weight: 500; padding-top: 5px">
                                                                            <span style="text-decoration: underline;">ADMIT CARD</span>
                                                                            ({{ __($schoolData['academic_year'] ?? '') }})
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="text-decoration: underline; padding: 5px 0 10px; font-weight: 500">
                                                                            {{ __("EXAM-".($exam['title'] ?? '')) }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 95px;"></td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 100%;" cellspacing="0" cellpadding="0">
                                                        <tr style="display:flex; justify-content:space-between; align-items:center">
                                                            <td style="width: 40%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; width: 25%; font-size: 12px">
                                                                                        Name :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __(($student['first_name'] ?? "")." ".($student['middle_name'] ?? "")." ".($student['last_name'] ?? "")) }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; width: 27%; font-size: 12px">
                                                                                        Father :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __(($student['father']['first_name'] ?? "")." ".($student['father']['middle_name'] ?? "")." ".($student['father']['last_name'] ?? "")) }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; width: 27%; font-size: 12px">
                                                                                        Mother :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __(($student['mother']['first_name'] ?? "")." ".($student['mother']['middle_name'] ?? "")." ".($student['mother']['last_name'] ?? "")) }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; width: 35%; font-size: 12px">
                                                                                        Adm. No :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __($student['admission_no'] ?? "") }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 35%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; font-size: 12px">Class :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __($student['classroom']['title'] ?? "") }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; font-size: 12px; width: 70px;">Roll No. :
                                                                                    </td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __($student['classroom_roll']['roll_no'] ?? "") }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; font-size: 12px">Phone No. :
                                                                                    </td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __($student['father']['phone'] ?? "") }}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: center;">
                                                                @if (!empty($student['student_image']['path']))
                                                                <img src="{{ $student['student_image']['path'] }}" style="width: 80px; height: 80px; padding: 5px" alt="student-image">
                                                                @else
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px; padding: 5px">
                                                                @endif
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="5" style="text-align: center; padding-bottom: 5px">TIME TABLE</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-left: 0; " width="100%" colspan="3">
                                                                <table class="subjects" style="width:100%; border-collapse: collapse; text-align: left;" cellspacing="0" border="1">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style="font-weight: 600; width:5%;">S.N</th>
                                                                            <th style="font-weight: 600; width:15%;">DATE</th>
                                                                            <th style="font-weight: 600; width:25%;">SUBJECT </th>
                                                                            <th style="font-weight: 600; width:20%;">START TIME</th>
                                                                            <th style="font-weight: 600; width:15%;">END TIME</th>
                                                                            <th style="font-weight: 600; width:20%;">SIGN</th>
                                                                        </tr>

                                                                        @if (!empty($examDateData))
                                                                        @php
                                                                        $count = 0;
                                                                        @endphp
                                                                        @foreach ($examDateData as $examDate)
                                                                        @php
                                                                        $count++;
                                                                        @endphp
                                                                        <tr>
                                                                            <td style="font-weight: 400">{{ __($count) }}</td>
                                                                            <td style="font-weight: 400">{{ __($examDate['exam_date'] ?? "") }}</td>
                                                                            <td style="font-weight: 400">{{ __($examDate['subject_name'] ?? "") }}</td>
                                                                            <td style="font-weight: 400">{{ __($examDate['exam_start_time'] ?? "") }}</td>
                                                                            <td style="font-weight: 400">{{ __($examDate['exam_end_time'] ?? "") }}</td>
                                                                            <td style="font-weight: 400"></td>
                                                                        </tr>
                                                                        @endforeach
                                                                        @endif
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- Exam Dates -->
                                                    <table class="examHeader" style="width: 100%; border-collapse: collapse;" cellspacing="0" cellpadding="0">
                                                    </table>
                                                    <table style="width: 100%; font-weight:500; margin-top:10px" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td colspan="5">{{ __('Commencing from the date: '. ($examDateData[0]['exam_date'] ?? "")) }}</td>
                                                            <td>{{ __('Time: '. ($examDateData[0]['exam_start_time'] ?? "")) }}</td>
                                                        </tr>
                                                    </table>
                                                    <table style="" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="font-size: 12px; padding-top: 5px">
                                                                <span style="font-size: 15px; font-weight: 600">Note:</span>
                                                                <span style="font-size: 12px">Keep this card safely and must bring to the exam venue on every exam date.</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table style="width: 100%; margin-top: 0px; padding: 5px;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align:bottom; width: 54.3%; text-align: left; font-size: 14px; font-weight: 400;">
                                                                <span>CLASS TEACHER</span>
                                                            </td>
                                                            <td style="vertical-align:bottom;width: 33.3%; text-align: center; font-size: 14px; font-weight: 400;">
                                                                @if (!empty($digitalSignature))
                                                                <span style=" display:block; margin:0 auto; padding:0; text-align: center; height:30px">
                                                                    <img src="{{$digitalSignature}}" width="107" height="30">
                                                                </span>
                                                                @endif
                                                                <p style="margin:0; display:inline-block; padding:5px 0px 0px 0px;">PRINCIPAL'S SIGNATURE</p>
                                                            </td>
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
