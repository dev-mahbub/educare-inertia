<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Leaving Certificate</title>
    <style>
        .educare-table {
            border: 1px solid #ddd;
        }

        td,
        th {
            font-family: Inter;
            font-size: 14px;
            font-weight: 300;
        }

        table span {
            font-family: Inter;
            font-weight: 500;
        }

        table span.bold {
            font-family: Inter;
            font-weight: 600;
            font-size: 15px;
        }

        .educare-listinfo>tbody>tr>td {
            padding-top: 2px !important;
        }

        .educare-input {
            width: 300px !important;
        }

        .educare-printarea th {
            text-align: right !important;
        }

        .educare-printarea a {
            color: #fff;
            background: #2196F3;
            padding: 3px 9px;
            margin-right: 5px;
            border-radius: 3px;
            text-decoration: none;
        }
    </style>
    <style type="text/css" media="print">
        @media print {
            .educare-printarea {
                display: none;
            }

            .educare-table {
                border: 0;
            }

            .maintbl {
                margin-top: 60px;
            }

            .widthlg {
                width: 300px;
            }

            .antn {
                width: 32% !important;
            }

            .rno {
                width: 30% !important;
            }

            .lgwidth {
                width: 48% !important;
            }

            .sign {
                padding-top: 57px !important;
            }

            .educare-table {
                margin-bottom: 10px !important;
            }

            /*p { font-size: 10pt; }

        h2 { font-size: 12pt; }*/
            .repeatpage {
                page-break-after: always;
                margin-top: 20px;
            }

            .repeatpage.lessmar {
                margin-top: 20px;
            }
        }

        @page {
            size: portrait;
        }

        @page rotated {
            size: portrait;
        }

        table {
            page: rotated;
        }

        @page {
            margin: 0cm;
        }

        /* All margins set to 2cm */

        @page {
            size: 8.5in 14in;
            /* width height 8.27 × 11.69 */
        }

        /*@page{orphans:4; widows:2;}*/
    </style>
</head>

<body>

    @php
        $birthDate = date('d-m-Y', strtotime($student->birth_date_at ?? ''));
        $birthWordsDate = date('F jS Y', strtotime($student->birth_date_at ?? ''));
    @endphp

    <form>
        <div class="repeatpage lessmar">
            <table class="educare-table"
                style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->
                    <tr class="educare-printarea">
                        <th colspan="3"
                            style="width: 100%; text-align: center; font-weight: 400; font-size: 13px; height: 30px;">

                            <input type="button" value="Generate TC" id="btnGenerateTC"
                                style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />
                            <input type="submit" value="Save Draft" id="btnSave"
                                style=" color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; text-decoration: none;" />

                            <button type="button" id="imgLoader" class="btn  change pull-right"
                                style="margin-bottom: 5px; padding: 0 17px; border:0px; color: #0C85E1; border-radius: 3px; display: none; transparent; font-size: 25px; margin-top: -5px;"><i
                                    class="fa fa-spinner fa-spin"></i></button>
                            <input type="button" value="Print" onclick="window.print();"
                                style="color: #fff; background: #0b52bd; border:0px; padding: 3px 9px; margin-right: 5px; border-radius: 3px; width: 72px;">
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style="width: 100%; text-align: center; font-weight: 600; font-size: 30px; padding-top: 0px;">
                            <table style="width:100%;" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="width:120px;padding-left: 15px;">
                                            <svg width="50" height="50" viewBox="0 0 80 80" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_537_28)">
                                                    <path
                                                        d="M7.6832 72.3167L14.1828 78.8163L20.6818 72.3167L27.1814 78.8163L33.681 72.3167L40.1806 78.8163L46.6802 72.3167L53.1792 78.8163V1.18359H1.18359V78.8163L7.6832 72.3167Z"
                                                        fill="#DDF5FF" />
                                                    <path
                                                        d="M49.671 1.18359V70.4161L46.6802 67.4254L40.1806 73.925L33.681 67.4254L27.1814 73.925L20.6818 67.4254L14.1828 73.925L7.6832 67.4254L1.18359 73.925V78.8163L7.6832 72.3167L14.1828 78.8163L20.6818 72.3167L27.1814 78.8163L33.681 72.3167L40.1806 78.8163L46.6802 72.3167L53.1792 78.8163V1.18359H49.671Z"
                                                        fill="#C1E9F4" />
                                                    <path
                                                        d="M74.9681 67.1398H35.3277C33.2025 67.1398 31.4795 65.4168 31.4795 63.2915V39.4305C31.4795 37.3053 33.2025 35.5823 35.3277 35.5823H74.9681C77.0933 35.5823 78.8163 37.3053 78.8163 39.4305V63.2915C78.8163 65.4174 77.0933 67.1398 74.9681 67.1398Z"
                                                        fill="#6DC54A" />
                                                    <path
                                                        d="M75.9941 35.7214C76.0844 36.0486 76.1339 36.3922 76.1339 36.748V62.8795C76.1339 63.7511 75.4277 64.4579 74.5561 64.4579H32.6453C32.29 64.4579 31.9458 64.4085 31.6187 64.3181C32.0685 65.9453 33.5583 67.1404 35.3277 67.1404H74.9681C77.0933 67.1404 78.8163 65.4174 78.8163 63.2915V39.4305C78.8163 37.6605 77.6213 36.1707 75.9941 35.7214Z"
                                                        fill="#5DB33A" />
                                                    <path
                                                        d="M45.0448 48.667H37.3476C36.285 48.667 35.4238 47.8058 35.4238 46.7431V41.4514C35.4238 40.3882 36.285 39.527 37.3476 39.527H45.0448C46.108 39.527 46.9692 40.3888 46.9692 41.4514V46.7431C46.9692 47.8058 46.108 48.667 45.0448 48.667Z"
                                                        fill="#FFCD50" />
                                                    <path
                                                        d="M45.0449 39.527H42.9941C44.0568 39.527 44.918 40.3882 44.918 41.4508V46.7425C44.918 47.8051 44.0568 48.667 42.9941 48.667H45.0449C46.1081 48.667 46.9693 47.8051 46.9693 46.7425V41.4508C46.9693 40.3882 46.1081 39.527 45.0449 39.527Z"
                                                        fill="#FFBC27" />
                                                    <path
                                                        d="M74.5827 60.0201C74.5827 61.6143 73.2906 62.9064 71.6964 62.9064C70.1022 62.9064 68.8101 61.6143 68.8101 60.0201C68.8101 58.4258 70.1022 57.1337 71.6964 57.1337C73.2906 57.1337 74.5827 58.4258 74.5827 60.0201Z"
                                                        fill="#FF7C48" />
                                                    <path
                                                        d="M70.2532 60.0201C70.2532 61.6143 68.961 62.9064 67.3668 62.9064C65.7732 62.9064 64.4805 61.6143 64.4805 60.0201C64.4805 58.4258 65.7732 57.1337 67.3668 57.1337C68.961 57.1337 70.2532 58.4258 70.2532 60.0201Z"
                                                        fill="#FFCD50" />
                                                    <path
                                                        d="M1.18347 47.7386C1.83715 47.7386 2.36693 47.2088 2.36693 46.5551V2.36706H51.9969V10.2503C51.9969 10.9034 52.5267 11.4338 53.1803 11.4338C53.8334 11.4338 54.3638 10.9034 54.3638 10.2503V1.18359C54.3638 0.529905 53.8334 0.00012207 53.1803 0.00012207H1.18347C0.529783 0.00012207 0 0.529905 0 1.18359V46.5551C0 47.2088 0.529783 47.7386 1.18347 47.7386Z"
                                                        fill="black" />
                                                    <path
                                                        d="M19.2918 10.1777C19.2918 8.307 17.7702 6.7854 15.8995 6.7854H12.5859C11.4983 6.7854 10.6133 7.67041 10.6133 8.75744V17.5941C10.6133 18.6817 11.4983 19.5661 12.5859 19.5661H15.8995C17.7696 19.5661 19.2918 18.0445 19.2918 16.1738V15.3852C19.2918 14.5417 18.9824 13.7696 18.4721 13.1758C18.9824 12.5819 19.2918 11.8098 19.2918 10.9669V10.1777ZM15.8995 9.15233C16.4647 9.15233 16.9249 9.61254 16.9249 10.1777V10.9669C16.9249 11.5321 16.4647 11.9923 15.8995 11.9923H12.9802V9.15233H15.8995ZM16.9249 16.1738C16.9249 16.7396 16.4647 17.1992 15.8995 17.1992H12.9802V14.3592H15.8995C16.4647 14.3592 16.9249 14.8194 16.9249 15.3846V16.1738Z"
                                                        fill="black" />
                                                    <path
                                                        d="M33.8084 18.3826C33.8084 17.7296 33.2787 17.1992 32.625 17.1992H27.4968V7.96887C27.4968 7.31518 26.967 6.7854 26.3133 6.7854C25.6597 6.7854 25.1299 7.31518 25.1299 7.96887V18.3826C25.1299 19.0363 25.6597 19.5661 26.3133 19.5661H32.625C33.2787 19.5661 33.8084 19.0363 33.8084 18.3826Z"
                                                        fill="black" />
                                                    <path
                                                        d="M36.2543 6.7854C35.6012 6.7854 35.0708 7.31518 35.0708 7.96887V18.3826C35.0708 19.0363 35.6012 19.5661 36.2543 19.5661H42.5659C43.2196 19.5661 43.7494 19.0363 43.7494 18.3826C43.7494 17.7296 43.2196 17.1992 42.5659 17.1992H37.4377V7.96887C37.4377 7.31518 36.908 6.7854 36.2543 6.7854Z"
                                                        fill="black" />
                                                    <path
                                                        d="M23.3948 18.3826V7.96887C23.3948 7.31518 22.865 6.7854 22.2113 6.7854C21.5576 6.7854 21.0278 7.31518 21.0278 7.96887V18.3826C21.0278 19.0363 21.5576 19.5661 22.2113 19.5661C22.865 19.5661 23.3948 19.0363 23.3948 18.3826Z"
                                                        fill="black" />
                                                    <path
                                                        d="M10.061 29.5862C10.061 30.2393 10.5908 30.7697 11.2445 30.7697H31.1266C31.7797 30.7697 32.3095 30.2393 32.3095 29.5862C32.3095 28.9326 31.7797 28.4028 31.1266 28.4028H11.2445C10.5908 28.4028 10.061 28.9326 10.061 29.5862Z"
                                                        fill="black" />
                                                    <path
                                                        d="M34.6763 29.5862C34.6763 30.2393 35.2061 30.7697 35.8597 30.7697H43.118C43.7717 30.7697 44.3015 30.2393 44.3015 29.5862C44.3015 28.9326 43.7717 28.4028 43.118 28.4028H35.8597C35.2061 28.4028 34.6763 28.9326 34.6763 29.5862Z"
                                                        fill="black" />
                                                    <path
                                                        d="M74.968 34.3988H68.9511C68.2975 34.3988 67.7677 34.9286 67.7677 35.5823C67.7677 36.2354 68.2975 36.7658 68.9511 36.7658H74.968C76.4371 36.7658 77.6327 37.9608 77.6327 39.4306V63.2916C77.6327 64.7613 76.4371 65.9569 74.968 65.9569H35.3276C33.8585 65.9569 32.6628 64.7613 32.6628 63.2916V39.4306C32.6628 37.9608 33.8585 36.7658 35.3276 36.7658H63.4189C64.072 36.7658 64.6018 36.2354 64.6018 35.5823C64.6018 34.9286 64.072 34.3988 63.4189 34.3988H54.3638V15.7917C54.3638 15.1381 53.8334 14.6083 53.1803 14.6083C52.5266 14.6083 51.9969 15.1381 51.9969 15.7917V34.3988H35.3276C33.098 34.3988 31.2029 35.857 30.5449 37.8699H11.2445C10.5908 37.8699 10.061 38.3997 10.061 39.0534C10.061 39.7071 10.5908 40.2368 11.2445 40.2368H30.2959V47.3376H11.2445C10.5908 47.3376 10.061 47.8674 10.061 48.5211C10.061 49.1748 10.5908 49.7046 11.2445 49.7046H30.2959V63.2916C30.2959 66.0662 32.553 68.3239 35.3276 68.3239H51.9969V75.96L47.5157 71.4806C47.0536 71.0186 46.3047 71.0186 45.8421 71.4806L40.1793 77.1434L34.5171 71.4806C34.2949 71.2584 33.994 71.1339 33.6803 71.1339C33.3666 71.1339 33.0651 71.2584 32.8435 71.4806L27.1807 77.1434L21.5185 71.4806C21.2963 71.2584 20.9954 71.1339 20.6811 71.1339C20.3673 71.1339 20.0664 71.2584 19.8443 71.4806L14.1821 77.1434L8.51925 71.4806C8.29709 71.2584 7.99618 71.1339 7.68246 71.1339C7.36874 71.1339 7.06784 71.2584 6.84568 71.4806L2.36632 75.96V52.0813C2.36632 51.4276 1.83654 50.8978 1.18286 50.8978C0.529173 50.8978 0 51.4276 0 52.0813V78.8164C0 79.2955 0.288085 79.727 0.730588 79.9101C0.877072 79.9706 1.03088 79.9999 1.18286 79.9999C1.49108 79.9999 1.79382 79.8796 2.02026 79.6532L7.68307 73.991L13.3453 79.6532C13.5675 79.8753 13.8684 79.9999 14.1821 79.9999C14.4964 79.9999 14.7973 79.8753 15.0189 79.6532L20.6817 73.991L26.3445 79.6532C26.5661 79.8753 26.867 79.9999 27.1813 79.9999C27.495 79.9999 27.7959 79.8753 28.0181 79.6532L33.6809 73.991L39.3431 79.6532C39.5653 79.8753 39.8662 79.9999 40.1799 79.9999C40.4936 79.9999 40.7951 79.8753 41.0167 79.6532L46.6795 73.991L52.3435 79.6538C52.6817 79.9919 53.1913 80.0932 53.6332 79.9101C54.0757 79.727 54.3638 79.2955 54.3638 78.817V68.3233H74.968C77.7426 68.3233 80.0003 66.0662 80.0003 63.2916V39.4306C79.9997 36.6559 77.7426 34.3988 74.968 34.3988Z"
                                                        fill="black" />
                                                    <path
                                                        d="M37.3486 49.8504H45.0451C46.759 49.8504 48.153 48.4564 48.153 46.7425V41.4508C48.153 39.7375 46.759 38.3435 45.0451 38.3435H37.3486C35.6348 38.3435 34.2407 39.7375 34.2407 41.4508V46.7425C34.2407 48.4564 35.6348 49.8504 37.3486 49.8504ZM36.6077 41.4508C36.6077 41.0425 36.9397 40.7104 37.3486 40.7104H45.0451C45.4541 40.7104 45.7861 41.0425 45.7861 41.4508V46.7425C45.7861 47.1515 45.4541 47.4835 45.0451 47.4835H37.3486C36.9397 47.4835 36.6077 47.1515 36.6077 46.7425V41.4508Z"
                                                        fill="black" />
                                                    <path
                                                        d="M69.531 56.5765C68.9035 56.1804 68.162 55.9509 67.3667 55.9509C65.1224 55.9509 63.2969 57.7764 63.2969 60.0207C63.2969 62.2643 65.1224 64.0905 67.3667 64.0905C68.162 64.0905 68.9035 63.8604 69.531 63.4649C70.1737 63.8683 70.9226 64.0905 71.6965 64.0905C73.9408 64.0905 75.7663 62.2643 75.7663 60.0207C75.7663 57.7764 73.9408 55.9509 71.6965 55.9509C70.9226 55.9503 70.1737 56.1724 69.531 56.5765ZM65.6638 60.0201C65.6638 59.0813 66.428 58.3172 67.3667 58.3172C68.306 58.3172 69.0696 59.0813 69.0696 60.0201C69.0696 60.9594 68.306 61.7229 67.3667 61.7229C66.428 61.7229 65.6638 60.9594 65.6638 60.0201ZM73.3994 60.0201C73.3994 60.9594 72.6352 61.7229 71.6965 61.7229C71.4939 61.7229 71.2961 61.6851 71.11 61.6167C71.3199 61.126 71.4365 60.5865 71.4365 60.0201C71.4365 59.4537 71.3199 58.9141 71.11 58.4234C71.2961 58.355 71.4939 58.3172 71.6965 58.3172C72.6352 58.3172 73.3994 59.0813 73.3994 60.0201Z"
                                                        fill="black" />
                                                    <path
                                                        d="M42.7646 53.189C42.7646 52.5353 42.2348 52.0056 41.5811 52.0056H35.8085C35.1548 52.0056 34.625 52.5353 34.625 53.189C34.625 53.8427 35.1548 54.3725 35.8085 54.3725H41.5811C42.2354 54.3725 42.7646 53.8427 42.7646 53.189Z"
                                                        fill="black" />
                                                    <path
                                                        d="M35.809 58.6443C35.1553 58.6443 34.6255 59.1741 34.6255 59.8278C34.6255 60.4815 35.1553 61.0113 35.809 61.0113H39.6572C40.3109 61.0113 40.8407 60.4815 40.8407 59.8278C40.8407 59.1741 40.3109 58.6443 39.6572 58.6443H35.809Z"
                                                        fill="black" />
                                                    <path
                                                        d="M43.0248 61.0113H46.873C47.5267 61.0113 48.0565 60.4815 48.0565 59.8278C48.0565 59.1741 47.5267 58.6443 46.873 58.6443H43.0248C42.3711 58.6443 41.8413 59.1741 41.8413 59.8278C41.8413 60.4815 42.3711 61.0113 43.0248 61.0113Z"
                                                        fill="black" />
                                                    <path
                                                        d="M50.2411 61.0113H54.0899C54.743 61.0113 55.2728 60.4815 55.2728 59.8278C55.2728 59.1741 54.743 58.6443 54.0899 58.6443H50.2411C49.5874 58.6443 49.0576 59.1741 49.0576 59.8278C49.0576 60.4815 49.5874 61.0113 50.2411 61.0113Z"
                                                        fill="black" />
                                                    <path
                                                        d="M52.8672 53.189C52.8672 52.5353 52.3374 52.0056 51.6837 52.0056H45.911C45.2573 52.0056 44.7275 52.5353 44.7275 53.189C44.7275 53.8427 45.2573 54.3725 45.911 54.3725H51.6837C52.338 54.3725 52.8672 53.8427 52.8672 53.189Z"
                                                        fill="black" />
                                                    <path
                                                        d="M61.7862 54.3725C62.4399 54.3725 62.9697 53.8427 62.9697 53.189C62.9697 52.5353 62.4399 52.0056 61.7862 52.0056H56.0135C55.3599 52.0056 54.8301 52.5353 54.8301 53.189C54.8301 53.8427 55.3599 54.3725 56.0135 54.3725H61.7862Z"
                                                        fill="black" />
                                                    <path
                                                        d="M66.1161 54.3725H71.8888C72.5425 54.3725 73.0722 53.8427 73.0722 53.189C73.0722 52.5353 72.5425 52.0056 71.8888 52.0056H66.1161C65.4624 52.0056 64.9326 52.5353 64.9326 53.189C64.9326 53.8427 65.4624 54.3725 66.1161 54.3725Z"
                                                        fill="black" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_537_28">
                                                        <rect width="80" height="80" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </td>
                                        </td>
                                        <td style="width:95%">
                                            <p style="margin: 0; font-size: 30px; font-weight: 600;">
                                                Demo Public School
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight: 300;">
                                                Sector - 62, Noida (Uttar Pradesh) India, 201301
                                            </p>
                                            <p style="margin: 0;font-size: 14px;font-weight:300;">
                                                989999999 , scientificstudyhelpdesk@gmail.com
                                            </p>

                                        </td>

                                    </tr>
                                </tbody>

                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">

                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width: 100%; text-align: center; font-weight: 400; font-size: 13px;">
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:center;font-weight:600;padding-top:0px;font-size:20px;text-decoration:underline;padding-top: 0px;">
                            <i style="">SCHOOL LEAVING CERTIFICATE</i>
                        </th>

                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:23%;padding:0 10px;text-align:left;">
                                            <span class="bold">School Key:</span>

                                            <span>
                                                <input id="SchoolNo" maxlength="20" name="SchoolNo"
                                                    style="text-align: left;border: none;width: 67px;" type="text"
                                                    value="{{ $schoolKey->school_key ?? '' }}" />
                                            </span>
                                        </td>

                                        <td style="width: 25%; padding: 0 10px; text-align: center;">
                                            <span class="bold">Admn No :</span>
                                            <span>
                                                <input id="AdmissionRegistrationNumber" maxlength="20"
                                                    name="AdmissionRegistrationNumber"
                                                    style="text-align: left;border: none;width: 90px;" type="text"
                                                    value="{{ $student->admission_no ?? '' }}" />
                                            </span>
                                        </td>
                                        <td style="width:22%;text-align:right;">
                                            <span class="bold">TC No :</span>
                                            <span>
                                                <input id="TcNo" maxlength="20" name="TcNo"
                                                    style="text-align: left;border: none;width: 100px;" type="text"
                                                    value="{{ $student->id ?? '' }}" />
                                            </span>

                                        </td>
                                        <td style="width:25%;padding:0 10px;text-align:right;">
                                            <span class="bold">TC Date :</span>
                                            <span>
                                                <input style="text-align: left;border: none;width:49%" type="text"
                                                    value="{{ date('d-m-Y') }}" />
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-size:13px;color: rgba(85, 85, 85, 0.9); padding:5px 12px 0;font-weight:400;">
                            (No Change in any entry in this certificate shall be made except by the authority issuing it
                            and any infringement of this requirment is liable to involve the imposition of penality such
                            as that of rustication.)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                            <table style="width:100%;margin-top: 0px;padding-left: 15px;" class="educare-listinfo"
                                cellspacing="0">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span></span>
                                        </td>
                                        <td class="widthlg" style="width:46%;padding: 0px;text-align:left;">
                                            <span>Admission Number</span>
                                        </td>

                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input id="AdmissionRegistrationNumber" maxlength="20"
                                                    name="AdmissionRegistrationNumber"
                                                    style="text-align: left;border: none;width: 90px;" type="text"
                                                    value="{{ $student->admission_no ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--name of pupil-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>1.</span>
                                        </td>
                                        <td class="widthlg" style="width:46%;padding: 0px;text-align:left;">
                                            <span>Name of the Student</span>
                                        </td>

                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="StudentName" maxlength="50"
                                                    name="StudentName"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text"
                                                    value="{{ $student->first_name ?? '' }} {{ $student->middle_name ?? '' }} {{ $student->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Mother's Name-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>2.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Mother's Name</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="MotherName" maxlength="50"
                                                    name="MotherName"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text"
                                                    value="{{ optional($student)->mother->first_name ?? '' }} {{ optional($student)->mother->middle_name ?? '' }} {{ optional($student)->mother->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Father's Name-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>3.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Father's Name/Guardian's Name</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="FatherName" maxlength="50"
                                                    name="FatherName"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text"
                                                    value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Date of Birth-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>4.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Date of Birth (In Christian Era) Figure</span>
                                            <span style="display:block;text-align:left;">In Words</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                            <span class="bold" style="display:block;">:</span>
                                        </td>

                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="DobInFigure" maxlength="50"
                                                    name="DobInFigure"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="{{ $birthDate }}" />
                                            </div>
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="DobInWords1" maxlength="50"
                                                    name="DobInWords1"
                                                    style="text-align: left;border: none;float: left;width:410px !important;"
                                                    type="text" value="{{ $birthWordsDate }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>5.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Last School Attended</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="LastSchoolAttended" maxlength="50"
                                                    name="LastSchoolAttended"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of sex Name-->
                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>6.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Gender</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="GenderName" maxlength="50"
                                                    name="GenderName"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="{{ $student->gender ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--name of Nationality-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>7.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Nationality</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td
                                            style="width:46%;padding:0 10px;text-align:left;font-weight:400;font-size:15px;">
                                            <div style="height: 15px;">{{ $student->country->name }}</div>
                                        </td>
                                    </tr>
                                    <!--name of Religion/caste-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>8.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Religion/Caste</span>
                                            <span style="display:block;text-align:left;">Schedule/Tribe
                                                Caste/OBC</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                            <span class="bold" style="display:block;">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="Religion" maxlength="50"
                                                    name="Religion"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />
                                            </div>


                                            <div style="height: 15px;">
                                                <input class="educare-input" id="Caste" maxlength="50"
                                                    name="Caste"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />
                                            </div>

                                        </td>
                                    </tr>
                                    <!--name of place of Birth-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>9.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Place of Birth</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="PlaceOfBirth" maxlength="50"
                                                    name="PlaceOfBirth"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Admission Date-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>10.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Date of Admission in School & Class</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="AdmissionDate" maxlength="50"
                                                    name="AdmissionDate"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of Last studied school -->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>11.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">

                                            <span>Class in which student last studied</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>

                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="ClassSection" maxlength="50"
                                                    name="ClassSection"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="{{ $student->classroom->title ?? '' }}" />
                                            </div>

                                        </td>
                                    </tr>
                                    <!--name of Subject Studied-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>12.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Subject Studied</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="SubjectsStudied" maxlength="70"
                                                    name="SubjectsStudied"
                                                    style="text-align: left;border: none;float: left;width:100% !important;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name of last examination board-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>13.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>School/Board Last Examination Result</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="PreviousSchoolBoardExamResult"
                                                    maxlength="50" name="PreviousSchoolBoardExamResult"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name whether qualified-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>14.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Whether qualified</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="WhetherQualified" maxlength="50"
                                                    name="WhetherQualified"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Promoted to Class-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>15.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Promoted to class</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="PromotedToClass" maxlength="50"
                                                    name="PromotedToClass"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--name moth of fee paid-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>16.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Month up to which Student Paid Fees</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="MonthuptowhichPupilPaidFees"
                                                    maxlength="50" name="MonthuptowhichPupilPaidFees"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee concession-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>17.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Any Fees availed of/ Concession</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="AnyFeesAvailedofConcession"
                                                    maxlength="50" name="AnyFeesAvailedofConcession"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee total working days-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>18.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Total Number of Working Days</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="TotalNumberofWorkingDays" maxlength="50"
                                                    name="TotalNumberofWorkingDays"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--fee total present days-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>19.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Total Numbers of Present Days</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="TotalNumbersofPresentDays"
                                                    maxlength="50" name="TotalNumbersofPresentDays"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Whether In NCC/Scout-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>20.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Whether In NCC/Scout</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="WhetherInNccScout" maxlength="50"
                                                    name="WhetherInNccScout"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Games Played/ Other Activity-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>21.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Games Played/ Other Activity</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="GamesPlayedOtherActivity" maxlength="50"
                                                    name="GamesPlayedOtherActivity"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--General Conduct-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>22.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>General Conduct</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="GeneralConduct" maxlength="50"
                                                    name="GeneralConduct"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>
                                    <!--Date of Issue of Certificate-->

                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>23.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Date on which student's name was struck of the school</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input id="DateOfStuckStudent" name="DateOfStuckStudent"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align: top;">
                                        <td style="width: 4%; padding: 0 3px; text-align: right;">
                                            <span>24.</span>
                                        </td>
                                        <td style="width: 46%; padding: 0px; text-align: left;">
                                            <span>Date of Issue of Certificate</span>
                                        </td>
                                        <td style="width: 4%; padding: 0 10px; text-align: center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width: 46%; padding: 0 10px; text-align: left; font-weight: 400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input"
                                                    id="DateofIssueofCertificate" maxlength="50"
                                                    name="DateofIssueofCertificate"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="need to update" />

                                            </div>
                                        </td>
                                    </tr>


                                    <!--Reason for Leaving the School-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>25.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Reason for Leaving the School</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="ReasonforLeavingtheSchool"
                                                    maxlength="50" name="ReasonforLeavingtheSchool"
                                                    style="text-align: left;border: none;float: left;width: 454px;font-size:15px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>26.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Udise No</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>

                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">


                                        </td>
                                    </tr>

                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>27.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Address</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>

                                        <td style="width:50%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="Address1" maxlength="50"
                                                    name="Address1"
                                                    style="text-align: left;border: none;float: left;width: 454px !important;font-size:12px;"
                                                    type="text" value="{{ $student->present_address ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>
                                    <!--Reason for Leaving the School-->
                                    <tr style="vertical-align:top;">
                                        <td style="width:4%;padding:0 3px;text-align:right;">
                                            <span>28.</span>
                                        </td>
                                        <td style="width:46%;padding: 0px;text-align:left;">
                                            <span>Any Other Remarks</span>
                                        </td>
                                        <td style="width:4%;padding:0 10px;text-align:center;">
                                            <span class="bold">:</span>
                                        </td>
                                        <td style="width:46%;padding:0 10px;text-align:left;font-weight:400;">
                                            <div style="height: 15px;">
                                                <input class="educare-input" id="AnyOtherRemarks1" maxlength="150"
                                                    name="AnyOtherRemarks1"
                                                    style="text-align: left;border: none;float: left;width: 454px!important;font-size:15px;"
                                                    type="text" value="" />
                                            </div>
                                        </td>
                                    </tr>

                                    <!--CONFERMATION-->
                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:center;font-weight:400;font-size:15px;padding:0px 0px 0px 0px;">
                                            CERTIFIED THAT THE ABOVE INFORMATION IS IN ACCORDANCE WITH THE SCHOOL
                                            REGISTER.
                                        </th>
                                    </tr>
                                    <!--            signatures-->
                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                                            <table style="width:100%;margin-top: 5px;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td style="width:33.3%;padding:0 10px;text-align:left;">
                                                            <span>Seal of the School</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td style="width:33.3%;padding:0 10px ;text-align:center;">
                                                            <span></span>
                                                        </td>

                                                    </tr>

                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:center;font-weight:400;font-size:13px;">
                                            <table style="width:100%;margin-top: 30px;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td
                                                            style="width:33.3%;padding:0 10px;text-align:left;bottom:20px;">
                                                            <span>Signature of Class Teacher</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td
                                                            style="width:33.3%;padding:0 10px;text-align:center;bottom:20px;">
                                                            <span>Checked by(Name & Designation)</span>
                                                            <input class="educare-input" id="txtCoordinator"
                                                                maxlength="50" name="txtCoordinator"
                                                                style="text-align: left;border: none;float: left;width: 454px;text-align: center;font-family: Inter;font-weight: 500;"
                                                                type="text" value="" />

                                                            <span>&nbsp;</span>
                                                        </td>
                                                        <td
                                                            style="width:33.3%;padding:0 10px;text-align:left;padding-bottom:10px;">
                                                            <span>Signature of Principal</span>
                                                            <span>&nbsp;</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>

                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
        <div class="repeatpage">
            <table class="educare-table"
                style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:5px 10px 0px;">
                            I want to withdraw my ward from the school. You are requested to issue his/her transfer
                            certificate to me. The details of the ward are supplied her with in coloumn <b>B</b>.
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:70%;text-indent:0;">
                                            Address- <span style="display:inline-block;width: 90%;">
                                                <input id="Address1" maxlength="50" name="Address1"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="Bokaro" />

                                            </span>

                                            <span style="display:block;width: 100%;height: 20px;">
                                                <input id="Address1" maxlength="50" name="Address1"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="Bokaro" />

                                            </span>

                                        </td>

                                        <td class="sign" style="width:30%;text-align:center;padding-top: 39px;">

                                            <span
                                                style="display:block;border-bottom:1px dotted #333;width: 100%"></span>
                                            Signature of parents
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 5px;"></div>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>B)</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Name of student

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="StudentName" maxlength="90" name="StudentName"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ optional($student)->first_name ?? '' }} {{ optional($student)->middle_name ?? '' }} {{ optional($student)->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Name of father/ guardian
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="FatherName" maxlength="90" name="FatherName"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Religion and Caste

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input Value=" " id="ReligionorCaste" maxlength="90"
                                                    name="ReligionorCaste"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value=" " />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Place of Birth

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="BirthPlace" maxlength="90" name="BirthPlace"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>

                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Class/Section
                                            <div>(Studying as on today)</div>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="ClassSection" maxlength="90" name="ClassSection"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ $student->classroom->title }}" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Passed/Failed Classes
                                            <div>(if applicable)</div>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <div style="height: 15px;">
                                                    <input id="PassedFailedClasses" maxlength="90"
                                                        name="PassedFailedClasses"
                                                        style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                        type="text" value="" />

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Cause of withdrawal
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            :
                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Causeofwithdrawal" maxlength="90" name="Causeofwithdrawal"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :

                                            <span>
                                                <input id="PartBFillDate" maxlength="60" name="PartBFillDate"
                                                    style="text-align: left;border: none;width: 100px;" type="text"
                                                    value="" />


                                            </span>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 23px;text-align: right;">
                                                <div
                                                    style="height: 15px;border-bottom: 1px dotted #000;width:37%;float:right;">
                                                </div>
                                            </div>
                                            <span style=" float right;margin-right 5%;"> Signature of Parent</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 0px;">
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;">
                            FOR OFFICE USE ONLY
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>C)</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Class teacher to fill in and certify.

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            1)
                                        </td>

                                        <td class="lgwidth" style="width:44%;text-indent:0;text-align:left;">
                                            Registered name of student father/guardian-Mast./Ms.
                                        </td>

                                        <td class="" style="width:auto;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Registerednameofpupilfather" maxlength="80"
                                                    name="Registerednameofpupilfather"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            &nbsp;
                                        </td>
                                        <td style="width:25%;text-indent:0;text-align:left;">
                                            Son/Daughter of Mr.

                                        </td>

                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="SonDaughterof" maxlength="60" name="SonDaughterof"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            2)
                                        </td>
                                        <td class="rno" style="width:28%;text-indent:0;text-align:left;">
                                            Admission/registration No.
                                        </td>

                                        <td class="" style="width:20%;float:left;text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="AdmissionRegistrationNumber" maxlength="25"
                                                    name="AdmissionRegistrationNumber"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 454px;"
                                                    type="text" value="{{ $student->admission_no ?? '' }}" />

                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            3)
                                        </td>
                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                            Date of Birth-
                                        </td>
                                        <td class="" style="width:100%;float:left;text-align:center;">
                                            <table style="width:100%;">
                                                <tbody>
                                                    <tr style="vertical-align:top;">
                                                        <td class=""
                                                            style="width:15%;text-indent:0;text-align:left;">
                                                            In Figure
                                                        </td>
                                                        <td class="" style="text-align:center;">
                                                            <div style="height: 15px;">
                                                                <input id="DobInFigure" maxlength="80"
                                                                    name="DobInFigure"
                                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                                    type="text" value="{{ $birthDate ?? '' }}" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style="vertical-align:top;">

                                                        <td class=""
                                                            style="width:15%;text-indent:0;text-align:left;">
                                                            In Words
                                                        </td>

                                                        <td class="" style="text-align:center;">
                                                            <div style="height: 15px;">
                                                                <input
                                                                    class="educare-input" id="DobInWords1" maxlength="50"
                                                                    name="DobInWords1"
                                                                    style="text-align: left;border: none;float: left;width:410px !important;"
                                                                    type="text"
                                                                    value="{{  $birthWordsDate ?? '' }}" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            4)
                                        </td>
                                        <td class="antn" style="width:28%;text-indent:0;text-align:left;">
                                            Last day of attendance in the School
                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="LastdayofAttendanceofSchool" maxlength="60"
                                                    name="LastdayofAttendanceofSchool"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            5)
                                        </td>
                                        <td class="" style="width:15%;text-indent:0;text-align:left;">
                                            Total attendance
                                        </td>
                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="TotalAttendance" maxlength="30" name="TotalAttendance"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                        <td class="" style="width:12%;text-indent:0;text-align:left;">
                                            Days out of

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Dayoutof" maxlength="30" name="Dayoutof"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            6)
                                        </td>
                                        <td class="" style="width:30%;text-indent:0;text-align:left;">
                                            Weather in NCC/Scout

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="WhetherInNccScout" maxlength="80" name="WhetherInNccScout"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            7)
                                        </td>
                                        <td class="" style="width:35%;text-indent:0;text-align:left;">
                                            Games Played/Other Activity

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="GamesPlayedOtherActivity" maxlength="80"
                                                    name="GamesPlayedOtherActivity"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width: 100%;"
                                                    type="text" value="No" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:3%;text-indent:0;">
                                            8)
                                        </td>
                                        <td class="" style="width:14%;text-indent:0;text-align:left;">
                                            Subject Studied

                                        </td>

                                        <td style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="StudiedSubject1" maxlength="80" name="StudiedSubject1"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                            <div style="height: 15px;">
                                                <input id="StudiedSubject2" maxlength="80" name="StudiedSubject2"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :

                                            <span>
                                                <input id="PartBFillDate" maxlength="50" name="PartBFillDate"
                                                    style="text-align: left;border: none;width: 100px;" type="text"
                                                    value="" />

                                            </span>

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 10px;text-align: right;">
                                                <div
                                                    style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                </div>
                                            </div>
                                            <span style=" float right;margin-right 5%;"> Signature of Class
                                                Teacher</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">
                                            <div style="height: 6px;border-bottom: 1px solid #000;margin-bottom: 5px;">
                                            </div>
                                        </th>
                                    </tr>
                                    <table style="width:100%;">
                                        <tr style="vertical-align:top;">
                                            <th colspan="3"
                                                style="width:100%;text-align:center;font-weight:400;font-size:19px;line-height: 8px;">
                                                NO DUES CERTIFICATE
                                            </th>
                                        </tr>
                                    </table>
                                    <table style="width:100%;">
                                        <tbody>
                                            <tr style="vertical-align:top;">
                                                <td style="width:3%;text-indent:0;">
                                                    <b>D)</b>
                                                </td>
                                                <td style="width:3%;text-indent:0;">
                                                    1)
                                                </td>
                                                <td class="" style="width:14%;text-indent:0;text-align:left;">
                                                    Account Office
                                                </td>
                                                <td style="text-align:center;">
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    1)
                                                                </td>
                                                                <td class=""
                                                                    style="width:19%;text-indent:0;text-align:left;">
                                                                    Fees paid up to
                                                                </td>
                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="FeesPaidupto" maxlength="70"
                                                                            name="FeesPaidupto"
                                                                            style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                                            type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    2)
                                                                </td>
                                                                <td class=""
                                                                    style="width:19%;text-indent:0;text-align:left;">
                                                                    Dues (if any)

                                                                </td>

                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="DuesifAny" maxlength="70"
                                                                            name="DuesifAny"
                                                                            style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                                            type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">

                                                                <td style="width:3%;text-indent:0;">
                                                                    3)
                                                                </td>
                                                                <td class=""
                                                                    style="width:25%;text-indent:0;text-align:left;">
                                                                    Received fees/R No.
                                                                </td>

                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="DuesifAny" maxlength="25"
                                                                            name="DuesifAny"
                                                                            style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                                            type="text" value="" />

                                                                    </div>
                                                                </td>
                                                                <td class=""
                                                                    style="width:7%;text-indent:0;text-align:left;">
                                                                    Date

                                                                </td>
                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="NoDuesCertificateDate"
                                                                            maxlength="25"
                                                                            name="NoDuesCertificateDate"
                                                                            style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                                            type="text" value="" />

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table style="width:100%;">
                                                        <tbody>
                                                            <tr style="vertical-align:top;">


                                                                <td class=""
                                                                    style="width:8%;text-indent:4px;text-align:left;">
                                                                    Dues
                                                                </td>

                                                                <td style="text-align:center;">
                                                                    <div style="height: 15px;">
                                                                        <input id="Dues" maxlength="25"
                                                                            name="Dues"
                                                                            style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                                            type="text" value="" />

                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style="width:100%;margin-top: 13px;">
                                        <tbody>
                                            <tr style="vertical-align:top;">
                                                <td style="width:3%;text-indent:0;">
                                                    <b>&nbsp;</b>
                                                </td>
                                                <td style="width:32%;text-indent:0;text-align:left;">
                                                    &nbsp;

                                                </td>
                                                <td style="width:5%;text-indent:0;">
                                                    &nbsp;

                                                </td>
                                                <td class="" style="width:60%;text-align:center;">
                                                    <div style="height: 10px;text-align: right;">
                                                        <div
                                                            style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                        </div>
                                                    </div>
                                                    <span style="float: right;margin-right: 5%;"> Signature of
                                                        Accoutant</span>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <!-- Heading Row-->
                </thead>
            </table>
        </div>
        <div class="maintbl">
            <table class="educare-table"
                style="width: 100%;max-width: 800px;margin: 0 auto;font-family: Inter;background: #fff;border-spacing: 0;border-collapse: collapse;">
                <thead>
                    <!--title row-->

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:center;font-weight:400;font-size:19px;    padding-top:50px;">
                            FOR OFFICE USE ONLY
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3"
                            style=" width 100%;text-align center;font-weight 400;font-size 19px;line-height 9px;height 26px;vertical-align top;">
                            FOR ACCOUNT DEPARTMENT.
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:10%;text-indent:0;text-align:left;">
                                            T.C. NO.
                                        </td>
                                        <td class="" style="width:40%;text-align:center;float:left;">
                                            <div style="height: 15px;">
                                                <input id="TcNo" maxlength="25" name="TcNo"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="{{ $student->id }}" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:33%;text-indent:0;text-align:left;">
                                            TC to be handed on to the Parents

                                        </td>
                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="TcHandedToParent" maxlength="70"
                                                    name="TcHandedToParent"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="{{ optional($student)->father->first_name ?? '' }} {{ optional($student)->father->middle_name ?? '' }} {{ optional($student)->father->last_name ?? '' }}" />

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:21%;text-indent:0;text-align:left;">
                                            Cheque to be ready by
                                        </td>
                                        <td class="" style="text-align:center;">
                                            <div style="height: 15px;">
                                                <input id="Chequetobereadyby" maxlength="70"
                                                    name="Chequetobereadyby"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"
                                            style="width: 100%;text-align: center;font-weight: 400;font-size: 16px;line-height: 23px;vertical-align: top;height: 20px;">
                                            (NOT TO BE FILLED BY PARENTS)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>

                                    <tr>
                                        <th colspan="4"
                                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:0px;padding:0px 10px 0px;">

                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3" style="width:100%;text-align:center;font-weight:400;font-size:19px;">
                            TO BE FILLED BY PARENTS REFUND
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3"
                            style="width:100%;text-align:justify;font-weight:400;font-size:14px;text-indent:30px;padding:10px 10px 0px;">
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Dear Ma'am
                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 15px;"></div>
                                        </td>
                                    </tr>
                                    <tr style="vertical-align:top;">

                                        <td style="width:40%;text-indent:0;text-align:left;">
                                            With reference of the TC application of my child

                                        </td>
                                        <td colspan="2" style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="ChildName" maxlength="70" name="ChildName"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="{{ $student->first_name ?? '' }} {{ $student->middle_name ?? '' }} {{ $student->last_name ?? '' }}" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input type="text"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;">
                                            </div>
                                        </td>

                                        <td class="" style="width:10%;text-indent:0;text-align:left;">
                                            of class
                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="ChildClassName" maxlength="70" name="ChildClassName"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="{{ $student->classroom->title }}" />

                                            </div>
                                        </td>

                                        <td class="" style="width:31%;text-indent:0;text-align:left;">
                                            Request you to kindly refund the

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            Caution Money of Rs.

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="CautionMoneyofRs" maxlength="50"
                                                    name="CautionMoneyofRs"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:40%;text-indent:0;text-align:left;">
                                            Alogn with the T.C. The Cheque has to be

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            made in the name of

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="Checkmadeinthenameof" maxlength="50"
                                                    name="Checkmadeinthenameof"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:10%;text-indent:0;text-align:left;">
                                            Payble

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td class="" style="width:21%;text-indent:0;text-align:left;">
                                            at Account Number

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="PaybleAccountNumber" maxlength="50"
                                                    name="PaybleAccountNumber"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>

                                        <td class="" style="width:13%;text-indent:0;text-align:left;">
                                            Bank Name

                                        </td>
                                        <td style="text-indent:0;">
                                            <div style="height: 15px;">
                                                <input id="BankName" maxlength="50" name="BankName"
                                                    style="text-align: left;border: none;border-bottom: 1px dotted #000;float: left;width:100%;"
                                                    type="text" value="" />

                                            </div>
                                        </td>

                                    </tr>
                                    <tr style="vertical-align:top;">

                                        <td colspan="4" style="text-indent:0;">
                                            <div style="height: 15px;">

                                            </div>

                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;margin-top: 13px;">
                                <tbody>
                                    <tr style="vertical-align:top;">
                                        <td style="width:3%;text-indent:0;">
                                            <b>&nbsp;</b>
                                        </td>
                                        <td style="width:32%;text-indent:0;text-align:left;">
                                            Date :

                                            <input type="text" id="txtfeeRefundDate" name="txtfeeRefundDate"
                                                maxlength=50 style="text-align: left;border: none;width: 100px;">

                                        </td>
                                        <td style="width:5%;text-indent:0;">
                                            &nbsp;

                                        </td>
                                        <td class="" style="width:60%;text-align:center;">
                                            <div style="height: 10px;text-align: right;">
                                                <div
                                                    style="height: 6px;border-bottom: 1px dotted #000;width:50%;float:right;">
                                                </div>
                                            </div>
                                            <span style="float: right;margin-right: 5%;"> Parents Signature</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <input data-val="true" data-val-number="The field StudentId must be a number." id="hdnStudentId"
            name="StudentId" type="hidden" value="2" /><input data-val="true"
            data-val-number="The field ClassId must be a number." id="hdnClassId" name="ClassId" type="hidden"
            value="1" /><input data-val="true" data-val-number="The field CertificateId must be a number."
            id="hdnCertificateId" name="CertificateId" type="hidden" value="" /> <input type="hidden"
            value="200" id="hdnResponse" />
        <input id="hdnGender" name="Gender" type="hidden" value="2" />
    </form>

    <script language="javascript" type="text/javascript">
        //    $.getScript("/js/leavingCertificate.js", function () {
        //
        //        var k = new spt.StudentSlcAdd();
        //    });

        $(function() {


            $("#btnBack").click(function() {
                window.history.back();
                // new spt.FormPost({ url: "/studentedit?id=" + $("#hdnStudentId").val() });
            });

            var response = $("#hdnResponse").val();
            if (response == 200) {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.success("Leaving Certificate Saved Successfully", "Success");
            } else if (response == 400) {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.error("Error while Save", "error");
            }

            $("#btnGenerateTC").click(function() {
                var certificateId = $("#hdnCertificateId").val();

                if (certificateId != "" || response != "") {

                    var result = confirm(
                        "Are you sure to generate Transfer certificate ? This process will make the student  inactive in the current session."
                    );
                    if (result == true) {
                        $.ajax({
                            url: "/Student/GenerateTransferCertificate",
                            data: {
                                studenId: $("#hdnStudentId").val(),
                                classId: $("#hdnClassId").val()
                            },
                            type: "POST",
                            success: function(response) {
                                if (response.status == 200) {
                                    toastr.options.positionClass = "toast-bottom-right";
                                    toastr.success("Saved Successfully", "Success");
                                } else {
                                    toastr.options.positionClass = "toast-bottom-right";
                                    toastr.error("something went wrong!", "Error");
                                }
                            }
                        });
                    }
                } else {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.warning("Please save as draft for generate Tc ", "Warning");
                }
            });
        });
    </script>


</body>

</html>
