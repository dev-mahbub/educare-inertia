<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Http\Controllers\MessageTextLocalController;

class TeacherBirthdaySmsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private $teachersSmsPhone, private $message)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->teachersSmsPhone as $teacherSmsPhone) {
            // send sms to parent
            $number = $teacherSmsPhone ?? '';
            // $message = $request->message_content ?? '';
            $message = 'Test Nasir';
            $sender = getSiteSettingDataByTypeAndKey('SMS', 'sms_sender_id')?->value ?? '';
            // Send the SMS and capture the response
            $response = (new MessageTextLocalController)->sendSms($number, $message, $sender);

            // response data
            $responseData = $response->getData(true);
    
            // Check if the response is successful, assuming `status` field or similar is used
            if (!$responseData || $responseData['success'] == false) {
                // Throw an exception if the SMS sending failed
                throw new \Exception('Failed to send SMS: ' . ($responseData['error'][0]['message'] ?? 'Unknown error'));
            }

        }
    }
}
