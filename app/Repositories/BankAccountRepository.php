<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\BankAccount;

class BankAccountRepository implements IRepository, IBankAccountRepository
{
    public function getAll()
    {
        return BankAccount::all();
    }

    public function getById($id)
    {
        return BankAccount::findOrFail($id);
    }

    public function delete($id)
    {
        BankAccount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return BankAccount::create($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return BankAccount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return BankAccount::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return BankAccount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereNull('student_id')
            ->get();
    }

    public function getRegisterAll()
    {
        return BankAccount::where('status', Status::ACTIVE);
    }

    public function getByStudentId($id)
    {
        return BankAccount::where('student_id', $id)->get()->first();
    }

    public function getAllByStudentId($id)
    {
        return BankAccount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $id)
            ->get();
    }


    public function getActiveAllByStudentIds(array $studentIds)
    {
        return BankAccount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('student_id', $studentIds)
            ->get();
    }


    public function checkBankAccount($accountName, $accountDisplayName, $id = null)
    {
        return BankAccount::where('school_id', getUserSchoolId())
            ->when(!empty($id), function ($query) use ($id) {
                $query->where('id', '!=', $id);
            })
            ->where('account_name', $accountName)
            ->where('account_display_name', $accountDisplayName)
            ->exists();
    }
}
