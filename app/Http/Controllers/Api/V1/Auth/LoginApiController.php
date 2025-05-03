<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\ControllerApi;
use App\Models\User;
use App\Models\Student;
use App\Models\Staff;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\UserResource;
use App\Models\Image;
use App\Models\School;
use App\Repositories\IUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;
use Mpdf\Tag\Em;

class LoginApiController extends ControllerApi
{
    public function __construct(
        private IUserRepository $userRepository,
    ) {
        // do something
    }
    /**
     * @OA\Post(
     * path="/users/login",
     * summary="Sign in",
     * description="Login by username, password & school id",
     * operationId="store",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Pass user credentials",
     *    @OA\JsonContent(
     *       required={"username","password", "schoolId"},
     *       @OA\Property(property="username", type="string", format="text", example="nasir"),
     *       @OA\Property(property="password", type="string", format="password", example="password"),
     *       @OA\Property(property="schoolId", type="string", format="integer", example="1"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Wrong credentials response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, wrong username or password. Please try again")
     *        )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $user = $this->userRepository->getUserByUsernameAndSchool($request->username, $request->schoolId);
        $roleId = $user?->roles?->pluck('id')->first();
        if($roleId == null) {
            switch ($user?->role) {
                case 'Parent':
                    $user->assignRole('Parent');
                    $roleId = $user->roles->pluck('id')->first();
                    break;
                case 'Teacher':
                    $user->assignRole('Teacher');
                    $roleId = $user->roles->pluck('id')->first();
                    break;
                default:
                    $roleId = null;
                    break;
            }
        }

        if ((isset($user->is_inactive) && ($user->is_inactive == '0'))) {
            $isUserValid = true;
        } else {
            $isUserValid = false;
        }
        $schoolId = $request->schoolId;
        $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
        if ($isUserValid && Hash::check($request->password, $user->password)) {
            $roles = $user?->roles?->pluck('name')?->toArray();
            $user['roles'] = $roles;
            $user['is_super_admin'] = @in_array("Super Admin", $roles);

            if(in_array("Teacher", $roles)) {
                $user['staff'] = Staff::select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
                    ->where('school_id', $request->schoolId)
                    ->where('user_id', $user->id)
                    ->first();
            }
            elseif(in_array("Student", $roles)) {
                $user['student'] = Student::select('id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'email', 'phone')
                ->where('school_id', $request->schoolId)
                ->where('user_id', $user->id)
                ->whereHas('classroomPromotedStudents', function ($sSubQuery) use( $academicYearId ) {
                    $sSubQuery->where(function ($query) use( $academicYearId ) {
                        $query->where('classroom_students.academic_year_id', $academicYearId);
                    });
                })
                ->with(['promotedClassroomRaw' => function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->select(
                            'classrooms.class_name_id',
                            'classrooms.id',
                            'classrooms.title',
                        );
                },
                'classroomRollRaw'  => function ($query) use ($academicYearId) {
                    $query->where('academic_year_id', $academicYearId)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no',
                        );
                }])
                ->first();
            }
            elseif(in_array("Parent", $roles)) {
                $fatherName = $user->first_name;
                $fatherEmail = $user->email;
                $fatherPhone = $user->phone;
                $user['students'] = Student::where('school_id', $request->schoolId)
                ->whereHas('classroomPromotedStudents', function ($sSubQuery) use( $academicYearId ) {
                    $sSubQuery->where(function ($query) use( $academicYearId ) {
                        $query->where('classroom_students.academic_year_id', $academicYearId);
                    });
                })
                ->whereHas('father', function ($sQquery) use ($fatherName, $fatherEmail, $fatherPhone) {
                    $sQquery->where('first_name', $fatherName)
                        ->where('email', $fatherEmail)
                        ->where('phone', $fatherPhone);
                })
                ->select(
                    'id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id'
                )
                ->with(['promotedClassroomRaw' => function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->select(
                            'classrooms.class_name_id',
                            'classrooms.id',
                            'classrooms.title',
                        );
                },
                'classroomRollRaw'  => function ($query) use ($academicYearId) {
                    $query->where('academic_year_id', $academicYearId)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no',
                        );
                },
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                }])
                ->get();
            }

            $schooLogo = Image::where('imageable_id', $request->schoolId)
                ->where('imageable_type', \App\Models\School::class)
                ->select('path')
                ->first();

            $user['school'] = School::select('id', 'title', 'teaser', 'description', 'school_key', 'affiliation_no', 'city', 'school_number')->find($request->schoolId);
            $user['school_logo'] = !empty($schooLogo->path) ? $schooLogo->path : null;
            $token = $user->tokens()->first();

            if (!empty($token->token)) {
                if($user->access_token == null) {
                    $newToken = Str::random(40);
                    $token->token = hash('sha256', $newToken);
                    $token->save();
                    User::find($user->id)->update(['access_token' => $newToken]);
                    $user['bearer_token'] = $newToken;
                }
                else {
                    $user['bearer_token'] = $user->access_token;
                }
            } 
            else {
                $user['bearer_token'] = $user->createToken('storefront')->plainTextToken;
            }

            $selectedPermissions = array();
            $userPermissions = Permission::join("model_has_permissions", "model_has_permissions.permission_id", "=", "permissions.id")
                ->where("model_has_permissions.model_id", $user->id)
                ->where('model_type', \App\Models\User::class)
                ->get()
                ->pluck('name', 'id')
                ->toArray();
        
            foreach (modulesPermissionsList() as $mKey => $module) {
                if (in_array($module, $userPermissions)) {
                    $selectedPermissions[$mKey] = true;
                } else {
                    $selectedPermissions[$mKey] = false;
                }
            }

            return response()->json([
                'success' => true,
                'data' => $user,
                'academicYear' => getAcademicYearSession($academicYearId),
                'permissions' => $selectedPermissions,
                'modules' => getAccessModulesFromSession($request->schoolId),
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => __('Invalid E-Mail or Password or Disable Account!'),
            'request' => $request->get('school_id'),
            'academicYear' => $academicYearId,
        ], 401);
    }

}