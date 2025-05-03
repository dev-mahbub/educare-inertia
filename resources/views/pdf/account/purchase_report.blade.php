<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Purchase Report</title>
    <style>
        .table-container {
            width: 30%;
            float: left;
            vertical-align: middle;
        }

        .table-container table {
            width: 100%;
            font-family: 'Inter', sans-serif;
            border-collapse: separate;
            /* Separate border model */
            border-spacing: 1px;
            /* Row and column gap */
        }

        .table-container th {
            margin: 0;
            vertical-align: middle;
            text-align: center;
            padding: 5px;
            background: #EEEEEE;
        }

        .table-container td {
            border-bottom: 1px solid #EEEEEE;
        }

        .table-container td:last-child {
            border-bottom: none;
            /* Remove border from last td in each row */
        }

        .table-container .highlight {
            color: #030105;
            background: #EEEEEE;
        }
    </style>
</head>

<body>
    @if (!empty($purchaseReport['reports']))
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h6 style="font-size: 14px">
                                @if(!empty($schoolData))
                                {{ __("{$schoolData['title']} ({$schoolData['academic_year']})") }}
                                @endif
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6 style="font-size: 13px">{{ __('Inventory Purchase Register') }}</h6>
                            <h6 style="font-size: 13px">{{ __($reportDateTitle) }}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Serial No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Party Account') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Ledger') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Purchase Date') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Invoice No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sub Total') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Discount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Tax') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Total') }}</th>
            </tr>

            @foreach ($purchaseReport['reports'] as $index => $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($index+1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report?->partyLedger?->title) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report?->ledger?->title) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report?->purchase_date ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report?->supplier_invoice_no) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report->sub_total ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report->discount_amount ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report->tax_amount ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report->total ?? 0) }}</td>
            </tr>

            @if (!empty($report->purchaseProducts))
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('Item') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('Quantity') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('Rate') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('Amount') }}</td>
            </tr>

            @foreach ($report->purchaseProducts as $purchaseProduct)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($purchaseProduct?->product?->title) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($purchaseProduct->quantity ?? 1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($purchaseProduct->rate ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($purchaseProduct->amount ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            @endforeach

            <tr>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('Total') }}</td>
                <td style="margin: 0; background: #EEEEEE; vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($purchaseReport['total'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>