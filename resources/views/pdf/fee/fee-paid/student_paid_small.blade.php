<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student paid small</title>
    <style>
        .total-due {
            margin-left: 5px;
        }

        @media print {
            #printButton {
                display: none;
            }
        }

        @page {
            margin: .5cm 0cm;
        }
    </style>
</head>

<body>
    <div style="max-width:850px; margin: 0 auto; padding: 0 5px;font-size:10px;">
        <div style="width: 48%; padding: 15px 5px; margin-left: 15px;">
            <input id="printButton" type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>
        <div style="width: 48%; float: left; padding: 0 5px;">
            <div style="width: 385px; margin: auto; border: 2px solid #000; padding-bottom: 5px;">

                <table style="width: 100%; font-family: 'Inter', sans-serif;">
                    <thead>
                        <tr style="width: 100%;">
                            <td style="width: 10%; vertical-align: top; text-align: left;">
                                <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                            </td>
                            <td style="width: 80%; vertical-align: top; text-align: center;">
                                <table style="text-align: center; width: 100%">
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 16px; margin:0">
                                                @if (!empty($schoolData['title']))
                                                {{ __($schoolData['title']) }}
                                                @endif
                                            </h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small style="font-size: 11px;">
                                                @if (!empty($schoolData['academic_year']))
                                                {{ __($schoolData['academic_year']) }}
                                                @endif
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small style="font-size: 11px;">
                                                @if (!empty($schoolData['street_address']))
                                                {{ __($schoolData['street_address']) }}
                                                @endif
                                                {{ __(!empty($schoolData['phone']) ? ', '.$schoolData['phone'] : '') }}
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small style="font-size: 11px;">
                                                {{ __(!empty($schoolData['mail']) ? $schoolData['mail'] : '') }}
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 10px; padding-right: 10px; padding-top: 3px; padding-bottom: 3px; background-color:#DDDDDD;">
                                            <small style="font-size: 11px;">{{ __('Fee Receipt (Student Copy)') }}</small>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 10%; vertical-align: top; text-align: right;">
                                {{-- <svg width="65" height="65" viewBox="0 0 65 65" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_572_15)">
                                    <rect width="65" height="65" fill="#E00000" />
                                    <rect width="65" height="65" fill="black" fill-opacity="0.2" />
                                    <path d="M65 0H0V65H65V0Z" fill="white" />
                                    <path
                                        d="M2.8262 62.1746H5.65226V59.3478H2.8262V62.1739M5.65226 62.1739H8.47831V59.3471H5.65226V62.1732M8.47846 62.1732H11.3045V59.3464H8.47846V62.1724M11.3045 62.1724H14.1306V59.3457H11.3045V62.1717M14.1306 62.1717H16.9566V59.3449H14.1307V62.171M16.9568 62.171H19.7828V59.3442H16.9568V62.1703M19.783 62.1703H22.609V59.3435H19.783V62.1696M25.4351 62.1696H28.2611V59.3428H25.4351V62.1688M33.9132 62.1688H36.7393V59.3421H33.9132V62.1681M36.7394 62.1681H39.5655V59.3413H36.7394V62.1674M39.5655 62.1674H42.3916V59.3406H39.5655V62.1667M42.3917 62.1667H45.2176V59.3399H42.3917V62.1659M45.2176 62.1659H48.0437V59.3392H45.2176V62.1652M56.5221 62.1652H59.348V59.3384H56.5221V62.1645M2.81768 59.3377H5.64373V56.5109H2.81768V59.3369M19.774 59.3369H22.6001V56.5109H19.774V59.3369ZM25.4261 59.3369H28.2522V56.5109H25.4261V59.3369ZM36.7305 59.3369H39.5565V56.5109H36.7305V59.3369ZM39.5565 59.3369H42.3826V56.5109H39.5565V59.3369ZM48.0347 59.3369H50.8608V56.5109H48.0347V59.3369ZM50.8609 59.3369H53.687V56.5109H50.8609V59.3369ZM53.687 59.3369H56.513V56.5109H53.687V59.3369ZM2.81363 56.5115H5.63969V53.6862H2.81363V56.5123M8.46589 56.5123H11.2919V53.6869H8.46589V56.513M11.2919 56.513H14.118V53.6876H11.2919V56.5137M14.118 56.5137H16.9441V53.6884H14.1181V56.5144M19.7704 56.5144H22.5965V53.6891H19.7704V56.5151M25.4225 56.5151H28.2486V53.6898H25.4225V56.5159M33.9007 56.5159H36.7267V53.6905H33.9007V56.5166M36.7269 56.5166H39.5529V53.6913H36.7269V56.5173M39.5529 56.5173H42.379V53.692H39.5529V56.518M42.3791 56.518H45.205V53.6927H42.3791V56.5187M2.81002 53.6934H5.63608V50.8666H2.81002V53.6927M8.46228 53.6927H11.2883V50.8659H8.46228V53.692M11.2883 53.692H14.1144V50.8652H11.2883V53.6913M14.1144 53.6913H16.9404V50.8645H14.1145V53.6905M19.7668 53.6905H22.5928V50.8645H19.7668V53.6905ZM25.4189 53.6905H28.245V50.8645H25.4189V53.6905ZM28.245 53.6905H31.071V50.8645H28.245V53.6905ZM33.8971 53.6905H36.7231V50.8645H33.8971V53.6905ZM45.2014 53.6905H48.0275V50.8645H45.2014V53.6905ZM48.0275 53.6905H50.8535V50.8645H48.0275V53.6905ZM50.8535 53.6905H53.6797V50.8645H50.8535V53.6905ZM2.80569 50.8637H5.63175V48.0384H2.80569V50.8645M8.45795 50.8645H11.284V48.0377H8.45795V50.8637M11.284 50.8637H14.1101V48.037H11.284V50.863M14.1101 50.863H16.9361V48.0362H14.1102V50.8623M19.7625 50.8623H22.5885V48.0362H19.7625V50.8623ZM25.4146 50.8623H28.2406V48.0362H25.4146V50.8623ZM28.2406 50.8623H31.0667V48.0362H28.2406V50.8623ZM31.0667 50.8623H33.8927V48.0362H31.0667V50.8623ZM36.7189 50.8623H39.545V48.0362H36.7189V50.8623ZM42.3712 50.8623H45.1971V48.0362H42.3712V50.8623ZM48.0232 50.8623H50.8492V48.0362H48.0232V50.8623ZM56.5016 50.8623H59.3275V48.0362H56.5016V50.8623ZM59.3275 50.8623H62.1536V48.0362H59.3275V50.8623ZM2.80352 48.0355H5.62958V45.2088H2.80352V48.0348M19.7599 48.0348H22.5859V45.2088H19.7599V48.0348ZM31.0641 48.0348H33.8901V45.2088H31.0641V48.0348ZM39.5424 48.0348H42.3684V45.2088H39.5424V48.0348ZM48.0206 48.0348H50.8466V45.2088H48.0206V48.0348ZM53.6728 48.0348H56.4989V45.2088H53.6728V48.0348ZM56.499 48.0348H59.3249V45.2088H56.499V48.0348ZM59.3249 48.0348H62.151V45.2088H59.3249V48.0348ZM2.79803 45.2095H5.62409V42.3841H2.79803V45.2101M5.62409 45.2101H8.45015V42.3847H5.62409V45.2106M8.45029 45.2106H11.2763V42.3853H8.45029V45.2112M11.2763 45.2112H14.1024V42.3859H11.2763V45.2118M14.1024 45.2118H16.9285V42.3865H14.1025V45.2124M16.9286 45.2124H19.7547V42.3865H16.9285L16.9286 45.2124ZM19.7548 45.2124H22.5809V42.3865H19.7548V45.2124ZM25.4069 45.2124H28.233V42.3865H25.4069V45.2124ZM28.233 45.2124H31.059V42.3865H28.233V45.2124ZM36.7113 45.2124H39.5373V42.3865H36.7113V45.2124ZM39.5373 45.2124H42.3634V42.3865H39.5373V45.2124ZM50.8417 45.2124H53.6678V42.3865H50.8417V45.2124ZM56.494 45.2124H59.3199V42.3865H56.494V45.2124ZM25.4037 42.387H28.2298V39.561H25.4037V42.387ZM28.2298 42.387H31.0558V39.561H28.2298V42.387ZM31.0558 42.387H33.8819V39.561H31.0558V42.387ZM45.1863 42.387H48.0123V39.561H45.1863V42.387ZM48.0123 42.387H50.8384V39.561H48.0123V42.387ZM50.8385 42.387H53.6646V39.561H50.8385V42.387ZM53.6646 42.387H56.4906V39.561H53.6646V42.387ZM56.4906 42.387H59.3167V39.561H56.4906V42.387ZM59.3167 42.387H62.1427V39.561H59.3167V42.387ZM5.61658 39.5603H8.44263V36.7349H5.61658V39.561M11.2688 39.561H14.0949V36.7342H11.2688V39.5603M14.0949 39.5603H16.9209V36.7335H14.095V39.5595M19.7473 39.5595H22.5733V36.7335H19.7473V39.5595ZM22.5732 39.5595H25.3993V36.7335H22.5732V39.5595ZM25.3994 39.5595H28.2255V36.7335H25.3994V39.5595ZM31.0515 39.5595H33.8776V36.7335H31.0515V39.5595ZM33.8776 39.5595H36.7036V36.7335H33.8776V39.5595ZM42.356 39.5595H45.1819V36.7335H42.356V39.5595ZM48.008 39.5595H50.834V36.7335H48.008V39.5595ZM50.8342 39.5595H53.6602V36.7335H50.8342V39.5595ZM56.4864 39.5595H59.3124V36.7335H56.4864V39.5595ZM5.61022 36.7328H8.43628V33.906H5.61022V36.732M11.2625 36.732H14.0885V33.9067H11.2625V36.7328M14.0885 36.7328H16.9146V33.9074H14.0887V36.7335M16.9147 36.7335H19.7408V33.9074H16.9147V36.7335ZM28.2191 36.7335H31.0452V33.9074H28.2191V36.7335ZM39.5235 36.7335H42.3495V33.9074H39.5235V36.7335ZM45.1756 36.7335H48.0016V33.9074H45.1756V36.7335ZM48.0016 36.7335H50.8277V33.9074H48.0016V36.7335ZM50.8278 36.7335H53.6539V33.9074H50.8278V36.7335ZM53.6539 36.7335H56.4799V33.9074H53.6539V36.7335ZM56.4801 36.7335H59.306V33.9074H56.4801V36.7335ZM59.306 36.7335H62.1321V33.9074H59.306V36.7335ZM8.43267 33.9081H11.2587V31.0828H8.43267V33.9089M14.0848 33.9089H16.9108V31.0835H14.0849V33.9096M16.911 33.9096H19.737V31.0835H16.911V33.9096ZM19.7372 33.9096H22.5632V31.0835H19.7372V33.9096ZM22.5632 33.9096H25.3891V31.0835H22.5632V33.9096ZM25.3891 33.9096H28.2153V31.0835H25.3891V33.9096ZM28.2153 33.9096H31.0414V31.0835H28.2153V33.9096ZM31.0414 33.9096H33.8675V31.0835H31.0414V33.9096ZM33.8675 33.9096H36.6935V31.0835H33.8675V33.9096ZM36.6935 33.9096H39.5197V31.0835H36.6935V33.9096ZM50.8241 33.9096H53.6501V31.0835H50.8241V33.9096ZM56.4763 33.9096H59.3022V31.0835H56.4763V33.9096ZM5.60011 31.0843H8.42617V28.2575H5.60011V31.0835M8.42631 31.0835H11.2524V28.2568H8.42631V31.0828M14.0784 31.0828H16.9045V28.256H14.0786V31.0821M16.9046 31.0821H19.7307V28.256H16.9045L16.9046 31.0821ZM25.3829 31.0821H28.209V28.256H25.3829V31.0821ZM28.209 31.0821H31.035V28.256H28.209V31.0821ZM31.035 31.0821H33.8611V28.256H31.035V31.0821ZM39.5134 31.0821H42.3394V28.256H39.5134V31.0821ZM47.9915 31.0821H50.8176V28.256H47.9915V31.0821ZM50.8177 31.0821H53.6438V28.256H50.8177V31.0821ZM53.6438 31.0821H56.4698V28.256H53.6438V31.0821ZM56.47 31.0821H59.2959V28.256H56.47V31.0821ZM59.2959 31.0821H62.1219V28.256H59.2959V31.0821ZM2.769 28.2553H5.59506V25.43H2.769V28.256M5.59506 28.256H8.42111V25.4293H5.59506V28.2553M8.42126 28.2553H11.2473V25.4285H8.42126V28.2546M11.2473 28.2546H14.0734V25.4278H11.2473V28.2539M14.0734 28.2539H16.8994V25.4271H14.0735V28.2531M19.7258 28.2531H22.5518V25.4271H19.7258V28.2531ZM22.5518 28.2531H25.3777V25.4271H22.5518V28.2531ZM25.3779 28.2531H28.2039V25.4271H25.3779V28.2531ZM36.6822 28.2531H39.5083V25.4271H36.6822V28.2531ZM39.5083 28.2531H42.3344V25.4271H39.5083V28.2531ZM45.1604 28.2531H47.9865V25.4271H45.1604V28.2531ZM50.8127 28.2531H53.6387V25.4271H50.8127V28.2531ZM56.4649 28.2531H59.2908V25.4271H56.4649V28.2531ZM28.2 25.4264H31.0261V22.6003H28.2V25.4264ZM33.8521 25.4264H36.6782V22.6003H33.8521V25.4264ZM2.76192 22.601H5.58798V19.7757H2.76192V22.6018M5.58798 22.6018H8.41403V19.7764H5.58798V22.6025M8.41418 22.6025H11.2402V19.7771H8.41418V22.6032M11.2402 22.6032H14.0663V19.7779H11.2402V22.6039M14.0663 22.6039H16.8923V19.7786H14.0664V22.6046M16.8925 22.6046H19.7185V19.7786H16.8923L16.8925 22.6046ZM19.7187 22.6046H22.5447V19.7786H19.7187V22.6046ZM25.3708 22.6046H28.1969V19.7786H25.3708V22.6046ZM31.0229 22.6046H33.849V19.7786H31.0229V22.6046ZM36.6752 22.6046H39.5012V19.7786H36.6752V22.6046ZM42.3274 22.6046H45.1533V19.7786H42.3274V22.6046ZM45.1533 22.6046H47.9794V19.7786H45.1533V22.6046ZM47.9794 22.6046H50.8054V19.7786H47.9794V22.6046ZM50.8056 22.6046H53.6316V19.7786H50.8056V22.6046ZM53.6316 22.6046H56.4577V19.7786H53.6316V22.6046ZM56.4578 22.6046H59.2838V19.7786H56.4578V22.6046ZM59.2838 22.6046H62.1098V19.7786H59.2838V22.6046ZM2.75109 19.7793H5.57715V16.9525H2.75109V19.7786M19.7074 19.7786H22.5335V16.9525H19.7074V19.7786ZM25.3595 19.7786H28.1856V16.9525H25.3595V19.7786ZM33.8377 19.7786H36.6638V16.9525H33.8377V19.7786ZM36.6639 19.7786H39.49V16.9525H36.6639V19.7786ZM42.3162 19.7786H45.1421V16.9525H42.3162V19.7786ZM59.2725 19.7786H62.0985V16.9525H59.2725V19.7786ZM2.7456 16.9518H5.57166V14.1259H2.7456V16.9518ZM8.39786 16.952H11.2239V14.126H8.39786V16.952ZM11.2239 16.952L14.05 16.9521V14.1262L11.2239 14.126V16.9522M14.05 16.9521L16.876 16.9522V14.1263H14.0501V16.9524M19.7024 16.9524H22.5284V14.1265H19.7024V16.9524ZM28.1805 16.9525H31.0066V14.1266H28.1805V16.9525ZM42.3111 16.9527H45.137V14.1268H42.3111V16.9527ZM47.9631 16.9528H50.7891V14.1269H47.9631V16.9528ZM50.7893 16.953H53.6153V14.1271H50.7893V16.953ZM53.6153 16.953L56.4414 16.9531V14.1272L53.6153 14.1271V16.9533M59.2674 16.9533H62.0935V14.1273H59.2674V16.9533ZM2.74055 14.1275H5.5666V11.3014H2.74055V14.1275ZM8.3928 14.1275H11.2189V11.3014H8.3928V14.1275ZM11.2189 14.1275H14.0449V11.3014H11.2189V14.1275ZM14.0449 14.1275H16.871V11.3014H14.0449V14.1275ZM19.6973 14.1275H22.5234V11.3014H19.6973V14.1275ZM25.3494 14.1275H28.1755V11.3014H25.3494V14.1275ZM28.1755 14.1275H31.0015V11.3014H28.1755V14.1275ZM33.8276 14.1275H36.6536V11.3014H33.8276V14.1275ZM42.306 14.1275H45.132V11.3014H42.306V14.1275ZM47.958 14.1275H50.7841V11.3014H47.958V14.1275ZM50.7842 14.1275H53.6103V11.3014H50.7842V14.1275ZM53.6103 14.1275H56.4363V11.3014H53.6103V14.1275ZM59.2624 14.1275H62.0884V11.3014H59.2559V14.1275M2.73477 11.3014H5.56082V8.47523H2.73477V11.3014ZM8.38702 11.3014H11.2131V8.47523H8.38702V11.3014ZM11.2131 11.3014H14.0391V8.47523H11.2131V11.3014ZM14.0391 11.3014H16.8652V8.47523H14.0393V11.3014M19.6915 11.3014H22.5176V8.47523H19.6915V11.3014ZM30.9958 11.3014H33.8218V8.47523H30.9958V11.3014ZM33.8218 11.3014H36.6479V8.47523H33.8218V11.3014ZM42.3003 11.3014H45.1262V8.47523H42.3003V11.3014ZM47.9522 11.3014H50.7783V8.47523H47.9522V11.3014ZM50.7784 11.3014H53.6045V8.47523H50.7784V11.3014ZM53.6045 11.3014H56.4305V8.47523H53.6045V11.3014ZM59.2566 11.3014H62.0827V8.47523H59.253V11.3014M2.73188 8.47523H5.55793V5.64918H2.73188V8.47523ZM19.6882 8.47523H22.5143V5.64918H19.6882V8.47523ZM25.3403 8.47523H28.1664V5.64918H25.3403V8.47523ZM28.1664 8.47523H30.9924V5.64918H28.1664V8.47523ZM30.9924 8.47523H33.8185V5.64918H30.9924V8.47523ZM36.6447 8.47523H39.4707V5.64918H36.6447V8.47523ZM42.2969 8.47523H45.1229V5.64918H42.2969V8.47523ZM59.2533 8.47523H62.0793V5.64918H59.2526V8.47523M2.73145 5.64918H5.5575V2.82312H2.73145V5.64918ZM5.5575 5.64918H8.38356V2.82312H5.5575V5.64918ZM8.38356 5.64918H11.2098V2.82312H8.38356V5.64918ZM11.2098 5.64918H14.0358V2.82312H11.2098V5.64918ZM14.0358 5.64918H16.8619V2.82312H14.0358V5.64918ZM16.8619 5.64918H19.6881V2.82312H16.8613V5.64918M19.6875 5.64918H22.5135V2.82312H19.6882V5.64918M30.9924 5.64918H33.8185V2.82312H30.9932V5.64918M36.6454 5.64918H39.4715V2.82312H36.6447V5.64918M42.2969 5.64918H45.1229V2.82312H42.2975V5.64918M45.1234 5.64918H47.9495V2.82312H45.1242V5.64918M47.9502 5.64918H50.7763V2.82312H47.9524V5.64918M50.7786 5.64918H53.6046V2.82312H50.7779V5.64918M53.6039 5.64918H56.43V2.82312H53.6046V5.64918M56.4308 5.64918H59.2567V2.82312H56.43V5.64918M59.2559 5.64918H62.0819V2.82312H59.258V5.64918H59.2559Z"
                                        fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_572_15">
                                        <rect width="65" height="65" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p><small>scan your account</small></p> --}}
                            </td>
                        </tr>
                    </thead>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-left: 5px;">
                    <tbody>
                        <tr>
                            <td style="vertical-align: top; width: 50%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px">
                                                <strong>{{ __('Receipt No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['receipt_no']))
                                                {{ __($report['receipt_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px">
                                                <strong>{{ __('Student\'s Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['student']))
                                                {{ __("{$report['student']['first_name']} {$report['student']['middle_name']} {$report['student']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px">
                                                <strong>{{ __('Father\'s Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['student']['father']))
                                                {{ __("{$report['student']['father']['first_name']} {$report['student']['father']['middle_name']} {$report['student']['father']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px">
                                                <strong>{{ __('Class.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['student']['classroom']))
                                                {{ __($report['student']['classroom']['title']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px"><strong>{{ __('Roll No.') }}</strong></td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['student']['classroom_roll']))
                                                {{ __($report['student']['classroom_roll']['roll_no'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Pay.Type') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['receipt_title']))
                                                {{ __($report['receipt_title']) }}
                                                @endif
                                            </td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding-left: 10px; vertical-align: top; width: 50%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px; font-size:12px">
                                                <strong>{{ __('Date.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size:11px">
                                                @if (!empty($report['receipt_date']))
                                                {{ __($report['receipt_date']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size:12px">
                                                <strong>{{ __('Admission No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size:11px">
                                                @if (!empty($report['student']['admission_no']))
                                                {{ __($report['student']['admission_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size:12px">
                                                <strong>{{ __('Mode.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size:11px">
                                                @if (!empty($report['payment_mode']))
                                                {{ __($report['payment_mode']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size:12px">
                                                <strong>{{ __('Scl Receipt No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; font-size:11px">
                                                {{ __($report['school_receipt_no'] ?? "") }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 0px; margin-left: 5px;">
                    <tbody>
                        <tr>
                            <td style="vertical-align:top; margin-bottom: 0px; padding-bottom: 3px; font-size:12px"><strong>{{ __('Pay.Type') }}</strong></td>
                            <td style="vertical-align:top; margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                @if (!empty($report['receipt_title']))
                                {{ __($report['receipt_title']) }}
                                @endif
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 5px;">
                    <tr style="border: 1px solid #000; border-left: 0!important; border-right: 0!important;">
                        <th style="text-align: right; border-right: 1px solid #000; padding-right: 10px; font-size:13px"><small>{{ __('Particulars') }}</small></th>
                        <th style="min-width:90px; text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:13px"><small>Amount (Rs.)</small></th>
                    </tr>
                    @if (!empty($report) && count($report['payments']) > 0)
                    @foreach ($report['payments'] as $payment)
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; font-size:12px">
                            {{ __($payment['fee_type_title']) }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __($payment['amount'] ?? 0) }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    <tr>
                        <td style="text-align: right; border-top: 1px solid #000; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Total Amount') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_amount']))
                            {{ __($report['total_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Discount') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_discount_amount']))
                            {{ __($report['total_discount_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Payable') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_payable_amount']))
                            {{ __($report['total_payable_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Paid: ') }}
                            {{ __(!empty($report['total_paid_amount_in_word']) ? $report['total_paid_amount_in_word'] : "") }}.
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_paid_amount']))
                            {{ __($report['total_paid_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Due') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px; font-weight:bold">
                            @if (!empty($report['total_due_amount']))
                            {{ __($report['total_due_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                </table>

                <!-- <div class="total-due">
                    <small style=""><strong>Total Due -
                            @if (!empty($report['student_total_due']))
                            {{ __($report['student_total_due']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </strong></small>
                </div> -->
                <div style="margin-left:5px;">
                    <p style="font-size:13px; font-weight:bold">{{ __($report['payment_note'] ?? "") }}</p>
                </div>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 30px">
                    <tfoot>
                        <tr>
                            <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right; padding-right: 10px;">
                                <p>
                                    <small style="font-size:12px;">
                                        @if (!empty($report['created_by']))
                                        {{ __("{$report['created_by']['first_name']} {$report['created_by']['middle_name']} {$report['created_by']['last_name']}") }}
                                        @endif
                                    </small>
                                </p>
                                <small><strong>Auth. Signatory</strong></small>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </div>
        <div style="width: 48%; float: left; padding: 0 5px;">
            <div style="width: 385px; margin: auto; border: 2px solid #000; padding-bottom: 5px;">

                <table style="width: 100%; font-family: 'Inter', sans-serif;">
                    <thead>
                        <tr style="width: 100%;">
                            <td style="width: 10%; vertical-align: top; text-align: left;">
                                {{-- <svg width="65" height="65" viewBox="0 0 65 65" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_560_2)">
                                    <path
                                        d="M32.717 64.3678C50.4304 64.3678 64.7899 50.0083 64.7899 32.2949C64.7899 14.5815 50.4304 0.221924 32.717 0.221924C15.0036 0.221924 0.644043 14.5815 0.644043 32.2949C0.644043 50.0083 15.0036 64.3678 32.717 64.3678Z"
                                        fill="#E6EEFA" />
                                    <path
                                        d="M32.5 65C14.5804 65 0 50.4196 0 32.5C0 14.5804 14.5804 0 32.5 0C50.4196 0 65 14.5804 65 32.5C65 50.4196 50.4196 65 32.5 65ZM32.5 0.760022C14.9978 0.760022 0.760022 14.9978 0.760022 32.5C0.760022 50.0022 14.9978 64.24 32.5 64.24C50.0022 64.24 64.24 50.0022 64.24 32.5C64.24 14.9978 50.0022 0.760022 32.5 0.760022Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M38.7423 28.0847L39.5916 32.3553L34.7492 36.346L29.5376 32.0561L30.785 28.3791L38.7423 28.0847Z"
                                        fill="#F7D6C3" />
                                    <path
                                        d="M34.7489 36.609C34.6886 36.609 34.6282 36.5897 34.58 36.5486L29.3684 32.2587C29.284 32.1888 29.2502 32.073 29.2864 31.9692L30.5338 28.2922C30.57 28.1884 30.6641 28.116 30.775 28.1112L38.7324 27.8192C38.8602 27.812 38.976 27.9037 39.0026 28.0316L39.8519 32.3022C39.8712 32.3987 39.835 32.4976 39.7602 32.5579L34.9178 36.5462C34.8671 36.5897 34.8092 36.609 34.7489 36.609ZM29.8485 31.9668L34.7489 36.0009L39.2994 32.2515L38.5249 28.3573L30.9777 28.6348L29.8485 31.9668Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M39.9677 50.5549L28.9872 50.205L28.9751 32.0562L33.8778 36.0758L39.806 32.7173L39.9677 50.5549Z"
                                        fill="#DEF7FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.5371 31.6387L34.6425 35.6897L29.9907 40.508L29.5371 31.6387Z"
                                        fill="#DEF7FF" />
                                    <path
                                        d="M29.9908 40.7735C29.9594 40.7735 29.928 40.7686 29.8967 40.7566C29.7978 40.7204 29.7302 40.6263 29.7254 40.5225L29.2718 31.6532C29.2669 31.5494 29.3224 31.4529 29.4141 31.4047C29.5058 31.3564 29.6192 31.3685 29.7012 31.4336L34.8067 35.4847C34.8646 35.5305 34.9008 35.6005 34.9056 35.6753C34.9104 35.7501 34.8839 35.8225 34.8308 35.878L30.179 40.6963C30.1307 40.7445 30.0608 40.7735 29.9908 40.7735ZM29.8315 32.2105L30.2224 39.8856L34.2469 35.7163L29.8315 32.2105Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M39.5912 32.0994L34.6426 35.6775L38.807 40.5899L39.5912 32.0994Z"
                                        fill="#DEF7FF" />
                                    <path
                                        d="M38.8071 40.8553C38.7299 40.8553 38.6551 40.8215 38.6044 40.7612L34.44 35.8488C34.3918 35.7933 34.37 35.7185 34.3797 35.6461C34.3893 35.5737 34.4279 35.5062 34.4883 35.4628L39.4344 31.8846C39.5189 31.8243 39.6299 31.8171 39.7216 31.8701C39.8108 31.9208 39.8639 32.0222 39.8543 32.1235L39.0725 40.614C39.0629 40.7202 38.9905 40.8095 38.8892 40.8432C38.8602 40.8505 38.8337 40.8553 38.8071 40.8553ZM35.0311 35.7258L38.602 39.9384L39.2728 32.6567L35.0311 35.7258Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.4337 31.6387C29.4337 31.6387 20.1711 35.0648 18.7548 37.9408C16.494 42.5251 15.7002 55.8363 15.7002 55.8363H30.0875L29.4337 31.6387Z"
                                        fill="#76B5FC" />
                                    <path
                                        d="M30.0849 56.1016H15.6976C15.6252 56.1016 15.5553 56.0703 15.5046 56.0172C15.4539 55.9641 15.4274 55.8917 15.4322 55.8193C15.4346 55.7855 15.6373 52.439 16.115 48.5738C16.7568 43.367 17.5651 39.7503 18.5157 37.8225C19.9634 34.8861 28.9582 31.53 29.3418 31.3876C29.4214 31.3587 29.5107 31.3683 29.5831 31.4166C29.6531 31.4648 29.6965 31.5445 29.6989 31.6289L30.3504 55.8266C30.3528 55.8989 30.3262 55.9665 30.2756 56.0196C30.2249 56.0727 30.1573 56.1016 30.0849 56.1016ZM15.9823 55.5732H29.8147L29.1802 32.0198C27.4936 32.6736 20.195 35.6172 18.9934 38.0589C16.9619 42.1775 16.1126 53.6285 15.9823 55.5732Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M39.7747 32.0559C39.7747 32.0559 49.6333 35.5303 50.4536 38.6476C51.2764 41.7649 51.7614 52.2267 51.7614 52.2267L51.8362 55.9737L39.1016 56.0099L39.7747 32.0559Z"
                                        fill="#76B5FC" />
                                    <path
                                        d="M39.1015 56.273C39.0291 56.273 38.9616 56.244 38.9109 56.1934C38.8602 56.1427 38.8337 56.0727 38.8361 56.0003L39.5093 32.0464C39.5117 31.9619 39.5551 31.8823 39.6251 31.8365C39.695 31.7882 39.7843 31.7761 39.8639 31.8051C40.2717 31.9499 49.8624 35.3639 50.7117 38.5802C51.5321 41.6878 52.0098 51.7852 52.0291 52.2147L52.1039 55.9666C52.1063 56.0365 52.0774 56.1065 52.0291 56.1572C51.9784 56.2078 51.9109 56.2368 51.8409 56.2368L39.1015 56.273ZM40.028 32.43L39.3741 55.7422L51.5659 55.706L51.4959 52.2292C51.4911 52.1327 51.0013 41.765 50.1954 38.7129C49.8793 37.5161 47.9757 36.0299 44.6871 34.4181C42.7182 33.4554 40.7904 32.7147 40.028 32.43Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.5303 31.6387L25.1367 38.3679L27.7063 40.2402L25.1343 42.0835L28.751 50.5548H32.8793L29.5303 31.6387Z"
                                        fill="#589BE7" />
                                    <path
                                        d="M32.8789 50.8202H28.7507C28.6445 50.8202 28.548 50.7575 28.507 50.6586L24.8879 42.1873C24.8396 42.0739 24.8758 41.9412 24.9771 41.8689L27.2524 40.2378L24.9795 38.5802C24.8661 38.4982 24.8372 38.339 24.9144 38.2207L29.308 31.4939C29.3684 31.4023 29.4769 31.3564 29.5831 31.3781C29.6893 31.3998 29.7713 31.4843 29.7906 31.5905L33.1395 50.5066C33.154 50.5838 33.1323 50.6634 33.0816 50.7237C33.0334 50.7864 32.9586 50.8202 32.8789 50.8202ZM28.9268 50.2918H32.5629L29.3853 32.3457L25.4959 38.3028L27.8628 40.0279C27.9328 40.0786 27.9714 40.1582 27.9714 40.2426C27.9714 40.3271 27.9304 40.4067 27.8604 40.4574L25.4597 42.1777L28.9268 50.2918Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M39.5694 32.0562L43.9558 38.7178L41.4417 40.5901L43.9583 42.4359L39.1014 50.5549H36.0396L39.5694 32.0562Z"
                                        fill="#589BE7" />
                                    <path
                                        d="M39.1015 50.8203H36.0397C35.96 50.8203 35.8853 50.7841 35.8346 50.7238C35.7839 50.6635 35.7646 50.5838 35.7791 50.5042L39.309 32.0031C39.3283 31.8969 39.4127 31.8149 39.5165 31.7932C39.6226 31.7715 39.7312 31.8173 39.7891 31.9066L44.1755 38.5682C44.2527 38.6865 44.2262 38.8433 44.1128 38.9277L41.8882 40.5853L44.1152 42.2188C44.2262 42.3008 44.2551 42.4504 44.1852 42.5686L39.3283 50.6924C39.28 50.772 39.1932 50.8203 39.1015 50.8203ZM36.3606 50.2919H38.9519L43.6085 42.5083L41.2874 40.8049C41.2199 40.7542 41.1789 40.677 41.1789 40.5926C41.1789 40.5081 41.2175 40.4285 41.285 40.3778L43.5965 38.6551L39.7071 32.7486L36.3606 50.2919Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M33.7837 40.5055L32.8789 50.5547H36.0396L35.3954 40.4741L33.7837 40.5055Z"
                                        fill="#F78359" />
                                    <path
                                        d="M36.0397 50.8202H32.879C32.8042 50.8202 32.7342 50.7888 32.6836 50.7333C32.6329 50.6778 32.6088 50.6054 32.616 50.5307L33.5208 40.4815C33.5329 40.3464 33.6438 40.2426 33.779 40.2402L35.3907 40.2088C35.5355 40.2016 35.6513 40.315 35.6609 40.4573L36.3027 50.5379C36.3075 50.6103 36.281 50.6827 36.2303 50.7357C36.1821 50.7912 36.1121 50.8202 36.0397 50.8202ZM33.1685 50.2918H35.7574L35.1494 40.7445L34.0275 40.7662L33.1685 50.2918Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M34.5455 35.7549L32.4971 37.936L33.7107 40.5901H35.4431L36.5288 38.0132L34.5455 35.7549Z"
                                        fill="#F78359" />
                                    <path
                                        d="M35.4433 40.8555H33.711C33.6072 40.8555 33.5131 40.7952 33.4697 40.7011L32.2561 38.047C32.2102 37.9481 32.2295 37.8347 32.3043 37.7551L34.3528 35.5739C34.4034 35.5184 34.471 35.4846 34.5506 35.4895C34.6254 35.4919 34.6954 35.5232 34.7461 35.5787L36.7294 37.8371C36.7969 37.9143 36.8138 38.0205 36.7752 38.1146L35.6894 40.6914C35.646 40.7903 35.5495 40.8555 35.4433 40.8555ZM33.8823 40.3247H35.2672L36.2203 38.0639L34.5386 36.1506L32.811 37.9891L33.8823 40.3247Z"
                                        fill="#142133" />
                                    <path
                                        d="M22.7548 50.8201C22.7524 50.8201 22.7524 50.8201 22.75 50.8201C22.6028 50.8177 22.487 50.697 22.4894 50.5523C22.68 37.6005 19.6665 37.1855 19.6351 37.1831C19.4928 37.1711 19.3818 37.048 19.389 36.9032C19.3962 36.7609 19.5169 36.6547 19.6568 36.6523C19.7582 36.6547 20.6726 36.7295 21.5171 38.5391C22.598 40.8505 23.1023 44.8943 23.0178 50.5571C23.0178 50.7043 22.8996 50.8201 22.7548 50.8201ZM46.9742 39.8806H46.9718C46.8246 39.8782 46.7088 39.76 46.7088 39.6128C46.7257 38.0324 48.4701 36.6089 48.5425 36.5486C48.6559 36.4569 48.8224 36.4738 48.9141 36.5896C49.0057 36.703 48.9889 36.8695 48.8755 36.9611C48.8586 36.9732 47.2517 38.2882 47.2372 39.6176C47.2372 39.7624 47.119 39.8806 46.9742 39.8806Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M37.9697 15.2705C37.6368 15.5697 37.3497 15.811 37.2001 15.9365C35.8851 17.0439 33.2214 18.0139 31.5252 18.4916C31.3563 18.5398 30.4298 18.4988 30.4298 18.6557C30.4298 19.4374 30.5722 23.9517 30.8159 24.3619C31.4335 25.4018 30.3237 27.1365 30.688 28.0582C31.074 29.0378 31.822 30.0753 32.7461 31.0404C31.0089 30.1766 28.5648 28.6542 28.5648 26.9194V19.1672C28.5648 18.2937 27.9133 15.7917 28.4007 15.0823C29.4116 13.6106 32.2515 14.2958 34.4423 14.2958C35.7645 14.2958 36.9853 14.6577 37.9697 15.2705Z"
                                        fill="#E1AB91" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M32.7435 31.0402C31.8194 30.0751 31.0715 29.0352 30.6854 28.0581C30.3211 27.1364 31.431 25.4016 30.8133 24.3617C30.5696 23.9515 30.4272 19.4372 30.4272 18.6555C30.4272 18.4987 31.3562 18.5397 31.5226 18.4914C33.2212 18.0137 35.8849 17.0438 37.1975 15.9363C37.3471 15.8108 38.4401 14.5924 38.7754 14.2932C40.2014 15.1835 40.3172 17.5722 40.3172 19.1646L40.1531 25.9976C40.1531 27.9254 36.8428 30.758 35.1346 31.5469C34.4204 31.8751 34.0102 31.629 33.296 31.3008C33.1247 31.226 32.9389 31.1368 32.7435 31.0402Z"
                                        fill="#FED3BC" />
                                    <path
                                        d="M34.2782 31.7521C33.7546 31.7521 33.231 31.6194 32.7629 31.3564C31.0354 30.3793 28.1353 28.3887 28.1353 26.0556V16.8533C28.1353 13.5188 30.8906 10.8069 34.2782 10.8069C37.6657 10.8069 40.4211 13.5188 40.4211 16.8533V26.0532C40.4211 28.3887 37.5209 30.3769 35.7934 31.354C35.3253 31.6194 34.8017 31.7521 34.2782 31.7521ZM34.2782 11.3377C31.1826 11.3377 28.6661 13.8132 28.6661 16.8533V26.0532C28.6661 28.1185 31.3973 29.9739 33.0259 30.8932C33.798 31.3299 34.7607 31.3299 35.5328 30.8932C37.1614 29.9715 39.8927 28.1185 39.8927 26.0532V16.8533C39.8903 13.8132 37.3737 11.3377 34.2782 11.3377Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M28.3163 21.3409C28.3163 21.3409 26.2968 20.9741 26.2896 22.844C26.2848 24.0384 26.9603 24.6054 26.9603 24.6054C26.9603 24.6054 27.0882 24.989 27.2113 25.3485C27.344 25.7442 27.6431 26.0627 28.0292 26.2219C28.2294 26.3039 28.4007 26.3739 28.4007 26.3739L28.3163 21.3409Z"
                                        fill="#E1AB91" />
                                    <path
                                        d="M28.4006 26.6394C28.3668 26.6394 28.333 26.6322 28.2992 26.6201L27.9277 26.4681C27.4692 26.2799 27.117 25.9035 26.9601 25.4354L26.7309 24.755C26.55 24.5717 26.0216 23.9468 26.0264 22.8441C26.0288 22.2409 26.2218 21.7753 26.5958 21.464C27.281 20.8946 28.3209 21.0732 28.3644 21.0828C28.4898 21.1045 28.5791 21.2131 28.5815 21.3386L28.6636 26.374C28.666 26.4633 28.6225 26.5477 28.5477 26.5984C28.5043 26.6249 28.4536 26.6394 28.4006 26.6394ZM27.9253 21.5774C27.6357 21.5774 27.2255 21.6281 26.9336 21.8718C26.6851 22.0793 26.5572 22.4074 26.5548 22.8465C26.55 23.8889 27.1073 24.3859 27.1314 24.4076C27.1676 24.439 27.1942 24.48 27.2111 24.5234L27.462 25.2666C27.5706 25.5899 27.8143 25.848 28.1279 25.9783L28.0555 21.5823C28.0169 21.5774 27.9735 21.5774 27.9253 21.5774Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M40.1553 21.3408C40.1553 21.3408 42.1748 20.974 42.182 22.8488C42.1868 24.0455 41.5112 24.6173 41.5112 24.6173C41.5112 24.6173 41.393 24.9696 41.2772 25.317C41.1349 25.7393 40.8043 26.0722 40.3845 26.2194C40.2832 26.2532 40.2132 26.2797 40.2132 26.2797L40.1553 21.3408Z"
                                        fill="#E1AB91" />
                                    <path
                                        d="M40.2135 26.5428C40.1604 26.5428 40.1073 26.5259 40.0615 26.4945C39.9915 26.4463 39.9505 26.3667 39.9481 26.2798L39.8902 21.3409C39.8878 21.2106 39.9795 21.0996 40.1073 21.0779C40.1508 21.0706 41.1883 20.8897 41.8735 21.4591C42.2499 21.7727 42.4429 22.2384 42.4453 22.8464C42.4501 23.9515 41.9217 24.5788 41.7408 24.7622L41.526 25.3991C41.3596 25.8962 40.9639 26.2967 40.4692 26.468L40.2979 26.5283C40.2714 26.538 40.2424 26.5428 40.2135 26.5428ZM40.4234 21.5797L40.4741 25.8889C40.7322 25.749 40.9325 25.5125 41.0266 25.2302L41.2606 24.5305C41.2751 24.4847 41.3041 24.4437 41.3403 24.4123C41.362 24.393 41.9217 23.896 41.9169 22.8488C41.9145 22.4073 41.7866 22.0767 41.5357 21.8668C41.2003 21.5918 40.7057 21.5677 40.4234 21.5797Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M36.4832 27.0205H31.9014L32.5769 27.7081H35.8969L36.4832 27.0205Z"
                                        fill="white" />
                                    <path
                                        d="M34.1408 27.9736C33.3615 27.9736 32.6256 27.964 32.5677 27.964C32.5388 27.964 32.5122 27.9591 32.4857 27.9495C32.4085 27.9229 31.8197 27.7106 31.6243 27.2884H31.0091C30.8619 27.2884 30.7437 27.1702 30.7437 27.023C30.7437 26.8758 30.8619 26.7576 31.0091 26.7576H31.8246H31.827H37.497C37.6442 26.7576 37.7624 26.8758 37.7624 27.023C37.7624 27.1702 37.6442 27.2884 37.497 27.2884H36.7901C36.6791 27.561 36.4185 27.8867 35.9239 27.9374C35.6271 27.964 34.8647 27.9736 34.1408 27.9736ZM32.6184 27.4331C32.9731 27.438 35.3231 27.4621 35.8708 27.4066C36.0011 27.3921 36.0952 27.3463 36.1603 27.286H32.3313C32.4229 27.3463 32.5267 27.397 32.6184 27.4331Z"
                                        fill="#142133" />
                                    <path
                                        d="M31.0113 27.5949C30.9413 27.5949 30.8713 27.5684 30.8207 27.5129C30.6494 27.3368 30.5939 26.9942 30.7 26.7794C30.8038 26.5743 30.9027 26.4778 31.0306 26.4537C31.1223 26.4368 31.214 26.4633 31.2839 26.5285C31.3925 26.6274 31.3973 26.7963 31.2984 26.9025C31.2694 26.9338 31.2333 26.958 31.1971 26.97C31.1898 26.9821 31.1826 26.9966 31.1729 27.0135C31.1657 27.04 31.1802 27.1196 31.1995 27.1437C31.3008 27.2499 31.2984 27.4164 31.1922 27.5177C31.144 27.5708 31.0788 27.5949 31.0113 27.5949ZM37.5451 27.5949C37.4775 27.5949 37.4124 27.5708 37.3617 27.5201C37.2555 27.4188 37.2531 27.2499 37.3569 27.1462C37.3738 27.122 37.3882 27.0424 37.381 27.011C37.3738 26.9966 37.3665 26.9845 37.3617 26.9749C37.3231 26.9604 37.2893 26.9387 37.2604 26.9049C37.1614 26.7963 37.1687 26.6298 37.2748 26.5309C37.3448 26.4682 37.4365 26.4392 37.5282 26.4561C37.6585 26.4802 37.7574 26.5767 37.8587 26.7794C37.9673 26.9966 37.9118 27.3392 37.7405 27.5153C37.6826 27.566 37.615 27.5949 37.5451 27.5949Z"
                                        fill="#142133" />
                                    <path
                                        d="M34.2375 25.8963C33.7984 25.8963 33.3786 25.7419 33.118 25.4789C32.9129 25.2714 32.8888 24.9843 32.8719 24.7743L32.8695 24.7406C32.8574 24.5958 32.9636 24.4655 33.1108 24.4534C33.2555 24.4414 33.3858 24.5475 33.3979 24.6947L33.4003 24.7309C33.4124 24.866 33.4268 25.0373 33.4944 25.1049C33.6729 25.2834 34.0011 25.3848 34.334 25.3606C34.6236 25.3389 34.8697 25.2279 34.9927 25.0591C35.0386 24.9963 35.0699 24.8853 35.0772 24.7526C35.0844 24.6055 35.2123 24.4993 35.3571 24.5017C35.5042 24.5089 35.6152 24.6344 35.608 24.7816C35.5983 24.9481 35.5597 25.1869 35.4198 25.3751C35.2026 25.6695 34.819 25.8577 34.3726 25.889C34.3268 25.8939 34.2834 25.8963 34.2375 25.8963ZM32.3942 23.9998H31.0454C30.254 23.9998 29.6074 23.3556 29.6074 22.5618V22.031C29.6074 21.2396 30.2516 20.593 31.0454 20.593H32.3942C33.1856 20.593 33.8322 21.2372 33.8322 22.031V22.5618C33.8298 23.3556 33.1856 23.9998 32.3942 23.9998ZM31.043 21.1262C30.5436 21.1262 30.1358 21.534 30.1358 22.0334V22.5643C30.1358 23.0637 30.5436 23.4715 31.043 23.4715H32.3918C32.8912 23.4715 33.299 23.0637 33.299 22.5643V22.0334C33.299 21.534 32.8912 21.1262 32.3918 21.1262H31.043ZM31.0044 22.8152C30.961 22.8152 30.9151 22.8031 30.8741 22.7814C30.7462 22.709 30.7028 22.5474 30.7752 22.4195C31.0503 21.9345 31.376 21.6836 31.7403 21.6764C31.7451 21.6764 31.75 21.6764 31.7548 21.6764C32.3025 21.6764 32.662 22.2337 32.703 22.2964C32.7802 22.4219 32.7416 22.5836 32.6161 22.6608C32.4907 22.738 32.329 22.6994 32.2518 22.5763C32.1915 22.4798 31.9695 22.2047 31.7548 22.2047C31.7524 22.2047 31.75 22.2047 31.75 22.2047C31.5907 22.2096 31.4073 22.3761 31.236 22.6801C31.1854 22.7669 31.0961 22.8152 31.0044 22.8152Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M31.7399 21.949C31.9378 21.949 32.097 22.1058 32.097 22.2964C32.097 22.4894 31.9378 22.6439 31.7399 22.6439C31.5421 22.6439 31.3828 22.487 31.3828 22.2964C31.3828 22.1058 31.5421 21.949 31.7399 21.949Z"
                                        fill="#142133" />
                                    <path
                                        d="M37.5114 23.9998H36.1626C35.3712 23.9998 34.7246 23.3556 34.7246 22.5618V22.031C34.7246 21.2396 35.3688 20.593 36.1626 20.593H37.5114C38.3027 20.593 38.9494 21.2372 38.9494 22.031V22.5618C38.9494 23.3556 38.3052 23.9998 37.5114 23.9998ZM36.1626 21.1262C35.6632 21.1262 35.2554 21.534 35.2554 22.0334V22.5643C35.2554 23.0637 35.6632 23.4715 36.1626 23.4715H37.5114C38.0108 23.4715 38.4186 23.0637 38.4186 22.5643V22.0334C38.4186 21.534 38.0108 21.1262 37.5114 21.1262H36.1626ZM37.5524 22.8152C37.4607 22.8152 37.3714 22.7669 37.3208 22.6801C37.1494 22.3785 36.9661 22.2096 36.8068 22.2047C36.5921 22.2023 36.3653 22.4774 36.3026 22.5763C36.2254 22.6994 36.0613 22.738 35.9382 22.6608C35.8152 22.5836 35.7766 22.4219 35.8538 22.2964C35.8924 22.2313 36.2543 21.6764 36.802 21.6764C36.8068 21.6764 36.8117 21.6764 36.8165 21.6764C37.1808 21.6836 37.5065 21.9321 37.7816 22.4195C37.854 22.5474 37.8105 22.709 37.6827 22.7814C37.6416 22.8055 37.5982 22.8152 37.5524 22.8152Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M36.8166 21.949C36.6187 21.949 36.4595 22.1058 36.4595 22.2964C36.4595 22.4894 36.6187 22.6439 36.8166 22.6439C37.0144 22.6439 37.1737 22.487 37.1737 22.2964C37.1737 22.1058 37.0144 21.949 36.8166 21.949Z"
                                        fill="#142133" />
                                    <path
                                        d="M33.5637 21.8935C33.419 21.8935 33.2983 21.7753 33.2983 21.6306C33.2983 21.4834 33.4166 21.3651 33.5613 21.3651L34.9873 21.3579C34.9873 21.3579 34.9873 21.3579 34.9897 21.3579C35.1345 21.3579 35.2551 21.4761 35.2551 21.6209C35.2551 21.7681 35.1369 21.8863 34.9921 21.8863L33.5637 21.8935C33.5662 21.8935 33.5662 21.8935 33.5637 21.8935Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M34.032 8.41089C34.1067 8.40606 34.1791 8.40123 34.2443 8.39882C37.2916 8.30955 40.1652 10.1746 40.6936 13.0772C40.7226 13.2316 41.9748 13.1833 42.3922 13.7407C43.0702 14.6455 42.7203 16.1269 42.3994 17.2609C42.2233 17.121 42.0906 16.9907 42.0351 16.8821C41.4126 15.6371 40.3968 14.1702 39.3545 13.1278C39.34 13.1134 39.3159 13.1278 39.2942 13.1278C37.0334 13.1278 35.3469 16.8387 32.9197 13.6056C31.1173 11.2 32.425 9.76686 34.032 8.41089Z"
                                        fill="#D1976D" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M42.3465 17.2127C42.2765 17.4564 42.2235 17.6735 42.168 17.8762C41.8253 19.1067 41.0171 21.6111 40.9085 21.3771C40.812 21.172 40.2715 21.2565 40.2715 21.2565C40.2715 21.2565 40.245 19.249 40.2715 18.9137C40.2715 18.904 40.1629 17.9655 40.2715 17.4684C40.4814 16.5033 39.5573 15.958 39.4029 15.5551C39.2461 15.1449 39.7455 14.6962 40.1581 14.134C39.3016 14.66 35.335 16.139 34.2324 16.3006C33.4748 16.4116 30.0269 16.2234 29.3441 15.9532C29.016 15.8229 28.5286 15.5744 28.3259 15.6251C28.3235 15.6251 29.0039 16.0811 28.9484 16.443C28.7819 17.5577 29.0763 21.1841 28.8157 21.7052C28.7819 21.7728 28.2825 21.7511 28.2004 21.7366C27.9061 21.6787 27.7372 20.4217 27.6141 20.1273C27.2908 19.3504 26.8469 16.7132 26.871 15.7891C26.8831 15.2752 26.8975 14.0109 26.8975 14.0109C26.8975 14.0109 26.4391 14.134 26.4801 13.5525C26.5308 12.8673 28.3573 12.8962 28.3573 12.8962C28.3573 12.8962 26.2027 12.2496 27.9374 10.9877C28.6299 10.4835 30.7001 10.3315 30.7001 10.2953C30.7001 10.2808 29.4261 10.5631 29.4165 10.1095C29.402 9.40977 32.5386 8.52911 34.0249 8.41089C32.418 9.76686 31.1102 11.2 32.9126 13.6032C35.3398 16.8387 37.0264 13.1254 39.2871 13.1254C39.3064 13.1254 39.333 13.111 39.3474 13.1254C40.3898 14.1678 41.4055 15.6347 42.028 16.8797C42.0908 16.9907 42.1704 17.0751 42.3465 17.2127Z"
                                        fill="#AF7C59" />
                                    <path
                                        d="M28.3189 22.0263C28.1283 22.0263 27.9643 21.9973 27.9618 21.9949C27.6168 21.925 27.4793 21.4448 27.2959 20.6631C27.2549 20.4821 27.2091 20.2963 27.1801 20.2264C26.8471 19.4302 26.3911 16.7713 26.4153 15.7796C26.4249 15.4129 26.4346 14.6577 26.4394 14.262C26.3718 14.2427 26.3019 14.2113 26.2367 14.1583C26.0751 14.0256 26.0051 13.8156 26.0268 13.5333C26.0654 13.017 26.6638 12.795 27.2284 12.6985C27.0305 12.5345 26.8665 12.3245 26.8206 12.0591C26.7482 11.6297 27.0088 11.1978 27.5927 10.7707C27.9112 10.5391 28.4565 10.3799 28.9945 10.2689C28.9752 10.2206 28.9656 10.1675 28.9656 10.1145C28.9414 8.99252 33.019 8.16252 34.0444 8.13357C37.3017 8.03465 40.1512 10.0783 40.7375 12.8988C40.7978 12.9133 40.8822 12.9277 40.9522 12.9398C41.401 13.0194 42.0814 13.1377 42.4119 13.5792C43.2323 14.6746 42.7135 16.4624 42.3709 17.6447C42.3347 17.7702 42.2985 17.8908 42.2696 18.0018C41.927 19.2323 41.1283 21.2446 41.0945 21.329C41.0608 21.4134 40.9884 21.4738 40.8991 21.4907L40.1512 21.6378C40.0739 21.6547 39.9919 21.633 39.9316 21.5823C39.8713 21.5317 39.8351 21.4569 39.8351 21.3773C39.8351 21.3773 39.8737 17.2225 39.8737 17.1815C39.8689 16.6434 39.5986 16.3852 39.3381 16.1367C39.1812 15.9871 39.034 15.8448 38.9592 15.6542C38.8651 15.4081 38.9182 15.174 39.0413 14.94C37.8301 15.5335 36.0277 16.2405 34.0806 16.5662C32.645 16.8075 29.8149 16.5059 29.05 16.2019C29.0259 16.1922 29.0018 16.1826 28.9752 16.1705C29.0138 16.2718 29.0307 16.378 29.0138 16.4842C28.9414 16.9691 28.9607 17.9994 28.98 18.9959C29.009 20.5376 29.0186 21.5003 28.857 21.826C28.7846 21.9877 28.5361 22.0263 28.3189 22.0263ZM28.1018 21.481C28.179 21.4882 28.3214 21.4907 28.4203 21.4858C28.4975 21.0901 28.4758 19.8982 28.4565 19.0031C28.4348 17.9391 28.4154 16.9329 28.4951 16.4021C28.5047 16.3418 28.36 16.1102 27.9884 15.8448C27.9015 15.782 27.8533 15.6686 27.8774 15.5649C27.8991 15.4684 27.9739 15.3912 28.0704 15.3671C28.2996 15.3091 28.5964 15.4274 29.0259 15.6107C29.1055 15.6445 29.1827 15.6783 29.2503 15.7048C29.8728 15.9534 32.5751 16.2767 33.9962 16.0378C36.5658 15.6059 38.87 14.496 39.8254 13.9073C39.934 13.8398 40.0739 13.8591 40.1584 13.9532C40.2453 14.0473 40.2525 14.1872 40.1753 14.291C40.0836 14.4164 39.9871 14.5346 39.8954 14.6505C39.6348 14.9738 39.3863 15.2802 39.4539 15.4587C39.4852 15.5384 39.5914 15.6397 39.7024 15.7483C39.9943 16.0281 40.3948 16.4118 40.4021 17.1766C40.4021 17.1887 40.378 19.6763 40.3659 21.0515L40.653 20.996C40.8388 20.5183 41.4709 18.8825 41.7556 17.857C41.787 17.7436 41.8232 17.6206 41.8594 17.4927C42.1731 16.4118 42.646 14.7783 41.9849 13.8928C41.7798 13.6178 41.2248 13.5213 40.8581 13.4561C40.5107 13.3958 40.2814 13.3548 40.238 13.1184C39.7603 10.4884 37.1062 8.57269 34.0565 8.65955C32.4979 8.7054 29.7256 9.63431 29.5036 10.0686C29.5808 10.0952 29.798 10.1313 30.3891 10.0372C30.4953 10.0204 30.5869 10.0059 30.6835 10.0903C30.7438 10.1434 30.7751 10.2182 30.7751 10.2978C30.7679 10.5319 30.5966 10.556 30.254 10.6018C29.7425 10.6694 28.3793 10.8503 27.9015 11.1978C27.5034 11.4873 27.3032 11.76 27.3394 11.9675C27.3973 12.3101 28.0246 12.5731 28.2417 12.6382C28.3672 12.6768 28.4468 12.8023 28.4275 12.9326C28.4082 13.0629 28.2972 13.157 28.1669 13.157C28.1645 13.157 28.1645 13.157 28.1621 13.157C27.419 13.1473 26.5721 13.3186 26.5528 13.5671C26.5431 13.7071 26.5721 13.7457 26.5745 13.7457C26.5866 13.7529 26.6324 13.7505 26.6372 13.7481C26.7169 13.7264 26.8037 13.7433 26.8689 13.7963C26.934 13.847 26.9726 13.9266 26.9702 14.0087C26.9702 14.0207 26.9557 15.2802 26.9412 15.7893C26.9195 16.6917 27.3659 19.2999 27.6651 20.0189C27.7109 20.1299 27.7544 20.3108 27.8074 20.5376C27.875 20.8078 27.998 21.3387 28.1018 21.481Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.9282 21.5871L28.6566 21.0442L28.4009 22.2988L29.7665 22.4677L29.9282 21.5871Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M38.7417 21.2082L40.0156 20.6653L40.2714 21.9199L38.9034 22.0888L38.7417 21.2082Z"
                                        fill="#142133" />
                                    <path
                                        d="M30.9027 15.3188C29.3031 15.3188 27.4525 14.9834 26.6394 14.344C26.5235 14.2547 26.5042 14.0858 26.5935 13.9724C26.6828 13.8566 26.8517 13.8373 26.9651 13.9266C28.0532 14.7831 31.5735 15.0341 32.8836 14.525C33.0211 14.4719 33.1731 14.5394 33.2262 14.677C33.2793 14.8145 33.2117 14.9665 33.0742 15.0196C32.5579 15.2198 31.7665 15.3188 30.9027 15.3188ZM40.0013 14.3995C39.9048 14.3995 39.8131 14.3464 39.7648 14.2572C39.6249 13.9869 38.8552 13.5647 37.106 13.1859C35.75 12.8915 34.4254 12.7588 33.9718 12.8071C33.8246 12.8191 33.6967 12.7154 33.6798 12.5706C33.6653 12.4259 33.7715 12.2956 33.9163 12.2787C34.8645 12.1798 39.6176 12.8216 40.2329 14.0135C40.3005 14.1437 40.2498 14.303 40.1195 14.3705C40.0833 14.3899 40.0423 14.3995 40.0013 14.3995ZM29.7494 10.6911C29.6215 10.6911 29.5081 10.597 29.4888 10.4667C29.4671 10.3219 29.5661 10.1868 29.7108 10.1651C30.6759 10.0179 31.8244 9.88039 33.6726 9.86108C33.8173 9.86832 33.938 9.9769 33.9404 10.1241C33.9428 10.2713 33.8246 10.3895 33.6774 10.3919C31.9619 10.4088 30.881 10.5222 29.788 10.6887C29.776 10.6911 29.7639 10.6911 29.7494 10.6911Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M38.513 24.2749C38.0594 24.2146 37.309 24.2315 36.9399 24.562C36.7107 24.7671 36.6166 25.0422 36.6117 25.3413C36.5973 26.1351 36.9688 26.1737 37.794 26.292C38.747 26.4271 38.6819 25.7901 38.7712 24.9312C38.8049 24.6199 38.7374 24.3497 38.513 24.2749Z"
                                        fill="#E1AB91" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M30.0972 52.3956C28.524 51.2616 26.8954 50.1711 25.4067 48.9285C23.5417 47.3747 22.0458 45.4758 20.4437 43.6662C19.9491 43.1065 19.4086 42.595 18.8657 42.0811L29.3878 42.7783L30.0972 52.3956Z"
                                        fill="#FDBC58" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M18.8677 42.0834C19.4082 42.5949 19.9486 43.1088 20.4457 43.6686C22.0453 45.4782 23.5412 47.3746 25.4087 48.9309C26.8974 50.171 28.5236 51.2616 30.0992 52.398L30.379 56.1885L17.7892 55.8386L16.8965 41.9531L18.8677 42.0834Z"
                                        fill="#F78359" />
                                    <path
                                        d="M30.3841 56.2729C30.3769 56.2729 30.3697 56.2729 30.3624 56.2729L28.4684 56.1233L17.7485 56.1016C17.6085 56.1016 17.4927 55.9931 17.4855 55.8531L16.6289 41.9676C16.6241 41.8904 16.6531 41.818 16.7061 41.7625C16.7592 41.7095 16.834 41.6805 16.9112 41.6853L29.407 42.5105C29.5397 42.5202 29.6434 42.6239 29.6531 42.7542L30.6495 55.9834C30.6544 56.0606 30.6278 56.1354 30.5723 56.1909C30.5217 56.2464 30.4541 56.2729 30.3841 56.2729ZM17.9994 55.5732L28.4805 55.5925C28.4877 55.5925 28.4949 55.5925 28.4998 55.5925L30.097 55.718L29.1416 43.0268L17.1742 42.2354L17.9994 55.5732Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M19.3357 40.5586L16.8916 41.9532L28.3836 42.7035L29.3873 42.7783L32.7387 41.2655L19.3357 40.5586Z"
                                        fill="white" />
                                    <path
                                        d="M29.3873 43.0439C29.3801 43.0439 29.3753 43.0439 29.368 43.0439L28.3643 42.9691L16.8747 42.2187C16.7589 42.2115 16.66 42.127 16.6334 42.0136C16.6069 41.9002 16.6576 41.782 16.7613 41.7241L19.2054 40.3295C19.2489 40.3054 19.302 40.2933 19.3502 40.2957L32.7531 41.0027C32.8762 41.0099 32.9775 41.0992 32.9992 41.2174C33.021 41.338 32.9582 41.4587 32.8472 41.5069L29.4959 43.0221C29.4621 43.0366 29.4259 43.0439 29.3873 43.0439ZM17.7892 41.7458L28.4029 42.4407L29.3415 42.5106L31.6384 41.4731L19.3985 40.8265L17.7892 41.7458Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M32.7385 41.2656L33.5106 54.9195L30.403 55.8991L29.3872 42.7784L32.7385 41.2656Z"
                                        fill="#FDBC58" />
                                    <path
                                        d="M30.4033 56.1645C30.3502 56.1645 30.2995 56.15 30.2561 56.1187C30.1885 56.0728 30.1475 56.0004 30.1403 55.9184L29.1245 42.7978C29.1149 42.6868 29.1776 42.5806 29.2789 42.5348L32.6303 41.0196C32.7099 40.9834 32.8016 40.9882 32.8764 41.034C32.9512 41.0799 32.9994 41.1595 33.0042 41.2464L33.7763 54.9002C33.7836 55.0209 33.7064 55.1318 33.5905 55.168L30.4853 56.1476C30.4588 56.1597 30.4322 56.1645 30.4033 56.1645ZM29.6674 42.9449L30.6421 55.5468L33.2335 54.7289L32.4952 41.6662L29.6674 42.9449Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M38.6575 52.1762C38.6575 52.1762 37.5886 50.0795 34.5123 50.1543C31.3371 50.2291 30.4975 51.3269 31.3637 51.4813C31.9138 51.5778 32.5942 51.8384 33.1684 52.0893C33.3349 52.1569 33.4362 52.3258 33.4145 52.5043C33.3928 52.6829 33.2529 52.8228 33.0767 52.847C32.2467 52.9386 31.0476 53.0231 29.583 52.9965C29.0908 52.9869 27.981 53.9689 28.3187 54.6614C28.7144 55.4745 29.8581 56.0608 30.1911 56.0125C30.8111 55.9208 38.3269 55.9715 38.4427 55.9836C38.5561 55.9908 38.6575 52.1762 38.6575 52.1762Z"
                                        fill="#FDD3BE" />
                                    <path
                                        d="M30.1527 56.2754C29.6147 56.2754 28.4855 55.6023 28.0802 54.7723C27.9233 54.4514 27.974 54.0629 28.2225 53.6721C28.5169 53.2088 29.1345 52.7263 29.5881 52.7263C31.0961 52.7528 32.3025 52.6611 33.048 52.5791C33.0987 52.5718 33.1446 52.526 33.1518 52.4681C33.159 52.4102 33.1252 52.3547 33.0722 52.333C32.358 52.0217 31.7548 51.8167 31.3205 51.7394C30.8983 51.6646 30.7656 51.4065 30.7825 51.1917C30.8259 50.6054 32.013 49.9468 34.5078 49.8864C37.7119 49.8165 38.8483 51.9614 38.8942 52.0555C38.9135 52.0941 38.9231 52.1376 38.9231 52.1834C38.8218 56.0004 38.7253 56.0873 38.624 56.1765C38.5685 56.2248 38.4913 56.2513 38.4189 56.2441C38.0208 56.2248 30.7776 56.191 30.2323 56.2706C30.2058 56.2755 30.1793 56.2754 30.1527 56.2754ZM29.5761 53.2595C29.3927 53.2595 28.9246 53.5587 28.6689 53.9592C28.5651 54.1208 28.4638 54.3525 28.5555 54.5407C28.9126 55.2717 29.9573 55.7688 30.1527 55.7446C30.7704 55.6554 36.9374 55.6988 38.2307 55.7109C38.291 55.1583 38.3561 53.4622 38.3899 52.2389C38.1993 51.9156 37.1425 50.3497 34.5198 50.4148C32.4014 50.4655 31.4822 50.9722 31.3302 51.1942C31.3495 51.2014 31.376 51.2086 31.4122 51.2159C31.8972 51.3027 32.5245 51.5126 33.2773 51.8408C33.5475 51.9494 33.7164 52.2341 33.6802 52.5308C33.644 52.8276 33.41 53.0641 33.1132 53.1051C32.3459 53.1895 31.1154 53.2836 29.5785 53.2571C29.5785 53.2595 29.5761 53.2595 29.5761 53.2595ZM38.4285 55.7157C38.4526 55.7157 38.4671 55.7157 38.4671 55.7157C38.4526 55.7157 38.4406 55.7157 38.4285 55.7157Z"
                                        fill="#142133" />
                                    <path
                                        d="M39.1325 50.8105L39.0674 50.2845L44.1438 49.6596C44.7688 49.5824 45.261 49.0733 45.314 48.446L45.6977 44.0089C45.7097 43.8641 45.8376 43.7532 45.9848 43.7676C46.1296 43.7797 46.2381 43.9076 46.2261 44.0547L45.8449 48.4918C45.7701 49.3677 45.0824 50.0794 44.2114 50.1856L39.1325 50.8105Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M39.1016 50.6851H37.3789V56.0076H39.1016V50.6851Z" fill="white" />
                                    <path
                                        d="M39.1014 56.273H37.3787C37.2315 56.273 37.1133 56.1548 37.1133 56.0076V50.6826C37.1133 50.5355 37.2315 50.4172 37.3787 50.4172H39.1014C39.2486 50.4172 39.3668 50.5355 39.3668 50.6826V56.0076C39.3668 56.1548 39.2486 56.273 39.1014 56.273ZM37.6441 55.7446H38.836V50.9505H37.6441V55.7446Z"
                                        fill="#142133" />
                                    <path
                                        d="M31.501 54.9701C29.8821 54.9701 28.3138 54.6685 28.2052 54.6468C28.0604 54.6178 27.9687 54.4803 27.9953 54.3356C28.0242 54.1932 28.1618 54.0967 28.3065 54.1256C28.35 54.1353 32.7291 54.9773 34.2058 53.8747C34.324 53.7879 34.4905 53.812 34.5773 53.9278C34.6642 54.046 34.6401 54.2101 34.5242 54.2994C33.8294 54.8157 32.6519 54.9701 31.501 54.9701Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M64.6187 54.8518H2.91455V60.102H64.6187V54.8518Z" fill="#FDBC58" />
                                    <path
                                        d="M64.619 60.365H2.91482C2.76764 60.365 2.64941 60.2468 2.64941 60.0996V54.8494C2.64941 54.7022 2.76764 54.584 2.91482 54.584H64.619C64.7661 54.584 64.8844 54.7022 64.8844 54.8494V60.102C64.8844 60.2468 64.7661 60.365 64.619 60.365ZM3.18022 59.8366H64.356V55.1172H3.18022V59.8366Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M59.0211 60.1021H8.51465V64.6212H59.0211V60.1021Z" fill="#F78359" />
                                    <path
                                        d="M59.0214 64.8842H8.51492C8.36774 64.8842 8.24951 64.766 8.24951 64.6188V60.1021C8.24951 59.9549 8.36774 59.8367 8.51492 59.8367H59.0214C59.1686 59.8367 59.2868 59.9549 59.2868 60.1021V64.6212C59.2868 64.766 59.1686 64.8842 59.0214 64.8842ZM8.77791 64.3558H58.756V60.3675H8.77791V64.3558Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M13.6225 25.8167C15.1691 25.8167 16.4261 27.0689 16.4261 28.6106C16.4261 30.1524 15.1691 31.4046 13.6225 31.4046C12.0759 31.4046 10.8188 30.1524 10.8188 28.6106C10.8188 27.0689 12.0735 25.8167 13.6225 25.8167Z"
                                        fill="#77B2F3" />
                                    <path
                                        d="M13.6228 31.6725C11.9314 31.6725 10.5537 30.2996 10.5537 28.6131C10.5537 26.9266 11.9314 25.5537 13.6228 25.5537C15.3141 25.5537 16.6918 26.9266 16.6918 28.6131C16.6894 30.2996 15.3141 31.6725 13.6228 31.6725ZM13.6228 26.0821C12.2233 26.0821 11.0845 27.2161 11.0845 28.6131C11.0845 30.0077 12.2233 31.1441 13.6228 31.1441C15.0222 31.1441 16.161 30.0101 16.161 28.6131C16.161 27.2185 15.0222 26.0821 13.6228 26.0821Z"
                                        fill="#142133" />
                                    <path
                                        d="M13.6222 32.5387C11.4507 32.5387 9.68457 30.7773 9.68457 28.6131C9.68457 27.1461 10.4953 25.8674 11.692 25.1918L11.1998 23.6187C11.1564 23.4787 11.2336 23.3291 11.3735 23.2857C11.5134 23.2399 11.6606 23.3195 11.7065 23.4594L12.1745 24.9602C12.6233 24.7816 13.1107 24.6851 13.6222 24.6851C14.0637 24.6851 14.4908 24.7575 14.8865 24.8926L15.4776 23.4377C15.5331 23.3026 15.6875 23.2374 15.8227 23.2929C15.9578 23.3484 16.0229 23.5028 15.9698 23.638L15.3787 25.0977C16.672 25.7419 17.5623 27.0762 17.5623 28.6131C17.5574 30.7773 15.7913 32.5387 13.6222 32.5387ZM13.6222 25.2159C11.7427 25.2159 10.2154 26.7384 10.2154 28.6131C10.2154 30.4854 11.7451 32.0103 13.6222 32.0103C15.5018 32.0103 17.029 30.4878 17.029 28.6131C17.029 26.7408 15.4993 25.2159 13.6222 25.2159Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.3994 26.1206L11.5718 26.678L14.6046 31.1778L15.4298 30.6204L12.3994 26.1206Z"
                                        fill="#FDBC58" />
                                    <path
                                        d="M14.6047 31.4433C14.5878 31.4433 14.5709 31.4409 14.554 31.4384C14.484 31.424 14.4237 31.3854 14.3851 31.3275L11.3547 26.8276C11.2726 26.707 11.304 26.5405 11.4271 26.4609L12.2546 25.9036C12.3125 25.865 12.3849 25.8505 12.4525 25.8625C12.5225 25.877 12.5828 25.9156 12.6214 25.9735L15.6494 30.4733C15.7314 30.594 15.7001 30.7605 15.577 30.8401L14.7494 31.3974C14.7084 31.4264 14.6578 31.4433 14.6047 31.4433ZM11.941 26.7504L14.6771 30.8111L15.0631 30.5505L12.327 26.4899L11.941 26.7504Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M8.08496 36.8019L8.88117 35.2119L9.67739 36.8019C9.27687 36.4038 8.48066 36.4038 8.08496 36.8019Z"
                                        fill="#142133" />
                                    <path
                                        d="M8.87917 46.2334C8.732 46.2334 8.61377 46.1152 8.61377 45.968V36.4834C8.61377 36.3362 8.732 36.218 8.87917 36.218C9.02635 36.218 9.14458 36.3362 9.14458 36.4834V45.968C9.14458 46.1152 9.02635 46.2334 8.87917 46.2334Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M55.0737 42.6891L55.8699 41.0991L56.6662 42.6891C56.2656 42.291 55.4718 42.291 55.0737 42.6891Z"
                                        fill="#142133" />
                                    <path
                                        d="M55.8699 47.6015C55.7227 47.6015 55.6045 47.4833 55.6045 47.3361V42.3706C55.6045 42.2235 55.7227 42.1052 55.8699 42.1052C56.0171 42.1052 56.1353 42.2235 56.1353 42.3706V47.3361C56.1329 47.4809 56.0147 47.6015 55.8699 47.6015Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M55.0112 25.6116C55.0112 23.6693 53.4357 22.0938 51.4934 22.0938C49.5511 22.0938 47.9756 23.6693 47.9756 25.6116H55.0112Z"
                                        fill="#FDBC58" />
                                    <path
                                        d="M55.011 25.877H47.9754C47.8282 25.877 47.71 25.7588 47.71 25.6116C47.71 23.527 49.4061 21.8284 51.4932 21.8284C53.5802 21.8284 55.2764 23.5245 55.2764 25.6116C55.2764 25.7564 55.1582 25.877 55.011 25.877ZM48.2528 25.3462H54.7359C54.6008 23.6765 53.199 22.3592 51.4932 22.3592C49.7898 22.3592 48.3879 23.6765 48.2528 25.3462Z"
                                        fill="#142133" />
                                    <path
                                        d="M49.9735 28.2416C49.9711 28.2416 49.9687 28.2416 49.9687 28.2416L46.6029 28.1716C46.4557 28.1692 46.3399 28.0485 46.3423 27.9014C46.3447 27.7542 46.4605 27.6359 46.6125 27.6408L49.9783 27.7107C50.1255 27.7132 50.2413 27.8338 50.2389 27.981C50.2341 28.1257 50.1159 28.2416 49.9735 28.2416ZM63.7625 25.877H47.9782C47.831 25.877 47.7128 25.7588 47.7128 25.6116C47.7128 25.4645 47.831 25.3462 47.9782 25.3462H63.7625C63.9097 25.3462 64.0279 25.4645 64.0279 25.6116C64.0279 25.7564 63.9073 25.877 63.7625 25.877ZM20.6608 16.7447C20.6584 16.7447 20.656 16.7447 20.656 16.7447L17.2877 16.6723C17.1406 16.6699 17.0247 16.5493 17.0272 16.4021C17.0296 16.2549 17.1478 16.1463 17.2974 16.1415L20.6632 16.2115C20.8104 16.2139 20.9262 16.3345 20.9238 16.4817C20.9238 16.6289 20.8056 16.7447 20.6608 16.7447ZM18.9767 13.8663C18.9743 13.8663 18.9719 13.8663 18.9719 13.8663L7.1903 13.6178C7.04312 13.6153 6.92731 13.4947 6.92972 13.3475C6.93214 13.2004 7.0576 13.0845 7.19995 13.087L18.9815 13.3331C19.1287 13.3355 19.2445 13.4561 19.2421 13.6033C19.2397 13.7505 19.1214 13.8663 18.9767 13.8663Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M63.8229 35.2119C63.8229 34.7558 63.4514 34.3843 62.9953 34.3843H52.3237C51.8677 34.3843 51.4961 34.7558 51.4961 35.2119C51.4961 35.6679 51.8677 36.0394 52.3237 36.0394H62.9953C63.4514 36.0394 63.8229 35.6679 63.8229 35.2119Z"
                                        fill="#FDBC58" />
                                    <path
                                        d="M62.9951 36.3049H52.3235C51.7203 36.3049 51.2305 35.8151 51.2305 35.2119C51.2305 34.6087 51.7203 34.1189 52.3235 34.1189H62.9951C63.5983 34.1189 64.0881 34.6087 64.0881 35.2119C64.0881 35.8127 63.5959 36.3049 62.9951 36.3049ZM52.3235 34.6473C52.0122 34.6473 51.7613 34.9006 51.7613 35.2095C51.7613 35.5207 52.0146 35.7716 52.3235 35.7716H62.9951C63.3064 35.7716 63.5573 35.5183 63.5573 35.2095C63.5573 34.8982 63.304 34.6473 62.9951 34.6473H52.3235Z"
                                        fill="#142133" />
                                    <path
                                        d="M51.4932 31.5951C51.223 31.5951 51.0059 31.378 51.0059 31.1077C51.0059 30.8375 51.223 30.6179 51.4932 30.6179L62.1046 30.5986C62.3748 30.5986 62.592 30.8158 62.592 31.086C62.592 31.3562 62.3748 31.5758 62.1046 31.5758L51.4932 31.5951Z"
                                        fill="#142133" />
                                    <path
                                        d="M46.8609 14.6311C45.1431 14.6311 43.7437 13.2341 43.7437 11.5138C43.7437 9.79589 45.1406 8.39648 46.8609 8.39648C48.5788 8.39648 49.9782 9.79348 49.9782 11.5138C49.9782 13.2341 48.5788 14.6311 46.8609 14.6311ZM46.8609 8.92971C45.435 8.92971 44.2745 10.0902 44.2745 11.5162C44.2745 12.9421 45.435 14.1027 46.8609 14.1027C48.2869 14.1027 49.4474 12.9421 49.4474 11.5162C49.4474 10.0902 48.2869 8.92971 46.8609 8.92971Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M48.1323 10.2131C48.2963 10.2131 48.429 10.3458 48.429 10.5099C48.429 10.674 48.2963 10.8067 48.1323 10.8067C47.9682 10.8067 47.8355 10.674 47.8355 10.5099C47.8331 10.3458 47.9658 10.2131 48.1323 10.2131Z"
                                        fill="#142133" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M48.1323 12.3704C48.2963 12.3704 48.429 12.5031 48.429 12.6671C48.429 12.8312 48.2963 12.9639 48.1323 12.9639C47.9682 12.9639 47.8355 12.8312 47.8355 12.6671C47.8331 12.5031 47.9658 12.3704 48.1323 12.3704Z"
                                        fill="#142133" />
                                    <path
                                        d="M46.8606 14.6311C46.7134 14.6311 46.5952 14.5129 46.5952 14.3657V8.66433C46.5952 8.51715 46.7134 8.39893 46.8606 8.39893C47.0078 8.39893 47.126 8.51715 47.126 8.66433V11.2508H49.7125C49.8597 11.2508 49.9779 11.369 49.9779 11.5162C49.9779 11.6634 49.8597 11.7816 49.7125 11.7816H47.126V14.3681C47.126 14.5129 47.0078 14.6311 46.8606 14.6311Z"
                                        fill="#142133" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_560_2">
                                        <rect width="65" height="65" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg> --}}
                                <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                            </td>
                            <td style="width: 80%; vertical-align: top; text-align: center;">
                                <table style="text-align: center; width: 100%">
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 16px; margin:0">
                                                @if (!empty($schoolData['title']))
                                                {{ __($schoolData['title']) }}
                                                @endif
                                            </h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small style="font-size: 11px;">
                                                @if (!empty($schoolData['academic_year']))
                                                {{ __($schoolData['academic_year']) }}
                                                @endif
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small style="font-size: 11px;">
                                                @if (!empty($schoolData['street_address']))
                                                {{ __($schoolData['street_address']) }}
                                                @endif
                                                {{ __(!empty($schoolData['phone']) ? ', '.$schoolData['phone'] : '') }}
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><small style="font-size: 11px;">{{ __(!empty($schoolData['mail']) ? $schoolData['mail'] : '') }}</small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 10px; padding-right: 10px; padding-top: 3px; padding-bottom: 3px; background-color:#DDDDDD;">
                                            <small style="font-size: 11px;">{{ __('Fee Receipt (School Copy)') }}</small>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 10%; vertical-align: top; text-align: right;">
                                {{-- <svg width="65" height="65" viewBox="0 0 65 65" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_572_15)">
                                    <rect width="65" height="65" fill="#E00000" />
                                    <rect width="65" height="65" fill="black" fill-opacity="0.2" />
                                    <path d="M65 0H0V65H65V0Z" fill="white" />
                                    <path
                                        d="M2.8262 62.1746H5.65226V59.3478H2.8262V62.1739M5.65226 62.1739H8.47831V59.3471H5.65226V62.1732M8.47846 62.1732H11.3045V59.3464H8.47846V62.1724M11.3045 62.1724H14.1306V59.3457H11.3045V62.1717M14.1306 62.1717H16.9566V59.3449H14.1307V62.171M16.9568 62.171H19.7828V59.3442H16.9568V62.1703M19.783 62.1703H22.609V59.3435H19.783V62.1696M25.4351 62.1696H28.2611V59.3428H25.4351V62.1688M33.9132 62.1688H36.7393V59.3421H33.9132V62.1681M36.7394 62.1681H39.5655V59.3413H36.7394V62.1674M39.5655 62.1674H42.3916V59.3406H39.5655V62.1667M42.3917 62.1667H45.2176V59.3399H42.3917V62.1659M45.2176 62.1659H48.0437V59.3392H45.2176V62.1652M56.5221 62.1652H59.348V59.3384H56.5221V62.1645M2.81768 59.3377H5.64373V56.5109H2.81768V59.3369M19.774 59.3369H22.6001V56.5109H19.774V59.3369ZM25.4261 59.3369H28.2522V56.5109H25.4261V59.3369ZM36.7305 59.3369H39.5565V56.5109H36.7305V59.3369ZM39.5565 59.3369H42.3826V56.5109H39.5565V59.3369ZM48.0347 59.3369H50.8608V56.5109H48.0347V59.3369ZM50.8609 59.3369H53.687V56.5109H50.8609V59.3369ZM53.687 59.3369H56.513V56.5109H53.687V59.3369ZM2.81363 56.5115H5.63969V53.6862H2.81363V56.5123M8.46589 56.5123H11.2919V53.6869H8.46589V56.513M11.2919 56.513H14.118V53.6876H11.2919V56.5137M14.118 56.5137H16.9441V53.6884H14.1181V56.5144M19.7704 56.5144H22.5965V53.6891H19.7704V56.5151M25.4225 56.5151H28.2486V53.6898H25.4225V56.5159M33.9007 56.5159H36.7267V53.6905H33.9007V56.5166M36.7269 56.5166H39.5529V53.6913H36.7269V56.5173M39.5529 56.5173H42.379V53.692H39.5529V56.518M42.3791 56.518H45.205V53.6927H42.3791V56.5187M2.81002 53.6934H5.63608V50.8666H2.81002V53.6927M8.46228 53.6927H11.2883V50.8659H8.46228V53.692M11.2883 53.692H14.1144V50.8652H11.2883V53.6913M14.1144 53.6913H16.9404V50.8645H14.1145V53.6905M19.7668 53.6905H22.5928V50.8645H19.7668V53.6905ZM25.4189 53.6905H28.245V50.8645H25.4189V53.6905ZM28.245 53.6905H31.071V50.8645H28.245V53.6905ZM33.8971 53.6905H36.7231V50.8645H33.8971V53.6905ZM45.2014 53.6905H48.0275V50.8645H45.2014V53.6905ZM48.0275 53.6905H50.8535V50.8645H48.0275V53.6905ZM50.8535 53.6905H53.6797V50.8645H50.8535V53.6905ZM2.80569 50.8637H5.63175V48.0384H2.80569V50.8645M8.45795 50.8645H11.284V48.0377H8.45795V50.8637M11.284 50.8637H14.1101V48.037H11.284V50.863M14.1101 50.863H16.9361V48.0362H14.1102V50.8623M19.7625 50.8623H22.5885V48.0362H19.7625V50.8623ZM25.4146 50.8623H28.2406V48.0362H25.4146V50.8623ZM28.2406 50.8623H31.0667V48.0362H28.2406V50.8623ZM31.0667 50.8623H33.8927V48.0362H31.0667V50.8623ZM36.7189 50.8623H39.545V48.0362H36.7189V50.8623ZM42.3712 50.8623H45.1971V48.0362H42.3712V50.8623ZM48.0232 50.8623H50.8492V48.0362H48.0232V50.8623ZM56.5016 50.8623H59.3275V48.0362H56.5016V50.8623ZM59.3275 50.8623H62.1536V48.0362H59.3275V50.8623ZM2.80352 48.0355H5.62958V45.2088H2.80352V48.0348M19.7599 48.0348H22.5859V45.2088H19.7599V48.0348ZM31.0641 48.0348H33.8901V45.2088H31.0641V48.0348ZM39.5424 48.0348H42.3684V45.2088H39.5424V48.0348ZM48.0206 48.0348H50.8466V45.2088H48.0206V48.0348ZM53.6728 48.0348H56.4989V45.2088H53.6728V48.0348ZM56.499 48.0348H59.3249V45.2088H56.499V48.0348ZM59.3249 48.0348H62.151V45.2088H59.3249V48.0348ZM2.79803 45.2095H5.62409V42.3841H2.79803V45.2101M5.62409 45.2101H8.45015V42.3847H5.62409V45.2106M8.45029 45.2106H11.2763V42.3853H8.45029V45.2112M11.2763 45.2112H14.1024V42.3859H11.2763V45.2118M14.1024 45.2118H16.9285V42.3865H14.1025V45.2124M16.9286 45.2124H19.7547V42.3865H16.9285L16.9286 45.2124ZM19.7548 45.2124H22.5809V42.3865H19.7548V45.2124ZM25.4069 45.2124H28.233V42.3865H25.4069V45.2124ZM28.233 45.2124H31.059V42.3865H28.233V45.2124ZM36.7113 45.2124H39.5373V42.3865H36.7113V45.2124ZM39.5373 45.2124H42.3634V42.3865H39.5373V45.2124ZM50.8417 45.2124H53.6678V42.3865H50.8417V45.2124ZM56.494 45.2124H59.3199V42.3865H56.494V45.2124ZM25.4037 42.387H28.2298V39.561H25.4037V42.387ZM28.2298 42.387H31.0558V39.561H28.2298V42.387ZM31.0558 42.387H33.8819V39.561H31.0558V42.387ZM45.1863 42.387H48.0123V39.561H45.1863V42.387ZM48.0123 42.387H50.8384V39.561H48.0123V42.387ZM50.8385 42.387H53.6646V39.561H50.8385V42.387ZM53.6646 42.387H56.4906V39.561H53.6646V42.387ZM56.4906 42.387H59.3167V39.561H56.4906V42.387ZM59.3167 42.387H62.1427V39.561H59.3167V42.387ZM5.61658 39.5603H8.44263V36.7349H5.61658V39.561M11.2688 39.561H14.0949V36.7342H11.2688V39.5603M14.0949 39.5603H16.9209V36.7335H14.095V39.5595M19.7473 39.5595H22.5733V36.7335H19.7473V39.5595ZM22.5732 39.5595H25.3993V36.7335H22.5732V39.5595ZM25.3994 39.5595H28.2255V36.7335H25.3994V39.5595ZM31.0515 39.5595H33.8776V36.7335H31.0515V39.5595ZM33.8776 39.5595H36.7036V36.7335H33.8776V39.5595ZM42.356 39.5595H45.1819V36.7335H42.356V39.5595ZM48.008 39.5595H50.834V36.7335H48.008V39.5595ZM50.8342 39.5595H53.6602V36.7335H50.8342V39.5595ZM56.4864 39.5595H59.3124V36.7335H56.4864V39.5595ZM5.61022 36.7328H8.43628V33.906H5.61022V36.732M11.2625 36.732H14.0885V33.9067H11.2625V36.7328M14.0885 36.7328H16.9146V33.9074H14.0887V36.7335M16.9147 36.7335H19.7408V33.9074H16.9147V36.7335ZM28.2191 36.7335H31.0452V33.9074H28.2191V36.7335ZM39.5235 36.7335H42.3495V33.9074H39.5235V36.7335ZM45.1756 36.7335H48.0016V33.9074H45.1756V36.7335ZM48.0016 36.7335H50.8277V33.9074H48.0016V36.7335ZM50.8278 36.7335H53.6539V33.9074H50.8278V36.7335ZM53.6539 36.7335H56.4799V33.9074H53.6539V36.7335ZM56.4801 36.7335H59.306V33.9074H56.4801V36.7335ZM59.306 36.7335H62.1321V33.9074H59.306V36.7335ZM8.43267 33.9081H11.2587V31.0828H8.43267V33.9089M14.0848 33.9089H16.9108V31.0835H14.0849V33.9096M16.911 33.9096H19.737V31.0835H16.911V33.9096ZM19.7372 33.9096H22.5632V31.0835H19.7372V33.9096ZM22.5632 33.9096H25.3891V31.0835H22.5632V33.9096ZM25.3891 33.9096H28.2153V31.0835H25.3891V33.9096ZM28.2153 33.9096H31.0414V31.0835H28.2153V33.9096ZM31.0414 33.9096H33.8675V31.0835H31.0414V33.9096ZM33.8675 33.9096H36.6935V31.0835H33.8675V33.9096ZM36.6935 33.9096H39.5197V31.0835H36.6935V33.9096ZM50.8241 33.9096H53.6501V31.0835H50.8241V33.9096ZM56.4763 33.9096H59.3022V31.0835H56.4763V33.9096ZM5.60011 31.0843H8.42617V28.2575H5.60011V31.0835M8.42631 31.0835H11.2524V28.2568H8.42631V31.0828M14.0784 31.0828H16.9045V28.256H14.0786V31.0821M16.9046 31.0821H19.7307V28.256H16.9045L16.9046 31.0821ZM25.3829 31.0821H28.209V28.256H25.3829V31.0821ZM28.209 31.0821H31.035V28.256H28.209V31.0821ZM31.035 31.0821H33.8611V28.256H31.035V31.0821ZM39.5134 31.0821H42.3394V28.256H39.5134V31.0821ZM47.9915 31.0821H50.8176V28.256H47.9915V31.0821ZM50.8177 31.0821H53.6438V28.256H50.8177V31.0821ZM53.6438 31.0821H56.4698V28.256H53.6438V31.0821ZM56.47 31.0821H59.2959V28.256H56.47V31.0821ZM59.2959 31.0821H62.1219V28.256H59.2959V31.0821ZM2.769 28.2553H5.59506V25.43H2.769V28.256M5.59506 28.256H8.42111V25.4293H5.59506V28.2553M8.42126 28.2553H11.2473V25.4285H8.42126V28.2546M11.2473 28.2546H14.0734V25.4278H11.2473V28.2539M14.0734 28.2539H16.8994V25.4271H14.0735V28.2531M19.7258 28.2531H22.5518V25.4271H19.7258V28.2531ZM22.5518 28.2531H25.3777V25.4271H22.5518V28.2531ZM25.3779 28.2531H28.2039V25.4271H25.3779V28.2531ZM36.6822 28.2531H39.5083V25.4271H36.6822V28.2531ZM39.5083 28.2531H42.3344V25.4271H39.5083V28.2531ZM45.1604 28.2531H47.9865V25.4271H45.1604V28.2531ZM50.8127 28.2531H53.6387V25.4271H50.8127V28.2531ZM56.4649 28.2531H59.2908V25.4271H56.4649V28.2531ZM28.2 25.4264H31.0261V22.6003H28.2V25.4264ZM33.8521 25.4264H36.6782V22.6003H33.8521V25.4264ZM2.76192 22.601H5.58798V19.7757H2.76192V22.6018M5.58798 22.6018H8.41403V19.7764H5.58798V22.6025M8.41418 22.6025H11.2402V19.7771H8.41418V22.6032M11.2402 22.6032H14.0663V19.7779H11.2402V22.6039M14.0663 22.6039H16.8923V19.7786H14.0664V22.6046M16.8925 22.6046H19.7185V19.7786H16.8923L16.8925 22.6046ZM19.7187 22.6046H22.5447V19.7786H19.7187V22.6046ZM25.3708 22.6046H28.1969V19.7786H25.3708V22.6046ZM31.0229 22.6046H33.849V19.7786H31.0229V22.6046ZM36.6752 22.6046H39.5012V19.7786H36.6752V22.6046ZM42.3274 22.6046H45.1533V19.7786H42.3274V22.6046ZM45.1533 22.6046H47.9794V19.7786H45.1533V22.6046ZM47.9794 22.6046H50.8054V19.7786H47.9794V22.6046ZM50.8056 22.6046H53.6316V19.7786H50.8056V22.6046ZM53.6316 22.6046H56.4577V19.7786H53.6316V22.6046ZM56.4578 22.6046H59.2838V19.7786H56.4578V22.6046ZM59.2838 22.6046H62.1098V19.7786H59.2838V22.6046ZM2.75109 19.7793H5.57715V16.9525H2.75109V19.7786M19.7074 19.7786H22.5335V16.9525H19.7074V19.7786ZM25.3595 19.7786H28.1856V16.9525H25.3595V19.7786ZM33.8377 19.7786H36.6638V16.9525H33.8377V19.7786ZM36.6639 19.7786H39.49V16.9525H36.6639V19.7786ZM42.3162 19.7786H45.1421V16.9525H42.3162V19.7786ZM59.2725 19.7786H62.0985V16.9525H59.2725V19.7786ZM2.7456 16.9518H5.57166V14.1259H2.7456V16.9518ZM8.39786 16.952H11.2239V14.126H8.39786V16.952ZM11.2239 16.952L14.05 16.9521V14.1262L11.2239 14.126V16.9522M14.05 16.9521L16.876 16.9522V14.1263H14.0501V16.9524M19.7024 16.9524H22.5284V14.1265H19.7024V16.9524ZM28.1805 16.9525H31.0066V14.1266H28.1805V16.9525ZM42.3111 16.9527H45.137V14.1268H42.3111V16.9527ZM47.9631 16.9528H50.7891V14.1269H47.9631V16.9528ZM50.7893 16.953H53.6153V14.1271H50.7893V16.953ZM53.6153 16.953L56.4414 16.9531V14.1272L53.6153 14.1271V16.9533M59.2674 16.9533H62.0935V14.1273H59.2674V16.9533ZM2.74055 14.1275H5.5666V11.3014H2.74055V14.1275ZM8.3928 14.1275H11.2189V11.3014H8.3928V14.1275ZM11.2189 14.1275H14.0449V11.3014H11.2189V14.1275ZM14.0449 14.1275H16.871V11.3014H14.0449V14.1275ZM19.6973 14.1275H22.5234V11.3014H19.6973V14.1275ZM25.3494 14.1275H28.1755V11.3014H25.3494V14.1275ZM28.1755 14.1275H31.0015V11.3014H28.1755V14.1275ZM33.8276 14.1275H36.6536V11.3014H33.8276V14.1275ZM42.306 14.1275H45.132V11.3014H42.306V14.1275ZM47.958 14.1275H50.7841V11.3014H47.958V14.1275ZM50.7842 14.1275H53.6103V11.3014H50.7842V14.1275ZM53.6103 14.1275H56.4363V11.3014H53.6103V14.1275ZM59.2624 14.1275H62.0884V11.3014H59.2559V14.1275M2.73477 11.3014H5.56082V8.47523H2.73477V11.3014ZM8.38702 11.3014H11.2131V8.47523H8.38702V11.3014ZM11.2131 11.3014H14.0391V8.47523H11.2131V11.3014ZM14.0391 11.3014H16.8652V8.47523H14.0393V11.3014M19.6915 11.3014H22.5176V8.47523H19.6915V11.3014ZM30.9958 11.3014H33.8218V8.47523H30.9958V11.3014ZM33.8218 11.3014H36.6479V8.47523H33.8218V11.3014ZM42.3003 11.3014H45.1262V8.47523H42.3003V11.3014ZM47.9522 11.3014H50.7783V8.47523H47.9522V11.3014ZM50.7784 11.3014H53.6045V8.47523H50.7784V11.3014ZM53.6045 11.3014H56.4305V8.47523H53.6045V11.3014ZM59.2566 11.3014H62.0827V8.47523H59.253V11.3014M2.73188 8.47523H5.55793V5.64918H2.73188V8.47523ZM19.6882 8.47523H22.5143V5.64918H19.6882V8.47523ZM25.3403 8.47523H28.1664V5.64918H25.3403V8.47523ZM28.1664 8.47523H30.9924V5.64918H28.1664V8.47523ZM30.9924 8.47523H33.8185V5.64918H30.9924V8.47523ZM36.6447 8.47523H39.4707V5.64918H36.6447V8.47523ZM42.2969 8.47523H45.1229V5.64918H42.2969V8.47523ZM59.2533 8.47523H62.0793V5.64918H59.2526V8.47523M2.73145 5.64918H5.5575V2.82312H2.73145V5.64918ZM5.5575 5.64918H8.38356V2.82312H5.5575V5.64918ZM8.38356 5.64918H11.2098V2.82312H8.38356V5.64918ZM11.2098 5.64918H14.0358V2.82312H11.2098V5.64918ZM14.0358 5.64918H16.8619V2.82312H14.0358V5.64918ZM16.8619 5.64918H19.6881V2.82312H16.8613V5.64918M19.6875 5.64918H22.5135V2.82312H19.6882V5.64918M30.9924 5.64918H33.8185V2.82312H30.9932V5.64918M36.6454 5.64918H39.4715V2.82312H36.6447V5.64918M42.2969 5.64918H45.1229V2.82312H42.2975V5.64918M45.1234 5.64918H47.9495V2.82312H45.1242V5.64918M47.9502 5.64918H50.7763V2.82312H47.9524V5.64918M50.7786 5.64918H53.6046V2.82312H50.7779V5.64918M53.6039 5.64918H56.43V2.82312H53.6046V5.64918M56.4308 5.64918H59.2567V2.82312H56.43V5.64918M59.2559 5.64918H62.0819V2.82312H59.258V5.64918H59.2559Z"
                                        fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_572_15">
                                        <rect width="65" height="65" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p><small>scan your account</small></p> --}}
                            </td>
                        </tr>
                    </thead>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-left: 5px;">
                    <tbody>
                        <tr>
                            <td style="vertical-align: top; width: 50%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:12px">
                                                <strong>{{ __('Receipt No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:11px">
                                                @if (!empty($report['receipt_no']))
                                                {{ __($report['receipt_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:12px">
                                                <strong>{{ __('Student\'s Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:11px">
                                                @if (!empty($report['student']))
                                                {{ __("{$report['student']['first_name']} {$report['student']['middle_name']} {$report['student']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:12px">
                                                <strong>{{ __('Father\'s Name.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:11px">
                                                @if (!empty($report['student']['father']))
                                                {{ __("{$report['student']['father']['first_name']} {$report['student']['father']['middle_name']} {$report['student']['father']['last_name']}") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:12px">
                                                <strong>{{ __('Class.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;  font-size:11px">
                                                @if (!empty($report['student']['classroom']))
                                                {{ __($report['student']['classroom']['title']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:12px"><strong>{{ __('Roll No.') }}</strong></td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                                @if (!empty($report['student']['classroom_roll']))
                                                {{ __($report['student']['classroom_roll']['roll_no'] ?? "") }}
                                                @endif
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                <strong>{{ __('Pay.Type') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px;">
                                                @if (!empty($report['receipt_title']))
                                                {{ __($report['receipt_title']) }}
                                                @endif
                                            </td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding-left: 10px; vertical-align: top; width: 50%;">
                                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;  font-size:12px">
                                                <strong>{{ __('Date.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;  font-size:11px">
                                                @if (!empty($report['receipt_date']))
                                                {{ __($report['receipt_date']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px; font-size:12px">
                                                <strong>{{ __('Admission No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;  font-size:11px">
                                                @if (!empty($report['student']['admission_no']))
                                                {{ __($report['student']['admission_no']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;  font-size:12px">
                                                <strong>{{ __('Mode.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;  font-size:11px">
                                                @if (!empty($report['payment_mode']))
                                                {{ __($report['payment_mode']) }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;  font-size:12px">
                                                <strong>{{ __('Scl Receipt No.') }}</strong>
                                            </td>
                                            <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000;  font-size:11px">
                                                {{ __($report['school_receipt_no'] ?? "") }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 0px; margin-left: 5px;">
                    <tbody>
                        <tr>
                            <td style="vertical-align:top;margin-bottom: 0px; padding-bottom: 3px; font-size:12px"><strong>{{ __('Pay.Type') }}</strong></td>
                            <td style="vertical-align:top;margin-bottom: 0px; padding-bottom: 3px; font-size:11px">
                                @if (!empty($report['receipt_title']))
                                {{ __($report['receipt_title']) }}
                                @endif
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 5px;">
                    <tr style="border: 1px solid #000; border-left: 0!important; border-right: 0!important;">
                        <th style="text-align: right; border-right: 1px solid #000; padding-right: 10px; font-size:13px"><small>{{ __('Particulars') }}</small></th>
                        <th style="min-width:90px;text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:13px"><small>Amount (Rs.)</small></th>
                    </tr>

                    @if (!empty($report) && count($report['payments']) > 0)
                    @foreach ($report['payments'] as $payment)
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; font-size:12px">
                            {{ __($payment['fee_type_title']) }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __($payment['amount'] ?? 0) }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    <tr>
                        <td style="text-align: right; border-top: 1px solid #000; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Total Amount') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_amount']))
                            {{ __($report['total_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Discount') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_discount_amount']))
                            {{ __($report['total_discount_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Payable') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_payable_amount']))
                            {{ __($report['total_payable_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Paid: ') }}
                            {{ __(!empty($report['total_paid_amount_in_word']) ? $report['total_paid_amount_in_word'] : "") }}.
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            @if (!empty($report['total_paid_amount']))
                            {{ __($report['total_paid_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right; border-right: 1px solid #000; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px">
                            {{ __('Due') }}
                        </td>
                        <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #000; font-size:12px; font-weight:bold">
                            @if (!empty($report['total_due_amount']))
                            {{ __($report['total_due_amount']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </td>
                    </tr>
                </table>

                <!-- <div class="total-due">
                    <small style=""><strong>Total Due -
                            @if (!empty($report['student_total_due']))
                            {{ __($report['student_total_due']) }}
                            @else
                            {{ __(0) }}
                            @endif
                        </strong></small>
                </div> -->

                <div style="margin-left:5px;">
                    <p style="font-size:13px; font-weight:bold">{{ __($report['payment_note'] ?? "") }}</p>
                </div>

                <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 30px">
                    <tfoot>
                        <tr>
                            <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right; padding-right: 10px;">
                                <p>
                                    <small style="font-size:12px;">
                                        @if (!empty($report['created_by']))
                                        {{ __("{$report['created_by']['first_name']} {$report['created_by']['middle_name']} {$report['created_by']['last_name']}") }}
                                        @endif
                                    </small>
                                </p>
                                <small><strong>Auth. Signatory</strong></small>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </div>
    </div>
</body>

</html>