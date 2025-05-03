<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use PaytmWallet;

class PaytmController extends Controller
{

  public function payForm(Request $request)
  {
    return view('paytm/paytm');
    // return Inertia::render('Paytm/TestForm', [
    // ]);
  }

    /**
     * Redirect the user to the Payment Gateway.
     *
     * @return Response
     */
    public function pay(Request $request)
    {
        $payment = PaytmWallet::with('receive');

        $payment->prepare([
          'order' => "1712499840_".rand(1000, 9999),
          'user' => 1,
          'mobile_number' => '+8801712499840',
          'email' => 'nasir.chalo@gmail.com',
          'amount' => 99,
          'callback_url' => route('paytm.payment_callback')
        ]);
        return $payment->receive();  // initiate a new payment
    }

    

    /**
     * Obtain the payment information.
     *
     * @return Object
     */
    public function paymentCallback()
    {
      $transaction = PaytmWallet::with('receive');

      $response = $transaction->response();
      
      $order_id = $transaction->getOrderId(); // return a order id
    
      $transaction->getTransactionId(); // return a transaction id
  
      // update the db data as per result from api call
      if ($transaction->isSuccessful()) {
          dd('Success!');

      } else if ($transaction->isFailed()) {
        dd('Failed!');
          
      } else if ($transaction->isOpen()) {
        dd('process!');
      }
      $transaction->getResponseMessage(); //Get Response Message If Available
      
      // $transaction->getOrderId(); // Get order id
    }  
    
    
    /**
     * Redirect the user to the Payment Gateway.
     *
     * @return Response
     */
    public function orderView()
    {
        $payment = PaytmWallet::with('receive');
        $payment->prepare([
          'order' => 1001,
          'user' => 1,
          'mobile_number' => '+8801712499840',
          'email' => 'nasir.chalo@gmail.com',
          'amount' => 99,
          'callback_url' => 'https://educare-inertia.test/paytm/redirect'
        ]);
        return $payment->view('paytm/redirect_payment')->receive();
    }
    
    /**
    * Obtain the transaction status/information.
    *
    * @return Object
    */
    public function statusCheck() {
        $status = PaytmWallet::with('status');
        $status->prepare(['order' => 1001]);
        $status->check();
        
        $response = $status->response(); // To get raw response as array
        //Check out response parameters sent by paytm here -> http://paywithpaytm.com/developer/paytm_api_doc?target=txn-status-api-description
        
        if($status->isSuccessful()){
          //Transaction Successful
        }else if($status->isFailed()){
          //Transaction Failed
        }else if($status->isOpen()){
          //Transaction Open/Processing
        }
        $status->getResponseMessage(); //Get Response Message If Available
        //get important parameters via public methods
        $status->getOrderId(); // Get order id
        $status->getTransactionId(); // Get transaction id
    }

    /**
    * Initiate refund.
    *
    * @return Object
    */
    public function refund() {
        $refund = PaytmWallet::with('refund');
        $refund->prepare([
            'order' => $order->id,
            'reference' => "refund-order-4", // provide refund reference for your future reference (should be unique for each order)
            'amount' => 300, // refund amount 
            'transaction' => $order->transaction_id // provide paytm transaction id referring to this order 
        ]);
        $refund->initiate();
        $response = $refund->response(); // To get raw response as array
        
        if($refund->isSuccessful()){
          //Refund Successful
        }else if($refund->isFailed()){
          //Refund Failed
        }else if($refund->isOpen()){
          //Refund Open/Processing
        }else if($refund->isPending()){
          //Refund Pending
        }
    }

    /**
    * Initiate refund.
    *
    * @return Object
    */
    public function refundStatus() {
        $refundStatus = PaytmWallet::with('refund_status');
        $refundStatus->prepare([
            'order' => $order->id,
            'reference' => "refund-order-4", // provide reference number (the same which you have entered for initiating refund)
        ]);
        $refundStatus->check();
        
        $response = $refundStatus->response(); // To get raw response as array
        
        if($refundStatus->isSuccessful()){
          //Refund Successful
        }else if($refundStatus->isFailed()){
          //Refund Failed
        }else if($refundStatus->isOpen()){
          //Refund Open/Processing
        }else if($refundStatus->isPending()){
          //Refund Pending
        }
    }
}