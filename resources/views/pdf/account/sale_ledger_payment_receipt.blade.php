<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Sale Receipt</title>

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
    <div id="wrapper" style="max-width:735px; margin: 0 auto; padding: 15px 30px;font-size:10px;">
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
                                        <h3 style="margin: 0;">{{ __('Receipt (Student Copy)') }}</h3>
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
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Invoice No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->invoice_no) }}
                                        </td>
                                    </tr>
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Student Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->student?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Class') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->classroom?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Father Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->student?->father?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->father?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->father?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Teacher Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->payment_date) }}
                                        </td>
                                    </tr>
                                    @endif
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Mode') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->bankLedger?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Transaction Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->transaction_date) }}
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->narration) }}
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </td>
                        <td style="width:47%; padding-left:10px; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Receipt No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->receipt_no) }}
                                        </td>
                                    </tr>
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student')
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Admission No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->student?->admission_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Roll No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->student?->classroomRoll?->roll_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->payment_date) }}
                                        </td>
                                    </tr>
                                    @endif
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Address') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->staff?->address) }}
                                        </td>
                                    </tr>
                                    @endif
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
                                                    {{ __($saleLedgerPayment?->narration) }}
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
                                {{ __('Product') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Qty') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Rate') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Tax') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Discount') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Amount') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($saleLedgerPayment?->saleLedger->saleLedgerProducts ?? []) > 0)
                    @foreach ($saleLedgerPayment?->saleLedger->saleLedgerProducts as $ledgerProduct)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400;">
                            {{ __($ledgerProduct?->product?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->quantity ?? 1 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->rate ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->tax_amount ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->discount_amount ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->total_amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
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
                                <span>{{ $saleLedgerPayment?->saleLedger->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
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
                                <span>{{ $saleLedgerPayment?->saleLedger->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Previous Paid
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ number_format(($saleLedgerPayment?->saleLedger->paid_amount ?? 0) - ($saleLedgerPayment->paid_amount ?? 0), 2) }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Paid
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerPayment->paid_amount ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Due
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerPayment?->saleLedger->due_amount ?? 0 }}</span>
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
                                {{ __(($saleLedgerPayment?->createdBy?->first_name ?? '').' '.($saleLedgerPayment?->createdBy?->middle_name ?? '').' '.($saleLedgerPayment?->createdBy?->last_name ?? '')) }}
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
                                        <h3 style="margin: 0;">{{ __('Receipt (Office Copy)') }}</h3>
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
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Invoice No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->invoice_no) }}
                                        </td>
                                    </tr>
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Student Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->student?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Class') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->classroom?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Father Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->student?->father?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->father?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->student?->father?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    @endif

                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Teacher Name') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __(($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '').' '.($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '').' '.($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '')) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->payment_date) }}
                                        </td>
                                    </tr>
                                    @endif
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Mode') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->bankLedger?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Transaction Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->transaction_date) }}
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->narration) }}
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </td>
                        <td style="width:47%; padding-left:10px; vertical-align: top;">
                            <table
                                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Receipt No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->receipt_no) }}
                                        </td>
                                    </tr>
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student')
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Admission No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->student?->admission_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; width:50%; margin-left:50px;">
                                            {{ __('Roll No.') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->student?->classroomRoll?->roll_no) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->payment_date) }}
                                        </td>
                                    </tr>
                                    @endif
                                    @if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher')
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Address') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($saleLedgerPayment?->saleLedger?->staff?->address) }}
                                        </td>
                                    </tr>
                                    @endif
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
                                                    {{ __($saleLedgerPayment?->narration) }}
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
                                {{ __('Product') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Qty') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Rate') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Tax') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Discount') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700;">
                            <h4 style="margin: 0;">
                                {{ __('Amount') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($saleLedgerPayment?->saleLedger->saleLedgerProducts ?? []) > 0)
                    @foreach ($saleLedgerPayment?->saleLedger->saleLedgerProducts as $ledgerProduct)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400;">
                            {{ __($ledgerProduct?->product?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->quantity ?? 1 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->rate ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->tax_amount ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->discount_amount ?? 0 }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400;">
                            {{ $ledgerProduct->total_amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
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
                                <span>{{ $saleLedgerPayment?->saleLedger->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
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
                                <span>{{ $saleLedgerPayment?->saleLedger->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Previous Paid
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; ">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ number_format(($saleLedgerPayment?->saleLedger->paid_amount ?? 0) - ($saleLedgerPayment->paid_amount ?? 0), 2) }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Paid
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerPayment->paid_amount ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="border:1px solid #ddd;"></td>
                        <td style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%"></td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            Due
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700;">
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ $saleLedgerPayment?->saleLedger->due_amount ?? 0 }}</span>
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
                                {{ __(($saleLedgerPayment?->createdBy?->first_name ?? '').' '.($saleLedgerPayment?->createdBy?->middle_name ?? '').' '.($saleLedgerPayment?->createdBy?->last_name ?? '')) }}
                            </h4>
                            <h4 style="margin: 0; font-size:12px">
                                {{ __('Auth. Signatory') }}
                            </h4>
                        </td>
                    </tr>
                </tfoot>
            </table>
            @endif
            <br>
        </div>
    </div>
</body>

</html>
