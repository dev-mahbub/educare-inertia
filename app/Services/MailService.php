<?php

namespace App\Services;

use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class MailService
{
    /**
     * Send email.
     *
     * @param mix $recipient
     * @param Mailable $mailable
     * @return void
     */
    public function sendMail($recipient, Mailable $mailable)
    {
        // set the mail configuration
        $this->setMailConfiguration();

        // send mail
        Mail::to($recipient)->send($mailable);
    }

    /**
     * Set mail configuration.
     *
     * @return void
     */
    public function setMailConfiguration()
    {
        // fetch mail settings from database
        $mailSettings = getMailConfigSettings();

        // set mail configuration
        Config::set('mail.mailers.smtp.host', $mailSettings['mail_smtp_host'] ?? env('MAIL_HOST'));
        Config::set('mail.mailers.smtp.port', $mailSettings['mail_smtp_port'] ?? env('MAIL_PORT'));
        Config::set('mail.mailers.smtp.encryption', $mailSettings['mail_smtp_encryption'] ?? env('MAIL_ENCRYPTION'));
        Config::set('mail.mailers.smtp.username', $mailSettings['mail_smtp_username'] ?? env('MAIL_USERNAME'));
        Config::set('mail.mailers.smtp.password', $mailSettings['mail_smtp_password'] ?? env('MAIL_PASSWORD'));
    }
}
