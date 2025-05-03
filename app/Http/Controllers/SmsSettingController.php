<?php

namespace App\Http\Controllers;

use App\Enums\SmsAudienceContextTagType;
use App\Enums\SmsAudienceContextType;
use App\Enums\SmsAudienceTeacherContextType;
use App\Enums\SmsAudienceTemplateType;
use App\Enums\SmsSettingType;
use App\Enums\Status;
use App\Http\Requests\SmsSettingRequest;
use App\Repositories\SmsSettingRepository;
use App\Repositories\ISmsSettingRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SmsSettingController extends Controller
{

    public function __construct(
        private ISmsSettingRepository $smsSettingRepository,
        private IClassroomRepository $classroomRepository
    ) {
        $this->middleware('permission:view sms settings', ['only' => ['index', 'setting', 'templateList']]);
        $this->middleware('permission:add sms settings', ['only' => [
            'edit',
            'save',
            'createTemplate',
            'saveTemplate',
            'editTemplate'
        ]]);
        $this->middleware('permission:edit sms settings', ['only' => ['update', 'updateTemplate']]);
        $this->middleware('permission:delete sms settings', ['only' => ['destroy', 'destroyTemplate']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $smsSettings = $this->smsSettingRepository->getActiveAll();
        $classNamesData = $this->classroomRepository->getActiveNameAndId();

        // get class names
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();

        //get sms type
        $smsType = SmsSettingType::cases();
        $smsTypeArr = array();
        foreach ($smsType as $type) {
            array_push($smsTypeArr, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('SmsSetting/Show', [
            'smsSettings' => $smsSettings,
            'smsTypeArr' => $smsTypeArr,
            'classNames' => $classNames
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(SmsSettingRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'class_name_id' => $input['class_name_id'] ?? '',
            'title' => $input['title'] ?? '',
            'context' => $input['context'] ?? '',
            'description' => $input['description'] ?? '',
            'status' => Status::ACTIVE,
        );

        $smsSetting = $this->smsSettingRepository->create($dataArray);

        if (!$smsSetting) {
            return redirect()->route('sms_setting.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('sms_setting.list')->with('message', 'SMS created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('SmsSetting/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SmsSettingRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'class_name_id' => $input['class_name_id'] ?? '',
            'title' => $input['title'] ?? '',
            'context' => $input['context'] ?? '',
            'description' => $input['description'] ?? ''
        );

        $smsSetting = $this->smsSettingRepository->update($id, $dataArray);

        if (!$smsSetting) {
            return redirect()->route('sms_setting.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('sms_setting.list')->with('message', 'SMS updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(string $id): RedirectResponse
    {
        $smsSetting = $this->smsSettingRepository->getById($id);
        if (!$smsSetting) {
            return redirect()->route('sms_setting.list')->with('errors', 'Something goes wrong.');
        }
        $smsSetting->delete($id);
        return redirect()->route('sms_setting.list')->with('message', 'SMS deleted successfully.');
    }

    /**
     * SMS Setting.
     */
    public function setting(Request $request): Response
    {
        $smsSetting = getSiteSettingDataByType('SMS');
        return Inertia::render('SmsSetting/Setting', [
            'smsSettings' => !empty($smsSetting['SMS']) ? $smsSetting['SMS'] : [],
        ]);
    }

    /**
     * Display createTemplate list
     */
    public function templateList(Request $request): Response
    {
        $templates = $this->smsSettingRepository->getAllTemplate();

        dd($templates);

        return Inertia::render('SmsSetting/Show', [
            'templates' => $templates,
        ]);
    }

    /**
     * Display createTemplate form
     */
    public function createTemplate(Request $request): Response
    {
        //get audience template type
        $smsAudienceType = SmsAudienceTemplateType::cases();
        $smsAudiences = array();
        foreach ($smsAudienceType as $type) {
            array_push($smsAudiences, ['id' => $type->value, 'title' => $type->value]);
        }

        //get audience teacher context type
        $smsAudienceTeacher = SmsAudienceTeacherContextType::cases();
        $smsAudienceTeachers = array();
        foreach ($smsAudienceTeacher as $type) {
            array_push($smsAudienceTeachers, ['id' => $type->value, 'title' => $type->value]);
        }

        //get audience parents context type
        $smsAudienceContext = SmsAudienceContextType::cases();
        $smsAudienceContexts = array();
        foreach ($smsAudienceContext as $type) {
            array_push($smsAudienceContexts, ['id' => $type->value, 'title' => $type->value]);
        }


        //get audience tags type
        $smsAudienceTag = SmsAudienceContextTagType::cases();
        $smsAudienceTags = array();
        foreach ($smsAudienceTag as $type) {
            array_push($smsAudienceTags, ['id' => $type->value, 'title' => $type->value]);
        }

        $templates = $this->smsSettingRepository->getAllTemplate();

        return Inertia::render('SmsSetting/CreateTemplate', [
            'templates' => $templates,
            'smsAudiences' => $smsAudiences,
            'smsAudienceTeachers' => $smsAudienceTeachers,
            'smsAudienceContexts' => $smsAudienceContexts,
            'smsAudienceTags' => $smsAudienceTags,
        ]);
    }

    /**
     * save template
     */
    public function saveTemplate(SmsSettingRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'audience' => $input['audience'] ?? '',
            'context' => $input['context'] ?? '',
            'description' => $input['description'] ?? '',
            'web_page_message' => $input['web_page_message'] ?? '',
            'use_tagsArr' => json_encode($input['web_page_message']) ?? null,
            'type' => 'template',
            'status' => Status::ACTIVE,
        );

        $templates = $this->smsSettingRepository->create($dataArray);
        if (!$templates) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Sms template created successfully.');
    }


    /**
     * Display editTemplate form
     */
    public function editTemplate(Request $request, $id): Response
    {
        //get audience template type
        $smsAudienceType = SmsAudienceTemplateType::cases();
        $smsAudiences = array();
        foreach ($smsAudienceType as $type) {
            array_push($smsAudiences, ['id' => $type->value, 'title' => $type->value]);
        }

        //get audience teacher context type
        $smsAudienceTeacher = SmsAudienceTeacherContextType::cases();
        $smsAudienceTeachers = array();
        foreach ($smsAudienceTeacher as $type) {
            array_push($smsAudienceTeachers, ['id' => $type->value, 'title' => $type->value]);
        }

        //get audience parents context type
        $smsAudienceContext = SmsAudienceContextType::cases();
        $smsAudienceContexts = array();
        foreach ($smsAudienceContext as $type) {
            array_push($smsAudienceContexts, ['id' => $type->value, 'title' => $type->value]);
        }


        //get audience tags type
        $smsAudienceTag = SmsAudienceContextTagType::cases();
        $smsAudienceTags = array();
        foreach ($smsAudienceTag as $type) {
            array_push($smsAudienceTags, ['id' => $type->value, 'title' => $type->value]);
        }
        $templates = $this->smsSettingRepository->getAllTemplate();
        $template = $this->smsSettingRepository->getById($id);

        return Inertia::render('SmsSetting/EditTemplate', [
            'templates' => $templates,
            'template' => $template,
            'smsAudiences' => $smsAudiences,
            'smsAudienceTeachers' => $smsAudienceTeachers,
            'smsAudienceContexts' => $smsAudienceContexts,
            'smsAudienceTags' => $smsAudienceTags,
        ]);
    }


    /**
     * update template
     */
    public function updateTemplate(SmsSettingRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? '',
            'audience' => $input['audience'] ?? '',
            'context' => $input['context'] ?? '',
            'description' => $input['description'] ?? '',
            'web_page_message' => $input['web_page_message'] ?? '',
            'use_tagsArr' => json_encode($input['web_page_message']) ?? null,
            'type' => 'template',
            'status' => Status::ACTIVE,
        );

        $templates = $this->smsSettingRepository->update($id, $dataArray);
        if (!$templates) {
            return redirect()->route('sms_setting.create_template')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('sms_setting.create_template')->with('message', 'Sms template updated successfully.');
    }


    public function destroyTemplate(string $id)
    {
        $template = $this->smsSettingRepository->getById($id);
        if (!$template) {
            return redirect()->route('sms_setting.create_template')->with('errors', 'Template not found.');
        }
        $this->smsSettingRepository->delete($id);
        return redirect()->route('sms_setting.create_template')->with('message', 'Template deleted successfully.');
    }
}
