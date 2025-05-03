<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Consolidate Sale Report </title>
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
            vertical-align: middle;
            text-align: center;
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
    @if (!empty($consolidatedSaleReport['reports']))

    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h3>
                                @if(!empty($schoolData))
                                {{ __("{$schoolData['title']} ({$schoolData['academic_year']})") }}
                                @endif
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>{{ __("Consolidated Sale Report") }}</h4>
                            <h4>{{ __($reportDateTitle) }}</h4>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('SNo.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Invoice No') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Invoice Date') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Admission Number') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Payment Mode') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sale Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sale Returns') }}</th>
            </tr>

            @php
            $srNo = 0;
            @endphp

            @foreach ($consolidatedSaleReport['reports'] as $report)

            @php
            $srNo++;
            @endphp

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($srNo) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['invoice_no'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['sale_date'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['name'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['classroom_title'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_mode'] ?? '') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['sale_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['sale_return_amount'] ?? 0) }}</td>
            </tr>
            @endforeach

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($consolidatedSaleReport['total_sale_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($consolidatedSaleReport['total_sale_return_amount'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>

    <div Class="bottom-table" style="margin-top: 20px;">
        <div class="table-container">
            <table>
                <tr>
                    <th><small>Payment Mode</small></th>
                    <th><small>Amount</small></th>
                    <th><small>Sale Return Amount</small></th>
                </tr>
                @if (!empty($consolidatedSaleSummary['reports']))
                @foreach ($consolidatedSaleSummary['reports'] as $summaryData)
                <tr>
                    <td class="highlight">{{ __($summaryData['payment_mode'] ?? '') }}</td>
                    <td class="highlight">{{ __($summaryData['sale_amount'] ?? 0) }}</td>
                    <td class="highlight">{{ __($summaryData['sale_return_amount'] ?? 0) }}</td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($consolidatedSaleSummary['total_sale_amount'] ?? 0) }}</td>
                    <td class="highlight">{{ __($consolidatedSaleSummary['total_sale_return_amount'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
    </div>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>