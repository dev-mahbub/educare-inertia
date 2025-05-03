@if(!empty($report))
<div style="border: 3px solid #000; padding: 20px; position:relative;">
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
        <thead>
            <!-- <tr>
                <td style="width: 18%">
                    <span style="font-size:12px">
                        {{ __('Affiliation No-'. ($schoolData['affiliation_no'] ?? '')) }}
                    </span>
                </td>
                <td style="width: 64%"></td>
                <td style="width: 18%">
                    <span style="font-size:12px">
                        {{ __('School Code-'. ($schoolData['school_number'] ?? '')) }}
                    </span>
                </td>
            </tr> -->
            <tr style="width: 100%;">
                <td style="width:18%; vertical-align:top;">
                    <span style="font-size:12px; display:block">
                        @if (!empty($report['show_affiliation_no']) && $report['show_affiliation_no'] == true)
                        {{ __('Affiliation No-'. ($schoolData['affiliation_no'] ?? '')) }}
                        @endif
                    </span>
                    @if (!empty($schoolData['logo']['path']))
                    <img src="{{ $schoolData['logo']['path'] }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                    @else
                    <span style="width: 85px; height: 80px; margin-top: 0px;"></span>
                    @endif
                </td>
                <td style="width:64%; vertical-align:top; text-align:center">
                    <table style="width: 100%; text-align:center">
                        <tr>
                            <td style="font-size: 9px; font-weight: 400;">
                                <h1>{{ __($schoolData['title'] ?? "") }}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px;">{{ __($schoolData['street_address'] ?? "") }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px;">{{ __('Email : ' . ($schoolData['mail'] ?? "").', Ph.: ' . ($schoolData['phone'] ?? "")) }}</td>
                        </tr>
                    </table>
                </td>
                <td style="width:18%; vertical-align:top;">
                    <span style="font-size:12px; display:block">
                        @if (!empty($report['show_school_code']) && $report['show_school_code'] == true)
                        {{ __('School Code-'. ($schoolData['school_number'] ?? '')) }}
                        @endif
                    </span>
                    @if (isset($report['show_cbse_logo']) && $report['show_cbse_logo'] == true && !empty($report['cbse_logo']))
                    <img src="{{$report['cbse_logo']}}" style="width: 85px; height: 80px; margin-top: 0px;">
                    @elseif (isset($report['show_icse_logo']) && $report['show_icse_logo'] == true && !empty($report['icse_logo']))
                    <img src="{{$report['icse_logo']}}" style="width: 85px; height: 80px; margin-top: 0px;">
                    @else
                    <span style="width: 85px; height: 80px; margin-top: 0px;"></span>
                    @endif
                </td>
            </tr>
        </thead>
    </table>

    <table style=" width: 100%; font-family: 'Inter' , sans-serif; border-collapse: collapse; margin-top: 5px;">
        <thead>
            <tr>
                <td style="vertical-align: center; text-align:center;">
                    <table style="border: 1px solid #000; width: 100%; padding-top: 5px; padding-bottom: 5px">
                        <tr>
                            <td style="font-size: 8px; font-weight: 400;">
                                <h2>{{ __('Academic Session :'. ($schoolData['academic_year'] ?? "")) }}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">{{ __('Progress Report') }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </thead>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top:5px;">
        <tbody>
            <tr>
                <td style="width:50%; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px;">{{ __('Student\'s Name') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px;"><strong>{{ __($report['name'] ?? "") }}</strong></td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px;">{{ __('Father\'s Name') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px;"><strong>{{ __($report['father_name'] ?? "") }}</strong></td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px;">{{ __('Mother\'s Name') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px;"><strong>{{ __($report['mother_name'] ?? "") }}</strong></td>
                            </tr>
                            @if (!empty($report['show_date_of_birth']) && $report['show_date_of_birth'] == true)
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px;">{{ __('Date of Birth') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px;"><strong>{{ __($report['birth_date'] ?? "") }}</strong></td>
                            </tr>
                            @endif
                        </tbody>
                    </table>
                </td>
                <td style="width:32%; padding-left:30px; vertical-align: top;">
                    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:50px;">{{ __('Admission No. :') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px; solid #000;"><strong>{{ __($report['admission_no'] ?? "") }}</strong></td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px;">{{ __('Class /Section :') }}</td>
                                <td style="margin-bottom:10px; padding-bottom:3px; solid #000;"><strong>{{ __($report['classroom_title'] ?? "") }}</strong></td>
                            </tr>
                            <tr>
                                <td style="margin-bottom:10px; padding-bottom:3px; margin-left:5px;">Roll No :</td>
                                <td style="margin-bottom:10px; padding-bottom:3px; solid #000;"><strong>{{ __($report['roll_no'] ?? "") }}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width:18%; padding-left:30px; vertical-align: top; text-align:right">
                    @if (!empty($report['student_image']))
                    <img src="{{$report['student_image']}}" style="width: 85px; height: 80px; margin-top: 0px;">
                    @else
                    <span style="width: 85px; height: 80px; margin-top: 0px;"></span>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    @if (!empty($report['scholastic_report']))
    <h3 style="margin:0;vertical-align:top; text-align:left;">{{ __('Scholastics Achievement') }}</h3>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
        <tbody>
            <tr>
                <th colspan="1" rowspan="2" style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Subject') }}</h4>
                </th>
                @if (!empty($report['scholastic_report']['parentGroups']))

                @foreach ($report['scholastic_report']['parentGroups'] as $groupId => $parentGroup)

                @php

                $totalCount = !empty($report['scholastic_report']['childGroups'][$groupId]) ? count($report['scholastic_report']['childGroups'][$groupId]) : 0;

                @endphp

                <th colspan="{{$totalCount}}" style=" margin:0;vertical-align: top; text-align: center; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __($parentGroup['title'] ?? "") }}</h4>
                </th>
                @endforeach
                @endif
            </tr>
            <tr>
                @php

                $totalChildGrouops = 0;

                if(!empty($report['scholastic_report']['parentGroups'])) {
                foreach($report['scholastic_report']['parentGroups'] as $groupId => $parentGroup) {
                if(!empty($report['scholastic_report']['childGroups'][$groupId])){
                $totalChildGrouops += count($report['scholastic_report']['childGroups'][$groupId]);
                }
                else {
                $totalChildGrouops++;
                }
                }
                }

                $width = 82 / ($totalChildGrouops > 0 ? $totalChildGrouops : 1);

                @endphp

                @if (!empty($report['scholastic_report']['parentGroups']))
                @foreach ($report['scholastic_report']['parentGroups'] as $groupId => $parentGroup)

                @if (!empty($report['scholastic_report']['childGroups'][$groupId]))


                @foreach ($report['scholastic_report']['childGroups'][$groupId] as $childGroup)
                <td style="width:{{$width}}%;margin:0; vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __($childGroup['title'] ?? "") }}</td>
                @endforeach

                @else
                <td style="width:{{$width}}%; margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;"></td>
                @endif

                @endforeach
                @endif
            </tr>

            @if(!empty($report['scholastic_report']['subject_reports']))
            @foreach($report['scholastic_report']['subject_reports'] as $subjectReport)
            <tr>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __($subjectReport['subject_name'] ?? "") }}</td>

                @if (!empty($report['scholastic_report']['parentGroups']))

                @foreach ($report['scholastic_report']['parentGroups'] as $parentGroupId => $parentGroup)

                @if (!empty($report['scholastic_report']['childGroups'][$parentGroupId]))

                @foreach ($report['scholastic_report']['childGroups'][$parentGroupId] as $childGroupId => $childGroup)
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                    {{ __($subjectReport['group_wise_report'][$parentGroupId]['child_groups'][$childGroupId]['mark'] ?? "") }}
                </td>
                @endforeach

                @else
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __('') }}</td>
                @endif

                @endforeach
                @endif
            </tr>
            @endforeach
            @if (!empty($report['show_total']) && $report['show_total'] == true)
            <tr>
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                    <strong>{{ __("Total") }}</strong>
                </td>

                @if (!empty($report['scholastic_report']['parentGroups']))

                @foreach ($report['scholastic_report']['parentGroups'] as $parentGroupId => $parentGroup)

                @if (!empty($report['scholastic_report']['childGroups'][$parentGroupId]))

                @foreach ($report['scholastic_report']['childGroups'][$parentGroupId] as $childGroupId => $childGroup)
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000;">
                    @if ($childGroup['calculation_type'] == 'Marks' && $childGroup['title'] != 'Max Marks')
                    <strong>{{ __(($childGroup['total_mark'] ?? 0).'/'.($childGroup['total_full_mark'] ?? 0)) }}</strong>
                    @elseif ($childGroup['calculation_type'] == 'Grade')
                    <strong>{{ __($childGroup['overall_grade'] ?? "") }}</strong>
                    @elseif ($childGroup['calculation_type'] == 'Parcentage')
                    <strong>{{ __(($childGroup['overall_percentage'] ?? 0).'%') }}</strong>
                    @else
                    <strong>{{ __($childGroup['total_mark'] ?? 0) }}</strong>
                    @endif
                </td>
                @endforeach

                @else
                <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __('') }}</td>
                @endif

                @endforeach
                @endif
            </tr>
            @endif
            @endif
        </tbody>
    </table>
    @endif
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px">
        <tbody>
            <tr>
                <td style="margin:0; padding:0; width:100%; text-align: center; font-size: 10px;">
                    @if (!empty($academicGradeScales))

                    @php
                    $gradeInstructions = "Grading Scale Instructions: ";
                    @endphp

                    @foreach ($academicGradeScales as $gradeScale)
                    @if ($gradeScale['grade'] == "E")

                    @php
                    $gradeInstructions .= $gradeScale['grade'].' ('.$gradeScale['max_mark'].'% & Below)';
                    @endphp

                    @else

                    @php
                    $gradeInstructions .= $gradeScale['grade'].' ('.$gradeScale['min_mark'].'%-'.$gradeScale['max_mark'].'%), ';
                    @endphp

                    @endif

                    @endforeach

                    @php
                    $gradeInstructions .= ' *SE (Sub Enrichment)';
                    @endphp
                    <p>
                        <strong>
                            {{ __($gradeInstructions) }}
                        </strong>
                    </p>
                    @else
                    <p>
                        <strong>
                            {{ __('Grading Scale Instructions: A1 (91%-100%), A2 (81%-90%), B1 (71%-80%), B2 (61%-70%), C1 (51%-60%), C2 (41%-50%), D (33%-40%), E (32% & Below) *SE (Sub Enrichment)') }}
                        </strong>
                    </p>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px">
        <tbody>
            <tr>
                <td style="margin:0; padding:0; text-align: left;">
                    @if (!empty($report['show_total_mark']) && $report['show_total_mark'] == true)
                    <p><strong>{{ __('Total Marks: '.($report['total_mark_obtained'] ?? "").' / '.($report['total_mark'] ?? "")) }}</strong></p>
                    @else
                    <p><strong>{{ __('') }}</strong></p>
                    @endif
                </td>
                <td style="margin:0; padding:0; text-align: left;">
                    @if (!empty($report['show_grade']) && $report['show_grade'] == true)
                    <p><strong>{{ __('Grade: '. $report['overall_grade'] ?? "") }}</strong></p>
                    @else
                    <p><strong>{{ __('') }}</strong></p>
                    @endif
                </td>
                <td style="margin:0; padding:0; text-align: left;">
                    @if (!empty($report['show_rank']) && $report['show_rank'] == true)
                    <p><strong>{{ __('Rank: '. $report['academic_rank'] ?? "") }}</strong></p>
                    @else
                    <p><strong>{{ __('') }}</strong></p>
                    @endif
                </td>

                <td style="margin:0; padding:0; text-align: right;">
                    @if (!empty($report['show_percentage']) && $report['show_percentage'] == true)
                    <p><strong>{{ __('Percentage: '.($report['total_percentage'] ?? 0).'%') }}</strong></p>
                    @else
                    <p><strong>{{ __('') }}</strong></p>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    @if (!empty($report['co_scholastic_report']['parentGroups']))
    <h3 style="margin:0;vertical-align:top; text-align:left;">{{ __('Co-Scholastic Achievement') }}</h3>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
        <tbody>
            <tr>
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: top; text-align: center; padding: 5px; border: 1px solid #000; font-weight: 700;">
                    <h4>{{ __('Co-Scholastic Area') }}</h4>
                </th>

                @if (!empty($report['co_scholastic_report']['parentGroups']))

                @foreach ($report['co_scholastic_report']['parentGroups'] as $groupId => $parentGroup)

                @php

                $totalCount = !empty($report['co_scholastic_report']['childGroups'][$groupId]) ? count($report['co_scholastic_report']['childGroups'][$groupId]) : 0;

                @endphp

                <th colspan="{{$totalCount}}" style=" margin:0;vertical-align: top; text-align: center; padding: 5px; border: 1px solid #000; border-left: 0 !important; font-weight: 700;">
                    <h4>{{ __($parentGroup['title'] ?? "") }}</h4>
                </th>
                @endforeach
                @endif
            </tr>
        </tbody>
        </tr>
        <tr>
            <td style="margin:0;vertical-align: middle; text-align: left; padding: 5px; border: 1px solid #000; font-weight: 700;">
                <h4>{{ __('Subject') }}</h4>
            </td>

            @php

            $totalChildGrouops = 0;

            if(!empty($report['co_scholastic_report']['parentGroups'])) {
            foreach($report['co_scholastic_report']['parentGroups'] as $groupId => $parentGroup) {
            if(!empty($report['co_scholastic_report']['childGroups'][$groupId])){
            $totalChildGrouops += count($report['co_scholastic_report']['childGroups'][$groupId]);
            }
            else {
            $totalChildGrouops++;
            }
            }
            }

            $width = 75 / ($totalChildGrouops > 0 ? $totalChildGrouops : 1);

            @endphp

            @if (!empty($report['co_scholastic_report']['parentGroups']))
            @foreach ($report['co_scholastic_report']['parentGroups'] as $groupId => $parentGroup)

            @if (!empty($report['co_scholastic_report']['childGroups'][$groupId]))


            @foreach ($report['co_scholastic_report']['childGroups'][$groupId] as $childGroup)
            <td style="width:{{$width}}%;margin:0; vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __($childGroup['title'] ?? "") }}</td>
            @endforeach

            @else
            <td style="width:{{$width}}%; margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;"></td>
            @endif

            @endforeach
            @endif
        </tr>
        @if(!empty($report['co_scholastic_report']['subject_reports']))
        @foreach($report['co_scholastic_report']['subject_reports'] as $subjectReport)
        <tr>
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __($subjectReport['subject_name'] ?? "") }}</td>

            @if (!empty($report['co_scholastic_report']['parentGroups']))

            @foreach ($report['co_scholastic_report']['parentGroups'] as $parentGroupId => $parentGroup)

            @if (!empty($report['co_scholastic_report']['childGroups'][$parentGroupId]))

            @foreach ($report['co_scholastic_report']['childGroups'][$parentGroupId] as $childGroupId => $childGroup)
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">
                {{ __($subjectReport['group_wise_report'][$parentGroupId]['child_groups'][$childGroupId]['mark'] ?? "") }}
            </td>
            @endforeach

            @else
            <td style="margin:0;vertical-align: top; text-align: left; padding:5px; border:1px solid #000; font-weight: 700;">{{ __('') }}</td>
            @endif

            @endforeach
            @endif
        </tr>
        @endforeach
        @endif
        </tbody>
    </table>
    @endif

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px;">
        <tbody>
            <tr>
                <td style="margin:0; padding:0; width:50%; text-align: left;">
                    <p>{{ __('Attendance : '.($report['exam_attendance']['present_day'] ?? "").' / '.($report['exam_attendance']['working_day'] ?? "")) }}</p>
                </td>
                <td style="margin:0; padding:0; width:50%; text-align: right;">
                    @if (!empty($report['show_print_date']) && $report['show_print_date'] == true)
                    <p>{{ __('Print Date: '. $printDate) }}</p>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border: 1px solid #000;">
        <tbody>
            <tr>
                <th style="padding-left: 5px; text-align: left;">{{ __('Remarks:') }}</th>
            </tr>
            <tr>
                <td style="padding-left: 5px; text-align: left;">
                    <p>{{ __($report['academic_remark'] ?? "") }}</p>
                </td>
            </tr>
        </tbody>
    </table>

    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 50px;">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:33%; text-align: left; vertical-align:bottom;">
                    <p>{{ __('CLASS TEACHER’S SIGNATURE ') }}</p>
                </td>
                <td style="margin:0; padding:0; width:33%; text-align: center; vertical-align:bottom;">
                    <span style="margin:0; padding:0; width:33%; text-align: center;">
                        @if (!empty($principalSignature))
                        <img src="{{$principalSignature}}" width="107" height="37">
                        @endif
                    </span>
                    <p>{{ __('PRINCIPAL’S SIGNATURE') }}</p>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right;">
                    <p>{{ __('PARENT’S SIGNATURE') }}</p>
                </td>
            </tr>
        </tfoot>
    </table>
</div>
@else
<h3>No Data Available</h3>
@endif