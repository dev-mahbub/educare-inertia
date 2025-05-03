<?php

namespace App\Repositories;

use App\Enums\GuardianType;
use App\Enums\Status;
use App\Models\LoginCredential;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\UserActivity;

class UserRepository implements IRepository, IUserRepository
{
    public function getAll()
    {
        return User::all();
    }

    public function getById($id)
    {
        return User::findOrFail($id);
    }

    public function delete($id)
    {
        User::destroy($id);
    }

    public function create(array $arrayData)
    {
        return User::create($arrayData);
    }

    public function updateOrCreate(array $haveData, array $arrayData)
    {
        return User::updateOrCreate($haveData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return User::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return User::where('status', Status::ACTIVE)
            ->where('is_inactive', 0)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActivePermissionUser()
    {
        return User::where('status', Status::ACTIVE)
            ->where('is_inactive', 0)
            ->where('school_id', getUserSchoolId())
            ->whereIn('role', ['Admin', 'Teacher'])
            ->get();
    }

    public function getActiveAdminUser()
    {
        return User::where('status', Status::ACTIVE)
            ->where('is_inactive', 0)
            ->where('school_id', getUserSchoolId())
            ->whereIn('role', ['Admin'])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return User::where('status', Status::ACTIVE)
            ->where('is_inactive', 0)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getFatherByEmail($email)
    {
        return User::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('email', '=', $email)
            ->first();
    }

    public function getFatherUserById($id)
    {
        return User::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', '=', $id)
            ->first();
    }

    public function getUserByEmail($email)
    {
        return User::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('email', $email)
            ->first();
    }

    public function getUserByUsernameAndSchool($username, $schoolId)
    {
        if (($username == 'nasir_sa') || ($username == 'situ_ua')) {
            return User::where('username', $username)
                ->where('school_id', 1)
                ->select('is_inactive', 'id', 'username', 'password', 'first_name', 'middle_name', 'last_name', 'role')
                ->first();
        } else {
            return User::where('username', $username)
                ->where('school_id', $schoolId)
                ->select('is_inactive', 'id', 'username', 'password', 'first_name', 'middle_name', 'last_name', 'role', 'email', 'phone')
                ->first();
        }
    }

    // LoginCredential
    public function getLoginCredential()
    {
        return LoginCredential::select(
            'id',
            'username',
            'password',
        )
            ->where('school_id', getUserSchoolId())
            ->first();
    }
    public function createOrUpdateCredential($id, array $arrayData)
    {
        return LoginCredential::updateOrCreate($id, $arrayData);
    }

    public function getActiveUserNameAndId()
    {
        return User::where('status', Status::ACTIVE)
            ->select('id', 'username')
            ->get();
    }

    public function getActiveRoleAll()
    {
        return Role::where('guard_name', 'web')
            ->get();
    }

    // user activity
    public function getAllUserActivity()
    {
        return UserActivity::all();
    }

    public function getByIdUserActivity($id)
    {
        return UserActivity::findOrFail($id);
    }

    public function deleteUserActivity($id)
    {
        UserActivity::destroy($id);
    }

    public function createUserActivity(array $arrayData)
    {
        return UserActivity::create($arrayData);
    }

    public function updateUserActivity(int $id, string $name, string $model, array $arrayData)
    {
        return UserActivity::where('name', $name)
            ->where('school_id', getUserSchoolId())
            ->where('activitiesable_id', $id)
            ->where('activitiesable_type', $model)
            ->update($arrayData);
    }

    public function updateOrCreateUserActivity(array $arrayMatch, array $arrayData)
    {
        return UserActivity::updateOrCreate($arrayMatch, $arrayData);
    }

    public function getActiveAllUserActivity()
    {
        return UserActivity::where('status', Status::ACTIVE);
    }
}
