<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Webmessage;

class WebmessageRepository implements IRepository, IWebmessageRepository
{
    public function getAll()
    {
        return Webmessage::all();
    }

    public function getById($id)
    {
        return Webmessage::findOrFail($id);
    }

    public function show($id, $userId = null)
    {
        $message = Webmessage::with(['sender', 'recipients'])
            ->whereHas('recipients', function ($query) use( $userId ) {
                $query->where('user_id', $userId);
            })
            ->findOrFail($id);

        // Mark as read if the authenticated user is a recipient
        return $message->recipients()->updateExistingPivot($userId, ['read_at' => now()]);
    }

    public function delete($id)
    {
        Webmessage::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Webmessage::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Webmessage::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $userId = null)
    {
        return Webmessage::with(['sender', 'recipients'])
            ->where('sender_id', $userId)
            ->orWhereHas('recipients', function ($query) use( $userId ) {
                $query->where('user_id', $userId);
            })
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }


    public function getActiveAllDataForInbox($schoolId = null, $userId = null, $startDate = null, $endDate = null, $search = null)
    {
        return Webmessage::with(['sender', 'recipients'])
        ->where('status', Status::ACTIVE)
        ->where('school_id', ($schoolId !== null) ? $schoolId : getUserSchoolId())
        ->whereHas('recipients', function ($query) use( $userId ) {
            $query->where('user_id', $userId);
        })
        ->where(function ($query) use ($startDate, $endDate, $search) {
            if (!empty($startDate) && !empty($endDate)) {
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }
            if (!empty($search)) {
                $query->where('subject', 'like', '%' . $search . '%')
                    ->orWhere('body', 'like', '%' . $search . '%');
            }
        })
        
        ->get();
    }


    public function getMessageInbox($schoolId = null, $userId = null)
    {
        return Webmessage::with(['sender', 'recipients'])
            ->whereHas('recipients', function ($query) use( $userId ) {
                $query->where('user_id', $userId);
            })
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }

    public function getMessageSent($schoolId = null, $userId = null)
    {
        return Webmessage::with(['sender', 'recipients'])
            ->where('sender_id', $userId)
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }

    

    public function getRegisterAll()
    {
        return Webmessage::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }
}