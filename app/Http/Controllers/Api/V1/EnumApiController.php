<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccountType;
use App\Enums\AlumniType;
use App\Enums\CasteType;
use App\Enums\DifficultyLevel;
use App\Enums\EventLevel;
use App\Enums\EventType;
use App\Enums\Gender;
use App\Enums\HolidayType;
use App\Enums\Language;
use App\Enums\LeaveType;
use App\Enums\PaymentMode;
use App\Enums\ReferenceType;
use App\Enums\ResourceType;
use App\Enums\ScholarBoardingType;
use App\Enums\ShareAudienceType;
use App\Enums\StudentStatus;
use App\Enums\SubCasteType;
use App\Enums\VirtualExamMode;
use App\Enums\VirtualQuestionType;
use App\Enums\WebmessageAudienceType;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\ILeaveRepository;
use Illuminate\Http\Request;

class EnumApiController extends ControllerApi
{
    public function __construct(
        private ILeaveRepository $leaveRepository,
    ) {
        
    }
    
    /**
     * @OA\Get(
     *    path="/enum/all",
     *    operationId="indexEnum",
     *    tags={"Enum"},
     *    summary="Get all values of enum",
     *    description="Get all values of enum",
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
    public function indexEnum(Request $request)
    {
        if (!empty($request->schoolId)) {
            $accountTypeEnum = AccountType::cases();
            $studentStatusEnum = StudentStatus::cases();
            $scholarBoardingTypeEnum = ScholarBoardingType::cases();
            $casteTypeEnum = CasteType::cases();
            $subCasteTypeEnum = SubCasteType::cases();
            $genderEnum = Gender::cases();

            $leaveTypesArray = $this->leaveRepository->getActiveLeaveTypesAll($request->schoolId);
            $leaveTypes = [];
            foreach ($leaveTypesArray as $leave) {
                array_push($leaveTypes, ['id' => $leave->title, 'title' => $leave->title]);
            }

            $accounts = collect($accountTypeEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $studentStatus = collect($studentStatusEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $scholarBoardingType = collect($scholarBoardingTypeEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $casteType = collect($casteTypeEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $subCasteType = collect($subCasteTypeEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $gender = collect($genderEnum)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            $eventTypes = buildEnumOptionsArray(EventType::cases());
            $eventLevels = buildEnumOptionsArray(EventLevel::cases());
            $holidayTypes = buildEnumOptionsArray(HolidayType::cases());
            $questionTypes = buildEnumOptionsArray(VirtualQuestionType::cases());
            $difficultyLevels = buildEnumOptionsArray(DifficultyLevel::cases());
            $languages = buildEnumOptionsArray(Language::cases());
            $shareAudienceTypes = buildEnumOptionsArray(ShareAudienceType::cases());
            $virtualExamModes = buildEnumOptionsArray(VirtualExamMode::cases());
            // registration
            $PaymentModes = buildEnumOptionsArray(PaymentMode::cases());
            $ReferenceTypes = buildEnumOptionsArray(ReferenceType::cases());
            $AlumniTypes = buildEnumOptionsArray(AlumniType::cases());
            $messageAudienceTypes = buildEnumOptionsArray(WebmessageAudienceType::cases());

            

            $resourceTypes = [];
            foreach (ResourceType::cases() as $case) {
                array_push($resourceTypes, ['id' => $case->value, 'title' => $case->value]);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'studentStatuses' => $studentStatus,
                    'scholarBoardingTypes' => $scholarBoardingType,
                    'casteTypes' => $casteType,
                    'subCasteTypes' => $subCasteType,
                    'genders' => $gender,
                    'accountTypes' => $accounts,
                    'eventTypes' => $eventTypes,
                    'eventLevels' => $eventLevels,
                    'leaveTypes' => $leaveTypes,
                    'holidayTypes' => $holidayTypes,
                    'resourceTypes' => $resourceTypes,
                    'questionTypes' => $questionTypes,
                    'difficultyLevels' => $difficultyLevels,
                    'languages' => $languages,
                    'shareAudienceTypes' => $shareAudienceTypes,
                    'virtualExamModes' => $virtualExamModes,
                    'PaymentModes' => $PaymentModes,
                    'ReferenceTypes' => $ReferenceTypes,
                    'AlumniTypes' => $AlumniTypes,
                    'messageAudienceTypes' => $messageAudienceTypes,
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
