<?php

namespace App\Http\Controllers;

use Log;
use Session;
use Exception;
use Carbon\Carbon;
use App\Enums\Status;
use Razorpay\Api\Api;
use Illuminate\View\View;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Enums\FeeInstallmentType;
use App\Enums\OrderPaymentStatus;
use Illuminate\Support\Facades\DB;
use App\Enums\WalletTransactionType;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use Illuminate\Support\Facades\Config;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IInvoiceRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\IServiceOrderRepository;
use App\Repositories\IBackDateStaffRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IStudentFeeVoucherAmountRepository;


class RazorpayController extends Controller
{
    private $_KeyId;
    private $_KeySecret;
    private static $configs = [];

    public function __construct(
        private IServiceOrderRepository $serviceOrderRepository,
        private IInvoiceRepository $invoiceRepository,
        private IStudentRepository $studentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IStaffRepository $staffRepository,
        private IBackDateStaffRepository $backDateStaffRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IStudentFeeVoucherAmountRepository $studentFeeVoucherAmountRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IFeePaymentRepository $feePaymentRepository,
    ) {
        // Check if Razorpay config has already been set
        if (!isset(self::$configs['razorpay'])) {
            $this->setPaymentConfiguration();
        }

        $this->_KeyId = config('services.razorpay.key', env('RAZORPAY_API_KEY'));
        $this->_KeySecret = config('services.razorpay.secret', env('RAZORPAY_API_SECRET'));

        // $this->_KeyId = 'rzp_test_2wcAwwXlw8rvtF';
        // $this->_KeySecret = 'URkcmgIANIzpMH7gJJwP7cli';
    }

    /**
     * Process Payment
     *
     * @param Request $request
     *
     */
    public function processPayment(Request $request)
    {
        DB::beginTransaction();

        try {
            $input = $request->all();

            $serviceOrder = null;
            $type = $input['type'] ?? '';
            $amount = 0;
            $invoiceIds = [];
            $feePaymentMethodId = null;
            $studentId = null;

            if (in_array($type, ['sms', 'service', 'biometric'])) {
                // create service order
                $serviceOrder = $this->createServiceOrder($input);

                $amount = $serviceOrder->payable_amount ?? 0;
            } else if ($type == 'invoice') {
                $invoiceIds = $input['invoice_ids'] ?? [];
                $amount = $input['amount'] ?? 0;
            } else if ($type == 'fee') {
                // save fee payment
                $feePaymentMethod = $this->saveFeePayment($input);
                $feePaymentMethodId = $feePaymentMethod?->id;

                $amount = $input['amount'] ?? 0;
                $studentId = $input['student_id'] ?? null;
            }

            $api = new Api($this->_KeyId, $this->_KeySecret);
            $order = $api->order->create([
                'receipt'         => 'order_rcptid_' . rand(),
                'amount'          => $amount * 100, // Amount in paisa
                'currency'        => 'INR',
                'payment_capture' => 1 // Auto capture payment
            ]);

            // Commit the transaction if everything goes correctly
            DB::commit();

            return response()->json([
                'success' => true,
                'orderId' => $order->id,
                'amount' => $order->amount,
                'currency' => $order->currency,
                'keyId' => $this->_KeyId,
                'service_order_id' => $serviceOrder?->id,
                'type' => $type,
                'invoice_ids' => $invoiceIds,
                'fee_payment_method_id' => $feePaymentMethodId,
                'student_id' => $studentId
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if any error occurs
            DB::rollBack();

            // Handle general exceptions
            Log::error('Unexpected Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
            ], 500);
        }
    }

    /**
     * Payment Callback
     *
     * @param Request $request
     *
     */
    public function paymentCallback(Request $request)
    {
        $input = $request->all();

        $type = $input['type'];
        $serviceOrderId = $input['service_order_id'] ?? null;
        $feePaymentMethodId = $input['fee_payment_method_id'] ?? null;
        $studentId = $input['student_id'] ?? null;
        $invoiceIds = $input['invoice_ids'] ?? [];

        // Ensure payment ID exists and process the payment
        if (empty($input['razorpay_payment_id'])) {
            return $this->handleError('Invalid payment request', $type, $serviceOrderId, '', $feePaymentMethodId, $studentId);
        }

        $razorPaymentId = $input['razorpay_payment_id'];

        try {
            // Initialize Razorpay API client with your key and secret
            $api = new Api($this->_KeyId, $this->_KeySecret);

            // Fetch payment details using the Razorpay payment ID
            $payment = $api->payment->fetch($razorPaymentId);

            // Check if payment is already captured
            if ($payment->status == 'captured') {
                return $this->handleSuccess('Payment successful', $type, $serviceOrderId, $razorPaymentId, $invoiceIds, $feePaymentMethodId, $studentId);
            }

            // If payment is authorized, capture it
            if ($payment->status == 'authorized') {
                $response = $payment->capture(['amount' => $payment['amount']]);

                // If capture is successful, update order status and return success
                if ($response->status == 'captured') {
                    return $this->handleSuccess('Payment successful', $type, $serviceOrderId, $razorPaymentId, $invoiceIds, $feePaymentMethodId, $studentId);
                }

                // If capture fails, handle the failure
                return $this->handleError('Payment capture failed', $type, $serviceOrderId, $razorPaymentId, $feePaymentMethodId, $studentId);
            }

            // Handle other payment statuses (e.g., failed, refunded)
            return $this->handleError('Payment is not authorized', $type, $serviceOrderId, $razorPaymentId, $feePaymentMethodId, $studentId);
        } catch (\Exception $e) {
            // Log and handle any exception that occurs during payment processing
            Log::error('Razorpay Payment Capture Error: ' . $e->getMessage());

            return $this->handleError('There was an error processing your payment', $type, null, $razorPaymentId, $feePaymentMethodId, $studentId);
        }
    }

    /**
     * Display the user's profile form.
     */
    public function testForm(Request $request)
    {
        // switch($type) {
        //     case 'sms':

        // }

        $amount = 299 * 100;
        $api = new Api($this->_KeyId, $this->_KeySecret);
        $order = $api->order->create([
            'receipt'         => 'order_rcptid_' . rand(),
            'amount'          => $amount * 100, // Amount in paisa
            'currency'        => 'INR',
            'payment_capture' => 1 // Auto capture payment
        ]);

        return view('razorpay/testform', [
            'amount' => $amount,
            'orderId' => $order->id,
            'keyId' => $this->_KeyId
        ]);
    }


    public function returnSubmission(Request $request)
    {
        $input = $request->all();

        $api = new Api($this->_KeyId, $this->_KeySecret);
        $payment = $api->payment->fetch($input['razorpay_payment_id']);
        if (count($input)  && !empty($input['razorpay_payment_id'])) {
            try {
                $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount' => $payment['amount']));
            } catch (Exception $e) {
                return  $e->getMessage();
            }
            Session::put('success', 'Payment successful');
            return redirect()->back();
        }
    }

    /**
     * Create Service Order
     *
     * @param array $data
     *
     * @return ServiceOrder $serviceOrder
     */
    protected function createServiceOrder(array $data)
    {
        $paybleAmount = $data['amount'] ?? 0;
        $nextSubscriptionNo = $this->serviceOrderRepository->getNextSubscriptionNo();
        $isGstApplicable = $data['is_gst_aplicable'] ?? false;

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'created_by' => auth()->user()->id,
            'type' => $data['type'],
            'payment_method' => $data['payment_method'],
            'quantity' => $data['quantity'] ?? 1,
            'price' => $data['price'] ?? 0,
            'payable_amount' => $paybleAmount,
            'paid_amount' => $paybleAmount,
            'due_amount' => 0,
            'is_gst_aplicable' => $isGstApplicable,
            'gst_value' => $isGstApplicable == true ? $data['gst_value'] ?? 0 : 0,
            'gst_amount' => $isGstApplicable == true ? $data['gst_amount'] ?? 0 : 0,
            'service' => $data['service'] ?? null,
            'note' => $data['note'] ?? null,
            'service_type' => $data['service_type'] ?? null,
            'subscription_no' => $nextSubscriptionNo,
            'payment_status' => OrderPaymentStatus::PENDING,
            'status' => Status::PENDING
        ];

        $serviceOrder = $this->serviceOrderRepository->create($dataArray);

        return $serviceOrder;
    }

    /**
     * Update Service Order
     *
     * @param array $data
     *
     * @return void
     */
    protected function updateServiceOrder(string $type, int $id, string $paymentStatus, string $transactionId = '')
    {
        $serviceOrder = $this->serviceOrderRepository->getServiceOrderById($id);

        if ($serviceOrder != null) {
            // update service order status
            $dataArray = [
                'transaction_id' => $transactionId,
                'payment_status' => $paymentStatus == 'success' ? OrderPaymentStatus::PAID : OrderPaymentStatus::FAILED,
                'status' => $paymentStatus == 'success' ? Status::ACTIVE : Status::INACTIVE
            ];

            $updateServiceOrder = $this->serviceOrderRepository->update($id, $dataArray);

            if ($updateServiceOrder && $paymentStatus == 'success') {
                if ($type == 'sms') {
                    // update school sms
                    $this->updateOrCreateSchoolSms($serviceOrder);
                }

                if ($type == 'service') {
                    // create invoice
                    $this->createInvoice($type, $serviceOrder);
                }
            }
        }
    }

    /**
     * update school sms
     *
     * @param object $serviceOrder
     *
     * @return void
     */
    protected function updateOrCreateSchoolSms(object $serviceOrder)
    {
        // school sms
        $schoolSms = $this->serviceOrderRepository->getSchoolSms();

        // update school sms quantity
        $quantity = $serviceOrder->quantity ?? 0;

        if ($schoolSms != null) {
            $this->serviceOrderRepository->updateSchoolSmsQuantity($quantity, 'increment');
        } else {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'total_purchased_sms' => $quantity,
                'available_sms' => $quantity,
                'consumed_sms' => 0
            ];

            $this->serviceOrderRepository->createSchoolSms($dataArray);
        }
    }

    /**
     * create invoice
     *
     * @param string $type
     * @param object $serviceOrder
     *
     * @return void
     */
    protected function createInvoice(string $type, object $serviceOrder)
    {
        $serviceType = $serviceOrder->service_type;
        $nextInvoiceNo = $this->invoiceRepository->getNextInvoiceNo();
        $startDate = Carbon::today();
        $endDate = null;

        if ($serviceType == 'monthly') {
            $startDate = Carbon::today()->startOfMonth();
            // $endDate = $startDate->addMonth()->format('Y-m-d');
            $endDate = Carbon::today()->endOfMonth()->format('Y-m-d');
        } else if ($serviceType == 'yearly') {
            $startDate = Carbon::today()->startOfYear();
            // $endDate = $startDate->addYear()->format('Y-m-d');
            $endDate = Carbon::today()->endOfYear()->format('Y-m-d');
        }

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'created_by' => auth()->user()->id,
            'service_order_id' => $serviceOrder->id,
            'invoice_no' => $nextInvoiceNo,
            'type' => $type,
            'service' => $serviceOrder->service,
            'service_type' => $serviceType,
            'payable_amount' => $serviceOrder->paid_amount ?? 0,
            'paid_amount' => $serviceOrder->paid_amount ?? 0,
            'invoice_description' => $serviceOrder->note,
            'invoice_date' => date('Y-m-d'),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate,
            'paid_date' => date('Y-m-d'),
            'payment_status' => OrderPaymentStatus::PAID,
            'status' => Status::ACTIVE
        ];

        $this->invoiceRepository->create($dataArray);
    }

    /**
     * update service invoice
     *
     * @param array $invoiceIds
     *
     * @return void
     */
    protected function updateServiceInvoice(array $invoiceIds, string $transactionId = '')
    {
        // invoices
        $invoices = $this->invoiceRepository->getDueInvoicesByIds($invoiceIds);

        if (count($invoices) > 0) {

            foreach ($invoices as $invoice) {
                $dueAmount = $invoice->due_amount;

                // update invoice
                $invoiceDataArray = [
                    'payment_status' => OrderPaymentStatus::PAID,
                    'status' => Status::ACTIVE,
                    'paid_date' => date('Y-m-d'),
                    'paid_amount' => $dueAmount,
                    'due_amount' => 0
                ];

                $this->invoiceRepository->update($invoice->id, $invoiceDataArray);

                // update service order
                $serviceDataArray = [
                    'payment_status' => OrderPaymentStatus::PAID,
                    'status' => Status::ACTIVE,
                    'transaction_id' => $transactionId,
                    'paid_amount' => $dueAmount,
                    'due_amount' => 0
                ];

                $this->serviceOrderRepository->update($invoice->service_order_id, $serviceDataArray);
            }
        }
    }

    /**
     * save fee payment
     *
     * @param array $data
     *
     * @return FeePaymentMethod $feePaymentMethod
     */
    public function saveFeePayment(array $data)
    {
        $input = $data;

        try {
            $student = $this->studentRepository->getById($input['student_id']);
            $academicYearId = $student->academic_year_id;

            $student->load(['promotedClassroomRaw' => function ($query) use ($academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId);
                $query->whereNull('classroom_students.academic_year_id_from')
                    ->whereNull('classroom_students.classroom_id_from')
                    ->whereNull('classroom_students.promoted_date_at')
                    ->select(
                        'classrooms.id',
                        'classrooms.class_name_id',
                    );
            }]);

            if ($student?->promotedClassroomRaw != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student->promotedClassroomRaw?->id;
                $student['class_name_id'] = $student->promotedClassroomRaw?->class_name_id;

                unset($student['promotedClassroomRaw']);
            }

            $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber(null, $academicYearId);
            $paymentDate = date('Y-m-d');
            $paymentTimestamp = Carbon::now()->timestamp;
            $currentTimestamp = Carbon::now()->timestamp;
            $allowBackDateSetting = getSiteSettingData('fee_allow_fee_taking_for_back_date', null, $academicYearId);
            $backDateStaff = null;

            if (auth()->check()) {
                $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);

                if ($staff != null) {
                    $backDateStaff = $this->backDateStaffRepository->getBackDateStaffByStaffId($staff->id, null, $academicYearId);
                }
            }

            if (($paymentTimestamp < $currentTimestamp && $allowBackDateSetting?->value == 'Yes' && $backDateStaff == null) || ($paymentTimestamp > $currentTimestamp && $allowBackDateSetting?->value == 'No')) {
                $paymentDate = date('Y-m-d');
            }

            $createdBy = auth()->check() ? auth()->user()->id : null;

            $paymentMethodDataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $academicYearId,
                'created_by' => $createdBy,
                'student_id' => $input['student_id'],
                'payment_mode' => $input['payment_mode'] ?? null,
                'payment_method' => $input['payment_method'] ?? null,
                'payment_date' => $paymentDate,
                'receipt_no' => (int) $nextFeeReceiptNumber,
                'payment_status' => OrderPaymentStatus::PENDING,
                'status' => Status::PENDING,
            );

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled', null, $academicYearId);
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            $feePaymentMethod = $this->feePaymentMethodRepository->create($paymentMethodDataArray);

            if ($receiptNumberEnabaled) {
                $currentSeedNo = getCurrentFeeReceiptSeedNumber(null, $academicYearId);
                setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', $currentSeedNo + 1, null, $academicYearId);
            }

            foreach ($input['fee_installments_array'] as $feeInstallment) {
                if ($feeInstallment['payment_status'] != PaymentStatus::PAID->value) {
                    $due_amount = ($feeInstallment['payable_amount'] - $feeInstallment['paid_amount']) - $feeInstallment['discount_amount'];
                    $payment_status = $due_amount <= 0 ? PaymentStatus::PAID : PaymentStatus::PARTIAL;
                    $fee_id = null;
                    $voucher_id = null;
                    $transport_voucher_id = null;
                    $feeType = $this->feeTypeRepository->getById($feeInstallment['fee_type_id']);

                    if ($feeInstallment['fee_payment_type'] == FeePaymentType::GENERALVOUCHER->value) {
                        $voucher_id = $feeInstallment['fee_id'] ?? null;
                        $classFeeStudentAmount = $this->studentFeeVoucherAmountRepository->getById($feeInstallment['id']);
                    } elseif ($feeInstallment['fee_payment_type'] == FeePaymentType::FEEINSTALLMENT->value) {
                        $fee_id = $feeInstallment['fee_id'] ?? null;

                        if (empty($feeInstallment['id'])) {
                            $classFeeStudentAmount = $this->classFeeStudentAmountRepository->create([
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId,
                                'student_id' => $student->id,
                                'class_name_id' =>  $student->class_name_id,
                                'class_fee_structure_id' => null,
                                'fee_id' => $feeInstallment['fee_id'],
                                'fee_type_id' => $feeType->id,
                                'amount' => $feeInstallment['amount'],
                                'semester' => null,
                                'is_admission_installment' => 0,
                                'is_fee_special' => $feeType->is_fee_special,
                                'status' => Status::PENDING,
                            ]);
                        } else {
                            $classFeeStudentAmount = $this->classFeeStudentAmountRepository->getById($feeInstallment['id']);
                        }
                    }

                    $dataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYearId,
                        'created_by' => $createdBy,
                        'fee_paymentable_type' => $classFeeStudentAmount->getMorphClass(),
                        'fee_paymentable_id' => $classFeeStudentAmount->id,
                        'student_id' => $input['student_id'],
                        'discount_id' => !empty($feeInstallment['discount_id']) ? $feeInstallment['discount_id'] : null,
                        'fee_payment_method_id' => $feePaymentMethod->id,
                        'fee_id' => $fee_id,
                        'student_fee_voucher_id' => $voucher_id,
                        'voucher_id' => $transport_voucher_id,
                        'fee_type_id' => $feeInstallment['fee_type_id'],
                        'amount' => $feeInstallment['payable_amount'],
                        'payable_amount' => $feeInstallment['payable_amount'] - $feeInstallment['discount_amount'],
                        'paid_amount' => $feeInstallment['paid_amount'],
                        'due_amount' => $due_amount,
                        'discount_amount' => $feeInstallment['discount_amount'],
                        'is_fee_due' => $feeInstallment['payment_status'] === PaymentStatus::PARTIAL->value,
                        'fee_payment_type' => $feeInstallment['fee_payment_type'],
                        // 'payment_status' => $payment_status,
                        'payment_status' => PaymentStatus::CANCELLED,
                        'status' => Status::PENDING,
                    );

                    $this->feePaymentRepository->create($dataArray);
                }
            }

            return $feePaymentMethod;
        } catch (\Exception $e) {
            // Handle exceptions
            Log::error('Error: ' . $e->getMessage());
        }
    }

    /**
     * update fee payment
     *
     * @param array $data
     *
     * @return void
     */
    protected function updateFeePayment(string $paymentStatus, int $feePaymentMethodId, int $studentId, string $transactionId = '')
    {
        try {
            $student = $this->studentRepository->getById($studentId);
            $academicYearId = $student->academic_year_id;

            $feePaymentMethod = $this->feePaymentMethodRepository->getFeePaymentMethodById($feePaymentMethodId, null, $academicYearId);

            if ($paymentStatus == 'success') {
                $feePaymentMethod->online_payment_transaction_id = $transactionId ?? null;
                $feePaymentMethod->payment_status = OrderPaymentStatus::SUCCESS;
                $feePaymentMethod->status = Status::ACTIVE;

                if (count($feePaymentMethod->fee_payments) > 0) {
                    // // update payment status
                    // $feePaymentMethod->fee_payments()->update(['status' => Status::ACTIVE]);

                    // debit student wallet
                    $feePaymentMethod->fee_payments->each(function ($feePayment) use ($academicYearId) {
                        $payment_status = $feePayment?->due_amount <= 0 ? PaymentStatus::PAID : PaymentStatus::PARTIAL;

                        // update payment status
                        $feePayment->update([
                            'payment_status' => $payment_status,
                            'status' => Status::ACTIVE,
                        ]);

                        if ($feePayment?->feeType?->fee_type == 'Wallet Amount') {
                            $dataArray = [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId,
                                'student_id' => $feePayment?->student_id,
                                'created_by' => auth()->check() ? auth()->user()->id : null,
                                'fee_payment_id' => $feePayment->id,
                                'transaction_type' => WalletTransactionType::CREDIT,
                                'transaction_date' => date('Y-m-d'),
                                'transaction_mode' => 'fee',
                                'amount' => $feePayment->paid_amount ?? 0,
                                'description' => 'Amount deposited in Wallet',
                                'status' => Status::ACTIVE,
                            ];

                            $this->studentRepository->createStudentWalletTransaction($dataArray);
                        }
                    });
                }
            } else if ($paymentStatus == 'failed') {
                $feePaymentMethod->online_payment_transaction_id = $transactionId ?? null;
                $feePaymentMethod->is_cancelled = true;
                $feePaymentMethod->cancelled_by = auth()->check() ? auth()->user()->id : null;
                $feePaymentMethod->cancellation_date = Carbon::now()->format('Y-m-d');
                $feePaymentMethod->cancel_reason = "Payment failed";
                $feePaymentMethod->payment_status = OrderPaymentStatus::FAILED;
                $feePaymentMethod->status = Status::INACTIVE;

                if (count($feePaymentMethod->fee_payments) > 0) {
                    // update payment status
                    $feePaymentMethod->fee_payments()->update([
                        'payment_status' => PaymentStatus::CANCELLED,
                        'status' => Status::INACTIVE,
                    ]);
                }
            }

            $feePaymentMethod->save();
        } catch (\Exception $e) {
            // Handle exceptions
            Log::error('Error: ' . $e->getMessage());
        }
    }

    protected function handleSuccess(string $message, string $type, int $serviceOrderId = null, string $transactionId = '', array $invoiceIds = [], int $feePaymentMethodId = null, int $studentId = null)
    {
        // update the service order status
        if ($serviceOrderId != null && in_array($type, ['sms', 'service', 'biometric'])) {
            $this->updateServiceOrder($type, $serviceOrderId, 'success', $transactionId);
        } else if ($type == 'invoice' && !empty($invoiceIds)) {
            // update service invoice status
            $this->updateServiceInvoice($invoiceIds, $transactionId);
        } else if ($type == 'fee' && !empty($feePaymentMethodId) && !empty($studentId)) {
            $this->updateFeePayment('success', $feePaymentMethodId, $studentId, $transactionId);
        }

        $redirectRoutes = [
            'sms' => 'sms.credit',
            'service' => 'our_service.my_subscription',
            'biometric' => 'our_service.buy_biometric',
            'invoice' => 'our_service.unpaid_invoice',
            'fee' => 'fee_online_payment.index',
        ];

        // return redirect response
        if (empty($redirectRoutes[$type])) {
            return redirect()->back()->with('message', $message);
        }

        return redirect()->route($redirectRoutes[$type])->with('message', $message);

        // return success response
        // return response()->json([
        //     'success' => true,
        //     'message' => $message,
        //     'redirect_url' => $redirectRoutes[$type]
        // ]);
    }

    protected function handleError(string $message, string $type, int $serviceOrderId = null, string $transactionId = '', int $feePaymentMethodId = null, int $studentId = null)
    {
        // update the service order status
        if ($serviceOrderId != null && in_array($type, ['sms', 'service', 'biometric'])) {
            $this->updateServiceOrder($type, $serviceOrderId, 'failed', $transactionId);
        } else if ($type == 'fee' && !empty($feePaymentMethodId) && !empty($studentId)) {
            $this->updateFeePayment('failed', $feePaymentMethodId, $studentId, $transactionId);
        }

        // return redirect response
        return redirect()->back()->with('error', $message);

        // return error response
        // return response()->json([
        //     'success' => false,
        //     'message' => $message,
        // ], 500);
    }

    /** set razorpay payment configuration
     *
     * @return void
     */
    protected function setPaymentConfiguration()
    {
        // fetch razorpay settings from the database
        $razorpayKey = getPaymentGatewaySettingByKey('razorpay_key_id')?->value ?? '';
        $razorpaySecret = getPaymentGatewaySettingByKey('razorpay_key_secret')?->value ?? '';

        // set razorpay configuration
        Config::set('services.razorpay.key', $razorpayKey ?? env('RAZORPAY_API_KEY'));
        Config::set('services.razorpay.secret', $razorpaySecret ?? env('RAZORPAY_API_SECRET'));

        // Mark Razorpay configuration as set
        self::$configs['razorpay'] = true;
    }
}
