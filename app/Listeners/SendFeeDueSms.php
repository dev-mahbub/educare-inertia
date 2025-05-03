<?php

namespace App\Listeners;

use App\Events\FeeDueSms;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Http\Controllers\MessageTextLocalController;

class SendFeeDueSms
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FeeDueSms $event): void
    {
        // Send the SMS and capture the response
        $response = (new MessageTextLocalController)->sendSms($event->numbers, $event->message, $event->sender);

        // response data
        $responseData = $response->getData(true);

        // Check if the response is successful, assuming `status` field or similar is used
        if (!$responseData || $responseData['success'] == false || $responseData['data']['status'] != 'success') {
            // Throw an exception if the SMS sending failed
            throw new \Exception('Failed to send SMS: ' . ($responseData['error'][0]['message'] ?? 'Unknown error'));
        }
    }
}
