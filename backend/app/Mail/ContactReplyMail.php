<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contact;

    public function __construct($contact)
    {
        $this->contact = $contact;
    }

    public function build()
    {
        return $this->subject('Cảm ơn bạn đã liên hệ với Pet World')
            ->view('emails.contact_reply')
            ->with([
                'name' => $this->contact->name,
            ]);
    }
}

