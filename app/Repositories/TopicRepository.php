<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Topic;

class TopicRepository implements IRepository, ITopicRepository
{
    public function getAll()
    {
        return Topic::all()->latest()->get();
    }

    public function getById($id)
    {
        return Topic::findOrFail($id);
    }

    public function delete($id)
    {
        Topic::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Topic::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Topic::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Topic::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getRegisterAll()
    {
        return Topic::where('status', Status::ACTIVE)->latest()->get();
    }
}