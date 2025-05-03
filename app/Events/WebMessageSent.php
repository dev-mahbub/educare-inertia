<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WebMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $recipientIds;
    public $message;

    public function __construct($recipientIds, $message)
    {
        $this->recipientIds = $recipientIds;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // if (!is_array($this->recipientIds))  {
        //     $this->recipientIds = [$this->recipientIds];
        // }

        // return collect($this->recipientIds)->map(function ($id) {
        //     return new PrivateChannel("webmessage.user.{$id}");
        // })->toArray();

        return [new PrivateChannel("webmessage.user.1592")];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'message' => $this->message,
        ];
    }

    public function broadcastAs(): string
    {
        return 'WebMessageSent';
    }
}
