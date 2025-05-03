<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\RelationType;
use App\Mail\VisitorEnquiry;
use Illuminate\Http\Request;
use App\Services\MailService;
use App\Mail\VisitorEnquiryMail;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VisitorRequest;
use App\Repositories\ImageRepository;
use Illuminate\Http\RedirectResponse;
use App\Enums\VisitorEnquiryDetailEnum;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IGatePassRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\VisitorEnquiryDetail;
use App\Http\Requests\VisitorEnquiryRequest;
use App\Http\Requests\StudentGatePassRequest;
use App\Repositories\VisitorEnquiryRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IVisitorEnquiryRepository;
use App\Repositories\IVisitorEnquiryRepositoryType;

class VisitorEnquiryController extends Controller
{
    private $_upload;
    public function __construct( 
        private IVisitorEnquiryRepository $visitorEnquiryRepository,
        private IVisitorEnquiryRepositoryType $visitorEnquiryRepositoryType,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IGatePassRepository $gatePassRepository,
        private ImageRepository $imageRepository,
        private MailService $mailService,
    ) 
    {
        $this->middleware('permission:view enquiry', ['only' => ['enquiry', 'type', 'setting', 'gatePass', 'gatePassClassWise']]);
        $this->middleware('permission:add enquiry', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit enquiry', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete enquiry', ['only' => ['destroy']]);
        $this->_upload = new UploadFileController();
    }
    
    /**
     * Display the schools.
     */
    public function enquiry(Request $request): Response
    {
        $search = '';
        $start_date = '';
        $end_date = '';
        
        if ($request->isMethod('post')) {
            $search = $request->input('search');
            $start_date = $request->input('start_date');
            $end_date = $request->input('end_date');
        }

        $visitorEnquiryDetailTypeData = VisitorEnquiryDetailEnum::cases();
        $visitorEnquiryDetailType = array();
        foreach($visitorEnquiryDetailTypeData as $vType) {
            array_push($visitorEnquiryDetailType, ['id' => $vType->value, 'title' => $vType->value]);
        }
        
        $visitorsEnquiry = $this->visitorEnquiryRepository->getActiveAllWithFilter($search, $start_date, $end_date);
        $visitorsEnquiry->load(['visitorEnquiryDetails' => function ($query) {
            $query->select('id', 'visitor_enquiry_id', 'title', 'activity_date', 'follow_date', 'status', 'created_by');
        }]);

        return Inertia::render('VisitorEnquiry/EnquiryList', [
            'visitorsEnquiry' => $visitorsEnquiry,
            'visitorEnquiryDetailType' => $visitorEnquiryDetailType,
        ]);
    }

     /**
     * Display the schools.
     */
    public function setting(Request $request): Response
    {

        $gatepassSetting = getSiteSettingDataByType('gatepass');

        return Inertia::render('VisitorEnquiry/EnquirySetting', [
            'gatepass' => $gatepassSetting['gatepass'],
        ]);
    }

     /**
     * Gate pass List.
     */
    public function gatePass(Request $request): Response
    {
        $visitors = $this->visitorEnquiryRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $students = [];
        $search = "";

        //relation type
        $relactionTypeData = RelationType::cases();
        $relactionType = array();
        foreach($relactionTypeData as $rType) {
            array_push($relactionType, ['id' => $rType->value, 'title' => $rType->value]);
        }

        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id');
            $search = $request->input('search');

            $students = $this->studentRepository->getStudentsByClassroomId($classroom_id)->map(function ($student) {
                return [
                    'id' => $student->id,
                    'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                    'classroom_id' => $student->classroom_id,
                ];
            });
        }

         // get pass data
         $studentGatePass =  $this->gatePassRepository->getActiveAllWithSearch($search);
         if (!empty($studentGatePass)) {
             $studentGatePass?->load(
                 [
                     'student' => function ($query) {
                         $query->select('id', 'first_name', 'middle_name', 'last_name');
                     },
                     'classroom' => function ($query) {
                         $query->select('id', 'title');
                     },
                     'visitorImage'
                 ]
             );
         }

         // next get pass number
        $lastNumber = $this->gatePassRepository->getLastId();
        $gateNextNo =  $lastNumber + 1;

        return Inertia::render('VisitorEnquiry/GatePass', [
            'visitors' => $visitors,
            'relactionType' => $relactionType,
            'classrooms' => $classrooms,
            'students' => $students,
            'studentGatePass' => $studentGatePass,
            'gateNextNo' => $gateNextNo,
        ]);
    }

    /**
     * save visitor gate pass
    */
    public function gatePassSave(StudentGatePassRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $visitor_photo = null;
        // visitor image
        if (!empty($request->file('visitor_photo'))) {
            $visitor_photo = $this->_upload->uploadImage($request, 'visitor_photo', 'image', $request->schoolKey);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $input['classroom_id'],
            'student_id' => $input['student_id'],
            'relation_type' => $input['relation_type'],
            'visiting_person' => $input['visiting_person'],
            'email' => !empty($input['email']) ? $input['email'] : "",
            'phone' => $input['phone'],
            'in_date_at' => Carbon::parse($input['in_date_at'])->format('Y-m-d'),
            'out_date_at' => Carbon::parse($input['out_date_at'])->format('Y-m-d'),
            'in_time_at' => Carbon::parse($input['in_time_at'])->format('H:i:s'),
            'out_time_at' => Carbon::parse($input['out_time_at'])->format('H:i:s'),
            'reason_gate_pass' => $input['reason_gate_pass'],
            'visitor_photo' => $visitor_photo,
            'status' => Status::ACTIVE,
        );

        $studentGatePass = $this->gatePassRepository->create($dataArray);

        if (!empty($studentGatePass['id'])) {

            if (!empty($request->file('visitor_photo'))) {
                $image_url = $this->_upload->uploadImage($request, 'visitor_photo', 'gate_pass_visitor_photo');
            } else {
                $image_url = 'no image';
            }

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\StudentGatePass::class,
                'imageable_id' => $studentGatePass['id'],
                'name' => 'visitor_photo',
                'path' => $image_url,
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->morphCreate($dataImage, $studentGatePass['id']);
        }
        
        return redirect()->back()->with('message', 'Visitor Gate Pass Created successfully');
    }

     /**
     * Display the schools.
     */
    public function gatePassClassWise(Request $request): Response
    {
        $classroomId = '';
        $gatePass = [];
        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $gatePass = $this->gatePassRepository->getGatePassByClassroomId($classroomId);
            if (!empty($gatePass)) {
                $gatePass?->load(
                    [
                        'student' => function ($query) {
                            $query->select('id', 'first_name', 'middle_name', 'last_name');
                        },
                        'classroom' => function ($query) {
                            $query->select('id', 'title');
                        },
                    ]
                );
            }
        }

        // classroom
        $classroomWithGatePass =  [];
        $classrooms = $this->classroomRepository->getActiveNameAndId()?->loadCount('studentGatePass');
        if (!empty($classrooms)) {
            foreach ($classrooms as $classRoom) {
                if ($classRoom?->student_gate_pass_count > 0) {
                    $classroomWithGatePass[] = $classRoom;
                }
            }
        }

        // dd($classroomWithGatePass);
        // return Inertia::render('Hostel/GatePassClassWise', [
        //     'classroomData' => $classroomWithGatePass,
        //     'gatePass' => $gatePass,
        // ]);

        return Inertia::render('VisitorEnquiry/GatePassClassWise', [
            'classroomData' => $classroomWithGatePass,
            'gatePass' => $gatePass,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $activeVisitorTypes = $this->visitorEnquiryRepositoryType->getActiveAll();
        return Inertia::render('VisitorEnquiry/CreateEnquiry', [
            'status' => session('status'),
            'activeVisitorTypes' => $activeVisitorTypes,
        ]);
    }

    /**
     * save visitor enquiry
     */
    public function save(VisitorEnquiryRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $visitor_photo = null;
        // visitor image
        if (!empty($request->file('visitor_photo'))) {
            $visitor_photo = $this->_upload->uploadImage($request, 'visitor_photo', 'image', $request->schoolKey);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'name' => $input['name'],
            'phone' => $input['phone'],
            'email' => !empty($input['email']) ? $input['email'] : "",
            'visitor_enquiry_type_id' => $input['enquiry_type'],
            'enquiry_date' => Carbon::parse($input['enquiry_date'])->format('Y-m-d'),
            'in_time' => Carbon::parse($input['in_time'])->format('H:i:s'),
            'appointment_date' => Carbon::parse($input['appointment_date'])->format('Y-m-d'),
            'appointment_time' => Carbon::parse($input['appointment_time'])->format('H:i:s'),
            'person_to_meet' => $input['person_to_meet'],
            'purpose_of_visit' => $input['purpose_of_visit'],
            'vehicle_no' => $input['vehicle_no'],
            'enquiry_message' => $input['enquiry_message'],
            'visitor_photo' => $visitor_photo,
            'created_by' => Auth::user()->id,
            'address' => $input['address'],
            'status' => Status::ACTIVE,
        );

         $this->visitorEnquiryRepository->create($dataArray);
        
        return redirect()->route('visitor_enquiry.list')->with('message', 'Visitor Enquiry Created successfully');
    }

    /**
     * frontend enquiry save
     */
    public function frontendEnquirySave(VisitorEnquiryRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $visitor_photo = null;
        // visitor image
        if (!empty($request->file('visitor_photo'))) {
            $visitor_photo = $this->_upload->uploadImage($request, 'visitor_photo', 'image', $request->schoolKey);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'name' => $input['name'],
            'phone' => $input['phone'],
            'email' => !empty($input['email']) ? $input['email'] : "",
            'visitor_enquiry_type_id' => $input['enquiry_type'],
            'enquiry_date' => Carbon::parse($input['enquiry_date'])->format('Y-m-d'),
            'in_time' => Carbon::parse($input['in_time'])->format('H:i:s'),
            'appointment_date' => Carbon::parse($input['appointment_date'])->format('Y-m-d'),
            'appointment_time' => Carbon::parse($input['appointment_time'])->format('H:i:s'),
            'person_to_meet' => $input['person_to_meet'],
            'purpose_of_visit' => $input['purpose_of_visit'],
            'vehicle_no' => $input['vehicle_no'],
            'enquiry_message' => $input['enquiry_message'],
            'visitor_photo' => $visitor_photo,
            'created_by' => null,
            'address' => $input['address'],
            'status' => Status::ACTIVE,
        );

        $visitorEnquiryData = $this->visitorEnquiryRepository->create($dataArray);
             
        /*
        * Send Enquiry Mail TO the site owner
        */
        if (!empty($request->email)) {
            $this->mailService->sendMail($request->email, new VisitorEnquiryMail($visitorEnquiryData));
        } else {
            return redirect()->back()->with('error', 'Please enter test email address.');
        }

        return redirect()->back()->with('message', 'Visitor Enquiry Created successfully');
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, int $id): Response
    {
        $visitorEnquiry = $this->visitorEnquiryRepository->getById($id);
        $activeVisitorTypes = $this->visitorEnquiryRepositoryType->getActiveAll();

        return Inertia::render('VisitorEnquiry/EditEnquiry', [
            'visitorEnquiry' => $visitorEnquiry,
            'activeVisitorTypes' => $activeVisitorTypes,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(VisitorEnquiryRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $visitorEnquiry = $this->visitorEnquiryRepository->getById($id);

        $visitor_photo = $visitorEnquiry->visitor_photo;
        // visitor image
        if (!empty($request->file('visitor_photo'))) {
            $visitor_photo = $this->_upload->uploadImage($request, 'visitor_photo', 'image', $request->schoolKey);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'name' => $input['name'],
            'phone' => $input['phone'],
            'email' => !empty($input['email']) ? $input['email'] : "",
            'visitor_enquiry_type_id' => $input['enquiry_type'],
            'enquiry_date' => Carbon::parse($input['enquiry_date'])->format('Y-m-d'),
            'in_time' => Carbon::parse($input['in_time'])->format('H:i:s'),
            'appointment_date' => Carbon::parse($input['appointment_date'])->format('Y-m-d'),
            'appointment_time' => Carbon::parse($input['appointment_time'])->format('H:i:s'),
            'person_to_meet' => $input['person_to_meet'],
            'purpose_of_visit' => $input['purpose_of_visit'],
            'vehicle_no' => $input['vehicle_no'],
            'enquiry_message' => $input['enquiry_message'],
            'visitor_photo' => $visitor_photo,
            'created_by' => Auth::user()->id,
            'address' => $input['address'],
            'status' => Status::ACTIVE,
        );

        $this->visitorEnquiryRepository->update($id, $dataArray);
       

        return redirect()->route('visitor_enquiry.list')->with('message', 'Visitor Enquiry Updated successfully');
    }   

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, int $id): RedirectResponse
    {
        $visitorEnquiry = $this->visitorEnquiryRepository->getById($id);

        if(empty($visitorEnquiry)){
            return redirect()->back()->with('error', 'Visitor Enquiry Type not found');
        }

        $this->visitorEnquiryRepository->delete($id);
        
        return redirect()->route('visitor_enquiry.list')->with('message', 'Visitor Enquiry Deleted successfully');
    }

    /**
     * Visitor Enquiry Save Activity VisitorEnquiryDetail
     */
    public function saveActivity(VisitorEnquiryDetail $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'visitor_enquiry_id' => $input['visitor_enquiry_id'],
            'title' => $input['title'],
            'activity_date' => Carbon::parse($input['activity_date'])->format('Y-m-d'),
            'follow_date' => Carbon::parse($input['follow_date'])->format('Y-m-d'),
            'created_by' => Auth::user()->id,
            'status' => $input['status'],
        );

        $this->visitorEnquiryRepository->saveActivity($dataArray);

        return redirect()->back()->with('message', 'Activity Created successfully');
    }
}
