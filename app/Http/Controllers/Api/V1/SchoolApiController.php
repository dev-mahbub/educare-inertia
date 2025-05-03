<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\School;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IBankRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStateRepository;
use Illuminate\Http\Request;

class SchoolApiController extends ControllerApi
{
    
    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IImageRepository $imageRepository,

        private IHouseRepository $houseRepository,
        private IAdmissionRepository $admissionRepository,
        private ICategoryRepository $categoryRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private IReligionRepository $religionRepository,
        private ICountryRepository $countryRepository,
        private IBankRepository $bankRepository,
        private IStateRepository $stateRepository,
        private IStaffRepository $staffRepository,

        
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/schools/all",
     *    operationId="indexSchool",
     *    tags={"School"},
     *    summary="Get all schools",
     *    description="Get all schools",
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
    public function indexSchool(Request $request)
    {
        $schools = $this->schoolRepository->getSchoolsByCityAndState($request->cityName, $request->stateId);
        $schoolCount = $this->schoolRepository->countSchoolsByCityAndState($request->cityName, $request->stateId);
        return response()->json([
            'success' => true,
            'count' => $schoolCount,
            'data' => $schools,
        ], 200);
    }


    /**
     * @OA\Get(
     *    path="/schools/byschoolkey",
     *    operationId="schoolByKey",
     *    tags={"School"},
     *    summary="Get school by key",
     *    description="Get school by key",
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
    public function schoolByKey(Request $request)
    {
        $school = $this->schoolRepository->getBySchoolCode($request->schoolKey);
        $image = '';
        if( isset($school->id) ) {
            $schooLogo = $this->imageRepository->getMorphSchool($school->id);
            $image = !empty($schooLogo->path) ? $schooLogo->path : null;
        }

        
        return response()->json([
            'success' => true,
            'is_key_valid' => isset($school->id) ? true : false,
            'data' => $school,
            'school_logo' => $image
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/schools/academic-years",
     *    operationId="schoolAcademicYears",
     *    tags={"School"},
     *    summary="Get school academic years",
     *    description="Get school academic years",
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
    public function schoolAcademicYears(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            return response()->json([
                'success' => true,
                'data' => getAcademicYearsAll($request->schoolId),
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


    /**
     * @OA\Get(
     *    path="/schools/registration/selects",
     *    operationId="schoolRegistrationsSelects",
     *    tags={"School"},
     *    summary="Get school registrations form data",
     *    description="Get school registrations form data",
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
    public function schoolRegistrationsSelects(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $housesData = $this->houseRepository->getActiveNameAndId($request->schoolId);
            $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
            $categoryData = $this->categoryRepository->getActiveNameAndId($request->schoolId);
            $catEmpData = $this->categoryRepository->getActiveNameIdStudentEmployment($request->schoolId);
            $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId($request->schoolId);
            $religionData = $this->religionRepository->getActiveNameAndId($request->schoolId);
            $countryData = $this->countryRepository->getActiveNameAndId();

            $bankData = $this->bankRepository->getActiveNameAndId($request->schoolId);
            $stateData = $this->stateRepository->getActiveNameAndId();
            $admissionSourceData = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource($request->schoolId);
            $staffData = $this->staffRepository->getActiveNameId($request->schoolId);

            $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();
            $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
            $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
            $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
            $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
            $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
            $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
            $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
            $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
            $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
            $staffs = $staffData->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name])->all();

            return response()->json([
                'success' => true,
                'data' => [
                    'admissionSources' => $admissionSources,
                    'houses' => $houses,
                    'admissionNumbers' => $admissionNumbers,
                    'categories' => $categories,
                    'bloodGroups' => $bloodGroups,
                    'religions' => $religions,
                    'countries' => $countries,
                    'catEmps' => $catEmps,
                    'banks' => $banks,
                    'states' => $states,
                    'staffs' => $staffs,
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
