<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SchoolSms;
use App\Enums\PaymentStatus;
use App\Models\ServiceOrder;
use Illuminate\Support\Facades\DB;

class ServiceOrderRepository implements IRepository, IServiceOrderRepository
{
    public function getAll()
    {
        return ServiceOrder::all();
    }

    public function getById($id)
    {
        return ServiceOrder::findOrFail($id);
    }

    public function delete($id)
    {
        return ServiceOrder::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ServiceOrder::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ServiceOrder::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ServiceOrder::where('status', Status::ACTIVE)
            ->get();
    }

    public function getRegisterAll()
    {
        return ServiceOrder::where('status', Status::ACTIVE)
            ->get();
    }

    public function getServiceOrderById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return ServiceOrder::where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'created_by',
                'type',
                'payment_method',
                'quantity',
                'price',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'payment_status',
                'status',
                'service',
                'note',
                'service_type',
                'subscription_no'
            )
            ->first();
    }

    public function getActiveServiceOrdersByType(string $type, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return ServiceOrder::where('school_id', getUserSchoolId())
            ->where('type', $type)
            ->where('status', Status::ACTIVE)
            ->where('payment_status', PaymentStatus::PAID)
            ->select(
                'id',
                'created_by',
                'type',
                'payment_method',
                'quantity',
                'price',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'payment_status',
                'status',
                'created_at',
                'service',
                'note',
                'service_type',
                'subscription_no'
            )
            ->get();
    }

    public function getNextSubscriptionNo(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $serviceOrder = ServiceOrder::where('school_id', $schoolId)
            ->select(
                'subscription_no'
            )
            ->orderBy('id', 'DESC')
            ->first();

        $nextSubscriptionNo = 1;

        if ($serviceOrder?->subscription_no != null) {
            $subscriptionNoArr = explode('-', $serviceOrder->subscription_no);
            $nextSubscriptionNo = (int) end($subscriptionNoArr) + 1;
        }

        return 'SUB-00' . $nextSubscriptionNo;
    }


    // school sms

    public function getSchoolSms(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SchoolSms::where('school_id', $schoolId)
            ->select(
                'total_purchased_sms',
                'available_sms',
                'consumed_sms'
            )
            ->first();
    }

    public function createSchoolSms(array $arrayData)
    {
        return SchoolSms::create($arrayData);
    }

    public function updateSchoolSmsQuantity(int $quantity, string $operation = 'increment', int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $operator = $operation == 'decrement' ? '-' : '+';

        return SchoolSms::where('school_id', $schoolId)
            ->update([
                'total_purchased_sms' => DB::raw("total_purchased_sms {$operator} {$quantity}"),
                'available_sms' => DB::raw("available_sms {$operator} {$quantity}"),
            ]);
    }
}
