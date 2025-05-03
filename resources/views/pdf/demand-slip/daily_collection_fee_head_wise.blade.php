<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Daily Collection Fee Wise Report </title>
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
    @if (!empty($reports) && !empty($reports['reports']))

    @if ($includeSummaryPage == false)
    <table style="width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
        <tr>
            <td style="vertical-align: middle; text-align: center;">
                <table>
                    <tr>
                        <td>
                            <h6>
                                @if(!empty($schoolData))
                                {{ __("{$schoolData['title']} ({$schoolData['academic_year']})") }}
                                @endif
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>{{ __("DAILY COLLECTION FOR {$classNameTitle}") }}</h6>
                            <h6>{{ __($reportDateTitle) }}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Adm.No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Name.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('FatherName') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('ReceiptNo') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('SchoolReceiptNo') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('ReceiptDate') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('ReceiptNote') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('OrderId') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Mode') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Payment Note') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('StudentType') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Gender') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Employment Category') }}</th>
                @if (!empty($reports['fee_type_paid_amount_array']))
                @foreach (array_keys($reports['fee_type_paid_amount_array']) as $feeType)
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __($feeType) }}</th>
                @endforeach
                @endif

                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Discount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Payable') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Paid') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Due') }}</th>
            </tr>
            @foreach ($reports['reports'] as $dateWiseReports)
            @if (!empty($dateWiseReports['reports']))
            @foreach ($dateWiseReports['reports'] as $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['name']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['class']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['father_name']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['receipt_no']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['school_receipt_no']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['receipt_date']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['receipt_note']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['mode']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_note']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['student_type']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['gender']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['employment_category']) }}</td>

                @if (!empty($reports['fee_type_paid_amount_array']))
                @foreach (array_keys($reports['fee_type_paid_amount_array']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report[$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['amount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['discount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payable']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['paid']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['due']) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __('') }}</td>

                @if (!empty($reports['fee_type_paid_amount_array']))
                @foreach (array_keys($reports['fee_type_paid_amount_array']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['fee_type_paid_amount_array'][$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['amount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['discount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['payable']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['paid']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($dateWiseReports['due']) }}</td>
            </tr>
            @endforeach

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('Grand Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __('') }}</td>

                @if (!empty($reports['fee_type_paid_amount_array']))
                @foreach (array_keys($reports['fee_type_paid_amount_array']) as $feeType)
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['fee_type_paid_amount_array'][$feeType] ?? 0) }}</td>
                @endforeach
                @endif

                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['amount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['discount']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['payable']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['paid']) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; background: #CCCCCC;">{{ __($reports['due']) }}</td>
            </tr>
        </tbody>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 15px">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>{{ __("Date : {$reportDate}") }}</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>Prepared by</small></span>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom;">
                    <span><small>Checked by</small></span>
                </td>
            </tr>
        </tfoot>
    </table>
    @else
    <div Class="bottom-table" style="margin-top: 20px;">
        <div class="table-container">
            <table>
                <tr>
                    <th><small>Payment Mode</small></th>
                    <th><small>Amount</small></th>
                </tr>
                @if (!empty($reports['total_paid_by_payment_mode']))
                @foreach (array_keys($reports['total_paid_by_payment_mode']) as $paymentMode)
                <tr>
                    <td><small>{{ __($paymentMode) }}</small></td>
                    <td><small>{{ __($reports['total_paid_by_payment_mode'][$paymentMode]) }}</small></td>
                </tr>
                @endforeach
                @endif
                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($reports['total_by_payment_mode'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
        <div class="table-container" style="margin-left: 30px;">
            <table>
                <tr>
                    <th><small>Taken By</small></th>
                    <th><small>Amount</small></th>
                </tr>
                @if (!empty($reports['total_paid_by_admin']))
                @foreach ($reports['total_paid_by_admin'] as $adminReport)
                <tr>
                    <td><small>{{ __($adminReport['taken_by']) }}</small></td>
                    <td><small>{{ __($adminReport['amount']) }}</small></td>
                </tr>
                @endforeach
                @endif
                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($reports['total_by_admin'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
        <div class="table-container" style="margin-left: 30px; border-collapse: separate; border-spacing: 3px;">
            <table>
                <tr>
                    <th><small>Fee Type</small></th>
                    <th><small>Amount</small></th>
                </tr>
                @if (!empty($reports['fee_type_paid_amount_array']))
                @foreach (array_keys($reports['fee_type_paid_amount_array']) as $feeType)
                <tr>
                    <td style="border: 0 !important; background: #EEEEEE;">{{ __($feeType)}}</td>
                    <td style="border: 0 !important; background: #EEEEEE;">{{ __($reports['fee_type_paid_amount_array'][$feeType] ?? 0) }}</td>
                </tr>
                @endforeach
                @endif
                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($reports['total_by_fee_type'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
    </div>
    @endif

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>