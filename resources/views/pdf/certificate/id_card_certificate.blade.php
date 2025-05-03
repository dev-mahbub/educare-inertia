<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student ID card</title>
    <style>
        .repeatingIdCards {
            padding-left: 0;
            margin: 0;
            list-style: none;
            font-family: inherit;
        }

        .repeatingIdCardsLandscape {
            padding-left: 0;
            margin: 0;
            list-style: none;
        }

        .repeatingIdCards li {
            margin: 0;
            width: calc(100% / 5);
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
        }

        .repeatingIdCardsLandscape li {
            margin: 0;
            width: calc(100% / 4);
            display: inline-block;
            float: left;
            margin-top: 10.024px;
            margin-bottom: 10.024px;
        }
    </style>

    <style type="text/css" media="print">
        @media print {
            .educare-top-btn {
                display: none;
            }

            .repeatingIdCards li {
                page-break-inside: avoid !important;
            }

            .repeatingIdCardsLandscape {
                width: 100% !important;
            }

            .repeatingIdCards {
                width: 100% !important;
            }

            .single-card {
                margin-left: 10px;
            }

            .OuterTable {
                width: 700px !important;
            }
        }

        @page {
            size: A4
        }

        @page rotated {
            size: A4
        }

        table {
            page: rotated
        }

        @page {
            margin: 0cm
        }

        @page {
            size: 11.69in 8.27in;
        }
    </style>

</head>

<body style="margin:0;">
    <div class="educare-top-btn" style="width: 90%; text-align: right;">
        <table style="width:100%;">
            <tr class="educare-printarea">
                <th style="width: 100%; text-align: right; font-weight: 400; font-size: 13px; height: 30px;">
                    <input type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                </th>
            </tr>
        </table>
    </div>
    @if (!empty($idCardCertificate))
    @php
    $isWithBackpage = $idCardCertificate['is_with_backpage'] ?? false;
    @endphp
    <table style="width:793.92px;border-collapse: collapse;margin: 0 auto;">
        <tbody>
            <tr style="vertical-align: top;">
                <td style="width:100%;">
                    <table class="OuterTable" style="margin: 0 auto;border-spacing: 0;border-collapse: collapse; width: 1170.92px;height: auto;margin-top: 0px;">
                        <thead>
                            <!--title row-->
                            <tr>
                                <th style="width:100%;text-align:center;font-weight:400;font-size:13px;padding-top:0px;">
                                    {{-- portrait student --}}
                                    @if (
                                    (isset($idCardCertificate['audience_type']) && $idCardCertificate['audience_type'] == 'Student') &&
                                    (isset($idCardCertificate['orientation']) && $idCardCertificate['orientation'] == 'Portrait') && !empty($students)
                                    )

                                    @php
                                    $itemCount = 0;
                                    @endphp

                                    @foreach ($students as $student)

                                    @php
                                    $itemCount++;
                                    @endphp

                                    <ul class="repeatingIdCards" style="{{ $itemCount > 0 && ($isWithBackpage == false && $itemCount % 9 == 0) ? 'page-break-after:always;' : '' }} width: 1400px;">
                                        <!-- <ul class="repeatingIdCards" style="{{ $itemCount > 0 && (($isWithBackpage == false && $itemCount % 6 == 0) || ($isWithBackpage == true && $itemCount % 3 == 0)) ? 'page-break-after:always;' : '' }} width: 1400px;"> -->
                                        <!-- single card item -->
                                        <li class="single-card" style="{{'background-color:'.($idCardCertificate['background_color'] ?? '') .';'}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['background_image'] }}'); background-size: contain; width: 2.125in; height: 3.375in; overflow: hidden; border: 2px solid #757575;  margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="{{$headerBackgroundColorStyles}} background-image: url('{{ $idCardCertificate['header_background_image'] }}'); background-position: center; background-size: cover; width: 100%; height: 61px; border-bottom: 1px solid #757575; position: relative;">
                                                <tr>
                                                    <td style="{{ $headerSchoolTitleStyles }}">
                                                        {{ __($idCardCertificate['header']['school_title']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleTwoStyles }} padding-bottom: 5px;">
                                                        <span>
                                                            {{ __($idCardCertificate['header']['title_2']['title'] ?? "") }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleThreeStyles }}">
                                                        {{ __($idCardCertificate['header']['title_3']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <!-- backup -->
                                                <!-- <tr>
                                                    <td style="color: black;font-weight: 800;line-height: 12px;font-size: 12px;">
                                                        LOHIA NAGAR MT.CARMEL HIGH SCHOOL
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; line-height: 0px;">
                                                        <span style="font-size: 8px; font-weight: 600; padding-bottom: 5px; color: #000;">The
                                                            Affliated to ICSE(New Dilhi)
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 8px;">
                                                        DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 0px;">
                                                        PH. No,- 0612-2365534, Email Id- info@lmcg
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 5px;">
                                                        Website: info@example.com
                                                    </td>
                                                </tr> -->
                                                <tr>
                                                    <td style="position: absolute; top: 13px; left: 5px; width: 25px;">
                                                        <img src="{{ $idCardCertificate['school_logo'] }}" style="width: 25px;" alt="logo">
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- Profile section -->
                                            <div style="{{$bodyBackgroundColorStyles}} background-image: url('{{ $idCardCertificate['body_background_image'] }}');  background-position: center; background-size: cover;">
                                                <table style="width: 100%; font-size: 12px;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="background-size: cover; height: 81px; width: 40%; position: relative;">
                                                                <img src="{{ $student['student_image'] ?? ''}}" style="height: 74px; width: 65px; border-radius: 3px; padding-left: 2px; padding-top: 12#px;">
                                                                <div style="color: gray; font-size: 10px; position: absolute; transform: rotate(270deg); left: 18px; top: 35px; font-weight: 600;">
                                                                    IDENTITY CARD
                                                                </div>
                                                                <div style="color: gray; width: 71px; position: absolute; transform: rotate(270deg); right: 20px; top: 30px; font-weight: 600;">
                                                                    {{ __($idCardCertificate['academic_session'] ?? "") }}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!-- Student details -->
                                                <table style="width: 100%; font-size: 12px;" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding: 2px 0; text-align: center; font-size: 11px; background-color: #FF033E; color: #fff; font-size: 16px; font-weight: 600;padding-left: 15px">
                                                                {{ __($student['student_name'] ?? "") }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div style="height: 124px;">
                                                                    <!-- <div style="height: 110px; overflow: hidden;"> -->
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width: 100%; ">
                                                                                    <table style="width: 200px;">
                                                                                        <tbody>
                                                                                            @if (!empty($idCardCertificate['column_data']))
                                                                                            @foreach ($idCardCertificate['column_data'] as $column)
                                                                                            @if (isset($column['key_name']) && $column['key_name'] != 'student_name')
                                                                                            <tr>
                                                                                                <td style="text-align:left; width: 100%; padding-top: 0px; padding-left: 10px; max-height: 14px; max-width: 156px; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                                                    <span style="{{ $bodyLabelStyles }} ">
                                                                                                        {{ __($column['label_name'] ?? "") }} :
                                                                                                    </span>
                                                                                                    <span style="{{ $bodyValueStyles }}">
                                                                                                        @if (isset($column['key_name']))
                                                                                                        {{ __($student[$column['key_name']] ?? "") }}
                                                                                                        @endif
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            @endif
                                                                                            @endforeach
                                                                                            @endif
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <!-- backup -->
                                                                <!-- <div style="height: 110px; overflow: hidden;">
                                                                    <table style="width: 100%; font-size: 12px; margin-top: 5px;" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="width: 10%; font-size: 11px; text-align: left; padding-left: 15px; font-weight: 500;">
                                                                                CLASS :</td>
                                                                            <td style="width: 12%; font-size: 11px; color: #0b52bd; text-align: left;">
                                                                                NURSERY</td>
                                                                            <td style="width: 10%; font-size: 11px; text-align: left; font-weight: 500;">
                                                                                SECTION :</td>
                                                                            <td style="width: 10%; font-size: 11px; color: #0b52bd; text-align: left;">
                                                                                A</td>
                                                                        </tr>
                                                                    </table>
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width: 100%; ">
                                                                                    <table style="width: 200px;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                                                    ROLL : <span style="color: #0b52bd">10</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    D.O.B : <span style="color: #0b52bd">24-04-2001</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    BLOOD GROUP :
                                                                                                    <span style="color: #0b52bd">A+</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                                        KUMAR</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="line-height: 15px; width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    ADDRESS : <span style="color: #0b52bd; font-size: 10px">
                                                                                                        VILLAGE-YUVAN
                                                                                                        PATH, POST -
                                                                                                        CHATRA,
                                                                                                        BLOCK-
                                                                                                        GWALPARA,
                                                                                                        DISTRICT
                                                                                                        MADHEPURA,
                                                                                                        BIHAR,
                                                                                                        856364
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div> -->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- Address -->

                                            <table style="{{$footerBackgroundColorStyles}} background-image: url('{{ $idCardCertificate['footer_background_image'] }}'); background-size: cover; background-position: center; width: 100%; font-size: 12px; position: absolute; bottom: 0px; left: 0px; padding-bottom:5px; " cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table style="width: 100%; font-size: 12px; margin-top: 5px; padding-right: 10px" cellpadding="0" cellspacing="0">
                                                                <tr style="display: flex; justify-content: space-between; align-items: flex-end;">
                                                                    <td style="padding-left: 5px;">
                                                                        <span style="{{ $footerTitleOneStyles }}">{{ __($idCardCertificate['footer']['title_1']['title'] ?? "") }}</span> <span style="{{ $footerTitleTwoStyles }}">{{ __($idCardCertificate['footer']['title_2']['title'] ?? "") }}</span>
                                                                    </td>

                                                                    <td style=" display: flex; flex-direction: column; font-size: 11px; text-align: left; font-weight: 500;">
                                                                        <img src="{{ $idCardCertificate['footer_signature_image'] }}" style="width: 30px">
                                                                        <span>Principal</span>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li><!-- single card item -->

                                        @if ($isWithBackpage == true)
                                        <li class="single-card" style=" {{$backpageBackgroundColorStyles}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['backpage_background_image'] }}'); background-size: cover; width: 2.125in; height: 3.375in; overflow: hidden; border: 2px solid #757575;  margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="width: 200px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleOneStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_1']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleTwoStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_2']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <!-- backup -->
                                                <!-- <tbody>
                                                    <tr>
                                                        <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            Important Instructions:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                            For safety purpose this ID card must be produced
                                                        </td>
                                                    </tr>
                                                </tbody> -->
                                            </table>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="height: 170px; overflow: hidden;">
                                                                <table style="width: 200px; padding-left: 10px">
                                                                    <tbody>
                                                                        @if (!empty($idCardCertificate['column_data']))
                                                                        @foreach ($idCardCertificate['column_data'] as $column)
                                                                        @if ($column['is_with_backpage'] == true)
                                                                        <tr>
                                                                            <td style="text-align:left; width: 100%; padding-top: 0px; max-height: 14px; max-width: 156px;  line-height: 14px; ">
                                                                                <span style="{{ $backpageBodyLabelStyles }}">
                                                                                    {{ __($column['label_name'] ?? "") }} :
                                                                                </span>
                                                                                <span style="{{ $backpageBodyValueStyles }}">
                                                                                    @if (isset($column['key_name']))
                                                                                    {{ __($student[$column['key_name']] ?? "") }}
                                                                                    @endif
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        @endif
                                                                        @endforeach
                                                                        @endif
                                                                    </tbody>
                                                                </table>
                                                                <!-- backup -->
                                                                <!-- <table style="width: 200px; padding-left: 10px">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 12px; font-weight: 400; padding-top: 0px; text-align: left; color: #000; max-height: 14px; max-width: 156px;  line-height: 14px; ">
                                                                                Student Name :
                                                                                <span style="color: #0b52bd; font-size: 12px">
                                                                                    ZALOK KUMAR
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 12px; font-weight: 400; padding-top: 0px; text-align: left; color: #000; max-height: 14px; max-width: 156px;   line-height: 14px;">
                                                                                Class Name :
                                                                                <span style="color: #0b52bd; font-size: 12px">
                                                                                    NURSERY
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 12px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                Admission :
                                                                                <span style="color: #0b52bd">576576
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                BLOOD GROUP : <span style="color: #0b52bd">A+</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                    KUMAR</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="line-height: 15px; width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                ADDRESS : <span style="color: #0b52bd; font-size: 10px">
                                                                                    VILLAGE-YUVAN PATH, POST -
                                                                                    CHATRA,
                                                                                    BLOCK- GWALPARA, DISTRICT
                                                                                    MADHEPURA,
                                                                                    BIHAR, 856364
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table> -->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="width: 200px; position: absolute; bottom: 0;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleThreeStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_3']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleFourStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_4']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <!-- backup -->
                                                <!-- <tbody>
                                                    <tr>
                                                        <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            Note:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                            Please keep this ID safely and loss of the same should
                                                            be reported to the school authorities immediately.
                                                        </td>
                                                    </tr>
                                                </tbody> -->
                                            </table>
                                        </li> <!-- single card item -->
                                        @endif
                                    </ul>
                                    @endforeach
                                    @endif

                                    {{-- portrait staff --}}
                                    @if (
                                    (isset($idCardCertificate['audience_type']) && $idCardCertificate['audience_type'] == 'Teacher') &&
                                    (isset($idCardCertificate['orientation']) && $idCardCertificate['orientation'] == 'Portrait') && !empty($staffs)
                                    )

                                    @php
                                    $itemCount = 0;
                                    @endphp

                                    @foreach ($staffs as $staff)

                                    @php
                                    $itemCount++;
                                    @endphp

                                    <ul class="repeatingIdCards" style="{{ $itemCount > 0 && ($isWithBackpage == false && $itemCount % 9 == 0) ? 'page-break-after:always;' : '' }} width: 1400px;">
                                        <!-- single card item -->
                                        <li class="single-card" style="{{'background-color:'.($idCardCertificate['background_color'] ?? '') .';'}} position: relative; height: 61px;background-position: center; background-image: url('{{ $idCardCertificate['background_image'] }}'); background-size: cover; width: 2.125in; height: 3.375in; overflow: hidden; border: 2px solid #757575; margin:10px;">
                                            <!-- Top Section School Name -->
                                            <table style="{{$headerBackgroundColorStyles}} background-image: url('{{ $idCardCertificate['header_background_image'] }}'); background-position: center; background-size: cover; width: 100%; height: 61px; border-bottom: 1px solid #757575; position: relative;">
                                                <tr>
                                                    <td style="{{ $headerSchoolTitleStyles }}">
                                                        {{ __($idCardCertificate['header']['school_title']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleTwoStyles }} padding-bottom: 5px;">
                                                        <span>
                                                            {{ __($idCardCertificate['header']['title_2']['title'] ?? "") }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleThreeStyles }}">
                                                        {{ __($idCardCertificate['header']['title_3']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <!-- backup -->
                                                <!-- <tr>
                                                    <td style="color: black;font-weight: 800;line-height: 12px;font-size: 12px;">
                                                        LOHIA NAGAR MT.CARMEL HIGH SCHOOL
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; line-height: 0px;">
                                                        <span style="font-size: 8px; font-weight: 600; padding-bottom: 5px; color: #000;">The
                                                            Affliated to ICSE(New Dilhi)
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 8px;">
                                                        DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 0px;">
                                                        PH. No,- 0612-2365534, Email Id- info@lmcg
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 6px; color: #000; line-height: 5px;">
                                                        Website: info@example.com
                                                    </td>
                                                </tr> -->
                                                <tr>
                                                    <td style="position: absolute; top: 13px; left: 5px; width: 25px;">
                                                        <img src="{{ $idCardCertificate['school_logo'] }}" style="width: 25px">
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- Profile section -->
                                            <div style="{{$bodyBackgroundColorStyles}} background-image: url('{{ $idCardCertificate['body_background_image'] }}'); background-position: center; background-size: cover;">
                                                <table style="width: 100%; font-size: 12px;">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div style=" font-size: 14px; font-weight: 600; background-color: rgb(246, 246, 115); width: 120px; margin: 0 auto;">
                                                                    Employee Id Card
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="background-size: cover; height: 75px; width: 40%; position: relative;">
                                                                <img src="{{ $staff['staff_image'] ?? '' }}" style="height: 74px; width: 65px; border-radius: 3px; padding-left: 2px; padding-top: 12#px;">
                                                                <div style="color: gray; font-size: 10px; position: absolute; transform: rotate(270deg); left: 18px; top: 35px; font-weight: 600;">
                                                                    ID No-{{ __($staff['employee_id'] ?? "") }}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!-- Employee details -->
                                                <table style="width: 100%; font-size: 12px;" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding: 2px 0; text-align: center; font-size: 11px; background-color: #FF033E; color: #fff; font-size: 16px; font-weight: 600;padding-left: 15px">
                                                                {{ __($staff['staff_name'] ?? "") }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <!-- <div style="height: 110px; overflow: hidden;"> -->
                                                                <div style="height: 124px;">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width: 100%; ">
                                                                                    <table style="width: 200px;">
                                                                                        <tbody>
                                                                                            @if (!empty($idCardCertificate['column_data']))
                                                                                            @foreach ($idCardCertificate['column_data'] as $column)
                                                                                            @if (isset($column['key_name']) && $column['key_name'] != 'staff_name' && $column['key_name'] != 'employee_id')
                                                                                            <tr>
                                                                                                <td style="text-align:left; width: 100%; padding-top: 0px; padding-left: 10px; max-height: 14px; max-width: 156px; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                                                    <span style="{{ $bodyLabelStyles }} ">
                                                                                                        {{ __($column['label_name'] ?? "") }} :
                                                                                                    </span>
                                                                                                    <span style="{{ $bodyValueStyles }}">
                                                                                                        @if (isset($column['key_name']))
                                                                                                        {{ __($staff[$column['key_name']] ?? "") }}
                                                                                                        @endif
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            @endif
                                                                                            @endforeach
                                                                                            @endif
                                                                                            <!-- <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                                                    DESIGNATION :
                                                                                                    <span style="color: #0b52bd">SUPERVISOR</span>
                                                                                                </td>
                                                                                            </tr> -->
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- backup -->
                                                    <!-- <tbody>
                                                        <tr>
                                                            <td style="padding: 2px 0; text-align: center; font-size: 11px; background-color: #FF033E; color: #fff; font-size: 16px; font-weight: 600;padding-left: 15px">
                                                                Sumir Kumar Bishsas</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div style="height: 110px; overflow: hidden;">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width: 100%; ">
                                                                                    <table style="width: 200px;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                                                    DESIGNATION :
                                                                                                    <span style="color: #0b52bd">SUPERVISOR</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    D.O.B : <span style="color: #0b52bd">02-12-1956</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    BLOOD GROUP :
                                                                                                    <span style="color: #0b52bd">A+</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                                        KUMAR</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="line-height: 15px; width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; padding-left: 10px; text-align: left; color: #000;">
                                                                                                    ADDRESS : <span style="color: #0b52bd; font-size: 10px">
                                                                                                        VILLAGE-YUVAN
                                                                                                        PATH, POST -
                                                                                                        CHATRA,
                                                                                                        BLOCK-
                                                                                                        GWALPARA,
                                                                                                        DISTRICT
                                                                                                        MADHEPURA,
                                                                                                        BIHAR,
                                                                                                        856364
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody> -->
                                                </table>
                                            </div>
                                            <!-- Address -->

                                            <table style="{{$footerBackgroundColorStyles}} width: 100%; font-size: 12px; position: absolute; background-position: center; background-image: url('{{ $idCardCertificate['footer_background_image'] }}'); background-size: cover; padding-bottom: 5px;" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table style="width: 100%; font-size: 12px; margin-top: 5px; padding-bottom: 10px;" cellpadding="0" cellspacing="0">
                                                                <tr style="display: flex; justify-content: space-between; align-items: end; padding-right: 10px;">
                                                                    <td style=" font-size: 9px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                        <span style="{{ $footerTitleOneStyles }}">{{ __($idCardCertificate['footer']['title_1']['title'] ?? "") }}</span> <span style="{{ $footerTitleTwoStyles }}">{{ __($idCardCertificate['footer']['title_2']['title'] ?? "") }}</span>
                                                                    </td>
                                                                    <td style=" font-size: 11px; text-align: left; font-weight: 500; display: flex; flex-direction: column;">
                                                                        <img src="{{ $idCardCertificate['footer_signature_image'] }}" style="width: 20px">
                                                                        <span>Principal</span>
                                                                    </td>
                                                                </tr>
                                                                <!-- backup -->
                                                                <!-- <tr style="display: flex; justify-content: space-between; align-items: end; padding-right: 10px;">
                                                                    <td style=" font-size: 9px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                        MOBILE NO : 45654656</td>
                                                                    <td style=" font-size: 11px; text-align: left; font-weight: 500; display: flex; flex-direction: column;">
                                                                        <img src="https://i.postimg.cc/xNR5v52d/signature.png" style="width: 20px" alt="signature">
                                                                        <span>Principal</span>
                                                                    </td>
                                                                </tr> -->
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li> <!-- single card item -->

                                        @if ($isWithBackpage == true)
                                        <li class="single-card" style="{{$backpageBackgroundColorStyles}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['backpage_background_image'] }}'); background-size: cover; width: 2.125in; height: 3.375in; overflow: hidden; border: 2px solid #757575; margin:10px;">
                                            <!-- Top Section School Name -->
                                            <table style="width: 200px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleOneStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_1']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleTwoStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_2']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <!-- backup -->
                                                    <!-- <tr>
                                                        <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            Important Instructions:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                            For safety purpose this ID card must be produced
                                                        </td>
                                                    </tr> -->
                                                </tbody>
                                            </table>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="height: 170px; overflow: hidden;">
                                                                <table style="width: 200px; padding-left: 10px">
                                                                    <tbody>
                                                                        @if (!empty($idCardCertificate['column_data']))
                                                                        @foreach ($idCardCertificate['column_data'] as $column)
                                                                        @if ($column['is_with_backpage'] == true)
                                                                        <tr>
                                                                            <td style="text-align:left; width: 100%; padding-top: 0px; max-height: 14px; max-width: 156px;  line-height: 14px; ">
                                                                                <span style="{{ $backpageBodyLabelStyles }}">
                                                                                    {{ __($column['label_name'] ?? "") }} :
                                                                                </span>
                                                                                <span style="{{ $backpageBodyValueStyles }}">
                                                                                    @if (isset($column['key_name']))
                                                                                    {{ __($staff[$column['key_name']] ?? "") }}
                                                                                    @endif
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        @endif
                                                                        @endforeach
                                                                        @endif
                                                                        <!-- backup -->
                                                                        <!-- <tr>
                                                                            <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                BLOOD GROUP : <span style="color: #0b52bd">A+</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100%; font-size: 11px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                    KUMAR</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="line-height: 15px; width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                ADDRESS : <span style="color: #0b52bd; font-size: 10px">
                                                                                    VILLAGE-YUVAN PATH, POST -
                                                                                    CHATRA,
                                                                                    BLOCK- GWALPARA, DISTRICT
                                                                                    MADHEPURA,
                                                                                    BIHAR, 856364
                                                                                </span>
                                                                            </td>
                                                                        </tr> -->
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="width: 200px; position: absolute; bottom: 0;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleThreeStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_3']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleFourStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_4']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <!-- backup -->
                                                    <!-- <tr>
                                                        <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                            Note:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                            Please keep this ID safely and loss of the same should
                                                            be reported to the school authorities immediately.
                                                        </td>
                                                    </tr> -->
                                                </tbody>
                                            </table>
                                        </li> <!-- single card item -->
                                        @endif
                                    </ul>
                                    @endforeach
                                    @endif

                                    {{-- landscape student --}}
                                    @if (
                                    (isset($idCardCertificate['audience_type']) && $idCardCertificate['audience_type'] == 'Student') &&
                                    (isset($idCardCertificate['orientation']) && $idCardCertificate['orientation'] == 'Landscape') && !empty($students)
                                    )

                                    @php
                                    $itemCount = 0;
                                    @endphp
                                    @foreach ($students as $student)

                                    @php
                                    $itemCount++;
                                    @endphp

                                    <ul class="repeatingIdCardsLandscape" style="{{ $itemCount > 0 && (($isWithBackpage == false && $itemCount % 8 == 0) || ($isWithBackpage == true && $itemCount % 4 == 0)) ? 'page-break-after:always;' : '' }} width: 1400px;">
                                        <!-- single card item -->
                                        <li class="single-card" style="{{'background-color:'.($idCardCertificate['background_color'] ?? '') .';'}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['background_image'] ?? ''}}'); background-size: cover; height: 2.125in; width: 3.375in; overflow: hidden; border: 2px solid #999999; margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="{{$headerBackgroundColorStyles}} width: 100%; border-bottom: 1px solid #999999; position: relative;background-position: center; background-image: url('{{ $idCardCertificate['header_background_image'] }}'); background-repeat: no-repeat; background-size: cover; min-height: 57px;">
                                                <tr>
                                                    <td style="{{ $headerSchoolTitleStyles }}">
                                                        {{ __($idCardCertificate['header']['school_title']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleTwoStyles }}">
                                                        <span style="font-size: 10px; font-weight: 600; padding-bottom: 5px; color: #000;">
                                                            {{ __($idCardCertificate['header']['title_2']['title'] ?? "") }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleThreeStyles }} padding-top: 3px;">
                                                        {{ __($idCardCertificate['header']['title_3']['title'] ?? "") }}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="position: absolute; top: 15px; left: 3px; width: 25px;">
                                                        <img src="{{ $idCardCertificate['school_logo'] ?? '' }}" style="width: 40px;">
                                                    </td>
                                                </tr>
                                                <!-- <tr>
                                                    <td style="color: black;font-weight: 800;line-height: 12px;font-size: 12px;">
                                                        LOHIA NAGAR MT.CARMEL HIGH SCHOOL
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; line-height: 0px;">
                                                        <span style="font-size: 10px; font-weight: 600; padding-bottom: 5px; color: #000;">The
                                                            Affliated to ICSE(New Dilhi)
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 8px;">
                                                        DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 0px;">
                                                        PH. No,- 0612-2365534, Email Id- info@lmcg
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 5px;">
                                                        Website: info@example.com
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="position: absolute; top: 15px; left: 3px; width: 25px;">
                                                        <img src="{{ $idCardCertificate['school_logo'] ?? '' }}" style="width: 40px;">
                                                    </td>
                                                </tr> -->
                                            </table>
                                            <!-- Profile section -->
                                            <table style="{{$bodyBackgroundColorStyles}} width: 100%; font-size: 12px;background-position: center; background-image: url('{{ $idCardCertificate['body_background_image'] }}');">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-weight: 600; font-size: 14px;">{{ __($student['student_name'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr style="display: flex; justify-content: space-between; padding: 0px 20px; position: relative;">
                                                        <div style="color: gray; font-size: 10px; position: absolute; transform: rotate(270deg); left: -28px; top: 110px; font-weight: 600;">
                                                            IDENTITY CARD
                                                        </div>
                                                        <td style="background-size: cover; height: 81px; width: 27%;">
                                                            <img src="{{ $student['student_image'] ?? ''}}" style="height: 74px; width: 65px; border-radius: 3px; padding-left: 2px;">
                                                        </td>
                                                        <td style="width: 100%; height: 95px;">
                                                            <!-- <td style="width: 100%; height: 95px; overflow: hidden;"> -->
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width: 100%; ">
                                                                            <table style="width: 200px;  margin-top: -8px;">
                                                                                <tbody>
                                                                                    @if (!empty($idCardCertificate['column_data']))
                                                                                    @foreach ($idCardCertificate['column_data'] as $column)
                                                                                    @if (isset($column['key_name']) && $column['key_name'] != 'student_name')
                                                                                    <tr>
                                                                                        <td style="text-align:left; width: 100%; padding-top: 0px;">
                                                                                            <span style="{{ $bodyLabelStyles }} ">
                                                                                                {{ __($column['label_name'] ?? "") }} :
                                                                                            </span>
                                                                                            <span style="{{ $bodyValueStyles }}">
                                                                                                @if (isset($column['key_name']))
                                                                                                {{ __($student[$column['key_name']] ?? "") }}
                                                                                                @endif
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    @endif
                                                                                    @endforeach
                                                                                    @endif
                                                                                    <!-- <tr>
                                                                                        <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            D.O.B : <span style="color: #0b52bd">24-04-2001</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                                KUMAR</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="line-height: 15px; width: 100%; font-size: 9px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            ADDRESS : <span style="color: #0b52bd; font-size: 9px">
                                                                                                VILLAGE-YUVAN PATH,
                                                                                                POST - CHATRA,
                                                                                                BLOCK- GWALPARA,
                                                                                                DISTRICT MADHEPURA,
                                                                                                BIHAR, 856364
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr> -->
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <div style="color: gray; width: 71px; position: absolute; transform: rotate(270deg); right: -20px; top: 110px; font-weight: 600;">
                                                            {{ __($idCardCertificate['academic_session'] ?? "") }}
                                                        </div>
                                                        <!-- backup -->
                                                        <!-- <td style="background-size: cover; height: 81px; width: 27%;">
                                                            <img src=//style.anu.edu.au/_anu/4/images/placeholders/person.png alt="student profile picture" style="height: 74px; width: 65px; border-radius: 3px; padding-left: 2px;">
                                                        </td>
                                                        <td style="width: 100%; height: 95px; overflow: hidden;">
                                                            <table style="width: 100%; font-size: 12px;" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td style="width: 2%; font-size: 10px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                        CLASS :</td>
                                                                    <td style="width: 2%; font-size: 10px; color: #0b52bd; text-align: left;">
                                                                        XII</td>
                                                                    <td style="width: 2%; font-size: 10px; text-align: left; font-weight: 500;">
                                                                        SECTION :</td>
                                                                    <td style="width: 2%; font-size: 10px; color: #0b52bd; text-align: left;">
                                                                        A</td>
                                                                    <td style="width: 2%; font-size: 10px; text-align: left; font-weight: 500;">
                                                                        ROLL :</td>
                                                                    <td style="width: 2%; font-size: 10px; color: #0b52bd; text-align: left;">
                                                                        10</td>
                                                                </tr>
                                                            </table>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width: 100%; ">
                                                                            <table style="width: 200px;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            D.O.B : <span style="color: #0b52bd">24-04-2001</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                                KUMAR</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="line-height: 15px; width: 100%; font-size: 9px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                            ADDRESS : <span style="color: #0b52bd; font-size: 9px">
                                                                                                VILLAGE-YUVAN PATH,
                                                                                                POST - CHATRA,
                                                                                                BLOCK- GWALPARA,
                                                                                                DISTRICT MADHEPURA,
                                                                                                BIHAR, 856364
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
                                                        <div style="color: gray; width: 71px; position: absolute; transform: rotate(270deg); right: -20px; top: 110px; font-weight: 600;">
                                                            2023-2024
                                                        </div> -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- Student details -->

                                            <!-- Address -->
                                            <table style="{{$footerBackgroundColorStyles}} width: 100%; font-size: 12px; position: absolute; padding-bottom: 8px; bottom: 0px; left: 0px;background-position: center; background-image: url('{{ $idCardCertificate['footer_background_image'] }}'); background-repeat: no-repeat; background-size: cover;" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table style="width: 100%; font-size: 12px; margin-top: 5px; padding: 0 10px" cellpadding="0" cellspacing="0">
                                                                <tr style="display: flex; justify-content: space-between; align-items: flex-end;">
                                                                    <td style=" font-size: 9px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                        <span style="{{ $footerTitleOneStyles}}">
                                                                            {{ __($idCardCertificate['footer']['title_1']['title'] ?? "") }}
                                                                        </span>
                                                                        <span style="{{ $footerTitleTwoStyles}}">
                                                                            {{ __($idCardCertificate['footer']['title_2']['title'] ?? "") }}
                                                                        </span>
                                                                    </td>

                                                                    <td style=" display: flex; flex-direction: column; font-size: 11px; text-align: left; font-weight: 500;">
                                                                        <img src="{{ $idCardCertificate['footer_signature_image'] }}" style="width: 30px">
                                                                        <span>Principal</span>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        <!-- single card item -->

                                        @if ($isWithBackpage == true)
                                        <!-- > single card item -->
                                        <li class="single-card" style="{{$backpageBackgroundColorStyles}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['backpage_background_image'] }}'); background-size: cover; height: 2.125in; width: 3.375in; overflow: hidden; border: 2px solid #999999;margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="width: 100%;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{$backpageTitleOneStyles}} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_1']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{$backpageTitleTwoStyles}} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_2']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <!-- <tbody>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                Important Instructions:
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                                For safety purpose this ID card must be produced
                                                            </td>
                                                        </tr>
                                                    </tbody> -->
                                            </table>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="width: 100%; max-height: 100px; overflow: hidden; padding-left: 10px;">
                                                                <table>
                                                                    <tbody>
                                                                        @if (!empty($idCardCertificate['column_data']))
                                                                        @foreach ($idCardCertificate['column_data'] as $column)
                                                                        @if ($column['is_with_backpage'] == true)
                                                                        <tr>
                                                                            <td style="text-align:left; padding-top: 0px; padding-left: 0px; max-height: 14px;  ">
                                                                                <span style="{{ $backpageBodyLabelStyles }} ">
                                                                                    {{ __($column['label_name'] ?? "") }} :
                                                                                </span>
                                                                                <span style="{{ $backpageBodyValueStyles }}">
                                                                                    @if (isset($column['key_name']))
                                                                                    {{ __($student[$column['key_name']] ?? "") }}
                                                                                    @endif
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        @endif
                                                                        @endforeach
                                                                        @endif
                                                                    </tbody>
                                                                </table>
                                                                <!-- <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000; max-height: 14px;  ">
                                                                                    Student Name :
                                                                                    <span style="color: #0b52bd; font-size: 12px">
                                                                                        ZALOK KUMAR
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000; max-height: 14px; line-height: 14px; ">
                                                                                    Class Name :
                                                                                    <span style="color: #0b52bd; font-size: 12px">
                                                                                        NURSERY
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000;">
                                                                                    Admission :
                                                                                    <span style="color: #0b52bd">576576
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table> -->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="width: 100%; position: absolute; bottom: 0;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleThreeStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_3']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleFourStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_4']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        @endif
                                    </ul>

                                    @endforeach
                                    @endif

                                    {{-- landscape staff --}}
                                    @if (
                                    (isset($idCardCertificate['audience_type']) && $idCardCertificate['audience_type'] == 'Teacher') &&
                                    (isset($idCardCertificate['orientation']) && $idCardCertificate['orientation'] == 'Landscape') && !empty($staffs)
                                    )

                                    @php
                                    $itemCount = 0;
                                    @endphp

                                    @foreach ($staffs as $staff)

                                    @php
                                    $itemCount++;
                                    @endphp

                                    <ul class="repeatingIdCardsLandscape" style="{{ $itemCount > 0 && (($isWithBackpage == false && $itemCount % 8 == 0) || ($isWithBackpage == true && $itemCount % 4 == 0)) ? 'page-break-after:always;' : '' }} width: 1400px;">
                                        <!-- single card item -->
                                        <li class="single-card" style="{{'background-color:'.($idCardCertificate['background_color'] ?? '') .';'}}position: relative;background-position: center; background-image: url('{{ $idCardCertificate['background_image'] }}'); background-size: cover; height: 2.125in; width: 3.375in; overflow: hidden; border: 2px solid #999999; margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="{{$headerBackgroundColorStyles}} background-position: center; background-image: url('{{ $idCardCertificate['header_background_image'] }}'); background-repeat: no-repeat; background-size: cover; width: 100%; border-bottom: 1px solid #999999; position: relative;  min-height: 57px;">
                                                <tr>
                                                    <td style="{{ $headerSchoolTitleStyles }}">
                                                        {{ __($idCardCertificate['header']['school_title']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleTwoStyles }}">
                                                        <span style="font-size: 10px; font-weight: 600; padding-bottom: 5px; color: #000;">
                                                            {{ __($idCardCertificate['header']['title_2']['title'] ?? "") }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="{{ $headerTitleThreeStyles }} padding-top: 3px;">
                                                        {{ __($idCardCertificate['header']['title_3']['title'] ?? "") }}
                                                    </td>
                                                </tr>
                                                <!-- backup -->
                                                <!-- <tr>
                                                        <td style="color: black;font-weight: 800;line-height: 12px;font-size: 12px;">
                                                            LOHIA NAGAR MT.CARMEL HIGH SCHOOL
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center; line-height: 0px;">
                                                            <span style="font-size: 10px; font-weight: 600; padding-bottom: 5px; color: #000;">The
                                                                Affliated to ICSE(New Dilhi)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 8px;">
                                                            DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 0px;">
                                                            PH. No,- 0612-2365534, Email Id- info@lmcg
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center; font-size: 8px; padding-top: 3px; color: #000; line-height: 5px;">
                                                            Website: info@example.com
                                                        </td>
                                                    </tr> -->
                                                <tr>
                                                    <td style="position: absolute; top: 15px; left: 3px; width: 25px;">
                                                        <img src="{{ $idCardCertificate['school_logo'] ?? '' }}" style="width: 40px">
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- Profile section -->
                                            <table style="{{$bodyBackgroundColorStyles}} width: 100%; font-size: 12px;background-position: center; background-image: url('{{ $idCardCertificate['body_background_image'] }}'); background-repeat: no-repeat; background-size: cover;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="font-weight: 600; font-size: 14px; background-color: rgb(246, 246, 115); width: 120px; margin: 0 auto; padding: 2px 0;">
                                                                Employee Id Card
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style="display: flex; justify-content: space-between; padding: 0px 20px; position: relative;">
                                                        <div style="color: gray; font-size: 10px; position: absolute; transform: rotate(270deg); left: -25px; top: 110px; font-weight: 600;">
                                                            ID No-{{ __($staff['employee_id'] ?? "") }}
                                                        </div>
                                                        <td style="background-size: cover; height: 81px; width: 27%;">
                                                            <img src="{{ $staff['staff_image'] ?? '' }}" style="height: 74px; width: 65px; border-radius: 3px; padding-left: 2px;">
                                                        </td>
                                                        <td>
                                                            <div style="width: 100%; height: 80px;">
                                                                <!-- <div style="width: 100%; height: 80px; overflow: hidden;"> -->
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width: 100%; ">
                                                                                <table style="width: 200px; margin-top: -8px;">
                                                                                    <tbody>
                                                                                        @if (!empty($idCardCertificate['column_data']))
                                                                                        @foreach ($idCardCertificate['column_data'] as $column)
                                                                                        @if (isset($column['key_name']) && $column['key_name'] != 'employee_id')
                                                                                        <tr>
                                                                                            <td style="text-align:left; width: 100%; padding-top: 0px;">
                                                                                                <span style="{{ $bodyLabelStyles }} ">
                                                                                                    {{ __($column['label_name'] ?? "") }} :
                                                                                                </span>
                                                                                                <span style="{{ $bodyValueStyles }}">
                                                                                                    @if (isset($column['key_name']))
                                                                                                    {{ __($staff[$column['key_name']] ?? "") }}
                                                                                                    @endif
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        @endif
                                                                                        @endforeach
                                                                                        @endif
                                                                                    </tbody>
                                                                                    <!-- backup -->
                                                                                    <!-- <tbody>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                                    DESIGNATION : <span style="color: #0b52bd">SUPERVISOR</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                                    D.O.B : <span style="color: #0b52bd">24-04-2001</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="width: 100%; font-size: 10px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                                    F.NAME : <span style="color: #0b52bd">SHUSHANT
                                                                                                        KUMAR</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="line-height: 15px; width: 100%; font-size: 9px; font-weight: 400; padding-top: 0px; text-align: left; color: #000;">
                                                                                                    ADDRESS : <span style="color: #0b52bd; font-size: 9px">
                                                                                                        VILLAGE-YUVAN
                                                                                                        PATH,
                                                                                                        POST - CHATRA,
                                                                                                        BLOCK- GWALPARA,
                                                                                                        DISTRICT
                                                                                                        MADHEPURA,
                                                                                                        BIHAR, 856364
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody> -->
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- Student details -->

                                            <!-- Address -->
                                            <div style="">
                                                <table style="{{$footerBackgroundColorStyles}} width: 100%; height: 40px; overflow: hidden font-size: 12px; position: absolute; bottom: 0px; left: 0px;background-position: center; background-image: url('{{ $idCardCertificate['footer_background_image'] }}'); background-repeat: no-repeat; background-size: cover; " cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table style="width: 100%; font-size: 12px; margin-top: 5px; padding: 0 10px" cellpadding="0" cellspacing="0">
                                                                    <tr style="display: flex; justify-content: space-between; align-items: flex-end;">
                                                                        <td style=" font-size: 9px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                            <span style="{{ $footerTitleOneStyles}}">
                                                                                {{ __($idCardCertificate['footer']['title_1']['title'] ?? "") }}
                                                                            </span>
                                                                            <span style="{{ $footerTitleTwoStyles}}">
                                                                                {{ __($idCardCertificate['footer']['title_2']['title'] ?? "") }}
                                                                            </span>
                                                                        </td>

                                                                        <td style=" display: flex; flex-direction: column; font-size: 11px; text-align: left; font-weight: 500;">
                                                                            <img src="{{ $idCardCertificate['footer_signature_image'] }}" style="width: 30px">
                                                                            <span>Principal</span>
                                                                        </td>
                                                                    </tr>
                                                                    <!-- backup -->
                                                                    <!-- <tr style="display: flex; justify-content: space-between; align-items: flex-end;">
                                                                            <td style=" font-size: 9px; text-align: left; padding-left: 5px; font-weight: 500;">
                                                                                MOBILE NO : 45654656</td>

                                                                            <td style=" display: flex; flex-direction: column; font-size: 11px; text-align: left; font-weight: 500;">
                                                                                <img src="https://i.postimg.cc/xNR5v52d/signature.png" style="width: 30px;" alt="signature">
                                                                                <span>Principal</span>
                                                                            </td>
                                                                        </tr> -->
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                        <!-- single card item -->

                                        @if ($isWithBackpage == true)
                                        <li class="single-card" style="{{$backpageBackgroundColorStyles}} position: relative;background-position: center; background-image: url('{{ $idCardCertificate['backpage_background_image'] }}'); background-size: cover; height: 2.125in; width: 3.375in; overflow: hidden; border: 2px solid #999999; margin: 10px">
                                            <!-- Top Section School Name -->
                                            <table style="width: 100%;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{$backpageTitleOneStyles}} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_1']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{$backpageTitleTwoStyles}} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_2']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <!-- backup -->
                                                    <!-- <tr>
                                                            <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                Important Instructions:
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                                For safety purpose this ID card must be produced
                                                            </td>
                                                        </tr> -->
                                                </tbody>
                                            </table>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="width: 100%; max-height: 100px; overflow: hidden; padding-left: 10px;">
                                                                <table>
                                                                    <tbody>
                                                                        @if (!empty($idCardCertificate['column_data']))
                                                                        @foreach ($idCardCertificate['column_data'] as $column)
                                                                        @if ($column['is_with_backpage'] == true)
                                                                        <tr>
                                                                            <td style="text-align:left; padding-top: 0px; padding-left: 0px; max-height: 14px;  ">
                                                                                <span style="{{ $backpageBodyLabelStyles }} ">
                                                                                    {{ __($column['label_name'] ?? "") }} :
                                                                                </span>
                                                                                <span style="{{ $backpageBodyValueStyles }}">
                                                                                    @if (isset($column['key_name']))
                                                                                    {{ __($staff[$column['key_name']] ?? "") }}
                                                                                    @endif
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        @endif
                                                                        @endforeach
                                                                        @endif
                                                                    </tbody>
                                                                    <!-- backup -->
                                                                    <!-- <tbody>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000; max-height: 14px;  ">
                                                                                    Student Name :
                                                                                    <span style="color: #0b52bd; font-size: 12px">
                                                                                        ZALOK KUMAR
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000; max-height: 14px; line-height: 14px; ">
                                                                                    Class Name :
                                                                                    <span style="color: #0b52bd; font-size: 12px">
                                                                                        NURSERY
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style=" font-size: 12px; font-weight: 400; padding-top: 0px; padding-left: 0px; text-align: left; color: #000;">
                                                                                    Admission :
                                                                                    <span style="color: #0b52bd">576576
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody> -->
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="width: 100%; position: absolute; bottom: 0;">
                                                <tbody>
                                                    <tr>
                                                        <td style="{{ $backpageTitleThreeStyles }} width: 100%; padding-top: 0px; padding-left: 5px; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                                                            {{ __($idCardCertificate['back_page']['title_3']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="{{ $backpageTitleFourStyles }} padding-left: 5px;">
                                                            {{ __($idCardCertificate['back_page']['title_4']['title'] ?? "") }}
                                                        </td>
                                                    </tr>
                                                    <!-- backup -->
                                                    <!-- <tr>
                                                            <td style="width: 100%; font-size: 14px; font-weight: 600; padding-top: 0px; padding-left: 5px; text-align: left; color: #000; max-height: 14px; max-width: 156px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-height: 14px; -webkit-box-orient: vertical; overflow: hidden;">
                                                                Note:
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: 400; text-align: left; padding-left: 5px; font-style: italic;">
                                                                Please keep this ID safely and loss of the same should
                                                                be reported to the school authorities immediately.
                                                            </td>
                                                        </tr> -->
                                                </tbody>
                                            </table>
                                        </li><!-- single card item -->
                                        @endif
                                    </ul>
                                    @endforeach
                                    @endif
                                </th>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>