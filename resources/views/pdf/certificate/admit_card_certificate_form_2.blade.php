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
    <div class="educare-top-btn" style="width: 1010px; margin: auto; text-align-left;">
        <table style="width:100%;">
            <tr class="educare-printarea">
                <th style="width: 100%; text-align: right; font-weight: 400; font-size: 12px; height: 30px;">
                    <input type="button" value="Generate" id="educare-tc-generate-btn" style="color: #fff; background: #0b52bd; border:0px; padding: 5px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                    <input type="submit" value="Close" id="btnDraftTC" style=" color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
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
                            <ul class="repeatingIdCards">
                                <!-- Single List Repeat -->
                                <li style="page-break-inside: avoid;">
                                    <div class="examsHeduleReport">
                                        <table style="width: 100%;" cellpadding="0" cellspcing="0">
                                            <tr>
                                                <th style="border: 1px solid #555;">
                                                    <table style="width: 100%; margin-bottom: 20px" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: top; text-align: center;">
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height:75px;padding-top: 10px; padding-left: 5px;">
                                                                <br />
                                                            </td>
                                                            <td style="text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 38px; margin-left: 10px; color: darkred">Demo Public School</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 20px; font-weight:500">Sector - 62, Noida (Uttar Pradesh) India, 201301</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 96%; border: 1px solid #555; margin: 0 auto" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">Admit Card</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">-2023-2024</td>
                                                        </tr>
                                                        <tr style="vertical-align:top;">
                                                            <td style="width:80px; border-right: 1px solid #555;" rowspan="5">
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px; padding: 5px">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">
                                                                ROLL NUMBER
                                                            </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NAME OF THE CANDIDATE</td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">KHUSHWANT</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">CLASS/SECTION </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NURSERY A</td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">ADMISSION ID </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">FATHER NAME</td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">JAGDISH CHOUDHARY</td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">MOTHER NAME</td>
                                                            <td style=" font-size: 12px; font-weight: 600; padding-left: 2px;">RINKU CHOUDHARY
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-top: 1px solid #555;" colspan="5">Subjects in which the candidate is appearing</td>
                                                        </tr>
                                                    </table>
                                                    <table style="width: 97%; margin: 0 auto; padding: 10px 0 80px">
                                                        <tr>
                                                            <td style="padding-left: 0; " width="100%" colspan="5; padding-bottom: 10px">
                                                                <table class="subjects" style="width:100%; border-collapse: collapse; text-align: left;" cellspacing="0" border="1">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style="font-weight: 600; width:5%;">S.N</th>
                                                                            <th style="font-weight: 600; width:20%;">SUBJECT </th>
                                                                            <th style="font-weight: 600; width:15%;">EXAM DATE</th>
                                                                            <th style="font-weight: 600; width:30%;">TIME</th>
                                                                            <th style="font-weight: 600; width:30%;">INVIGILATOR SIGNATURE</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="font-weight: 400">1</td>
                                                                            <td style="font-weight: 400">HINDI</td>
                                                                            <td style="font-weight: 400">05-05-2024</td>
                                                                            <td style="font-weight: 400">06:00 AM-06:05 AM</td>
                                                                            <td style="font-weight: 400"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="font-weight: 400">2</td>
                                                                            <td style="font-weight: 400">ENGLISH</td>
                                                                            <td style="font-weight: 400">05-05-2024</td>
                                                                            <td style="font-weight: 400">06:10 AM-06:15 AM</td>
                                                                            <td style="font-weight: 400"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </li>
                                <!-- Single List Repeat -->
                                <li style="page-break-inside: avoid;">
                                    <div class="examsHeduleReport">
                                        <table style="width: 100%;" cellpadding="0" cellspcing="0">
                                            <tr>
                                                <th style="border: 1px solid #555;">
                                                    <table style="width: 100%; margin-bottom: 20px" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: top; text-align: center;">
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height:75px;padding-top: 10px; padding-left: 5px;">
                                                                <br />
                                                            </td>
                                                            <td style="text-align: center;">
                                                                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td style="font-size: 38px; margin-left: 10px; color: darkred">Demo Public School</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 20px; font-weight:500">Sector - 62, Noida (Uttar Pradesh) India, 201301</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- Student Information -->
                                                    <table style="width: 96%; border: 1px solid #555; margin: 0 auto" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">Admit Card</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-bottom: 1px solid #555;" colspan="5">-2023-2024</td>
                                                        </tr>
                                                        <tr style="vertical-align:top;">
                                                            <td style="width:80px; border-right: 1px solid #555;" rowspan="5">
                                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px; padding: 5px">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">
                                                                ROLL NUMBER
                                                            </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NAME OF THE CANDIDATE</td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;" colspan="3">NAKSH MALI</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">CLASS/SECTION </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NURSERY A</td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid #555; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">ADMISSION ID </td>
                                                            <td style="font-size: 12px; border-bottom: 1px solid; font-weight: 600; padding-left: 2px;"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">FATHER NAME</td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">NARESH MALI</td>
                                                            <td style=" font-size: 12px; border-right: 1px solid #555; font-weight: 600; padding-left: 2px;">MOTHER NAME</td>
                                                            <td style=" font-size: 12px; font-weight: 600; padding-left: 2px;">CHINKI MALI
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center; padding: 5px; border-top: 1px solid #555;" colspan="5">Subjects in which the candidate is appearing</td>
                                                        </tr>
                                                        <table style="width: 97%; margin: 0 auto; padding: 10px 0 80px">
                                                            <tr>
                                                                <td style="padding-left: 0; " width="100%" colspan="3">
                                                                    <table class="subjects" style="width:100%; border-collapse: collapse; text-align: left;" cellspacing="0" border="1">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th style="font-weight: 600; width:5%;">S.N</th>
                                                                                <th style="font-weight: 600; width:20%;">SUBJECT </th>
                                                                                <th style="font-weight: 600; width:15%;">EXAM DATE</th>
                                                                                <th style="font-weight: 600; width:30%;">TIME</th>
                                                                                <th style="font-weight: 600; width:30%;">INVIGILATOR SIGNATURE</th>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="font-weight: 400">1</td>
                                                                                <td style="font-weight: 400">HINDI</td>
                                                                                <td style="font-weight: 400">05-05-2024</td>
                                                                                <td style="font-weight: 400">06:00 AM-06:05 AM</td>
                                                                                <td style="font-weight: 400"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="font-weight: 400">2</td>
                                                                                <td style="font-weight: 400">ENGLISH</td>
                                                                                <td style="font-weight: 400">05-05-2024</td>
                                                                                <td style="font-weight: 400">06:10 AM-06:15 AM</td>
                                                                                <td style="font-weight: 400"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </table>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
