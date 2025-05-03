<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\School;
use App\Models\SupportTicket;

class SupportTicketRepository implements IRepository, ISupportTicketRepository
{
    public function getAll()
    {
        return SupportTicket::all();
    }

    public function getById($id)
    {
        return SupportTicket::findOrFail($id);
    }

    public function delete($id)
    {
        SupportTicket::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SupportTicket::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SupportTicket::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SupportTicket::where('status', Status::ACTIVE)
        ->with(['student' => function ($query) {
            $query->with('father');
            $query->select('id', 'first_name', 'last_name');
        }, 'classroom:id,title', 'assignedTo:id,first_name,middle_name,last_name'])
        ->select(
            'id', 
            'details',
            'status', 
            'follow_up_date', 
            'parent_name', 
            'student_name', 
            'parent_phone', 
            'request_type', 
            'request_date', 
            'solution_note', 
            'previous_solution_note', 
            'solution_status', 
            'assigned_to', 
            'student_id', 
            'classroom_id', 
            'created_by'
            )
        ->get();
    }
    
    public function getActiveAllWithFilter($request_type = "", $assign_to = null, $month = "", $start_date = "", $end_date = "", $solution_status = "")
    {
        return SupportTicket::where('status', Status::ACTIVE)
        ->with(['student' => function ($query) {
            $query->with('father');
            $query->select('id', 'first_name', 'last_name');
        }, 'classroom:id,title', 'assignedTo:id,first_name,middle_name,last_name'])
        ->select(
            'id', 
            'details',
            'status', 
            'follow_up_date', 
            'parent_name', 
            'student_name', 
            'parent_phone', 
            'request_type', 
            'request_date', 
            'solution_note', 
            'previous_solution_note', 
            'solution_status', 
            'assigned_to', 
            'student_id', 
            'classroom_id', 
            'created_by'
            )
        ->when($request_type, function ($query) use ($request_type) {
            return $query->where('request_type', $request_type);
        })
        ->when($assign_to, function ($query) use ($assign_to) {
            return $query->where('assigned_to', $assign_to);
        })
        ->when($solution_status, function ($query) use ($solution_status) {
            return $query->where('solution_status', $solution_status);
        })
        ->when($start_date, function ($query) use ($start_date, $end_date) {
            return $query->whereBetween('created_at', [$start_date, $end_date]);
        })
        ->get();
    }

    public function getCurrentSupportTicket(int $id)
    {
        return SupportTicket::where('id', $id)
        ->with(['student' => function ($query) {
            $query->with('father');
            $query->select('id', 'first_name', 'last_name');
        }, 'classroom:id,title', 'assignedTo:id,first_name,middle_name,last_name'])
        ->select(
            'id', 
            'details',
            'status', 
            'follow_up_date', 
            'parent_name', 
            'student_name', 
            'parent_phone', 
            'request_type', 
            'request_date', 
            'solution_note', 
            'previous_solution_note', 
            'solution_status', 
            'assigned_to', 
            'student_id', 
            'classroom_id', 
            'created_by'
            )
        ->first();
    }

    public function getActiveAllByRequestType(string $request_type)
    {
        return SupportTicket::where('status', Status::ACTIVE)
        ->where('request_type', $request_type)
        ->with(['student' => function ($query) {
            $query->with('father');
            $query->select('id', 'first_name', 'last_name');
        }, 'classroom:id,title', 'assignedTo:id,first_name,middle_name,last_name'])
        ->select(
            'id', 
            'details',
            'status', 
            'follow_up_date', 
            'parent_name', 
            'student_name', 
            'parent_phone', 
            'request_type', 
            'request_date', 
            'solution_note', 
            'previous_solution_note', 
            'solution_status', 
            'assigned_to', 
            'student_id', 
            'classroom_id', 
            'created_by'
            )
        ->get();
    }

    public function getRegisterAll()
    {
        return SupportTicket::where('status', Status::ACTIVE);
    }
}