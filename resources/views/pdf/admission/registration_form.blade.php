<!doctype html>
<html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta charset="UTF-8">
    <title>Registration Form</title>
    <style>
        .educare-page-repeat {
            z-index:99;
            position: inherit;
        }

        #watermark_image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            max-height:500px;
            max-width:500px;
            opacity:0.3;
        }

        .educare-table {
            /* border: 1px solid #c8c8c8; */
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

        #wrapper {
            background: #fff;
            width: 1100px;
            margin: 0 auto;
            border: 1px solid #c8c8c8;
            padding: 5px;
        }

        #permanentAddress .educare-table {
            margin-bottom: 20px;
        }

        #school_code {
            height:80px;
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            #school_code {
                height:102px;
            }
            #wrapper {
                border: 0;
            }

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

            .pageBreakBefore {
                page-break-before: always;
            }

            /* #permanentAddress .educare-table {
                margin-bottom: 0px !important;
            } */
        }

        @page {
            size: A4;
        }

        @page rotated {
            size: A4;
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
    <div id="wrapper" style="position:relative">
        <div id="watermark_image">
            @if(!empty($waterMarkImage))
            <img src="{{ $waterMarkImage }}" style="max-width: 100%">
            @endif
        </div>
        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%; margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <tbody>
                    <tr style="border-bottom: 3px solid #ccc;">
                        <td colspan="3" style="width: 100%; text-align: center; font-weight: 600; font-size: 30px; padding: 5px;">
                            <table style="width:100%; vertical-align: middle;" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="width:15%; vertical-align:middle;">
                                            <div style="width: 85px; height: 80px;">
                                                @if (!empty($schoolData['logo']['path']))
                                                <img src="{{ $schoolData['logo']['path'] }}" style="height: 100%; width: 100%;" />
                                                @endif
                                            </div>
                                            <div>
                                                <span>Affiliation No: {{ $schoolData?->affiliation_no }}</span>
                                            </div>
                                        </td>
                                        <td style=" text-transform:uppercase; width:70%; vertical-align:middle;">
                                            <p style="margin: 0; font-size: 28px; font-weight: 600;">
                                                {{ __($schoolData?->title ?? "") }}
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight: 300;">
                                                {{ __($schoolData?->street_address) }}
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight: 300;">
                                                <span>
                                                    Contact No: {{ $schoolData?->phone }}, {{ $schoolData?->phone_2 }} |
                                                </span>
                                                <span>
                                                    Email Id: {{ $schoolData?->mail }}
                                                </span>
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight:300;">
                                                <span>
                                                    Website: {{ $schoolData?->domain_url }} |
                                                </span>
                                                <span>
                                                    UDISE Code: {{ $schoolData?->udise_code }}
                                                </span>
                                            </p>
                                        </td>
                                        <td style="vertical-align:top; width: 15%; text-align: right;">
                                            <div class="educare-printarea" colspan="3" style="font-weight: 400; font-size: 13px;">
                                                <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; border-radius: 3px; width: 72px; cursor:pointer">
                                            </div>
                                            <div id="school_code" style="display:flex; align-items:end; justify-content:end">
                                                <span>School Code: {{ $schoolData?->school_number }}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width: 100%; margin-top: 5px; margin-bottom: 15px;">
                                <colgroup>
                                    <col style="width: 20%">
                                    <col style="width: 60%">
                                    <col style="width: 20%">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="text-align:left; table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 35%">

                                                    <col style="width: 65%">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 600;">Form No :</td>

                                                        <td style="text-align: left; border-bottom: 1px dashed #908a8a;">
                                                            <span style="color: #000; font-size: 15px; font-weight: 500;">
                                                                {{ __($enquiry?->form_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 600;">Adm. No. :</td>

                                                        <td style="text-align: left; border-bottom: 1px dashed #908a8a;">
                                                            <span style="color: #000; font-size: 15px; font-weight: 500;">
                                                                {{ __($enquiry?->student?->admission_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style="text-align:center">
                                            <p style="text-transform:uppercase; color: red; margin: 0;font-size: 18px;font-weight: 500;">
                                                {{ __('APPLICATION FOR ADMISSION: (SESSION-'. ($enquiry?->admissionAcademicYear?->academic_session ?? ""). ')') }}
                                            </p>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 25%">

                                                    <col style="width: 75%">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: right; font-weight: 600; padding-right: 10px;">Class</td>

                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px; font-weight: 500;">
                                                                {{ __($enquiry?->classTitle) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: right; font-weight: 600; padding-right: 10px;">Reg.No.</td>

                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px; font-weight: 500;">
                                                                {{ __($enquiry?->registration_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%; margin-top:10px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 33.33%; text-align: center;">
                                            <div style="width: 150px; height: 170px; margin: 0 auto; border: 2px solid #000; background: #ddd; text-align: center; box-sizing: border-box; font-size: 16px;">
                                                @if (!empty($enquiry->studentImage->path))
                                                <img src="{{ $enquiry->studentImage->path }}" style="height: 100%; width: 100%;">
                                                @endif
                                            </div>
                                            <div>
                                                <span>STUDENT'S PHOTO</span>
                                            </div>
                                        </td>
                                        <td style="width: 33.33%; text-align: center;">
                                            <div style="width: 150px; height: 170px; margin: 0 auto; border: 2px solid #000; background: #ddd; text-align: center; box-sizing: border-box; font-size: 16px;">
                                                @if (!empty($enquiry->fatherImage->path))
                                                <img src="{{ $enquiry->fatherImage->path }}" style="height: 100%; width: 100%;">
                                                @endif
                                            </div>
                                            <div>
                                                <span>FATHER'S PHOTO</span>
                                            </div>
                                        </td>
                                        <td style="width: 33.33%; text-align: center;">
                                            <div style="width: 150px; height: 170px; margin: 0 auto; border: 2px solid #000; background: #ddd; text-align: center; box-sizing: border-box; font-size: 16px;">
                                                @if (!empty($enquiry->motherImage->path))
                                                <img src="{{ $enquiry->motherImage->path }}" style="height: 100%; width: 100%;">
                                                @endif
                                            </div>
                                            <div>
                                                <span>MOTHER'S PHOTO</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;">
                                <span style="font-weight: 600;">STUDENT'S INFORMATION</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">First Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->first_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Middle Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->middle_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Last Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->last_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Gender:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->gender) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Blood Group:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->bloodGroup?->name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Mobile:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->contact_number) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Category:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->category?->title) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Religion:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->religionName?->name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Aadhar No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->aadhar_card_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Date of Birth:</td>
                                                        <td style="text-align: left; border-bottom: 1px dashed #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->date_of_birth) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 45%;">
                                                    <col style="width: 55%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 400;">
                                                            <small style="font-size: 12px;">Age As on 1st April,
                                                                <span>
                                                                    {{ __($currentYear) }}
                                                                </span>
                                                                :
                                                            </small>
                                                        </td>
                                                        <td style="text-align: left; border-bottom: 0px solid #908a8a;">
                                                            <small style="font-size: 12px;">
                                                                <span>{{ $enquiry?->age_years }}</span> - Years,
                                                                <span>{{ $enquiry?->age_months }}</span> - Months,
                                                                <span>{{ $enquiry?->age_days }}</span> - Days
                                                            </small>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%; margin-top:20px">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;">
                                <span style="font-weight: 600;">FATHER'S INFORMATION</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Full Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_first_name." ".$enquiry?->father_middle_name." ".$enquiry?->father_last_name ) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Qualification:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_highest_qualification) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Occupation:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_occupation) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Aadhar No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->fahter_aadhar_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Mobile No:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_mobile) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Designation:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->fahter_designation) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 60%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Income/Year in Lakh:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_income_per_year) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">SMS No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_sms_number) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Company Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_company_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Email ID:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_email) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Pan No.:</td>
                                                        <td style="text-align: left; border-bottom: 1px dashed #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->father_pan_card_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%; margin-top:20px">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;">
                                <span style="font-weight: 600;">MOTHER'S INFORMATION</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Full Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_first_name." ".$enquiry?->mother_middle_name." ".$enquiry?->mother_last_name ) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Qualification:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_highest_qualification) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Occupation:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_occupation) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Aadhar No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_aadhar_card_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 44%;">
                                                    <col style="width: 56%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Mobile No:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_mobile) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Designation:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_designation) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 60%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Income/Year in Lakh</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_income_per_year) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">SMS No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_sms_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Company Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_company_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Email ID:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->mother_email) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%; margin-top:20px">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;">
                                <span style="font-weight: 600;">RESIDENTIAL ADDRESS (COMPLETE ADDRESS)</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td colspan="2" style="width: 60%;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 10%;">
                                                    <col style="width: 90%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Address:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->present_address) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style="width: 40%;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 12%;">
                                                    <col style="width: 88%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Landmark:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->landmark) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 80%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">City:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->city) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 11%;">
                                                    <col style="width: 89%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">State:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->presentState?->name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 80%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Pin No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->pin_code) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat" id="permanentAddress">
            <table class="educare-table" style="width: 100%; margin-top:20px;">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;"><span style="font-weight: 600;">PERMANENT ADDRESS</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td colspan="2" style="width: 60%;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 10%;">
                                                    <col style="width: 90%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Address:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->permanent_address) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style="width: 40%;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 12%;">
                                                    <col style="width: 88%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Landmark:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __("") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 80%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">City:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->permanent_city) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 11%;">
                                                    <col style="width: 89%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">State:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->permanentState?->name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 80%;">
                                                </colgroup>

                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Pin No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->permanent_pin_code) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;background: #ececec;margin-bottom: 0;border-bottom: 1px solid #ddd;padding: 7px 6px 4px;"><span style="font-weight: 600;">PREVIOUS SCHOOL INFORMATION</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td style=" width: 45%;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 28%;">
                                                    <col style="width: 45%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">School's Name:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->school_name) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Class:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->school_class) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 50%;">
                                                    <col style="width: 50%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Passing Year:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->school_year) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 10%;">
                                                    <col style="width: 70%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">TC No.:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->tc_no) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 56%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; font-weight: 500;">Referred By:</td>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">
                                                                {{ __($enquiry?->referred_by) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="educare-page-repeat">
            <table class="educare-table" style="width: 100%; margin-top:5px">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;margin-bottom: 0;padding: 7px 6px 4px;"><span style="font-weight: 600;">Acknowledgement</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <p style="margin: 0;color: #333;text-align: left;font-size: 17px;margin-bottom: 0;padding: 7px 6px 4px;">
                                <span style="font-weight: 400;">
                                    We have thoroughly reviewed and comprehended the terms and conditions outlined in the admission notice for entry into {{ $schoolData?->title ?? "" }}.
                                    <br>
                                    We affirm that all statements provided in this application, along with any accompanying documents, are accurate, comprehensive, and truthful in every aspect.
                                    <br>
                                    We acknowledge that should any information be discovered to be false, incorrect, or incomplete at any point, the candidacy of our child for admission to
                                    {{ $schoolData?->title ?? "" }} may be revoked by the School Management.
                                    <br>
                                    <br>
                                    Furthermore, we confirm that our child is in good health and meets all medical requirements for admission. In the event of any change in their medical
                                    condition rendering them unfit, we pledge to promptly notify the School authorities of such developments.
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <table style="table-layout: inherit; width: 100%; margin-top: 15px;">
                                <colgroup>
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                    <col style="width: 33.33%">
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 10%;">
                                                    <col style="width: 90%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: center;"><span style="color: #000; font-size: 15px;">Date:</span></td>
                                                        <td style="text-align: center; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;"></span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style="padding: 0 20px;">
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 100%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">&nbsp;</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 100%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; border-bottom: 2px solid #908a8a;">
                                                            <span style="color: #000; font-size: 15px;">&nbsp;</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 100%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <span style="color: #000; font-size: 15px;"></span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 100%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <span style="color: #000; font-size: 15px;">[Parent/Guardian Signature] </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table style="table-layout: inherit; width: 100%;">
                                                <colgroup>
                                                    <col style="width: 100%;">
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <span style="color: #000; font-size: 15px;">[Principal/Director Signature]</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>