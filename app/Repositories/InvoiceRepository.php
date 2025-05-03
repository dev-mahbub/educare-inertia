<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Invoice;
use App\Enums\OrderPaymentStatus;

class InvoiceRepository implements IRepository, IInvoiceRepository
{
    public function getAll()
    {
        return Invoice::all();
    }

    public function getById($id)
    {
        return Invoice::findOrFail($id);
    }

    public function delete($id)
    {
        return Invoice::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Invoice::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Invoice::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Invoice::where('status', Status::ACTIVE)
            ->get();
    }

    public function getRegisterAll()
    {
        return Invoice::where('status', Status::ACTIVE)
            ->get();
    }

    public function getInvoiceById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Invoice::where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'created_by',
                'service_order_id',
                'invoice_no',
                'type',
                'service',
                'service_type',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'invoice_description',
                'invoice_date',
                'start_date',
                'end_date',
                'paid_date',
                'payment_status',
                'status'
            )
            ->first();
    }

    public function getNextInvoiceNo(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $invoice = Invoice::where('school_id', $schoolId)
            ->select(
                'invoice_no'
            )
            ->orderBy('id', 'DESC')
            ->first();

        $nextInvoiceNo = 1;

        if ($invoice?->invoice_no != null) {
            $invoiceNoArr = explode('-', $invoice->invoice_no);
            $nextInvoiceNo = (int) end($invoiceNoArr) + 1;
        }

        return 'INV-00' . $nextInvoiceNo;
    }

    public function getDueServiceInvoices(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Invoice::where('school_id', $schoolId)
            ->where('payment_status', OrderPaymentStatus::OVERDUE)
            ->where('type', 'service')
            ->select(
                'id',
                'created_by',
                'service_order_id',
                'invoice_no',
                'type',
                'service',
                'service_type',
                'payable_amount',
                'paid_amount',
                'invoice_description',
                'invoice_date',
                'start_date',
                'end_date',
                'paid_date',
                'payment_status',
                'status',
                'due_amount'
            )
            ->get();
    }

    public function getPaidServiceInvoices(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Invoice::where('school_id', $schoolId)
            ->where('payment_status', OrderPaymentStatus::PAID)
            ->where('type', 'service')
            ->select(
                'id',
                'created_by',
                'service_order_id',
                'invoice_no',
                'type',
                'service',
                'service_type',
                'payable_amount',
                'paid_amount',
                'invoice_description',
                'invoice_date',
                'start_date',
                'end_date',
                'paid_date',
                'payment_status',
                'status',
                'due_amount'
            )
            ->get();
    }

    public function getDueInvoicesByIds(array $ids, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Invoice::where('school_id', $schoolId)
            ->where('payment_status', OrderPaymentStatus::OVERDUE)
            ->where('type', 'service')
            ->whereIn('id', $ids)
            ->select(
                'id',
                'service_order_id',
                'paid_date',
                'payment_status',
                'status',
                'due_amount',
                'payable_amount',
                'paid_amount'
            )
            ->get();
    }
}
