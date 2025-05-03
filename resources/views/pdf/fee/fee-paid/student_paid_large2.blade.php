<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student paid Large2</title>
    <style>
        @media print {

            #printButtonWrapper,
            #printButton {
                display: none;
            }

            #wrapper {
                box-shadow: none !important;
                padding: 0px 20px !important;
            }
        }

        #wrapper {
            box-shadow: 0px 0px 20px 4px #bdbcbc;
        }
    </style>
</head>

<body>
    <div id="wrapper" style="max-width:735px; margin: 0 auto; padding: 15px 30px;font-size:10px;">
        <div id="printButtonWrapper" style="width: 48%; padding: 15px 5px; margin-left: 15px;">
            <input id="printButton" type="button" value="Print" onclick="window.print();" style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
        </div>
        <div style="">
            <table style="width: 100%; font-family: 'Inter', sans-serif;">
                <thead>
                    <tr style="width: 100%;">
                        <td style="width: 20%; vertical-align: top; text-align: left;">
                            <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                        </td>
                        <td style="width: 60%; vertical-align: top; text-align: center;">
                            <table style="text-align: center; width: 100%; font-weight:bold; font-size:14px">
                                <tr>
                                    <td>
                                        <h2 style="font-size:24px; margin:0px;">
                                            @if (!empty($schoolData['title']))
                                            {{ __($schoolData['title']) }}
                                            @endif
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            @if (!empty($schoolData['academic_year']))
                                            {{ __("(".$schoolData['academic_year'].")") }}
                                            @endif
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            @if (!empty($schoolData['street_address']))
                                            {{ __($schoolData['street_address']) }}
                                            @endif
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            {{ __(!empty($schoolData['phone']) ? $schoolData['phone'] . ',' : '') }}
                                            <!-- {{ __(!empty($schoolData['phone_2']) ? $schoolData['phone_2'] . ',' : '') }} -->
                                            {{ __(!empty($schoolData['mail']) ? $schoolData['mail'] : '') }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            {{ __('Affiliation No: ') }}
                                            {{ __(!empty($schoolData['affiliation_no']) ? $schoolData['affiliation_no'] : '') }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{ __('Fee Receipt (Student Copy)') }}</span></td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 20%; vertical-align: top; text-align: right;">
                            <!-- do not remove this code -->
                            <!-- <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_572_15)">
                                <rect width="65" height="65" fill="#E00000" />
                                <rect width="65" height="65" fill="black" fill-opacity="0.2" />
                                <path d="M65 0H0V65H65V0Z" fill="white" />
                                <path d="M2.8262 62.1746H5.65226V59.3478H2.8262V62.1739M5.65226 62.1739H8.47831V59.3471H5.65226V62.1732M8.47846 62.1732H11.3045V59.3464H8.47846V62.1724M11.3045 62.1724H14.1306V59.3457H11.3045V62.1717M14.1306 62.1717H16.9566V59.3449H14.1307V62.171M16.9568 62.171H19.7828V59.3442H16.9568V62.1703M19.783 62.1703H22.609V59.3435H19.783V62.1696M25.4351 62.1696H28.2611V59.3428H25.4351V62.1688M33.9132 62.1688H36.7393V59.3421H33.9132V62.1681M36.7394 62.1681H39.5655V59.3413H36.7394V62.1674M39.5655 62.1674H42.3916V59.3406H39.5655V62.1667M42.3917 62.1667H45.2176V59.3399H42.3917V62.1659M45.2176 62.1659H48.0437V59.3392H45.2176V62.1652M56.5221 62.1652H59.348V59.3384H56.5221V62.1645M2.81768 59.3377H5.64373V56.5109H2.81768V59.3369M19.774 59.3369H22.6001V56.5109H19.774V59.3369ZM25.4261 59.3369H28.2522V56.5109H25.4261V59.3369ZM36.7305 59.3369H39.5565V56.5109H36.7305V59.3369ZM39.5565 59.3369H42.3826V56.5109H39.5565V59.3369ZM48.0347 59.3369H50.8608V56.5109H48.0347V59.3369ZM50.8609 59.3369H53.687V56.5109H50.8609V59.3369ZM53.687 59.3369H56.513V56.5109H53.687V59.3369ZM2.81363 56.5115H5.63969V53.6862H2.81363V56.5123M8.46589 56.5123H11.2919V53.6869H8.46589V56.513M11.2919 56.513H14.118V53.6876H11.2919V56.5137M14.118 56.5137H16.9441V53.6884H14.1181V56.5144M19.7704 56.5144H22.5965V53.6891H19.7704V56.5151M25.4225 56.5151H28.2486V53.6898H25.4225V56.5159M33.9007 56.5159H36.7267V53.6905H33.9007V56.5166M36.7269 56.5166H39.5529V53.6913H36.7269V56.5173M39.5529 56.5173H42.379V53.692H39.5529V56.518M42.3791 56.518H45.205V53.6927H42.3791V56.5187M2.81002 53.6934H5.63608V50.8666H2.81002V53.6927M8.46228 53.6927H11.2883V50.8659H8.46228V53.692M11.2883 53.692H14.1144V50.8652H11.2883V53.6913M14.1144 53.6913H16.9404V50.8645H14.1145V53.6905M19.7668 53.6905H22.5928V50.8645H19.7668V53.6905ZM25.4189 53.6905H28.245V50.8645H25.4189V53.6905ZM28.245 53.6905H31.071V50.8645H28.245V53.6905ZM33.8971 53.6905H36.7231V50.8645H33.8971V53.6905ZM45.2014 53.6905H48.0275V50.8645H45.2014V53.6905ZM48.0275 53.6905H50.8535V50.8645H48.0275V53.6905ZM50.8535 53.6905H53.6797V50.8645H50.8535V53.6905ZM2.80569 50.8637H5.63175V48.0384H2.80569V50.8645M8.45795 50.8645H11.284V48.0377H8.45795V50.8637M11.284 50.8637H14.1101V48.037H11.284V50.863M14.1101 50.863H16.9361V48.0362H14.1102V50.8623M19.7625 50.8623H22.5885V48.0362H19.7625V50.8623ZM25.4146 50.8623H28.2406V48.0362H25.4146V50.8623ZM28.2406 50.8623H31.0667V48.0362H28.2406V50.8623ZM31.0667 50.8623H33.8927V48.0362H31.0667V50.8623ZM36.7189 50.8623H39.545V48.0362H36.7189V50.8623ZM42.3712 50.8623H45.1971V48.0362H42.3712V50.8623ZM48.0232 50.8623H50.8492V48.0362H48.0232V50.8623ZM56.5016 50.8623H59.3275V48.0362H56.5016V50.8623ZM59.3275 50.8623H62.1536V48.0362H59.3275V50.8623ZM2.80352 48.0355H5.62958V45.2088H2.80352V48.0348M19.7599 48.0348H22.5859V45.2088H19.7599V48.0348ZM31.0641 48.0348H33.8901V45.2088H31.0641V48.0348ZM39.5424 48.0348H42.3684V45.2088H39.5424V48.0348ZM48.0206 48.0348H50.8466V45.2088H48.0206V48.0348ZM53.6728 48.0348H56.4989V45.2088H53.6728V48.0348ZM56.499 48.0348H59.3249V45.2088H56.499V48.0348ZM59.3249 48.0348H62.151V45.2088H59.3249V48.0348ZM2.79803 45.2095H5.62409V42.3841H2.79803V45.2101M5.62409 45.2101H8.45015V42.3847H5.62409V45.2106M8.45029 45.2106H11.2763V42.3853H8.45029V45.2112M11.2763 45.2112H14.1024V42.3859H11.2763V45.2118M14.1024 45.2118H16.9285V42.3865H14.1025V45.2124M16.9286 45.2124H19.7547V42.3865H16.9285L16.9286 45.2124ZM19.7548 45.2124H22.5809V42.3865H19.7548V45.2124ZM25.4069 45.2124H28.233V42.3865H25.4069V45.2124ZM28.233 45.2124H31.059V42.3865H28.233V45.2124ZM36.7113 45.2124H39.5373V42.3865H36.7113V45.2124ZM39.5373 45.2124H42.3634V42.3865H39.5373V45.2124ZM50.8417 45.2124H53.6678V42.3865H50.8417V45.2124ZM56.494 45.2124H59.3199V42.3865H56.494V45.2124ZM25.4037 42.387H28.2298V39.561H25.4037V42.387ZM28.2298 42.387H31.0558V39.561H28.2298V42.387ZM31.0558 42.387H33.8819V39.561H31.0558V42.387ZM45.1863 42.387H48.0123V39.561H45.1863V42.387ZM48.0123 42.387H50.8384V39.561H48.0123V42.387ZM50.8385 42.387H53.6646V39.561H50.8385V42.387ZM53.6646 42.387H56.4906V39.561H53.6646V42.387ZM56.4906 42.387H59.3167V39.561H56.4906V42.387ZM59.3167 42.387H62.1427V39.561H59.3167V42.387ZM5.61658 39.5603H8.44263V36.7349H5.61658V39.561M11.2688 39.561H14.0949V36.7342H11.2688V39.5603M14.0949 39.5603H16.9209V36.7335H14.095V39.5595M19.7473 39.5595H22.5733V36.7335H19.7473V39.5595ZM22.5732 39.5595H25.3993V36.7335H22.5732V39.5595ZM25.3994 39.5595H28.2255V36.7335H25.3994V39.5595ZM31.0515 39.5595H33.8776V36.7335H31.0515V39.5595ZM33.8776 39.5595H36.7036V36.7335H33.8776V39.5595ZM42.356 39.5595H45.1819V36.7335H42.356V39.5595ZM48.008 39.5595H50.834V36.7335H48.008V39.5595ZM50.8342 39.5595H53.6602V36.7335H50.8342V39.5595ZM56.4864 39.5595H59.3124V36.7335H56.4864V39.5595ZM5.61022 36.7328H8.43628V33.906H5.61022V36.732M11.2625 36.732H14.0885V33.9067H11.2625V36.7328M14.0885 36.7328H16.9146V33.9074H14.0887V36.7335M16.9147 36.7335H19.7408V33.9074H16.9147V36.7335ZM28.2191 36.7335H31.0452V33.9074H28.2191V36.7335ZM39.5235 36.7335H42.3495V33.9074H39.5235V36.7335ZM45.1756 36.7335H48.0016V33.9074H45.1756V36.7335ZM48.0016 36.7335H50.8277V33.9074H48.0016V36.7335ZM50.8278 36.7335H53.6539V33.9074H50.8278V36.7335ZM53.6539 36.7335H56.4799V33.9074H53.6539V36.7335ZM56.4801 36.7335H59.306V33.9074H56.4801V36.7335ZM59.306 36.7335H62.1321V33.9074H59.306V36.7335ZM8.43267 33.9081H11.2587V31.0828H8.43267V33.9089M14.0848 33.9089H16.9108V31.0835H14.0849V33.9096M16.911 33.9096H19.737V31.0835H16.911V33.9096ZM19.7372 33.9096H22.5632V31.0835H19.7372V33.9096ZM22.5632 33.9096H25.3891V31.0835H22.5632V33.9096ZM25.3891 33.9096H28.2153V31.0835H25.3891V33.9096ZM28.2153 33.9096H31.0414V31.0835H28.2153V33.9096ZM31.0414 33.9096H33.8675V31.0835H31.0414V33.9096ZM33.8675 33.9096H36.6935V31.0835H33.8675V33.9096ZM36.6935 33.9096H39.5197V31.0835H36.6935V33.9096ZM50.8241 33.9096H53.6501V31.0835H50.8241V33.9096ZM56.4763 33.9096H59.3022V31.0835H56.4763V33.9096ZM5.60011 31.0843H8.42617V28.2575H5.60011V31.0835M8.42631 31.0835H11.2524V28.2568H8.42631V31.0828M14.0784 31.0828H16.9045V28.256H14.0786V31.0821M16.9046 31.0821H19.7307V28.256H16.9045L16.9046 31.0821ZM25.3829 31.0821H28.209V28.256H25.3829V31.0821ZM28.209 31.0821H31.035V28.256H28.209V31.0821ZM31.035 31.0821H33.8611V28.256H31.035V31.0821ZM39.5134 31.0821H42.3394V28.256H39.5134V31.0821ZM47.9915 31.0821H50.8176V28.256H47.9915V31.0821ZM50.8177 31.0821H53.6438V28.256H50.8177V31.0821ZM53.6438 31.0821H56.4698V28.256H53.6438V31.0821ZM56.47 31.0821H59.2959V28.256H56.47V31.0821ZM59.2959 31.0821H62.1219V28.256H59.2959V31.0821ZM2.769 28.2553H5.59506V25.43H2.769V28.256M5.59506 28.256H8.42111V25.4293H5.59506V28.2553M8.42126 28.2553H11.2473V25.4285H8.42126V28.2546M11.2473 28.2546H14.0734V25.4278H11.2473V28.2539M14.0734 28.2539H16.8994V25.4271H14.0735V28.2531M19.7258 28.2531H22.5518V25.4271H19.7258V28.2531ZM22.5518 28.2531H25.3777V25.4271H22.5518V28.2531ZM25.3779 28.2531H28.2039V25.4271H25.3779V28.2531ZM36.6822 28.2531H39.5083V25.4271H36.6822V28.2531ZM39.5083 28.2531H42.3344V25.4271H39.5083V28.2531ZM45.1604 28.2531H47.9865V25.4271H45.1604V28.2531ZM50.8127 28.2531H53.6387V25.4271H50.8127V28.2531ZM56.4649 28.2531H59.2908V25.4271H56.4649V28.2531ZM28.2 25.4264H31.0261V22.6003H28.2V25.4264ZM33.8521 25.4264H36.6782V22.6003H33.8521V25.4264ZM2.76192 22.601H5.58798V19.7757H2.76192V22.6018M5.58798 22.6018H8.41403V19.7764H5.58798V22.6025M8.41418 22.6025H11.2402V19.7771H8.41418V22.6032M11.2402 22.6032H14.0663V19.7779H11.2402V22.6039M14.0663 22.6039H16.8923V19.7786H14.0664V22.6046M16.8925 22.6046H19.7185V19.7786H16.8923L16.8925 22.6046ZM19.7187 22.6046H22.5447V19.7786H19.7187V22.6046ZM25.3708 22.6046H28.1969V19.7786H25.3708V22.6046ZM31.0229 22.6046H33.849V19.7786H31.0229V22.6046ZM36.6752 22.6046H39.5012V19.7786H36.6752V22.6046ZM42.3274 22.6046H45.1533V19.7786H42.3274V22.6046ZM45.1533 22.6046H47.9794V19.7786H45.1533V22.6046ZM47.9794 22.6046H50.8054V19.7786H47.9794V22.6046ZM50.8056 22.6046H53.6316V19.7786H50.8056V22.6046ZM53.6316 22.6046H56.4577V19.7786H53.6316V22.6046ZM56.4578 22.6046H59.2838V19.7786H56.4578V22.6046ZM59.2838 22.6046H62.1098V19.7786H59.2838V22.6046ZM2.75109 19.7793H5.57715V16.9525H2.75109V19.7786M19.7074 19.7786H22.5335V16.9525H19.7074V19.7786ZM25.3595 19.7786H28.1856V16.9525H25.3595V19.7786ZM33.8377 19.7786H36.6638V16.9525H33.8377V19.7786ZM36.6639 19.7786H39.49V16.9525H36.6639V19.7786ZM42.3162 19.7786H45.1421V16.9525H42.3162V19.7786ZM59.2725 19.7786H62.0985V16.9525H59.2725V19.7786ZM2.7456 16.9518H5.57166V14.1259H2.7456V16.9518ZM8.39786 16.952H11.2239V14.126H8.39786V16.952ZM11.2239 16.952L14.05 16.9521V14.1262L11.2239 14.126V16.9522M14.05 16.9521L16.876 16.9522V14.1263H14.0501V16.9524M19.7024 16.9524H22.5284V14.1265H19.7024V16.9524ZM28.1805 16.9525H31.0066V14.1266H28.1805V16.9525ZM42.3111 16.9527H45.137V14.1268H42.3111V16.9527ZM47.9631 16.9528H50.7891V14.1269H47.9631V16.9528ZM50.7893 16.953H53.6153V14.1271H50.7893V16.953ZM53.6153 16.953L56.4414 16.9531V14.1272L53.6153 14.1271V16.9533M59.2674 16.9533H62.0935V14.1273H59.2674V16.9533ZM2.74055 14.1275H5.5666V11.3014H2.74055V14.1275ZM8.3928 14.1275H11.2189V11.3014H8.3928V14.1275ZM11.2189 14.1275H14.0449V11.3014H11.2189V14.1275ZM14.0449 14.1275H16.871V11.3014H14.0449V14.1275ZM19.6973 14.1275H22.5234V11.3014H19.6973V14.1275ZM25.3494 14.1275H28.1755V11.3014H25.3494V14.1275ZM28.1755 14.1275H31.0015V11.3014H28.1755V14.1275ZM33.8276 14.1275H36.6536V11.3014H33.8276V14.1275ZM42.306 14.1275H45.132V11.3014H42.306V14.1275ZM47.958 14.1275H50.7841V11.3014H47.958V14.1275ZM50.7842 14.1275H53.6103V11.3014H50.7842V14.1275ZM53.6103 14.1275H56.4363V11.3014H53.6103V14.1275ZM59.2624 14.1275H62.0884V11.3014H59.2559V14.1275M2.73477 11.3014H5.56082V8.47523H2.73477V11.3014ZM8.38702 11.3014H11.2131V8.47523H8.38702V11.3014ZM11.2131 11.3014H14.0391V8.47523H11.2131V11.3014ZM14.0391 11.3014H16.8652V8.47523H14.0393V11.3014M19.6915 11.3014H22.5176V8.47523H19.6915V11.3014ZM30.9958 11.3014H33.8218V8.47523H30.9958V11.3014ZM33.8218 11.3014H36.6479V8.47523H33.8218V11.3014ZM42.3003 11.3014H45.1262V8.47523H42.3003V11.3014ZM47.9522 11.3014H50.7783V8.47523H47.9522V11.3014ZM50.7784 11.3014H53.6045V8.47523H50.7784V11.3014ZM53.6045 11.3014H56.4305V8.47523H53.6045V11.3014ZM59.2566 11.3014H62.0827V8.47523H59.253V11.3014M2.73188 8.47523H5.55793V5.64918H2.73188V8.47523ZM19.6882 8.47523H22.5143V5.64918H19.6882V8.47523ZM25.3403 8.47523H28.1664V5.64918H25.3403V8.47523ZM28.1664 8.47523H30.9924V5.64918H28.1664V8.47523ZM30.9924 8.47523H33.8185V5.64918H30.9924V8.47523ZM36.6447 8.47523H39.4707V5.64918H36.6447V8.47523ZM42.2969 8.47523H45.1229V5.64918H42.2969V8.47523ZM59.2533 8.47523H62.0793V5.64918H59.2526V8.47523M2.73145 5.64918H5.5575V2.82312H2.73145V5.64918ZM5.5575 5.64918H8.38356V2.82312H5.5575V5.64918ZM8.38356 5.64918H11.2098V2.82312H8.38356V5.64918ZM11.2098 5.64918H14.0358V2.82312H11.2098V5.64918ZM14.0358 5.64918H16.8619V2.82312H14.0358V5.64918ZM16.8619 5.64918H19.6881V2.82312H16.8613V5.64918M19.6875 5.64918H22.5135V2.82312H19.6882V5.64918M30.9924 5.64918H33.8185V2.82312H30.9932V5.64918M36.6454 5.64918H39.4715V2.82312H36.6447V5.64918M42.2969 5.64918H45.1229V2.82312H42.2975V5.64918M45.1234 5.64918H47.9495V2.82312H45.1242V5.64918M47.9502 5.64918H50.7763V2.82312H47.9524V5.64918M50.7786 5.64918H53.6046V2.82312H50.7779V5.64918M53.6039 5.64918H56.43V2.82312H53.6046V5.64918M56.4308 5.64918H59.2567V2.82312H56.43V5.64918M59.2559 5.64918H62.0819V2.82312H59.258V5.64918H59.2559Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_572_15">
                                    <rect width="65" height="65" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p><small>scan your account</small></p> -->
                        </td>
                    </tr>
                </thead>
            </table>

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px;">
                <tbody>
                    <tr>
                        <td style="vertical-align: top; width: 50%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Admission No.') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']['admission_no']))
                                            {{ __($report['student']['admission_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Student\'s Name') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            <strong>
                                                @if (!empty($report['student']))
                                                {{ __("{$report['student']['first_name']} {$report['student']['middle_name']} {$report['student']['last_name']}") }}
                                                @endif
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Father\'s Name') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            <strong>
                                                @if (!empty($report['student']['father']))
                                                {{ __("{$report['student']['father']['first_name']} {$report['student']['father']['middle_name']} {$report['student']['father']['last_name']}") }}
                                                @endif
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Pay.Type') }}</td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_title']))
                                            {{ __($report['receipt_title']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="padding-left:30px; vertical-align: top; width: 25%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;">
                                            <strong>{{ __('Receipt No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_no']))
                                            {{ __($report['receipt_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Receipt Date') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_date']))
                                            {{ __($report['receipt_date']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Class') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']['classroom']))
                                            {{ __($report['student']['classroom']['title']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="padding-left:30px; vertical-align: top; width: 25%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;">
                                            <strong>{{ __('Scl Receipt No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['school_receipt_no']))
                                            {{ __($report['school_receipt_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Pay.Mode') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['payment_mode']))
                                            {{ __($report['payment_mode']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Roll.No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']))
                                            {{ __($report['student']['srn_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; border: 1px solid #000; margin-top: 5px;">
                <tr style="border: 1px solid #000;">
                    <th style="text-align: left; border-right: 1px solid #ADADAD; padding-left: 10px;">
                        <small>{{ __('Fee Type') }}</small>
                    </th>
                    <th style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-right: 1px solid #ADADAD;">
                        <small>{{ __('Due Amount (Rs.)') }}</small>
                    </th>
                    <th style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;"><small>Paid Amount
                            (Rs.)</small></th>
                </tr>
                @if (!empty($report) && count($report['payments']) > 0)
                @foreach ($report['payments'] as $payment)
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['fee_type_title']) }}</small>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['amount']) }}</small>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['paid_amount']) }}</small>
                    </td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Total Amount') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_amount']))
                                {{ __($report['total_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_paid_amount']))
                                {{ __($report['total_paid_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Discount') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_discount_amount']))
                                {{ __($report['total_discount_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            {{ __('') }}
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Payable') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>{{ __('') }}</strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>

                                @if (!empty($report['total_payable_amount']))
                                {{ __($report['total_payable_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>
                                {{ __('Paid: ') }}
                                {{ __(!empty($report['total_paid_amount_in_word']) ? $report['total_paid_amount_in_word'] : "") }}.
                            </small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>{{ __('') }}</strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_paid_amount']))
                                {{ __($report['total_paid_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif

                            </small>
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px;">
                        <strong><small>{{ __('Due') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD;">
                        {{ __('') }}
                    </td>
                    <td style="text-align: right; padding-right: 10px;">
                        @if (!empty($report['total_due_amount']))
                        {{ __($report['total_due_amount']) }}
                        @else
                        {{ __(0) }}
                        @endif
                    </td>
                </tr>
            </table>

            <div style="margin-left:5px;">
                <p style="margin:2px 0px 0px; font-size:11px;">{{ __($report['payment_note'] ?? "") }}</p>
            </div>

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 0px">
                <tfoot>
                    <tr>
                        <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right;">
                            <p style="margin:5px 0px">
                                <span style="font-size:12px;">
                                    @if (!empty($report['created_by']))
                                    {{ __("{$report['created_by']['first_name']} {$report['created_by']['middle_name']} {$report['created_by']['last_name']}") }}
                                    @endif
                                </span>
                            </p>
                            <strong><span style="font-size:14px;">Auth. Signatory</span></strong>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <p style="border-bottom: 1px dashed #E0E0E0; margin-top: 20px; margin-bottom: 20px;"></p>

        <div style="">
            <table style="width: 100%; font-family: 'Inter', sans-serif;">
                <thead>
                    <tr style="width: 100%;">
                        <td style="width: 20%; vertical-align: top; text-align: left;">
                            <img src="{{ $schoolData['logo']['path'] ?? '' }}" alt="logo" style="width: 85px; height: 80px; margin-top: 0px;" />
                        </td>
                        <td style="width: 60%; vertical-align: top; text-align: center;">
                            <table style="text-align: center; width: 100%; font-weight:bold; font-size:14px">
                                <tr>
                                    <td>
                                        <h2 style="font-size:24px; margin:0px;">
                                            @if (!empty($schoolData['title']))
                                            {{ __($schoolData['title']) }}
                                            @endif
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            @if (!empty($schoolData['academic_year']))
                                            {{ __("(".$schoolData['academic_year'].")") }}
                                            @endif
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            @if (!empty($schoolData['street_address']))
                                            {{ __($schoolData['street_address']) }}
                                            @endif
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            {{ __(!empty($schoolData['phone']) ? $schoolData['phone'] . ',' : '') }}
                                            <!-- {{ __(!empty($schoolData['phone_2']) ? $schoolData['phone_2'] . ',' : '') }} -->
                                            {{ __(!empty($schoolData['mail']) ? $schoolData['mail'] : '') }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>
                                            {{ __('Affiliation No: ') }}
                                            {{ __(!empty($schoolData['affiliation_no']) ? $schoolData['affiliation_no'] : '') }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{ __('Fee Receipt (School Copy)') }}</span></td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 20%; vertical-align: top; text-align: right;">
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

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 10px;">
                <tbody>
                    <tr>
                        <td style="vertical-align: top; width: 50%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Admission No.') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']['admission_no']))
                                            {{ __($report['student']['admission_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Student\'s Name') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            <strong>
                                                @if (!empty($report['student']))
                                                {{ __("{$report['student']['first_name']} {$report['student']['middle_name']} {$report['student']['last_name']}") }}
                                                @endif
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Father\'s Name') }}
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            <strong>
                                                @if (!empty($report['student']['father']))
                                                {{ __("{$report['student']['father']['first_name']} {$report['student']['father']['middle_name']} {$report['student']['father']['last_name']}") }}
                                                @endif
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px;font-weight:bold">{{ __('Pay.Type') }}</td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_title']))
                                            {{ __($report['receipt_title']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="padding-left:30px; vertical-align: top; width: 25%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;">
                                            <strong>{{ __('Receipt No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_no']))
                                            {{ __($report['receipt_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Receipt Date') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['receipt_date']))
                                            {{ __($report['receipt_date']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Class') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']['classroom']))
                                            {{ __($report['student']['classroom']['title']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="padding-left:30px; vertical-align: top; width: 25%;">
                            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse;">
                                <tbody>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:50px;">
                                            <strong>{{ __('Scl Receipt No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['school_receipt_no']))
                                            {{ __($report['school_receipt_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Pay.Mode') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['payment_mode']))
                                            {{ __($report['payment_mode']) }}
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; margin-left:5px;">
                                            <strong>{{ __('Roll.No') }}</strong>
                                        </td>
                                        <td style="margin-bottom: 0px; padding-bottom: 3px; solid #000; border-bottom: 1px solid #C4C4C4;">
                                            @if (!empty($report['student']))
                                            {{ __($report['student']['srn_no']) }}
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; border: 1px solid #000; margin-top: 5px;">
                <tr style="border: 1px solid #000;">
                    <th style="text-align: left; border-right: 1px solid #ADADAD; padding-left: 10px;">
                        <small>{{ __('Fee Type') }}</small>
                    </th>
                    <th style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-right: 1px solid #ADADAD;">
                        <small>{{ __('Due Amount (Rs.)') }}</small>
                    </th>
                    <th style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;"><small>Paid Amount
                            (Rs.)</small></th>
                </tr>

                @if (!empty($report) && count($report['payments']) > 0)
                @foreach ($report['payments'] as $payment)
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['fee_type_title']) }}</small>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['amount']) }}</small>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <small>{{ __($payment['paid_amount']) }}</small>
                    </td>
                </tr>
                @endforeach
                @endif

                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Total Amount') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_amount']))
                                {{ __($report['total_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_paid_amount']))
                                {{ __($report['total_paid_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Discount') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_discount_amount']))
                                {{ __($report['total_discount_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>{{ __('') }}</strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>{{ __('Payable') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>{{ __('') }}</strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>
                                @if (!empty($report['total_payable_amount']))
                                {{ __($report['total_payable_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small></strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px; border-bottom: 1px solid #ddd;">
                        <strong><small>
                                {{ __('Paid: ') }}
                                {{ __(!empty($report['total_paid_amount_in_word']) ? $report['total_paid_amount_in_word'] : "") }}.
                            </small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD; border-bottom: 1px solid #ddd;">
                        <strong>{{ __('') }}</strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-bottom: 1px solid #ddd;">
                        <strong>
                            <small>
                                @if (!empty($report['total_paid_amount']))
                                {{ __($report['total_paid_amount']) }}
                                @else
                                {{ __(0) }}
                                @endif
                            </small>
                        </strong>
                    </td>
                </tr>
                <tr>
                    <td style="border-right; border-right: 1px solid #ADADAD; padding-left: 10px;">
                        <strong><small>{{ __('Due') }}</small></strong>
                    </td>
                    <td style="text-align: right; padding-right: 10px; border-right: 1px solid #ADADAD;">
                        {{ __('') }}
                    </td>
                    <td style="text-align: right; padding-right: 10px;">
                        @if (!empty($report['total_due_amount']))
                        {{ __($report['total_due_amount']) }}
                        @else
                        {{ __(0) }}
                        @endif
                    </td>
                </tr>
            </table>

            <div style="margin-left:5px;">
                <p style="margin:2px 0px 0px; font-size:11px;">{{ __($report['payment_note'] ?? "") }}</p>
            </div>

            <table style="width: 100%; font-family: 'Inter', sans-serif; border-collapse: collapse; margin-top: 0px">
                <tfoot>
                    <tr>
                        <td style="margin:0; padding:0; width:33%; vertical-align:bottom; text-align: right;">
                            <p style="margin:5px 0px">
                                <span style="font-size:12px;">
                                    @if (!empty($report['created_by']))
                                    {{ __("{$report['created_by']['first_name']} {$report['created_by']['middle_name']} {$report['created_by']['last_name']}") }}
                                    @endif
                                </span>
                            </p>
                            <strong><span style="font-size:14px;">Auth. Signatory</span></strong>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <p style="border-bottom: 1px dashed #E0E0E0; margin-top: 20px; margin-bottom: 20px;"></p>

        </div>
    </div>
</body>

</html>