<?php

namespace App\Mail;

use App\Helpers\Formatter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Storage;

class Paid extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var string|null
     */
    private $file;

    /**
     * @param string|null $file
     */
    public function __construct(?string $file = null)
    {
        $this->file = $file;
    }

    /**
     * @return Paid
     * @throws FileNotFoundException
     */
    public function build()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $message = $this
            ->subject(
                __(
                    'Your order from :order_date',
                    ['order_date' => Formatter::dateFormat(date('Y-m-d'))]
                )
            )
            ->markdown('emails.orders.paid', ['order' => []]);

        if (empty($this->file) || !$storage->exists($this->file)) {
            return $message;
        }

        $message->attachData(
            decrypt($storage->get($this->file)),
            Str::ucfirst(Str::slug(__('Invoice').' ')).'sample.pdf',
            ['mime' => 'application/pdf']
        );

        return $message;
    }
}
