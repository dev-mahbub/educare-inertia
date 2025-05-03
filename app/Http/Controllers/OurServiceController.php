<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Razorpay\Api\Api;
use App\Enums\HolidayType;
use App\Enums\SmsQuantity;
use Illuminate\Http\Request;
use App\Repositories\IHolidayRepository;
use App\Repositories\IInvoiceRepository;
use App\Repositories\IServiceOrderRepository;

class OurServiceController extends Controller
{
    // private $_KeyId;
    // private $_KeySecret;

    public function __construct(
        private IServiceOrderRepository $serviceOrderRepository,
        private IInvoiceRepository $invoiceRepository,
        private IHolidayRepository $holidayRepository
    ) {
        $this->middleware('permission:view buy services', ['only' => [
            'paidInvoice',
            'buyService',
            'mySubscription',
            'buyBiometric'
        ]]);
        $this->middleware('permission:view billing', ['only' => ['unpaidInvoice']]);
        $this->middleware('permission:view buy sms', ['only' => ['buySms']]);

        // $this->_KeyId = 'rzp_test_2wcAwwXlw8rvtF';
        // $this->_KeySecret = 'URkcmgIANIzpMH7gJJwP7cli';
    }

    /**
     * Display the unpaid invoice.
     */
    public function unpaidInvoice(): Response
    {
        // due invoices
        $dueInvoices = $this->invoiceRepository->getDueServiceInvoices();

        if (count($dueInvoices) > 0) {
            $dueInvoices = $dueInvoices->map(function ($invoice) {
                $invoice['invoice_date'] = !empty($invoice->invoice_date) ? Carbon::parse($invoice->invoice_date)->format('d-M-Y') : '';

                return $invoice;
            });
        }

        return Inertia::render('OurService/UnpaidInvoice', [
            'dueInvoices' => $dueInvoices
        ]);
    }

    /**
     * Display the paid invoice.
     */
    public function paidInvoice(): Response
    {
        // paid invoices
        $paidInvoices = $this->invoiceRepository->getPaidServiceInvoices();

        if (count($paidInvoices) > 0) {
            $paidInvoices = $paidInvoices->map(function ($invoice) {
                $invoice['invoice_date'] = !empty($invoice->invoice_date) ? Carbon::parse($invoice->invoice_date)->format('d-M-Y') : '';

                return $invoice;
            });
        }

        return Inertia::render('OurService/PaidInvoice', [
            'paidInvoices' => $paidInvoices
        ]);
    }

    /**
     * Display the buy service.
     */
    public function buyService(): Response
    {
        // services
        $services = array_values(getServices());

        // gst value
        $gstValue = 18;

        return Inertia::render('OurService/BuyService', [
            'services' => $services,
            'gstValue' => $gstValue
        ]);
    }

    /**
     * Display the buy sms.
     */
    public function buySms(Request $request): Response
    {
        // sms price
        $smsPrice = 22;

        // sms quantities
        $smsQuantitiesOptions = [];

        foreach (SmsQuantity::cases() as $case) {
            array_push($smsQuantitiesOptions, [
                'id' => $case->value,
                'title' => $case->value,
                'sms_price' => $smsPrice,
                'amount' => ($case->value * $smsPrice) / 100
            ]);
        }

        // $amount = 299 * 100;
        // $api = new Api($this->_KeyId, $this->_KeySecret);

        // if (!empty($request->selectedSmsQuantities?->amount)) {
        //     $order = $api->order->create([
        //         'receipt'         => 'order_rcptid_' . rand(),
        //         'amount'          => $request->selectedSmsQuantities?->amount, // Amount in paisa
        //         'currency'        => 'INR',
        //         'payment_capture' => 1 // Auto capture payment
        //     ]);
        // }

        return Inertia::render('OurService/BuySms', [
            'smsQuantities' => $smsQuantitiesOptions,
            // 'selectedSmsQuantities' => !empty($request->selectedSmsQuantities) ? $request->selectedSmsQuantities : [],
            // 'orderId' => !empty($order->id) ? $order->id : null,
            // 'keyId' => $this->_KeyId,
            // 'amount' => $amount
        ]);
    }

    /**
     * Display my subscriptions
     */
    public function mySubscription(): Response
    {
        // service orders
        $subscriptions = $this->serviceOrderRepository->getActiveServiceOrdersByType('service');

        if (count($subscriptions) > 0) {
            $subscriptions = $subscriptions->map(function ($subscription) {
                $service = getServiceByKey($subscription->service);

                $subscription['service_name'] = !empty($service['title']) ? $service['title'] : '';
                $subscription['service_type'] = !empty($subscription->service_type) ? ucfirst($subscription->service_type) : '';

                return $subscription;
            });
        }

        return Inertia::render('OurService/MySubscription', [
            'subscriptions' => $subscriptions
        ]);
    }

    /**
     * Display the paid invoice.
     */
    public function buyBiometric(Request $request): Response
    {
        $holidays = $this->holidayRepository->getActiveAll();
        $holiday_types = HolidayType::cases();
        $types = array();

        foreach ($holiday_types as $type) {
            array_push($types, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('OurService/BuyBiometric', [
            'holidays' => $holidays,
            'holiday_types' => $types
        ]);
    }
}
