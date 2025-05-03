<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Preview Circular</title>

    <style>
        @media print {

            #printButtonWrapper,
            #printButton {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div id="printButtonWrapper" style="width: 100%; padding: 15px 5px; margin-left: 15px; text-align: center;">
        <input id="printButton" type="button" value="Print" onclick="window.print();"
            style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
    </div>

    @if(count($contents) > 0)
    @foreach ($contents as $content)
    <div style="page-break-after: always;">
        {!! $content !!}
    </div>
    @endforeach
    @endif
</body>

</html>