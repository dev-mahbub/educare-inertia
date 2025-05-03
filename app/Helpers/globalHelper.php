<?php

use Carbon\Carbon;
use App\Models\User;
use App\Enums\Status;
use App\Models\Image;
use App\Models\Staff;
use App\Models\Module;
use App\Models\School;
use App\Models\EnquiryFee;
use App\Models\SiteSetting;
use App\Models\AcademicYear;
use App\Models\SchoolSetting;
use App\Models\LoginCredential;
use App\Models\ClassroomSubject;
use App\Models\FeePaymentMethod;
use App\Enums\FeeInstallmentType;
use Illuminate\Support\Facades\DB;
use App\Enums\CircularAudienceType;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

/**
 * get school id from session.
 *
 * @return int
 */
function getUserSchoolId()
{
    return !empty(Session::get('school_id')) ? Session::get('school_id') : 1;
}



function getAnynomousSchoolId($request)
{
    try {
        $baseUrl = $request->getHttpHost();
        $schoolKey = @explode('.', $baseUrl);
        $schoolKeyName = !empty($schoolKey[1]) && ($schoolKey[1] == 'educarestudy') ? $schoolKey[0] : '';
        return School::where('school_key', $schoolKeyName)->first()?->id;
    } catch (\Throwable $th) {
        return '';
    }
}


/**
 * get parent Login credential
 *
 * @return int
 */
function getParentLoginCredential()
{
    return LoginCredential::select(
        'id',
        'username',
        'password',
    )
        ->where('school_id', getUserSchoolId())
        ->first();
}

/**
 * get school key
 *
 * @return int
 */
function getUserSchoolKey()
{
    return School::find(getUserSchoolId())->school_key;
}

/**
 * get school name
 *
 * @return string
 */
if (!function_exists('getUserSchoolName')) {
    function getUserSchoolName()
    {
        return School::find(getUserSchoolId())->title;
    }
}

/**
 * get school logo
 *
 * @return int
 */
function getSchoolLogo()
{
    $schooLogo = Image::where('imageable_id', getUserSchoolId())
        ->where('imageable_type', \App\Models\School::class)
        ->select('path')
        ->first();

    return !empty($schooLogo->path) ? $schooLogo->path : null;
}

/**
 * get all academic years
 *
 * @return int
 */
function getSiteSchoolData()
{
    return School::find(getUserSchoolId());
}

/**
 * get school id from session.
 *
 * @return int
 */
function getAcademicYearId()
{
    return !empty(Session::get('academic_year_id')) ? Session::get('academic_year_id') : null;
}

/**
 * get school id from session.
 *
 * @return int
 */
function getAcademicYearIdFromSchoolId($schoolId)
{
    $setting = SchoolSetting::where('status', Status::ACTIVE)
        ->where('school_id', $schoolId)
        ->first();
    return !empty($setting?->academic_year_id) ? $setting?->academic_year_id : null;
}

/**
 * get school id from session.
 *
 * @return int
 */
function getAcademicYear()
{
    return !empty(Session::get('academic_year_session')) ? Session::get('academic_year_session') : null;
}

/**
 * get academic year from ID
 *
 * @return int
 */
function getAcademicYearSession($academicYearId)
{
    return AcademicYear::find($academicYearId);
}

/**
 * get all academic years
 *
 * @return int
 */
function getSiteSettingData(string $keyName, $schoolId = null, $academicYearId = null)
{
    $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
    return SiteSetting::where('status', Status::ACTIVE)
        ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
        ->when($keyName != 'fee_is_hostel_available', function ($query) use ($academicYearId) {
            $query->where('academic_year_id', $academicYearId);
        })
        ->where('key_name', $keyName)
        ->select('value')
        ->first();
}


function getSiteSettingDataAll()
{
    $siteSettings = SiteSetting::where('status', Status::ACTIVE)
        ->where('school_id', getUserSchoolId())
        ->where('academic_year_id', getAcademicYearId())
        ->get()
        ->groupBy('type');

    $groupedSiteSettings = [];

    foreach ($siteSettings as $key => $siteSettingGroup) {
        foreach ($siteSettingGroup as $data) {
            $groupedSiteSettings[$key][$data->key_name] = $data->value;
        }
    }

    return $groupedSiteSettings;
}

function getSiteSettingDataByType($type = '', $schoolId = null, $academicYearId = null)
{
    $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
    $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
    $siteSettings = SiteSetting::where('status', Status::ACTIVE)
        ->where('school_id', $schoolId)
        // ->where('academic_year_id', getAcademicYearId())
        ->when($type != 'SMS' && $type != 'Presence', function ($query) use ($academicYearId) {
            $query->where('academic_year_id', $academicYearId);
        })
        ->where('type', $type)
        ->get()
        ->groupBy('type');

    $groupedSiteSettings = [];

    foreach ($siteSettings as $key => $siteSettingGroup) {
        foreach ($siteSettingGroup as $data) {
            $groupedSiteSettings[$key][$data->key_name] = $data->value;
        }
    }

    if ($type == 'Fee') {
        $groupedSiteSettings[$type]['fee_is_hostel_available'] = getSiteSettingData('fee_is_hostel_available')?->value;

        if (empty($groupedSiteSettings[$type]['fee_receipt_number_session_wise_seed_no'])) {
            $groupedSiteSettings[$type]['fee_receipt_number_session_wise_seed_no'] = getCurrentFeeReceiptSeedNumber();
        }
    }

    return $groupedSiteSettings;
}

function getSiteSettingDataByTypeAndKey($type, $key)
{
    $siteSetting = SiteSetting::where('status', Status::ACTIVE)
        ->where('school_id', getUserSchoolId())
        ->when($type != 'SMS' && $type != 'Presence', function ($query) {
            $query->where('academic_year_id', getAcademicYearId());
        })
        ->where('type', $type)
        ->where('key_name', $key)
        ->first();

    return $siteSetting;
}

/**
 * get current fee receipt seed no
 *
 * @return int
 */
function getCurrentFeeReceiptSeedNumber(int $schoolId = null, int $academicYearId = null)
{
    $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
    $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

    $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled', $schoolId, $academicYearId);
    $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

    if ($receiptNumberEnabaled) {
        $feeReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('type', 'Fee')
            ->where('key_name', 'fee_receipt_number_session_wise_seed_no')
            ->first();

        if ($feeReceiptSeed != null) {
            $currentReceiptNo = $feeReceiptSeed?->value;
        } else {
            $feeReceiptSeed = setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', 1, $schoolId, $academicYearId);
            $currentReceiptNo = $feeReceiptSeed?->value ?? 1;
        }
    } else {
        $lastPayment = FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            // ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'receipt_no')
            ->orderBy('receipt_no', 'desc')
            ->first();

        $currentReceiptNo = $lastPayment?->receipt_no;
    }

    return $currentReceiptNo;
}


/**
 * get current registration fee receipt seed no
 *
 * @return int
 */
function getCurrentRegistrationFeeReceiptSeedNumber($schoolId = null)
{
    $receiptNumberSetting = getSiteSettingData('fee_is_registration_seed_no_enabled');
    $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

    if ($receiptNumberEnabaled) {
        $feeReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('type', 'Fee')
            ->where('key_name', 'fee_registration_seed_no')
            ->first();


        if ($feeReceiptSeed != null) {
            $currentReceiptNo = $feeReceiptSeed?->value;
        } else {
            $feeReceiptSeed = setSiteSettingData('Fee', 'fee_registration_seed_no', 1);
            $currentReceiptNo = $feeReceiptSeed?->value ?? 1;
        }
    } else {
        $lastPayment = EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'receipt_no')
            ->orderBy('receipt_no', 'desc')
            ->first();

        $currentReceiptNo = $lastPayment?->receipt_no;
    }

    return $currentReceiptNo;
}

/**
 * get all academic years
 *
 * @return int
 */
function setSiteSettingData(string $settingType, string $keyName, $value, int $schoolId = null, int $academicYearId = null)
{
    $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
    $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

    if ($keyName == 'fee_is_hostel_available') {
        $attributesToCheck = [
            'school_id' => $schoolId,
            'type' => $settingType,
            'key_name' => $keyName,
        ];

        $dataToUpdate  = [
            'academic_year_id' => $academicYearId,
            'value' => $value,
            'status' => Status::ACTIVE,
        ];
    } elseif ($keyName == 'student_book_limit' || $keyName == 'staff_book_limit' || $settingType == 'SMS' || $settingType == 'Presence') {
        $attributesToCheck = [
            'school_id' => $schoolId,
            'type' => $settingType,
            'key_name' => $keyName,
        ];

        $dataToUpdate  = [
            'academic_year_id' => null,
            'value' => $value,
            'status' => Status::ACTIVE,
        ];
    } else {
        $attributesToCheck = [
            'school_id' => $schoolId,
            'academic_year_id' => $academicYearId,
            'type' => $settingType,
            'key_name' => $keyName,
        ];

        $dataToUpdate  = [
            'value' => $value,
            'status' => Status::ACTIVE,
        ];
    }

    return SiteSetting::updateOrCreate($attributesToCheck, $dataToUpdate);
}

/**
 * get all academic years
 *
 * @return int
 */
function setSiteSettingDataArray(string $settingType, array $keyValues = array())
{
    DB::beginTransaction();

    try {
        foreach ($keyValues as $key => $value) {
            setSiteSettingData($settingType, $key, $value);
        }

        DB::commit();

        return true;
    } catch (Throwable $th) {
        DB::rollBack();

        return false;
    }
}



/**
 * get all access modules from session
 *
 * @return int
 */
function getAccessModulesFromSession($schoolId = null)
{
    $module = Module::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
        ->where('status', Status::ACTIVE)
        ->first();

    if (!empty($module->id)) {
        return json_decode($module->data);
    } else {
        return null;
    }
}


/**
 * get all academic years
 *
 * @return int
 */
function getAcademicYearsAll($schoolId = null)
{
    return AcademicYear::where('status', Status::ACTIVE)
        ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
        ->orderBy('display_order', 'ASC')
        ->select('academic_session as title', 'id')
        ->get();
}

/**
 * get school data from session school id.
 *
 * @return int
 */
function getSchoolSetting($schoolId = null)
{
    return SchoolSetting::where('status', Status::ACTIVE)
        ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
        ->select(
            'academic_year_id',
            'admission_seed',
            'admission_prefix',
            'admission_postfix',
            'ticket_url',
            'ticket_userid',
            'ticket_password',
            'admin_number',
            'training_url',
            'email_notification',
            'sms_notification',
            'is_email_notify',
            'is_sms_notify',
            'is_teacher_reply',
            'is_teacher_compose',
            'is_parent_reply',
            'is_parent_compose',
            'is_enable_email',
            'is_attendance_backdate',
            'is_teacher_newsletter',
            'is_parent_newsletter',
            'is_student_roll_softable',
            'is_class_wise_report',
            'is_teacher_self_attendance',
            'is_password_visible',
            'is_biometric_integration',
            'is_student_biometric_attendance',
            'is_view_parent_contact',
            'is_view_tc_copy',
            'is_pay_online_fee_voucher',
            'is_uploaded_photo_app',
            'is_transport_boarding_student',
            'is_event_module_teacher_login',
            'is_allow_upload_document',
            'is_weekly_status_send_to_parent'
        )
        ->first();
}



/**
 * get school id from session.
 *
 * @return int
 */
function getAcademicYearsObjs()
{
    $yearsArray = array();
    $years = getAcademicYearsAll();
    if (!empty($years)) {
        foreach ($years as $year) {
            array_push($yearsArray, ['id' => $year->id, 'title' => $year->title]);
        }
    }

    return $yearsArray;
}

/**
 * Set school id to session.
 *
 * @return null
 */
function setUserSchoolId($schoolId = null)
{
    try {
        $isSuperAdmin = getIsSuperAdmin();
        if ($isSuperAdmin && $schoolId != NULL) {
            Session::put('school_id', $schoolId);
            setAuthUserData($schoolId);
        } else {
            $user = User::find(auth()->user()->id);
            Session::put('school_id', $user->school_id);
            setAuthUserData($user->school_id);
        }
    } catch (\Throwable $th) {
        return null;
    }
}


/**
 * Set school id to session.
 *
 * @return null
 */
function setAuthMobileLogin($schoolId)
{
    $setting = SchoolSetting::where('status', Status::ACTIVE)
        ->where('school_id', $schoolId)
        ->first();
    $academicYear = AcademicYear::find($setting->academic_year_id);
    $school = School::where('id', $schoolId)
        ->with(['timezone:timezones.id,timezones.name'])
        ->select('id')
        ->first();
    try {
        Session::put('school_id', $schoolId);
        Session::put('academic_year_id', $academicYear->id);
        Session::put('academic_year_session', $academicYear->academic_session);
        if ($school != null) {
            config(['app.timezone' => $school?->timezone?->name]);
        }
    } catch (\Throwable $th) {
        //dd($th);
    }
}

/**
 * Set auth user data.
 *
 * @return null
 */
function setAuthUserData($schoolId)
{
    $setting = SchoolSetting::where('status', Status::ACTIVE)
        ->where('school_id', $schoolId)
        ->first();
    $academicYear = AcademicYear::find($setting->academic_year_id);

    try {
        Session::put('academic_year_id', $academicYear->id);
        Session::put('academic_year_session', $academicYear->academic_session);
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * Set null to session as school id.
 *
 * @return null
 */
function setSuperAdminSchoolId()
{
    $user = User::find(auth()->user()->id);
    try {
        Session::put('school_id', $user->school_id);
        setAuthUserData($user->school_id);
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * Check super admin auth.
 *
 * @return null
 */
function getIsSuperAdmin()
{
    try {
        $user = User::find(auth()->user()->id);
        $roles = $user->roles->pluck('name')->toArray();
        return in_array("Super Admin", $roles);
    } catch (\Throwable $th) {
        return false;
    }
}

/**
 * Get auth User.
 *
 * @return null
 */
function getAuthUser()
{
    try {
        $user = User::find(auth()->user()->id);
        return $user;
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * Get auth image.
 *
 * @return null
 */
function getAuthProfileImage()
{
    try {
        $staff = Staff::where('staff.user_id', auth()->user()->id)
            ->select('staff.user_id', 'staff.id')
            ->with('staffProfileImage')
            ->first();
        return $staff;
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * Check super admin auth.
 *
 * @return null
 */
function getUserRoleArray()
{
    try {
        $user = User::find(auth()->user()->id);
        $roles = $user->roles->pluck('name')->toArray();
        return $roles;
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * check main portal.
 *
 * @return boolean
 */
function getSchoolCode()
{
    try {
        $domain_url = request()->getHost();
        $domain_name = env('DOMAIN_NAME', 'localhost');
        $code = explode('.', $domain_url);
        $domain_name = explode('.', $domain_name);
        if (!empty($code[0]) && $domain_name[0] == $code[1]) {
            return $code[0];
        }
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * check main portal.
 *
 * @return boolean
 */
function getIsMainPortal()
{
    try {
        $domain_url = request()->getHost();
        $domain_name = env('DOMAIN_NAME', 'localhost');
        if ($domain_name == $domain_url) {
            return true;
        } else {
            return false;
        }
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * get full name.
 *
 * @return string
 */
function getCocatenationTitle($firstName, $middleName, $lastName)
{
    try {
        $middleName = !empty($middleName) ? ' ' . $middleName : '';
        $lastName = !empty($lastName) ? ' ' . $lastName : '';

        return trim($firstName . $middleName . $lastName);
    } catch (\Throwable $th) {
        return null;
    }
}

/**
 * Set school id to session.
 *
 * @return array
 */
function modulesPermissionsList()
{
    return array(
        "permission_parent_school_view_all" => "view school all",
        "permission_parent_school_add_all" => "add school all",
        "permission_parent_school_edit_all" => "edit school all",
        "permission_parent_school_delete_all" => "delete school all",
        "permission_parent_administration_view_all" => "view administration all",
        "permission_parent_administration_add_all" => "add administration all",
        "permission_parent_administration_edit_all" => "edit administration all",
        "permission_parent_administration_delete_all" => "delete administration all",
        "permission_parent_academics_view_all" => "view academics all",
        "permission_parent_academics_add_all" => "add academics all",
        "permission_parent_academics_edit_all" => "edit academics all",
        "permission_parent_academics_delete_all" => "delete academics all",
        "permission_parent_finance_view_all" => "view financial all",
        "permission_parent_finance_add_all" => "add financial all",
        "permission_parent_finance_edit_all" => "edit financial all",
        "permission_parent_finance_delete_all" => "delete financial all",
        "permission_parent_communication_view_all" => "view communication all",
        "permission_parent_communication_add_all" => "add communication all",
        "permission_parent_communication_edit_all" => "edit communication all",
        "permission_parent_communication_delete_all" => "delete communication all",
        "permission_parent_ourservices_view_all" => "view ourservices all",
        "permission_parent_ourservices_add_all" => "add ourservices all",
        "permission_parent_ourservices_edit_all" => "edit ourservices all",
        "permission_parent_ourservices_delete_all" => "delete ourservices all",
        "permission_parent_myprofile_view_all" => "view myprofile all",
        "permission_parent_myprofile_add_all" => "add myprofile all",
        "permission_parent_myprofile_edit_all" => "edit myprofile all",
        "permission_parent_myprofile_delete_all" => "delete myprofile all",
        "permission_parent_account_view_all" => "view account all",
        "permission_parent_account_add_all" => "add account all",
        "permission_parent_account_edit_all" => "edit account all",
        "permission_parent_account_delete_all" => "delete account all",
        "permission_parent_transportation_view_all" => "view transportation all",
        "permission_parent_transportation_add_all" => "add transportation all",
        "permission_parent_transportation_edit_all" => "edit transportation all",
        "permission_parent_transportation_delete_all" => "delete transportation all",
        "view_permission_academic_years" => "view academic years", // Start view - Setup Your School
        "view_permission_blood_groups" => "view blood groups",
        "view_permission_categories" => "view categories",
        "view_permission_classes" => "view classes",
        "view_permission_class_groups" => "view class groups",
        "view_permission_custom_fields" => "view custom fields",
        "view_permission_designations" => "view designations",
        "view_permission_departments" => "view departments",
        "view_permission_emergency_contacts" => "view emergency contacts",
        "view_permission_holidays" => "view holidays",
        "view_permission_holiday_policies" => "view holiday policies",
        "view_permission_houses" => "view houses",
        "view_permission_improve_presence_on_internet" => "view improve presence on internet",
        "view_permission_religions" => "view religions",
        "view_permission_occupations" => "view occupations",
        "view_permission_schools" => "view schools",
        "view_permission_mail_settings" => "view mail settings",
        "view_permission_school_settings" => "view school settings",
        "view_permission_sms_settings" => "view sms settings",
        "view_permission_social_shares" => "view social shares",
        "view_permission_timezones" => "view timezones",
        "view_permission_permissions" => "view permissions",
        "view_permission_school_import" => "view school import", // End view - Setup Your School
        "add_permission_academic_years" => "add academic years", // Start add - Setup Your School
        "add_permission_blood_groups" => "add blood groups",
        "add_permission_categories" => "add categories",
        "add_permission_classes" => "add classes",
        "add_permission_class_groups" => "add class groups",
        "add_permission_custom_fields" => "add custom fields",
        "add_permission_designations" => "add designations",
        "add_permission_departments" => "add departments",
        "add_permission_emergency_contacts" => "add emergency contacts",
        "add_permission_holidays" => "add holidays",
        "add_permission_holiday_policies" => "add holiday policies",
        "add_permission_houses" => "add houses",
        "add_permission_improve_presence_on_internet" => "add improve presence on internet",
        "add_permission_religions" => "add religions",
        "add_permission_occupations" => "add occupations",
        "add_permission_schools" => "add schools",
        "add_permission_mail_settings" => "add mail settings",
        "add_permission_school_settings" => "add school settings",
        "add_permission_sms_settings" => "add sms settings",
        "add_permission_social_shares" => "add social shares",
        "add_permission_timezones" => "add timezones",
        "add_permission_permissions" => "add permissions",
        "add_permission_school_import" => "add school import", // End add - Setup Your School
        "edit_permission_academic_years" => "edit academic years", // Start edit - Setup Your School
        "edit_permission_blood_groups" => "edit blood groups",
        "edit_permission_categories" => "edit categories",
        "edit_permission_classes" => "edit classes",
        "edit_permission_class_groups" => "edit class groups",
        "edit_permission_custom_fields" => "edit custom fields",
        "edit_permission_designations" => "edit designations",
        "edit_permission_departments" => "edit departments",
        "edit_permission_emergency_contacts" => "edit emergency contacts",
        "edit_permission_holidays" => "edit holidays",
        "edit_permission_holiday_policies" => "edit holiday policies",
        "edit_permission_houses" => "edit houses",
        "edit_permission_improve_presence_on_internet" => "edit improve presence on internet",
        "edit_permission_religions" => "edit religions",
        "edit_permission_occupations" => "edit occupations",
        "edit_permission_schools" => "edit schools",
        "edit_permission_mail_settings" => "edit mail settings",
        "edit_permission_school_settings" => "edit school settings",
        "edit_permission_sms_settings" => "edit sms settings",
        "edit_permission_social_shares" => "edit social shares",
        "edit_permission_timezones" => "edit timezones",
        "edit_permission_permissions" => "edit permissions",
        "edit_permission_school_import" => "edit school import", // End edit - Setup Your School
        "delete_permission_academic_years" => "delete academic years", // Start delete - Setup Your School
        "delete_permission_blood_groups" => "delete blood groups",
        "delete_permission_categories" => "delete categories",
        "delete_permission_classes" => "delete classes",
        "delete_permission_class_groups" => "delete class groups",
        "delete_permission_custom_fields" => "delete custom fields",
        "delete_permission_designations" => "delete designations",
        "delete_permission_departments" => "delete departments",
        "delete_permission_emergency_contacts" => "delete emergency contacts",
        "delete_permission_holidays" => "delete holidays",
        "delete_permission_holiday_policies" => "delete holiday policies",
        "delete_permission_houses" => "delete houses",
        "delete_permission_improve_presence_on_internet" => "delete improve presence on internet",
        "delete_permission_religions" => "delete religions",
        "delete_permission_occupations" => "delete occupations",
        "delete_permission_schools" => "delete schools",
        "delete_permission_mail_settings" => "delete mail settings",
        "delete_permission_school_settings" => "delete school settings",
        "delete_permission_sms_settings" => "delete sms settings",
        "delete_permission_social_shares" => "delete social shares",
        "delete_permission_timezones" => "delete timezones",
        "delete_permission_permissions" => "delete permissions",
        "delete_permission_school_import" => "delete school import", // End delete - Setup Your School
        "view_permission_alumni" => "view alumni", // Start view - Administration
        "view_permission_attendance_staff" => "view attendance staff",
        "view_permission_attendance_student" => "view attendance student",
        "view_permission_calendar" => "view calendar",
        "view_permission_document" => "view document",
        "view_permission_download" => "view download",
        "view_permission_enquiry" => "view enquiry",
        "view_permission_hostel" => "view hostel",
        "view_permission_helpdesk" => "view helpdesk",
        "view_permission_leave" => "view leave",
        "view_permission_library" => "view library",
        "view_permission_post_jobs" => "view post jobs",
        "view_permission_staffs" => "view staffs",
        "view_permission_student" => "view student",
        "view_permission_summary" => "view summary",
        "view_permission_survey" => "view survey",
        "view_permission_team" => "view team",
        "view_permission_exam" => "view exam", // End view - Administration
        "add_permission_alumni" => "add alumni", // Start add - Administration
        "add_permission_attendance_staff" => "add attendance staff",
        "add_permission_attendance_student" => "add attendance student",
        "add_permission_calendar" => "add calendar",
        "add_permission_document" => "add document",
        "add_permission_download" => "add download",
        "add_permission_enquiry" => "add enquiry",
        "add_permission_hostel" => "add hostel",
        "add_permission_helpdesk" => "add helpdesk",
        "add_permission_leave" => "add leave",
        "add_permission_library" => "add library",
        "add_permission_post_jobs" => "add post jobs",
        "add_permission_staffs" => "add staffs",
        "add_permission_student" => "add student",
        "add_permission_summary" => "add summary",
        "add_permission_survey" => "add survey",
        "add_permission_team" => "add team",
        "add_permission_exam" => "add exam", // End add - Administration
        "edit_permission_alumni" => "edit alumni", // Start edit - Administration
        "edit_permission_attendance_staff" => "edit attendance staff",
        "edit_permission_attendance_student" => "edit attendance student",
        "edit_permission_calendar" => "edit calendar",
        "edit_permission_document" => "edit document",
        "edit_permission_download" => "edit download",
        "edit_permission_enquiry" => "edit enquiry",
        "edit_permission_hostel" => "edit hostel",
        "edit_permission_helpdesk" => "edit helpdesk",
        "edit_permission_leave" => "edit leave",
        "edit_permission_library" => "edit library",
        "edit_permission_post_jobs" => "edit post jobs",
        "edit_permission_staffs" => "edit staffs",
        "edit_permission_student" => "edit student",
        "edit_permission_summary" => "edit summary",
        "edit_permission_survey" => "edit survey",
        "edit_permission_team" => "edit team",
        "edit_permission_exam" => "edit exam", // End edit - Administration
        "delete_permission_alumni" => "delete alumni", // Start delete - Administration
        "delete_permission_attendance_staff" => "delete attendance staff",
        "delete_permission_attendance_student" => "delete attendance student",
        "delete_permission_calendar" => "delete calendar",
        "delete_permission_document" => "delete document",
        "delete_permission_download" => "delete download",
        "delete_permission_enquiry" => "delete enquiry",
        "delete_permission_hostel" => "delete hostel",
        "delete_permission_helpdesk" => "delete helpdesk",
        "delete_permission_leave" => "delete leave",
        "delete_permission_library" => "delete library",
        "delete_permission_post_jobs" => "delete post jobs",
        "delete_permission_staffs" => "delete staffs",
        "delete_permission_student" => "delete student",
        "delete_permission_summary" => "delete summary",
        "delete_permission_survey" => "delete survey",
        "delete_permission_team" => "delete team",
        "delete_permission_exam" => "delete exam", // End delete - Administration
        "view_permission_academic" => "view academic", // Start view - Academics academic
        "view_permission_academic_grade" => "view academic syllabus",
        "view_permission_academic_grade" => "view academic grade",
        "view_permission_academic_content" => "view academic content",
        "view_permission_assessment" => "view assessment",
        "view_permission_classwork" => "view classwork",
        "view_permission_homework" => "view homework",
        "view_permission_lesson_plan" => "view lesson plan",
        "view_permission_online_class" => "view online class",
        "view_permission_online_exam" => "view online exam",
        "view_permission_academic_syllabus" => "view academic syllabus",
        "view_permission_certificate" => "view certificate",
        "view_permission_time_table" => "view time_table", // End view - Academics
        "add_permission_academic" => "add academic", // Start add - Academics
        "add_permission_academic_report" => "add academic report",
        "add_permission_academic_grade" => "add academic grade",
        "add_permission_academic_content" => "add academic content",
        "add_permission_assessment" => "add assessment",
        "add_permission_classwork" => "add classwork",
        "add_permission_homework" => "add homework",
        "add_permission_lesson_plan" => "add lesson plan",
        "add_permission_online_class" => "add online class",
        "add_permission_online_exam" => "add online exam",
        "add_permission_academic_syllabus" => "add academic syllabus",
        "add_permission_certificate" => "add certificate",
        "add_permission_time_table" => "add time_table", // End add - Academics
        "edit_permission_academic" => "edit academic", // Start edit - Academics
        "edit_permission_academic_grade" => "edit academic grade",
        "edit_permission_academic_content" => "edit academic content",
        "edit_permission_assessment" => "edit assessment",
        "edit_permission_classwork" => "edit classwork",
        "edit_permission_homework" => "edit homework",
        "edit_permission_lesson_plan" => "edit lesson plan",
        "edit_permission_online_class" => "edit online class",
        "edit_permission_online_exam" => "edit online exam",
        "edit_permission_academic_syllabus" => "edit academic syllabus",
        "edit_permission_certificate" => "edit certificate",
        "edit_permission_time_table" => "edit time_table", // End edit - Academics
        "delete_permission_academic" => "delete academic", // Start delete - Academics
        "delete_permission_academic_grade" => "delete academic grade",
        "delete_permission_academic_content" => "delete academic content",
        "delete_permission_assessment" => "delete assessment",
        "delete_permission_classwork" => "delete classwork",
        "delete_permission_homework" => "delete homework",
        "delete_permission_lesson_plan" => "delete lesson plan",
        "delete_permission_online_class" => "delete online class",
        "delete_permission_online_exam" => "delete online exam",
        "delete_permission_academic_syllabus" => "delete academic syllabus",
        "delete_permission_certificate" => "delete certificate",
        "delete_permission_time_table" => "delete time_table", // End delete - Academics
        "view_permission_admission" => "view admission", // Start view - Financial
        "view_permission_fees" => "view fees",
        "view_permission_accounts" => "view accounts",
        "view_permission_salary" => "view salary", // End view - Financial
        "add_permission_admission" => "add admission", // Start add - Financial
        "add_permission_fees" => "add fees",
        "add_permission_accounts" => "add accounts",
        "add_permission_salary" => "add salary", // End add - Financial
        "edit_permission_admission" => "edit admission", // Start edit - Financial
        "edit_permission_fees" => "edit fees",
        "edit_permission_accounts" => "edit accounts",
        "edit_permission_salary" => "edit salary", // End edit - Financial
        "delete_permission_admission" => "delete admission", // Start delete - Financial
        "delete_permission_fees" => "delete fees",
        "delete_permission_accounts" => "delete accounts",
        "delete_permission_salary" => "delete salary", // End delete - Financial
        "view_permission_event" => "view event", // Start view - Communication
        "view_permission_message" => "view message",
        "view_permission_news" => "view news",
        "view_permission_notice" => "view notice",
        "view_permission_broadcast" => "view broadcast",
        "view_permission_birthday" => "view birth day", // End view - Communication
        "add_permission_event" => "add event", // Start add - Communication
        "add_permission_message" => "add message",
        "add_permission_news" => "add news",
        "add_permission_notice" => "add notice",
        "add_permission_broadcast" => "add broadcast",
        "add_permission_birthday" => "add birth day", // End add - Communication
        "edit_permission_event" => "edit event", // Start edit - Communication
        "edit_permission_message" => "edit message",
        "edit_permission_news" => "edit news",
        "edit_permission_notice" => "edit notice",
        "edit_permission_broadcast" => "edit broadcast",
        "edit_permission_birthday" => "edit birth day", // End edit - Communication
        "delete_permission_event" => "delete event", // Start delete - Communication
        "delete_permission_message" => "delete message",
        "delete_permission_news" => "delete news",
        "delete_permission_notice" => "delete notice",
        "delete_permission_broadcast" => "delete broadcast",
        "delete_permission_birthday" => "delete birth day", // End delete - Communication
        "view_permission_buy_sms" => "view buy sms", // Start view - our services
        "view_permission_support_tickets" => "view support tickets",
        "view_permission_billing" => "view billing",
        "view_permission_buy_services" => "view buy services", // End view - our services
        "add_permission_buy_sms" => "add buy sms", // Start add - our services
        "add_permission_support_tickets" => "add support tickets",
        "add_permission_billing" => "add billing",
        "add_permission_buy_services" => "add buy services", // End add - our services
        "edit_permission_buy_sms" => "edit buy sms", // Start edit - our services
        "edit_permission_support_tickets" => "edit support tickets",
        "edit_permission_billing" => "edit billing",
        "edit_permission_buy_services" => "edit buy services", // End edit - our services
        "delete_permission_buy_sms" => "delete buy sms", // Start delete - our services
        "delete_permission_support_tickets" => "delete support tickets",
        "delete_permission_billing" => "delete billing",
        "delete_permission_buy_services" => "delete buy services", // End delete - our services
        "view_permission_pay_slip" => "view pay slip", // Start view - My Profile
        "view_permission_attendance" => "view attendance",
        "view_permission_manage_leave" => "view manage leave",
        "view_permission_manage_your_profile" => "view manage your profile",
        "view_permission_transport_details" => "view transport details",
        "view_permission_extra_duty" => "view extra duty", // End view - My Profile
        "add_permission_pay_slip" => "add pay slip", // Start Add - My Profile
        "add_permission_attendance" => "add attendance",
        "add_permission_manage_leave" => "add manage leave",
        "add_permission_manage_your_profile" => "add manage your profile",
        "add_permission_transport_details" => "add transport details",
        "add_permission_extra_duty" => "add extra duty", // End Add - My Profile
        "edit_permission_pay_slip" => "edit pay slip", // Start Edit - My Profile
        "edit_permission_attendance" => "edit attendance",
        "edit_permission_manage_leave" => "edit manage leave",
        "edit_permission_manage_your_profile" => "edit manage your profile",
        "edit_permission_transport_details" => "edit transport details",
        "edit_permission_extra_duty" => "edit extra duty", // End Edit - My Profile
        "delete_permission_pay_slip" => "delete pay slip", // Start Delete - My Profile
        "delete_permission_attendance" => "delete attendance",
        "delete_permission_manage_leave" => "delete manage leave",
        "delete_permission_manage_your_profile" => "delete manage your profile",
        "delete_permission_transport_details" => "delete transport details",
        "delete_permission_extra_duty" => "delete extra duty", // End Delete - My Profile
        "view_permission_account_group" => "view account group", // Start view - Account
        "view_permission_voucher_type" => "view voucher type",
        "view_permission_stock_group" => "view stock group",
        "view_permission_sale_group" => "view sale group",
        "view_permission_ledger" => "view ledger",
        "view_permission_transaction" => "view transaction",
        "view_permission_inventory_allocation" => "view inventory allocation",
        "view_permission_asset_allocation" => "view asset allocation",
        "view_permission_account_setting" => "view account setting",
        "view_permission_product" => "view product",
        "view_permission_sale" => "view sale",
        "view_permission_vendor" => "view vendor",
        "view_permission_infra_level" => "view infra level",
        "view_permission_account_import_export" => "view account import export",
        "view_permission_account_company" => "view account company", // End view - Account
        "add_permission_account_group" => "add account group", // Start Add - Account
        "add_permission_voucher_type" => "add voucher type",
        "add_permission_stock_group" => "add stock group",
        "add_permission_sale_group" => "add sale group",
        "add_permission_ledger" => "add ledger",
        "add_permission_transaction" => "add transaction",
        "add_permission_inventory_allocation" => "add inventory allocation",
        "add_permission_asset_allocation" => "add asset allocation",
        "add_permission_account_setting" => "add account setting",
        "add_permission_product" => "add product",
        "add_permission_sale" => "add sale",
        "add_permission_vendor" => "add vendor",
        "add_permission_infra_level" => "add infra level",
        "add_permission_account_import_export" => "add account import export",
        "add_permission_account_company" => "add account company", // End Add - Account
        "edit_permission_account_group" => "edit account group", // Start Edit - Account
        "edit_permission_voucher_type" => "edit voucher type",
        "edit_permission_stock_group" => "edit stock group",
        "edit_permission_sale_group" => "edit sale group",
        "edit_permission_ledger" => "edit ledger",
        "edit_permission_transaction" => "edit transaction",
        "edit_permission_inventory_allocation" => "edit inventory allocation",
        "edit_permission_asset_allocation" => "edit asset allocation",
        "edit_permission_account_setting" => "edit account setting",
        "edit_permission_product" => "edit product",
        "edit_permission_sale" => "edit sale",
        "edit_permission_vendor" => "edit vendor",
        "edit_permission_infra_level" => "edit infra level",
        "edit_permission_account_import_export" => "edit account import export",
        "edit_permission_account_company" => "edit account company", // End Edit - Account
        "delete_permission_account_group" => "delete account group", // Start Delete - Account
        "delete_permission_voucher_type" => "delete voucher type",
        "delete_permission_stock_group" => "delete stock group",
        "delete_permission_sale_group" => "delete sale group",
        "delete_permission_ledger" => "delete ledger",
        "delete_permission_transaction" => "delete transaction",
        "delete_permission_inventory_allocation" => "delete inventory allocation",
        "delete_permission_asset_allocation" => "delete asset allocation",
        "delete_permission_account_setting" => "delete account setting",
        "delete_permission_product" => "delete product",
        "delete_permission_sale" => "delete sale",
        "delete_permission_vendor" => "delete vendor",
        "delete_permission_infra_level" => "delete infra level",
        "delete_permission_account_import_export" => "delete account import export",
        "delete_permission_account_company" => "delete account company", // End Delete - Account
        "view_permission_transport" => "view transport", // Start view - Transportation
        "view_permission_area" => "view area",
        "view_permission_vehicle" => "view vehicle",
        "view_permission_vehicle_staffs" => "view vehicle staffs",
        "view_permission_transport_allocation" => "view transport allocation",
        "view_permission_transport_settings" => "view transport settings",
        "view_permission_transport_routes" => "view transport routes",
        "view_permission_transport_stoppages" => "view transport stoppages", // End view - Transportation
        "add_permission_transport" => "add transport", // Start add - Transportation
        "add_permission_area" => "add area",
        "add_permission_vehicle" => "add vehicle",
        "add_permission_vehicle_staffs" => "add vehicle staffs",
        "add_permission_transport_allocation" => "add transport allocation",
        "add_permission_transport_settings" => "add transport settings",
        "add_permission_transport_routes" => "add transport routes",
        "add_permission_transport_stoppages" => "add transport stoppages", // End add - Transportation
        "edit_permission_transport" => "edit transport", // Start edit - Transportation
        "edit_permission_area" => "edit area",
        "edit_permission_vehicle" => "edit vehicle",
        "edit_permission_vehicle_staffs" => "edit vehicle staffs",
        "edit_permission_transport_allocation" => "edit transport allocation",
        "edit_permission_transport_settings" => "edit transport settings",
        "edit_permission_transport_routes" => "edit transport routes",
        "edit_permission_transport_stoppages" => "edit transport stoppages", // End edit - Transportation
        "delete_permission_transport" => "delete transport", // Start delete - Transportation
        "delete_permission_area" => "delete area",
        "delete_permission_vehicle" => "delete vehicle",
        "delete_permission_vehicle_staffs" => "delete vehicle staffs",
        "delete_permission_transport_allocation" => "delete transport allocation",
        "delete_permission_transport_settings" => "delete transport settings",
        "delete_permission_transport_routes" => "delete transport routes",
        "delete_permission_transport_stoppages" => "delete transport stoppages", // End delete - Transportation
    );
}


/**
 * get fee installment list from enum.
 *
 * @return array
 */
function getFeeInstallmentTypeList()
{
    $installment_types = [];

    foreach (FeeInstallmentType::cases() as $installment_type) {
        array_push($installment_types, ['id' => $installment_type->value, 'title' => $installment_type->value]);
    }

    return $installment_types;
}

/**
 * get start & end date of month.
 *
 * @return array
 */
function getStartEndDateOfMonth()
{
    return [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()];
}

/**
 * get Today Day Name.
 *
 * @return array
 */
function getTodayDay()
{
    return Carbon::now()->isoFormat('dddd');
}

/**
 * get current Month Name - format: January.
 *
 * @return string
 */
function getCurrentMonth()
{
    return Carbon::now()->isoFormat('MMMM');
}

/**
 * get current Month Name - format: 1.
 *
 * @return string
 */
function getCurrentMonthNumber()
{
    return Carbon::now()->isoFormat('M');
}

/**
 * get current year.
 *
 * @return string
 */
function getCurrentYear()
{
    return Carbon::now()->isoFormat('YYYY');
}

/**
 * get enum options array.
 *
 * @return array
 */
if (!function_exists('buildEnumOptionsArray')) {
    function buildEnumOptionsArray($cases)
    {
        $options = [];

        foreach ($cases as $case) {
            $options[] = ['id' => $case->value, 'title' => $case->value];
        }

        return $options;
    }
}


/**
 * set school timezone
 *
 * @param string $timezone
 *
 * @return void
 */
if (!function_exists('setSchoolTimeZone')) {
    function setSchoolTimeZone(string $timezone = "")
    {
        if (empty($timezone)) {
            $school = School::where('id', getUserSchoolId())
                ->with(['timezone:timezones.id,timezones.name'])
                ->select('id')
                ->first();

            if ($school != null) {
                $timezone = $school?->timezone?->name ?? "";
            }
        }

        if (!empty($timezone)) {
            // Set the timezone configuration using the config helper function
            config(['app.timezone' => $timezone]);
        }
    }
}


/**
 * get school timezone
 *
 *
 * @return string
 */
if (!function_exists('getSchoolTimeZone')) {
    function getSchoolTimeZone()
    {
        return config('app.timezone');
    }
}

/**
 * set parent id
 * @param int $id
 *
 * @return void
 */
if (!function_exists('setParentId')) {
    function setParentId(int $id = null)
    {
        Session::put('parent_id', $id);
    }
}

/**
 * get parent id
 *
 * @return int
 */
if (!function_exists('getParentId')) {
    function getParentId()
    {
        return !empty(Session::get('parent_id')) ? Session::get('parent_id') : null;
    }
}


/**
 * set student id
 * @param int $id
 *
 * @return void
 */
if (!function_exists('setStudentId')) {
    function setStudentId(int $id = null)
    {
        Session::put('student_id', $id);
    }
}


/**
 * get student id
 *
 * @return string
 */
if (!function_exists('getStudentId')) {
    function getStudentId()
    {
        return !empty(Session::get('student_id')) ? Session::get('student_id') : null;
    }
}


/**
 * check if image url is valid
 *
 * @param string $url
 *
 * @return bool
 */
if (!function_exists('isValidImageUrl')) {
    function isValidImageUrl($url)
    {
        // Validate the URL format
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        // Use @getimagesize to check if the URL is a valid image
        $imageInfo = @getimagesize($url);

        // If $imageInfo is false, the URL is not a valid image
        return $imageInfo !== false;
    }
}

function getTeacherSubjects($schoolId, $academicYearId, $counts)
{
    $classroomSubjects = getClassroomSubjects($schoolId, $academicYearId);
    $teachers = array();
    foreach ($classroomSubjects as $classSubject) {
        $jsonTeachers = !empty($classSubject->teachers_data) ? json_decode($classSubject->teachers_data) : Null;
        if (!empty($jsonTeachers)) {
            foreach ($jsonTeachers as $teacherKey => $teacher) {
                $tempArray = array(
                    'teacher_id' => $teacher->teacher_id ?? null,
                    'teacher_name' => $teacher->teacher_name ?? null,
                    'subject_id' => $classSubject->subject_id,
                    'title' => $classSubject->title,
                    'count' => $counts,
                );
                $teachers[$teacher->teacher_id][] = $tempArray;
            }
        }
    }
    return $teachers;
}

function getTeacherClassroom($schoolId, $academicYearId, $counts)
{
    $classroomSubjects = getClassroomSubjects($schoolId, $academicYearId);
    $teachers = array();
    $tempKeptArray = [];
    foreach ($classroomSubjects as $classSubject) {
        $jsonTeachers = !empty($classSubject->teachers_data) ? json_decode($classSubject->teachers_data) : Null;
        if (!empty($jsonTeachers)) {
            foreach ($jsonTeachers as $teacherKey => $teacher) {
                if (!in_array($classSubject->classroom_id . '_' . $teacher->teacher_id, $tempKeptArray)) {
                    $tempArray = array(
                        'teacher_id' => $teacher->teacher_id ?? null,
                        'teacher_name' => $teacher->teacher_name ?? null,
                        'classroom_id' => $classSubject->classroom_id,
                        'title' => $classSubject->classroom_title,
                        'count' => $counts,
                    );
                    $teachers[$teacher->teacher_id][] = $tempArray;
                    array_push($tempKeptArray, $classSubject->classroom_id . '_' . $teacher->teacher_id);
                }
            }
        }
    }
    return $teachers;
}

function getClassroomSubjects($schoolId, $academicYearId)
{
    return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
        ->where('classroom_subjects.school_id', $schoolId)
        ->where('classroom_subjects.academic_year_id', $academicYearId)
        ->orderBy("classroom_subjects.display_order", "ASC")
        ->leftJoin('classrooms', 'classrooms.id', '=', 'classroom_subjects.classroom_id')
        ->leftJoin('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
        ->select(
            'subjects.title',
            'classroom_subjects.subject_id',
            'classroom_subjects.academic_grade_id',
            'classroom_subjects.classroom_id',
            'classroom_subjects.is_marking',
            'classroom_subjects.teachers_data',
            'classroom_subjects.type',
            'classroom_subjects.grade_scale',
            'classroom_subjects.is_marking',
            'classroom_subjects.display_order',
            'classrooms.title as classroom_title'
        )
        ->get();
}

/**
 * get sms circular audience attributes
 *
 * @return array
 */
if (!function_exists('getAudienceAttributes')) {
    function getAudienceAttributes()
    {
        return [
            CircularAudienceType::SCHOOL->value => [
                '#SchoolName',
                '#SchoolCity',
                '#SchoolAddress',
                '#SchoolPhone',
                '#SchoolMail',
                '#Website',
                '#SessionYear'
            ],
            CircularAudienceType::STAFF->value => [
                '#Name',
                '#Email',
                '#TeacherPhone',
                '#JoiningDate',
                '#LeavingDate',
                '#BirthDate',
                '#Department',
                '#Designation',
                '#BloodGroup',
                '#PanNumber',
                '#SchoolName',
                '#SchoolCity',
                '#SchoolAddress',
                '#SchoolPhone',
                '#SchoolMail',
                '#Website',
                '#SessionYear'
            ],
            CircularAudienceType::STUDENT->value => [
                '#Name',
                '#Class',
                '#FatherName',
                '#MotherName',
                '#AdmissionNo',
                '#RegistrationNumber',
                '#SchoolName',
                '#SchoolCity',
                '#SchoolAddress',
                '#SchoolPhone',
                '#SchoolMail',
                '#Website',
                '#SessionYear'
            ],
        ];
    }
}

if (!function_exists('getMailConfigSettings')) {
    function getMailConfigSettings()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', 'Mail')
            ->select('key_name', 'value')
            ->get()
            ->pluck('value', 'key_name')
            ->toArray();
    }
}

if (!function_exists('getGatePassSettings')) {
    function getGatePassSettings()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', 'gatepass')
            ->select('key_name', 'value')
            ->get()
            ->pluck('value', 'key_name')
            ->toArray();
    }
}

if (!function_exists('getPaymentGatewaySettings')) {
    function getPaymentGatewaySettings()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', 'Payment Gateway')
            ->select('key_name', 'value')
            ->get()
            ->pluck('value', 'key_name')
            ->toArray();
    }
}

if (!function_exists('getPaymentGatewaySettingByKey')) {
    function getPaymentGatewaySettingByKey(string $key)
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', 'Payment Gateway')
            ->where('key_name', $key)
            ->select('key_name', 'value')
            ->first();
    }
}

if (!function_exists('getServices')) {
    function getServices()
    {
        return [
            'website' => [
                'id' => 'website',
                'title' => 'Website',
                'type' => 'onetime',
                'price' => 15000,
            ],
            'website_maintenance' => [
                'id' => 'website_maintenance',
                'title' => 'Website Maintenance (Yearly)',
                'type' => 'yearly',
                'price' => 5000,
            ],
            'hosting' => [
                'id' => 'hosting',
                'title' => 'Hosting (Yearly)',
                'type' => 'yearly',
                'price' => 5000,
            ],
            'domain' => [
                'id' => 'domain',
                'title' => 'Domain (Yearly)',
                'type' => 'yearly',
                'price' => 1000,
            ],
            'file_storage' => [
                'id' => 'file_storage',
                'title' => 'File Storage (Yearly)',
                'type' => 'yearly',
                'price' => 10000,
            ],
            'biometric_first_year' => [
                'id' => 'biometric_first_year',
                'title' => 'Biometirc (Yearly Licence Rs 2000 + Set up Cost Rs 2000 One time)',
                'type' => 'yearly',
                'price' => 4000,
            ],
            'biometric_yearly_licence' => [
                'id' => 'biometric_yearly_licence',
                'title' => 'Biometric Yearly Licence',
                'type' => 'yearly',
                'price' => 2000,
            ],
            'gps_integration' => [
                'id' => 'gps_integration',
                'title' => 'GPS Integration (One Time)',
                'type' => 'onetime',
                'price' => 5000,
            ],
            'branded_phone_app' => [
                'id' => 'branded_phone_app',
                'title' => 'Branded Phone App (One Time)',
                'type' => 'onetime',
                'price' => 15000,
            ],
            'standard_phone_app' => [
                'id' => 'standard_phone_app',
                'title' => 'Standard Phone App (Yearly)',
                'type' => 'yearly',
                'price' => 10000,
            ],
            'sms_integration' => [
                'id' => 'sms_integration',
                'title' => 'SMS Integration (One Time)',
                'type' => 'onetime',
                'price' => 10000,
            ],
            'payment_gateway_integration' => [
                'id' => 'payment_gateway_integration',
                'title' => 'Third Party Online Payment Gateway Integration (Yearly)',
                'type' => 'yearly',
                'price' => 10000,
            ],
            'whatsapp_integration' => [
                'id' => 'whatsapp_integration',
                'title' => 'Whatsapp Integration + GST (One Time)',
                'type' => 'onetime',
                'price' => 5900,
            ],
            'student_biometric_attendance' => [
                'id' => 'student_biometric_attendance',
                'title' => 'Student Biometric Attendance up to 300 Students (Yearly)',
                'type' => 'yearly',
                'price' => 10000,
            ],
            'phone_app_maintenance' => [
                'id' => 'phone_app_maintenance',
                'title' => 'Phone App Maintenance (Yearly)',
                'type' => 'yearly',
                'price' => 5000,
            ],
            'design_qr_code_posters' => [
                'id' => 'design_qr_code_posters',
                'title' => 'Design QR Code Posters',
                'type' => 'onetime',
                'price' => 600,
            ],
            'customisation' => [
                'id' => 'customisation',
                'title' => 'Customization charges - Rs 2000 per day * Number of Development Days',
                'type' => 'onetime',
                'price' => 0,
            ],
            'other' => [
                'id' => 'other',
                'title' => 'Other',
                'type' => 'onetime',
                'price' => 0,
            ],
        ];
    }
}

if (!function_exists('getServiceByKey')) {
    function getServiceByKey(string $key)
    {
        $services = getServices();

        return $services[$key] ?? [];
    }
}
