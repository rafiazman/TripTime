<?php

namespace App\Events;

use App\Http\Resources\TravelResource;
use App\Travel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewTripTravel implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $travel;

    /**
     * Create a new event instance.
     *
     * @param Travel $travel
     */
    public function __construct(Travel $travel)
    {
        $this->travel = $travel;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channelName = 'trip.' . $this->travel->trip->id . '.markers';
        return new PrivateChannel($channelName);
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'travel' => new TravelResource($this->travel)
        ];
    }
}
