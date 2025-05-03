<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\ModuleRequest;
use App\Repositories\ModuleRepository;
use App\Repositories\IModuleRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\ISchoolRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;

class ModuleController extends Controller
{
    public function __construct( 
        private ISchoolRepository $schoolRepository,
        private IModuleRepository $moduleRepository
    ) 
    {
        // do something
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $schools = $this->schoolRepository->getActiveAll();
        $schoolId = !empty($_GET['school']) ? $_GET['school'] : getUserSchoolId();
        if( !empty($schoolId) ) {
            $modules = $this->moduleRepository->getModuleById($schoolId);
        }
        else {
            $modules = $this->moduleRepository->getBySchoolSession();
        }

        

        if( !empty($modules->data) ) {
            $selectedModules = json_decode($modules->data);
        }
        else {
            $selectedModules = array();
        }

        return Inertia::render('Module/Show', [
            'schools' => $schools,
            'modules' => $selectedModules,
            'schoolId' => $schoolId,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(Request $request): RedirectResponse
    {
        $input = $request->all();

        $moduleArray = array(
            'module_parent_school_all' => !empty($input['module_parent_school_all']) ? true : false,
            'module_parent_administration_all' => !empty($input['module_parent_administration_all']) ? true : false,
            'module_parent_academics_all' => !empty($input['module_parent_academics_all']) ? true : false,
            'module_parent_finance_all' => !empty($input['module_parent_finance_all']) ? true : false,
            'module_parent_communication_all' => !empty($input['module_parent_communication_all']) ? true : false,
            'module_parent_ourservices_all' => !empty($input['module_parent_ourservices_all']) ? true : false,
            'module_parent_mydetails_all' => !empty($input['module_parent_mydetails_all']) ? true : false,

            // modules of setup school
            'module_enquiry' => !empty($input['module_enquiry']) ? true : false,
            'module_registration' => !empty($input['module_registration']) ? true : false,
            'module_academic_years' => !empty($input['module_academic_years']) ? true : false,
            'module_blood_groups' => !empty($input['module_blood_groups']) ? true : false,
            'module_categories' => !empty($input['module_categories']) ? true : false,
            'module_classes' => !empty($input['module_classes']) ? true : false,
            'module_class_groups' => !empty($input['module_class_groups']) ? true : false,
            'module_custom_fields' => !empty($input['module_custom_fields']) ? true : false,
            'module_designations' => !empty($input['module_designations']) ? true : false,
            'module_departments' => !empty($input['module_departments']) ? true : false,
            'module_emergency_contacts' => !empty($input['module_emergency_contacts']) ? true : false,
            'module_holidays' => !empty($input['module_holidays']) ? true : false,
            'module_holiday_policies' => !empty($input['module_holiday_policies']) ? true : false,
            'module_houses' => !empty($input['module_houses']) ? true : false,
            'module_improve_presence_on_internet' => !empty($input['module_improve_presence_on_internet']) ? true : false,
            'module_religions' => !empty($input['module_religions']) ? true : false,
            'module_occupations' => !empty($input['module_occupations']) ? true : false,
            'module_schools' => !empty($input['module_schools']) ? true : false,
            'module_mail_settings' => !empty($input['module_mail_settings']) ? true : false,
            'module_school_settings' => !empty($input['module_school_settings']) ? true : false,
            'module_sms_settings' => !empty($input['module_sms_settings']) ? true : false,
            'module_social_shares' => !empty($input['module_social_shares']) ? true : false,
            'module_timezones' => !empty($input['module_timezones']) ? true : false,
            'module_permissions' => !empty($input['module_permissions']) ? true : false,
            'module_school_import' => !empty($input['module_school_import']) ? true : false,
            'module_school_export' => !empty($input['module_school_export']) ? true : false,

            // modules of Administration
            'module_alumni' => !empty($input['module_alumni']) ? true : false,
            'module_attendance_staff' => !empty($input['module_attendance_staff']) ? true : false,
            'module_attendance_student' => !empty($input['module_attendance_student']) ? true : false,
            'module_calendar' => !empty($input['module_calendar']) ? true : false,
            'module_document' => !empty($input['module_document']) ? true : false,
            'module_download' => !empty($input['module_download']) ? true : false,
            'module_visitor_enquiry' => !empty($input['module_visitor_enquiry']) ? true : false,
            'module_hostel' => !empty($input['module_hostel']) ? true : false,
            'module_helpdesk' => !empty($input['module_helpdesk']) ? true : false,
            'module_leave' => !empty($input['module_leave']) ? true : false,
            'module_library' => !empty($input['module_library']) ? true : false,
            'module_post_jobs' => !empty($input['module_post_jobs']) ? true : false,
            'module_staffs' => !empty($input['module_staffs']) ? true : false,
            'module_student' => !empty($input['module_student']) ? true : false,
            'module_summary' => !empty($input['module_summary']) ? true : false,
            'module_survey' => !empty($input['module_survey']) ? true : false,
            'module_team' => !empty($input['module_team']) ? true : false,
            'module_transport' => !empty($input['module_transport']) ? true : false,

            // modules of Academics
            'module_academic' => !empty($input['module_academic']) ? true : false,
            'module_academic_content' => !empty($input['module_academic_content']) ? true : false,
            'module_assessment' => !empty($input['module_assessment']) ? true : false,
            'module_classwork' => !empty($input['module_classwork']) ? true : false,
            'module_homework' => !empty($input['module_homework']) ? true : false,
            'module_lesson_plan' => !empty($input['module_lesson_plan']) ? true : false,
            'module_online_class' => !empty($input['module_online_class']) ? true : false,
            'module_online_exam' => !empty($input['module_online_exam']) ? true : false,
            'module_time_table' => !empty($input['module_time_table']) ? true : false,
            'module_syllabus' => !empty($input['module_syllabus']) ? true : false,
            'module_exams' => !empty($input['module_exams']) ? true : false,
            'module_certificate' => !empty($input['module_certificate']) ? true : false,
            'module_academic_grade' => !empty($input['module_academic_grade']) ? true : false,

            

            // modules of Finance
            'module_admission' => !empty($input['module_admission']) ? true : false,
            'module_fees' => !empty($input['module_fees']) ? true : false,
            'module_accounts' => !empty($input['module_accounts']) ? true : false,
            'module_salary' => !empty($input['module_salary']) ? true : false,

            // modules of Communication
            'module_event' => !empty($input['module_event']) ? true : false,
            'module_message' => !empty($input['module_message']) ? true : false,
            'module_news' => !empty($input['module_news']) ? true : false,
            'module_notice' => !empty($input['module_notice']) ? true : false,
            'module_broadcast' => !empty($input['module_broadcast']) ? true : false,
            'module_birthday' => !empty($input['module_birthday']) ? true : false,
            'module_notification' => !empty($input['module_notification']) ? true : false,
            'module_mail' => !empty($input['module_mail']) ? true : false,
            'module_sms' => !empty($input['module_sms']) ? true : false,
            'module_complaints' => !empty($input['module_complaints']) ? true : false,
            'module_feedback' => !empty($input['module_feedback']) ? true : false,

            // modules of Our Services
            'module_buy_sms' => !empty($input['module_buy_sms']) ? true : false,
            'module_support_tickets' => !empty($input['module_support_tickets']) ? true : false,
            'module_billing' => !empty($input['module_billing']) ? true : false,
            'module_buy_services' => !empty($input['module_buy_services']) ? true : false,

            // modules of my details
            'module_pay_slip' => !empty($input['module_pay_slip']) ? true : false,
            'module_attendance' => !empty($input['module_attendance']) ? true : false,
            'module_manage_leave' => !empty($input['module_manage_leave']) ? true : false,
            'module_manage_your_profile' => !empty($input['module_manage_your_profile']) ? true : false,
            'module_transport_details' => !empty($input['module_transport_details']) ? true : false,
            'module_extra_duty' => !empty($input['module_extra_duty']) ? true : false,

        );


        $dataArray = array(
            'school_id' => $input['school'],
            'name' => "module_school_id_". $input['school'],
            'data' => json_encode($moduleArray),
            'details' => $input['details'] ?? "",
            'status' => Status::ACTIVE,
        );
        $module = $this->moduleRepository->createOrUpdate($input['school'], $dataArray);

        return redirect('/modules?school='. $input['school']);
    }

}
