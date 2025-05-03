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
            width: 8.50in;
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
    <div class="educare-top-btn" style="width: 1010px; margin: auto; text-align:left;">
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
            <table class="examSchedule-head" cellspacing="0" style="width: 100%;">
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

                            <ul class="repeatingIdCards" style="{{ $itemCount > 0 && $itemCount % 2 == 0 ? 'page-break-after: always !important;' : '' }}">
                                <!-- Single List Repeat -->
                                <li style="page-break-inside: avoid;">
                                    <div class="examsHeduleReport">
                                        <table style="width: 100%;" cellpadding="0" cellspcing="0">
                                            <tr>
                                                <th style="border: 1px solid #555;">
                                                    <table style="width: 100%; margin-bottom: 20px" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: middle; text-align: center;">
                                                                <img src="{{ $schoolData['logo']['path'] ?? "" }}" style="width: 80px; height:75px;padding-top: 10px; padding-left: 5px;">
                                                                <br />
                                                            </td>
                                                            <td style="vertical-align:middle; text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 26px; margin-left: 10px; color: darkred">
                                                                            {{ __($schoolData['title'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 15px; font-weight:600; padding-bottom: 5px; color: #4682b4">
                                                                            {{ __($schoolData['street_address'] ?? '') }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 15px; font-weight:600; color: #4682b4">
                                                                            {{ __("Email :".($schoolData['mail'] ?? '').",Contact :".($schoolData['phone'] ?? '')) }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="width: 110px;"></td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 97%; margin: 0 auto;;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td colspan="2">
                                                                <table style="width: 100%; text-align: center;" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-top: 10px;">
                                                                                <span style="border: 1px solid #ccc9c9; color: #4682b4; padding: 1px 10px 4px; width: 150px; display: inline-block; border-radius: 2px; background: #eee; box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15); font-size: 17px;">Admit card</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr style="display:flex; justify-content:space-between; align-items:center">
                                                            <td style="width: 40%;">
                                                                <table style="width: 100%;">
                                                                    <tr>
                                                                        <td>
                                                                            <table style="width: 100%;">
                                                                                <tr>
                                                                                    <td style="font-weight: 500; width: 35%; font-size: 12px">
                                                                                        Name of Student :</td>
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
                                                                                    <td style="font-weight: 500; width: 35%; font-size: 12px">
                                                                                        Father's Name :</td>
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
                                                                                    <td style="font-weight: 500; width: 35%; font-size: 12px">
                                                                                        Mother's Name :</td>
                                                                                    <td style="font-size: 12px;">
                                                                                        {{ __(($student['mother']['first_name'] ?? "")." ".($student['mother']['middle_name'] ?? "")." ".($student['mother']['last_name'] ?? "")) }}
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
                                                                                    <td style="font-weight: 500; font-size: 12px; width: 30%">Class :</td>
                                                                                    <td style="font-size: 12px; width: 70%">
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
                                                                                    <td style="font-weight: 500; font-size: 12px; width: 30%">Roll No. :
                                                                                    </td>
                                                                                    <td style="font-size: 12px; width: 70%">
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
                                                                                    <td style="font-weight: 500; font-size: 12px; width: 30%">Contact No. :
                                                                                    </td>
                                                                                    <td style="font-size: 12px; width: 70%">
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
                                                    </table>
                                                    <table class="subjects" style="width:100%; border-collapse: collapse; border-top: 1px solid #555;  border-bottom: 1px solid #555;" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <th style="font-weight: 600; width:25%; padding-left:20px">EXAM DATE</th>
                                                                <th style="font-weight: 600; width:25%; padding-left:20px">SUBJECT </th>
                                                                <th style="font-weight: 600; width:25%; padding-left:20px">START TIME</th>
                                                                <th style="font-weight: 600; width:25%; padding-left:20px">END TIME</th>
                                                            </tr>

                                                            @if (!empty($examDateData))
                                                            @foreach ($examDateData as $examDate)
                                                            <tr>
                                                                <td style="font-weight: 400; width:25%; padding-left:20px">{{ __($examDate['exam_date'] ?? "") }}</td>
                                                                <td style="font-weight: 400; width:25%; padding-left:20px">{{ __($examDate['subject_name'] ?? "") }}</td>
                                                                <td style="font-weight: 400; width:25%; padding-left:20px">{{ __($examDate['exam_start_time'] ?? "") }}</td>
                                                                <td style="font-weight: 400; width:25%; padding-left:20px">{{ __($examDate['exam_end_time'] ?? "") }}</td>
                                                            </tr>
                                                            @endforeach
                                                            @endif
                                                        </tbody>
                                                    </table>
                                                    <table style="border-bottom:1px solid #555; width: 100%; font-weight:500; padding:10px 20px;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td colspan="5" style="font-size: 14px;">You are allowed to appear in the <span style="font-style:italic">{{ __($exam['title'] ?? "") }} </span>.commencing as above time table.</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; padding-top: 5px">
                                                                <span style="font-size: 15px; font-weight: 600">Note:</span>
                                                                <span style="font-size: 14px">Keep this card safely and must bring to the exam venue on every exam date.</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table style="width: 100%; margin-top: 10px; padding: 0px 15px 15px 15px;" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="width: 33.3%; text-align: center; font-size: 14px; font-weight: 600; vertical-align:bottom;">
                                                                @if (!empty($digitalSignature))
                                                                <span style=" display:block; margin:0 auto; padding:0; text-align: center; height:30px">
                                                                    <img src="{{$digitalSignature}}" width="107" height="30">
                                                                </span>
                                                                @endif
                                                                <p style="margin:0; display:inline-block; padding:5px 0px 0px 0px;">PRINCIPAL'S SIGNATURE</p>
                                                            </td>
                                                            <td style="width: 33.3%; text-align: center; font-size: 14px; font-weight: 600; vertical-align:bottom;">
                                                                <span>SCHOOL SEAL</span>
                                                            </td>
                                                            <td style="width: 33.3%; text-align: center; font-size: 14px; font-weight: 600; vertical-align:bottom;">
                                                                <span>EXAM CONTROLLER</span>
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
    <h2>No DataAvailable</h2>
    @endif
</body>

</html>