<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Events\LiveChatEvent;
use App\Events\MessageSent;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LiveChatController extends Controller
{
    public function __construct() {
        // do something
    }

    /**
     * create event
     */
    public function chat(User $user): Response
    {
        $messages = ChatMessage::with(['sender', 'receiver'])
            ->whereIn('sender_id', [Auth::id(), $user->id])
            ->whereIn('receiver_id', [Auth::id(), $user->id])
            ->get();

        return Inertia::render('LiveChat/Chat', [
            'messages' => $messages,
            'receiver_id' => $user->id
        ]);
    }

    /**
     * create event
     */
    public function saveChat(Request $request)
    {
        if($request->receiver_id) {
            $user = User::find($request->receiver_id);
            $message = ChatMessage::create([
                'school_id' => getUserSchoolId(),
                'sender_id' => Auth::id(),
                'receiver_id' => $request->receiver_id,
                'text' => $request->message,
            ]);
            //event(new MessageSent($user, $message));
            broadcast(new MessageSent($user, $message))->toOthers();

            $data = [
                'success' => true,
                'data' => $message
            ];
        }
        else {
            $message = [
                'school_id' => getUserSchoolId(),
                'sender_id' => Auth::id(),
                'receiver_id' => null,
                'text' => null,
            ];

            $data = [
                'success' => false,
                'data' => $message
            ];
        }
        
        return response()->json($data);
        
    }

    
}
