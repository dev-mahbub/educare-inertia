<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\VisitorEnquiry;
use App\Models\VisitorEnquiryDetail;

class VisitorEnquiryRepository implements IRepository, IVisitorEnquiryRepository
{
    public function getAll()
    {
        return VisitorEnquiry::all();
    }

    public function getById($id)
    {
        return VisitorEnquiry::findOrFail($id);
    }

    public function delete($id)
    {
        VisitorEnquiry::destroy($id);
    }

    public function create(array $arrayData)
    {
        return VisitorEnquiry::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return VisitorEnquiry::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return VisitorEnquiry::where('status', Status::ACTIVE)
            ->with(['enquiryType' => function ($query) {
                $query->select('id', 'title');
            }])
            ->select('id', 'visitor_enquiry_type_id', 'name', 'email', 'phone', 'visitor_photo', 'enquiry_date','address', 'status','created_at')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getActiveAllWithFilter($search = null, $start_date = null, $end_date = null)
    {
        $query = VisitorEnquiry::where('status', Status::ACTIVE)
            ->with(['enquiryType' => function ($query) {
                $query->select('id', 'title');
            }])
            ->select('id', 'visitor_enquiry_type_id', 'name', 'email', 'phone', 'visitor_photo', 'enquiry_date','address', 'status','created_at', 'enquiry_date', 'enquiry_message')
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            });
        }

        if ($start_date) {
            $query->whereDate('enquiry_date', '>=', $start_date);
        }

        if ($end_date) {
            $query->whereDate('enquiry_date', '<=', $end_date);
        }

        return $query->get();
    }

    public function getRegisterAll()
    {
        return VisitorEnquiry::where('status', Status::ACTIVE);
    }
    
    /**
     * Save activity
     */
    public function saveActivity(array $arrayData)
    {
        return VisitorEnquiryDetail::create($arrayData);
    }
}