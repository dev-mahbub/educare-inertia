<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccountType;
use App\Enums\CasteType;
use App\Enums\EventLevel;
use App\Enums\EventType;
use App\Enums\Gender;
use App\Enums\ScholarBoardingType;
use App\Enums\StudentStatus;
use App\Enums\SubCasteType;
use App\Http\Controllers\Api\ControllerApi;
use Illuminate\Http\Request;

class SettingApiController extends ControllerApi
{
    public function __construct() {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/settings/all",
     *    operationId="indexSetting",
     *    tags={"Setting"},
     *    summary="Get Site Settings",
     *    description="Get Site Settings",
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
    public function indexSetting(Request $request)
    {
        
        if (!empty($request->schoolId)) {
            $webAppUrl = array(
                'supportTicket' => '/support/ticket/list',
                'lessonPlans' => '/lesson-plans',
                'noticeList' => '/notices/all',
                'noticeCreate' => '/notices/create',
                'eventsList' => '/events/all',
                'eventsCreate' => '/events/create',
                'newsList' => '/news/all',
                'newsCreate' => '/news/create',
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'siteUrl' => 'https://app.educarestudy.in',
                    'webAppUrl' => $webAppUrl,
                    'socialLinks' => null,
                    'currency' => 'Rs',
                    'pusher' => [
                        'PUSHER_APP_ID' => '1907802',
                        'PUSHER_APP_KEY' => '1c018ccb69283b16bb03',
                        'PUSHER_APP_SECRET' => '1de4a5f242a3e7656e1b',
                        'PUSHER_APP_CLUSTER' => 'ap2'
                    ],
                    'singlePusherChannel' => [
                        'channel_name' => 'chat',
                        'listener' => 'MessageSent',
                    ],
                    'groupPusherChannel' => [
                        'channel_name' => 'chat',
                        'listener' => 'MessageSent',
                    ]
                ],
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }
}
