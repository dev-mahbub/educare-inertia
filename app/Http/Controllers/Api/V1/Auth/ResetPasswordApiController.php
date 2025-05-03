<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\ControllerApi;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use App\Mail\ResetPassword;
use Mail;


class ResetPasswordApiController extends ControllerApi
{
    /**
     * @OA\Post(
     * path="/users/admin/reset-password",
     * summary="Reset password  from Admin",
     * description="Reset password from Admin",
     * operationId="resetPasswordAdmin",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Reset password",
     *    @OA\JsonContent(
     *       required={"schoolId", "username", "password", "new_password", "confirm_new_password"},
     *       @OA\Property(property="username", type="string", format="string", example="admin"),
     *       @OA\Property(property="password", type="string", format="string", example="343467"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, We didn't find any account.")
     *        )
     *     )
     * )
     */
    public function resetPasswordAdmin(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->password) && !empty($request->new_password) && ($request->new_password == $request->confirm_new_password) ) { 
            if( ($request->username == 'nasir_sa') || ($request->username == 'situ_ua') ) {
                $user = User::where('username', $request->username)->where('school_id', 1)->first();
            }
            else {
                $user = User::where('username', $request->username)->where('school_id', $request->schoolId)->first();
            }

            if ($user && Hash::check($request->password, $user->password)) {
                $user->password = Hash::make($request->new_password);
                $user->save();

                return response()->json([
                    'success' => true,
                    'data' => $user,
                    'message' => 'Password has changed successfully!',
                ], 200);
            }
            else {
                return response()->json([
                    'success' => false,
                    'message' => 'Password is Wrong!',
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields or not match confirm password!',
                'data' => []
            ], 200);
        }
    }
    
    /**
     * @OA\Post(
     * path="/users/reset-password",
     * summary="Reset password",
     * description="Reset password",
     * operationId="resetPassword",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Reset password",
     *    @OA\JsonContent(
     *       required={"schoolId","email", "code"},
     *       @OA\Property(property="email", type="string", format="email", example="nasir.chalo@gmail.com"),
     *       @OA\Property(property="code", type="string", format="string", example="343467"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, We didn't find any account.")
     *        )
     *     )
     * )
     */
    public function resetPassword(Request $request)
    {
        $token = PasswordReset::where([
            'email' => $request->email,
            'token' => $request->code,
        ])->first();

        if ( !$token ) 
        {
            return response()->json([
                'success' => false,
                'message' => 'Password code is Wrong!',
            ], 400);
        }

        $user = User::where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);

        PasswordReset::where(['email' => $request->email])->delete();

        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * @OA\Post(
     * path="/users/check-email",
     * summary="check email on reset password",
     * description="check email on reset password",
     * operationId="setCode",
     * tags={"User"},
     * @OA\RequestBody(
     *    required=true,
     *    description="check email on reset password",
     *    @OA\JsonContent(
     *       required={"email"},
     *       @OA\Property(property="email", type="string", format="email", example="nasir.chalo@gmail.com"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Already exists your email.")
     *        )
     *     )
     * )
     */
    public function setCode(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ( $user && ($request->email === $user->email) ) 
        {
            PasswordReset::where(['email' => $user->email])->delete();
            $newToken = Str::random(6);
            $token = new PasswordReset();
            $token->email = $user->email;
            $token->token = $newToken;
            $token->created_at = Carbon::now();
            $token->save();

            Mail::to($user->email)
            ->send(new ResetPassword($newToken));

            return response()->json([
                'user' => $user,
            ]);
        }

        return response()->json([
            'success' => false,
            'user' => null,
            'error' => 'This user is not active!',
        ], 400);
    }
}
