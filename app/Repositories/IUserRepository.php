<?php

namespace App\Repositories;

interface IUserRepository
{
    public function update($id, array $arrayData);
    // public function getRegisterAll();
    public function getUserByUsernameAndSchool($username, $schoolId);
    public function getActivePermissionUser();

    // user activity
    public function getAllUserActivity();
    public function getByIdUserActivity($id);
    public function deleteUserActivity($id);
    public function createUserActivity(array $arrayData);
    public function updateUserActivity(int $id, string $name, string $model, array $arrayData);
    public function updateOrCreateUserActivity(array $arrayMatch, array $arrayData);
    public function getActiveAllUserActivity();
}
