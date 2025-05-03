<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Head Wise Daily Paid Fee Summary </title>
</head>

<body>
    <table style="margin-top: 10px; width:100%">
        <tr>
            <td style="width: 20%; vertical-align: top; text-align: left;">
                <table>
                    <tr>
                        <td>
                            <img style="width: 60px; height: 60px;" src={{ $schoolData['logo']['path'] ?? ""}} alt="school-logo">
                        </td>
                    </tr>
                </table>
            </td>
            <td style="width: 50%;">
                <table style="margin: 0 auto; width: 100%; font-family:'Inter', sans-serif; border-collapse: collapse; vertical-align: middle;">
                    <tr>
                        <td style="vertical-align: middle; text-align: center;">
                            <table>
                                <tr>
                                    <td>
                                        <h5>{{ __(($schoolData['title'] ?? "")." (".($schoolData['academic_year'] ?? "").")") }}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>{{ __($reportDateTitle) }}</h5>
                                        <h5>{{ __("Payment mode - ". $paymentMode) }}</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
            <td style="width: 20%;">
            </td>
        </tr>
    </table>
    <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px; border-left: 1px solid #EEEEEE; border-right: 1px solid #EEEEEE;">
        <tbody>
            <tr>
                <th style="margin:0;vertical-align: middle; text-align: left; padding: 5px; background: #EEEEEE;">{{ __('Fee Type.') }}</th>
                <th style="margin:0;vertical-align: middle; text-align: left; padding: 5px; background: #EEEEEE;">{{ __('Amount.') }}</th>
            </tr>

            @if (!empty($headWiseReport['head_wise_amounts']))
            @foreach ($headWiseReport['head_wise_amounts'] as $headTitle => $amount)
            <tr>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($headTitle) }}
                </td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; border-bottom: 1px solid #EEEEEE; color: #030105">
                    {{ __($amount) }}
                </td>
            </tr>
            @endforeach
            @endif

            <tr>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; background: #CCCCCC; color: #030105">{{ __('Total') }}</td>
                <td style="margin: 0;vertical-align: top; text-align: left; padding:5px; background: #CCCCCC; color: #030105">
                    {{ __($headWiseReport['total'] ?? 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>