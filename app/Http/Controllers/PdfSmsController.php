<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Enums\CircularAudienceType;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISmsCircularRepository;

class PdfSmsController extends Controller
{
    public function __construct(
        private ISmsCircularRepository $smsCircularRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
    ) {
        //
    }

    /**
     * Preview Sms Circular
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function previewSmsCircular(Request $request)
    {
        $smsCircularId = $request->circular_id ?? null;

        abort_if($smsCircularId == null, 404);

        $smsCircular = $this->smsCircularRepository->getSmsCircularById($smsCircularId);

        abort_if($smsCircular == null, 404);

        $content = $smsCircular->content ?? '';

        return view('pdf.sms.preview_sms_circular', [
            'content' => $content
        ]);
    }

    /**
     * Download Sms Circular
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function downloadSmsCircular(Request $request)
    {
        $smsCircularId = $request->circular_id ?? null;

        abort_if($smsCircularId == null, 404);

        $smsCircular = $this->smsCircularRepository->getSmsCircularById($smsCircularId);

        abort_if($smsCircular == null, 404);

        $audienceType = $smsCircular->audience_type;

        // audience atrtibutes
        $audienceAttributes = $this->getAudienceAttributes($audienceType);

        $studentIds = !empty($request->student_ids) ? json_decode($request->student_ids) : [];
        $staffIds = !empty($request->staff_ids) ? json_decode($request->staff_ids) : [];

        // audience data
        $audienceData = $this->getAudienceData($audienceType, $studentIds, $staffIds);

        $contents = [];

        if (count($audienceData) > 0) {
            foreach ($audienceData as $data) {
                // generate placeholders
                $placeholders = $this->generatePlaceholders($audienceAttributes, $data);

                // replace the placeholders in the text
                $contents[] = str_replace(array_keys($placeholders), array_values($placeholders), $smsCircular->content ?? '');
            }
        }

        return view('pdf.sms.download_sms_circular', [
            'contents' => $contents
        ]);
    }

    /*
    * Helper method to generate placeholders
    */
    private function generatePlaceholders(array $attributes, array $data)
    {
        $placeholders = [];

        foreach ($attributes as $attribute) {
            // Remove the '#' character and convert to snake_case
            $key = Str::snake(ltrim($attribute, '#'));

            if (isset($data[$key])) {
                $placeholders[$attribute] = $data[$key];
            }
        }

        return $placeholders;
    }

    /*
    * Helper method to get audience attributes
    */
    private function getAudienceAttributes(string $audienceType = '')
    {
        $audienceTypes =  getAudienceAttributes();

        return $audienceType != '' ? $audienceTypes[$audienceType] ?? [] : $audienceTypes;
    }

    /*
    * Helper method to get audience data
    */
    private function getAudienceData(string $audienceType = '', array $studentIds = [], array $staffIds = [])
    {
        $audienceData = [];

        if ($audienceType == CircularAudienceType::SCHOOL->value) {
            $schoolData = $this->getSchoolData();

            $audienceData[] = [
                'school_name' => $schoolData['title'] ?? '',
                'school_city' => $schoolData['city'] ?? '',
                'school_address' => $schoolData['street_address'] ?? '',
                'school_phone' => $schoolData['phone'] ?? '',
                'school_mail' => $schoolData['mail'] ?? '',
                'website' => $schoolData['website_url'] ?? '',
                'session_year' => $schoolData['academic_year'] ?? ''
            ];
        } else if ($audienceType == CircularAudienceType::STUDENT->value && !empty($studentIds)) {
            $audienceData = $this->getStudentsDataByIds($studentIds);
        } else if ($audienceType == CircularAudienceType::STAFF->value && !empty($staffIds)) {
            $audienceData = $this->getStaffDataByIds($staffIds);
        }

        return $audienceData;
    }

    /*
    * helper method to get student data by ids
    */
    private function getStudentsDataByIds(array $ids)
    {
        $students = $this->studentRepository->getStudentsByIds($ids);

        if ($students->count() > 0) {
            $schoolData = $this->getSchoolData();

            $students->loadMissing([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'enquiry:id,registration_no'
            ]);

            $students = $students->map(function ($student) use ($schoolData) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return [
                    'name' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name),
                    'class' => $student?->classroom?->title,
                    'father_name' => getCocatenationTitle($student?->father?->first_name, $student?->father?->middle_name, $student?->father?->last_name),
                    'mother_name' => getCocatenationTitle($student?->mother?->first_name, $student?->mother?->middle_name, $student?->mother?->last_name),
                    'admission_no' => $student?->admission_no,
                    'registration_number' => $student?->enquiry?->registration_no,
                    'school_name' => $schoolData['title'] ?? '',
                    'school_city' => $schoolData['city'] ?? '',
                    'school_address' => $schoolData['street_address'] ?? '',
                    'school_phone' => $schoolData['phone'] ?? '',
                    'school_mail' => $schoolData['mail'] ?? '',
                    'website' => $schoolData['website_url'] ?? '',
                    'session_year' => $schoolData['academic_year'] ?? ''
                ];
            })->toArray();
        }

        return $students;
    }

    /*
    * helper method to get staff data by ids
    */
    private function getStaffDataByIds(array $ids)
    {
        $staffs = $this->staffRepository->getStaffByIds($ids);

        if ($staffs->count() > 0) {
            $schoolData = $this->getSchoolData();

            $staffs = $staffs->map(function ($staff) use ($schoolData) {
                return [
                    'name' => getCocatenationTitle($staff?->first_name, $staff?->middle_name, $staff?->last_name),
                    'email' => $staff?->email,
                    'teacher_phone' => $staff->phone,
                    'joining_date' => !empty($staff->join_date_at) ? Carbon::parse($staff->join_date_at)->format('d-M-Y') : '',
                    'leaving_date' => !empty($staff->leave_date_at) ? Carbon::parse($staff->leave_date_at)->format('d-M-Y') : '',
                    'birth_date' => !empty($staff->birth_date_at) ? Carbon::parse($staff->birth_date_at)->format('d-M-Y') : '',
                    'department' => $staff?->department_name,
                    'designation' => $staff?->designation_name,
                    'blood_group' => $staff?->blood_group_name,
                    'pan_number' => $staff?->pan_number,
                    'school_name' => $schoolData['title'] ?? '',
                    'school_city' => $schoolData['city'] ?? '',
                    'school_address' => $schoolData['street_address'] ?? '',
                    'school_phone' => $schoolData['phone'] ?? '',
                    'school_mail' => $schoolData['mail'] ?? '',
                    'website' => $schoolData['website_url'] ?? '',
                    'session_year' => $schoolData['academic_year'] ?? ''
                ];
            })->toArray();
        }

        return $staffs;
    }

    /*
    * helper method to get school data
    */
    private function getSchoolData()
    {
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

        if (!empty($schoolData)) {
            $domain_name = env('DOMAIN_NAME', 'educarestudy.in');
            $domain_url = $schoolData?->school_key . "." . $domain_name;

            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
                'school_number' => $schoolData->school_number,
                'udise_code' => $schoolData->udise_code,
                'city' => $schoolData->city,
                'website_url' => $domain_url
            ];
        }

        return $schoolData;
    }
}
