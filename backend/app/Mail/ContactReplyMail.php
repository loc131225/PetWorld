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
            ->html('
                <html>
                    <body>
                        <h2>Xin chào ' . e($this->contact->name) . ',</h2>
                        <p>Cảm ơn bạn đã liên hệ với chúng tôi.</p>
                        <p>Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                        <p>Trân trọng,<br>Đội ngũ Pet World</p>
                    </body>
                </html>
            ');
    }
}

