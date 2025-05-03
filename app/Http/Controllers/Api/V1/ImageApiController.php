<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IImageRepository;
use Illuminate\Http\Request;

class ImageApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/images/all",
     *    operationId="indexImage",
     *    tags={"Image"},
     *    summary="Get all Image",
     *    description="Get all Image",
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
    public function indexImage(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->imageName)) {
            switch ($request->imageName) {
                case 'student_profile_image': 
                    $imageableType = \App\Models\Student::class;
                    break;
                case 'student_father_profile_image':
                    $imageableType = \App\Models\Student::class;
                    break; 
                case 'student_mother_profile_image':
                    $imageableType = \App\Models\Student::class;
                    break;
                case 'academic_syllabus':
                    $imageableType = \App\Models\AcademicSyllabus::class;
                    break;
                default:
                    break;
            }

            if( in_array($request->imageName, ['student_profile_image', 'student_father_profile_image', 'student_mother_profile_image']) ) {
                $images = $this->imageRepository->morphStudentImageAll($request->schoolId, $request->imageName, $imageableType);
            }
            else {
                $images = $this->imageRepository->morphImageAll($request->schoolId, $imageableType);
            }

            return response()->json([
                'success' => true,
                'data' => $images
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
     * @OA\Post(
     * path="/images/save",
     * summary="Save Image",
     * description="Save Image",
     * operationId="saveImage",
     * tags={"Image"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Image",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "imageableId", "imageName"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="imageableId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="string", example="demo"),
     *       @OA\Property(property="imageName", type="string", example="student_profile_image"),
     *       @OA\Property(property="imageFile", type="string", example="File"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Already taken attendance")
     *        )
     *     )
     * )
     */

    public function saveImage(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->imageableId) && !empty($request->imageName) && !empty($request->schoolKey) ) {
            // class image
            if ( !empty($request->file('imageFile')) ) {
                $image_url = $this->_upload->uploadImage($request, 'imageFile', $request->imageName, $request->schoolKey);
            }
            $dataArray = array(
                'school_id' => $request->schoolId,
                'imageable_id' => $request->imageableId,
                'name' => $request->imageName,
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );
            
            switch ($request->imageName) {
                case 'user':
                    $dataArray['imageable_type'] = \App\Models\User::class;
                    break; 
                case 'student_profile_image': 
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    break;
                case 'student_father_profile_image':
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    break; 
                case 'student_mother_profile_image':
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    break;
                case 'staff':
                        $dataArray['imageable_type'] = \App\Models\Staff::class;
                        break;
                case 'academic_syllabus':
                    $dataArray['imageable_type'] = \App\Models\AcademicSyllabus::class;
                    break;
                default:
                    break;
            }

            if( !empty($dataArray['imageable_type']) ) {
                $image = $this->imageRepository->morphImageCreate($dataArray);
                return response()->json([
                    'success' => true,
                    'message' => 'Created successfully',
                    'data' => $image
                ], 201);
            }
            else {
                return response()->json([
                    'success' => true,
                    'message' => "Can't Create Image",
                ], 200);
            }
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
     * @OA\Post(
     * path="/images/update",
     * summary="Update Image",
     * description="Update Image",
     * operationId="updateImage",
     * tags={"Image"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Image",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "imageableId", "imageName"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="imageableId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="string", example="demo"),
     *       @OA\Property(property="imageName", type="string", example="student_profile_image, student_father_profile_image, student_mother_profile_image"),
     *       @OA\Property(property="imageFile", type="string", example="File"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Already taken attendance")
     *        )
     *     )
     * )
     */
    public function updateImage(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->imageableId) && !empty($request->imageName) && !empty($request->schoolKey)) {
            if (!empty($request->file('imageFile'))) {
                $image_url = $this->_upload->uploadImage($request, 'imageFile', $request->imageName, $request->schoolKey);
            }
            $dataArray = array(
                'school_id' => $request->schoolId,
                'imageable_id' => $request->imageableId,
                'name' => $request->imageName,
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );
            switch ($request->imageName) {
                case 'user':
                    $dataArray['imageable_type'] = \App\Models\User::class;
                    $image = $this->imageRepository->morphStudentImageUpdate($dataArray, $request->imageableId, $dataArray['name'], $dataArray['imageable_type']);
                    break; 
                case 'student_profile_image': 
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    $image = $this->imageRepository->morphStudentImageUpdate($dataArray, $request->imageableId, $dataArray['name'], $dataArray['imageable_type']);
                    break;
                case 'student_father_profile_image':
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    $image = $this->imageRepository->morphStudentImageUpdate($dataArray, $request->imageableId, $dataArray['name'], $dataArray['imageable_type']);
                    break; 
                case 'student_mother_profile_image':
                    $dataArray['imageable_type'] = \App\Models\Student::class;
                    $image = $this->imageRepository->morphStudentImageUpdate($dataArray, $request->imageableId, $dataArray['name'], $dataArray['imageable_type']);
                    break;
                case 'academic_syllabus':
                    $dataArray['imageable_type'] = \App\Models\AcademicSyllabus::class;
                    $image = $this->imageRepository->morphImageUpdate($dataArray, $request->imageableId, $dataArray['imageable_type']);
                    break;
                case 'staff':
                    $dataArray['imageable_type'] = \App\Models\Staff::class;
                    $image = $this->imageRepository->morphImageUpdate($dataArray, $request->imageableId, $dataArray['imageable_type']);
                    break;
                default:
                    break;
            }

            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $image
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