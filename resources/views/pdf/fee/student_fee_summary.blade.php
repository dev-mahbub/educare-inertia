@if ($student != null)
<table style="width: 100%; font-family: 'Inter', sans-serif; border: 2px solid #0D0D0D; padding-top: 5px; padding-bottom: 5px; border-bottom: 0;">
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
                                {{ __('FEE AGREEMENT- '.$schoolData['academic_year'] ?? "") }}
                                @else
                                {{ __('FEE AGREEMENT- ') }}
                                @endif
                            </h3>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </thead>
</table>

<table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px;">
    <tbody>
        <tr>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Adm.No. ') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Name') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Class') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Father Name') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Mobile') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Agreement Date') }}</strong></th>
        </tr>
        <tr>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $student['admission_no'] ?? ""}}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">
                @if ($student != null)
                {{ __($student['first_name'] ?? "") }}
                {{ __($student['middle_name'] ?? "") }}
                {{ __($student['last_name'] ?? "") }}
                @else
                {{ __('') }}
                @endif
            </td>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">
                @if (!empty($student['classroom']))
                {{ __($student['classroom']['title'] ?? "") }}
                @else
                {{ __('') }}
                @endif
            </td>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">
                @if (!empty($student['father']))
                {{ __($student['father']['first_name'] ?? "") }}
                {{ __($student['father']['middle_name'] ?? "") }}
                {{ __($student['father']['last_name'] ?? "") }}
                @else
                {{ __('') }}
                @endif
            </td>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">
                @if (!empty($student['father']))
                {{ __($student['father']['phone'] ?? "") }}
                @else
                {{ __('') }}
                @endif
            </td>
            <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __($agreementDate) }}</td>
        </tr>
    </tbody>
</table>

@if (!empty($studentFeeStructure['feeInstallments']))
@foreach ($studentFeeStructure['feeInstallments'] as $installment)
<table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-bottom: 10px;">
    <caption style="text-align: center; background-color: #808080; color: #000000; border: 2px solid #0D0D0D; border-bottom: 0;">
        <strong>{{ __($installment['fee']['title'] ?? "") }}</strong>
    </caption>
    <tbody>
        <tr>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Fee Type') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Amount') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Discount') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Payable') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Paid') }}</strong></th>
            <th style="margin:0;vertical-align: middle; text-align: center; padding: 5px; border: 2px solid #0D0D0D;"><strong>{{ __('Dues') }}</strong></th>
        </tr>

        @if (!empty($installment['fee_type_amounts']))
        @foreach ($installment['fee_type_amounts'] as $feeTypeAmount)
        <tr>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['fee_type_title'] ?? "" }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['amount'] ?? 0 }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['discount_amount'] ?? 0 }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['payable_amount'] ?? 0 }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['paid_amount'] ?? 0 }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ $feeTypeAmount['due_amount'] ?? 0 }}
            </td>
        </tr>
        @endforeach
        @endif
        <!-- <tr>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('Development Fee') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('3000') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('400') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('2600') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('2600') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('0') }}</td>
        </tr>
        <tr>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('Child Kit') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('700') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('0') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('700') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('700') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('0') }}</td>
        </tr> -->

        <tr>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">{{ __('Total') }}</td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ __($installment['total_fee_amount'] ?? 0) }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ __($installment['total_discount_amount'] ?? 0) }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ __($installment['total_payable_amount'] ?? 0) }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ __($installment['total_paid_amount'] ?? 0) }}
            </td>
            <td style="margin: 0;vertical-align: top; text-align: center; padding:5px; border:2px solid #0D0D0D; color: #030105">
                {{ __($installment['total_due_amount'] ?? 0) }}
            </td>
        </tr>
    </tbody>
</table>
@endforeach
@endif

<table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 50px;">
    <tfoot>
        <tr>
            <td style="margin:0; padding:0; vertical-align:bottom; width:33%; text-align: center;">
                <p><strong>{{ __('MOTHER / SIGNATURE') }}</strong></p>
            </td>
            <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: center;">
                <p><strong>{{ __('FATHER / SIGNATURE') }}</strong></p>
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