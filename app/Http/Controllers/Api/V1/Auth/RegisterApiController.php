<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\User;
use Laravel\Cashier\Order\Order;
use App\Models\PricePlan;
use App\Models\Student;
use App\Models\OrderBilling;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

final class RegisterApiController extends ControllerApi
{
    /**
     * @OA\Post(
     * path="/users/register",
     * summary="Sign in",
     * description="Register by email, name, etc",
     * operationId="saveUser",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Register user",
     *    @OA\JsonContent(
     *       required={"first_name","last_name","phone","email","role","password"},
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
    public function saveUser(Request $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'status' => Status::PENDING,
        ]);

        $lastName = !empty($request->last_name) ? ' '. $request->last_name .'-'. $user->id: '';
        $slug = str()->slug($request->first_name . $lastName);

        $studentData = [
            "user_id" => $user->id,
            "titel_name" => "",
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "slug" => $slug,
            "street_address" => "",
            "city" => "",
            "zip" => "",
            "country" => "",
            "teaser" => "",
            "description" => "",
            "fb_url" => "",
            "website_url" => "",
            "instagram_url" => "",
            "status" => Status::PENDING,
        ];

        $student = Student::create($studentData);

        return response()->json([
            'data' => [
                'user' => $user,
                'student' => $student,
            ],
        ]);
    }
}
