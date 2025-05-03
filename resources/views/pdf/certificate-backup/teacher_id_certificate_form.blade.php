<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>School ID card</title>
    <link href="https://fonts.googleapis.com/css?family=Pinyon+Script" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Niconne" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i" rel="stylesheet">
    <style>
        .educare-cards {
            padding-left: 0;
            margin: 0;
            list-style: none;
        }

        .educare-cards li {
            margin: 0;
            width: calc(100% / 2);
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
        }

        ul.educare-cards li:nth-child(3n+3) {
            /*            page-break-after: always;*/
        }

        .educare-OuterTable {
            margin: 0 auto;
        }

        .educare-printarea {
            display: block;
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            ul.educare-cards li:nth-child(3n+3) {
                /*            border:red;*/
            }

            .educare-printarea {
                display: none;
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

        /* All margins set to 2cm */

        @page {
            size: 8.27in 11.69in;
            /* width height 8.5in 14in */
        }

        /*@page{orphans:4; widows:2;}*/
    </style>

</head>

<body style="margin:0;">
    <table style="width:793.92px;border-collapse: collapse;margin: 0 auto;">
        <tbody>
            <tr style="vertical-align: top;">
                <td style="width:100%;min-height: 1120.24px;">
                    <!--background-image:url('border.jpg');background-size:cover;-->
                    <table class="OuterTable"
                        style="margin: 0 auto;font-family: Nunito;border-spacing: 0;border-collapse: collapse;width: 770.92px;height: auto;margin-top: 0px;">

                        <thead>
                            <!--title row-->
                            <tr class="printarea">
                                <th
                                    style="width: 100%; text-align: right; font-weight: 400; font-size: 13px; height: 30px; padding-right: 12px; padding: 8px 12px; float: right; background: #eee;">
                                    <input type="button" value="Print" onclick="window.print();"
                                        style="color: #fff; background: #2196F3; padding: 4px 11px; margin-right: 5px; border-radius: 2px; width: 85px; font-size: 17px; border: 1px solid #1c8fea;">
                                    <input type="button" value="Close" onclick="window.close();" id="btnClose"
                                        style="color: #fff; background: #2196F3; padding: 4px 11px; margin-right: 5px; border-radius: 2px; width: 85px; font-size: 17px; border: 1px solid #1c8fea;">
                                </th>
                            </tr>
                            <tr>
                                <th
                                    style="width: 100%; text-align: center; font-weight: 400; font-size: 13px; padding-top: 0px;">
                                    <ul class="repeatingidcards">
                                        @if (count($allTeacherData) > 0)
                                            @foreach ($allTeacherData as $teacher)
                                                <li style="page-break-inside:avoid">
                                                    <div
                                                        style="background-image: url('../../../../images/Logo/vbcv_logo_watermark.jpg'); background-repeat: no-repeat; background-size: 70px 180px; background-position: center; width: 86mm; height: 54mm; position:relative">
                                                        <table style="width: 100%;" cellspacing="0">
                                                            <tr>
                                                                <th
                                                                    style="width: 100%; font-weight: 500; font-size: 15px; font-family: 'Roboto', sans-serif; text-align: center; color: #fff; max-width: 100%; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 18px; -webkit-box-orient: vertical; overflow: hidden; margin: 1px auto 0; padding: 0; background: blue; text-transform: uppercase; border-radius: 4px 4px 0 0;line-height:35px">
                                                                    {{ $teacher['school']['title'] ?? '' }}
                                                                </th>
                                                            </tr>
                                                            <tr style="background: white;">
                                                                <th
                                                                    style="width: 100%; font-weight: 400; font-size: 10px; font-family: 'Roboto', sans-serif; text-align: center; color: #000; max-width: 100%;  line-height: 10px;  padding-top: 2px; background: white;">
                                                                    {{ $teacher['school']['street_address'] ?? '' }},
                                                                    {{ $teacher['school']['city'] ?? '' }}
                                                                    {{ $teacher['school']['country->name'] ?? '' }},
                                                                    {{ $teacher['school']['zip'] ?? '' }}
                                                                    <br />
                                                                    Phone- {{ $teacher['school']['phone'] }}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th
                                                                    style="width: 100%; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: center; float: left; vertical-align: top; line-height: 12px; color: #0c854a;">
                                                                    Teacher Identity Card
                                                                </th>

                                                            </tr>
                                                            <tr>
                                                                <th style="width: 100%; padding-top: 2px;">
                                                                    <table style="width: 100%;" cellspacing="0">
                                                                        <tr>
                                                                            <td
                                                                                style="width: 250px; padding: 0 0px 0 10px;">
                                                                                <table style="width: 100%;">
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Name :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher['first_name'] ?? '' }}
                                                                                            {{ $teacher['middle_name'] ?? '' }}
                                                                                            {{ $teacher['last_name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Emp. Id :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher['employee_id'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            DOJ :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">

                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Designation :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher['designation']['name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Mob No :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher['phone'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Blood Group :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher['blood_group']['name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">

                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">

                                                                                        </td>
                                                                                    </tr>

                                                                                </table>

                                                                            </td>
                                                                            <td
                                                                                style="width: 67px; vertical-align: top; float: right; margin-right: 15px;">
                                                                                <img src="//style.anu.edu.au/_anu/4/images/placeholders/person.png"
                                                                                    alt="student profile picture"
                                                                                    style="height: 72px; width: 65px; margin-top: 2px; float: left; border: 1px solid #eee; margin-left: 2px; border-radius: 3px;">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    style="padding: 0; height: 38px; font-family: 'Roboto'; font-weight: 400; ">
                                                                    <table
                                                                        style="border-radius: 0 0 4px 4px;  height: 25px; background: #eee; width: 100%; position: absolute; bottom: 0; "
                                                                        cellspacing="0">
                                                                        <tr>
                                                                            <td
                                                                                style="text-align: left; padding-left: 5px; padding-bottom: 5px; vertical-align: bottom; ">
                                                                                Authority Signatory
                                                                            </td>
                                                                            <td
                                                                                style="text-align: right; padding-right: 5px; padding-bottom: 5px; vertical-align: bottom; ">
                                                                                Principal
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>

                                                        </table>
                                                    </div>
                                                </li>
                                            @endforeach
                                        @elseif (count($individualTeacherData) > 0)
                                            @foreach ($individualTeacherData as $teacher)
                                                <li style="page-break-inside:avoid">
                                                    <div
                                                        style="background-image: url('../../../../images/Logo/vbcv_logo_watermark.jpg'); background-repeat: no-repeat; background-size: 70px 180px; background-position: center; width: 86mm; height: 54mm; position:relative">
                                                        <table style="width: 100%;" cellspacing="0">
                                                            <tr>
                                                                <th
                                                                    style="width: 100%; font-weight: 500; font-size: 15px; font-family: 'Roboto', sans-serif; text-align: center; color: #fff; max-width: 100%; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 18px; -webkit-box-orient: vertical; overflow: hidden; margin: 1px auto 0; padding: 0; background: blue; text-transform: uppercase; border-radius: 4px 4px 0 0;line-height:35px">
                                                                    {{ $teacher[0]['school']['title'] ?? '' }}
                                                                </th>
                                                            </tr>
                                                            <tr style="background: white;">
                                                                <th
                                                                    style="width: 100%; font-weight: 400; font-size: 10px; font-family: 'Roboto', sans-serif; text-align: center; color: #000; max-width: 100%;  line-height: 10px;  padding-top: 2px; background: white;">
                                                                    {{ $teacher[0]['school']['street_address'] ?? '' }},
                                                                    {{ $teacher[0]['school']['city'] ?? '' }}
                                                                    {{ $teacher[0]['school']['country->name'] ?? '' }},
                                                                    {{ $teacher[0]['school']['zip'] ?? '' }}
                                                                    <br />
                                                                    Phone- {{ $teacher[0]['school']['phone'] }}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th
                                                                    style="width: 100%; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: center; float: left; vertical-align: top; line-height: 12px; color: #0c854a;">
                                                                    Teacher Identity Card
                                                                </th>

                                                            </tr>
                                                            <tr>
                                                                <th style="width: 100%; padding-top: 2px;">
                                                                    <table style="width: 100%;" cellspacing="0">
                                                                        <tr>
                                                                            <td
                                                                                style="width: 250px; padding: 0 0px 0 10px;">
                                                                                <table style="width: 100%;">
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Name :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher[0]['first_name'] ?? '' }}
                                                                                            {{ $teacher[0]['middle_name'] ?? '' }}
                                                                                            {{ $teacher[0]['last_name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Emp. Id :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher[0]['employee_id'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            DOJ :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">

                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Designation :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher[0]['designation']['name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Mob No :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher[0]['phone'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">
                                                                                            Blood Group :
                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">
                                                                                            {{ $teacher[0]['blood_group']['name'] ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="width: 73px; font-size: 11px; font-family: 'Roboto'; font-weight: 400; text-align: left; float: left; vertical-align: top; line-height: 12px;">

                                                                                        </td>

                                                                                        <td
                                                                                            style="width: 143px; font-size: 11px; font-family: 'Roboto'; font-weight: 500; text-align: left; float: left; max-width: 143px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-height: 12px; -webkit-box-orient: vertical; overflow: hidden; vertical-align: top;">

                                                                                        </td>
                                                                                    </tr>

                                                                                </table>

                                                                            </td>
                                                                            <td
                                                                                style="width: 67px; vertical-align: top; float: right; margin-right: 15px;">
                                                                                <img src="//style.anu.edu.au/_anu/4/images/placeholders/person.png"
                                                                                    alt="student profile picture"
                                                                                    style="height: 72px; width: 65px; margin-top: 2px; float: left; border: 1px solid #eee; margin-left: 2px; border-radius: 3px;">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    style="padding: 0; height: 38px; font-family: 'Roboto'; font-weight: 400; ">
                                                                    <table
                                                                        style="border-radius: 0 0 4px 4px;  height: 25px; background: #eee; width: 100%; position: absolute; bottom: 0; "
                                                                        cellspacing="0">
                                                                        <tr>
                                                                            <td
                                                                                style="text-align: left; padding-left: 5px; padding-bottom: 5px; vertical-align: bottom; ">
                                                                                Authority Signatory
                                                                            </td>
                                                                            <td
                                                                                style="text-align: right; padding-right: 5px; padding-bottom: 5px; vertical-align: bottom; ">
                                                                                Principal
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>

                                                        </table>
                                                    </div>
                                                </li>
                                            @endforeach
                                        @else
                                            <span style="font-size: 40px; colorl:red;">Teacher Not found</span>
                                        @endif
                                    </ul>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
