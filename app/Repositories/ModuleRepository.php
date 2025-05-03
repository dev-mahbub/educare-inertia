<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Module;

class ModuleRepository implements IRepository, IModuleRepository
{
    public function getAll()
    {
        return Module::all();
    }

    public function getById($id)
    {
        return Module::findOrFail($id);
    }

    public function delete($id)
    {
        Module::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Module::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Module::whereId($id)->update($arrayData);
    }

    public function createOrUpdate($schoolId, array $arrayData)
    {
        $existModule = Module::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->first();

        if( !empty($existModule->id) ) {
            $this->update($existModule->id, $arrayData);
        }
        else {
            $this->create($arrayData);
        }
    }
    
    public function getModuleById($schoolId)
    {
        return Module::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->first();
    }

    public function getBySchoolSession()
    {
        return Module::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->first();
    }

    public function getActiveAll()
    {
        return Module::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Module::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }
}