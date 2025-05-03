<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\State;

class StateRepository implements IRepository, IStateRepository
{
    public function getAll()
    {
        return State::all()->latest()->get();
    }

    public function getById($id)
    {
        return State::findOrFail($id);
    }

    public function delete($id)
    {
        State::destroy($id);
    }

    public function create(array $arrayData)
    {
        return State::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return State::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return State::where('status', Status::ACTIVE)
            ->get(['name AS title', 'id']);
    }

    public function getRegisterAll()
    {
        return State::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getActiveNameAndId()
    {
        return State::where('status', Status::ACTIVE)->select('id', 'name', 'country_id')->latest()->get();
    }

    public function getStatesByCountry($cId = 1)
    {
        $query = State::query();
        $query->where('status', Status::ACTIVE);
        $query->when(!empty($cId), function ($query) use ($cId) {
            $query->where('country_id', $cId);
        });
        return $query->orderBy('name', 'ASC')->pluck('name', 'id');
    }

    public function countStatesByCountry($cId = 1)
    {
        $query = State::query();
        $query->where('status', Status::ACTIVE);
        $query->when(!empty($cId), function ($query) use ($cId) {
            $query->where('country_id', $cId);
        });
        return $query->count();
    }
}
