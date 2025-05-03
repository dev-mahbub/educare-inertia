<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Question Paper</title>

    <style>
        #question_wrapper p {
            margin: 0;
        }

        @media print {

            #printButtonWrapper,
            #printButton {
                display: none;
            }

            #wrapper {
                box-shadow: none !important;
                padding: 0px 15px !important;
            }
        }

        #wrapper {
            box-shadow: 0px 0px 20px 4px #bdbcbc;
        }
    </style>

</head>

<body>
    <div id="wrapper" style="max-width:735px; margin: 0 auto; padding: 15px 30px;font-size:10px;">
        <div id="printButtonWrapper" style="width: 48%; padding: 15px 5px; margin-left: 15px;">
            <input id="printButton" type="button" value="Print" onclick="window.print()"
                style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>

        @if (!empty($virtualExam))
        <div>
            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <thead>
                    <tr style="width:100%;">
                        <!-- <td style="width:15%; vertical-align:middle;">
                                <img style="max-width:100%" src="{{ $schoolData['logo']['path'] ?? '' }}">
                            </td> -->
                        <td style="width:100%; vertical-align:middle;">
                            <table style="text-align:center; width:100%">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0 0 20px 0; font-size:24px;">
                                            {{ $schoolData['title'] ?? '' }}
                                        </h1>
                                    </td>
                                </tr>
                                <tr style="font-size:16px;">
                                    <td>
                                        <span>{{ __($virtualExam->title ?? '') }}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <!-- <td style="width:15%;"></td> -->
                    </tr>
                </thead>
            </table>

            <br>

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <td style="width:47%; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:15%; font-size:14px;">
                                            {{ __('Class') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:30%; font-size:14px;">
                                            {{ __($virtualExam?->className?->title ?? '') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:15%; font-size:14px;">
                                            {{ __('Subject') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px;  width:30%; font-size:14px;">
                                            {{ __($virtualExam?->subject?->title ?? '') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:15%; font-size:14px;">
                                            {{ __('Duration') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:30%; font-size:14px;">
                                            {{ __($virtualExam->duration ?? '') }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width:47%; padding-left:10px; vertical-align:bottom;">
                            <table
                                style="width:100%; font-family: 'Inter',  sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:30%; margin-left:50px; font-size:35px; text-align:end">
                                            {{ __($virtualExam->exam_code ?? '') }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-bottom: 1px solid lightgray; border-collapse: collapse; margin-bottom:20px;">
                <tbody>
                    <tr>
                        <td style="width:25%; vertical-align: middle;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:45%; font-size:14px;">
                                            {{ __('Start Date') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%; font-size:14px;">
                                            {{ __(($virtualExam->start_date ?? '') .' '.($virtualExam->start_time ?? '')) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width:25%; vertical-align: middle;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:45%; font-size:14px;">
                                            {{ __('End Date') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%; font-size:14px;">
                                            {{ __(($virtualExam->end_date ?? '') .' '.($virtualExam->end_time ?? '')) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width:25%; vertical-align: middle;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; font-size:14px; font-weight: bold;">
                                            {{ __('Total Marks') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width50%; font-size:14px;">
                                            {{ __($virtualExam->total_mark ?? 0) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width:25%; vertical-align: middle;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; font-size:14px; font-weight: bold;">
                                            {{ __('Pass Marks') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:5%; font-size:14px;">
                                            {{ __(':') }}
                                        </td>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%; font-size:14px;">
                                            {{ __($virtualExam->pass_mark ?? 0) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br>
                            <br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table
                style="width:100%; font-family: 'Inter',  sans-serif; border-bottom: 1px solid lightgray; box-sizing: border-box; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <td style="margin-bottom:10px; padding-bottom:3px; width:100%; font-size:16px;">
                            {{ __('Instruction') }}
                        </td>
                    </tr>
                    <tr>
                        <td style="width:25%; vertical-align: top;">
                            <table
                                style="width:100%; margin-left: 20px; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody style="line-height: 25px">
                                    <tr style="vertical-align: top;">
                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:14px; width: 100%">
                                            {!! __($virtualExam->instruction_details ?? '') !!}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table id="question_wrapper"
                style="width:100%; font-family: 'Inter',  sans-serif; border-bottom: 1px solid lightgray; box-sizing: border-box; border-collapse: collapse;">
                <tbody>

                    @if (count($virtualExam?->virtual_questions) > 0)
                    @foreach ($virtualExam?->virtual_questions as $index => $question)
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="width:25%; vertical-align: top;">
                                            <table
                                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                                <tbody style="line-height: 25px">
                                                    <tr style="vertical-align: top;">
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:16px; font-weight: bold; width: 5%">
                                                            {{ __('Q.'.$index+1) }}
                                                        </td>
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:16px; width: 95%; max-width: 500px; overflow:hidden">
                                                            {!! __($question->question ?? '') !!}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style="width:5%; vertical-align: top;">
                                            <table
                                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                                <tbody>
                                                    <tr style="vertical-align: top;">
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:12px; width: 4%">
                                                            {{ __($question->question_type ?? '') }}
                                                        </td>
                                                    </tr>
                                                    <tr style="vertical-align: top;">
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:12px; width: 4%">
                                                            {{ __(($question->assigned_mark ?? 0).' Marks ') }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:25%; vertical-align: top;">
                                            <table
                                                style="width:100%; margin-left: 20px; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                                <tbody style="line-height: 25px">
                                                    @if (!empty($question->answer_options) && !in_array($question->question_type, ['Descriptive', 'Short Answer', 'Fill in the blanks']))
                                                    @foreach ($question->answer_options as $index => $option)
                                                    <tr style="vertical-align: top;">
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:14px; width: 2%">
                                                            {{ __(($index+1).'. ') }}
                                                        </td>
                                                        <td style="margin-bottom:20px; padding-bottom:3px; font-size:14px; width: 98%">
                                                            {{ __($option->answer ?? '') }}
                                                        </td>
                                                    </tr>
                                                    @endforeach
                                                    @endif

                                                    <tr>
                                                        <td>
                                                            <br>
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
                    @endforeach
                    @endif

                </tbody>
            </table>
        </div>
        @endif
    </div>
</body>

</html>