<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Mail\SupportTicket;
use Illuminate\Http\Request;
use App\Services\MailService;
use App\Enums\ContactReasonType;
use App\Http\Requests\LoginRequest;
use App\Jobs\SupportTicketEmailJob;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IUserRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\FeedbackRequest;
use App\Repositories\IStaffRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\SupportTicketRequest;
use App\Repositories\SupportTicketRepository;
use App\Repositories\ISupportTicketRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IStaffAttendanceRepository;
use App\Repositories\IVisitorEnquiryRepositoryType;
use App\Http\Controllers\MessageTextLocalController;

class SupportTicketController extends Controller
{

    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private ISupportTicketRepository $supportTicketRepository,
        private IStudentRepository $studentRepository,
        private IVisitorEnquiryRepositoryType $visitorEnquiryRepositoryType,
        private MailService $mailService,
        private ISchoolRepository $schoolRepository,
        private IUserRepository $userRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository
    ) {
        // do somethings!
    }

    /**
     * Display the Ticket List.
     */
    public function index(Request $request): Response
    {

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroom_id = "";

        // requested variables
        $request_type = "";
        $assign_to = null;
        $start_date = "";
        $month = "";
        $end_date = "";
        $solution_status = "";
        $student_name = "";
        $parent_phone = "";
        $current_request_type = "";

        $ContactReasons = [];
        $classrooms = [];
        $students = [];
        $status = [];
        
        $ContactReasonData = ContactReasonType::cases();
        
        foreach($ContactReasonData as $type) {
            array_push($ContactReasons, ['id' => $type->value, 'title' => $type->value]);
        }

        $StatusData = Status::cases();

        foreach($StatusData as $type) {
            array_push($status, ['id' => $type->value, 'title' => $type->value]);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        if ($request->isMethod('post')) {
            $request_type = $request->request_type;
            $assign_to = $request->assign_to;
            $start_date = $request->start_date;
            $month = $request->month;
            $end_date = $request->end_date;
            $solution_status = $request->solution_status;
            $student_name = $request->student_name;
            $parent_phone = $request->parent_phone;
            $current_request_type = $request->current_request_type;
              
            if(!empty($classroom_id)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroom_id)->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name . ' - ' . $student->admission_no,
                    ];
                });
            }
        }

        $teachers = $this->staffRepository->getActiveTeacherName();
        $supportTickets = $this->supportTicketRepository->getActiveAllWithFilter($request_type, $assign_to, $month, $start_date, $end_date, $solution_status);
        $loginCredentialsType = $this->userRepository->getLoginCredential();

        if(!empty($current_request_type) && $current_request_type == ContactReasonType::LOGIN_REQUEST->value) {
            $supportTickets->transform(function ($ticket)  use ($loginCredentialsType) {
                $student = $this->studentRepository->getStudentByNameAndFatherPhone(
                    $ticket->student_name ?? '',
                    $ticket->parent_phone ?? ''
                );

                if (!$student) {
                    $ticket['credentials'] = null;
                    $ticket['messageData'] = "We couldn't find any student with the provided information. Please go to the student module and check the student details. If you find the student copy username and password Send him/her.";
                    return $ticket;
                }

                $credentials = [];
                if (!empty($student)) {
                    switch ($loginCredentialsType->username) {
                        case 'admission_no':
                            $credentials['username'] = $student->admission_no;
                            break;
                        case 'father_mobile':
                            $credentials['username'] = $student->father?->phone;
                            break;
                        default:
                            $credentials['username'] = $student->admission_no;
                            break;
                    }

                    switch ($loginCredentialsType->password) {
                        case 'admission_no':
                            $credentials['password'] = $student->admission_no;
                            break;
                        case 'father_mobile':
                            $credentials['password'] = $student->father?->phone;
                            break;
                        case 'student_name':
                            $credentials['password'] = trim(implode(' ', array_filter([$student->first_name, $student->middle_name, $student->last_name])));
                            break;
                        case 'parent_name':
                            $credentials['password'] = trim(implode(' ', array_filter([$student->father?->first_name, $student->father?->middle_name, $student->father?->last_name])));
                            break;
                        case 'birth_date':
                            $credentials['password'] = $student->birth_date_at;
                            break;
                        default:
                            $credentials['password'] = $student->admission_no;
                            break;
                    }
                }
                $ticket['credentials'] = $credentials ?? null;
                $ticket['messageData'] = "Dear Parent, Please find the login credentials for your child. Username: " . $credentials['username'] . " Password: " . $credentials['password'];
                return $ticket;
            });
        }



        return Inertia::render('SupportTicket/TicketList', [
            'supportTickets' => $supportTickets,
            'contactReasons' => $ContactReasons,
            'classrooms' => $classrooms,
            'students' => $students,
            'teachers' => $teachers,
            'status' => $status,
        ]);
    }

    /**
     * Display the staff Support Page.
     */
    public function staffSupportPage(Request $request): Response
    {
        $supportTickets = $this->supportTicketRepository->getActiveAll();

        return Inertia::render('SupportTicket/StaffSupportPage', [
            'supportTickets' => $supportTickets,
        ]);
    }

    /**
     * Display the staff attendance Page.
    */
    public function staffAttendancePage(Request $request): Response
    {
        $currentSchoolInfo = $this->schoolRepository->getById(getUserSchoolId());

        $messageData = [];
        if($request->isMethod('post')){
            $messageData = $this->handleAttendanceMessage($request);
        }


        return Inertia::render('SupportTicket/staffAttendance', [
            'currentSchoolInfo' => $currentSchoolInfo,
            'messageData' => $messageData,
        ]);
    }

    private function handleAttendanceMessage($request) {
        $messageData = [
            'message' => '',
            'attendance_button_show' => false
        ];
    
        if (!$request->isMethod('post')) {
            return $messageData;
        }
    
        $employee_id = $request->employee_id;
        if (empty($employee_id)) {
           
            return [
                'message' => "We don't have any staff with this ID. Please check the ID and try again.",
                'attendance_button_show' => false
            ];
        }
        $staff = $this->staffRepository->getStaffByEmployeeId($employee_id);
        
        $make_attendance = $request->make_attendance;

        if (!empty($make_attendance) && !empty($staff)) {
            $staffAttendances = $this->staffAttendanceRepository->getStaffAttendance(Carbon::now()->format('Y-m-d'));
            $todayAttendance = json_decode($staffAttendances?->staffs);
            if (!empty($todayAttendance)) {
            $staffExists = false;
            $todayAttendance = collect($todayAttendance)->map(function ($attendance) use ($staff, &$staffExists) {
                if ($attendance->staff_id == $staff->id) {
                    $staffExists = true;
                    $attendance->attendance_status = 'present';
                    $attendance->attendance_time = Carbon::now()->format('Y-m-d H:i:s');
                }
                return $attendance;
            });

            if (!$staffExists) {
                $todayAttendance->push((object)[
                    'in_time' => null,
                    'day_type' => null,
                    'is_leave' => false,
                    'out_time' => null,
                    'staff_id' => $staff->id,
                    'duty_type' => null,
                    'is_absent' => false,
                    'is_halfday' => false,
                    'is_present' => true,
                    'leave_type' => null,
                    'is_disabled' => false,
                    'is_extra_duty' => false,
                    'is_weekly_off' => false,
                    'leave_type_id' => null,
                    'is_outdoor_duty' => false,
                    'attendance_status' => 'present',
                    'attendance_time' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
            }} else {
                $todayAttendance = [];
                $todayAttendance = [
                    (object) [
                        'in_time' => null,
                        'day_type' => null, 
                        'is_leave' => false,
                        'out_time' => null,
                        'staff_id' => $staff->id,
                        'duty_type' => null,
                        'is_absent' => false,
                        'is_halfday' => false,
                        'is_present' => true,
                        'leave_type' => null,
                        'is_disabled' => false,
                        'is_extra_duty' => false,
                        'is_weekly_off' => false,
                        'leave_type_id' => null,
                        'is_outdoor_duty' => false,
                        'attendance_status' => 'present'
                    ]   
                ];
            }

            $dataArray = [
                'staffs' => json_encode($todayAttendance)
            ];

            if(!empty($staffAttendances)) {
                $this->staffAttendanceRepository->update($staffAttendances->id, $dataArray);
            } else {
                $dataArray['school_id'] = getUserSchoolId();
                $dataArray['academic_year_id'] = getAcademicYearId();
                $dataArray['attendance_date_at'] = Carbon::now()->format('Y-m-d');
                $dataArray['attendance_time_at'] = Carbon::now()->format('Y-m-d H:i:s');
                $dataArray['is_attendance_taken'] = true;
                $this->staffAttendanceRepository->create($dataArray);
            }

            return [
                'message' => "Dear " . trim(implode(' ', array_filter([$staff->first_name ?? '', $staff->middle_name ?? '', $staff->last_name ?? '']))) . ", Your attendance has been marked successfully. as PRESENT " . Carbon::now()->format('Y-m-d H:i:s'),
                'attendance_button_show' => false
            ];
        }

    
        if (!empty($staff)) {
            $staffAttendances = $this->staffAttendanceRepository->getTodayStaffAttendanceByStaffId($staff?->id);
            $todayAttendance = json_decode($staffAttendances?->staffs);
            if (!empty($todayAttendance)) {
                $currentStaffAttendance = collect($todayAttendance)->firstWhere('staff_id', $staff->id);
                if ($currentStaffAttendance) {
                    return [
                        'message' => "Dear " . trim(implode(' ', array_filter([$staff->first_name ?? '', $staff->middle_name ?? '', $staff->last_name ?? '']))) . ", Your attendance status is " . strtoupper($currentStaffAttendance->attendance_status) . " for today.",
                        'attendance_button_show' => false
                    ];
                }
            }
            return [
                'message' => "Dear " . trim(implode(' ', array_filter([$staff->first_name ?? '', $staff->middle_name ?? '', $staff->last_name ?? '']))) . ", We found that you are not present in the school today. Please click Mark attendance button to confirm your attendance.",
                'attendance_button_show' => true
            ];
        }
    
        return [
            'message' => "We don't have any staff with this ID. Please check the ID and try again.",
            'attendance_button_show' => false
        ];
    }
    /**
     * Display the student Parents Support Page.
     */
    public function studentParentsSupportPage(Request $request): Response
    {
        $supportTickets = $this->supportTicketRepository->getActiveAll();
        return Inertia::render('SupportTicket/StudentParentsSupportPage', [
            'supportTickets' => $supportTickets,
        ]);
    }

    /**
     * Display the Enquiry Form
     */
    public function enquiryForm(Request $request): Response
    {
        $activeVisitorTypes = $this->visitorEnquiryRepositoryType->getActiveAll();
        return Inertia::render('SupportTicket/EnquiryFormPage', [
            'status' => session('status'),
            'activeVisitorTypes' => $activeVisitorTypes,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroom_id = "";

        $ContactReasons = [];
        $classrooms = [];
        $students = [];
        
        $ContactReasonData = ContactReasonType::cases();
        
        foreach($ContactReasonData as $type) {
            array_push($ContactReasons, ['id' => $type->value, 'title' => $type->value]);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        if ($request->isMethod('post')) {
            $classroom_id = $request->classroom_id;
              
            if(!empty($classroom_id)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroom_id)->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name . ' - ' . $student->admission_no,
                    ];
                });
            }
        }

        $teachers = $this->staffRepository->getActiveTeacherName();

        return Inertia::render('SupportTicket/CreateTicket', [
            'status' => session('status'),
            'contactReasons' => $ContactReasons,
            'classrooms' => $classrooms,
            'students' => $students,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(SupportTicketRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'details' => !empty($input['details']) ? $input['details'] : "",
            'follow_up_date' => !empty($input['follow_up_date']) ? $input['follow_up_date'] : null,
            'request_date' => Carbon::now()->format('Y-m-d'),
            'request_type' => !empty($input['request_type']) ? $input['request_type'] : "",
            'solution_note' => !empty($input['solution_note']) ? $input['solution_note'] : "",
            'previous_solution_note' => !empty($input['previous_solution_note']) ? $input['previous_solution_note'] : "",
            'solution_status' => !empty($input['solution_status']) ? $input['solution_status'] : Status::PENDING,
            'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
            'assigned_to' => !empty($input['assigned_to']) ? intval($input['assigned_to']) : null,
            'student_id' => !empty($input['student_id']) ? intval($input['student_id']) : null,
            'created_by' => auth()->user()->id ?? null,
            'status' => Status::ACTIVE,
        );

        $this->supportTicketRepository->create($dataArray);

        return redirect()->route('support_ticket.list')->with('message', 'Support Ticket created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, int $id): Response
    {
        $supportTicket = $this->supportTicketRepository->getCurrentSupportTicket($id);
        $teachers = $this->staffRepository->getActiveTeacherName();
        $status = [];
        $requestTypeTickets = [];
        
        $StatusData = Status::cases();

        foreach($StatusData as $type) {
            array_push($status, ['id' => $type->value, 'title' => $type->value]);
        }

        if(!empty($supportTicket->request_type)) {
            $requestTypeTickets = $this->supportTicketRepository->getActiveAllByRequestType($supportTicket->request_type);
        }
        
        return Inertia::render('SupportTicket/EditTicket', [
            'status' => $status,
            'supportTicket' => $supportTicket,
            'teachers' => $teachers,
            'requestTypeTickets' => $requestTypeTickets,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SupportTicketRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $supportTicket = $this->supportTicketRepository->getCurrentSupportTicket($id);
        

        $dataArray = array(
            'follow_up_date' => !empty($input['follow_up_date']) ? Carbon::parse($input['follow_up_date'])->format('Y-m-d') : date('Y-m-d'),
            'solution_note' => !empty($input['solution_note']) ? $input['solution_note'] : "",
            'solution_status' => !empty($input['solution_status']) ? $input['solution_status'] : Status::PENDING,
            'assigned_to' => !empty($input['assigned_to']) ? intval($input['assigned_to']) : null,
        );

        $this->supportTicketRepository->update($id, $dataArray);

        try {
            if ($input['assigned_to']) {
                $assignTeacherEmail = $this->staffRepository->getTeacherEmailById($input['assigned_to']);
                if ($assignTeacherEmail->email) {
                    dispatch(new SupportTicketEmailJob($supportTicket, $assignTeacherEmail->email));
                } else {
                    throw new \Exception('No valid teacher email found.');
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Unable to assign ticket: ' . $e->getMessage());
        }

        return redirect()->back()->with('message', 'Support Ticket updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Display Parent Feedback
     */
    public function parentFeedback(Request $request): Response
    {

        return Inertia::render('SupportTicket/ParentFeedback', []);
    }

    /**
     * Display Login Request
     */
    public function loginRequest(Request $request): Response
    {
        $currentSchoolInfo = $this->schoolRepository->getById(getUserSchoolId());
        $classrooms = $this->classroomRepository->getActiveAll();
        
        return Inertia::render('SupportTicket/LoginRequest', [
            'classrooms' => $classrooms,
            'currentSchoolInfo' => $currentSchoolInfo
        ]);
    }

    
    /**
     * Save Contact us
    */
    public function loginRequestSave(LoginRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'request_type' => ContactReasonType::LOGIN_REQUEST->value,
            'request_date' => Carbon::now()->format('Y-m-d'),
            'classroom_id' => !empty($input['classroom_id']) ? $input['classroom_id'] : null,
            'admission_no' => !empty($input['admission_no']) ? $input['admission_no'] : "",
            'student_name' => !empty($input['student_name']) ? $input['student_name'] : "",
            'parent_name' => !empty($input['parent_name']) ? $input['parent_name'] : "",
            'parent_phone' => !empty($input['parent_phone']) ? $input['parent_phone'] : "",
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );

        $supportData = $this->supportTicketRepository->create($dataArray);

        return redirect()->back()->with('message', 'Login Request submitted successfully.');
    }

    /**
     * Contact Us
     */
    public function contactUs(Request $request): Response
    {
        $ContactReasonData = ContactReasonType::cases();
        
        $currentSchoolInfo = $this->schoolRepository->getById(getUserSchoolId());
  
        $ContactReasons = array();
        foreach($ContactReasonData as $type) {
            array_push($ContactReasons, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('SupportTicket/ContactUs', [
            'ContactReasons' => $ContactReasons,
            'currentSchoolInfo' => $currentSchoolInfo,
        ]);
    }

    /**
     * Save Contact us
    */
    public function contactUsSave(SupportTicketRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'request_type' => !empty($input['request_type']) ? $input['request_type'] : "",
            'request_date' => Carbon::now()->format('Y-m-d'),
            'student_name' => !empty($input['student_name']) ? $input['student_name'] : "",
            'parent_name' => !empty($input['parent_name']) ? $input['parent_name'] : "",
            'parent_phone' => !empty($input['parent_phone']) ? $input['parent_phone'] : "",
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );

        $supportData = $this->supportTicketRepository->create($dataArray);

        return redirect()->back()->with('message', 'Support Ticket submitted successfully.');
    }

    /**
     * Save Parent Feedback
    */
    public function parentFeedbackSave(FeedbackRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'request_type' => ContactReasonType::FEEDBACK->value,
            'request_date' => Carbon::now()->format('Y-m-d'),
            'student_name' => !empty($input['student_name']) ? $input['student_name'] : "",
            'parent_name' => !empty($input['parent_name']) ? $input['parent_name'] : "",
            'parent_phone' => !empty($input['parent_phone']) ? $input['parent_phone'] : "",
            'details' => !empty($input['details']) ? $input['details'] : "",
            'status' => Status::ACTIVE,
        );

        $supportData = $this->supportTicketRepository->create($dataArray);

        return redirect()->back()->with('message', 'Feedback submitted successfully.');
    }

    /**
     * Send Login Credentials
     */

     public function loginCredentialSend(Request $request)
     {
        $number = $request->parent_phone ?? '';
        // $message = $request->message_content ?? '';
        $message = 'Test Nasir';
        $sender = getSiteSettingDataByTypeAndKey('SMS', 'sms_sender_id')?->value ?? '';
         // Send the SMS and capture the response
         $response = (new MessageTextLocalController)->sendSms($number, $message, $sender);

         // response data
         $responseData = $response->getData(true);
 
         // Check if the response is successful, assuming `status` field or similar is used
         if (!$responseData || $responseData['success'] == false) {
             // Throw an exception if the SMS sending failed
             throw new \Exception('Failed to send SMS: ' . ($responseData['error'][0]['message'] ?? 'Unknown error'));
         }
     }
}