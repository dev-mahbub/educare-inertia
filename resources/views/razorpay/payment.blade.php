<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel - Razorpay Payment Gateway Integration</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <form id="razorpay_form" action="{{ route('razorpay.payment_callback') }}" method="POST">
        @csrf
        <!-- <script src="https://checkout.razorpay.com/v1/checkout.js"
                data-key="{{ $keyId }}"
                data-amount="1000"
                data-buttontext="Pay Now1"
                data-name="ERP EduCare"
                data-description="Rozerpay"
                data-image="https://educarestudy-bucket.s3.amazonaws.com/demo/images/school_78/jMuug70MoTKzRIgFdSnOBYrt0vqWRqFKTpL8rhUe.png"
                data-prefill.name="name"
                data-prefill.email="email"
                data-theme.color="#ff7529">
        </script> -->

        <script src="https://checkout.razorpay.com/v1/checkout.js"
            data-key="{{ $keyId }}"
            data-amount="{{ $amount }}"
            data-name="ERP EduCare"
            data-buttontext="Pay Now">
        </script>

        <input type="hidden" name="order_id" value="{{ $orderId }}">
        <input type="hidden" name="order_sms_id" value="{{ $orderSmsId }}">
        <input type="hidden" name="order_service_id" value="{{ $orderServiceId }}">
        <input type="hidden" name="order_biometric_id" value="{{ $orderBiometricId }}">
        <input type="hidden" name="type" value="{{ $type }}">
        <!-- <button type="submit">Pay Now</button> -->

        <!-- new code -->
        <!-- <input type="hidden" name="order_id" value="{{ $orderId }}">
        <input type="hidden" name="order_sms_id" value="{{ $orderSmsId }}">
        <input type="hidden" name="order_service_id" value="{{ $orderServiceId }}">
        <input type="hidden" name="order_biometric_id" value="{{ $orderBiometricId }}">
        <input type="hidden" name="type" value="{{ $type }}">
        <input type="hidden" id="razorpay_payment_id" name="razorpay_payment_id" value="">
        <input type="hidden" id="razorpay_signature" name="razorpay_signature" value=""> -->
    </form>

    <!-- new code -->
    <!-- <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            var options = {
                key: "{{ $keyId }}",
                amount: "{{ $amount }}", // Amount in paisa
                currency: "INR",
                name: "ERP EduCare",
                description: "Razorpay",
                // image: "https://educarestudy-bucket.s3.amazonaws.com/demo/images/school_78/jMuug70MoTKzRIgFdSnOBYrt0vqWRqFKTpL8rhUe.png",
                handler: function(response) {
                    // Set Razorpay response data to hidden form fields
                    $('#razorpay_payment_id').val(response.razorpay_payment_id);
                    $('#razorpay_signature').val(response.razorpay_signature);

                    // Submit the form
                    $('form#razorpay_form').submit();
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open(); // Open Razorpay modal programmatically
        });
    </script> -->

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $("form#razorpay_form").submit();
        });
    </script>
</body>

</html>