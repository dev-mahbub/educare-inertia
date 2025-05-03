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
            /* width: 8.50in; */
            width: 795px;
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
            width: 100%;
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
            /* page-break-inside: avoid; */
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
            size: A4
        }

        @page rotated {
            size: A4
        }

        /* @page {
            size: portrait;
        }

        @page rotated {
            size: portrait;
        } */

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
                margin-left: 0px;
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
                <th style="width: 100%; text-align: right; font-weight: 400; font-size: 12px; height: 30px;">
                    <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                </th>
            </tr>
        </table>
    </div>
    <div class="examSchedule">
        <div class="receipt">
            <table class="examSchedule-head" cellspacing="0" style="width: 100%; border: 1px solid #d2cbcb; padding:0 10px">
                <tbody>
                    <tr>
                        <td>
                            @php
                            $itemCount = 0;
                            @endphp

                            @foreach ($students as $student)

                            @php
                            $itemCount++;
                            @endphp

                            <!-- <ul class="repeatingIdCards"> -->
                            <ul class="repeatingIdCards" style="{{ $itemCount > 0 && $itemCount % 2 == 0 ? 'page-break-after: always !important;' : '' }}">
                                <!-- Single List Repeat -->
                                <li style="page-break-inside: avoid;">
                                    <div class="examsHeduleReport">
                                        <table style="width: 100%;" cellpadding="0" cellspcing="0">
                                            <tr>
                                                <th style="border: 1px solid #555;">
                                                    <table style="width: 100%; margin-bottom: 10px" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: middle; text-align: center;">
                                                                <img src="{{ $schoolData['logo']['path'] ?? '' }}" style="width: 80px; height:75px;padding-top: 10px; padding-left: 5px;">
                                                                <br />
                                                            </td>
                                                            <td style="vertical-align: middle; text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 25px; margin-left: 10px;">
                                                                            {{ __($schoolData['title'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 20px; font-weight:500">
                                                                            {{ __($schoolData['street_address'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 16px; font-weight:500; padding-top:5px">
                                                                            <span>
                                                                                {{ __('CONTACT NO: '.(!empty($schoolData['phone']) ? $schoolData['phone'].', ' : '').( $schoolData['phone_2'] ?? '')) }},
                                                                            </span>
                                                                            <span>
                                                                                {{ __(' EMAIL: '. $schoolData['mail'] ?? '') }}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 95px;"></td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 96%; border: 1px solid #555; margin: 0 auto" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">Admit Card</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">
                                                                {{ __(($exam['title'] ?? "") ." - ".($schoolData['academic_year'] ?? "")) }}
                                                            </td>
                                                        </tr>
                                                        <tr style="vertical-align:top;">
                                                            <td style="width:80px; border-right: 1px solid #555;" rowspan="5">
                                                                @if (!empty($student['student_image']['path']))
                                                                <img src="{{ $student['student_image']['path'] }}" style="width: 80px; height: 80px; padding: 5px" alt="student-image">
                                                                @else
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px; padding: 5px">
                                                                @endif
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">
                                                                ROLL NUMBER
                                                            </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">
                                                                {{ __($student['classroom_roll']['roll_no'] ?? "") }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NAME OF THE CANDIDATE</td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">
                                                                {{ __(($student['first_name'] ?? "")." ".($student['middle_name'] ?? "")." ".($student['last_name'] ?? "")) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">CLASS/SECTION </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">
                                                                {{ __($student['classroom']['title'] ?? "") }}
                                                            </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">ADMISSION ID </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;">
                                                                {{ __($student['admission_no'] ?? "") }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">FATHER NAME</td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">
                                                                {{ __(($student['father']['first_name'] ?? "")." ".($student['father']['middle_name'] ?? "")." ".($student['father']['last_name'] ?? "")) }}
                                                            </td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">MOTHER NAME</td>
                                                            <td style=" font-size: 12px; font-weight: 600; padding-left: 2px;">
                                                                {{ __(($student['mother']['first_name'] ?? "")." ".($student['mother']['middle_name'] ?? "")." ".($student['mother']['last_name'] ?? "")) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-top: 1px solid #555;" colspan="5">Subjects in which the candidate is appearing</td>
                                                        </tr>
                                                    </table>
                                                    <table style="width: 97%; margin: 0 auto; padding: 10px 0 10px">
                                                        <tr>
                                                            <td style="padding-left: 0; font-size:12px" width="100%" colspan="5; padding-bottom: 10px">
                                                                <table class="subjects" style="width:100%; border-collapse: collapse; text-align: left;" cellspacing="0" border="1">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style="font-weight: 600; width:5%;">S.N</th>
                                                                            <th style="font-weight: 600; width:20%;">SUBJECT </th>
                                                                            <th style="font-weight: 600; width:15%;">EXAM DATE</th>
                                                                            <th style="font-weight: 600; width:30%;">TIME</th>
                                                                            <th style="font-weight: 600; width:30%;">INVIGILATOR SIGNATURE</th>
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
                                                                            <td style="font-weight: 400">
                                                                                {{ __($count) }}
                                                                            </td>
                                                                            <td style="font-weight: 400">
                                                                                {{ __($examDate['subject_name'] ?? "") }}
                                                                            </td>
                                                                            <td style="font-weight: 400">
                                                                                {{ __($examDate['exam_date'] ?? "") }}
                                                                            </td>
                                                                            <td style="font-weight: 400">
                                                                                {{ __(($examDate['exam_start_time'] ?? "")." - ".($examDate['exam_end_time'] ?? "")) }}
                                                                            </td>
                                                                            <td style="font-weight: 400"></td>
                                                                        </tr>
                                                                        @endforeach
                                                                        @endif
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table style="width: 100%; padding: 0px 15px 10px 15px;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="width: 50.0%; text-align: left; font-size: 14px; font-weight: 500; text-align:center; vertical-align:bottom;">
                                                                <span style="border-top: 1px solid #555; padding:10px 15px">Class Teacher Signature</span>
                                                            </td>
                                                            <td style="width: 50.0%; text-align: center; font-size: 14px; font-weight: 500;  vertical-align:bottom;">
                                                                @if (!empty($digitalSignature))
                                                                <span style=" display:block; margin:0 auto; padding:0; text-align: center; height:30px">
                                                                    <img src="{{$digitalSignature}}" width="107" height="30">
                                                                </span>
                                                                @endif
                                                                <p style="margin:0; display:inline-block; border-top: 1px solid #555; padding:10px 15px 0px 15px;">Principal's Signature</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                            @endforeach
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