<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Http\Requests\PermissionRequest;
use App\Repositories\PermissionRepository;
use App\Repositories\IPermissionRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Repositories\IUserRepository;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function __construct(
        private IPermissionRepository $permissionRepository,
        private IUserRepository $userRepository,
    ) {
     //   $this->middleware('permission:view permissions', ['only' => ['index']]);
     //   $this->middleware('permission:add permissions', ['only' => ['create', 'save']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $nodeTypes = array();
        $permissions = array();
        $users = $this->userRepository->getActivePermissionUser();
        $roles = $this->userRepository->getActiveRoleAll();
        $permissionsQueryData = Permission::all()->pluck('name', 'id')->toArray();

        $userArray = array();
        $roleArray = array();
        array_push($roleArray, ['id' => 2, 'title' => 'Admin']);
        array_push($roleArray, ['id' => 13, 'title' => 'Teacher']);
        $selectedPermissions = array();

        if (getIsSuperAdmin()) {
            array_push($roleArray, ['id' => 1, 'title' => 'Super Admin']);
            array_push($userArray, ['id' => 1, 'title' => 'Nasir Uddin Mandal']);
            array_push($userArray, ['id' => 2, 'title' => 'Sittu Kumar']);
            foreach ($users as $user) {
                $roleName = !empty($user->roles) ? $user->roles->pluck('name')->first() : '';
                array_push($userArray, ['id' => $user->id, 'title' => getCocatenationTitle($user->first_name, $user->middle_name, $user->last_name) . " (" . $user->email . ")"]);
            }
        }
        else {
            foreach ($users as $user) {
                $roleName = !empty($user->roles) ? $user->roles->pluck('name')->first() : '';
                if ($roleName != 'Super Admin') {
                    array_push($userArray, ['id' => $user->id, 'title' => getCocatenationTitle($user->first_name, $user->middle_name, $user->last_name) . " (" . $user->email . ")"]);
                }
            }
        }

        foreach ($permissionsQueryData as $key => $permission) {
            $typeArray = explode('-', $permission);
            $type = !empty($typeArray) ? $typeArray[0] : "";

            if (!in_array($type, $nodeTypes)) {
                $nodeTypes[$type] = str_replace("_", " ", $type);
            }

            if (!in_array($permission, $permissions)) {
                $permissions[$nodeTypes[$type]][] = $key;
            }
        }

        $userPermissions = array();
        $check_user = !empty($request->user) ? $request->user : '';

        if (!empty($request->user)) {
            $checkUser = User::find($check_user);
            $selectedRoleName = !empty($checkUser->roles) ? $checkUser->roles->pluck('id')->first() : '';
            $check_role = !empty($request->role) ? $request->role : $selectedRoleName;

            if ($request->isMethod('POST')) {
                $checkData = array(
                    'check_user' => $check_user,
                    'check_role' => $check_role
                );
            }
            else {
                die("You don't have access this permission!");
            }

            $userPermissions = Permission::join("model_has_permissions", "model_has_permissions.permission_id", "=", "permissions.id")
                ->where("model_has_permissions.model_id", $checkUser->id)
                ->where('model_type', \App\Models\User::class)
                ->get()
                ->pluck('name', 'id')
                ->toArray(); // [ 1 => "view assets" ]

          
      
            // check existing permissions
            /* $rolePermissions = Permission::join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")
                ->where("role_has_permissions.role_id", $check_role)
                ->get()
                ->pluck('name', 'id')
                ->toArray(); // [ 1 => "view assets" ] */
        }
        else {
            $checkData = array(
                'check_user' => '',
                'check_role' => ''
            );
        }

        foreach (modulesPermissionsList() as $mKey => $module) {
            if (in_array($module, $userPermissions)) {
                $selectedPermissions[$mKey] = true;
            } else {
                $selectedPermissions[$mKey] = false;
            }
        }

        return Inertia::render('Permission/Show', [
            'roles' => $roleArray,
            'users' => $userArray,
            'selectedPermissions' => $selectedPermissions,
            'checkData' => $checkData
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $nodeTypes = array();
        $permissions = array();
        $users = User::all();
        $roles = Role::all();
        $permissionsQueryData = Permission::all()->pluck('name', 'id')->toArray();

        foreach ($permissionsQueryData as $key => $permission) {
            $typeArray = explode('-', $permission);
            $type = !empty($typeArray) ? $typeArray[0] : "";

            if (!in_array($type, $nodeTypes)) {
                $nodeTypes[$type] = str_replace("_", " ", $type);
            }

            if (!in_array($permission, $permissions)) {
                $permissions[$nodeTypes[$type]][] = $key;
            }
        }

        $rolePermissions = "";
        $email = !empty($_GET['email']) ? $_GET['email'] : '';
        $role = !empty($_GET['role']) ? $_GET['role'] : '';
        if (!empty($email)) {
            $checkUser = User::where('email', $email)->first();
            $roleId = $checkUser->roles->pluck('id')->first();
            // check existing permissions
            $rolePermissions = Permission::join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")
                ->where("role_has_permissions.role_id", $roleId)
                ->get()
                ->pluck('id', 'id')
                ->toArray();
        }

        return Inertia::render('Permission/Show', [
            'roles' => $roles,
            'users' => $users,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
            'email' => $email,
            'role' => $role,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(Request $request): RedirectResponse
    {
        // $input = $request->validated();
        $input = $request->all();

        $PermissionsList = modulesPermissionsList();
        $permissionArray = array();

        foreach ($input as $keyVal => $val) {
            if (($val === true) && !empty($PermissionsList[$keyVal])) {
                array_push($permissionArray, $PermissionsList[$keyVal]);
            }
        }


        /* For global helper func and permission seeder
       foreach($input as $keyVal => $val) {
            $value = str_replace("_"," ", $keyVal);
            $permissionArray[$keyVal] = $value;
        }
       foreach($permissionArray as $keyVal => $val) {
            $value = str_replace("permission ","", $val);
            $permissionArray2[$keyVal] = $value;
            // if( ($val === true) && !empty($PermissionsList[$keyVal]) ) {
            //     array_push($permissionArray, $PermissionsList[$keyVal]);
            // }
        } */

        if (!empty($input['role_not_use'])) {
            $role = Role::create(['name' => $input['name']]);

            if ($role) {
                return redirect()->route("role_permission.list")->with('errors', 'Something goes wrong.');
            }
        } else {

            if (!empty($input['check_email_not']) && !empty($input['check_role'])) {
                return redirect()->route("role_permission.list", [
                    'email' => $input['check_email'],
                    'role' => $input['check_role']
                ]);
            }

            $user = User::find($input['user_id']);

            $role = Role::find($input['user_role']);
            // user permission to role wise remove and new permission
            $role->syncPermissions([]);
            $user->syncPermissions($permissionArray);
            $user->assignRole($role->id);

            return redirect()->back()->with('message', 'Updated successfully.');

        }
    }
}
