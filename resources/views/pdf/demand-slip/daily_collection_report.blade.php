<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Daily Collection Report </title>
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
    @if (!empty($reports) && !empty($reports['reports']))
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
                            <h6>{{ __(!empty($reportDateTitle) ? $reportDateTitle : '') }}</h6>
                            <h6>{{__("Payment Mode - {$paymentMode}, Fee Mode - {$feeMode}")}}</h6>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Sr no.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Adm.No.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Stu. Type') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('S. Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Class Name') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Fee Source') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Receipt No') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Roll No') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Tot. Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Discount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Pay Amount') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('TotalPaid') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Tot. Due') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Payment Mode') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Note') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Payment Date') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('Receipt Note') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('TakenBy') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; background: #EEEEEE;">{{ __('School ReceiptNo') }}</th>
            </tr>
            @if (!empty($reports['reports']))
            @foreach ($reports['reports'] as $index => $report)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($index + 1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['admission_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['student_type'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['student_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['class_name'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['fee_source'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['receipt_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['roll_no'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_discount_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_payable_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_paid_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['total_due_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_mode'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_note'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['payment_date'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['receipt_note'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['created_by'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">{{ __($report['school_receipt_no'] ?? "") }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($reports['total_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($reports['total_discount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($reports['total_payable'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($reports['total_paid'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __($reports['total_due'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; color: #030105; border-bottom: 1px solid #EEEEEE;">{{ __('') }}</td>
            </tr>
        </tbody>
    </table>
    <div Class="bottom-table" style="margin-top: 20px;">
        <div class="table-container">
            <table>
                <tr>
                    <th><small>Payment Mode</small></th>
                    <th><small>Amount</small></th>
                </tr>
                @if (!empty($reports['totalPaidByPaymentModeReport']))
                @foreach ($reports['totalPaidByPaymentModeReport'] as $paymentModeReport)
                <tr>
                    <td><small>{{ __($paymentModeReport['payment_mode']) }}</small></td>
                    <td><small>{{ __($paymentModeReport['total_paid_amount']) }}</small></td>
                </tr>
                @endforeach
                @endif
                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($reports['totalPaidByPaymentMode'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
        <div class="table-container" style="margin-left: 30px;">
            <table>
                <tr>
                    <th><small>Taken By</small></th>
                    <th><small>Amount</small></th>
                </tr>
                @if (!empty($reports['totalPaidByAdminReport']))
                @foreach ($reports['totalPaidByAdminReport'] as $adminReport)
                <tr>
                    <td><small>{{ __($adminReport['created_by']) }}</small></td>
                    <td><small>{{ __($adminReport['total_paid_amount']) }}</small></td>
                </tr>
                @endforeach
                @endif
                <tr>
                    <td class="highlight">Total</td>
                    <td class="highlight">{{ __($reports['totalPaidByAdmin'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
        <div class="table-container" style="margin-left: 30px; border-collapse: separate; border-spacing: 3px;">
            <table>
                <tr>
                    <th><small>Total Amount Payable</small></th>
                    <th><small>{{ __($reports['total_amount'] ?? 0) }}</small></th>
                </tr>
                <tr>
                    <td style="border: 0 !important; background: #EEEEEE;">Discount Given</td>
                    <td style="border: 0 !important; background: #EEEEEE;">{{ __($reports['total_discount'] ?? 0) }}</td>
                </tr>
                <tr>
                    <td style="border: 0 !important; background: #EEEEEE; height: 19px"></td>
                    <td style="border: 0 !important; background: #EEEEEE;  height: 19px"></td>
                </tr>
                <tr>
                    <td class="highlight">Total Paid</td>
                    <td class="highlight">{{ __($reports['total_paid'] ?? 0) }}</td>
                </tr>
            </table>
        </div>
    </div>

    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>