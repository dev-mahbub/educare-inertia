<?php

namespace App\Jobs;

use App\Services\MailService;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\StudentBirthdayNotificationMail;

class studentBirthdayNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private $parrntsMails, private $message)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(MailService $mailService): void
    {
        foreach ($this->parrntsMails as $parentEmail) {
            $mailService->sendMail(
                $parentEmail, 
                new StudentBirthdayNotificationMail($this->message)
            );
        }
    }
}
