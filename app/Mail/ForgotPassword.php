<?php

namespace App\Mail;

use App\Helpers\Formatter;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use URL;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Order
     */
    private $token;

    /**
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * @return ForgotPassword
     */
    public function build()
    {
        return $this
            ->subject(__('Forgot Your Password!'))
            ->markdown('emails.accounts.forgot-password', [
                'token' => $this->token,
            ]);
    }
}
