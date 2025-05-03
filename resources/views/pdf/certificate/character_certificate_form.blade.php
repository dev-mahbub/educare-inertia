<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bonafide Certificate</title>
    <style>
        * {
            font-size: 12px;
        }

        .bold {
            font-weight: 600;
        }

        p {
            margin: 0;
            color: gray;
            margin-top: 5px;
        }

        p span {
            color: #4A4747;
            font-size: 13px;
        }

        .MainBody {
            width: 730px;
            eight: 968px;
            border: none;
            position: relative;
            margin: 0 auto 0;
        }

        .maintable {
            width: 100%;
        }

        .maintable tbody>tr>td {
            vertical-align: top;
        }

        .heading {
            color: black;
            padding-left: 10px;
            font-size: 36px;
            margin: 0;
            padding: 6px 10px 0px 45px;
            text-align: left;
        }

        .heading span {
            color: #227EC2;
            font-size: 36px;
        }

        .topHeaderContent {
            margin-left: 50px;
        }

        .subheading {
            margin: 0;
            margin-top: 15px;
            margin-bottom: 0px;
            font-weight: normal;
            font-size: 17px;
            color: chocolate;
        }

        .adr {
            font-size: 17px;
            font-weight: 300;
            margin-top: 0;
            padding: 0 22px;
            margin-bottom: 0;
            color: #5F5D5D;
        }

        .phone {
            font-size: 17px;
            font-weight: 300;
            margin-top: 0;
            padding: 0 126px;
            color: #5F5D5D;
        }

        .dte {
            font-size: 12px;
            font-weight: 600;
            margin-top: 0;
        }

        /*for print button*/
        .educare-printarea a {
            color: #fff;
            background: #2196F3;
            padding: 3px 9px;
            margin-right: 5px;
            border-radius: 3px;
            text-decoration: none;
        }

        h3 {
            font-size: 27px;
            text-decoration: underline;
            font-family: 'Times New Roman' !important;
        }
    </style>

    <style type="text/css" media="print">
        @media print {
            .repeatpage {
                page-break-after: always;
            }
        }

        table {
            page: rotated;
        }
    </style>

    <style type="text/css" media="print">
        @media print {
            .educare-printarea {
                display: none;
            }

            .MainBody {
                border: 0;
            }

            .repeatpage {
                page-break-after: always;
            }
        }

        table {
            page: rotated;
        }

        @page {
            size: portrait;
        }

        @page rotated {
            size: portrait;
        }

        @page {
            margin: 0cm;
        }

        /* All margins set to 2cm */
        @page {
            size: 7.59in 10.7in;
            /* width height 8.27 × 11.69 */
        }

        /*@page{orphans:4; widows:2;}*/
    </style>

</head>

<body>
    <div class="MainBody">
        <table style="width:100%;">
            <tr class="educare-printarea">
                <th style="width: 100%; text-align: right; font-weight: 400; font-size: 13px; height: 30px;">
                    <input type="button" value="Generate" id="educare-tc-generate-btn" style="color: #fff; background: #0b52bd; border:0px; padding: 5px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                    <input type="submit" value="Close" id="btnDraftTC" style=" color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                    <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                </th>
            </tr>
        </table>
    </div>
    <div class="MainBody" style="border:2px solid; margin-top: 50px; padding-bottom: 20px;">
        <table class="maintable topheader">
            <tbody>
                <tr>
                    <td colspan="2" style="border-bottom:2px solid;">
                        <table>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 100%; text-align: left; font-weight: 400; font-size: 10px;">
                                                <img src="{{ asset('images/user/person.png') }}" style="width: 80px; height: 80px; margin-top: 0px;" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table class="topHeaderContent">
                                        <tr>
                                            <th colspan="3" style="width: 100%; text-align: center; font-weight: 600; font-size: 20px; padding-top: 0px">
                                                <span style="width: 100%; text-align: center; font-weight: 600; font-size: 28px;color: black">S.T.S.V INTERNATIONAL SCHOOL</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colspan="3" style="width: 100%; text-align: center; font-weight: 400; font-size: 14px;">
                                                <span style="font-size: 16px;">Motijheel, Anand Nagar, Ara</span><br />
                                                <span style="font-size: 16px;">Motijheel, Anand Nagar, Ara 9473146833,62006220921, <br> stsvschool@gamil.com</span><br />
                                            </th>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td class="" style="width: 100%; text-align: center; padding-left: 190px;">
                                    <h3 class="dte" style="font-size: 20px; text-decoration: underline; margin-top: 10px; margin-bottom: 3px; font-weight: 600; text-align: center;">CHARACTER CERTIFICATE</h3>
                                </td>
                            </tr>
                            <tr>
                                <td class="" style="width: 100%; text-align: center; padding-left: 190px;">
                                    <h3 class="dte" style="font-size: 18px; text-decoration: underline; margin-top: -3px; margin-bottom: 10px; font-weight: 600; font-style: italic;">TO WHOM SO EVER IT MAY CONCERN</h3>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td class="imgborder"><img src="{{ asset('images/user/person.png') }}" style="height: 80px; width: 96px;" /></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <table>
            <tr>
                <td style="font-size: 18px; font-weight: 700;padding-left: 40px">Ref.No: </td>
                <td> <input id="CertificateNumber" name="CertificateNumber" style="border: none;font-size:14px;font-weight:700;width:70px; border-bottom: 1px dotted #000;" type="text" value="" /> </td>
            </tr>
        </table>
        <!--parent info-->
        <table class="maintable">
            <tbody>
                <tr>
                    <td class="" style="width:100%;padding-left: 43px;padding-right: 37px;">
                        <h3 style="line-height: 29px;text-align: justify;text-decoration: none !important;">
                            <span style="font-weight: normal;font-size: 20px;color: #222;">This is to certify that</span>
                            <span contenteditable="true" style="text-transform: uppercase; font-size: 18px; font-weight: 600; color: #000;  padding: 0 4px;">SUMIR KUMAR BISHSAS </span>
                            <span style="font-weight: normal;font-size: 20px;color: #222;">Son of</span>
                            <span contenteditable="true" style="text-transform: capitalize;font-size: 18px; font-weight: 600; color: #000;  padding: 0 4px;">Opal Elmira Gleichner </span>
                            <span style="font-weight: normal; font-size: 20px; color: #222; ">has been a bonafide student of</span>
                            <span contenteditable="true" style="text-transform: uppercase; font-size: 18px; font-weight: 600; color: #000;  padding: 0 4px;">S.T.S.V INTERNATIONAL SCHOOL</span>
                            <span style="font-weight: normal;font-size: 20px;color: #222;">affiliated to</span>
                            <span contenteditable="true" style="text-transform: uppercase; font-size: 18px; font-weight: 600; color: #000; "></span>
                            <span style="font-weight: normal;font-size: 20px;color: #222;">He has been passed</span>
                            <span contenteditable="true" style="text-transform: uppercase; font-size: 18px; font-weight: 600; color: #000;  padding: 0 4px;">Class NURSERY A</span>
                            <span style="font-weight: normal; font-size: 20px; color: #222; ">in academic session</span>
                            <input Value="2024" id="IssueYear" name="IssueYear" style="border: none; width: 75px; font-weight: 600; font-size: 15px; font-family: Roboto; border-bottom: 1px dotted #000;" type="text" value="2024" />
                            <span style="font-weight: normal; font-size: 20px; color: #222; ">with Admission Number</span>
                            <span contenteditable="true" style="text-transform: uppercase; font-size: 18px; font-weight: 600; color: #000; ">jsp100013 .</span>
                        </h3>
                        <h3 style="line-height: 29px;text-align: justify;letter-spacing: 0px;text-decoration: none !important;">
                            <span contenteditable="true" style="text-transform: uppercase;letter-spacing: 1px;font-size: 18px;font-weight: 600;color: #000;
                           padding: 0 4px;">SUMIR KUMAR BISHSAS </span>
                            <span contenteditable="true" style="font-weight: normal;font-size: 20px;color: #222;">is a silent and hard working student who is able to identify his strength and weaknesses.</span>
                        </h3>
                        <h3 style="line-height: 29px;text-align: justify;letter-spacing: 0px;text-decoration: none !important;">
                            <span style="font-weight:700;font-size: 20px;color: #222;">To the best of my knowledge and belief, he bears a good moral character. I wish him all the best in his future plans and endeavors.</span>
                        </h3>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="maintable" style="margin-top:30px;">
            <tbody>
                <tr>
                    <td class="" style="width:100%;text-align:left;padding-left: 49px;font-size: 18px;">Date:03-02-2024</td>
                    <td class="" style="width: 100%; text-align: right; padding-left: 49px;">
                        <h3 class="dte" style="margin-bottom: 0; color: #222; font-size: 20px; line-height: 19px; text-align: left; padding: 0px 33px 0px 35px; font-weight: 300; text-decoration: none; ">
                            Principal/Manager
                        </h3>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
