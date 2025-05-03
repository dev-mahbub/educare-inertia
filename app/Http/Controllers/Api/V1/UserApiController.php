<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ControllerApi;
use App\Http\Resources\UserResource;
use App\Models\Country;
use App\Models\InterestedCountriesUser;
use App\Models\User;
use Laravel\Cashier\Order\Order;
use App\Models\Wishlist;
use App\Mail\UserFeedback;
use App\Models\Image;
use App\Models\Staff;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Mail;

class UserApiController extends ControllerApi
{
    
    /**
     * @OA\Get(
     *    path="/users/me",
     *    operationId="me",
     *    tags={"User"},
     *    summary="Get auth user details",
     *    description="Get auth user details",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    ),
     *    @OA\Response(
     *          response=401,
     *          description="Returns when user is not authenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Not authorized"),
     *          )
     *      )
     * )
     */
    public function me(Request $request)
    {
        if($request->user()->id && !empty($request->schoolId) )
        {
            $user = User::where('id', $request->user()->id)
                ->select("id", "first_name", "middle_name", "last_name","phone","email","role")
                ->first();

            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $roles =Auth::User()->roles?->pluck('name')->toArray();
          //  dd($roles);
            $user['roles'] = $roles;
            $user['is_super_admin'] = @in_array("Super Admin", $roles);

            if(in_array("Teacher", $roles)) {
                $staff = Staff::select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
                    ->where('school_id', $request->schoolId)
                    ->where('user_id', $user->id)
                    ->first();

                $user['staff'] = $staff;
                $user['image'] = Image::where('imageable_id', $staff->id)
                ->where('imageable_type', \App\Models\Staff::class)
                ->select('path')
                ->first();
            }
            elseif(in_array("Student", $roles)) {
                $student = Student::select('id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'email', 'phone')
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
                    
                $user['student'] = $student;
                $user['image'] = Image::where('imageable_id', $student->id)
                    ->where('imageable_type', \App\Models\Student::class)
                    ->where('name', 'student_profile_image')
                    ->select('path')
                    ->first();

            }
            elseif(in_array("Parent", $roles)) {
                $fatherName = $user->first_name;
                $fatherEmail = $user->email;
                $fatherPhone = $user->phone;
                $students = Student::where('school_id', $request->schoolId)
                    ->whereHas('classroomPromotedStudents', function ($sSubQuery) use( $academicYearId ) {
                        $sSubQuery->where(function ($query) use( $academicYearId ) {
                            $query->where('classroom_students.academic_year_id', $academicYearId);
                        });
                    })
                    ->whereHas('father', function ($query) use ($fatherName, $fatherEmail, $fatherPhone) {
                        $query->where('first_name', $fatherName)
                            ->where('email', $fatherEmail)
                            ->where('phone', $fatherPhone);
                    })
                    ->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name',
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
                    }
                    ])
                    ->get();

                $user['students'] = $students;
                $stdId = !empty($students[0]) ? $students[0]->id : '';
                $user['image'] = Image::where('imageable_id', $stdId)
                    ->where('imageable_type', \App\Models\Student::class)
                    ->where('name', 'student_father_profile_image')
                    ->select('path')
                    ->first();
            }
            else {
                $user['image'] = Image::where('imageable_id', $user->id)
                ->where('imageable_type', \App\Models\User::class)
                ->select('path')
                ->first();
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
        }
        else 
        {
            return response()->json([
                'success' => false,
                'message' => 'Please enter correct bareer token!',
                'data' => null
            ], 200);
            return response()->json( array('success' => false), 200);
        }
        
    }

    /**
     * @OA\Post(
     * path="/users/update/me",
     * summary="Update Me",
     * description="Update Me",
     * operationId="updateMe",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Me",
     *    @OA\JsonContent(
     *       required={"first_name", "last_name", "last_name","phone","email","role","password"},
     *       @OA\Property(property="email", type="string", format="email", example="nasir.chalo@gmail.com"),
     *       @OA\Property(property="password", type="string", format="password", example="password"),
     *       @OA\Property(property="first_name", type="string", example="first name"),
     *       @OA\Property(property="last_name", type="string", example="last name"),
     *       @OA\Property(property="phone", type="string", example="phone"),
     *       @OA\Property(property="role", type="string", example="role"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Already exists your email")
     *        )
     *     )
     * )
     */
    public function updateMe(Request $request)
    {
        if($request->user()->id && !empty($request->first_name) )
        {
            $user = User::find($request->user()->id);
            $user->first_name = $request->first_name;
            $user->middle_name = $request->middle_name;
            $user->last_name = $request->last_name;
            $user->phone = $request->phone;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $user
            ], 200);
        }
        else 
        {
            return response()->json([
                'success' => false,
                'message' => 'required fields or wrong bareer token!',
                'data' => []
            ], 200);
        }
    }
    
    /**
     * @OA\Get(
     *    path="/users/courses",
     *    operationId="getAuthUserCourses",
     *    tags={"User"},
     *    summary="Get auth user courses",
     *    description="Get auth user courses",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function getAuthUserCourses(User $user, Request $request)
    {
        if( !empty($request->user()->id) )
        {
            $user = User::find($request->user()->id);
            return response()->json([
                'data' => $user->courses,
                'user_id' => $request->user()->id,
            ]);
        }
        else 
        {
            return response()->json([
                "success" => false,
            ]);
        }
    }

    /**
     * @OA\Get(
     *    path="/users/wishlist",
     *    operationId="getAuthUserWishlist",
     *    tags={"User"},
     *    summary="Get auth user wishlist",
     *    description="Get auth user wishlist",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function getAuthUserWishlist(User $user, Request $request)
    {
        if( !empty($request->user()->id) )
        {
            $user = User::where('id', $request->user()->id)
                ->with([
                    'wishlist' => [
                        'categories',
                    ],
                ])
                ->first();

            return response()->json([
                'data' => !empty($user->wishlist) ? $user->wishlist : [],
                'user_id' => $request->user()->id,
            ]);
        }
        else 
        {
            return response()->json([
                "success" => false,
            ]);
        }
    }

    /**
     * @OA\Get(
     *    path="/users/wishlist-save",
     *    operationId="saveAuthUserWishlist",
     *    tags={"User"},
     *    summary="Save auth user wishlist",
     *    description="Save auth user wishlist",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function saveAuthUserWishlist(User $user, Request $request)
    {
        if( !empty($request->user()->id) )
        {
            if( Wishlist::where('user_id', $request->user()->id)->where('course_id', $request->cid)->count() > 0 )
            {
                $wishlist = Wishlist::where('user_id', $request->user()->id)
                    ->where('course_id', $request->cid)
                    ->first();
                
                $wish = Wishlist::findOrFail($wishlist->id);
                $wish->delete();
                $follow_bolooen = true;
            }
            else 
            {
                $data = [
                    "user_id" => $request->user()->id,
                    "course_id" => $request->cid ?? "", 
                ];
                $wishlist = Wishlist::create($data);
                $follow_bolooen = false;
            }

            return response()->json([
                'data' => $wishlist,
                'user_id' => $request->user()->id,
                'course_id' => $request->cid,
                'unfollow' => $follow_bolooen,
            ]);
        }
        else 
        {
            return response()->json([
                "success" => false,
            ]);
        }
    }
}
