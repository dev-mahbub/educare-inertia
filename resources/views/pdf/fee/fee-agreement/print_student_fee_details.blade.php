<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student Fee Summary</title>
    <style>
        .defult-table {
            width: 100%;
            font-family: 'Inter', sans-serif;
            border-collapse: collapse;
        }

        .table-caption-title {
            text-align: center;
            color: #000000;
            border: 1px solid #0D0D0D;
            border-bottom: 0;
            padding: 2px;
        }
    </style>
</head>

<body>

    @if (!empty($reports))
    <table style="width: 100%; font-family: 'Inter', sans-serif; border: 1px solid #0D0D0D; padding-top: 5px; padding-bottom: 5px; border-bottom: 0;">
        <thead>
            <tr style="width: 100%;">
                <td style="width: 10%; vertical-align: top; text-align: left;">
                    <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                </td>
                <td style="width: 90%; vertical-align: top; text-align: center;">
                    <table>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>{{ __($schoolData['title'] ?? "") }}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>{{ __($schoolData['street_address'] ?? "") }}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px; font-weight: 400;">
                                <h3>
                                    @if (!empty($schoolData['academic_year']))
                                    {{ __("Fee Agreement - {$schoolData['academic_year']}") }}
                                    @else
                                    {{ __('Fee Agreement -') }}
                                    @endif
                                </h3>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </thead>
    </table>

    <table class="defult-table" style="margin-bottom: 10px;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Adm.No') }}</strong>
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Name') }}</strong>
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Class') }}</strong>
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Father Name') }}</strong>
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Mobile') }}</strong>
                </th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;">
                    <strong>{{ __('Agreement Date') }}</strong>
                </th>
            </tr>
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($reports['student']['admission_no']))
                    {{ __($reports['student']['admission_no']) }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($reports['student']))
                    {{ __($reports['student']['first_name'] .' '.$reports['student']['middle_name'] .' '.$reports['student']['last_name']) }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($reports['student']['classroom']))
                    {{ __($reports['student']['classroom']['title'] ?? "") }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($reports['student']['father']))
                    {{ __($reports['student']['father']['first_name'] .' '.$reports['student']['father']['middle_name'] .' '.$reports['student']['father']['last_name']) }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($reports['student']['father']))
                    {{ __($reports['student']['father']['phone']) }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border: 1px solid #0D0D0D; color: #030105">
                    @if (!empty($agreementDate))
                    {{ __($agreementDate) }}
                    @else
                    {{ __('') }}
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    @if (!empty($reports['report']))
    @foreach ($reports['report'] as $report)
    <!-- single table -->
    <table class="defult-table" style="margin-bottom: 10px;">
        <caption class="table-caption-title ">
            <strong>
                @if (!empty($report['fee']))
                {{ __(($report['fee']['title'] ?? "") .' (DUE DATE- '. ($report['fee']['last_pay_date'] ?? "").')') }}
                @else
                Previous_Due(2024-2025) (DUE DATE- 29-Jan-2024)
                @endif
            </strong>
        </caption>
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('SR. NO') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Fee Type') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Amount') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Discount') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Payable') }}</strong></th>
            </tr>
            @php
            $count = 0;
            @endphp

            @if (!empty($report['fee_type_amounts']))
            @foreach ($report['fee_type_amounts'] as $index => $feeTypeAmount)

            @php
            $count++;
            @endphp

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($count) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($feeTypeAmount['fee_type_title'] ?? "") }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($feeTypeAmount['amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($feeTypeAmount['discount_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($feeTypeAmount['payable_amount'] ?? 0) }}</td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($count + 1) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($report['total_fee_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($report['total_discount_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($report['total_payable_amount'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>
    @endforeach
    @endif

    <!-- single table -->
    <table class="defult-table" style="margin-bottom: 10px;">
        <caption class="table-caption-title "><strong>Total Fee Summary</strong></caption>
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('SR. NO') }}</strong></th>
                <!-- <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Fee Type') }}</strong></th> -->
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Total Amount') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Total Discount') }}</strong></th>
                <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 1px solid #0D0D0D;"><strong>{{ __('Total Payable') }}</strong></th>
            </tr>
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __('1') }}</td>
                <!-- <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __('Total') }}</td> -->
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($reports['total_amount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($reports['total_discount'] ?? 0) }}</td>
                <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border: 1px solid #0D0D0D; color: #030105">{{ __($reports['total_payable'] ?? 0) }}</td>
            </tr>
        </tbody>
    </table>

    <table class="defult-table" style="margin-top: 50px;">
        <tfoot>
            <tr>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: center;">
                    <p><strong>{{ __('FATHER / SIGNATURE') }}</strong></p>
                </td>
                <td style="margin:0; padding:0; vertical-align:bottom; width:33%; text-align: center;">
                    <p><strong>{{ __('MOTHER / SIGNATURE') }}</strong></p>
                </td>
                <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: center;">
                    <p><strong>{{ __('GUARDIAN / SIGNATURE') }}</strong></p>
                </td>
            </tr>
        </tfoot>
    </table>
    @else
    <h3>No Data Available</h3>
    @endif
</body>

</html>