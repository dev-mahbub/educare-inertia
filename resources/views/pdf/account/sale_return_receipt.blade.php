<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Sale Return Receipt</title>

    <style>
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
    <div id="wrapper" style="max-width:735px; margin: 0 auto; padding: 15px 30px;font-size:10px; min-height:900px">
        <div id="printButtonWrapper" style="width: 48%; padding: 15px 5px; margin-left: 15px;">
            <input id="printButton" type="button" value="Print" onclick="window.print()"
                style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>

        <div>
            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <thead>
                    <tr style="width:100%;">
                        <td style="width:15%; vertical-align:middle;">
                            <!-- <img style="max-width:100%" src="{{ $schoolData['logo']['path'] ?? '' }}"> -->
                            <img src="{{ $schoolData['logo']['path'] ?? '' }}"
                                style="max-width: 100%; max-height:80px; object-fit: cover; margin-top: 0px;" />
                        </td>
                        <td style="width:70%; vertical-align:middle;">
                            <table style="text-align:center; width:100%">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0; font-size:24px;">{{ $schoolData['title'] ?? '' }}</h1>
                                    </td>
                                </tr>
                                <tr style="font-size:12px;">
                                    <td>
                                        {{ $schoolData['street_address'] ?? '' }}
                                    </td>
                                </tr>
                                <tr style="font-size:12px;">
                                    <td>
                                        Ph:
                                        <span>
                                            @if (!empty($schoolData['phone'] ?? ''))
                                            {{ $schoolData['phone'] ?? '' }},
                                            @endif
                                        </span>
                                        Email:
                                        <span>
                                            {{ $schoolData['mail'] ?? '' }}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width:15%;"></td>
                    </tr>
                    <tr>
                        <td style="width:15%;"></td>
                        <td style="width:70%; padding-top:10px;">
                            <table style="text-align:center; width:100%">
                                <tr>
                                    <td
                                        style="width: 100%; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                        <h3 style="margin: 0;">{{ __('Invoice') }}</h3>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width:15%;"></td>
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
                                    @if ($saleLedgerReturn?->return_type_for == 'Student')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Student Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->student?->first_name ?? '').' '.($saleLedgerReturn?->student?->middle_name ?? '').' '.($saleLedgerReturn?->student?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Class') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->classroom?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Roll No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->student?->classroomRoll?->roll_no) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerReturn?->return_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Teacher Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->staff?->first_name ?? '').' '.($saleLedgerReturn?->staff?->middle_name ?? '').' '.($saleLedgerReturn?->staff?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Returned Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->return_date) }}
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->description) }}
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </td>
                        <td style="width:47%; padding-left:10px; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    @if ($saleLedgerReturn?->return_type_for == 'Student')
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Admission No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->student?->admission_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Father Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->student?->father?->first_name ?? '').' '.($saleLedgerReturn?->student?->father?->middle_name ?? '').' '.($saleLedgerReturn?->student?->father?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerReturn?->return_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Address') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->staff?->address) }}
                                        </td>
                                    </tr>
                                    @endif

                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Receipt No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->receipt_no) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="width:100%; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:100%;">
                                            <div style="display:flex; width:100%;">
                                                <span style="display:inline-block; width:25%; max-width:182.75px;">
                                                    {{ __('Narration') }}
                                                </span>
                                                <span style="border-bottom:1px solid #ddd; display:inline-block; width:75%;">
                                                    {{ __($saleLedgerReturn?->description) }}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Returned Item') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Quantity') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Rate') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Amount') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($saleLedgerReturn->saleLedgerReturnProducts ?? []) > 0)
                    @foreach ($saleLedgerReturn->saleLedgerReturnProducts as $returnProduct)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400;">
                            {{ __($returnProduct?->product?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->quantity ?? 1 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->rate ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->total_amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            Total Amount
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>

                    @if ($saleLedgerReturn?->total_discount > 0)
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Discount
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total_discount ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    @endif

                    @if ($saleLedgerReturn?->total_tax > 0)
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Tax
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total_tax ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    @endif

                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Payable
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tfoot>
                    <tr>
                        <td style="margin:0; padding:0; width:50%; text-align:right;">
                            <h4 style="margin: 0; font-size:12px; margin-bottom: 2px; font-weight:400">
                                {{ __(($saleLedgerReturn?->createdBy?->first_name ?? '').' '.($saleLedgerReturn?->createdBy?->middle_name ?? '').' '.($saleLedgerReturn?->createdBy?->last_name ?? '')) }}
                            </h4>
                            <h4 style="margin: 0; font-size:12px">
                                {{ __('Auth. Signatory') }}
                            </h4>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <p style="border-bottom: 1px dashed #ddd; margin-top:10px; margin-bottom:15px"></p>

            @if ($isDoubleReceiptCopy)
            <!-- <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <thead>
                    <tr style="width:100%;">
                        <td style="width:15%; vertical-align:middle;">
                            <img style="max-width:100%" src="{{ $schoolData['logo']['path'] ?? '' }}">
                        </td>
                        <td style="width:70%; vertical-align:middle;">
                            <table style="text-align:center; width:100%">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0; font-size:24px;">{{ $schoolData['title'] ?? '' }}</h1>
                                    </td>
                                </tr>
                                <tr style="font-size:12px;">
                                    <td>
                                        <span>
                                            @if (!empty($schoolData['phone'] ?? ''))
                                            {{ $schoolData['phone'] ?? '' }},
                                            @endif
                                        </span>
                                        <span>
                                            {{ $schoolData['mail'] ?? '' }}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width:15%;"></td>
                    </tr>
                    <tr>
                        <td style="width:15%;"></td>
                        <td style="width:70%;">
                            <table style="text-align:center; width:100%">
                                <tr>
                                    <td
                                        style="width: 100%; padding-top:5px; padding-bottom:5px; border:1px solid #ddd; display:inline-block; background-color:#efefef;">
                                        <h3 style="margin: 0;">{{ __('Invoice (Office Copy)') }}</h3>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width:15%;"></td>
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
                                    @if ($saleLedgerReturn?->return_type_for == 'Student')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Student Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->student?->first_name ?? '').' '.($saleLedgerReturn?->student?->middle_name ?? '').' '.($saleLedgerReturn?->student?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Class') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->classroom?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Roll No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->student?->classroomRoll?->roll_no) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerReturn?->return_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Teacher Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->staff?->first_name ?? '').' '.($saleLedgerReturn?->staff?->middle_name ?? '').' '.($saleLedgerReturn?->staff?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Returned Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->return_date) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->description) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width:47%; padding-left:10px; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    @if ($saleLedgerReturn?->return_type_for == 'Student')
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Admission No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->student?->admission_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Father Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerReturn?->student?->father?->first_name ?? '').' '.($saleLedgerReturn?->student?->father?->middle_name ?? '').' '.($saleLedgerReturn?->student?->father?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerReturn?->return_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Address') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->staff?->address) }}
                                        </td>
                                    </tr>
                                    @endif

                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Receipt No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerReturn?->receipt_no) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Returned Item') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Quantity') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Rate') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Amount') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($saleLedgerReturn->saleLedgerReturnProducts ?? []) > 0)
                    @foreach ($saleLedgerReturn->saleLedgerReturnProducts as $returnProduct)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400;">
                            {{ __($returnProduct?->product?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->quantity ?? 1 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->rate ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $returnProduct->total_amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            Total Amount
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>

                    @if ($saleLedgerReturn?->total_discount > 0)
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Discount
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total_discount ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    @endif

                    @if ($saleLedgerReturn?->total_tax > 0)
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Tax
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total_tax ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    @endif

                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Payable
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerReturn->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tfoot>
                    <tr>
                        <td style="margin:0; padding:0; width:50%; text-align:right;">
                            <h4 style="margin: 0; font-size:12px; margin-bottom: 2px; font-weight:400;">
                                {{ __(($saleLedgerReturn?->createdBy?->first_name ?? '').' '.($saleLedgerReturn?->createdBy?->middle_name ?? '').' '.($saleLedgerReturn?->createdBy?->last_name ?? '')) }}
                            </h4>
                            <h4 style="margin: 0; font-size:12px">
                                {{ __('Auth. Signatory') }}
                            </h4>
                        </td>
                    </tr>
                </tfoot>
            </table> -->
            @endif

            <br>
        </div>
    </div>
</body>

</html>