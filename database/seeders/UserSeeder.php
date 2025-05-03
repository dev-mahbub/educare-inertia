<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasRoles;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $defaultUsers = array_merge(
            config('seeder.lms_super_admins'),
            config('seeder.lms_admins'),
            config('seeder.lms_school_admins'),
            config('seeder.lms_school_branch_admins'),
            config('seeder.lms_school_office'),
            config('seeder.lms_teachers'),
            config('seeder.lms_parents'),
            config('seeder.lms_students'),
        );

        collect($defaultUsers)
            ->map(fn($user) => User::factory()->create($user))
            ->map(function ($user) {
                $token = $user->createToken('testing');
                $this->command->info("User $user->email seeded with token $token->plainTextToken");
            });

        User::factory()->times(config('seeder.user_count'))->create();

        // Select super admin user
        // persmissions custom
        $cusPermissions = array(
            0 => "view permissions",
            1 => "view school import",
            2 => "add permissions",
            3 => "add school import",
            4 => "edit permissions",
            5 => "edit school import",
            6 => "delete permissions",
            7 => "delete school import"
        );
        // user obj
        $superAdmin = User::find(1);
        $superAdmin->role = UserRole::SUPER_ADMIN;
        $superAdmin->save();
        // user permission to role wise remove and new permission
        $roleSuperAdmin = Role::find(1);
        $roleSuperAdmin->syncPermissions($cusPermissions);
        $superAdmin->assignRole($roleSuperAdmin->id);

        // Select admin user
        $superAdmin2 = User::find(2);
        $superAdmin2->role = UserRole::SUPER_ADMIN;
        $superAdmin2->save();
        // user permission to role wise remove and new permission
        $superAdmin2->assignRole($roleSuperAdmin->id);

        // Select school admin user
        $admin = User::find(3);
        $admin->role = UserRole::SITE_ADMIN;
        $admin->save();
   

        // Select school branch admin user
        $admin = User::find(4);
        $admin->role = UserRole::SITE_BRANCH_ADMIN;
        $admin->save();

        // Select school office user
        $admin = User::find(5);
        $admin->role = UserRole::SITE_OFFICE;
        $admin->save();


        // Select teacher user
        $admin = User::find(6);
        $admin->role = UserRole::SITE_TEACHER;
        $admin->save();

        // Select parents user
        $admin = User::find(7);
        $admin->role = UserRole::SITE_PARENT;
        $admin->save();

        // Select students users
        $users = User::orderBy('id','desc')->take(4)->get();
        $users->each(function ($user) {
            $user->role = UserRole::SITE_STUDENT;
            $user->save();
        });
    }
}