<?php

namespace App\Listeners;

use Illuminate\Mail\Events\MessageSending;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\MailsLog;

class LogSentMessage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MessageSending  $event
     * @return void
     */
    public function handle(MessageSending $event)
    {
        $maillog = new MailsLog;
        $maillog->message_id = $event->message->getId();
        $maillog->to = implode(',', array_keys($event->message->getTo()));
        $maillog->send_at = date('Y-m-d H:i:s');
        $maillog->save();
    }
}
