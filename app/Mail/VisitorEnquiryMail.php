<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VisitorEnquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The visitor enquiry data.
     *
     * @var array
     */

    public $visitorEnquiryData;

    /**
     * Create a new message instance.
     */
    public function __construct($visitorEnquiryData)
    {
        $this->visitorEnquiryData = $visitorEnquiryData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Visitor Enquiry Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.visitor.enquiry',
            with: ['visitorEnquiryData' => $this->visitorEnquiryData],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
