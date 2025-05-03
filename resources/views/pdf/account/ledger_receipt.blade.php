<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Payment Receipt</title>

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
                                        <h3 style="margin: 0;">{{ __('Receipt Voucher (Student Copy)') }}</h3>
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
                                            {{ __('Debit Account') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->bankLedger?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->receipt_date) }}
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->description) }}
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
                                            {{ __('Receipt No ') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->receipt_no) }}
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
                                                    {{ __($ledgerReceipt?->description) }}
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
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Ledgers') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Description') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Amount(Rs.) ') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($ledgerReceipt->ledger_receipt_items ?? []) > 0)
                    @foreach ($ledgerReceipt->ledger_receipt_items as $receiptItem)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400; width:33%">
                            {{ __($receiptItem?->ledger?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400; width:33%">
                            {{ $receiptItem->description ?? '' }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400; width:33%">
                            {{ $receiptItem->amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Total Amount: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Payable: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">

                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Paid: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
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
                                {{ __(($ledgerReceipt?->createdBy?->first_name ?? '').' '.($ledgerReceipt?->createdBy?->middle_name ?? '').' '.($ledgerReceipt?->createdBy?->last_name ?? '')) }}
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
                                        <h3 style="margin: 0;">{{ __('Receipt Voucher (Office Copy)') }}</h3>
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
                                            {{ __('Debit Account') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->bankLedger?->title) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Payment Date') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->receipt_date) }}
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td style="margin-bottom:10px; padding-bottom:3px; width:50%;">
                                            {{ __('Narration') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->description) }}
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
                                            {{ __('Receipt No ') }}
                                        </td>
                                        <td
                                            style="margin-bottom:10px; padding-bottom:3px; border-bottom:1px solid #ddd; width:50%;">
                                            {{ __($ledgerReceipt?->receipt_no) }}
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
                                                    {{ __($ledgerReceipt?->description) }}
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

            <table
                style="width:100%; font-family: 'Inter', sans-serif; box-sizing: border-box; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Ledgers') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Description') }}
                            </h4>
                        </th>
                        <th
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: 0 !important; font-weight:700; width: 33%">
                            <h4 style="margin: 0;">
                                {{ __('Amount(Rs.) ') }}
                            </h4>
                        </th>
                    </tr>
                    @if (count($ledgerReceipt->ledger_receipt_items ?? []) > 0)
                    @foreach ($ledgerReceipt->ledger_receipt_items as $receiptItem)
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:400; width:33%">
                            {{ __($receiptItem?->ledger?->title) }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400; width:33%">
                            {{ $receiptItem->description ?? '' }}
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:400; width:33%">
                            {{ $receiptItem->amount ?? 0 }}
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Total Amount: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Payable: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="margin:0;vertical-align:top; text-align:left; padding:5px; border:1px solid #ddd; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                        </td>
                        <td
                            style="margin:0;vertical-align:top; text-align:right; padding:5px; border:1px solid #ddd; border-left: none !important; font-weight:700; width:33%">
                            <div style="display: flex; justify-content: space-between">
                                <span>Paid: </span>
                                <span>{{ $ledgerReceipt->total ?? 0 }}</span>
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
                                {{ __(($ledgerReceipt?->createdBy?->first_name ?? '').' '.($ledgerReceipt?->createdBy?->middle_name ?? '').' '.($ledgerReceipt?->createdBy?->last_name ?? '')) }}
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
