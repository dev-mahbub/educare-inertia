<?php

namespace App\Http\Controllers;

use App\Events\FeeDueSms;
use App\Events\ErpLoginCredentialSms;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use App\Repositories\IDriverRepository;
use App\Enums\CredentialSmsAudienceType;
use App\Repositories\IStudentRepository;

class SendSmsController extends Controller
{
    public function __construct(
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
        private IDriverRepository $driverRepository,
    ) {
        // $this->middleware('permission:view sms settings', ['only' => ['index', 'smsSendList', 'smsCircular']]);
    }


    /*
    * Send Fee Due SMS
    */
    public function sendFeeDueSms(Request $request)
    {
        try {
            $isSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_sms_enable')?->value == "Yes";
            $isFeeSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_fee_sms_enable')?->value == "Yes";
            $isDueReportSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_due_report_sms')?->value == "Yes";

            if ($isSmsEnabled == false || $isFeeSmsEnabled == false || $isDueReportSmsEnabled == false) {
                return redirect()->back()->with('error', 'Enable fee sms setting.');
            }

            $numbers = $request->numbers;
            $message = getSiteSettingDataByTypeAndKey('SMS', 'sms_fee_message_template')?->value ?? '';
            $sender = getSiteSettingDataByTypeAndKey('SMS', 'sms_sender_id')?->value ?? '';

            event(new FeeDueSms($numbers, $message, $sender));

            return redirect()->back()->with('message', 'Sms sent successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Send Bulk Fee Due SMS
    */
    public function sendBulkFeeDueSms(Request $request)
    {
        try {
            $isSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_sms_enable')?->value == "Yes";
            $isFeeSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_fee_sms_enable')?->value == "Yes";
            $isDueReportSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_due_report_sms')?->value == "Yes";

            if ($isSmsEnabled == false || $isFeeSmsEnabled == false || $isDueReportSmsEnabled == false) {
                return redirect()->back()->with('error', 'Enable fee sms setting.');
            }

            $numbers = is_array($request?->numbers) ? implode(',', $request->numbers) : $request->numbers;
            $message = getSiteSettingDataByTypeAndKey('SMS', 'sms_fee_message_template')?->value ?? '';
            $sender = getSiteSettingDataByTypeAndKey('SMS', 'sms_sender_id')?->value ?? '';

            event(new FeeDueSms($numbers, $message, $sender));

            return redirect()->back()->with('message', 'Sms sent successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Send Erp Credential SMS
    */
    public function sendErpCredentialSms(Request $request)
    {
        try {
            $isSmsEnabled = getSiteSettingDataByTypeAndKey('SMS', 'sms_is_sms_enable')?->value == "Yes";

            if ($isSmsEnabled == false) {
                return redirect()->back()->with('error', 'Enable sms setting.');
            }

            $audienceType = $request->audience_type ?? "";
            $selectedIds = $request->selected_ids ?? [];
            $audienceData = [];

            if ($audienceType == CredentialSmsAudienceType::PARENTS->value) {
                $recipientType = $request->recipient_type ?? "";
                $students = [];

                if ($recipientType == 'class_wise') {
                    $boardingType = $request->boarding_type ?? "";

                    $students = $this->studentRepository->getStudentsByClassroomIdsForSmsCredentials($selectedIds, $boardingType);
                } else if ($recipientType == 'individuals') {
                    $students = $this->studentRepository->getStudentsByIds($selectedIds);

                    $students?->loadMissing(['father:id,student_id,guardian_type,first_name,middle_name,last_name,phone']);
                }

                if (count($students) > 0) {
                    $audienceData = $students->map(function ($student) {
                        return [
                            'user_name' => '',
                            'password' => '',
                            'phone' => $student?->father?->phone,
                        ];
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::TEACHERS->value) {
                $teachers = $this->staffRepository->getActiveTeachersByIds($selectedIds);

                if (count($teachers) > 0) {
                    $audienceData = $teachers->map(function ($teacher) {
                        return [
                            'user_name' => '',
                            'password' => '',
                            'phone' => $teacher?->phone,
                        ];
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::ALUMNIES->value) {
                $alumnies = $this->staffRepository->getActiveAlumniesByIds($selectedIds);

                if (count($alumnies) > 0) {
                    $audienceData = $alumnies->map(function ($alumni) {
                        return [
                            'user_name' => '',
                            'password' => '',
                            'phone' => $alumni?->phone,
                        ];
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::VEHICLE_STAFFS->value) {
                $vehicleStaffs = $this->driverRepository->getActiveVehicleStaffsByIds($selectedIds);

                if (count($vehicleStaffs) > 0) {
                    $audienceData = $vehicleStaffs->map(function ($vehicleStaff) {
                        return [
                            'user_name' => '',
                            'password' => '',
                            'phone' => $vehicleStaff?->contact,
                        ];
                    });
                }
            }

            // TODO: need to work on this
            $audienceNumbers = [];

            if (count($audienceData) > 0) {
                $audienceNumbers = $audienceData?->filter(function ($data) {
                    return $data['phone'] != null;
                })?->pluck('phone')?->toArray();
            }

            $numbers = !empty($audienceNumbers) ? implode(',', $audienceNumbers) : '';
            $message = '';
            $sender = getSiteSettingDataByTypeAndKey('SMS', 'sms_sender_id')?->value ?? '';

            event(new ErpLoginCredentialSms($numbers, $message, $sender));

            return redirect()->back()->with('message', 'Sms sent successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }
}
