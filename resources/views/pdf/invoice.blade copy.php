<table style="width:100%;">
    <tr>
        <td colspan="3" style="width:100%;padding:0;margin:0;vertical-align:top;font-family:sans-serif;font-size:7pt;text-decoration:underline;">
            educarestudy
        </td>
    </tr>
    <tr>
        <td style="width:45%;padding:0;margin:0;vertical-align:top;font-family:sans-serif;font-size:10pt;">
            Sittu Kumar
        </td>
        <td style="width:10%;padding:0;margin:0;vertical-align:top;">&nbsp;</td>
        <td style="width:45%;padding:0;margin:0;vertical-align:top;font-family:sans-serif;font-size:10pt;">
            {{ __('Order number') }}: 1<br>
            {{ __('Order date') }}: {{ \App\Helpers\Formatter::dateFormat(date('Y-m-d')) }}<br>
            {{ __('Payment date') }}: {{ \App\Helpers\Formatter::dateFormat(date('Y-m-d')) }}
        </td>
    </tr>
</table>

<br><br><br><br>

<h2 style="padding:0;margin:0;font-family:sans-serif;font-size:16pt;text-transform:uppercase;">{{ __('Invoice') }}</h2>

<br>

<table style="width:100%;border-top:1px solid #ccc;border-bottom:1px solid #ccc;border-collapse:collapse;">
    <thead>
    <tr>
        <th style="width:45%;margin:0;text-align:left;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-weight:700;font-family:sans-serif;font-size:10pt;">
            {{ __('Description') }}
        </th>
        <th style="width:10%;margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-weight:700;font-family:sans-serif;font-size:10pt;">
            {{ __('Amount') }}
        </th>
        <th style="width:15%;margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-weight:700;font-family:sans-serif;font-size:10pt;">
            {{ __('Total price') }}
        </th>
    </tr>
    </thead>
    <tbody>

        <tr>
            <td colspan="2" style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
                <strong>{{ __('Gross subtotal') }}</strong>
            </td>
            <td style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
                <strong>{{ \App\Helpers\Formatter::moneyFormat( 200/100) }}</strong>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
                <strong>{{ __('Discount') }}</strong>
            </td>
            <td style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
                <strong>{{ \App\Helpers\Formatter::moneyFormat(500 / 100) }}</strong>
            </td>
        </tr>

    <tr>
        <td colspan="2" style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
            <strong>{{ __('Gross invoice amount') }}</strong>
        </td>
        <td style="margin:0;text-align:right;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;font-family:sans-serif;font-size:10pt;">
            <strong>{{ \App\Helpers\Formatter::moneyFormat((100) / 100) }}</strong>
        </td>
    </tr>
    </tbody>
</table>

<br><br>

<br><br>

<p style="padding:0;margin:0;font-family:sans-serif;font-size:10pt;">{{ __('We thank you for your order and the trust you have placed in us!') }}</p>

<br>

<p style="padding:0;margin:0;font-family:sans-serif;font-size:10pt;">{{ __('Regards') }}<br>{{ config('app.name') }}</p>
