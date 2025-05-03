<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Teacher Experience Certificate</title>

    <script src="../../js/core/jquery-2.2.0.min.js" type="text/javascript"></script>

    <style>
        .OuterTable {
            margin: 0 auto;
        }

        /* Create a custom checkbox */
        .container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default checkbox */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 47%;
            height: 22px;
            width: 22px;
            background-color: #0B52BD;
            border-radius: 4px;
        }

        /* When the checkbox is checked, add a blue background */
        .container input:checked~.checkmark {
            background-color: #0B52BD;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        .container input:checked~.checkmark:after {
            display: block;
        }

        /* Style the checkmark/indicator */
        .container .checkmark:after {
            left: 8px;
            top: 3px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            .educare-printarea {
                display: none;
            }

            .checkmark-input {
                display: none;
            }
        }

        @page {
            size: portrait
        }

        @page rotated {
            size: portrait
        }

        table {
            page: rotated
        }

        @page {
            margin: 0cm
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
    <form action="/Teacher/SaveExprienceCertificate" method="post">
        <table style="width: 100%;">
            <tbody>
                <tr class="printarea">
                    <th style="width: 50%;">
                        <div class="checkmark-input">
                            <label class="container" style="margin-top: 15px;">
                                <span style="padding-left: 80px; font-weight: 400; font-size: 16px;">Include
                                    Header</span>
                                <input type="checkbox" checked="checked" id="showcheck" onclick="myFunction()">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </th>
                    <th style="width: 50%; text-align: right; font-weight: 400; font-size: 13px; height: 30px; padding-right: 23%;">
                        <div class="educare-top-btn">
                            <table style="width:100%;">
                                <tr class="educare-printarea">
                                    <th style="width: 100%; text-align: right; font-weight: 400; font-size: 13px; height: 30px;">
                                        <input type="button" value="Save" id="educare-tc-save-btn" style="color: #fff; background: #0b52bd; border:0px; padding: 5px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                                        <input type="submit" value="Close" id="btnDraftTC" style=" color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                                        <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                                    </th>
                                </tr>
                            </table>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
        <table style="width: 793.92px; border-collapse: collapse; margin: 0 auto;">
            <tbody>
                <tr style="vertical-align: top;">
                    <td style="width: 100%; height: 1000.24px; border: 3px solid #000;">
                        <table class="OuterTable" style="margin: 0 auto; font-family: Nunito; border-spacing: 0; border-collapse: collapse; width: 725.92px; height: auto; margin-top: 25px;">
                            <thead>
                                <!--title row-->
                                <tr>
                                    <th id="myP" style="width: 100%; text-align: center; font-weight: 400; font-size: 13px; /* padding-top:15px; */">
                                        <table style="width: 100%;">
                                            <tbody>
                                                <!--Header Row Start-->
                                                <tr style="vertical-align: top;">
                                                    <td style="width: 20%;">
                                                        <img src="{{ asset('images/user/person.png') }}" style="width:85px;height:85px; ">
                                                    </td>
                                                    <td style="width: 80%; padding-top: 10px;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <th colspan="3" style="width: 100%; text-align: center; font-weight: 600; padding-top: 0; font-size: 32px; color: #000;">
                                                                        <b>S.T.S.V INTERNATIONAL SCHOOL</b>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3" style="width: 100%; font-weight: 600; font-size: 13px; font-family: sans-serif; text-align: center;">
                                                                        <b>Motijheel, Anand Nagar, Ara</b>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3" style="width: 100%; font-weight: 600; font-size: 13px; font-family: sans-serif; text-align: center;">
                                                                        <b>9473146833,62006220921, stsvschool@gamil.com</b>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3" style="width: 100%; font-weight: 600; font-size: 13px; font-family: sans-serif; text-align: center;">
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3" style="width: 100%; font-weight: 600; font-size: 13px; font-family: sans-serif; text-align: center;">
                                                                        (Affiliated to the Cental Board of Secondary
                                                                        Education)
                                                                    </th>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!--header Row End-->
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="3" style="width: 100%; font-weight: 500; font-size: 23px; text-align: center; padding-top: 7px; padding-left: 77px; margin-top: 0px;">
                                        <span style="border-bottom: 2px solid #000;">TEACHING EXPERIENCE
                                            CERTIFICATE</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th style="width: 100%;">
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr style="vertical-align: top;">
                                                    <td style="width: 100%; text-align: left; padding-top: 25px;">
                                                        <!--School Code-->
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 8%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left;">
                                                                        Ref No:</td>
                                                                    <td style="width: 71%; text-align: right;">
                                                                        <input id="ReferenceNo" maxlength="10" name="ReferenceNo" style="border: none; width: 16%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                    <td style="width: 71%; text-align: right; ">
                                                                        <img src="//style.anu.edu.au/_anu/4/images/placeholders/person.png" style="width: 80px; height: 80px;" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--School CodeEnd-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <!--continue lines-->
                                <tr>
                                    <th style="width: 100%;">
                                        <table style="width: 100%; margin-top: 27px;">
                                            <tbody>
                                                <tr style="vertical-align: top;">
                                                    <td style="width: 28%; font-weight: 400; font-size: 16px; /* font-weight: 500; *//* margin-top: 23px; */font-family: sans-serif; text-align: left; padding-left: 59px; line-height: 20px;">
                                                        Certified that Mr./Miss/Mrs/</td>
                                                    <td style="width: 50%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                        <input id="TeacherName" name="TeacherName" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="Sumir Kumar Bishsas " />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height: 10px;"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <th style="width: 100%;">
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr style="vertical-align: top;">
                                                    <td style="width: 12%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                        <span>S/o/D/o Shri</span>
                                                    </td>

                                                    <td style="width: 35%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                        <input id="FatherName" name="FatherName" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                    </td>
                                                    <td style="width: 15%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                        <span>Employment Id: </span>
                                                    </td>

                                                    <td style="width: 25%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                        <input id="EmployeeId" name="EmployeeId" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>

                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <!--  2-column grid-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 50%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 33%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        resident of</td>
                                                                    <td style="width: 35%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="Village" name="Village" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="width: 50%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 28%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: center; line-height: 20px;">
                                                                        Tehsil </td>
                                                                    <td style="width: 72%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="Tehsil" name="Tehsil" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>

                                <!--three column grid-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 50%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 20%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        Distt.</td>

                                                                    <td style="width: 80%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="District" name="District" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="width: 50%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 25%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        having qualification </td>
                                                                    <td style="width: 35%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="Qualification" name="Qualification" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <!-- 2-column grid-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 100%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 40%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        has been working in this School since</td>
                                                                    <td style="width: 30%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="SchoolAttendYear" name="SchoolAttendYear" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                    <td style="width: 20%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        as a Nursery</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>

                                <!--2-column grid-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 100%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 39%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        Teacher/ Primary Teacher/TGT/PGT till</td>
                                                                    <td style="width: 50%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="SchoolLeaveYear" name="SchoolLeaveYear" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <!--Whether the pupil was in receipt of any fee concession, if so the nature of such consession-->
                                <!--Single column column grid-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 40%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 25%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        He/She has</td>
                                                                    <td style="width: 44%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="YearExprience" name="YearExprience" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="width: 60%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 12%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        years</td>
                                                                    <td style="width: 0%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="MonthExprience" name="MonthExprience" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                    </td>
                                                                    <td style="width: 66%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        months of teaching experience.</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 70%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 25%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                        His/Her Date Of Birth is </td>
                                                                    <td style="width: 44%; text-align: right; border-bottom: 1px dotted #ddd;">
                                                                        <input id="DateOfBirthString" name="DateOfBirthString" style="border: none; width: 100%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                                        <input type="hidden" name="DateOfBirth" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="width: 30%;">
                                                        <table style="width: 100%;">
                                                            <tbody>
                                                                <tr style="vertical-align: top;">
                                                                    <td style="width: 25%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>

                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <!--blank line-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 100%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                        During his/her service in this school, his/her work and conduct
                                                        remained good.</td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 100%; font-weight: 400; font-size: 16px; font-family: sans-serif; text-align: left; line-height: 20px;">
                                                        We with for his/her bright future.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="height: 10px;"></td>
                                </tr>
                                <!-- Heading Row-->
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 7%; font-weight: 600; font-size: 16px; font-family: sans-serif; line-height: 20px; padding-top: 47px; text-align: left;">
                                                        Date:-</td>
                                                    <td style="width: 25%; padding-top: 47px;">
                                                        <input id="NewDate" name="NewDate" style="border: none; width: 60%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: left; padding-top: 6px; height: 12px; text-transform: uppercase;" type="text" value="" />
                                                    </td>
                                                    <td style="width: 23%;"></td>
                                                    <td style="width: 50%; font-weight: 600; font-size: 16px; font-family: sans-serif; text-align: right; line-height: 20px; padding-top: 47px;">
                                                        Principal</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <table style="width: 100%;">
                                            <tbody>
                                                <tr>

                                                    <td style="width: 50%;">
                                                        <input type="text" value="" style="border: none; width: 30%; font-weight: 600; font-size: 16px; font-family: serif; text-align: left; float: right; padding-top: 6px; height: 12px; text-transform: uppercase;">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <input data-val="true" data-val-number="The field TeacherId must be a number." data-val-required="The TeacherId field is required." id="hdnTeacherId" name="TeacherId" type="hidden" value="14" /> <input type="hidden" id="hdnResponse" />
    </form>
    <script>
        function myFunction() {

            var checkBox = document.getElementById("showcheck");

            // If the checkbox is checked, display the output text
            if (checkBox.checked == true) {
                document.getElementById("myP").style.visibility = "visible";

            } else {
                document.getElementById("myP").style.visibility = "hidden";
            }
        }
    </script>
</body>

</html>
