<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Mail\TestMail;
use Illuminate\Http\Request;
use App\Enums\MailEngineType;
use App\Services\MailService;
use App\Enums\MailAuthEnableType;
use App\Enums\MailEncryptionType;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IMailSettingRepository;

class MailSettingController extends Controller
{

    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IMailSettingRepository $mailSettingRepository,
        private IStaffRepository $staffRepository,
        private MailService $mailService,
    ) {
        $this->middleware('permission:view mail settings', ['only' => ['index']]);

        $this->middleware('permission:view improve presence on internet', ['only' => ['improvePresence']]);
        $this->middleware('permission:add improve presence on internet', ['only' => ['create', 'presenceUpdateCreate']]);
    }

    /**
     * index
     */
    public function index(Request $request): Response
    {
        $mailSettings = getSiteSettingDataByType('Mail');

        // student check box
        if (!empty($mailSettings['Mail']['mail_is_absent_student_notification_sms_to_parent'])) {
            $smsValues = json_decode($mailSettings['Mail']['mail_is_absent_student_notification_sms_to_parent']);
            $mailSettings['Mail']['mail_is_absent_student_send_sms_to_parent'] = !empty($smsValues->value) ? $smsValues->value : false;
            $mailSettings['Mail']['mail_is_absent_student_send_notification_to_parent'] = !empty($smsValues->value2) ? $smsValues->value2 : false;
        } else {
            $mailSettings['Mail']['mail_is_absent_student_send_sms_to_parent'] = false;
            $mailSettings['Mail']['mail_is_absent_student_send_notification_to_parent'] = false;
        }

        // student birthday
        if (!empty($mailSettings['Mail']['mail_birthday_wishes_to_students'])) {
            $birthDayValues = json_decode($mailSettings['Mail']['mail_birthday_wishes_to_students']);
            $mailSettings['Mail']['mail_is_birthday_student_sms'] = !empty($birthDayValues->value) ? $birthDayValues->value : false;
            $mailSettings['Mail']['mail_is_birthday_student_email'] = !empty($birthDayValues->value) ? $birthDayValues->value : false;
            $mailSettings['Mail']['mail_is_birthday_student_notification'] = !empty($birthDayValues->value2) ? $birthDayValues->value2 : false;
        } else {
            $mailSettings['Mail']['mail_is_birthday_student_sms'] = false;
            $mailSettings['Mail']['mail_is_birthday_student_email'] = false;
            $mailSettings['Mail']['mail_is_birthday_student_notification'] = false;
        }

        // teacher birthday
        if (!empty($mailSettings['Mail']['mail_birthday_wishes_to_teacher'])) {
            $birthDayValues = json_decode($mailSettings['Mail']['mail_birthday_wishes_to_teacher']);
            $mailSettings['Mail']['mail_is_birthday_teachers_sms'] = !empty($birthDayValues->value) ? $birthDayValues->value : false;
            $mailSettings['Mail']['mail_is_birthday_teacher_email'] = !empty($birthDayValues->value) ? $birthDayValues->value : false;
            $mailSettings['Mail']['mail_is_birthday_teacher_notification'] = !empty($birthDayValues->value2) ? $birthDayValues->value2 : false;
        } else {
            $mailSettings['Mail']['mail_is_birthday_teachers_sms'] = false;
            $mailSettings['Mail']['mail_is_birthday_teacher_email'] = false;
            $mailSettings['Mail']['mail_is_birthday_teacher_notification'] = false;
        }

        // classroom
        if (!empty($mailSettings['Mail']['mail_selected_classroom_ids'])) {
            $classroomsIds = json_decode($mailSettings['Mail']['mail_selected_classroom_ids']);
            $mailSettings['Mail']['mail_selected_classroom_ids'] = !empty($classroomsIds->value) ? $classroomsIds->value : [];
        } else {
            $mailSettings['Mail']['mail_selected_classroom_ids'] = [];
        }

        // staff
        if (!empty($mailSettings['Mail']['mail_selected_staff_ids'])) {
            $staffIds = json_decode($mailSettings['Mail']['mail_selected_staff_ids']);
            $mailSettings['Mail']['mail_selected_staff_ids'] = !empty($staffIds->value) ? $staffIds->value : [];
        } else {
            $mailSettings['Mail']['mail_selected_staff_ids'] = [];
        }

        if (!empty($mailSettings['Mail']['mail_birthday_selected_staff_ids'])) {
            $staffIds = json_decode($mailSettings['Mail']['mail_birthday_selected_staff_ids']);
            $mailSettings['Mail']['mail_birthday_selected_staff_ids'] = !empty($staffIds->value) ? $staffIds->value : [];
        } else {
            $mailSettings['Mail']['mail_birthday_selected_staff_ids'] = [];
        }

        if (!empty($mailSettings['Mail']['mail_teacher_attendance_selected_staff_ids'])) {
            $staffIds = json_decode($mailSettings['Mail']['mail_teacher_attendance_selected_staff_ids']);
            $mailSettings['Mail']['mail_teacher_attendance_selected_staff_ids'] = !empty($staffIds->value) ? $staffIds->value : [];
        } else {
            $mailSettings['Mail']['mail_teacher_attendance_selected_staff_ids'] = [];
        }

        // classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // staff
        $staffs = $this->staffRepository->getActiveForSetting();
        $staffData = $staffs->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name . ' -- ' . $staff->user_roll_type])->all();

        // mail engine types
        $mailEngineTypes = [];

        foreach (MailEngineType::cases() as $case) {
            array_push($mailEngineTypes, ['id' => $case->value, 'title' => strtoupper($case->value)]);
        }

        // mail encryption types
        $mailEncryptionTypes = [];

        foreach (MailEncryptionType::cases() as $case) {
            array_push($mailEncryptionTypes, ['id' => $case->value, 'title' => strtoupper($case->value)]);
        }

        // mail auth enable types
        $mailAuthEnableTypes = [];

        foreach (MailAuthEnableType::cases() as $case) {
            array_push($mailAuthEnableTypes, ['id' => $case->value, 'title' => strtoupper($case->value)]);
        }

        return Inertia::render('MailSetting/Create', [
            'mailSettings' => !empty($mailSettings['Mail']) ? $mailSettings['Mail'] : [],
            'classrooms' => $classrooms,
            'staffData' => $staffData,
            'mailEngineTypes' => $mailEngineTypes,
            'mailEncryptionTypes' => $mailEncryptionTypes,
            'mailAuthEnableTypes' => $mailAuthEnableTypes,
        ]);
    }

    /**
     * improvePresence
     */
    public function improvePresence(Request $request): Response
    {
        $presenceSettingsData = [];

        if (!empty(getSiteSettingDataByType('Presence'))) {
            $presenceSettings = getSiteSettingDataByType('Presence')['Presence'];

            foreach ($presenceSettings as $key => $value) {
                $presenceSettingsData[] = [
                    'type' => 'Presence',
                    'key' => $key,
                    'value' => $value,
                ];
            }
        }

        return Inertia::render('MailSetting/ImprovePresence', [
            'presenceSettings' => $presenceSettingsData,
        ]);
    }

    /**
     * presenceUpdateCreate
     */
    public function presenceUpdateCreate(Request $request): RedirectResponse
    {
        $input = $request->input('selected_data');
        if (!empty($input)) {
            foreach ($input as $item) {
                setSiteSettingData($item['type'], $item['key'], $item['value']);
            }
            return redirect()->back()->with('message', 'Setting save successfully.');
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /*
    * Send Test Mail
    */
    public function sendTestMail(Request $request)
    {
        if (!empty($request->mail)) {
            // TODO: send mail
            // Mail::to($request->mail)->send(new TestMail());
            $this->mailService->sendMail($request->mail, new TestMail());
        } else {
            return redirect()->back()->with('error', 'Please enter test email address.');
        }
    }
}
