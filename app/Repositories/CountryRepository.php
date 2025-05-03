<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Country;

class CountryRepository implements IRepository, ICountryRepository
{
    public function getAll()
    {
        return Country::all()->latest()->get();
    }

    public function getById($id)
    {
        return Country::findOrFail($id);
    }

    public function delete($id)
    {
        Country::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Country::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Country::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Country::where('status', Status::ACTIVE)
            ->get(['name AS title', 'id']);
    }

    public function getRegisterAll()
    {
        return Country::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getActiveNameAndId()
    {
        return Country::where('status', Status::ACTIVE)->select('id', 'name')->latest()->get();
    }
}
