<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Api\ControllerApi;
use App\Http\Controllers\Library\TextlocalClass;
use Illuminate\Http\Request;
use Exception;

class MessageTextLocalApiController extends ControllerApi
{
    private $_apiKey;
    private $textlocalObj;
    public function __construct() {
        $this->_apiKey = urlencode('Njc3NDZmNGQzNzMzMzI2MjMwNGM2ZDQ5NTY2NjVhNzc=');
        $this->textlocalObj = new TextlocalClass('dev@indianainfotech.com', 'Dev@1997');
    }

    /* */

    public function sendSmsRaw(Request $request)
    {
        if ( !empty($request->numbers) && !empty($request->message) && !empty($request->sender) ) { 
            //dd($request);
            //$numbers = @implode(',', $request->numbers);
            // Prepare data for POST request
            $data = array(
                'apikey' => $this->_apiKey, 
                'numbers' => $request->numbers, 
                "sender" => urlencode($request->sender), 
                "message" => rawurlencode($request->message)
            );
        
            // Send the POST request with cURL
            $ch = curl_init('https://api.textlocal.in/send/');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($ch);
            curl_close($ch);

            $responseData = json_decode($response);              
            if($responseData->status == 'failure') {
                return response()->json([
                    'success' => false,
                    'error' => $responseData->errors
                ], 200);
            }
            elseif($responseData->status == 'success') {
                return response()->json([
                    'success' => true,
                    'data' => $responseData
                ], 200);
            }
            else {
                // Process your response here
                echo $response;
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }
    
    public function sendSms(Request $request)
    {
        if ( !empty($request->numbers) && !empty($request->message) && !empty($request->sender) ) { 
            try {
                $result = $this->textlocalObj->sendSms([$request->numbers], $request->message, $request->sender);
                return response()->json([
                    'success' => true,
                    'data' => $result
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }
}