<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\UomController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\EBookController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\PaytmController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\ChequeController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\HostelController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\LedgerController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\PdfFeeController;
use App\Http\Controllers\PdfSmsController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PdfExamController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\SendSmsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\AcademicController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\ExamDateController;
use App\Http\Controllers\HomeworkController;
use App\Http\Controllers\LiveChatController;
use App\Http\Controllers\PdfStaffController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RazorpayController;
use App\Http\Controllers\ReligionController;
use App\Http\Controllers\TimezoneController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\ClassworkController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeeImportController;
use App\Http\Controllers\FeeRefundController;
use App\Http\Controllers\FeeReportController;
use App\Http\Controllers\FinancialController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PdfSalaryController;
use App\Http\Controllers\SaleGroupController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\AllocationController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\BloodGroupController;
use App\Http\Controllers\BookReportController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FeeVoucherController;
use App\Http\Controllers\HostelRoomController;
use App\Http\Controllers\InfraLevelController;
use App\Http\Controllers\LessonPlanController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\OnlineExamController;
use App\Http\Controllers\OurServiceController;
use App\Http\Controllers\PdfAccountController;
use App\Http\Controllers\PdfStudentController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ResultCardController;
use App\Http\Controllers\SmsSettingController;
use App\Http\Controllers\WebmessageController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ClassOnlineController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\ExamRoasterController;
use App\Http\Controllers\ExportExcelController;
use App\Http\Controllers\FeeDiscountController;
use App\Http\Controllers\LeaveReportController;
use App\Http\Controllers\MailSettingController;
use App\Http\Controllers\PdfAcademicController;
use App\Http\Controllers\SchoolShiftController;
use App\Http\Controllers\SiteSettingController;
use App\Http\Controllers\SocialShareController;
use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\AccountGroupController;
use App\Http\Controllers\HostelReportController;
use App\Http\Controllers\JobApplicantController;
use App\Http\Controllers\PdfAdmissionController;
use App\Http\Controllers\PdfGeneratorController;
use App\Http\Controllers\PdfTimetableController;
use App\Http\Controllers\SalaryReportController;
use App\Http\Controllers\SchoolPeriodController;
use App\Http\Controllers\StudentEventController;
use App\Http\Controllers\TransportFeeController;
use App\Http\Controllers\VehicleStaffController;
use App\Http\Controllers\AcademicGradeController;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\AdmissionExamController;
use App\Http\Controllers\CommunicationController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\EventCalendarController;
use App\Http\Controllers\ExamDateRangeController;
use App\Http\Controllers\FrontendPagesController;
use App\Http\Controllers\HolidayPolicyController;
use App\Http\Controllers\LibraryVendorController;
use App\Http\Controllers\ParentProfileController;
use App\Http\Controllers\PdfDemandSlipController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ProfileUpdateController;
use App\Http\Controllers\StudentHostelController;
use App\Http\Controllers\StudentReportController;
use App\Http\Controllers\SummaryReportController;
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\TeacherCourseController;
use App\Http\Controllers\TeacherReportController;
use App\Http\Controllers\AcademicReportController;
use App\Http\Controllers\ClassroomGroupController;
use App\Http\Controllers\DocumentReportController;
use App\Http\Controllers\DownloadReportController;
use App\Http\Controllers\ExamAttendanceController;
use App\Http\Controllers\ParentAcademicController;
use App\Http\Controllers\PdfTcGeneratorController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\StudentSiblingController;
use App\Http\Controllers\StudentSubjectController;
use App\Http\Controllers\TransportRouteController;
use App\Http\Controllers\VisitorEnquiryController;
use App\Http\Controllers\ClassroomPeriodController;
use App\Http\Controllers\Process\ProcessController;
use App\Http\Controllers\ProductQuantityController;
use App\Http\Controllers\StaffAttendanceController;
use App\Http\Controllers\SubjectGroupingController;
use App\Http\Controllers\TeacherAcademicController;
use App\Http\Controllers\TransportReportController;
use App\Http\Controllers\AcademicSyllabusController;
use App\Http\Controllers\EmergencyContactController;
use App\Http\Controllers\FeeOnlinePaymentController;
use App\Http\Controllers\OnlineExamReportController;
use App\Http\Controllers\StaffCertificateController;
use App\Http\Controllers\StudentIssueBookController;
use App\Http\Controllers\StudentTimetableController;
use App\Http\Controllers\TeacherClassroomController;
use App\Http\Controllers\TeacherDashboardController;
use App\Http\Controllers\TransportVoucherController;
use App\Http\Controllers\LibraryShelfLevelController;
use App\Http\Controllers\StudentOnlineExamController;
use App\Http\Controllers\TransportStoppageController;
use App\Http\Controllers\PdfVisitorGatePassController;
use App\Http\Controllers\RegistrationReportController;
use App\Http\Controllers\StudentCertificateController;
use App\Http\Controllers\VisitorEnquiryTypeController;
use App\Http\Controllers\AcademicReportGraphController;
use App\Http\Controllers\ClassroomAttendanceController;
use App\Http\Controllers\ClassroomDiscussionController;
use App\Http\Controllers\StaffAttendanceReportController;
use App\Http\Controllers\AdmissionEnquerySourceController;
use App\Http\Controllers\AdmissionEnquiryStatusController;
use App\Http\Controllers\PdfCertificateGeneratorController;
use App\Http\Controllers\StudentAttendanceReportController;
use App\Http\Controllers\ClassroomAttendanceReportController;
use App\Http\Controllers\AdmissionEnqueryRegistrationController;
use App\Http\Controllers\AsrtisanCommand\DomainController as ArtisanDomainController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/** Auth group */
Route::middleware(['auth', 'verified'])->group(function () {
    //dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // profile
    Route::get('/profiles', [ProfileController::class, 'index'])->name('profile.list');
    Route::get('/mydetail', [ProfileController::class, 'myDetailSalary'])->name('profile.mydetail_salary');
    Route::get('/mydetail/salary', [ProfileController::class, 'mySalary'])->name('profile.mydetail.salary');
    Route::get('/mydetail/attendance', [ProfileController::class, 'myDetailAttendance'])->name('profile.mydetail_attendance');
    Route::get('/mydetail/leave', [ProfileController::class, 'myDetailLeave'])->name('profile.mydetail_leave');
    Route::get('/profile-update', [ProfileController::class, 'edit'])->name('profile.edit');


    //academic setting
    Route::get('/academic/settings', [AcademicController::class, 'settings'])->name('academic.settings');
    Route::post('/academic/settings/save', [AcademicController::class, 'settingsSave'])->name('academic.settings.save');
    Route::post('/academic/settings/image/save', [AcademicController::class, 'settingsSaveImage'])->name('academic.settings.image_save');

    // academic
    Route::get('/academics', [AcademicController::class, 'index'])->name('academic.list');
    Route::get('/academic/create', [AcademicController::class, 'create'])->name('academic.create');
    Route::post('/academic/save', [AcademicController::class, 'save'])->name('academic.save');
    Route::get('/academic/edit/{academic}', [AcademicController::class, 'edit'])->name('academic.edit');
    Route::patch('/academic/update/{academic}', [AcademicController::class, 'update'])->name('academic.update');
    Route::delete('/academic/delete/{academic}', [AcademicController::class, 'destroy'])->name('academic.destroy');

    // Academic Syllabus
    Route::get('/academic/syllabus', [AcademicSyllabusController::class, 'index'])->name('academic_syllabus.list');
    Route::post('/academic/syllabus/save', [AcademicSyllabusController::class, 'save'])->name('academic_syllabus.save');
    Route::get('/academic/syllabus/edit/{id}', [AcademicSyllabusController::class, 'edit'])->name('academic_syllabus.edit');
    Route::post('/academic/syllabus/update/{id}', [AcademicSyllabusController::class, 'update'])->name('academic_syllabus.update');
    Route::delete('/academic/syllabus/delete/{id}', [AcademicSyllabusController::class, 'destroy'])->name('academic_syllabus.destroy');

    // academic syllabus For Student view
    Route::match(['GET', 'POST'], '/student/view-syllabus', [AcademicSyllabusController::class, 'studentViewSyllabus'])->name('student_syllabus.list');

    // Academic Grade
    Route::match(['GET', 'POST'], '/academic/grades', [AcademicGradeController::class, 'index'])->name('academic_grade.list');
    Route::post('/academic/grades/markSave', [AcademicGradeController::class, 'markSave'])->name('academic_grade.list.markSave');
    Route::get('/academic/grade/create', [AcademicGradeController::class, 'create'])->name('academic_grade.create');
    Route::post('/academic/grade/save', [AcademicGradeController::class, 'save'])->name('academic_grade.save');
    Route::get('/academic/grade/edit/{id}', [AcademicGradeController::class, 'edit'])->name('academic_grade.edit');
    Route::put('/academic/grade/update/{id}', [AcademicGradeController::class, 'update'])->name('academic_grade.update');
    Route::delete('/academic/grade/delete/{id}', [AcademicGradeController::class, 'destroy'])->name('academic_grade.destroy');
    Route::post('/academic/grade/grade-item/save', [AcademicGradeController::class, 'saveAcademicGradeItem'])->name('academic_grade.grade_item.save');
    Route::delete('/academic/grade/grade-item/delete/{id}', [AcademicGradeController::class, 'deleteAcademicGradeItem'])->name('academic_grade.grade_item.delete');

    // Academic Report
    Route::match(['POST', 'GET'], '/academic/report/optionalsubject', [AcademicReportController::class, 'optionalSubject'])->name('academic_report.optional_subject');
    Route::match(['POST', 'GET'], '/academic/report/studentsubjectreport', [AcademicReportController::class, 'studentSubjectReport'])->name('academic_report.student_subject_report');
    Route::match(['POST', 'GET'], '/academic/report/absent', [AcademicReportController::class, 'absent'])->name('academic_report.absent');
    Route::get('/academic/report/academic-exam-report', [AcademicReportController::class, 'academicExamReport'])->name('academic_report.academic_exam_report');
    Route::match(['POST', 'GET'], '/academic/report/consolidated', [AcademicReportController::class, 'consolidated'])->name('academic_report.consolidated');
    Route::match(['POST', 'GET'], '/academic/report/finalconsolidated', [AcademicReportController::class, 'finalConsolidated'])->name('academic_report.final_consolidated');
    Route::match(['GET', 'POST'], '/academic/report/preview-report-card', [AcademicReportController::class, 'previewReportCard'])->name('academic_report.preview_report_card');
    Route::post('/academic/report/generate-student-academic-rank', [AcademicReportController::class, 'generateStudentAcademicRank'])->name('academic_report.generate_student_academic_rank');
    Route::match(['POST', 'GET'], '/academic/report/subject-report', [AcademicReportController::class, 'subjectReport'])->name('academic_report.subject_report');
    Route::match(['POST', 'GET'], '/academic/report/student-subject-wise', [AcademicReportController::class, 'studentSubjectWiseReport'])->name('academic_report.student_subject_wise_report');
    Route::match(['POST', 'GET'], '/academic/report/exam-wise', [AcademicReportController::class, 'examwiseReport'])->name('academic_report.exam_wise_report');

    // Academic Report Graph
    Route::match(['POST', 'GET'], '/academic/report/graph/weaker', [AcademicReportGraphController::class, 'weaker'])->name('academic_report_graph.weaker');
    Route::match(['POST', 'GET'], '/academic/report/graph/toppers', [AcademicReportGraphController::class, 'toppers'])->name('academic_report_graph.toppers');
    Route::match(['POST', 'GET'], '/academic/report/graph/subjectwiseoverall', [AcademicReportGraphController::class, 'subjectWiseOverall'])->name('academic_report_graph.subjectwiseoverall');
    Route::match(['POST', 'GET'], '/academic/report/graph/classwiseoverall', [AcademicReportGraphController::class, 'classWiseOverall'])->name('academic_report_graph.classwiseoverall');

    // exam attendance route
    Route::match(['POST', 'GET'], '/academic/exam/attendances', [ExamAttendanceController::class, 'examAttendances'])->name('exam_attendance.list');
    Route::post('/exam-attendance/save', [ExamAttendanceController::class, 'examAttendanceSave'])->name('exam_attendance.save');

    // exam
    Route::match(['GET', 'POST'], '/academic/sendexammarks', [ExamController::class, 'sendExamMarks'])->name('exam.send_exam_marks');
    Route::match(['POST', 'GET'], '/academic/entermarks', [ExamController::class, 'enterMarks'])->name('exam.enter_marks');
    Route::post('/academic/entermarks/save', [ExamController::class, 'saveMarks'])->name('exam.enter_marks.save');

    Route::get('/academic/uploadsubjectmarks', [ExamController::class, 'uploadSubjectMarks'])->name('exam.upload_subject_marks');
    Route::match(['POST', 'GET'], '/academic/exam/remarks', [ExamController::class, 'examRemarks'])->name('exam.remarks');
    Route::post('/academic/exam/remarks/saveData', [ExamController::class, 'examRemarksSave'])->name('exam.remarks.save');

    Route::match(['POST', 'GET'], '/academic/exam/freezemarks', [ExamController::class, 'freezeMarks'])->name('exam.freeze_marks');
    Route::put('/academic/exam/freezemarks/status/update', [ExamController::class, 'updateMarksStatus'])->name('exam.freeze_marks_status.update');
    // Route::match(['POST', 'GET'], '/academic/exam/freezemarks', [ExamController::class, 'freezeMarks'])->name('exam.freeze_marks');

    //academic exam remarks
    Route::get('/academic/exam/add/remarks', [ExamController::class, 'addExamRemarks'])->name('exam.add_remark');
    Route::post('/academic/exam/add/remarks/save', [ExamController::class, 'saveExamRemarks'])->name('exam.add_remark.save');
    Route::get('/academic/exam/add/remarks/edit/{id}', [ExamController::class, 'editRemark'])->name('exam.add_remark.edit');
    Route::put('/academic/exam/add/remarks/update/{id}', [ExamController::class, 'updateRemark'])->name('exam.add_remark.update');
    Route::delete('/academic/exam/add/remarks/delete/{id}', [ExamController::class, 'destroyRemark'])->name('exam.add_remark.destroy');

    //academic term wise exam
    Route::get('/academic/exam/term-wise', [ExamController::class, 'termExam'])->name('exam.term_wise');
    Route::post('/academic/exam/term-wise/save', [ExamController::class, 'termExamSave'])->name('exam.term_wise.save');
    Route::get('/academic/exam/term-wise/edit/{id}', [ExamController::class, 'termExamEdit'])->name('exam.term_wise.edit');
    Route::put('/academic/exam/term-wise/update/{id}', [ExamController::class, 'termExamUpdate'])->name('exam.term_wise.update');
    Route::delete('/academic/exam/term-wise/delete/{id}', [ExamController::class, 'termExamDelete'])->name('exam.term_wise.delete');
    Route::get('/academic/exam-schedules', [ExamController::class, 'scheduleList'])->name('exam.schedule_list');
    Route::get('/academic/exam/add', [ExamController::class, 'addExam'])->name('exam.add');
    Route::post('/academic/exam/save', [ExamController::class, 'saveExam'])->name('exam.save');
    Route::get('/academic/exam/edit/{exam}', [ExamController::class, 'editExam'])->name('exam.edit');
    Route::put('/academic/exam/update/{exam}', [ExamController::class, 'updateExam'])->name('exam.update');
    Route::patch('/academic/exam/status/update/{exam}', [ExamController::class, 'updateExamStatus'])->name('exam_status.update');
    Route::delete('/academic/exam/delete/{exam}', [ExamController::class, 'deleteExam'])->name('exam.destroy');

    // student exam schedule
    Route::match(['POST', 'GET'], '/student/exam-schedules', [ExamController::class, 'StudentscheduleList'])->name('student.exam_schedule_list');

    // exam roaster
    Route::match(['POST', 'GET'], '/academic/exam/roasters', [ExamRoasterController::class, 'roasters'])->name('exam_roaster.list');
    Route::match(['POST', 'GET'], '/academic/exam/setbulkroaster', [ExamRoasterController::class, 'setBulkExamRoaster'])->name('exam_roaster.set_bulk');
    Route::post('/academic/exam/setbulkroaster/saveData', [ExamRoasterController::class, 'setBulkExamRoasterSaveData'])->name('exam_roaster.set_bulk.saveData');
    Route::post('/exam-roaster/save', [ExamRoasterController::class, 'save'])->name('exam_roaster.save');


    // exam date
    Route::match(['POST', 'GET'], '/academic/exam/dates', [ExamDateController::class, 'examDates'])->name('exam_date.list');
    Route::get('/academic/exam/date/create', [ExamDateController::class, 'create'])->name('exam_date.create');
    Route::post('/academic/exam/date/save', [ExamDateController::class, 'save'])->name('exam_date.save');

    // exam date range //
    Route::match(['POST', 'GET'], '/academic/exam/attendance/date-ranges', [ExamDateRangeController::class, 'attendanceDateRanges'])->name('exam_date_range.list');
    Route::post('/academic/exam/attendance/date-ranges/save', [ExamDateRangeController::class, 'attendanceDateRangesSave'])->name('exam_date_range.save');
    Route::get('/exam-date-range/create', [ExamDateRangeController::class, 'create'])->name('exam_date_range.create');
    // Route::post('/exam-date-range/save', [ExamDateRangeController::class, 'save'])->name('exam_date_range.save');

    // result card
    Route::match(['GET', 'POST'], '/academic/result-card/configuration', [ResultCardController::class, 'resultCardConfiguration'])->name('result_card.configuration');
    Route::post('/academic/result-card/configuration/save', [ResultCardController::class, 'saveResultCardConfiguration'])->name('result_card.configuration.save');
    Route::put('/academic/result-card/configuration/update/{id}', [ResultCardController::class, 'updateResultCardConfiguration'])->name('result_card.configuration.update');
    Route::delete('/academic/result-card/configuration/delete/{id}', [ResultCardController::class, 'deleteResultCardConfiguration'])->name('result_card.configuration.destroy');

    Route::match(['GET', 'POST'], '/academic/result-card/exam-grouping', [ResultCardController::class, 'resultCardExamGrouping'])->name('result_card.exam_grouping');
    // Exam group form data submit
    Route::post('/academic/result-card/exam-grouping/save', [ResultCardController::class, 'resultCardExamGroupSave'])->name('result_card.exam_group_save');
    Route::post('/academic/result-card/exam-grouping-board-logo/save', [ResultCardController::class, 'saveExamGroupBoardLogo'])->name('result_card.exam_group_board_logo_save');
    Route::post('/academic/result-card/exam-grouping/edit/{id}', [ResultCardController::class, 'resultCardExamGroupEdit'])->name('result_card.exam_group_update');

    // Exam group form data delete
    Route::delete('/academic/result-card/exam-grouping/delete/{id}', [ResultCardController::class, 'resultCardExamGroupDelete'])->name('result_card.exam_group_delete');

    // Exam group form data delete
    Route::delete('/academic/result-card/exam-grouping/delete/{id}', [ResultCardController::class, 'resultCardExamGroupDelete'])->name('result_card.exam_group_delete');

    Route::get('/academic/result-card/publish', [ResultCardController::class, 'resultCardPublish'])->name('result_card.publish');

    // Step Two Route
    Route::post('/academic/result-card/step-two/save', [ResultCardController::class, 'saveStepTwoData'])->name('result_card.step_two.save');
    // Step Three Route
    Route::post('/academic/result-card/step-three/save', [ResultCardController::class, 'saveStepThreeData'])->name('result_card.step_three.save');
    Route::post('/academic/result-card/step-three/group/save', [ResultCardController::class, 'saveStepThreeGroupData'])->name('result_card.step_three_group.save');
    Route::post('/academic/result-card/step-four/save', [ResultCardController::class, 'saveStepFourData'])->name('result_card.step_four.save');


    // subject
    //Assign New Subject
    Route::match(['GET', 'POST'], '/subject/assign-to-class/new-design', [SubjectController::class, 'assignToClassNewDesign'])->name('subject.assign_to_class_new_design');
    Route::post('/subject/assign-to-class/new-design/save', [SubjectController::class, 'assignToClassNewDesignSave'])->name('subject.assign_to_class_new_design.save');
    Route::post('/subject/assign-to-class/new-design/update', [SubjectController::class, 'assignToClassNewDesignUpdate'])->name('subject.assign_to_class_new_design.update');
    Route::post('/subject/assign-to-class/bulk/save', [SubjectController::class, 'assignToClassSubjectBulk'])->name('subject.assign_to_class_subject_bulk_save');
    Route::delete('/subject/assign-to-class/new-design/delete/{id}', [SubjectController::class, 'assignToClassNewDesignDelete'])->name('subject.assign_to_class_new_design.delete');

    Route::get('/academic/subjects', [SubjectController::class, 'index'])->name('subject.list');
    Route::match(['GET', 'POST'], '/subject/assign-to-class', [SubjectController::class, 'assignToClass'])->name('subject.assign_to_class');
    Route::get('/subject/sync-subjects-to-class', [SubjectController::class, 'syncSubjectToClass'])->name('subject.sync_subject_to_Class');
    Route::post('/subject/assign-to-class/save', [SubjectController::class, 'assignToClassSave'])->name('subject.assign_to_class_save');
    Route::delete('/subject/assign-to-class/deleted/{id}', [SubjectController::class, 'assignSubjectDestroy'])->name('subject.assign_to_class.destroy');
    Route::post('/subject/assign-to-class/update', [SubjectController::class, 'assignToClassUpdate'])->name('subject.assign_to_class_update');
    Route::get('/subject/assign-teacher/{id}', [SubjectController::class, 'assignTeacher'])->name('subject.assign_teacher');
    Route::post('/subject/assign-teacher/save/{id}', [SubjectController::class, 'saveAssignTeacher'])->name('subject.assign_teacher_save');
    Route::get('/subject/create', [SubjectController::class, 'create'])->name('subject.create');
    Route::post('/subject/save', [SubjectController::class, 'save'])->name('subject.save');
    Route::get('/subject/edit/{subject}', [SubjectController::class, 'edit'])->name('subject.edit');
    Route::patch('/subject/update/{subject}', [SubjectController::class, 'update'])->name('subject.update');
    Route::delete('/subject/delete/{subject}', [SubjectController::class, 'destroy'])->name('subject.destroy');

    // Subject Group
    Route::match(['GET', 'POST'], '/academic/subject/groups', [SubjectGroupingController::class, 'subjectGroupList'])->name('subject_group.list');
    Route::delete('/academic/subject/group/delete/{id}', [SubjectGroupingController::class, 'subjectGroupDestroy'])->name('subject_group.destroy');

    // administrator
    Route::get('/administrator', [AdministratorController::class, 'index'])->name('administrator.list');
    Route::get('/administrator/create', [AdministratorController::class, 'create'])->name('administrator.create');
    Route::post('/administrator/save', [AdministratorController::class, 'save'])->name('administrator.save');
    Route::get('/administrator/edit/{administrator}', [AdministratorController::class, 'edit'])->name('administrator.edit');
    Route::patch('/administrator/update/{administrator}', [AdministratorController::class, 'update'])->name('administrator.update');
    Route::delete('/administrator/delete/{administrator}', [AdministratorController::class, 'destroy'])->name('administrator.destroy');

    // academic year
    Route::get('/academic-years', [AcademicYearController::class, 'index'])->name('academic_year.list');
    Route::get('/academic-year/create', [AcademicYearController::class, 'create'])->name('academic_year.create');
    Route::post('/academic-year/save', [AcademicYearController::class, 'save'])->name('academic_year.save');
    Route::get('/academic-year/edit/{academicSection}', [AcademicYearController::class, 'edit'])->name('academic_year.edit');
    Route::patch('/academic-year/update/{academicSection}', [AcademicYearController::class, 'update'])->name('academic_year.update');
    Route::delete('/academic-year/delete/{academicSection}', [AcademicYearController::class, 'destroy'])->name('academic_year.destroy');
    Route::get('/academic-year/set-session', [AcademicYearController::class, 'setAcademicYearSession'])->name('academic_year.set_academic_year_session');

    // admission
    Route::get('/admission/mis-report', [AdmissionController::class, 'misReport'])->name('admission.mis_report');
    Route::get('/admission/dashboard', [AdmissionController::class, 'dashboard'])->name('admission.dashboard');

    // admission registration setting
    Route::get('/admission/registration/setting', [AdmissionController::class, 'registrationSetting'])->name('admission.registration_settings');
    Route::post('/admission/registration/setting/save', [AdmissionController::class, 'registrationSettingSave'])->name('admission.registration_settings.save');

    // admission registration report
    Route::match(['GET', 'POST'], '/admission/registration/reports', [RegistrationReportController::class, 'registrationReport'])->name('admission_registration_report.registration_report');
    Route::get('/admission/registration/report/daily-collection', [RegistrationReportController::class, 'registrationDailyCollection'])->name('admission_registration_report.daily_collection');
    Route::match(['GET', 'POST'], '/admission/registration/report/monthly-collection', [RegistrationReportController::class, 'registrationMonthlyCollection'])->name('admission_registration_report.monthly_collection');
    Route::get('/admission/registration/report/deleted', [RegistrationReportController::class, 'deletedRegistration'])->name('admission_registration_report.deleted');
    Route::get('/admission/registration/report/due-amount', [RegistrationReportController::class, 'dueRegistrationAmount'])->name('admission_registration_report.due_Amount');
    Route::match(['GET', 'POST'], '/admission/registration/report/daily-admission-report', [RegistrationReportController::class, 'dailyAdmissionReport'])->name('admission_registration_report.daily_admission');

    // admission student type
    Route::get('/admission/studenttype', [AdmissionController::class, 'studentType'])->name('admission.student_type');
    Route::post('/admission/studenttype/save', [AdmissionController::class, 'studentTypeSave'])->name('admission.student_type.save');
    Route::get('/admission/studenttype/edit/{id}', [AdmissionController::class, 'studentTypeEdit'])->name('admission.student_type.edit');
    Route::put('/admission/studenttype/update/{id}', [AdmissionController::class, 'studentTypeUpdate'])->name('admission.student_type.update');
    Route::delete('/admission/studenttype/delete/{id}', [AdmissionController::class, 'studentTypedestroy'])->name('admission.student_type.delete');
    // admission process----
    Route::match(['GET', 'POST'], '/admission/process', [AdmissionController::class, 'process'])->name('admission.process');
    Route::post('/admission/process/save', [AdmissionController::class, 'processSave'])->name('admission.process.save');
    Route::post('/admission/get-classroom-by-acy', [AdmissionController::class, 'getClassRoomByAcy'])->name('get_classroom_by_acy');

    Route::post('/admission/get-enquiry-by-acy', [AdmissionController::class, 'getEnquiryByAcy'])->name('get_enquiry_by_acy_report');

    Route::post('/admission/get-month-enquiry-by-acy', [AdmissionController::class, 'getMonthEnquiryByAcy'])->name('month_wise_report');


    Route::post('/admission/get_reg_amount_by_ac_id', [AdmissionController::class, 'getRegAmountByAcy'])->name('get_reg_amount_by_ac_id');


    Route::post('/admission/get_daily_admission_repo', [AdmissionController::class, 'getDailyAdmissionRepo'])->name('get_daily_admission_repo');

    // admission Exam
    Route::match(['GET', 'POST'], '/admission/set-examdate', [AdmissionExamController::class, 'setExamDate'])->name('admission_exam.set_exam_date');

    Route::post('/admission/classwiseReport', [AdmissionExamController::class, 'classwiseReport'])->name('admission.classwiseReport');
    // Route::post('/admission/classwiseReport', [AdmissionExamController::class, 'classwiseReport'])->name('admission.classwiseFiltering');

    Route::post('/admission/class-id', [AdmissionExamController::class, 'addmissionClassId'])->name('admission.class_id');

    Route::match(['POST', 'GET'], '/admission/change-selected-status', [AdmissionExamController::class, 'changeSelectedStatus'])->name('admission_exam.change_selected_status');
    Route::match(['POST', 'GET'], '/admission/exam-summary', [AdmissionExamController::class, 'admissionExamSummary'])->name('admission_exam.exam_summary');
    Route::match(['POST', 'GET'], '/admission/send-student-message', [AdmissionExamController::class, 'sendStudentMessage'])->name('admission_exam.send_student_message');
    Route::match(['GET', 'POST'], '/admission/registration-marks-entry', [AdmissionExamController::class, 'registrationMarksEntry'])->name('admission_exam.registration_marks_entry');
    Route::post('/admission/registration-marks-entry/save', [AdmissionExamController::class, 'registrationMarksEntrySave'])->name('admission_exam.registration_marks_entry.save');
    Route::match(['POST', 'GET'], '/admission/registration-exam-report', [AdmissionExamController::class, 'registrationExamReport'])->name('admission_exam.registration_exam_report');

    // Admission registration report
    Route::get('/admission/registration/reports', [RegistrationReportController::class, 'registrationReport'])->name('admission_registration_report.registration_report');
    Route::match(['POST', 'GET'], '/admission/registration/report/daily-collection', [RegistrationReportController::class, 'registrationDailyCollection'])->name('admission_registration_report.daily_collection');
    Route::get('/admission/registration/report/monthly-collection', [RegistrationReportController::class, 'registrationMonthlyCollection'])->name('admission_registration_report.monthly_collection');
    Route::match(['POST', 'GET'], '/admission/registration/report/deleted', [RegistrationReportController::class, 'deletedRegistration'])->name('admission_registration_report.deleted');
    Route::get('/admission/registration/report/due-amount', [RegistrationReportController::class, 'dueRegistrationAmount'])->name('admission_registration_report.due_Amount');
    Route::get('/admission/registration/report/daily-admission-report', [RegistrationReportController::class, 'dailyAdmissionReport'])->name('admission_registration_report.daily_admission');

    // admission enquery status
    Route::get('/admission/enquirystatus', [AdmissionEnquiryStatusController::class, 'enquiryStatus'])->name('admission.enquiry_status');
    Route::post('/admission/enquirystatus/save', [AdmissionEnquiryStatusController::class, 'save'])->name('admission.enquiry_status.save');
    Route::get('/admission/enquirystatus/edit/{id}', [AdmissionEnquiryStatusController::class, 'edit'])->name('admission.enquiry_status.edit');
    Route::put('/admission/enquirystatus/update/{id}', [AdmissionEnquiryStatusController::class, 'update'])->name('admission.enquiry_status.update');
    Route::delete('/admission/enquirystatus/delete/{id}', [AdmissionEnquiryStatusController::class, 'destroy'])->name('admission.enquiry_status.delete');
    // Admission enquery Source
    Route::get('/admission/enquirysource', [AdmissionEnquerySourceController::class, 'enquirySource'])->name('admission.enquiry_source');
    Route::post('/admission/enquirysource/save', [AdmissionEnquerySourceController::class, 'save'])->name('admission.enquiry_source.save');
    Route::get('/admission/enquirysource/edit/{id}', [AdmissionEnquerySourceController::class, 'edit'])->name('admission.enquiry_source.edit');
    Route::put('/admission/enquirysource/update/{id}', [AdmissionEnquerySourceController::class, 'update'])->name('admission.enquiry_source.update');
    Route::delete('/admission/enquirysource/delete/{id}', [AdmissionEnquerySourceController::class, 'destroy'])->name('admission.enquiry_source.delete');

    // Admission enquiry
    Route::match(['get', 'post'], '/admission/registration/enquiry/activity-report-datewise', [AdmissionController::class, 'enquiryReportDateWiseActivity'])->name('admission.activity_date_report');
    Route::match(['POST', 'GET'], '/admission/registration/enquiry/follow-report-datewise', [AdmissionController::class, 'enquiryReportDateWiseFollow'])->name('admission.registration_setting_date_wise');
    Route::get('/admission/registration/enquiry/status-summary', [AdmissionController::class, 'enquiryStatusSummary'])->name('admission.registration_setting');
    Route::get('/admission/registration/enquiry/class-wise-summary', [AdmissionController::class, 'classWiseSummary'])->name('admission.registration_setting_class_wise');
    // registration-and-sourcebyreport
    Route::get('/admission/registration/enquiry/registration-and-sourcebyreport', [AdmissionController::class, 'registrationSourceReport'])->name('admission.registration_source_report');

    // admission enquiry registration enquiry
    Route::match(['POST', 'GET'], '/admission/registration/enquiry/report', [AdmissionEnqueryRegistrationController::class, 'enquiryReport'])->name('admission_enquery_reg.enquiry_report');

    Route::post('/admission/registration/', [AdmissionEnqueryRegistrationController::class, 'admissionExam'])->name('admission.exam');
    Route::patch('/admission/registration/exam-status/update', [AdmissionEnqueryRegistrationController::class, 'updateAdmissionExamStatus'])->name('admission.exam.status.update');

    Route::match(['GET', 'POST'], '/admission/registration/enquiry/form', [AdmissionEnqueryRegistrationController::class, 'enquiryForm'])->name('admission_enquery_reg.enquiry_form');
    Route::post('/admission/registration/enquiry/form/save', [AdmissionEnqueryRegistrationController::class, 'save'])->name('admission_enquery_reg.save');

    Route::post('/admission/registration/enquiry/follows/save', [AdmissionEnqueryRegistrationController::class, 'enquiryFollows'])->name('enquiryfollows.up');

    Route::match(['GET', 'POST'], '/admission/registration/enquiry/form/edit/{id}', [AdmissionEnqueryRegistrationController::class, 'edit'])->name('admission_enquery_reg.edit');
    Route::put('/admission/registration/enquiry/form/update/{id}', [AdmissionEnqueryRegistrationController::class, 'update'])->name('admission_enquery_reg.update');
    Route::delete('/admission/registration/enquiry/report/delete/{id}', [AdmissionEnqueryRegistrationController::class, 'destroy'])->name('admission_enquery_reg.delete');
    Route::post('/admission/registration/enquiry/report/save', [AdmissionEnqueryRegistrationController::class, 'enquiryStudentSave'])->name('admission_enquery_reg.enquiry_student_save');
    Route::post('/admission/registration/enquiry/push-to-registration/{id}', [AdmissionEnqueryRegistrationController::class, 'pushEnquiryToRegistrationSave'])->name('admission_enquery_reg.enquiry_push_to_registration');
    Route::match(['GET', 'POST'], '/admission/registration/create', [AdmissionEnqueryRegistrationController::class, 'createRegistration'])->name('admission_enquery_reg.create_registration');
    Route::post('/admission/registration/save', [AdmissionEnqueryRegistrationController::class, 'registrationSave'])->name('admission_enquery_reg.registration_save');
    Route::match(['GET', 'POST'], '/admission/registration/edit/{id}', [AdmissionEnqueryRegistrationController::class, 'editRegistration'])->name('admission_enquery_reg.edit_registration');
    Route::post('/admission/registration/update/{id}', [AdmissionEnqueryRegistrationController::class, 'updateRegistration'])->name('admission_enquery_reg.update_registration');

    Route::post('/admission/switch-enquiry-to-registration/{id}', [AdmissionEnqueryRegistrationController::class, 'switchEnquiryToReg'])->name('admission_enquery_reg.switch_enquery_to_reg');
    Route::put('/admission/update-enquiry-status/{id}', [AdmissionEnqueryRegistrationController::class, 'updateEnquiryStatus'])->name('admission_enquery_reg.update_enquiry_status');

    // admission
    Route::delete('/admission/registrations/delete/{id}', [AdmissionController::class, 'deleteRegistrations'])->name('admission.registration_list.delete');
    Route::match(['GET', 'POST'], '/admission/registrations', [AdmissionController::class, 'registrations'])->name('admission.registration_list');
    Route::post('/admission/registrations/save', [AdmissionController::class, 'registrationsSave'])->name('admission.registration_list.save');


    Route::get('/admission/registration/add-admission/{id}', [AdmissionController::class, 'addAdmission'])->name('admission_registration.add_admission');
    Route::post('/admission/registration/add-admission/save/{id}', [AdmissionController::class, 'addAdmissionSave'])->name('admission_registration.add_admission_save');
    Route::get('/admission/registration/view-admission/{id}', [AdmissionController::class, 'viewAdmission'])->name('admission_registration.view_admission');

    // Update Registraio Statusadmission
    Route::patch('/admission/registration-status/update/{id}', [AdmissionController::class, 'updateAdmissionRegistrarionStatus'])->name('admissionRegistrarionStatus.update');

    // Update Form Number
    Route::patch('/admission/form-number/update/{id}', [AdmissionController::class, 'updateFormNumber'])->name('updateFormNumber.update');

    Route::patch('/admission/registration-number/update/{id}', [AdmissionController::class, 'updateRegistrationNumber'])->name('updateRegistrationNumber.update');

    Route::delete('/admission/delete/{admission}', [AdmissionController::class, 'destroy'])->name('admission.destroy');

    // alumni
    Route::get('/alumni', [AlumniController::class, 'index'])->name('alumni.list');
    Route::get('/alumni/payment', [AlumniController::class, 'alumniPayment'])->name('alumni.payment');
    Route::get('/alumni/create', [AlumniController::class, 'create'])->name('alumni.create');
    Route::post('/alumni/save', [AlumniController::class, 'save'])->name('alumni.save');
    Route::get('/alumni/edit/{alumni}', [AlumniController::class, 'edit'])->name('alumni.edit');
    Route::patch('/alumni/update/{alumni}', [AlumniController::class, 'update'])->name('alumni.update');
    Route::delete('/alumni/delete/{alumni}', [AlumniController::class, 'destroy'])->name('alumni.destroy');

    // assessment
    Route::match(['GET', 'POST'], '/assessments', [AssessmentController::class, 'index'])->name('assessment.list');
    Route::match(['GET', 'POST'], '/assessment/create', [AssessmentController::class, 'create'])->name('assessment.create');
    Route::post('/assessment/save', [AssessmentController::class, 'save'])->name('assessment.save');
    Route::match(['GET', 'POST'], '/assessment/edit/{id}', [AssessmentController::class, 'edit'])->name('assessment.edit');
    Route::put('/assessment/update/{id}', [AssessmentController::class, 'update'])->name('assessment.update');
    Route::delete('/assessment/delete/{id}', [AssessmentController::class, 'destroy'])->name('assessment.destroy');
    Route::match(['GET', 'POST'], '/assessment/activity/{id}', [AssessmentController::class, 'assessmentActivity'])->name('assessment.activity');
    Route::post('/assessment/activity-mark/save', [AssessmentController::class, 'assessmentActivityMarkSave'])->name('assessment.activity.mark.save');
    Route::post('/assessment/activity-comment/save', [AssessmentController::class, 'assessmentActivityCommentSave'])->name('assessment.activity.comment.save');
    Route::delete('/assessment/activity/delete/{id}', [AssessmentController::class, 'assessmentActivityDelete'])->name('assessment.activity.delete');

    Route::match(['GET', 'POST'], '/student/view-assessment', [AssessmentController::class, 'studentViewAssessmeent'])->name('assessment.view');
    Route::match(['GET', 'POST'], '/student/{student_id}/assessment/show/{assessment_id}', [AssessmentController::class, 'studentAssessmeentShow'])->name('student.assessment.show');

    // asset
    Route::get('/assets', [AssetController::class, 'index'])->name('asset.list'); // not use
    Route::match(['GET', 'POST'], '/asset/create', [AssetController::class, 'create'])->name('asset.create');
    Route::post('/asset/save', [AssetController::class, 'save'])->name('asset.save');
    Route::get('/asset/edit/{asset}', [AssetController::class, 'edit'])->name('asset.edit');
    Route::patch('/asset/update/{asset}', [AssetController::class, 'update'])->name('asset.update');
    Route::delete('/asset/delete/{asset}', [AssetController::class, 'destroy'])->name('asset.destroy');
    Route::post('/asset/learning-material-group/save', [AssetController::class, 'saveLearningMaterialGroup'])->name('asset.learning_material_group.save');
    Route::put('/asset/learning-material-group/update/{id}', [AssetController::class, 'updateLearningMaterialGroup'])->name('asset.learning_material_group.update');
    Route::delete('/asset/learning-material-group/delete/{id}', [AssetController::class, 'deleteLearningMaterialGroup'])->name('asset.learning_material_group.delete');
    Route::post('/asset/learning-material/save', [AssetController::class, 'saveLearningMaterial'])->name('asset.learning_material.save');
    Route::put('/asset/learning-material/update/{id}', [AssetController::class, 'updateLearningMaterial'])->name('asset.learning_material.update');
    Route::delete('/asset/learning-material/delete/{id}', [AssetController::class, 'deleteLearningMaterial'])->name('asset.learning_material.delete');
    Route::get('/asset/learning-material-resource/download/{id}', [AssetController::class, 'downloadLearningMaterialResourceFile'])->name('asset.learning_material_resource.download');
    Route::delete('/asset/learning-material-resource/delete/{id}', [AssetController::class, 'deleteLearningMaterialResource'])->name('asset.learning_material_resource.delete');
    Route::post('/asset/share-learning-material/save', [AssetController::class, 'shareLearningMaterial'])->name('asset.share_learning_material.save');

    // classroom learning material
    Route::post('/asset/classroom-learning-material/save', [AssetController::class, 'assignClassroomLearningMaterial'])->name('asset.classroom_learning_material.save');

    //online topic
    Route::post('/asset/online-topic/save', [AssetController::class, 'saveOnlineTopic'])->name('asset.online_topic.save');
    Route::put('/asset/online-topic/update/{id}', [AssetController::class, 'updateOnlineTopic'])->name('asset.online_topic.update');

    // blood-groups
    Route::get('/blood-groups', [BloodGroupController::class, 'index'])->name('blood_group.list');
    Route::get('/blood-group/create', [BloodGroupController::class, 'create'])->name('blood_group.create');
    Route::post('/blood-group/save', [BloodGroupController::class, 'save'])->name('blood_group.save');
    Route::get('/blood-group/edit/{bankAccount}', [BloodGroupController::class, 'edit'])->name('blood_group.edit');
    Route::patch('/blood-group/update/{id}', [BloodGroupController::class, 'update'])->name('blood_group.update');
    Route::delete('/blood-group/delete/{id}', [BloodGroupController::class, 'destroy'])->name('blood_group.destroy');

    // bank account
    Route::get('/bank-accounts', [BankAccountController::class, 'index'])->name('bank_account.list');
    Route::post('/bank-account/save', [BankAccountController::class, 'save'])->name('bank_account.save');
    Route::get('/bank-account/edit/{bankAccount}', [BankAccountController::class, 'edit'])->name('bank_account.edit');
    Route::patch('/bank-account/update/{bankAccount}', [BankAccountController::class, 'update'])->name('bank_account.update');
    Route::delete('/bank-account/delete/{bankAccount}', [BankAccountController::class, 'destroy'])->name('bank_account.destroy');

    // category
    Route::get('/category/caste', [CategoryController::class, 'index'])->name('category_caste.list');
    Route::get('/category/employment', [CategoryController::class, 'employmentCreateAndList'])->name('category.employment_create_list');
    Route::get('/category/staff', [CategoryController::class, 'staffCreateAndList'])->name('category.staff_create_list');
    Route::get('/category/fee', [CategoryController::class, 'createFeeCategory'])->name('category.fee_create_list');
    Route::post('/category/save', [CategoryController::class, 'save'])->name('category.save');
    Route::get('/category/edit/{category}', [CategoryController::class, 'edit'])->name('category.edit');
    Route::patch('/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
    Route::get('/inventory/category', [CategoryController::class, 'productCategory'])->name('category.product_list');

    // certificate
    Route::get('/certificates', [CertificateController::class, 'index'])->name('certificate.list');
    Route::get('/certificate/template', [CertificateController::class, 'certTemplate'])->name('certificate.cert_template');
    Route::post('/certificate/save/template', [CertificateController::class, 'saveTemplate'])->name('certificate.save_template');
    Route::get('/certificate/edit/template/{id}', [CertificateController::class, 'editTemplate'])->name('certificate.edit_template');
    Route::put('/certificate/update/template/{id}', [CertificateController::class, 'updateTemplate'])->name('certificate.update_template');
    Route::delete('/certificate/delete/template/{id}', [CertificateController::class, 'deleteTemplate'])->name('certificate.delete_template');


    // classroom attendance
    Route::match(['GET', 'POST'], '/class/attendance/take', [ClassroomAttendanceController::class, 'takeAttendance'])->name('classroom_attendance.take_attendance');
    Route::post('/class/attendance/take/save', [ClassroomAttendanceController::class, 'takeAttendanceSave'])->name('classroom_attendance.take_attendance_save');
    Route::match(['GET', 'POST'], '/class/attendance/set-class-working', [ClassroomAttendanceController::class, 'setClassWorking'])->name('classroom_attendance.set_class_working');
    Route::post('/class/attendance/set-class-working/save', [ClassroomAttendanceController::class, 'setClassWorkingSave'])->name('classroom_attendance.set_class_working_save');
    Route::match(['GET', 'POST'], '/class/attendance/set-section-working', [ClassroomAttendanceController::class, 'setSectionWorking'])->name('classroom_attendance.set_section_working');
    Route::post('/class/attendance/set-section-working/save', [ClassroomAttendanceController::class, 'setSectionWorkingSave'])->name('classroom_attendance.set_section_working_save');
    Route::match(['GET', 'POST'], '/class/attendance/set-student-working', [ClassroomAttendanceController::class, 'setStudentWorking'])->name('classroom_attendance.set_student_working');
    Route::post('/class/attendance/set-student-working/save', [ClassroomAttendanceController::class, 'setStudentWorkingSave'])->name('classroom_attendance.set_student_working_save');
    Route::post('/class/attendance/student-note/save', [ClassroomAttendanceController::class, 'saveStudentNote'])->name('classroom_attendance.student_note.save');

    // classroom attendance report
    Route::match(['GET', 'POST'], '/class/attendance/report/today', [ClassroomAttendanceReportController::class, 'todayAttendance'])->name('classroom_attendance_report.today_attendance');
    Route::get('/class/attendance/report/register-view', [ClassroomAttendanceReportController::class, 'registerView'])->name('classroom_attendance_report.register_view');
    Route::match(['GET', 'POST'], '/class/attendance/report/absent', [ClassroomAttendanceReportController::class, 'absentReport'])->name('classroom_attendance_report.absent_report');
    Route::get('/class/attendance/report/back-date', [ClassroomAttendanceReportController::class, 'backDateReport'])->name('classroom_attendance_report.back_date_report');
    Route::match(['GET', 'POST'], '/class/attendance/report/classwisedaily', [ClassroomAttendanceReportController::class, 'classWiseDailyAttendanceReport'])->name('classroom_attendance_report.classwisedaily_attendance_report');
    Route::match(['GET', 'POST'], '/class/attendance/report/datewiseclass', [ClassroomAttendanceReportController::class, 'dateWiseClassAttendanceReport'])->name('classroom_attendance_report.datewiseclass_attendance_report');
    Route::match(['GET', 'POST'], '/class/attendance/report/monthwise', [ClassroomAttendanceReportController::class, 'monthReport'])->name('classroom_attendance_report.month_report');
    Route::get('/class/attendance/report/sendsms-present-students', [ClassroomAttendanceReportController::class, 'sendSMSToPresentStudents'])->name('classroom_attendance_report.sendsms_present_students');
    Route::match(['GET', 'POST'], '/class/attendance/report/student-wise', [ClassroomAttendanceReportController::class, 'studentWiseAttendance'])->name('classroom_attendance_report.studentwise_attendance');

    // class name
    Route::get('/class-names', [ClassroomController::class, 'className'])->name('class_name.list');
    Route::post('/class-name/save', [ClassroomController::class, 'saveClassName'])->name('class_name.save');
    Route::get('/class-name/edit/{id}', [ClassroomController::class, 'classNameEdit'])->name('class_name.edit');
    Route::put('/class-name/update/{id}', [ClassroomController::class, 'classNameUpdate'])->name('class_name.update');
    Route::delete('/class-name/delete/{id}', [ClassroomController::class, 'classNameDestroy'])->name('class_name.destroy');

    // cheque
    Route::match(['GET', 'POST'], '/cheque/pdc', [ChequeController::class, 'pdc'])->name('cheque.pdc');
    Route::post('/cheque/pdc/save', [ChequeController::class, 'savePdc'])->name('cheque.pdc.save');
    Route::get('/cheque/pdc/edit/{id}', [ChequeController::class, 'editPdc'])->name('cheque.pdc.edit');
    Route::put('/cheque/pdc/update/{cheque}', [ChequeController::class, 'updatePdc'])->name('cheque.pdc.update');
    Route::delete('/cheque/pdc/delete/{cheque}', [ChequeController::class, 'deletePdc'])->name('cheque.pdc.delete');

    Route::match(['GET', 'POST'], '/cheque/manage', [ChequeController::class, 'manageCheque'])->name('cheque.manage_cheque');
    Route::match(['GET', 'POST'], '/cheque/allpdc', [ChequeController::class, 'allPdc'])->name('cheque.all_pdc');
    Route::patch('/cheque/report/update/{id}', [ChequeController::class, 'updateChequeData'])->name('cheque_data.update');
    Route::get('/cheque/bouncedreport', [ChequeController::class, 'bouncedReport'])->name('cheque.bounced_report');
    Route::match(['GET', 'POST'], '/cheque/chequereport', [ChequeController::class, 'chequeReport'])->name('cheque.cheque_report');
    Route::get('/cheque/clearancereport', [ChequeController::class, 'clearanceReport'])->name('cheque.clearance_report');

    // class time table
    Route::get('/classes', [ClassroomController::class, 'classIndex'])->name('classroom.time_table_list');
    Route::get('/class/assign-order', [ClassroomController::class, 'createAssignOrder'])->name('classroom.assign_order');
    Route::post('/class/assign-order/save', [ClassroomController::class, 'saveAssignOrder'])->name('classroom.save_assign_order');
    Route::get('/class/assign-roll/{id}', [ClassroomController::class, 'createAssignRoll'])->name('classroom.assign_roll');
    Route::post('/class/assign-roll/save', [ClassroomController::class, 'assignStudentRollSave'])->name('classroom.assign_roll_save');
    Route::match(['GET', 'POST'], '/class/timetable/create', [ClassroomController::class, 'createTimetable'])->name('classroom.create_time_table');
    Route::post('/class/timetable/save', [ClassroomController::class, 'saveTimetable'])->name('classroom.save_time_table');
    Route::get('/class/assign-teacher', [ClassroomController::class, 'assignClassTeacher'])->name('classroom.assign_teacher');
    Route::post('/class/assign-teacher/save', [ClassroomController::class, 'assignClassTeacherSave'])->name('classroom.assign_teacher_save');
    Route::post('/class/timetable/save-teacher', [ClassroomController::class, 'saveClassTeacher'])->name('classroom.save_teacher');
    Route::get('/class/timetable/edit/{id}', [ClassroomController::class, 'editTimeTable'])->name('classroom.time_table_edit');
    Route::put('/class/timetable/update/{id}', [ClassroomController::class, 'updateTimeTable'])->name('classroom.time_table_update');
    Route::delete('/class/timetable/delete/{id}', [ClassroomController::class, 'destroyTimeTable'])->name('classroom.time_table_destroy');
    Route::put('/class/assign-monitor/save/{id}', [ClassroomController::class, 'assignClassMonitor'])->name('classroom.assign_class_monitor');
    Route::post('/class/assign-display-order', [ClassroomController::class, 'assignDisplayOrder'])->name('classroom.assign_display_order');

    // timetable
    Route::match(['GET', 'POST'], '/timetable/create', [TimetableController::class, 'create'])->name('timetable.create');
    Route::post('/timetable/save', [TimetableController::class, 'save'])->name('timetable.save');
    Route::match(['GET', 'POST'], '/timetable/class-timetable', [TimetableController::class, 'classroomTimetable'])->name('timetable.classroom_timetable');
    Route::match(['GET', 'POST'], '/timetable/teacher-timetable', [TimetableController::class, 'teacherTimetable'])->name('timetable.teacher_timetable');
    Route::get('/timetable/teacher-allocation', [TimetableController::class, 'teacherAllocation'])->name('timetable.teacher_allocation');
    Route::match(['GET', 'POST'], '/timetable/vacant-teachers', [TimetableController::class, 'vacantTeachers'])->name('timetable.vacant_teacher');
    Route::match(['GET', 'POST'], '/timetable/allotment', [TimetableController::class, 'allotment'])->name('timetable.allotment');

    // student timetable
    Route::match(['GET', 'POST'], '/student/timetable', [TimetableController::class, 'studentTimetable'])->name('student_timetable.list');

    // homework
    Route::get('/homeworks', [HomeworkController::class, 'index'])->name('homework.list');
    Route::match(['GET', 'POST'], '/homework/create', [HomeworkController::class, 'create'])->name('homework.create');
    Route::post('/homework/save', [HomeworkController::class, 'save'])->name('homework.save');
    Route::match(['GET', 'POST'], '/homework/edit/{id}', [HomeworkController::class, 'edit'])->name('homework.edit');
    Route::put('/homework/update/{id}', [HomeworkController::class, 'update'])->name('homework.update');
    Route::delete('/homework/delete/{id}', [HomeworkController::class, 'destroy'])->name('homework.destroy');
    Route::match(['GET', 'POST'], '/homework/activity/{id}', [HomeworkController::class, 'homeworkActivity'])->name('homework.activity');
    Route::post('/homework/activity-comment/save', [HomeworkController::class, 'homeworkActivityCommentSave'])->name('homework.activity.comment.save');
    Route::delete('/homework/activity/delete/{id}', [HomeworkController::class, 'homeworkActivityDelete'])->name('homework.activity.delete');
    Route::match(['GET', 'POST'], '/student/view-homeworks', [HomeworkController::class, 'studentViewHomeworks'])->name('homework.view');
    Route::match(['GET', 'POST'], '/student/{student_id}/homework/show/{homework_id}', [HomeworkController::class, 'studentHomeworkShow'])->name('student.homework.show');

    // academic classwork
    Route::match(['GET', 'POST'], '/academic/classworks', [ClassworkController::class, 'index'])->name('classwork.list');
    Route::match(['GET', 'POST'], '/academic/classwork/create', [ClassworkController::class, 'create'])->name('classwork.create');
    Route::post('/academic/classwork/save', [ClassworkController::class, 'save'])->name('classwork.save');
    Route::match(['GET', 'POST'], '/academic/classwork/edit/{id}', [ClassworkController::class, 'edit'])->name('classwork.edit');
    Route::put('/academic/classwork/update/{id}', [ClassworkController::class, 'update'])->name('classwork.update');
    Route::delete('/academic/classwork/delete/{id}', [ClassworkController::class, 'destroy'])->name('classwork.destroy');
    Route::match(['GET', 'POST'], '/academic/classwork/activity/{id}', [ClassworkController::class, 'classworkActivity'])->name('classwork.activity');
    Route::post('/academic/classwork/activity-comment/save', [ClassworkController::class, 'classworkActivityCommentSave'])->name('classwork.activity.comment.save');
    Route::delete('/academic/classwork/activity/delete/{id}', [ClassworkController::class, 'classworkActivityDelete'])->name('classwork.activity.delete');
    Route::match(['GET', 'POST'], '/student/view-classworks', [ClassworkController::class, 'studentViewclassworks'])->name('classwork.view');
    Route::match(['GET', 'POST'], '/student/{student_id}/classwork/show/{classwork_id}', [ClassworkController::class, 'studentclassworkShow'])->name('student.classwork.show');

    // classroom group
    Route::get('/class-groups', [ClassroomGroupController::class, 'index'])->name('classroom_group.list');
    Route::get('/class-group/create', [ClassroomGroupController::class, 'create'])->name('classroom_group.create');
    Route::post('/class-group/save', [ClassroomGroupController::class, 'save'])->name('classroom_group.save');
    Route::get('/class-group/edit/{classGroup}', [ClassroomGroupController::class, 'edit'])->name('classroom_group.edit');
    Route::patch('/class-group/update/{id}', [ClassroomGroupController::class, 'update'])->name('classroom_group.update');
    Route::delete('/class-group/delete/{id}', [ClassroomGroupController::class, 'destroy'])->name('classroom_group.destroy');

    // communication
    Route::get('/communications', [CommunicationController::class, 'index'])->name('communication.list');

    // communication
    Route::get('/configurations', [ConfigurationController::class, 'index'])->name('configuration.list');

    // custom-fields
    Route::get('/custom-fields', [CustomFieldController::class, 'index'])->name('custom_field.list');
    Route::get('/custom-field/create', [CustomFieldController::class, 'create'])->name('custom_field.create');
    Route::post('/custom-field/save', [CustomFieldController::class, 'save'])->name('custom_field.save');
    Route::get('/custom-field/edit/{course}', [CustomFieldController::class, 'edit'])->name('custom_field.edit');
    Route::put('/custom-field/update/{id}', [CustomFieldController::class, 'update'])->name('custom_field.update');
    Route::delete('/custom-field/delete/{id}', [CustomFieldController::class, 'destroy'])->name('custom_field.destroy');


    // department
    Route::get('/departments', [DepartmentController::class, 'index'])->name('department.list');
    Route::get('/department/create', [DepartmentController::class, 'create'])->name('department.create');
    Route::post('/department/save', [DepartmentController::class, 'save'])->name('department.save');
    Route::get('/department/edit/{department}', [DepartmentController::class, 'edit'])->name('department.edit');
    Route::patch('/department/update/{id}', [DepartmentController::class, 'update'])->name('department.update');
    Route::delete('/department/delete/{id}', [DepartmentController::class, 'destroy'])->name('department.destroy');

    // designation
    Route::get('/designations', [DesignationController::class, 'index'])->name('designation.list');
    Route::get('/designation/create', [DesignationController::class, 'create'])->name('designation.create');
    Route::post('/designation/save', [DesignationController::class, 'save'])->name('designation.save');
    Route::get('/designation/edit/{designation}', [DesignationController::class, 'edit'])->name('designation.edit');
    Route::patch('/designation/update/{id}', [DesignationController::class, 'update'])->name('designation.update');
    Route::delete('/designation/delete/{id}', [DesignationController::class, 'destroy'])->name('designation.destroy');

    // document
    Route::get('/document/dashboard', [DocumentController::class, 'dashboard'])->name('document.dashboard');
    Route::match(['GET', 'POST'], '/document/school', [DocumentController::class, 'schoolDocuments'])->name('document.school_documents');
    Route::match(['GET', 'POST'], '/document/driver', [DocumentController::class, 'driverDocuments'])->name('document.driver_documents');
    Route::match(['GET', 'POST'], '/document/teacher', [DocumentController::class, 'teacherDocuments'])->name('document.teacher_documents');
    Route::match(['GET', 'POST'], '/document/upload', [DocumentController::class, 'create'])->name('document.create');
    Route::post('/document/save', [DocumentController::class, 'save'])->name('document.save');
    Route::get('/document/file/download/{id}', [DocumentController::class, 'downloadDocumentFile'])->name('document.download_file');
    Route::match(['GET', 'POST'], '/document/category', [DocumentController::class, 'documentCategory'])->name('document.document_category');
    Route::post('/document/category/save', [DocumentController::class, 'saveDocumentCategory'])->name('document.document_category.save');
    Route::put('/document/category/update/{id}', [DocumentController::class, 'updateDocumentCategory'])->name('document.document_category.update');
    Route::delete('/document/category/delete/{id}', [DocumentController::class, 'deleteDocumentCategory'])->name('document.document_category.delete');
    Route::delete('/document/school/delete/{id}', [DocumentController::class, 'deleteSchoolDocument'])->name('document.school_document.delete');

    // document report
    Route::match(['GET', 'POST'], '/document/report/student-class-wise', [DocumentReportController::class, 'studentClassWiseReport'])->name('document.student_class_wise');
    Route::get('/document/report/student-wise', [DocumentReportController::class, 'studentWiseReport'])->name('document.student_wise');

    //emergency-contacts
    Route::get('/emergency-contacts', [EmergencyContactController::class, 'index'])->name('emergency_contact.list');
    Route::post('/emergency-contact/save', [EmergencyContactController::class, 'save'])->name('emergency_contact.save');
    Route::patch('/emergency-contact/update/{id}', [EmergencyContactController::class, 'update'])->name('emergency_contact.update');
    Route::delete('/emergency-contact/delete/{id}', [EmergencyContactController::class, 'destroy'])->name('emergency_contact.destroy');

    // Element - default element design
    Route::get('/elements', [ElementController::class, 'index'])->name('element.list');

    // chat
    Route::get('/livechat/{user}', [LiveChatController::class, 'chat'])->name('livechat.form');
    Route::post('/livechat/save', [LiveChatController::class, 'saveChat'])->name('livechat.save');

    // event
    Route::match(['GET', 'POST'], '/events', [EventController::class, 'index'])->name('event.list');
    Route::get('/event/create', [EventController::class, 'create'])->name('event.create');
    Route::post('/event/save', [EventController::class, 'save'])->name('event.save');
    Route::get('/event/edit/{id}', [EventController::class, 'edit'])->name('event.edit');
    Route::put('/event/update/{id}', [EventController::class, 'update'])->name('event.update');
    Route::get('/event/details/{id}', [EventController::class, 'eventDetails'])->name('event.details');
    Route::get('/event/preview/{id}', [EventController::class, 'eventPreview'])->name('event.preview');
    Route::get('/event/{eventId}/create-activity', [EventController::class, 'createEventActivity'])->name('event.activity.create');
    Route::post('/event/{eventId}/save-activity', [EventController::class, 'saveEventActivity'])->name('event.activity.save');
    Route::get('/event/{eventId}/edit-activity/{id}', [EventController::class, 'editEventActivity'])->name('event.activity.edit');
    Route::put('/event/{eventId}/update-activity/{id}', [EventController::class, 'updateEventActivity'])->name('event.activity.update');
    Route::match(['GET', 'POST'], '/event/{eventId}/activity/{activityId}/participants', [EventController::class, 'addEventActivityParticipants'])->name('event.activity.add_participant');
    Route::post('/event/{eventId}/activity/{activityId}/participants/save', [EventController::class, 'saveEventActivityParticipants'])->name('event.activity.save_participant');
    Route::get('/event/{eventId}/activity/{activityId}/winners', [EventController::class, 'addEventActivityWinner'])->name('event.activity.add_winner');
    Route::post('/event/{eventId}/activity/{activityId}/winners/save', [EventController::class, 'saveEventActivityWinner'])->name('event.activity.save_winner');
    Route::post('/event/{eventId}/incharge/save', [EventController::class, 'saveEventIncharge'])->name('event.incharge.save');
    Route::post('/event/{eventId}/document/save', [EventController::class, 'saveEventDocument'])->name('event.document.save');
    Route::delete('/event/{eventId}/document/delete/{id}', [EventController::class, 'deleteEventDocument'])->name('event.document.delete');
    Route::get('/event/document/download/{id}', [EventController::class, 'downloadEventDocumentFile'])->name('event.document.download');

    // Event Calendar
    Route::get('/calendar', [EventCalendarController::class, 'calendar'])->name('event_calendar.calendar');
    Route::match(['GET', 'POST'], '/calendar/list', [EventCalendarController::class, 'listView'])->name('event_calendar.list');

    // Student Event
    Route::get('/student/calendar', [StudentEventController::class, 'calendar'])->name('student_event.calendar');
    Route::match(['GET', 'POST'], '/student/calendar/list', [StudentEventController::class, 'listView'])->name('student_event_calendar.list');

    //Student Attendance Report
    Route::match(['GET', 'POST'], '/student/attendance/list', [StudentAttendanceReportController::class, 'attendanceList'])->name('student_attendance_report.attendance_list');
    Route::match(['GET', 'POST'], '/student/attendance/report', [StudentAttendanceReportController::class, 'attendanceCalendar'])->name('student_attendance_report.list');

    // Fee management
    Route::get('/fees', [FeeController::class, 'index'])->name('fee.list');
    Route::get('/fee/mis-report', [FeeController::class, 'misReport'])->name('fee.mis_report');
    Route::get('/fee/create', [FeeController::class, 'create'])->name('fee.create');
    Route::post('/fee/save', [FeeController::class, 'save'])->name('fee.save');

    Route::get('/fee/installments', [FeeController::class, 'installment'])->name('fee.installment');
    Route::post('/fee/installment/save', [FeeController::class, 'saveInstallment'])->name('fee.installment_save');
    Route::get('/fee/installment/edit/{id}', [FeeController::class, 'editInstallment'])->name('fee.installment_edit');
    Route::put('/fee/installment/update/{id}', [FeeController::class, 'updateInstallment'])->name('fee.installment_update');
    Route::delete('/fee/installment/delete/{id}', [FeeController::class, 'deleteInstallment'])->name('fee.installment_delete');

    Route::get('/fee/installment/one', [FeeController::class, 'installmentOneByOne'])->name('fee.installment_one');
    // check fee data
    Route::post('fee/getInstallmentsByStudent', [FeeController::class, 'getInstallmentsByStudent'])->name('fee.get_installments_by_student');
    Route::post('fee/getInstallmentsByStudentId', [FeeController::class, 'getInstallmentsByStudentId'])->name('fee.get_installments_by_student_id');
    Route::post('fee/getStudentsWithFeesByClassroom', [FeeController::class, 'getStudentsWithFeesByClassroom'])->name('fee.get_students_with_fee_by_classroom');
    Route::post('fee/getBankAccountsByStudentId', [FeeController::class, 'getBankAcocuntsByStudentId'])->name('fee.get_bank_accounts_by_student');
    Route::match(['GET', 'POST'], '/fee/installment/payment', [FeeController::class, 'installmentPayment'])->name('fee.installment_payment');
    Route::match(['GET', 'POST'], '/fee/bulk-payment', [FeeController::class, 'bulkFeePayment'])->name('fee.bulk_fee_payment');
    Route::post('/fee/bulk-payment/save', [FeeController::class, 'saveBulkFeePayment'])->name('fee.bulk_fee_payment.save');
    Route::patch('/fee/guardian-phone/update/{guardian}', [FeeController::class, 'updateGuardianPhone'])->name('fee.update_guardian_phone');
    Route::post('/fee/student-context/save', [FeeController::class, 'saveStudentContext'])->name('fee.save_student_context');
    Route::post('/fee/fee-payment/save', [FeeController::class, 'saveFeePayment'])->name('fee.save_fee_payment');
    Route::post('/fee/fee-payment/cancel', [FeeController::class, 'cancelFeePayment'])->name('fee.cancel_fee_payment');

    Route::post('/fee/installment/payment/save', [FeeController::class, 'saveInstallmentPayment'])->name('fee.save_installment_payment');
    Route::get('/fee/voucher', [FeeController::class, 'voucher'])->name('fee.voucher');
    Route::post('/fee/voucher/save', [FeeController::class, 'saveVoucher'])->name('fee.save_voucher');


    Route::get('/fee/type', [FeeController::class, 'type'])->name('fee.type');
    Route::post('/fee/type/save', [FeeController::class, 'saveType'])->name('fee.type.save');
    Route::get('/fee/type/edit/{id}', [FeeController::class, 'editType'])->name('fee.type.edit');
    Route::put('/fee/type/update/{id}', [FeeController::class, 'updateType'])->name('fee.type.update');
    Route::delete('/fee/type/delete/{id}', [FeeController::class, 'deleteType'])->name('fee.type.delete');


    Route::get('/fee/special-type', [FeeController::class, 'specialType'])->name('fee.special_type');
    Route::post('/fee/special-type/save', [FeeController::class, 'savespecialType'])->name('fee.special_type.save');
    Route::get('/fee/special-type/edit/{id}', [FeeController::class, 'editspecialType'])->name('fee.special_type.edit');
    Route::put('/fee/special-type/update/{id}', [FeeController::class, 'updatespecialType'])->name('fee.special_type.update');
    Route::delete('/fee/special-type/delete/{id}', [FeeController::class, 'deletespecialType'])->name('fee.special_type.delete');

    Route::match(['GET', 'POST'], '/fee/assign-special-type', [FeeController::class, 'assignSpecialType'])->name('fee.assign_special_type');
    Route::post('/fee/assign-special-type/save', [FeeController::class, 'saveAssignSpecialType'])->name('fee.save_assign_special_type');

    Route::match(['GET', 'POST'], '/fee/remove-special-type', [FeeController::class, 'removeSpecialType'])->name('fee.remove_special_type');
    Route::post('/fee/remove-special-type/delete', [FeeController::class, 'deleteStudentSpecialFeeType'])->name('fee.remove_special_type.delete');

    Route::get('/fee/create-class-fee-structure', [FeeController::class, 'createClassFeeStructure'])->name('fee.create_class_fee_structure');
    Route::post('/fee/create-class-fee-structure/save', [FeeController::class, 'saveClassFeeStructure'])->name('fee.save_create_class_fee_structure');
    Route::get('/fee/create-class-fee-structure/edit/{id}', [FeeController::class, 'editClassFeeStructure'])->name('fee.edit_create_class_fee_structure');
    Route::put('/fee/create-class-fee-structure/update/{id}', [FeeController::class, 'updateCreateClassFeeStructure'])->name('fee.update_create_class_fee_structure');
    Route::delete('/fee/create-class-fee-structure/delete/{id}', [FeeController::class, 'deleteClassFeeStructure'])->name('fee.delete_create_class_fee_structure');

    Route::match(['GET', 'POST'], '/fee/update-class-fee-structure', [FeeController::class, 'updateClassFeeStructure'])->name('fee.update_class_fee_structure');
    Route::put('/fee/update-class-fee-structure/update', [FeeController::class, 'updateStudentFeeStructure'])->name('fee.update_class_fee_structure.update');

    Route::match(['GET', 'POST'], '/fee/assign-fee-to-student', [FeeController::class, 'assignFeeToStudent'])->name('fee.assign_fee_to_student');
    Route::post('/fee/assign-fee-to-student/save', [FeeController::class, 'saveAssignFeeToStudent'])->name('fee.assign_fee_to_student.save');
    Route::delete('/fee/assign-fee-to-student/delete/{id}', [FeeController::class, 'deleteStudentFeeStructure'])->name('fee.assign_fee_to_student.delete');
    Route::post('/fee/get-students-with-fee-stucture', [FeeController::class, 'getStudentsWithFeeStructure'])->name('fee.get_students_with_fee_structure');
    Route::post('/fee/get-class-fee-stucture-by-id/{classFeeStructure}', [FeeController::class, 'getClassFeeStructureById'])->name('fee.get_class_fee_stucture_by_id');

    Route::match(['GET', 'POST'], '/fee/update-fee-to-student', [FeeController::class, 'updateFeeToStudent'])->name('fee.update_fee_to_student');
    Route::put('/fee/update-fee-to-student/update', [FeeController::class, 'saveUpdateFeeToStudent'])->name('fee.update_fee_to_student.update');

    Route::get('/fee/transfer-due-fee', [FeeController::class, 'transferDueFee'])->name('fee.transfer_due_fee');
    Route::post('/fee/transfer-due-fee/save', [FeeController::class, 'saveTransferDueFee'])->name('fee.transfer_due_fee.save');

    Route::get('/fee/fee-setting', [FeeController::class, 'feeSetting'])->name('fee.fee_setting');
    Route::post('/fee/fee-setting/save', [FeeController::class, 'saveFeeSetting'])->name('fee.fee_setting.save');
    Route::post('/fee/assign-student-fee-structure', [FeeController::class, 'saveAssignStudentFeeStructure'])->name('fee.assign_student_fee_structure.save');

    // Fee Voucher
    Route::match(['GET', 'POST'], '/fee/vouchers', [FeeVoucherController::class, 'index'])->name('fee_voucher.list');
    Route::match(['GET', 'POST'], '/fee/voucher/create', [FeeVoucherController::class, 'create'])->name('fee_voucher.create');
    Route::post('/fee/voucher/save', [FeeVoucherController::class, 'save'])->name('fee_voucher.save');
    Route::get('/fee/voucher/edit/{studentFeeVoucher}', [FeeVoucherController::class, 'edit'])->name('fee_voucher.edit');
    Route::put('/fee/voucher/update/{studentFeeVoucher}', [FeeVoucherController::class, 'update'])->name('fee_voucher.update');
    Route::delete('/fee/voucher/delete/{studentFeeVoucher}', [FeeVoucherController::class, 'destroy'])->name('fee_voucher.destroy');

    // Fee Import
    Route::get('/fee/import', [FeeImportController::class, 'importFee'])->name('fee_import.importFee');
    Route::get('/fee/import/history', [FeeImportController::class, 'importHistory'])->name('fee_import.importHistory');
    Route::get('/fee/import/previousdue', [FeeImportController::class, 'previousDue'])->name('fee_import.previousDue');
    Route::post('/fee/import/previousdue/store', [FeeImportController::class, 'storePreviousDue'])->name('fee_import.previous_due_store');
    Route::get('/fee/import/previousduetemplate/download', [FeeImportController::class, 'downloadPreviousDueFeeTemplate'])->name('fee_import.previous_due_template.download');

    // Fee Refund
    Route::match(['GET', 'POST'], '/fee/refund', [FeeRefundController::class, 'refundFee'])->name('fee_refund');
    Route::get('/fee/refund/report', [FeeRefundController::class, 'refundReport'])->name('fee_refund.report');
    Route::patch('/fee/refund/cancel-report/update/{feePaymentRefundMethod}', [FeeRefundController::class, 'cancelFeePaymentRefund'])->name('fee_refund.update');
    Route::get('/fee/refund/cancel-report', [FeeRefundController::class, 'refundCancelReport'])->name('fee_refund.cancel_report');

    Route::match(['GET', 'POST'], '/fee/refund/adjust', [FeeRefundController::class, 'adjustFee'])->name('fee_refund.adjust_fee');
    Route::post('/fee/refund/adjust/save', [FeeRefundController::class, 'saveAdjustFee'])->name('fee_refund.adjust_fee.save');
    Route::get('/fee/refund/adjust-report', [FeeRefundController::class, 'adjsutFeeReport'])->name('fee_refund.adjust_fee_report');
    Route::delete('/fee/refund/adjust-report/delete/{adjustFeePayment}', [FeeRefundController::class, 'deleteAdjsutFee'])->name('fee_refund.adjust_fee_report.destroy');

    Route::match(['GET', 'POST'], '/fee/refund/nullify', [FeeRefundController::class, 'feeNullify'])->name('fee_refund.fee_nullify');
    Route::post('/fee/refund/nullify/save', [FeeRefundController::class, 'saveFeeNullify'])->name('fee_refund.fee_nullify.save');
    Route::get('/fee/refund/nullify-report', [FeeRefundController::class, 'feeNullifyReport'])->name('fee_refund.previousDue');
    Route::post('/fee/refund/save', [FeeRefundController::class, 'save'])->name('fee_refund.save');

    // Discount
    Route::get('/fee/discount', [FeeDiscountController::class, 'discount'])->name('fee_discount.discount');
    Route::post('/fee/discount/save', [FeeDiscountController::class, 'save'])->name('fee_discount.save');
    Route::get('/fee/discount/edit/{discount}', [FeeDiscountController::class, 'edit'])->name('fee_discount.edit');
    Route::put('/fee/discount/update/{discount}', [FeeDiscountController::class, 'update'])->name('fee_discount.update');
    Route::delete('/fee/discount/delete/{discount}', [FeeDiscountController::class, 'destroy'])->name('fee_discount.destroy');

    Route::match(['GET', 'POST'], '/fee/discount/student', [FeeDiscountController::class, 'studentDiscount'])->name('fee_discount.student');
    Route::post('/fee/discount/student/save', [FeeDiscountController::class, 'saveStudentDiscount'])->name('fee_discount.student.save');

    Route::match(['GET', 'POST'], '/fee/discount/bulk', [FeeDiscountController::class, 'bulkDiscount'])->name('fee_discount.bulk');
    Route::post('/fee/discount/bulk/save', [FeeDiscountController::class, 'saveBulkDiscount'])->name('fee_discount.bulk.save');

    Route::put('/fee/discount/student/update', [FeeDiscountController::class, 'updateStudentFeeDiscount'])->name('fee_discount.student.update');
    Route::delete('/fee/discount/{discountId}/student/{studentId}/delete', [FeeDiscountController::class, 'deleteStudentFeeDiscount'])->name('fee_discount.delete_student_fee_discount');
    Route::delete('/fee/discount/{discountId}/student/{studentId}/fee/{feeId}/delete', [FeeDiscountController::class, 'deleteFeeDiscount'])->name('fee_discount.delete_fee_discount');

    Route::match(['GET', 'POST'], '/fee/discount/report', [FeeDiscountController::class, 'discountFeeReport'])->name('fee_discount.report');

    Route::match(['GET', 'POST'], '/fee/discount/paid-report', [FeeDiscountController::class, 'discountFeePaidReport'])->name('fee_discount.paid_report');

    Route::match(['GET', 'POST'], '/fee/discount/expected-report', [FeeDiscountController::class, 'discountFeeExpectedReport'])->name('fee_discount.expected_report');

    // Fee Report
    Route::get('/fee/report/dashboard', [FeeReportController::class, 'dashboard'])->name('fee_report.dashboard');
    // Collection Fee report
    Route::match(['GET', 'POST'], '/fee/report/dailycollection', [FeeReportController::class, 'dailyCollection'])->name('fee_report.daily_collection');

    Route::match(['GET', 'POST'], '/fee/report/head-wise-daily-collection', [FeeReportController::class, 'headWiseDailyCollection'])->name('fee_report.head_wise_daily_collection');
    Route::get('/fee/report/installment-wise-daily-collection', [FeeReportController::class, 'installmentWiseDailyCollection'])->name('fee_report.installment_wise_daily_collection');
    Route::match(['GET', 'POST'], '/fee/report/head-wise-daily-summary', [FeeReportController::class, 'headWiseDailySummary'])->name('fee_report.head_wise_daily_summary');
    Route::match(['GET', 'POST'], '/fee/report/yearly-head-wise-paid-summary', [FeeReportController::class, 'yearlyHeadWisePaidSummary'])->name('fee_report.yearly_head_wise_paid_summary');
    Route::match(['GET', 'POST'], '/fee/report/date-wise-class-summary', [FeeReportController::class, 'dateWiseClassSummary'])->name('fee_report.date_wise_class_summary');
    Route::match(['GET', 'POST'], '/fee/report/complete-paid-report', [FeeReportController::class, 'completePaidReport'])->name('fee_report.complete_paid_report');
    Route::get('/fee/report/online-fee-transaction', [FeeReportController::class, 'onlineFeeTransaction'])->name('fee_report.online_fee_transaction');
    // Dues Fee report
    Route::match(['GET', 'POST'], '/fee/report/yearly-head-wise-dues-summary', [FeeReportController::class, 'yearlyHeadWiseDuesSummary'])->name('fee_report.yearly_head_wise_dues_summary');

    Route::match(['GET', 'POST'], '/fee/report/outstanding-due-summary', [FeeReportController::class, 'outstandingDueSummary'])->name('fee_report.outstanding_due_summary');

    Route::match(['GET', 'POST'], '/fee/report/complete-outstanding-dues', [FeeReportController::class, 'completeOutstandingDues'])->name('fee_report.complete_outstanding_dues');

    Route::post('/fee/report/student-due-followup/save', [FeeReportController::class, 'saveStudentDueFollowUp'])->name('fee_report.save_student_due_followup');
    Route::put('/fee/report/student-due-followup/update/{id}', [FeeReportController::class, 'updateStudentDueFollowUp'])->name('fee_report.update_student_due_followup');

    Route::match(['GET', 'POST'], '/fee/report/consolidated-dues-report', [FeeReportController::class, 'consolidatedDuesReport'])->name('fee_report.consolidated_dues_report');
    Route::match(['GET', 'POST'], '/fee/report/fee-student-followup', [FeeReportController::class, 'feeStudentFollowUp'])->name('fee_report.fee_student_followup');
    // Student Fee report
    Route::match(['GET', 'POST'], '/fee/report/student-payments', [FeeReportController::class, 'studentPayments'])->name('fee_report.student_payments');
    Route::get('/fee/report/student-hostel-report', [FeeReportController::class, 'studentHostelReport'])->name('fee_report.student_hostel_report');
    Route::match(['GET', 'POST'], '/fee/report/student-head-wise-fee-report', [FeeReportController::class, 'studentHeadWiseFeeReport'])->name('fee_report.student_head_wise_fee_report');
    Route::get('/fee/report/group-wise-student', [FeeReportController::class, 'groupWiseStudent'])->name('fee_report.group_wise_student');
    Route::get('/fee/report/student-fee-type-wise-paid-report', [FeeReportController::class, 'studentFeeTypeWisePaidReport'])->name('fee_report.student_fee_type_wise_paid_report');
    Route::match(['GET', 'POST'], '/fee/report/student-ledger-report', [FeeReportController::class, 'studentLedgerReport'])->name('fee_report.student_ledger_report');
    Route::match(['GET', 'POST'], '/fee/report/fee-agreement', [FeeReportController::class, 'feeAgreement'])->name('fee_report.fee_agreement');
    Route::get('/fee/report/student-wallet-report', [FeeReportController::class, 'studentWalletReport'])->name('fee_report.student_wallet_report');
    // General Fee report
    Route::get('/fee/report/class-wise-summary', [FeeReportController::class, 'classWiseSummary'])->name('fee_report.class_wise_summary');
    Route::match(['GET', 'POST'], '/fee/report/fee-cancellation-report', [FeeReportController::class, 'feeCancellationReport'])->name('fee_report.fee_cancellation_report');
    Route::match(['GET', 'POST'], '/fee/report/summary-report', [FeeReportController::class, 'summaryReport'])->name('fee_report.summary_report');
    Route::get('/fee/report/daily-online-fee-payment', [FeeReportController::class, 'dailyOnlineFeePayment'])->name('fee_report.daily_online_fee_payment');
    Route::match(['GET', 'POST'], '/fee/report/special-fee-type-report', [FeeReportController::class, 'specialFeeTypeReport'])->name('fee_report.special_fee_type_report');
    Route::match(['GET', 'POST'], '/fee/report/guardian-wise-due-report', [FeeReportController::class, 'guardianWiseDueReport'])->name('fee_report.guardian_wise_due_report');

    // Teacher panel student fee report
    Route::match(['GET', 'POST'], '/teacher/fee/student-due-report', [FeeReportController::class, 'studentDueReport'])->name('fee_report.teacher.student_due_report');
    Route::match(['GET', 'POST'], '/teacher/fee/student-daily-collection-report', [FeeReportController::class, 'studentDailyCollectionReport'])->name('fee_report.teacher.student_daily_collection_report');
    Route::match(['GET', 'POST'], '/teacher/fee/student-complete-paid-report', [FeeReportController::class, 'studentCompletePaidReport'])->name('fee_report.teacher.student_complete_paid_report');


    // Financial
    Route::get('/financial', [FinancialController::class, 'index'])->name('financial.list');

    // holiday
    Route::get('/holidays', [HolidayController::class, 'index'])->name('holiday.list');
    Route::post('/holiday/save', [HolidayController::class, 'save'])->name('holiday.save');
    Route::patch('/holiday/update/{id}', [HolidayController::class, 'update'])->name('holiday.update');
    Route::delete('/holiday/delete/{id}', [HolidayController::class, 'destroy'])->name('holiday.destroy');

    // holiday policy
    Route::get('/holiday-policies', [HolidayPolicyController::class, 'index'])->name('holiday_policy.list');
    Route::post('/holiday-policy/save', [HolidayPolicyController::class, 'save'])->name('holiday_policy.save');
    Route::patch('/holiday-policy/update/{id}', [HolidayPolicyController::class, 'update'])->name('holiday_policy.update');
    Route::delete('/holiday-policy/delete/{id}', [HolidayPolicyController::class, 'destroy'])->name('holiday_policy.destroy');

    // hostel
    Route::match(['GET', 'POST'], '/hostel/setup', [HostelController::class, 'setupHostel'])->name('hostel.setup_hostel');
    Route::delete('/hostel/infra/level/delete/{id}', [HostelController::class, 'infraLabelDestroy'])->name('hostel_infra_level.destroy');
    Route::get('/hostel/allocation', [HostelController::class, 'allocationFunc'])->name('hostel.allocation');
    Route::post('/hostel/allocation/save', [HostelController::class, 'allocationSave'])->name('hostel.allocation_save');
    Route::match(['GET', 'POST'], '/hostel/deallocation', [HostelController::class, 'deallocation'])->name('hostel.deallocation');
    Route::post('/hostel/deallocation/save', [HostelController::class, 'deallocationSave'])->name('hostel.deallocation_save');
    Route::get('/hostel/assign-fee', [HostelController::class, 'assignHostelFee'])->name('hostel.assign_fee');
    Route::post('/hostel/assign-fee/save', [HostelController::class, 'assignHostelFeeSave'])->name('hostel.assign_fee_save');
    // hostel gate pass
    Route::get('/hostel/gate-pass', [HostelController::class, 'hostelGatePass'])->name('hostel.gate_pass');
    Route::post('/hostel/gate-pass/save', [HostelController::class, 'hostelGatePassSave'])->name('hostel.gate_pass_save');
    Route::match(['GET', 'POST'], '/hostel/gate-pass-class-wise', [HostelController::class, 'gatePassClassWise'])->name('hostel.gate_pass_class_wise');

    // hostel vouchers
    Route::get('/hostel/voucher', [HostelController::class, 'hostelVoucher'])->name('hostel.voucher');
    Route::post('/hostel/voucher/save', [HostelController::class, 'hostelVoucherSave'])->name('hostel.voucher_save');
    Route::delete('/hostel/voucher/delete/{id}', [HostelController::class, 'hostelVoucherDestroy'])->name('hostel.voucher_destroy');

    // hostel fee
    Route::get('/hostel/fee-group', [HostelController::class, 'hostelFeeGroup'])->name('hostel.fee_group');
    Route::post('/hostel/fee-group/save', [HostelController::class, 'hostelFeeGroupSave'])->name('hostel.fee_group_save');
    Route::match(['GET', 'POST'], '/hostel/fee-group/edit', [HostelController::class, 'hostelFeeGroupEdit'])->name('hostel.fee_group_edit');
    Route::put('/hostel/fee-group/update/{id}', [HostelController::class, 'hostelFeeGroupUpdate'])->name('hostel.fee_group_update');
    Route::delete('/hostel/fee-group/delete/{id}', [HostelController::class, 'hostelFeeGroupDestroy'])->name('hostel.fee_group_destroy');

    // hostel staff
    Route::post('/hostel/staff/save', [HostelController::class, 'hostelStaffSave'])->name('hostel.staff_save');
    Route::delete('/hostel/staff/delete/{id}', [HostelController::class, 'hostelStaffDestroy'])->name('hostel.staff_destroy');

    // hostel report
    Route::match(['GET', 'POST'], '/hostel/report/class-summary', [HostelReportController::class, 'hostelClassSummaryReport'])->name('hostel_report.class_summary');
    Route::match(['GET', 'POST'], '/hostel/report/allocation', [HostelReportController::class, 'hostelAllocationReport'])->name('hostel_report.allocation');
    Route::match(['GET', 'POST'], '/hostel/report/deallocation', [HostelReportController::class, 'hostelDeallocationReport'])->name('hostel_report.deallocation');
    Route::get('/hostel/report/staff-allocation', [HostelReportController::class, 'hostelStaffAllocationReport'])->name('hostel_report.staff_allocation');

    // hostel room type
    Route::get('/hostel/rooms', [HostelRoomController::class, 'index'])->name('hostel_room.list');
    Route::post('/hostel-room/save', [HostelRoomController::class, 'save'])->name('hostel_room.save');
    Route::delete('/hostel-room/delete/{id}', [HostelRoomController::class, 'destroy'])->name('hostel_room.destroy');

    // Student Hostel
    Route::match(['GET', 'POST'], '/student/hostel', [StudentHostelController::class, 'index'])->name('student_hostel.list');
    Route::get('/student/hostel/request', [StudentHostelController::class, 'createRequest'])->name('student_hostel.create_request');
    Route::post('/student/hostel/request/store', [StudentHostelController::class, 'storeRequest'])->name('student_hostel.store_request');

    // house
    Route::get('/houses', [HouseController::class, 'index'])->name('house.list');
    Route::post('/house/save', [HouseController::class, 'save'])->name('house.save');
    Route::patch('/house/update/{id}', [HouseController::class, 'update'])->name('house.update');
    Route::delete('/house/delete/{id}', [HouseController::class, 'destroy'])->name('house.destroy');

    // job
    Route::get('/jobs', [JobController::class, 'index'])->name('job.list');
    Route::get('/job/create', [JobController::class, 'create'])->name('job.create');
    Route::post('/job/save', [JobController::class, 'save'])->name('job.save');
    Route::get('/job/edit/{id}', [JobController::class, 'edit'])->name('job.edit');
    Route::put('/job/update/{id}', [JobController::class, 'update'])->name('job.update');
    Route::delete('/job/delete/{id}', [JobController::class, 'destroy'])->name('job.destroy');

    // job Applicant
    Route::get('/job/applicants', [JobApplicantController::class, 'index'])->name('Job_applicant.list');
    Route::get('/job/applicant/create', [JobApplicantController::class, 'create'])->name('Job_applicant.create');
    Route::post('/job/applicant/save', [JobApplicantController::class, 'save'])->name('Job_applicant.save');
    Route::get('/job/applicant/edit/{id}', [JobApplicantController::class, 'edit'])->name('Job_applicant.edit');
    Route::put('/job/applicant/update/{id}', [JobApplicantController::class, 'update'])->name('Job_applicant.update');
    Route::delete('/job/applicant/delete/{id}', [JobApplicantController::class, 'destroy'])->name('Job_applicant.destroy');

    // leaves
    Route::get('/leave/type', [LeaveController::class, 'leaveType'])->name('leave.type');
    Route::post('/leave/type/save', [LeaveController::class, 'saveLeaveType'])->name('leave.save_type');
    Route::put('/leave/type/update/{id}', [LeaveController::class, 'updateLeaveType'])->name('leave.update_type');
    Route::delete('/leave/type/delete/{id}', [LeaveController::class, 'deleteLeaveType'])->name('leave.delete_type');
    Route::match(['GET', 'POST'], '/leave/allocation', [LeaveController::class, 'leaveAllocation'])->name('leave.allocation');
    Route::post('/leave/allocation/save', [LeaveController::class, 'saveLeaveAllocation'])->name('leave.save_allocation');
    Route::post('/leave/bulk-allocation/save', [LeaveController::class, 'saveBulkLeaveAllocation'])->name('leave.save_bulk_allocation');
    Route::get('/leave/approvers', [LeaveController::class, 'leaveApprovers'])->name('leave.approvers');
    Route::post('/leave/approvers/save', [LeaveController::class, 'saveLeaveApprovers'])->name('leave.approvers.save');
    Route::delete('/leave/approvers/delete/{id}', [LeaveController::class, 'deleteLeaveApprovers'])->name('leave.approvers.delete');
    Route::match(['GET', 'POST'], '/leave/staff-leave-setting', [LeaveController::class, 'staffLeaveSetting'])->name('leave.staff_leave_setting');
    Route::post('/leave/staff-leave-setting/save', [LeaveController::class, 'saveStaffLeaveSetting'])->name('leave.staff_leave_setting.save');
    Route::match(['GET', 'POST'], '/leave/staff-leave-setting-changes-history', [LeaveController::class, 'staffLeaveSettingChangesHistory'])->name('leave.staff_leave_setting_changes_history');
    Route::get('/leave/setting', [LeaveController::class, 'leaveSetting'])->name('leave.setting');
    Route::post('/leave/setting/save', [LeaveController::class, 'saveLeaveSetting'])->name('leave.setting.save');
    Route::get('/leave/setting-changes-history', [LeaveController::class, 'leaveSettingChangesHistory'])->name('leave.setting_changes_history');
    Route::match(['GET', 'POST'], '/leave/direct', [LeaveController::class, 'directLeave'])->name('leave.direct');
    Route::post('/leave/direct/save', [LeaveController::class, 'saveDirectLeave'])->name('leave.direct.save');
    Route::put('/leave/direct/update/{id}', [LeaveController::class, 'updateDirectLeave'])->name('leave.direct.update');
    Route::get('/leave/request', [LeaveController::class, 'requestLeave'])->name('leave.request');
    Route::post('/leave/request/save', [LeaveController::class, 'saveLeaveRequest'])->name('leave.save_request');
    Route::match(['GET', 'POST'], '/leave/manage-leave-request', [LeaveController::class, 'manageLeaveRequest'])->name('leave.manage_leave_request');
    Route::put('/leave/request/cancel/{id}', [LeaveController::class, 'cancelLeaveRequest'])->name('leave.cancel_request');
    Route::put('/leave/request/approve/{id}', [LeaveController::class, 'approveLeaveRequest'])->name('leave.approve_request');
    Route::get('/leave/adjust', [LeaveController::class, 'adjustLeave'])->name('leave.adjust');

    // leave report
    Route::get('/leave/report/staff-onleave-today', [LeaveReportController::class, 'staffOnLeaveToday'])->name('leave_report.staff_onleave_today');
    Route::get('/leave/report/staff-wise', [LeaveReportController::class, 'staffWiseLeaveReport'])->name('leave_report.staff_wise');
    Route::get('/leave/report/month-wise', [LeaveReportController::class, 'monthWiseLeaveReport'])->name('leave_report.month_wise');
    Route::get('/leave/report/staff-wise-month', [LeaveReportController::class, 'staffWiseMonthLeaveReport'])->name('leave_report.staff_wise_month');
    Route::get('/leave/report/type-wise-month', [LeaveReportController::class, 'leaveTypeWiseMonthLeaveReport'])->name('leave_report.type_wise_month');
    Route::get('/leave/report/staff-wise-summary', [LeaveReportController::class, 'staffWiseLeaveSummary'])->name('leave_report.staff_wise_summary');
    Route::get('/leave/report/staff-wise-attendance', [LeaveReportController::class, 'staffWiseAttendanceReport'])->name('leave_report.staff_wise_attendance');
    Route::get('/leave/report/month-wise-attendance', [LeaveReportController::class, 'monthWiseAttendanceReport'])->name('leave_report.month_wise_attendance');
    Route::get('/leave/report/extra-day', [LeaveReportController::class, 'extraDayReport'])->name('leave_report.extra_day');
    Route::get('/leave/report/outdoor', [LeaveReportController::class, 'outdoorReport'])->name('leave_report.outdoor');
    Route::get('/leave/report/register-view', [LeaveReportController::class, 'registerViewReport'])->name('leave_report.register_view');

    // lesson plan
    Route::match(['GET', 'POST'], '/lesson-plans', [LessonPlanController::class, 'index'])->name('lesson_plan.list');
    Route::match(['GET', 'POST'], '/lesson-plan/create', [LessonPlanController::class, 'create'])->name('lesson_plan.create');
    Route::post('/lesson-plan/save', [LessonPlanController::class, 'save'])->name('lesson_plan.save');
    Route::match(['GET', 'POST'], '/lesson-plan/edit/{id}', [LessonPlanController::class, 'edit'])->name('lesson_plan.edit');
    Route::put('/lesson-plan/update/{id}', [LessonPlanController::class, 'update'])->name('lesson_plan.update');
    Route::delete('/lesson-plan/delete/{id}', [LessonPlanController::class, 'destroy'])->name('lesson_plan.destroy');
    Route::get('/lesson-plan/file/download/{id}', [LessonPlanController::class, 'downloadLessonPlanFile'])->name('lesson_plan.file.download');
    Route::post('/lesson-plan/remarks/save', [LessonPlanController::class, 'saveLessonPlanRemark'])->name('lesson_plan.remarks.save');
    Route::get('/lesson-plan/shared-by-others', [LessonPlanController::class, 'sharedByOtherLessonPlan'])->name('lesson_plan.shared_by_other');
    Route::match(['GET', 'POST'], '/lesson-plan/teacher-wise-report', [LessonPlanController::class, 'teacherWiseLessonPlanReport'])->name('lesson_plan.teacher_wise_report');
    Route::match(['GET', 'POST'], '/lesson-plan/class-wise-report', [LessonPlanController::class, 'classWiseLessonPlanReport'])->name('lesson_plan.class_wise_report');

    // library
    Route::get('/library', [LibraryController::class, 'index'])->name('library.message');
    Route::get('/library/setting', [LibraryController::class, 'setting'])->name('library.setting');

    // library self level
    Route::get('/library/shelf-levels', [LibraryShelfLevelController::class, 'shelfLevel'])->name('library_shelf_level.shelf_level');
    Route::post('/library/shelf-level/save', [LibraryShelfLevelController::class, 'shelfLevelSave'])->name('library_shelf_level.shelf_level_save');


    //Create Library route
    Route::post('/library/shelf-levels/lib-create', [LibraryShelfLevelController::class, 'shelfLevelCreate'])->name('library_shelf_level.shelf_level_create');
    //Edit
    Route::post('/library/shelf-levels/lib-create/{id}', [LibraryShelfLevelController::class, 'shelfLevelEdit'])->name('library_shelf_level.shelf_level_edit');

    // library vendor
    Route::get('/library/vendors', [LibraryVendorController::class, 'index'])->name('library_vendor.list');
    Route::post('/library/vendor/save', [LibraryVendorController::class, 'save'])->name('library_vendor.save');
    Route::delete('/library/vendor/delete/{vendor}', [LibraryVendorController::class, 'destroy'])->name('library_vendor.destroy');

    // Library Book
    Route::match(['GET', 'POST'], '/library/books', [BookController::class, 'index'])->name('book.list');
    Route::match(['GET', 'POST'], '/library/total-books', [BookController::class, 'totalBookList'])->name('book.total_book_list');
    Route::post('/library/total-book/damage-lost/save', [BookController::class, 'damageLostBookSave'])->name('book.damage_lost_book_save');
    Route::post('/library/total-book/damage-lost/save', [BookController::class, 'updateBookAccNoPrice'])->name('book.update_book_acc_no_price');
    Route::get('/library/book/purchase', [BookController::class, 'purchase'])->name('book.purchase');
    Route::post('/library/book/purchase/save', [BookController::class, 'bookPurchaseSave'])->name('book.book_purchase_save');
    Route::match(['GET', 'POST'], '/library/book/purchase-history', [BookController::class, 'purchaseHistory'])->name('book.purchase_history');
    Route::get('/library/book/inhouse', [BookController::class, 'inhouse'])->name('book.inhouse');
    Route::post('/library/book/inhouse/save', [BookController::class, 'inhouseSave'])->name('book.inhouse_save');
    Route::match(['GET', 'POST'], '/library/book/inhouse/edit', [BookController::class, 'inhouseEdit'])->name('book.inhouse_edit');
    Route::get('/library/book/search-by-location', [BookController::class, 'bookSearchByLocation'])->name('book.book_search_by_location');
    Route::get('/library/book/allocate-book-to-location', [BookController::class, 'allocateBookToLocation'])->name('book.allocate_book_to_location');
    Route::match(['GET', 'POST'], '/library/book/inactive', [BookController::class, 'inactive'])->name('book.inactive');
    Route::get('/library/book/import', [BookController::class, 'import'])->name('book.import');

    // book issue/return
    Route::match(['GET', 'POST'], '/library/book/issue', [BookController::class, 'issue'])->name('book.issue');
    Route::post('/library/book/issue/save', [BookController::class, 'bookIssueSave'])->name('book.issue_save');
    Route::match(['GET', 'POST'], '/library/book/return', [BookController::class, 'return'])->name('book.return');
    Route::post('/library/book/return/save', [BookController::class, 'returnSave'])->name('book.return_save');
    Route::get('/library/book/multi-issues', [BookController::class, 'multiIssuesBooks'])->name('book.multi_issues');

    // book type
    Route::post('/library/book/type', [TypeController::class, 'bookTypeCreateUpdate'])->name('book.book_type_create_update');
    Route::delete('/library/book/type/delete/{id}', [TypeController::class, 'bookTypeDestroy'])->name('book.book_type_destroy');

    // book_acc_no status
    Route::post('/library/book/status/update', [BookController::class, 'bookStatusUpdate'])->name('book.book_status_update');

    // Book category
    Route::get('/library/book/category', [BookController::class, 'bookCategory'])->name('book.book_category_list');
    Route::post('/library/book/category/save', [BookController::class, 'bookCategorySave'])->name('book.book_category_list_save');
    Route::delete('/library/book/category/delete/{id}', [BookController::class, 'bookCategoryDestroy'])->name('book.book_category_destroy');

    // Book Report
    Route::match(['GET', 'POST'], '/library/book/report/teacher-issue-book', [BookReportController::class, 'teacherIssuedBookReport'])->name('book_report.teacher_issue_book');
    Route::match(['GET', 'POST'], '/library/book/report/teacher-wise-book', [BookReportController::class, 'teacherWiseBookReport'])->name('book_report.teacher_wise_book');
    Route::match(['GET', 'POST'], '/library/book/report/teacher-transaction-book', [BookReportController::class, 'teacherBookTransactionReport'])->name('book_report.teacher_transaction_book');
    Route::get('/library/book/report/teacher-due-book', [BookReportController::class, 'teacherDueBookReport'])->name('book_report.teacher_due_book');
    Route::match(['GET', 'POST'], '/library/book/report/student-issue-book', [BookReportController::class, 'studentIssuedBookReport'])->name('book_report.student_issue_book');
    Route::match(['GET', 'POST'], '/library/book/report/student-wise-book', [BookReportController::class, 'studentWiseBookReport'])->name('book_report.student_wise_book');
    Route::match(['GET', 'POST'], '/library/book/report/student-transaction-book', [BookReportController::class, 'studentBookTransactionReport'])->name('book_report.student_transaction_book');
    Route::get('/library/book/report/student-due-book', [BookReportController::class, 'studentDueBookReport'])->name('book_report.student_due_book');
    Route::match(['GET', 'POST'], '/library/book/report/student-book-wise', [BookReportController::class, 'studentBookWiseReport'])->name('book_report.student_book_wise');
    Route::get('/library/book/report/student-late-fine', [BookReportController::class, 'studentLateFineReport'])->name('book_report.student_late_fine');

    // Library eBook
    Route::get('/library/ebooks', [EBookController::class, 'index'])->name('ebook.list');
    Route::get('/library/ebook/create', [EBookController::class, 'create'])->name('ebook.create');
    Route::post('/library/ebook/save', [EBookController::class, 'save'])->name('ebook.save');
    Route::delete('/library/ebook/delete/{id}', [EBookController::class, 'destroy'])->name('ebook.destroy');
    Route::post('/library/ebook/download', [EBookController::class, 'documentDownload'])->name('ebook.download');

    // Team & Repport
    Route::get('/team/manage', [TeamController::class, 'teamManage'])->name('team.team_manage');
    Route::get('/team/member/manage', [TeamController::class, 'memberManage'])->name('team.member_manage');
    Route::get('/team/report', [TeamController::class, 'teamReport'])->name('team.team_report');

    // mail setting
    Route::get('/mail-settings', [MailSettingController::class, 'index'])->name('mail_setting.list');
    Route::get('/improve-presence-on-internet', [MailSettingController::class, 'improvePresence'])->name('mail_setting.improve_presence');
    Route::post('/improve-presence-on-internet/save', [MailSettingController::class, 'presenceUpdateCreate'])->name('mail_setting.improve_presence.save');
    Route::post('/send-test-mail', [MailSettingController::class, 'sendTestMail'])->name('mail_setting.send_test_mail');

    // module
    Route::get('/modules', [ModuleController::class, 'index'])->name('module.list');
    Route::post('/module/save', [ModuleController::class, 'save'])->name('module.save');

    // news
    Route::match(['GET', 'POST'], '/news', [NewsController::class, 'index'])->name('news.list');
    Route::get('/news/create', [NewsController::class, 'create'])->name('news.create');
    Route::post('/news/save', [NewsController::class, 'save'])->name('news.save');
    Route::get('/news/edit/{id}', [NewsController::class, 'edit'])->name('news.edit');
    Route::put('/news/update/{id}', [NewsController::class, 'update'])->name('news.update');
    Route::delete('/news/delete/{id}', [NewsController::class, 'destroy'])->name('news.destroy');

    // pages
    Route::get('/pages', [PageController::class, 'index'])->name('page.list');
    Route::get('/page/create', [PageController::class, 'create'])->name('page.create');
    Route::post('/page/save', [PageController::class, 'save'])->name('page.save');
    Route::get('/page/edit/{id}', [PageController::class, 'edit'])->name('page.edit');
    Route::put('/page/update/{id}', [PageController::class, 'update'])->name('page.update');
    Route::delete('/page/delete/{id}', [PageController::class, 'destroy'])->name('page.destroy');

    // notice
    Route::match(['GET', 'POST'], '/notices', [NoticeController::class, 'index'])->name('notice.list');
    Route::get('/notice/create', [NoticeController::class, 'create'])->name('notice.create');
    Route::post('/notice/save', [NoticeController::class, 'save'])->name('notice.save');
    Route::get('/notice/edit/{id}', [NoticeController::class, 'edit'])->name('notice.edit');
    Route::put('/notice/update/{id}', [NoticeController::class, 'update'])->name('notice.update');
    Route::delete('/notice/delete/{id}', [NoticeController::class, 'destroy'])->name('notice.destroy');

    // occupation
    Route::get('/occupations', [OccupationController::class, 'index'])->name('occupation.list');
    Route::post('/occupation/save', [OccupationController::class, 'save'])->name('occupation.save');
    Route::patch('/occupation/update/{id}', [OccupationController::class, 'update'])->name('occupation.update');
    Route::delete('/occupation/delete/{id}', [OccupationController::class, 'destroy'])->name('occupation.destroy');

    // our services
    // buy and subscription
    Route::get('/our-service/unpaid-invoice', [OurServiceController::class, 'unpaidInvoice'])->name('our_service.unpaid_invoice');
    Route::get('/our-service/paid-invoice', [OurServiceController::class, 'paidInvoice'])->name('our_service.paid_invoice');
    Route::get('/our-service/buy-service', [OurServiceController::class, 'buyService'])->name('our_service.buy_service');
    Route::match(['get', 'post'], '/our-service/buy-sms', [OurServiceController::class, 'buySms'])->name('our_service.buy_sms');
    Route::get('/our-service/my-subscription', [OurServiceController::class, 'mySubscription'])->name('our_service.my_subscription');
    Route::get('/our-service/buy-biometric', [OurServiceController::class, 'buyBiometric'])->name('our_service.buy_biometric');

    // permissions
    Route::match(['GET', 'POST'], '/permissions', [PermissionController::class, 'index'])->name('permission.list');
    Route::get('/permission/create', [PermissionController::class, 'create'])->name('permission.create');
    Route::post('/permission/save', [PermissionController::class, 'save'])->name('permission.save');

    // religion
    Route::get('/religions', [ReligionController::class, 'index'])->name('religion.list');
    Route::get('/religion/create', [ReligionController::class, 'create'])->name('religion.create');
    Route::post('/religion/save', [ReligionController::class, 'save'])->name('religion.save');
    Route::get('/religion/edit/{religion}', [ReligionController::class, 'edit'])->name('religion.edit');
    Route::patch('/religion/update/{id}', [ReligionController::class, 'update'])->name('religion.update');
    Route::delete('/religion/delete/{id}', [ReligionController::class, 'destroy'])->name('religion.destroy');

    // salary
    Route::get('/salary/paymentmonth', [SalaryController::class, 'paymentMonth'])->name('salary.payment_month');
    Route::post('/salary/paymentmonth/save', [SalaryController::class, 'savePaymentMonth'])->name('salary.payment_month.save');
    Route::put('/salary/paymentmonth/update/{id}', [SalaryController::class, 'updatePaymentMonth'])->name('salary.payment_month.update');
    Route::delete('/salary/paymentmonth/delete/{id}', [SalaryController::class, 'deletePaymentMonth'])->name('salary.payment_month.delete');
    Route::get('/salary/earning', [SalaryController::class, 'earning'])->name('salary.earning');
    Route::post('/salary/earning/save', [SalaryController::class, 'saveEarningType'])->name('salary.earning.save');
    Route::put('/salary/earning/update/{id}', [SalaryController::class, 'updateEarningType'])->name('salary.earning.update');
    Route::delete('/salary/earning/delete/{id}', [SalaryController::class, 'deleteEarningType'])->name('salary.earning.delete');
    Route::get('/salary/deduction', [SalaryController::class, 'deduction'])->name('salary.deduction');
    Route::post('/salary/deduction/save', [SalaryController::class, 'saveDeductionType'])->name('salary.deduction.save');
    Route::put('/salary/deduction/update/{id}', [SalaryController::class, 'updateDeductionType'])->name('salary.deduction.update');
    Route::delete('/salary/deduction/delete/{id}', [SalaryController::class, 'deleteDeductionType'])->name('salary.deduction.delete');
    Route::get('/salary/payscale', [SalaryController::class, 'payScale'])->name('salary.pay_scale');
    Route::post('/salary/payscale/save', [SalaryController::class, 'savePayScale'])->name('salary.pay_scale.save');
    Route::put('/salary/payscale/update/{id}', [SalaryController::class, 'updatePayScale'])->name('salary.pay_scale.update');
    Route::delete('/salary/payscale/delete/{id}', [SalaryController::class, 'deletePayScale'])->name('salary.pay_scale.delete');
    Route::match(['GET', 'POST'], '/salary/teacherearning', [SalaryController::class, 'teacherEarning'])->name('salary.teacher_earning');
    Route::post('/salary/teacherearning/save', [SalaryController::class, 'saveTeacherEarning'])->name('salary.teacher_earning.save');
    Route::get('/salary/importstaffearnings', [SalaryController::class, 'importStaffEarnings'])->name('salary.import_staff_earnings');
    Route::match(['GET', 'POST'], '/salary/incrementstaffsalary', [SalaryController::class, 'incrementStaffSalary'])->name('salary.increment_staff_salary');
    Route::post('/salary/incrementstaffsalary/save', [SalaryController::class, 'saveStaffSalaryIncrement'])->name('salary.increment_staff_salary.save');
    Route::patch('/salary/incrementstaffsalary/approve/{id}', [SalaryController::class, 'approveStaffSalaryIncrement'])->name('salary.increment_staff_salary.approve');
    Route::patch('/salary/incrementstaffsalary/cancel/{id}', [SalaryController::class, 'cancelStaffSalaryIncrement'])->name('salary.increment_staff_salary.cancel');
    Route::get('/salary/setting', [SalaryController::class, 'settingSalary'])->name('salary.setting');
    Route::get('/salary/print-salary-slip', [SalaryController::class, 'printSalarySlip'])->name('salary.print_salary_slip');
    Route::match(['GET', 'POST'], '/salary/advance-payment', [SalaryController::class, 'advancePayment'])->name('salary.advance_payment');
    Route::post('/salary/advance-payment/save', [SalaryController::class, 'saveAdvancePayment'])->name('salary.advance_payment.save');
    Route::patch('/salary/advance-payment/cancel/{id}', [SalaryController::class, 'cancelAdvancePayment'])->name('salary.advance_payment.cancel');

    // create default earning and deduction
    Route::get('/salary/create-default-earning-deduction', [SalaryController::class, 'createDefaultEarningAndDeduction'])->name('salary.create_default_earning_deduction');

    //process salary
    Route::match(['GET', 'POST'], '/salary/process', [SalaryController::class, 'processSalary'])->name('salary.process');
    Route::post('/salary/process/save', [SalaryController::class, 'saveProcessSalary'])->name('salary.process.save');
    Route::patch('/salary/payment/cancel/{id}', [SalaryController::class, 'cancelSalaryPayment'])->name('salary.cancel_payment');
    Route::match(['GET', 'POST'], '/salary/bulkprocess', [SalaryController::class, 'bulkProcessSalary'])->name('salary.bulk_process_salary');
    Route::post('/salary/bulkprocess/save', [SalaryController::class, 'saveBulkProcessSalary'])->name('salary.bulk_process_salary.save');
    Route::match(['GET', 'POST'], '/salary/publish', [SalaryController::class, 'publishSalary'])->name('salary.publish');
    Route::post('/salary/publish/save', [SalaryController::class, 'savePublishSalary'])->name('salary.publish.save');

    // Salary report
    Route::match(['GET', 'POST'], '/salary/report/bankstatement', [SalaryReportController::class, 'bankStatement'])->name('salary_report.bankstatement');
    Route::match(['GET', 'POST'], '/salary/report/yearlystatement', [SalaryReportController::class, 'yearlyStatement'])->name('salary_report.yearlystatement');
    Route::match(['GET', 'POST'], '/salary/report/cancelledreport', [SalaryReportController::class, 'cancelledReport'])->name('salary_report.cancelledreport');
    Route::match(['GET', 'POST'], '/salary/report/epf', [SalaryReportController::class, 'epfReport'])->name('salary_report.epf');
    Route::match(['GET', 'POST'], '/salary/report/epf-wage', [SalaryReportController::class, 'epfWageReport'])->name('salary_report.epf_wage');
    Route::match(['GET', 'POST'], '/salary/report/esi', [SalaryReportController::class, 'esiReport'])->name('salary_report.esi');
    Route::match(['GET', 'POST'], '/salary/report/advance-payment', [SalaryReportController::class, 'advancePaymentReport'])->name('salary_report.advance_payment');
    Route::get('/salary/report/basic-salary', [SalaryReportController::class, 'basicSalaryReport'])->name('salary_report.basic_salary');
    Route::match(['GET', 'POST'], '/salary/report/payment', [SalaryReportController::class, 'paymentReport'])->name('salary_report.payment');


    // school
    Route::get('/schools', [SchoolController::class, 'index'])->name('school.list');
    Route::get('/setup-your-school', [SchoolController::class, 'setupSchool'])->name('school.setupSchool');
    Route::get('/school/create', [SchoolController::class, 'create'])->name('school.create');
    Route::post('/school/save', [SchoolController::class, 'save'])->name('school.save');
    Route::post('/school/update-post', [SchoolController::class, 'updatePost'])->name('school.update_post');
    Route::match(['GET', 'POST'], '/school/edit', [SchoolController::class, 'edit'])->name('school.edit');
    Route::put('/school/update/{id}', [SchoolController::class, 'update'])->name('school.update');
    Route::put('/school/mark-as-inactive/{id}', [SchoolController::class, 'markAsInactive'])->name('school.mark_as_inactive');
    Route::delete('/school/delete/{id}', [SchoolController::class, 'destroy'])->name('school.destroy');
    Route::get('/school/create-domain', [SchoolController::class, 'createDomain'])->name('school.create_domain');

    Route::get('/school/setting', [SchoolController::class, 'setting'])->name('school.setting');
    Route::post('/school/update-setting', [SchoolController::class, 'updateSetting'])->name('school.update_setting');

    // domain
    Route::get('/domains', [DomainController::class, 'index'])->name('domain.list');
    Route::get('/domain/create', [SchoolController::class, 'create'])->name('domain.create');
    Route::get('/domain/create-domain', [SchoolController::class, 'createDomain'])->name('domain.create_domain');


    // school period
    Route::match(['GET', 'POST'], '/school-period/create', [SchoolPeriodController::class, 'create'])->name('school_period.create');
    Route::post('/school-period/save', [SchoolPeriodController::class, 'save'])->name('school_period.save');
    Route::put('/school-period/update/{id}', [SchoolPeriodController::class, 'update'])->name('school_period.update');
    Route::delete('/school-period/delete/{id}', [SchoolPeriodController::class, 'destroy'])->name('school_period.delete');
    Route::get('/school-period/assign-teacher-subject', [SchoolPeriodController::class, 'assignTeacherSubject'])->name('school_period.assign_teacher_subject');

    // classroom period
    Route::match(['GET', 'POST'], '/class-period/create', [ClassroomPeriodController::class, 'create'])->name('classroom_period.create');
    Route::post('/class-period/save', [ClassroomPeriodController::class, 'save'])->name('classroom_period.save');
    Route::delete('/class-period/delete/{id}', [ClassroomPeriodController::class, 'destroy'])->name('classroom_period.delete');
    Route::post('/class-period/copy', [ClassroomPeriodController::class, 'copyClassroomPeriod'])->name('classroom_period.copy');
    Route::post('/class-period/reset', [ClassroomPeriodController::class, 'copyAndResetClassroomPeriod'])->name('classroom_period.copy_reset');


    // school shift
    Route::get('/school-shifts', [SchoolShiftController::class, 'index'])->name('school_shift.list');
    Route::get('/school-shift/create', [SchoolShiftController::class, 'create'])->name('school_shift.create');
    Route::post('/school-shift/save', [SchoolShiftController::class, 'save'])->name('school_shift.save');
    Route::get('/school-shift/edit/{id}', [SchoolShiftController::class, 'edit'])->name('school_shift.edit');
    Route::patch('/school-shift/update/{id}', [SchoolShiftController::class, 'update'])->name('school_shift.update');
    Route::delete('/school-shift/delete/{id}', [SchoolShiftController::class, 'destroy'])->name('school_shift.destroy');

    // sms setting
    Route::get('/sms-settings', [SmsSettingController::class, 'setting'])->name('sms_setting.setting');
    Route::get('/sms-setting/messages', [SmsSettingController::class, 'index'])->name('sms_setting.list');
    Route::get('/sms-setting/create', [SmsSettingController::class, 'create'])->name('sms_setting.create');
    Route::post('/sms-setting/save', [SmsSettingController::class, 'save'])->name('sms_setting.save');
    Route::get('/sms-setting/edit/{id}', [SmsSettingController::class, 'edit'])->name('sms_setting.edit');
    Route::patch('/sms-setting/update/{id}', [SmsSettingController::class, 'update'])->name('sms_setting.update');
    Route::delete('/sms-setting/delete/{id}', [SmsSettingController::class, 'destroy'])->name('sms_setting.destroy');
    Route::get('/sms-setting/templates', [SmsSettingController::class, 'createTemplate'])->name('sms_setting.create_template');
    Route::post('/sms-setting/save-template', [SmsSettingController::class, 'saveTemplate'])->name('sms_setting.save_template');
    Route::get('/sms-setting/template/edit/{id}', [SmsSettingController::class, 'editTemplate'])->name('sms_setting.edit_template');
    Route::put('/sms-setting/template/update/{id}', [SmsSettingController::class, 'updateTemplate'])->name('sms_setting.update_template');
    Route::delete('/sms-setting/template/delete/{id}', [SmsSettingController::class, 'destroyTemplate'])->name('sms_setting.delete_template');

    // sms delivery and new
    Route::get('/sms', [SmsController::class, 'index'])->name('sms.list');
    Route::get('/sms/sent', [SmsController::class, 'smsSendList'])->name('sms.sent');
    Route::get('/sms/circular', [SmsController::class, 'smsCircular'])->name('sms.circular');
    Route::post('/sms/circular/save', [SmsController::class, 'saveSmsCircular'])->name('sms.circular.save');
    Route::put('/sms/circular/update/{id}', [SmsController::class, 'updateSmsCircular'])->name('sms.circular.update');
    Route::delete('/sms/circular/delete/{id}', [SmsController::class, 'deleteSmsCircular'])->name('sms.circular.delete');
    Route::get('/sms/new', [SmsController::class, 'create'])->name('sms.create');
    Route::post('/sms/save', [SmsController::class, 'save'])->name('sms.save');
    Route::get('/sms/edit/{smsSetting}', [SmsController::class, 'edit'])->name('sms.edit');
    Route::patch('/sms/update/{smsSetting}', [SmsController::class, 'update'])->name('sms.update');
    Route::delete('/sms/delete/{smsSetting}', [SmsController::class, 'destroy'])->name('sms.destroy');
    Route::get('/sms/credits', [SmsController::class, 'smsCredits'])->name('sms.credit');
    Route::match(['GET', 'POST'], '/sms/sms-erp-credential', [SmsController::class, 'smsErpCredential'])->name('sms.sms_erp_credential');
    Route::get('/sms/sms-app-credential', [SmsController::class, 'smsAppCredential'])->name('sms.sms_app_credential');
    Route::get('/sms/sms-delivery-summary', [SmsController::class, 'smsDeliverySummary'])->name('sms.sms_delivery_summary');
    Route::match(['GET', 'POST'], '/sms/circular-generate', [SmsController::class, 'smsCircularGenerate'])->name('sms.sms_circular_generate');

    // sms pdf
    Route::get('/sms/preview-circular', [PdfSmsController::class, 'previewSmsCircular'])->name('sms_pdf.preview_circular');
    Route::get('/sms/download-circular', [PdfSmsController::class, 'downloadSmsCircular'])->name('sms_pdf.download_circular');

    // send sms
    Route::post('/send-fee-due-sms', [SendSmsController::class, 'sendFeeDueSms'])->name('send_sms.fee_due');
    Route::post('/send-bulk-fee-due-sms', [SendSmsController::class, 'sendBulkFeeDueSms'])->name('send_sms.bulk_fee_due');
    Route::post('/send-erp-credential-sms', [SendSmsController::class, 'sendErpCredentialSms'])->name('send_sms.erp_credential_sms');


    // social share
    Route::get('/social-shares', [SocialShareController::class, 'create'])->name('social_share.create');
    Route::post('/social-share/save', [SocialShareController::class, 'updateOrCreate'])->name('social_share.update_or_create');
    Route::get('/social-share/edit/{smsSetting}', [SocialShareController::class, 'edit'])->name('social_share.edit');
    Route::patch('/social-share/update/{smsSetting}', [SocialShareController::class, 'update'])->name('social_share.update');
    Route::delete('/social-share/delete/{smsSetting}', [SocialShareController::class, 'destroy'])->name('social_share.destroy');

    // staff
    Route::match(['GET', 'POST'], '/staffs', [StaffController::class, 'index'])->name('staff.list');
    Route::get('/staff/mis-report', [StaffController::class, 'misReport'])->name('staff.mis_report');
    Route::match(['get', 'post'], '/staff/inactive', [StaffController::class, 'inactiveStaff'])->name('staff.inactive_list');
    Route::match(['get', 'post'], '/staff/details', [StaffController::class, 'details'])->name('staff.staff_details');
    Route::get('/staff/create', [StaffController::class, 'create'])->name('staff.create');
    Route::post('/staff/save', [StaffController::class, 'save'])->name('staff.save');
    Route::match(['GET', 'POST'], '/staff/edit', [StaffController::class, 'edit'])->name('staff.edit');
    Route::put('/staff/update/{id}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('/staff/delete/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');
    Route::post('/staff/user/update', [StaffController::class, 'updateUser'])->name('staff.update_user');
    Route::post('/staff/password/update/', [StaffController::class, 'updatePassword'])->name('staff.update_password');
    Route::post('/staff/inactive/update/{id}', [StaffController::class, 'staffInactive'])->name('staff.inactive');
    Route::put('/staff/make-active/update/{id}', [StaffController::class, 'staffMakeActive'])->name('staff.make_active');
    Route::post('/staff/update/profile/image', [StaffController::class, 'updateProfileImage'])->name('staff.update_profile_image');
    Route::post('/staff/credentail/send', [StaffController::class, 'sendStaffLoginCredential'])->name('staff.send_login_credential');

    // staff attendance
    Route::match(['GET', 'POST'], '/staff/attendance/take', [StaffAttendanceController::class, 'takeAttendance'])->name('staff_attendance.take_attendance');
    Route::post('/staff/attendance/take/save', [StaffAttendanceController::class, 'takeAttendanceSave'])->name('staff_attendance.take_attendance_save');
    Route::get('/staff/attendance/register-view', [StaffAttendanceController::class, 'registerView'])->name('staff_attendance.register_view');
    Route::get('/staff/attendance/update-biometric-code', [StaffAttendanceController::class, 'updateBiometricCode'])->name('staff_attendance.update_biometric_code');

    // staff attendance report
    Route::get('/staff/attendance/report/day-wise', [StaffAttendanceReportController::class, 'dayWiseStaffAttendanceReport'])->name('staff_attendance_report.day_wise');
    Route::get('/staff/attendance/report/staff-wise', [StaffAttendanceReportController::class, 'staffWiseAttendanceReport'])->name('staff_attendance_report.staff_wise');
    Route::get('/staff/attendance/report/month-wise', [StaffAttendanceReportController::class, 'monthWiseAttendanceReport'])->name('staff_attendance_report.month_wise');
    Route::get('/staff/attendance/report/extra-day', [StaffAttendanceReportController::class, 'extraDayReport'])->name('staff_attendance_report.extra_day');
    Route::get('/staff/attendance/report/outdoor', [StaffAttendanceReportController::class, 'outdoorReport'])->name('staff_attendance_report.outdoor');
    Route::get('/staff/attendance/report/absent', [StaffAttendanceReportController::class, 'staffAbsentReport'])->name('staff_attendance_report.absent');
    Route::get('/staff/attendance/report/monthly-work-duration', [StaffAttendanceReportController::class, 'monthlyWorkDurationReport'])->name('staff_attendance_report.monthly_work_duration');

    // student
    Route::match(['GET', 'POST'], '/students', [StudentController::class, 'index'])->name('student.list');
    Route::get('/student/mis-report', [StudentController::class, 'misReport'])->name('student.mis_report');
    Route::get('/student/pdf/{id}', [StudentController::class, 'studentPdfPrint'])->name('student.print_pdf');

    Route::match(['GET', 'POST'], '/student/makeinactive', [StudentController::class, 'makeInactive'])->name('student.make_inactive');
    Route::post('/student/nullify-fee', [StudentController::class, 'nullifyStudentFee'])->name('student.nullify_fee');
    Route::match(['GET', 'POST'], '/students/inactive', [StudentController::class, 'inactive'])->name('student.inactive_list');
    Route::put('/students/active/update/{id}', [StudentController::class, 'makeActive'])->name('student.make_active');
    // Route::match(['GET', 'POST'], '/student/makeinactive', [StudentController::class, 'makeInactive'])->name('student.make_inactive');
    Route::match(['GET', 'POST'], '/student/search', [StudentController::class, 'search'])->name('student.search');
    Route::match(['GET', 'POST'], '/student/summary', [StudentController::class, 'summary'])->name('student.summary');
    Route::match(['GET', 'POST'], '/student/update-biometric', [StudentController::class, 'updateBiometric'])->name('student.update_biometric');
    Route::post('/student/update-biometric/save', [StudentController::class, 'updateBiometricSave'])->name('student.update_biometric_update');
    Route::get('/student/details/{student}', [StudentController::class, 'details'])->name('student.details');
    Route::match(['GET', 'POST'], '/student/create', [StudentController::class, 'create'])->name('student.create');
    Route::post('/student/save', [StudentController::class, 'save'])->name('student.save');
    Route::post('/student/adn/check', [StudentController::class, 'checkSaveData'])->name('student.adn_check');
    Route::match(['GET', 'POST'], '/student/edit/{id}', [StudentController::class, 'edit'])->name('student.edit');
    Route::post('/student/update/post', [StudentController::class, 'updatePost'])->name('student.update_post');
    Route::delete('/student/delete/{id}', [StudentController::class, 'destroy'])->name('student.destroy');
    Route::match(['GET', 'POST'], '/student/birthday/list', [StudentController::class, 'birthdayList'])->name('student.birthday_list');
    //student birthday notification
    Route::post('/student/birthday/notification', [StudentController::class, 'studentBirthdayNotification'])->name('student.birthday_notification');
    Route::post('/student/birthday/sms', [StudentController::class, 'studentBirthdaySms'])->name('student.birthday_sms');
    //teacher birthday notification
    Route::post('/teacher/birthday/notification', [TeacherController::class, 'teacherBirthdayNotification'])->name('teacher.birthday_notification');
    Route::post('/teacher/birthday/sms', [TeacherController::class, 'teacherBirthdaySms'])->name('teacher.birthday_sms');

    Route::match(['GET', 'POST'], '/student/upgrade', [StudentController::class, 'upgrade'])->name('student.upgrade');
    Route::post('/student/upgrade/save', [StudentController::class, 'upgradeSave'])->name('student_upgrade.save');
    Route::match(['GET', 'POST'], '/student/update-details', [StudentController::class, 'updateDetails'])->name('student.update_details');
    Route::post('/student/update-details/save', [StudentController::class, 'updateDetailsSave'])->name('student.update_details_save');
    Route::put('/student/admno/update/{id}', [StudentController::class, 'updateAdmNo'])->name('student.update_adm_no');
    Route::get('/student/user-password/update/', [StudentController::class, 'updateUserPassword'])->name('student.update_user_password');
    Route::post('/student/user-password/save/', [StudentController::class, 'saveUserPassword'])->name('student.save_user_password');
    Route::post('/student/notes/save', [StudentController::class, 'saveNotes'])->name('student.save_notes');
    Route::put('/student/notes/update-status/{id}', [StudentController::class, 'updateNotesStatus'])->name('student.update_note_status');
    Route::get('/student/bulk-upload-image', [StudentController::class, 'bulkUploadImage'])->name('student.bulk_upload_image');
    Route::put('/student/parent-login/update/{id}', [StudentController::class, 'parentLoginUpdate'])->name('student.parent_login_update');
    Route::match(['GET', 'POST'], '/student/change-status', [StudentController::class, 'changeStatus'])->name('student.change_status');
    Route::post('/student/change-status/update', [StudentController::class, 'updateChangeStatus'])->name('student.update_change_status');
    Route::post('/student/get-student', [StudentController::class, 'getStudentNameIdByClassroomId'])->name('get_student_by_classroom_id');
    Route::post('/student/get-student/sale', [StudentController::class, 'getStudentInfoForSale'])->name('get_student_info_by_id');
    // change class
    Route::get('/student/change-class', [StudentController::class, 'changeClass'])->name('student.change_class');
    Route::put('/student/change-class', [StudentController::class, 'updateChangeClass'])->name('student.change_class_update');
    Route::put('/student/change-class/update', [StudentController::class, 'updateSelectedStudent'])->name('student.selected_student_update');
    // change section
    Route::get('/student/change-section', [StudentController::class, 'changeSection'])->name('student.change_section');
    Route::put('/student/change-section/edit', [StudentController::class, 'updateChangeSection'])->name('student.change_section_update');
    Route::put('/student/change-section/update', [StudentController::class, 'updateSelectedStudentSection'])->name('student.selected_student_section_update');
    // course duration
    Route::get('/student/change-duration', [StudentController::class, 'changeDuration'])->name('student.change_duration');
    Route::post('/student/change-duration/update', [StudentController::class, 'changeDurationUpdate'])->name('student.change_duration_update');
    // sibling
    Route::post('/student/check-sibling', [StudentController::class, 'checkSibling'])->name('student.sibling_check');

    Route::post('/get-students-by-classroom-id', [StudentController::class, 'getStudentsByClassroomId'])->name('student.get_students_by_classroom_id');

    // Student Siblings
    Route::match(['GET', 'POST'], '/student/sibling/possible', [StudentSiblingController::class, 'possibleSiblings'])->name('student_sibling.possible');
    Route::get('/student/sibling/existing', [StudentSiblingController::class, 'existingSiblings'])->name('student_sibling.existing');

    // Student  TC
    Route::match(['GET', 'POST'], '/student/certificate/generate-tc', [StudentCertificateController::class, 'generateTc'])->name('student_certificate.generate_tc');
    Route::post('/student/certificate/generate-tc/save', [StudentCertificateController::class, 'generateTcSave'])->name('student_certificate_generate_tc_save');
    Route::post('/student/certificate/generate-draft-tc/save', [StudentCertificateController::class, 'generateDraftTcSave'])->name('student_certificate_generate_tc_draft_save');
    Route::post('/student/certificate/generate-bulk-tc/save', [StudentCertificateController::class, 'generateBulkTcSave'])->name('bulk_student_certificate_generate_tc_save');
    Route::post('/student/certificate/generate-bulk-draft-tc/save', [StudentCertificateController::class, 'generateBulkDraftTcSave'])->name('bulk_student_certificate_generate_tc_draft_save');
    Route::match(['GET', 'POST'], '/student/certificate/tc-summary-report', [StudentCertificateController::class, 'tcSummaryReport'])->name('student_certificate.tc_summary_report');
    Route::match(['GET', 'POST'], '/student/certificate/generated-tc-report', [StudentCertificateController::class, 'generatedTCReport'])->name('student_certificate.generated_tc_report');
    Route::post('/student/certificate/nullify-fee', [StudentCertificateController::class, 'nullifyStudentFeeInstallment'])->name('student_certificate.nullify_fee');

    // Student Certificate
    Route::get('/student/certificate', [StudentCertificateController::class, 'studentCertificate'])->name('student_certificate.student_certificate');
    Route::post('/student/bonafide/certificate/save', [StudentCertificateController::class, 'studentBonafideCertificateSave'])->name('student_bonafide_certificate_save');
    Route::post('/student/character/certificate/save', [StudentCertificateController::class, 'studentCharacterCertificateSave'])->name('student_character_certificate_save');
    Route::get('/student/certificate/teacher', [StudentCertificateController::class, 'teacherCertificate'])->name('student_certificate.teacher_certificate');
    Route::match(['GET', 'POST'], '/student/certificate/list', [StudentCertificateController::class, 'certificateList'])->name('student_certificate.certificate_list');
    Route::match(['GET', 'POST'], '/student/certificate/generated-certificate', [StudentCertificateController::class, 'generatedCertificate'])->name('student_certificate.generated_certificate');
    Route::match(['GET', 'POST'], '/student/certificate/custom-idcard', [StudentCertificateController::class, 'customIdCard'])->name('student_certificate.custom_id_card');
    Route::post('/student/certificate/custom-idcard/save', [StudentCertificateController::class, 'customIdCardSave'])->name('student_certificate.custom_id_card.save');
    Route::put('/student/certificate/custom-idcard/update/{id}', [StudentCertificateController::class, 'customIdCardUpdate'])->name('student_certificate.custom_id_card.update');
    Route::post('/student/certificate/custom-idcard/upload-background-image/save', [StudentCertificateController::class, 'uploadCustomIdCardBackgroundImage'])->name('student_certificate.custom_id_card.upload_background_image.save');
    Route::delete('/student/certificate/custom-idcard/{id}/image/delete/{name}', [StudentCertificateController::class, 'deleteCustomIdCardCertificateImage'])->name('student_certificate.custom_id_card.delete_background_image');

    // Teacher Certificate
    Route::post('/teacher/certificate/save', [StaffCertificateController::class, 'staffCertificateSave'])->name('staff_certificate_save');

    // Student report
    Route::match(['GET', 'POST'], '/student/report/custom-download', [StudentReportController::class, 'customDownload'])->name('student_report.custom_download');
    Route::get('/student/report/predefined-download', [StudentReportController::class, 'predefinedDownload'])->name('student_report.predefined_download');
    Route::match(['GET', 'POST'], '/student/report/parentincome', [StudentReportController::class, 'parentIncome'])->name('student_report.parent_income');
    Route::get('/student/report/parentmonthlyincome', [StudentReportController::class, 'parentMonthlyIncome'])->name('student_report.parent_monthly_income');
    Route::match(['GET', 'POST'], '/student/report/ewsreport', [StudentReportController::class, 'ewsReport'])->name('student_report.ewsreport');
    Route::match(['GET', 'POST'], '/student/report/studentagereport', [StudentReportController::class, 'studentAgeReport'])->name('student_report.student_age_report');
    Route::match(['GET', 'POST'], '/student/report/studentdocumentreport', [StudentReportController::class, 'studentDocumentReport'])->name('student_report.student_document_report');
    Route::match(['GET', 'POST'], '/student/report/monthlyadmission', [StudentReportController::class, 'monthlyAdmission'])->name('student_report.monthly_admission');
    Route::match(['GET', 'POST'], '/student/report/studentpromotedreport', [StudentReportController::class, 'studentPromotedReport'])->name('student_report.student_promoted_report');

    // student subject
    Route::match(['GET', 'POST'], '/student-subjects', [StudentSubjectController::class, 'index'])->name('student_subject.list');
    Route::get('/student-subject/create', [StudentSubjectController::class, 'create'])->name('student_subject.create');
    Route::post('/student-subject/save', [StudentSubjectController::class, 'save'])->name('student_subject.save');
    Route::post('/multiple-student-subject/save', [StudentSubjectController::class, 'multipleSave'])->name('multiple_student_subject.save');
    Route::get('/student-subject/edit/{ssubject}', [StudentSubjectController::class, 'edit'])->name('student_subject.edit');
    Route::patch('/student-subject/update/{ssubject}', [StudentSubjectController::class, 'update'])->name('student_subject.update');
    Route::delete('/student-subject/delete/{ssubject}', [StudentSubjectController::class, 'destroy'])->name('student_subject.destroy');

    // student issue book
    Route::match(['GET', 'POST'], '/student-issue-books', [StudentIssueBookController::class, 'index'])->name('student_issue_book.list');

    // common route for action
    Route::match(['GET', 'POST'], '/get-students-by-classroom-id', [StudentController::class, 'getStudentByClassroomId'])->name('get_student_by_classroom_id');

    // support ticket
    Route::match(['GET', 'POST'], '/support/ticket/list', [SupportTicketController::class, 'index'])->name('support_ticket.list');
    Route::get('/support/ticket/staff-support', [SupportTicketController::class, 'staffSupportPage'])->name('support_ticket.staff_support');
    Route::match(['GET', 'POST'], '/support/ticket/staff-attendance', [SupportTicketController::class, 'staffAttendancePage'])->name('support_ticket.staff_attendance');
    // Route::get('/support/ticket/student-parents-support', [SupportTicketController::class, 'studentParentsSupportPage'])->name('support_ticket.student_parents_support');
    Route::match(['GET', 'POST'], '/support/ticket/create', [SupportTicketController::class, 'create'])->name('support_ticket.create');
    Route::post('/support/ticket/save', [SupportTicketController::class, 'save'])->name('support_ticket.save');
    Route::get('/support/ticket/edit/{id}', [SupportTicketController::class, 'edit'])->name('support_ticket.edit');
    Route::put('/support/ticket/update/{id}', [SupportTicketController::class, 'update'])->name('support_ticket.update');
    Route::delete('/support/ticket/delete/{id}', [SupportTicketController::class, 'destroy'])->name('support_ticket.destroy');

    // Login Request
    Route::post('/support/ticket/login-request/send-credential', [SupportTicketController::class, 'loginCredentialSend'])->name('support_ticket.send_login_credential');

    // Summary Report
    Route::get('/summary/report', [SummaryReportController::class, 'summaryReport'])->name('summary_report.summary_report');

    // survey
    Route::get('/surveys', [SurveyController::class, 'index'])->name('survey.list');
    Route::get('/survey/create', [SurveyController::class, 'create'])->name('survey.create');
    Route::post('/survey/save', [SurveyController::class, 'save'])->name('survey.save');
    Route::get('/survey/design', [SurveyController::class, 'designSurvey'])->name('survey.design');
    Route::post('/survey/design-save', [SurveyController::class, 'saveDesignSurvey'])->name('survey.design_save');
    Route::get('/survey/take/{id}', [SurveyController::class, 'takeSurvey'])->name('survey.take');
    Route::post('/survey/take-save/{id}', [SurveyController::class, 'saveTakeSurvey'])->name('survey.take_save');
    Route::get('/survey/edit/{id}', [SurveyController::class, 'edit'])->name('survey.edit');
    Route::put('/survey/update/{id}', [SurveyController::class, 'update'])->name('survey.update');
    Route::patch('/survey/update-status/{id}', [SurveyController::class, 'updateSurveyStatus'])->name('survey.update_status');
    Route::delete('/survey/delete/{id}', [SurveyController::class, 'destroy'])->name('survey.destroy');
    Route::get('/survey-list', [SurveyController::class, 'surveyList'])->name('survey.survey_list');
    Route::get('/user-survey-list', [SurveyController::class, 'userSurveyList'])->name('survey.user_survey_list');
    Route::get('/survey/preview/{id}', [SurveyController::class, 'takeSurveyPreview'])->name('survey.take_survey_preview');

    // survey report
    Route::match(['GET', 'POST'], '/survey/report/audiencewise', [SurveyController::class, 'audiencewiseReport'])->name('survey.audiencewise_report');

    // Student Survey
    Route::match(['GET', 'POST'], '/student/surveys', [SurveyController::class, 'studentSurveyList'])->name('student_survey.list');
    Route::get('/student/survey/take/{id}', [SurveyController::class, 'studentTakeSurvey'])->name('student_survey.take');
    Route::post('/student/survey/take-save/{id}', [SurveyController::class, 'studentSaveTakeSurvey'])->name('student_survey.take_save');

    // teacher
    Route::get('/teachers', [TeacherController::class, 'index'])->name('teacher.list');
    Route::get('/teacher/create', [TeacherController::class, 'create'])->name('teacher.create');
    Route::post('/teacher/save', [TeacherController::class, 'save'])->name('teacher.save');
    Route::get('/teacher/edit/{id}', [TeacherController::class, 'edit'])->name('teacher.edit');
    Route::put('/teacher/update/{id}', [TeacherController::class, 'update'])->name('teacher.update');
    Route::delete('/teacher/delete/{id}', [TeacherController::class, 'destroy'])->name('teacher.destroy');
    Route::match(['GET', 'POST'], '/teacher/birthday/list', [TeacherController::class, 'birthdayList'])->name('teacher.birthday_list');

    // timezone
    Route::get('/timezones', [TimezoneController::class, 'index'])->name('timezone.list');
    Route::get('/timezone/create', [TimezoneController::class, 'create'])->name('timezone.create');
    Route::post('/timezone/save', [TimezoneController::class, 'save'])->name('timezone.save');
    Route::get('/timezone/edit/{timezone}', [TimezoneController::class, 'edit'])->name('timezone.edit');
    Route::patch('/timezone/update/{id}', [TimezoneController::class, 'update'])->name('timezone.update');
    Route::delete('/timezone/delete/{id}', [TimezoneController::class, 'destroy'])->name('timezone.destroy');

    // topic
    Route::get('/topics', [TopicController::class, 'index'])->name('topic.list');
    Route::post('/topic/save', [TopicController::class, 'save'])->name('topic.save');
    Route::patch('/topic/update/{id}', [TopicController::class, 'update'])->name('topic.update');
    Route::delete('/topic/delete/{id}', [TopicController::class, 'destroy'])->name('topic.destroy');

    // transport
    Route::get('/transports', [TransportController::class, 'index'])->name('transport.list');
    Route::get('/transport/mis-report', [TransportController::class, 'misReport'])->name('transport.mis_report');
    Route::match(['GET', 'POST'], '/transport/allocation', [TransportController::class, 'allocation'])->name('transport.allocation');
    Route::post('/transport/allocation/save', [TransportController::class, 'allocationSave'])->name('transport.allocation_save');
    Route::post('/transport/deallocation/save', [TransportController::class, 'deallocationSave'])->name('transport.deallocation_save');
    Route::match(['GET', 'POST'], '/transport/bulk-allocation', [TransportController::class, 'allocationBulk'])->name('transport.allocation_bulk');
    Route::post('/transport/bulk-allocation/save', [TransportController::class, 'allocationBulkSave'])->name('transport.allocation_bulk_save');

    // transport route
    Route::get('/transport/routes', [TransportRouteController::class, 'index'])->name('transport_route.list');
    Route::post('/transport/route/save', [TransportRouteController::class, 'save'])->name('transport_route.save');
    Route::match(['GET', 'POST'], '/transport/route/edit', [TransportRouteController::class, 'edit'])->name('transport_route.edit');
    Route::put('/transport/route/update/{id}', [TransportRouteController::class, 'update'])->name('transport_route.update');
    Route::delete('/transport/route/delete/{id}', [TransportRouteController::class, 'destroy'])->name('transport_route.destroy');

    // transport stoppage
    Route::get('/transport/stoppages', [TransportStoppageController::class, 'index'])->name('transport_stoppage.list');
    Route::get('/transport/stoppage/create', [TransportStoppageController::class, 'create'])->name('transport_stoppage.create');
    Route::post('/transport/stoppage/save', [TransportStoppageController::class, 'save'])->name('transport_stoppage.save');
    Route::match(['GET', 'POST'], '/transport/stoppage/edit', [TransportStoppageController::class, 'edit'])->name('transport_stoppage.edit');
    Route::put('/transport/stoppage/update/{id}', [TransportStoppageController::class, 'update'])->name('transport_stoppage.update');
    Route::delete('/transport/stoppage/delete/{id}', [TransportStoppageController::class, 'destroy'])->name('transport_stoppage.destroy');

    // transport voucher
    Route::match(['GET', 'POST'], '/transport/vouchers', [TransportVoucherController::class, 'index'])->name('transport.voucher_index');
    Route::get('/transport/voucher-setting', [TransportVoucherController::class, 'voucherSetting'])->name('transport.voucher_setting');
    Route::get('/transport/voucher-due-setting', [TransportVoucherController::class, 'voucherDueSetting'])->name('transport.voucher_due_setting');
    Route::post('/transport/voucher-due-setting/save', [TransportVoucherController::class, 'voucherDueSettingSave'])->name('transport.voucher_due_setting_save');
    Route::post('/transport/voucher/save', [TransportVoucherController::class, 'save'])->name('transport_voucher.save');
    Route::get('/transport/voucher/edit/{id}', [TransportVoucherController::class, 'edit'])->name('transport_voucher.edit');
    Route::put('/transport/voucher/update/{id}', [TransportVoucherController::class, 'update'])->name('transport_voucher.update');
    Route::delete('/transport/voucher/delete/{id}', [TransportVoucherController::class, 'destroy'])->name('transport_voucher.destroy');

    //transport fee-setting
    Route::get('/transport/fee-setting', [TransportFeeController::class, 'feeSetting'])->name('transport.fee_setting');
    Route::post('/transport/fee-setting/save', [TransportFeeController::class, 'save'])->name('transport.fee_setting.save');
    Route::post('/transport/voucher-fee-setting/save', [TransportFeeController::class, 'saveTransportVoucherSetting'])->name('transport.voucher_fee_setting.save');


    // vehicle
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicle.list');
    Route::post('/vehicle/save', [VehicleController::class, 'save'])->name('vehicle.save');
    Route::match(['GET', 'POST'], '/vehicle/edit', [VehicleController::class, 'edit'])->name('vehicle.edit');
    Route::put('/vehicle/update/{id}', [VehicleController::class, 'update'])->name('vehicle.update');
    Route::delete('/vehicle/delete/{id}', [VehicleController::class, 'destroy'])->name('vehicle.destroy');

    // vehicle-staff Transport
    Route::get('/vehicle-staffs', [VehicleStaffController::class, 'index'])->name('vehicle_staff.list');
    Route::get('/vehicle-staff/create', [VehicleStaffController::class, 'create'])->name('vehicle_staff.create');
    Route::post('/vehicle-staff/save', [VehicleStaffController::class, 'save'])->name('vehicle_staff.save');
    Route::match(['GET', 'POST'], '/vehicle-staff/edit', [VehicleStaffController::class, 'edit'])->name('vehicle_staff.edit');
    Route::post('/vehicle-staff/update', [VehicleStaffController::class, 'update'])->name('vehicle_staff.update');
    Route::delete('/vehicle-staff/delete/{id}', [VehicleStaffController::class, 'destroy'])->name('vehicle_staff.destroy');

    // Area for transport
    Route::get('/areas', [AreaController::class, 'index'])->name('area.list');
    Route::post('/area/save', [AreaController::class, 'save'])->name('area.save');
    Route::match(['GET', 'POST'], '/area/edit', [AreaController::class, 'edit'])->name('area.edit');
    Route::put('/area/update/{id}', [AreaController::class, 'update'])->name('area.update');
    Route::delete('/area/delete/{id}', [AreaController::class, 'destroy'])->name('area.destroy');


    // Transport Report
    Route::match(['GET', 'POST'], '/transport/report/route-summary', [TransportReportController::class, 'routeSummary'])->name('transport_report.route_summary');
    Route::match(['GET', 'POST'], '/transport/report/stoppage-summary', [TransportReportController::class, 'stoppageSummary'])->name('transport_report.stoppage_summary');
    Route::match(['GET', 'POST'], '/transport/report/areawise-summary', [TransportReportController::class, 'areaWiseSummary'])->name('transport_report.areawise_summary');
    Route::get('/transport/report/route-stoppages', [TransportReportController::class, 'routeStoppages'])->name('transport_report.route_stoppages');
    Route::match(['GET', 'POST'], '/transport/report/vehiclewise-report', [TransportReportController::class, 'vehicleWiseReport'])->name('transport_report.vehiclewise_report');
    Route::match(['GET', 'POST'], '/transport/report/classwise-report', [TransportReportController::class, 'classWiseReport'])->name('transport_report.classwise_report');
    Route::get('/transport/report/student-payment-details', [TransportReportController::class, 'studentPaymentDetails'])->name('transport_report.student_payment_details');

    Route::match(['GET', 'POST'], '/transport/report/teacher-transport-report', [TransportReportController::class, 'teacherTransportReport'])->name('transport_report.teacher_transport_report');
    Route::get('/transport/report/drivers-log-book', [TransportReportController::class, 'driversLogBook'])->name('transport_report.drivers_log_book');
    Route::post('/transport/report/drivers-log-book/save', [TransportReportController::class, 'driversLogBookSave'])->name('transport_report.drivers_log_book_save');
    Route::delete('/transport/report/drivers-log-book/delete/{id}', [TransportReportController::class, 'destroyDriverLogBook'])->name('transport_report.drivers_log_book_delete');
    Route::match(['GET', 'POST'], '/transport/report/driver-log-book-report', [TransportReportController::class, 'driverLogBookReport'])->name('transport_report.driver_log_book_report');
    Route::get('/transport/report/update-transport-fee', [TransportReportController::class, 'updateTransportFee'])->name('transport_report.update_transport_fee');
    Route::match(['GET', 'POST'], '/transport/report/vehicle-summary', [TransportReportController::class, 'vehicleSummary'])->name('transport_report.vehicle_summary');
    Route::get('/transport/report/route-wise-due-report', [TransportReportController::class, 'routeWiseDueReport'])->name('transport_report.routewise_due_report');
    Route::get('/transport/report/track-your-vehicle', [TransportReportController::class, 'trackYourVehicle'])->name('transport_report.track_your_vehicle');

    // visitor enquiry type
    Route::get('/visitor/enquiry/type', [VisitorEnquiryTypeController::class, 'index'])->name('visitor_enquiry.type');
    Route::post('/visitor/enquiry/type/save', [VisitorEnquiryTypeController::class, 'save'])->name('visitor_enquiry.type_save');
    Route::put('/visitor/enquiry/type/update/{id}', [VisitorEnquiryTypeController::class, 'update'])->name('visitor_enquiry.type_update');
    Route::delete('/visitor/enquiry/type/delete/{id}', [VisitorEnquiryTypeController::class, 'destroy'])->name('visitor_enquiry.type_destroy');
    // visitor enquiry
    Route::match(['GET', 'POST'], '/visitor/enquiry', [VisitorEnquiryController::class, 'enquiry'])->name('visitor_enquiry.list');
    Route::post('visitor/enquiry/activity/save', [VisitorEnquiryController::class, 'saveActivity'])->name('visitor_enquiry.activity_save');
    Route::get('/visitor/enquiry/setting', [VisitorEnquiryController::class, 'setting'])->name('visitor_enquiry.setting');
    Route::post('/visitor/enquiry-setting/save', [SiteSettingController::class, 'visitorEnquirySettingSave'])->name('visitor_enquiry_setting_create_update');

    Route::match(['GET', 'POST'], '/visitor/enquiry/gate-pass', [VisitorEnquiryController::class, 'gatePass'])->name('visitor_enquiry.gate_pass');
    Route::post('/visitor/enquiry/gate-pass/save', [VisitorEnquiryController::class, 'gatePassSave'])->name('visitor_enquiry.gate_pass_save');
    Route::match(['GET', 'POST'], '/visitor/enquiry/gate-pass-class-wise', [VisitorEnquiryController::class, 'gatePassClassWise'])->name('visitor_enquiry.gate_pass_class_wise');
    Route::get('/visitor/enquiry/create', [VisitorEnquiryController::class, 'create'])->name('visitor_enquiry.create');
    Route::post('/visitor/enquiry/save', [VisitorEnquiryController::class, 'save'])->name('visitor_enquiry.save');
    Route::get('/visitor/enquiry/edit/{id}', [VisitorEnquiryController::class, 'edit'])->name('visitor_enquiry.edit');
    Route::post('/visitor_enquiry.save', [VisitorEnquiryController::class, 'frontendEnquirySave'])->name('frontend.visitor_enquiry.save');
    Route::put('/visitor/enquiry/update/{id}', [VisitorEnquiryController::class, 'update'])->name('visitor_enquiry.update');
    Route::delete('/visitor/enquiry/delete/{id}', [VisitorEnquiryController::class, 'destroy'])->name('visitor_enquiry.destroy');


    // webmessage
    Route::get('/webmessages', [WebmessageController::class, 'index'])->name('webmessage.list');
    Route::post('/webmessage/save', [WebmessageController::class, 'save'])->name('webmessage.save');
    Route::match(['GET', 'POST'], '/webmessage/compose', [WebmessageController::class, 'compose'])->name('webmessage.compose');
    Route::match(['GET', 'POST'], '/webmessage/inbox', [WebmessageController::class, 'inbox'])->name('webmessage.inbox');
    Route::get('/webmessage/sent', [WebmessageController::class, 'sent'])->name('webmessage.sent');
    Route::get('/webmessage/{id}', [WebmessageController::class, 'show'])->name('webmessage.show');
    Route::delete('/webmessage/delete/{id}', [WebmessageController::class, 'destroy'])->name('webmessage.destroy');

    // import data
    Route::get('/import/student', [ImportController::class, 'importStudentData'])->name('import.student_create');
    Route::post('/import/student/save', [ImportController::class, 'saveImportStudentData'])->name('import.student_create.save');
    Route::get('/import/student/student-import-template/download', [ImportController::class, 'downloadStudentImportTemplate'])->name('import.student_import_template.download');

    Route::get('/import/student/update', [ImportController::class, 'importUpdateStudentData'])->name('import.student_update');
    Route::post('/import/student-update/save', [ImportController::class, 'saveImportStudentUpdateData'])->name('import.student_update.save');
    Route::get('/import/student/student-update-import-template/download', [ImportController::class, 'downloadStudentUpdateImportTemplate'])->name('import.student_update_import_template.download');

    Route::get('/import/staff', [ImportController::class, 'importStaffData'])->name('import.staff_create');
    Route::post('/import/staff/save', [ImportController::class, 'saveImportStaffData'])->name('import.staff_create.save');
    Route::get('/import/staff/staff-import-template/download', [ImportController::class, 'downloadStaffImportTemplate'])->name('import.staff_import_template.download');
    Route::post('/import/staff/exam-mark/save', [ImportController::class, 'saveImportExamMarkData'])->name('import.exam_mark.save');

    Route::post('/import/inventory/product/save', [ImportController::class, 'saveImportProductData'])->name('import.inventory_product.save');

    // virtual question
    Route::post('/import/online-exam/question/save', [ImportController::class, 'saveImportQuestionData'])->name('import.virtual_question.save');

    // salary
    Route::post('/import/salary/staff-earning/save', [ImportController::class, 'saveImportStaffEarningData'])->name('import.salary.save_staff_earning');

    // create new site
    Route::get('/create-school-site', [ArtisanDomainController::class, 'index'])->name('artisan-domain.new');

    // create sub domain
    Route::get('/process-domain', [ProcessController::class, 'index'])->name('process_domain.new');

    // account - Inventory mis report
    Route::get('/inventory/mis-report', [InventoryController::class, 'misReport'])->name('inventory.mis_report');

    // inventory sale group
    Route::get('/inventory/sale-group', [SaleGroupController::class, 'show'])->name('sale_group.list');
    Route::post('/inventory/sale-group/save', [SaleGroupController::class, 'save'])->name('sale_group.save');
    Route::match(['GET', 'POST'], '/inventory/sale-group/edit', [SaleGroupController::class, 'edit'])->name('sale_group.edit');
    Route::put('/inventory/sale-group/update/{id}', [SaleGroupController::class, 'update'])->name('sale_group.update');
    Route::delete('/inventory/sale-group/delete/{id}', [SaleGroupController::class, 'destroy'])->name('sale_group.destroy');

    // random route for design need to wrok
    Route::get('/inventory/import-item', [SaleGroupController::class, 'importItem'])->name('import_item.create_list');
    Route::match(['GET', 'POST'], '/inventory/student-teacher-ledger', [SaleGroupController::class, 'studentTeacherLedger'])->name('student_teacher_ledger.list');
    Route::post('/inventory/student-teacher-ledger/save', [SaleGroupController::class, 'saveStudentTeacherLedger'])->name('student_teacher_ledger.save');

    Route::get('/inventory/allocate/product/location', [SaleGroupController::class, 'allocateProductLocation'])->name('allocate_product_location.list');
    Route::post('/inventory/allocate/product/location/save', [SaleGroupController::class, 'allocateProductLocationSave'])->name('allocate_product_location.save');
    Route::patch('/inventory/allocate/product/location/delete/{id}', [SaleGroupController::class, 'deleteAllocateProductLocation'])->name('allocate_product_location.delete');
    Route::match(['GET', 'POST'], '/inventory/allocate/product/location/report', [SaleGroupController::class, 'allocateProductLocationReport'])->name('allocate_product_location_report.list');
    Route::match(['GET', 'POST'], '/inventory/location/product', [SaleGroupController::class, 'locationProductList'])->name('location_product.list');
    // Route::get('/inventory/purchase/receipt', [SaleGroupController::class, 'purchaseReceipt'])->name('purchase_receipt');
    Route::match(['GET', 'POST'], '/inventory/sale/due/payment', [SaleGroupController::class, 'saleDuePayment'])->name('sale_due_payment');
    Route::match(['GET', 'POST'], '/inventory/sale/due/payment/save', [SaleGroupController::class, 'saveSaleDuePayment'])->name('sale_due_payment.save');
    Route::patch('/inventory/sale/due/payment/cancel/{id}', [SaleGroupController::class, 'cancelSaleDuePayment'])->name('sale_due_payment.cancel');
    Route::patch('/inventory/sale/due/payment/update-details/{id}', [SaleGroupController::class, 'updateSaleDuePaymentDetails'])->name('sale_due_payment.update_details');
    Route::match(['GET', 'POST'], '/inventory/date-wise-payment-receipt', [SaleGroupController::class, 'dateWisePaymentReceipt'])->name('date_wise_payment_receipt.list');
    Route::match(['GET', 'POST'], '/inventory/day-book', [SaleGroupController::class, 'dayBookReport'])->name('day_book_report.list');
    Route::match(['GET', 'POST'], '/inventory/group-summary-report', [SaleGroupController::class, 'groupSummaryReport'])->name('group_summary_report.list');
    Route::match(['GET', 'POST'], '/inventory/cancelled-payment-receipt', [SaleGroupController::class, 'cancelledPaymentReceipt'])->name('cancelled_payment_receipt.list');
    Route::match(['GET', 'POST'], '/inventory/trial-balance-report', [SaleGroupController::class, 'trialBalanceReport'])->name('trial_balance_report.list');
    Route::match(['GET', 'POST'], '/inventory/cash-book-report', [SaleGroupController::class, 'cashBookReport'])->name('cash_book_report.list');
    Route::get('/inventory/sale-summary-report', [SaleGroupController::class, 'saleSummaryReport'])->name('sale_summary_report.list');


    // inventory product
    Route::post('/inventory/category/parent', [ProductController::class, 'getSubProductCat'])->name('product_sub_cat');
    Route::match(['GET', 'POST'], '/inventory/product/single/create', [ProductController::class, 'createSingle'])->name('create_single_product.list');
    Route::post('/inventory/product/single/save', [ProductController::class, 'saveSingle'])->name('single_product.save');
    Route::match(['GET', 'POST'], '/inventory/product/single/edit', [ProductController::class, 'editSingle'])->name('edit_single_product.list');
    Route::put('/inventory/product/single/update/{id}', [ProductController::class, 'updateSingle'])->name('single_product.update');
    Route::delete('/inventory/product/single/delete/{id}', [ProductController::class, 'destroySingle'])->name('single_product.destroy');
    Route::match(['GET', 'POST'], '/inventory/product/multi/create', [ProductController::class, 'createMultiple'])->name('create_multiple_product.list');
    Route::post('/inventory/product/multi/save', [ProductController::class, 'saveMulti'])->name('multi_product.save');
    Route::get('/inventory/product/opening-stock', [ProductController::class, 'openingStock'])->name('opening_stock_product.list');
    Route::post('/inventory/product/opening-stock/save', [ProductController::class, 'openingStockSave'])->name('opening_stock_product.save');
    Route::post('/inventory/get-product/', [ProductController::class, 'getProductById'])->name('get_product_by_id');
    Route::match(['GET', 'POST'], '/inventory/product/report', [ProductController::class, 'productReportList'])->name('product_report.list');
    Route::match(['GET', 'POST'], '/inventory/setprice', [ProductController::class, 'saleSetPrice'])->name('set_sale_price.create_list');
    Route::post('/inventory/setsaleprice/save', [ProductController::class, 'saleSetPriceSave'])->name('set_sale_price.save');
    Route::put('/inventory/setsaleprice/update/{id}', [ProductController::class, 'setSalePriceUpdate'])->name('set_sale_price.update');
    Route::put('/inventory/setcostprice/update/{id}', [ProductController::class, 'setCostPriceUpdate'])->name('set_cost_price.update');
    Route::delete('/inventory/saleprice/delete/{id}', [ProductController::class, 'salePriceDelete'])->name('sale_price.delete');

    // inventory product production
    Route::get('/inventory/product/production', [ProductQuantityController::class, 'showProduction'])->name('product_production.list');
    Route::post('/inventory/product/production/save', [ProductQuantityController::class, 'saveProduction'])->name('product_production.save');
    Route::match(['GET', 'POST'], '/inventory/product/production/edit', [ProductQuantityController::class, 'editProduction'])->name('product_production.edit');
    Route::put('/inventory/product/production/update/{id}', [ProductQuantityController::class, 'updateProduction'])->name('product_production.update');
    Route::delete('/inventory/product/production/delete/{id}', [ProductQuantityController::class, 'destroyProduction'])->name('product_production.destroy');

    // inventory product consumption
    Route::get('/inventory/product/consumption', [ProductQuantityController::class, 'showConsumption'])->name('product_consumption.list');
    Route::post('/inventory/product/consumption/save', [ProductQuantityController::class, 'saveConsumption'])->name('product_consumption.save');
    Route::match(['GET', 'POST'], '/inventory/product/consumption/edit', [ProductQuantityController::class, 'editConsumption'])->name('product_consumption.edit');
    Route::put('/inventory/product/consumption/update/{id}', [ProductQuantityController::class, 'updateConsumption'])->name('product_consumption.update');
    Route::delete('/inventory/product/consumption/delete/{id}', [ProductQuantityController::class, 'destroyConsumption'])->name('product_consumption.destroy');

    // Unit of Measurement
    Route::get('/inventory/uom', [UomController::class, 'show'])->name('uom.list');
    Route::post('/inventory/uom/save', [UomController::class, 'save'])->name('uom.save');
    Route::put('/inventory/uom/update/{id}', [UomController::class, 'update'])->name('uom.update');
    Route::delete('/inventory/uom/delete/{id}', [UomController::class, 'destroy'])->name('uom.destroy');

    // Product vendor
    Route::get('/inventory/vendor', [VendorController::class, 'productVendorShow'])->name('product_vendor.list');
    Route::post('/inventory/vendor/save', [VendorController::class, 'productVendorSave'])->name('product_vendor.save');
    Route::put('/inventory/vendor/update/{id}', [VendorController::class, 'productVendorUpdate'])->name('product_vendor.update');
    Route::delete('/inventory/vendor/delete/{id}', [VendorController::class, 'productVendorDestroy'])->name('product_vendor.destroy');

    // account group
    Route::get('/inventory/account/group', [AccountGroupController::class, 'show'])->name('account_group.list');
    Route::post('/inventory/account/group/save', [AccountGroupController::class, 'save'])->name('account_group.save');
    Route::match(['GET', 'POST'], '/inventory/account/group/edit', [AccountGroupController::class, 'edit'])->name('account_group.edit');
    Route::put('/inventory/account/group/update/{id}', [AccountGroupController::class, 'update'])->name('account_group.update');
    Route::delete('/inventory/account/group/delete/{id}', [AccountGroupController::class, 'destroy'])->name('account_group.destroy');

    // Product voucher type
    Route::get('/inventory/voucher/type', [TypeController::class, 'productVoucherTypeShow'])->name('product_voucher_type.list');
    Route::post('/inventory/voucher/type/save', [TypeController::class, 'productVoucherTypSave'])->name('product_voucher_type.save');
    Route::match(['GET', 'POST'], '/inventory/voucher/type/edit', [TypeController::class, 'productVoucherTypEdit'])->name('product_voucher_type.edit');
    Route::put('/inventory/voucher/type/update/{id}', [TypeController::class, 'productVoucherTypUpdate'])->name('product_voucher_type.update');
    Route::delete('/inventory/voucher/type/delete/{id}', [TypeController::class, 'productVoucherTypDestroy'])->name('product_voucher_type.destroy');

    // ledger
    Route::get('/inventory/ledger', [LedgerController::class, 'show'])->name('ledger.list');
    Route::get('/inventory/ledger-search', [LedgerController::class, 'showSearch'])->name('ledger_search.list');
    Route::post('/inventory/ledger/save', [LedgerController::class, 'save'])->name('ledger.save');
    Route::match(['GET', 'POST'], '/inventory/ledger/edit', [LedgerController::class, 'edit'])->name('ledger.edit');
    Route::put('/inventory/ledger/update/{id}', [LedgerController::class, 'update'])->name('ledger.update');
    Route::delete('/inventory/ledger/delete/{id}', [LedgerController::class, 'destroy'])->name('ledger.destroy');
    Route::match(['GET', 'POST'], '/inventory/ledger/report', [LedgerController::class, 'ledgerReport'])->name('ledger_report.list');

    // company
    Route::get('/inventory/company', [CompanyController::class, 'show'])->name('company.list');
    Route::post('/inventory/company/save', [CompanyController::class, 'save'])->name('company.save');
    Route::match(['GET', 'POST'], '/inventory/company/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/inventory/company/update/{id}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/inventory/company/delete/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');

    // account-setting
    Route::get('/inventory/account-setting', [SiteSettingController::class, 'accountSetting'])->name('account_setting_show');
    Route::post('/inventory/account-setting/save', [SiteSettingController::class, 'accountSettingSave'])->name('account_setting_create_update');
    Route::post('/inventory/account-setting/checkbox/save', [SiteSettingController::class, 'accountSettingCheckboxSave'])->name('setting_checkbox_create_update');

    // sms-setting
    Route::post('/settings/sms-setting/save', [SiteSettingController::class, 'smsSettingSave'])->name('sms_setting_create_update');


    // purchase
    Route::get('/inventory/purchase', [PurchaseController::class, 'productPurchaseShow'])->name('product_purchase.list');
    Route::post('/inventory/purchase/save', [PurchaseController::class, 'productPurchaseSave'])->name('product_purchase.save');
    Route::patch('/inventory/purchase/cancel/{id}', [PurchaseController::class, 'cancelPurchase'])->name('product_purchase.cancel');
    Route::match(['GET', 'POST'], '/inventory/purchase-report', [PurchaseController::class, 'purchaseReport'])->name('purchase_report.list');
    Route::match(['GET', 'POST'], '/inventory/purchase-summary-report', [PurchaseController::class, 'purchaseSummaryReport'])->name('purchase_summary_report.list');

    // product student sale
    Route::match(['GET', 'POST'], '/inventory/student/sale', [SaleController::class, 'studentSale'])->name('student_sale.create');
    Route::post('/inventory/student/sale/save', [SaleController::class, 'saveStudentSaleLedger'])->name('student_sale_ledger.save');
    Route::match(['GET', 'POST'], '/inventory/student/sale/return', [SaleController::class, 'studentSaleReturn'])->name('student_sale_return.create');
    Route::post('/inventory/student/sale/return/save', [SaleController::class, 'saveStudentSaleReturnLedger'])->name('student_sale_return_ledger.save');

    // product teacher sale
    Route::get('/inventory/teacher/sale', [SaleController::class, 'teacherSale'])->name('teacher_sale.create');
    Route::post('/inventory/teacher/sale/save', [SaleController::class, 'saveTeacherSaleLedger'])->name('teacher_sale_ledger.save');
    Route::match(['GET', 'POST'], '/inventory/teacher/sale/return', [SaleController::class, 'teacherSaleReturn'])->name('teacher_sale_return.create');
    Route::post('/inventory/teacher/sale/return/save', [SaleController::class, 'teacherSaleReturnSave'])->name('teacher_sale_return.save');

    // product sale report
    Route::match(['GET', 'POST'], '/inventory/sale-register-report', [SaleController::class, 'saleRegisterReport'])->name('sale_register_report.list');
    Route::match(['GET', 'POST'], '/inventory/sale-return-report', [SaleController::class, 'saleReturnReport'])->name('sale_return_report.list');
    Route::match(['GET', 'POST'], '/inventory/product/transaction-report', [SaleController::class, 'productTransactionReport'])->name('product_transaction_report.list');
    Route::match(['GET', 'POST'], '/inventory/product/sale-report', [SaleController::class, 'productLedgerSaleReport'])->name('product_sale_report.list');
    Route::match(['GET', 'POST'], '/inventory/party-sale-report', [SaleController::class, 'partySaleReport'])->name('party_sale_report.list');
    Route::match(['GET', 'POST'], '/inventory/due-paid-report', [SaleController::class, 'duePaidReport'])->name('due_paid_report.list');
    Route::match(['GET', 'POST'], '/inventory/consolidated-sale-report', [SaleController::class, 'consolidatedSaleReport'])->name('consolidated_sale_report.list');
    Route::patch('/inventory/sale-return/cancel/{id}', [SaleController::class, 'cancelSaleReturn'])->name('sale_return.cancel');
    Route::patch('/inventory/sale-ledger/cancel/{id}', [SaleController::class, 'cancelSaleLedger'])->name('sale_ledger.cancel');

    // journal
    Route::get('/inventory/journal', [JournalController::class, 'create'])->name('journal.create');
    Route::post('/inventory/journal/save', [JournalController::class, 'save'])->name('journal.save');
    Route::match(['GET', 'POST'], '/inventory/journal-report', [JournalController::class, 'journalReport'])->name('journal.journal_report');
    Route::patch('/inventory/journal/cancel/{id}', [JournalController::class, 'cancelJournal'])->name('journal.cancel');

    // ledger payment
    Route::match(['GET', 'POST'], '/inventory/payment', [PaymentController::class, 'ledgerPayment'])->name('ledger_payment');
    Route::post('/inventory/payment/save', [PaymentController::class, 'ledgerPaymentSave'])->name('ledger_payment.save');
    Route::patch('/inventory/payment/update-details/{id}', [PaymentController::class, 'updateLedgerPaymentDetails'])->name('ledger_payment.update_details');
    Route::patch('/inventory/ledger-payment/cancel/{id}', [PaymentController::class, 'cancelLedgerPayment'])->name('ledger_payment.cancel');
    Route::match(['GET', 'POST'], '/inventory/payment/report', [PaymentController::class, 'ledgerPaymentReport'])->name('ledger_payment_report.list');

    // ledger receipt
    Route::match(['GET', 'POST'], '/inventory/receipt', [ReceiptController::class, 'ledgerReceipt'])->name('ledger_receipt');
    Route::post('/inventory/receipt/save', [ReceiptController::class, 'ledgerReceiptSave'])->name('ledger_receipt.save');
    Route::patch('/inventory/receipt/update-details/{id}', [ReceiptController::class, 'updateLedgerReceiptDetails'])->name('ledger_receipt.update_details');
    Route::patch('/inventory/ledger-receipt/cancel/{id}', [ReceiptController::class, 'cancelLedgerReceipt'])->name('ledger_receipt.cancel');
    Route::match(['GET', 'POST'], '/inventory/receipt/report', [ReceiptController::class, 'ledgerReceiptReport'])->name('ledger_receipt_report.list');

    // allowcation
    Route::match(['GET', 'POST'], '/inventory/product/return', [AllocationController::class, 'productReturn'])->name('product_return.list');
    Route::post('/inventory/product/get-allocation-product-by-staff-id', [AllocationController::class, 'getAllocationProductByStaffId'])->name('get_allocation_product_by_staff_id');
    Route::get('/inventory/allocation/summary', [AllocationController::class, 'allocationSummary'])->name('allocation_summary.list');
    Route::match(['GET', 'POST'], '/inventory/allocation/report', [AllocationController::class, 'allocationReport'])->name('allocation_report.list');
    Route::patch('/inventory/allocation/cancel/{id}', [AllocationController::class, 'allocationProductCancel'])->name('allocation_product_cancel');
    Route::get('/inventory/allocation', [AllocationController::class, 'productStaffAllocation'])->name('product_staff_allocation.create');
    Route::post('/inventory/allocation/save', [AllocationController::class, 'productStaffAllocationSave'])->name('product_staff_allocation.save');
    Route::post('/inventory/allocation/return/save', [AllocationController::class, 'allocationProductReturnSave'])->name('allocation_product_return.save');
    Route::match(['GET', 'POST'], '/inventory/product/return/report', [AllocationController::class, 'productReturnReport'])->name('product_return_report.list');

    // InfraLevel
    Route::match(['GET', 'POST'], '/inventory/infra/level', [InfraLevelController::class, 'InfraLevel'])->name('infra_level.create_list');
    Route::delete('/inventory/infra/level/delete/{id}', [InfraLevelController::class, 'destroy'])->name('infra_level.destroy');

    // bulkWallet
    Route::match(['GET', 'POST'], '/inventory/bulk/wallet', [StudentController::class, 'bulkWallet'])->name('bulk_wallet.list');
    Route::post('/inventory/bulk/wallet/save', [StudentController::class, 'saveBulkWallet'])->name('bulk_wallet.save');

    // Download
    Route::get('/download/all', [DownloadController::class, 'index'])->name('download.all_menus');
    Route::get('/download/registrationform', [DownloadController::class, 'registrationForm'])->name('download.registration_form');
    Route::get('/download/student', [DownloadController::class, 'student'])->name('download.student');
    Route::get('/download/teacher-download', [DownloadController::class, 'teacherDownload'])->name('download.teacher_download');
    Route::get('/download/teacher-retirement-report', [DownloadController::class, 'teacherRetirementReport'])->name('download.teacher_retirement_report');
    Route::get('/download/sibling', [DownloadController::class, 'sibling'])->name('download.sibling');
    Route::get('/download/guardian', [DownloadController::class, 'guardian'])->name('download.guardian');
    Route::patch('/download/guardian/update/{id}', [DownloadController::class, 'updateGuardianId'])->name('download.guardian.update');
    Route::get('/download/download-tc', [DownloadController::class, 'downloadTc'])->name('download.download_tc');
    Route::get('/download/download-category-wise-report', [DownloadController::class, 'downloadCategoryWiseReport'])->name('download.download_category_wise_report');

    // Download Report
    Route::get('/download/report/teachers-audit', [DownloadReportController::class, 'teachersAuditReport'])->name('download_report.teachers_audit');
    Route::get('/download/report/parents-audit', [DownloadReportController::class, 'parentsAuditReport'])->name('download_report.parents_audit');
    Route::get('/download/report/teachers-audit-summary', [DownloadReportController::class, 'teachersAuditSummary'])->name('download_report.teachers_audit_summary');
    Route::get('/download/report/teachers-parents-audit-report', [DownloadReportController::class, 'teachersParentsAuditReport'])->name('download_report.teachers_parents_audit_report');
    Route::get('/download/report/teachers-parents-audit-list', [DownloadReportController::class, 'teachersParentsAuditList'])->name('download_report.teachers_parents_audit_list');
    Route::get('/download/report/parent-mobile-usage-report', [DownloadReportController::class, 'parentMobileUsageReport'])->name('download_report.parent_mobile_usage_report');

    // pdf fee export
    Route::get('/fee/student-fee-summary/export/pdf', [PdfFeeController::class, 'printStudentFeeSummary'])->name('pdf_fee.student_fee_summary');
    Route::get('/fee/student-cancelled-office-large/export/pdf', [PdfFeeController::class, 'printCancelledStudentOfficeLarge'])->name('pdf_fee.student_cancelled_office_large');
    Route::get('/fee/student-cancelled-office-single-large/export/pdf', [PdfFeeController::class, 'printCancelledStudentOfficeSingleLarge'])->name('pdf_fee.student_cancelled_office_single_large');
    Route::get('/fee/student-cancelled-office-single-small/export/pdf', [PdfFeeController::class, 'printCancelledStudentOfficeSingleSmall'])->name('pdf_fee.student_cancelled_office_single_small');
    Route::get('/fee/student-cancelled-office-small/export/pdf', [PdfFeeController::class, 'printCancelledStudentOfficeSmall'])->name('pdf_fee.student_cancelled_office_small');
    Route::get('/fee/student-paid-large/export/pdf', [PdfFeeController::class, 'printStudentPaidLarge'])->name('pdf_fee.student_paid_large');
    Route::get('/fee/student-paid-single-large/export/pdf', [PdfFeeController::class, 'printStudentPaidSingleLarge'])->name('pdf_fee.student_paid_single_large');
    Route::get('/fee/student-paid-single-large2/export/pdf/{id}', [PdfFeeController::class, 'printStudentPaidSingleLargeTwo'])->name('pdf_fee.student_paid_single_large2');
    Route::get('/fee/student-paid-single-small/export/pdf', [PdfFeeController::class, 'printStudentPaidSingleSmall'])->name('pdf_fee.student_paid_single_small');
    Route::get('/fee/student-paid-small/export/pdf', [PdfFeeController::class, 'printStudentPaidSmall'])->name('pdf_fee.student_paid_small');
    Route::get('/fee/student-paid-large2/export/pdf/{id}', [PdfFeeController::class, 'printPaidLarge'])->name('pdf_fee.student_paid_large2');
    Route::get('/fee/student-payment-receipt', [PdfFeeController::class, 'printPaymentReceipt'])->name('pdf_fee.student_payment_receipt');

    Route::get('/fee/student-ledger-report/download', [PdfFeeController::class, 'downloadStudentLedgerReport'])->name('pdf_fee.student_ledger_report');

    // fee refund
    Route::get('/fee/fee-refund-receipt/pdf/{id}', [PdfFeeController::class, 'printFeeRefundReceipt'])->name('pdf_fee.fee_refund_receipt');

    // fee-agreement
    Route::get('/fee/student-fee-agreement/pdf', [PdfFeeController::class, 'printStudentFeeAgreement'])->name('pdf_fee.student_fee_agreement');
    Route::get('/fee/student-fee-details/pdf', [PdfFeeController::class, 'printStudentFeeDetails'])->name('pdf_fee.student_fee_details');

    // pdf export
    Route::get('/fee/student-demand-slip/view', [PdfDemandSlipController::class, 'viewStudentDemandSlip'])->name('pdf_fee_demand_slip.demand_slip_view');
    Route::get('/fee/student-demand-slip/export/pdf', [PdfDemandSlipController::class, 'printStudentDemandSlip'])->name('pdf_fee_demand_slip.demand_slip_print');
    Route::get('/fee/student-demand-slip/single/export/pdf', [PdfDemandSlipController::class, 'printStudentSingleDemandSlip'])->name('pdf_fee_demand_slip.single_demand_slip_print');
    Route::get('/fee/student-due-summary/export/pdf', [PdfDemandSlipController::class, 'printStudentDueSummary'])->name('pdf_fee_demand_slip.student_due_summary');
    Route::get('/fee/student-due-summary/head-wise/export/pdf', [PdfDemandSlipController::class, 'printStudentDueSummaryHeadWise'])->name('pdf_fee_demand_slip.student_due_summary_head_wise');
    Route::get('/fee/student-due-summary/installment-wise/export/pdf', [PdfDemandSlipController::class, 'printStudentDueSummaryInstallmentWise'])->name('pdf_fee_demand_slip.student_due_summary_installment_wise');

    Route::get('/fee/daily-collection-report/export/pdf', [PdfDemandSlipController::class, 'printDailyCollectionReport'])->name('pdf_fee_demand_slip.daily_collection_report');

    Route::get('/fee/daily-collection-fee-head-wise/export/pdf', [PdfDemandSlipController::class, 'printDailyCollectionFeeHeadWiseReport'])->name('pdf_fee_demand_slip.daily_collection_fee_head_wise');
    Route::get('/fee/daily-collection-with-inventory/export/pdf', [PdfDemandSlipController::class, 'printDailyCollectionWithInventoryReport'])->name('pdf_fee_demand_slip.daily_collection_with_inventory');

    Route::get('/fee/head-wise-daily-fee-summary/export/pdf', [PdfDemandSlipController::class, 'printHeadWiseDailyFeeSummaryReport'])->name('pdf_fee_demand_slip.head_wise_daily_fee_summary_report');
    Route::get('/fee/head-wise-daily-summary/export/pdf', [PdfDemandSlipController::class, 'printHeadWiseDailySummaryReport'])->name('pdf_fee_demand_slip.head_wise_daily_summary_report');
    Route::get('/fee/yearly-head-wise-paid-summary/export/pdf', [PdfDemandSlipController::class, 'printYearlyHeadWisePaidSummaryReport'])->name('pdf_fee_demand_slip.yearly_head_wise_paid_summary_report');
    Route::get('/fee/class-wise-fee-collection-report/export/pdf', [PdfDemandSlipController::class, 'printClassWiseFeeCollectionReport'])->name('pdf_fee_demand_slip.class_wise_fee_collection_report');
    Route::get('/fee/installment-wise-fee-collection-report/export/pdf', [PdfDemandSlipController::class, 'printInstallmentWiseFeeCollectionReport'])->name('pdf_fee_demand_slip.installment_wise_fee_collection_report');
    Route::get('/fee/complete-fee-paid-report/export/pdf', [PdfDemandSlipController::class, 'printCompleteFeePaidReport'])->name('pdf_fee_demand_slip.complete_fee_paid_report');
    Route::get('/fee/yearly-head-wise-due-report/export/pdf', [PdfDemandSlipController::class, 'printYearlyHeadWiseDueSummaryReport'])->name('pdf_fee_demand_slip.yearly_head_wise_due_report');
    Route::get('/fee/complete-outstanding-due-report/export/pdf', [PdfDemandSlipController::class, 'printCompleteOutstandingDueReport'])->name('pdf_fee_demand_slip.complete_outstanding_due_report');
    Route::get('/fee/consolidated-due-report/export/pdf', [PdfDemandSlipController::class, 'printConsolidatedDueReport'])->name('pdf_fee_demand_slip.consolidated_due_report');
    Route::get('/fee/student-payment-report/export/pdf', [PdfDemandSlipController::class, 'printStudentPaymentReport'])->name('pdf_fee_demand_slip.student_payment_report');
    Route::get('/fee/student-head-wise-fee-report/export/pdf', [PdfDemandSlipController::class, 'printStudentHeadWiseFeeReport'])->name('pdf_fee_demand_slip.student_head_wise_fee_report');
    Route::get('/fee/class-wise-fee-collection-summary/export/pdf', [PdfDemandSlipController::class, 'printClassWiseFeeCollectionSummary'])->name('pdf_fee_demand_slip.class_wise_fee_collection_summary');
    Route::get('/fee/installment-wise-fee-collection-summary/export/pdf', [PdfDemandSlipController::class, 'printInstallmentWiseFeeCollectionSummary'])->name('pdf_fee_demand_slip.installment_wise_fee_collection_summary');
    Route::get('/fee/fee-cancellation-report/export/pdf', [PdfDemandSlipController::class, 'printFeeCancellationReport'])->name('pdf_fee_demand_slip.fee_cancellation_report');
    Route::get('/fee/guardian-wise-due-report/export/pdf', [PdfDemandSlipController::class, 'printGuardianWiseDueReport'])->name('pdf_fee_demand_slip.guardian_wise_due_report');

    // export inventory pdf
    Route::get('/inventory/ledger-payment-report/export/pdf', [PdfAccountController::class, 'printLedgerPaymentReport'])->name('pdf_account.ledger_payment_report');
    Route::get('/inventory/ledger-payment-receipt/export/pdf', [PdfAccountController::class, 'printLedgerPaymentReceipt'])->name('pdf_account.print_ledger_payment_receipt');
    Route::get('/inventory/sale-ledger-receipt/export/pdf', [PdfAccountController::class, 'printSaleLedgerReceipt'])->name('pdf_account.print_sale_ledger_receipt');
    Route::get('/inventory/sale-ledger-payment-receipt/export/pdf', [PdfAccountController::class, 'printSaleLedgerPaymentReceipt'])->name('pdf_account.print_sale_ledger_payment_receipt');
    Route::get('/inventory/sale-return-receipt/export/pdf', [PdfAccountController::class, 'printSaleReturnReceipt'])->name('pdf_account.print_sale_return_receipt');
    Route::get('/inventory/ledger-receipt/export/pdf', [PdfAccountController::class, 'printLedgerReceipt'])->name('pdf_account.print_ledger_receipt');
    Route::get('/inventory/ledger-receipt-report/export/pdf', [PdfAccountController::class, 'printLedgerReceiptReport'])->name('pdf_account.ledger_receipt_report');
    Route::get('/inventory/head-wise-payment-report/export/pdf', [PdfAccountController::class, 'printHeadWisePaymentReport'])->name('pdf_account.head_wise_payment_report');
    Route::get('/inventory/daybook-report/export/pdf', [PdfAccountController::class, 'printDayBookReport'])->name('pdf_account.daybook_report');
    Route::get('/inventory/purchase-receipt/export/pdf', [PdfAccountController::class, 'printPurchaseReceipt'])->name('pdf_account.print_purchase_receipt');
    Route::get('/inventory/purchase-report/export/pdf', [PdfAccountController::class, 'printPurchaseReport'])->name('pdf_account.purchase_report');
    Route::get('/inventory/sale-ledger-report/export/pdf', [PdfAccountController::class, 'printSaleLedgerReport'])->name('pdf_account.sale_ledger_report');
    Route::get('/inventory/product-purchase-report/export/pdf', [PdfAccountController::class, 'printProductPurchaseReport'])->name('pdf_account.product_purchase_report');
    Route::get('/inventory/product-sale-report/export/pdf', [PdfAccountController::class, 'printProductSaleReport'])->name('pdf_account.product_sale_report');
    Route::get('/inventory/party-wise-sale-report/export/pdf', [PdfAccountController::class, 'printPartyWiseSaleReport'])->name('pdf_account.party_wise_sale_report');
    Route::get('/inventory/sale-due-report/export/pdf', [PdfAccountController::class, 'printSaleDueReport'])->name('pdf_account.sale_due_report');
    Route::get('/inventory/sale-paid-report/export/pdf', [PdfAccountController::class, 'printSalePaidReport'])->name('pdf_account.sale_paid_report');
    Route::get('/inventory/consolidated-sale-report/export/pdf', [PdfAccountController::class, 'printConsolidatedSaleReport'])->name('pdf_account.consolidated_sale_report');
    Route::get('/inventory/journal-report/export/pdf', [PdfAccountController::class, 'printJournalReport'])->name('pdf_account.journal_report');
    Route::get('/inventory/journal-receipt/export/pdf', [PdfAccountController::class, 'printJournalReceipt'])->name('pdf_account.journal_receipt');

    // export salary pdf
    Route::get('/salary/print-salary-slip/export/pdf', [PdfSalaryController::class, 'printSalarySlipPdf'])->name('pdf_salary.salary_slip');
    Route::get('/salary/print-salary-slips', [PdfSalaryController::class, 'printSalarySlips'])->name('pdf_salary.salary_slips');
    Route::get('/salary/print-advance-payment-slip/export/pdf', [PdfSalaryController::class, 'printAdvancePaymentSlip'])->name('pdf_salary.advance_payment_slip');
    Route::get('/salary/bank-statement/export/pdf', [PdfSalaryController::class, 'printSalaryBankStatementReport'])->name('pdf_salary.bank_statement');
    Route::get('/salary/yearly-bank-statement/export/pdf', [PdfSalaryController::class, 'printYearlySalaryBankStatementReport'])->name('pdf_salary.yearly_bank_statement');
    Route::get('/salary/epf-report/export/pdf', [PdfSalaryController::class, 'printSalaryEpfReport'])->name('pdf_salary.epf_report');
    Route::get('/salary/esi-report/export/pdf', [PdfSalaryController::class, 'printSalaryEsiReport'])->name('pdf_salary.esi_report');


    // export pdf data
    Route::get('/export/print-registration-fee-receipt/{id}', [PdfGeneratorController::class, 'printRegistrationFeeReceipt'])->name('pdf_generator.print_registration_fee_receipt');
    Route::get('/export/academic-year', [PdfGeneratorController::class, 'ExportOldAcademicYear'])->name('pdf_generator.export_old_year_data');

    // Admission pdf export
    Route::get('/admission/fee-receipt/export/pdf', [PdfAdmissionController::class, 'printAdmissionFee'])->name('admission_pdf_generator.admission_fee');
    Route::get('/admission/registration-form/export/pdf/{id}', [PdfAdmissionController::class, 'printRegistrationForm'])->name('admission_pdf_generator.registration_form');
    Route::get('/admission/exam-summary/export/pdf', [PdfAdmissionController::class, 'printExamSummaryReport'])->name('admission_pdf_generator.exam_summary_report');

    // Academic export
    Route::get('/academic/progress-report/export/pdf', [PdfAcademicController::class, 'printProgressReport'])->name('pdf_generator.print_academic_progress_report');
    Route::get('/academic/progress-report2/export/pdf', [PdfAcademicController::class, 'printProgressReportTwo'])->name('pdf_generator.print_academic_progress_report_2');
    Route::get('/academic/progress-report3/export/pdf', [PdfAcademicController::class, 'printProgressReportThree'])->name('pdf_generator.print_academic_progress_report_3');
    Route::get('/academic/progress-report4/export/pdf', [PdfAcademicController::class, 'printProgressReportFour'])->name('pdf_generator.print_academic_progress_report_4');
    Route::get('/academic/student-progress-report/export/pdf', [PdfAcademicController::class, 'printStudentProgressReport'])->name('pdf_generator.print_academic_student_progress_report');
    Route::get('/academic/exam-wise-report/export/pdf', [PdfAcademicController::class, 'printExamWiseReport'])->name('pdf_generator.print_academic_exam_wise_report');
    Route::get('/academic/final-consolidated-report/export/pdf', [PdfAcademicController::class, 'printFinalConsolidatedReport'])->name('pdf_generator.print_academic_final_consolidated_report');
    Route::get('/timetable/class-timetable-report/export/pdf', [PdfAcademicController::class, 'printClassTimetableReport'])->name('pdf_generator.print_class_timetable_report');

    // Timetable
    Route::get('/timetable/classroom-timetable-report/export/pdf', [PdfTimetableController::class, 'printClassroomTimetableReport'])->name('pdf_timetable.classroom_timetable_report');
    Route::get('/timetable/teacher-timetable-report/export/pdf', [PdfTimetableController::class, 'printTeacherTimetableReport'])->name('pdf_timetable.teacher_timetable_report');

    // pdf exam
    Route::get('/online-exam/preview-question-paper/export/pdf', [PdfExamController::class, 'previewOnlineExamQuestions'])->name('pdf_generator.preview_online_exam_question');
    Route::get('/online-exam/download-question-paper/export/pdf', [PdfExamController::class, 'downloadOnlineExamQuestions'])->name('pdf_generator.download_online_exam_question');

    // Tc Form & PDF export
    Route::get('/tc/form/pdf/{id?}', [PdfTcGeneratorController::class, 'renderTcForm'])->name('pdf_tc_generator.render_tc_form');
    Route::get('/tc/bulk/form/pdf/{id?}', [PdfTcGeneratorController::class, 'renderBulkTcForm'])->name('pdf_tc_generator.render_bulk_tc_form');
    Route::get('/tc/form/export/pdf', [PdfTcGeneratorController::class, 'printTcForm'])->name('pdf_tc_generator.print_tc_form');
    // Certificate Form & PDF export
    Route::get('/certificate/identity-card/form/pdf/{id}', [PdfCertificateGeneratorController::class, 'renderIdentityCardForm'])->name('pdf_certificate_generator.render_identity_card_form');
    Route::get('/certificate/bonafide/pdf/{id}', [PdfCertificateGeneratorController::class, 'renderBonafideForm'])->name('bonafide_certificate_generator');
    Route::get('/certificate/character/pdf/{id}', [PdfCertificateGeneratorController::class, 'renderCharacterForm'])->name('character_certificate_generator');

    Route::get('/certificate/admit-card/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm'])->name('admit_card_certificate_generator');
    Route::get('/certificate/admit-card-2/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm2'])->name('admit_card_certificate_generator_2');
    Route::get('/certificate/admit-card-3/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm3'])->name('admit_card_certificate_generator_3');
    Route::get('/certificate/admit-card-4/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm4'])->name('admit_card_certificate_generator_4');
    Route::get('/certificate/admit-card-5/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm5'])->name('admit_card_certificate_generator_5');
    Route::get('/certificate/admit-card-6/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm6'])->name('admit_card_certificate_generator_6');
    Route::get('/certificate/admit-card-7/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm7'])->name('admit_card_certificate_generator_7');
    Route::get('/certificate/admit-card-8/pdf', [PdfCertificateGeneratorController::class, 'renderAdmitCardForm8'])->name('admit_card_certificate_generator_8');

    Route::get('/certificate/teacher-id/pdf', [PdfCertificateGeneratorController::class, 'renderTeacherIdForm'])->name('teacher_id_certificate_generator');
    Route::get('/certificate/teacher-experience/pdf', [PdfCertificateGeneratorController::class, 'renderTeacherExperienceForm'])->name('teacher_experience_certificate_generator');
    Route::get('/certificate/fee/pdf', [PdfCertificateGeneratorController::class, 'renderFeeForm'])->name('fee_certificate_generator');
    Route::get('/certificate/student-id/pdf', [PdfCertificateGeneratorController::class, 'renderStudentIdForm'])->name('student_id_certificate_generator');
    Route::get('/certificate/character/form/export/pdf', [PdfCertificateGeneratorController::class, 'printCharacterForm'])->name('pdf_certificate_generator.print_character_form');
    Route::get('/student/certificate/id-card-certificate/export/pdf', [PdfCertificateGeneratorController::class, 'printIdCardCertificate'])->name('pdf_certificate_generator.id_card_certificate');
    Route::get('/student/certificate/student-id-card-certificate/export/pdf', [PdfCertificateGeneratorController::class, 'printStudentIdCardCertificate'])->name('pdf_certificate_generator.student_id_card_certificate');
    Route::get('/student/certificate/teacher-id-card-certificate/export/pdf', [PdfCertificateGeneratorController::class, 'printTeacherIdCardCertificate'])->name('pdf_certificate_generator.teacher_id_card_certificate');

    // export student pdf
    Route::get('/student/class-wise-student-list/export/pdf', [PdfStudentController::class, 'printClassWiseStudentList'])->name('pdf_student.class_wise_student_list');
    Route::get('/student/student-age-report/export/pdf', [PdfStudentController::class, 'printStudentAgeReport'])->name('pdf_student.student_age_report');
    Route::get('/student/inactive-student-details/export/pdf/{id}', [PdfStudentController::class, 'printInactiveStudentDetails'])->name('pdf_student.inacticve_student_details');
    Route::get('/student/student-all-report/export/pdf', [PdfStudentController::class, 'printStudentGeneralReport'])->name('pdf_student.student_all_report');
    Route::get('/student/student-birth-date-wise-report/export/pdf', [PdfStudentController::class, 'printStudentBirthDateWiseReport'])->name('pdf_student.student_birth_date_wise_report');
    Route::get('/student/student-gender-report/export/pdf', [PdfStudentController::class, 'printStudentGenderReport'])->name('pdf_student.student_gender_report');
    Route::get('/student/student-contact-report/export/pdf', [PdfStudentController::class, 'printStudentContactReport'])->name('pdf_student.student_contact_report');
    Route::get('/student/student-address-report/export/pdf', [PdfStudentController::class, 'printStudentAddressReport'])->name('pdf_student.student_address_report');
    Route::get('/student/student-email-report/export/pdf', [PdfStudentController::class, 'printStudentEmailReport'])->name('pdf_student.student_email_report');
    Route::get('/student/student-religion-report/export/pdf', [PdfStudentController::class, 'printStudentReligionReport'])->name('pdf_student.student_religion_report');
    Route::get('/student/student-category-report/export/pdf', [PdfStudentController::class, 'printStudentCategoryReport'])->name('pdf_student.student_category_report');
    Route::get('/student/student-inactive-report/export/pdf', [PdfStudentController::class, 'printStudentInactiveReport'])->name('pdf_student.student_inactive_report');
    Route::get('/student/student-sibling-report/export/pdf', [PdfStudentController::class, 'printStudentSiblingReport'])->name('pdf_student.student_sibling_report');
    Route::get('/student/student-house-report/export/pdf', [PdfStudentController::class, 'printStudentHouseReport'])->name('pdf_student.student_house_report');
    Route::get('/student/new-student-report/export/pdf', [PdfStudentController::class, 'printNewStudentReport'])->name('pdf_student.new_student_report');
    Route::get('/student/old-student-report/export/pdf', [PdfStudentController::class, 'printOldStudentReport'])->name('pdf_student.old_student_report');
    Route::get('/student/student-employment-category-wise-report/export/pdf', [PdfStudentController::class, 'printStudentEmploymentCategoryWiseReport'])->name('pdf_student.student_employment_category_wise_report');
    Route::get('/student/student-boarding-type-report/export/pdf', [PdfStudentController::class, 'printStudentBoardingTypeReport'])->name('pdf_student.student_boarding_type_report');
    Route::get('/student/student-document-report/export/pdf', [PdfStudentController::class, 'printStudentDocumentReport'])->name('pdf_student.student_document_report');
    Route::get('/student/student-with-transport-report/export/pdf', [PdfStudentController::class, 'printStudentWithTransportReport'])->name('pdf_student.student_with_transport_report');
    Route::get('/student/student-without-transport-report/export/pdf', [PdfStudentController::class, 'printStudentWithoutTransportReport'])->name('pdf_student.student_without_transport_report');
    Route::get('/student/student-gender-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentGenderWiseSummaryReport'])->name('pdf_student.student_gender_wise_summary_report');
    Route::get('/student/student-religion-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentReligionWiseSummaryReport'])->name('pdf_student.student_religion_wise_summary_report');
    Route::get('/student/student-category-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentCategoryWiseSummaryReport'])->name('pdf_student.student_category_wise_summary_report');
    Route::get('/student/student-inactive-summary-report/export/pdf', [PdfStudentController::class, 'printStudentInactiveSummaryReport'])->name('pdf_student.student_inactive_summary_report');
    Route::get('/student/student-old-new-summary-report/export/pdf', [PdfStudentController::class, 'printStudentOldNewSummaryReport'])->name('pdf_student.student_old_new_summary_report');
    Route::get('/student/student-employment-category-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentEmploymentCategoryWiseSummaryReport'])->name('pdf_student.student_employment_category_wise_summary_report');
    Route::get('/student/student-boarding-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentBoardingWiseSummaryReport'])->name('pdf_student.student_boarding_wise_summary_report');
    Route::get('/student/student-document-wise-summary-report/export/pdf', [PdfStudentController::class, 'printStudentDocumentWiseSummaryReport'])->name('pdf_student.student_document_wise_summary_report');
    Route::get('/academic/month-wise-attendance-report/export/pdf', [PdfStudentController::class, 'printMonthWiseAttendanceReport'])->name('pdf_student.print_month_wise_attendance_report');
    Route::get('/academic/date-wise-class-attendance-report/export/pdf', [PdfStudentController::class, 'printDateWiseClassAttendanceReport'])->name('pdf_student.print_date_wise_class_attendance_report');
    Route::get('/academic/class-wise-daily-attendance-report/export/pdf', [PdfStudentController::class, 'printClassWiseDailyAttendanceReport'])->name('pdf_student.print_class_wise_daily_attendance_report');

    // teacher panel student fee report
    Route::get('/teacher/fee/student-complete-fee-paid-report/export/pdf', [PdfDemandSlipController::class, 'printStudentCompleteFeePaidReport'])->name('pdf_fee_demand_slip.teacher.student_complete_fee_paid_report');
    Route::get('/teacher/fee/student-daily-collection-report/export/pdf', [PdfDemandSlipController::class, 'printStudentDailyCollectionReport'])->name('pdf_fee_demand_slip.teacher.student_daily_collection_report');
    Route::get('/teacher/fee/student-due-report/head-wise/export/pdf', [PdfDemandSlipController::class, 'printHeadWiseStudentDueReport'])->name('pdf_fee_demand_slip.teacher.head_wise_student_due_report');
    Route::get('/teacher/fee/student-due-report/installment-wise/export/pdf', [PdfDemandSlipController::class, 'printInstallmentWiseStudentDueReport'])->name('pdf_fee_demand_slip.teacher.installment_wise_student_due_report');

    // Staff pdf export
    Route::get('/staff/pdf/export/{id}', [PdfStaffController::class, 'printStaffDetails'])->name('pdf_staff.print_staff_details');
    //visitor pdf export
    Route::get('/visitor-gate-pass/pdf/export/{id}', [PdfVisitorGatePassController::class, 'printVisitorGatePass'])->name('pdf_visitor.print_visitor_gate_pass');


    // export excel data
    Route::get('/export/excel/classes', [ExportExcelController::class, 'classesDownload'])->name('export_excel.classes');
    Route::get('/export/excel/students/all', [ExportExcelController::class, 'downloadStudentExcel'])->name('export_excel.download_student_excel');
    Route::get('/export/excel/academic-year/old', [ExportExcelController::class, 'exportOldAcademicYearData'])->name('export_excel.export_old_academic_year');

    // export cheque
    Route::get('/export/excel/cheque-manage-report', [ExportExcelController::class, 'exportChequeManageReport'])->name('export_excel.cheque_manage_report');

    // export discount
    Route::get('/export/excel/expected-discount-report', [ExportExcelController::class, 'exportExpectedDiscountReport'])->name('export_excel.expected_discount_report');
    Route::get('/export/excel/paid-discount-report', [ExportExcelController::class, 'exportPaidDiscountReport'])->name('export_excel.paid_discount_report');

    // export payment refund
    Route::get('/export/excel/cancelled-refund-report', [ExportExcelController::class, 'exportCancelledRefundReport'])->name('export_excel.cancelled_refund_report');

    // export adjust fee
    Route::get('/export/excel/adjust-fee-report', [ExportExcelController::class, 'exportAdjustFeeReport'])->name('export_excel.adjust_fee_report');

    // export voucher
    Route::get('/export/excel/voucher-report', [ExportExcelController::class, 'exportVoucherReport'])->name('export_excel.voucher_report');
    Route::get('/export/excel/transport-voucher-report', [ExportExcelController::class, 'exportTransportVoucherReport'])->name('export_excel.transport_voucher_report');

    // export fee report
    Route::get('/export/excel/student-head-wise-fee-report', [ExportExcelController::class, 'exportStudentHeadWiseFeeReport'])->name('export_excel.student_head_wise_fee_report');
    Route::get('/export/excel/fee-daily-collection-report', [ExportExcelController::class, 'exportFeeDailyCollectionReport'])->name('export_excel.daily_collection');
    Route::get('/export/excel/fee-installment-wise-daily-collection-report', [ExportExcelController::class, 'exportFeeInstallmentWiseDailyCollectionReport'])->name('export_excel.installment_wise_daily_collection');
    Route::get('/export/excel/fee-head-wise-daily-collection-report', [ExportExcelController::class, 'exportFeeHeadWiseDailyCollectionReport'])->name('export_excel.head_wise_daily_collection');
    Route::get('/export/excel/class-due-report', [ExportExcelController::class, 'exportClassDueReport'])->name('export_excel.class_due_report');
    Route::get('/export/excel/head-wise-outstanding-due-report', [ExportExcelController::class, 'exportHeadWiseOutstandingDueReport'])->name('export_excel.head_wise_outstanding_due_report');
    Route::get('/export/excel/installment-wise-outstanding-due-report', [ExportExcelController::class, 'exportInstallmentWiseOutstandingDueReport'])->name('export_excel.installment_wise_outstanding_due_report');
    Route::get('/export/excel/head-wise-daily-fee-summary-report', [ExportExcelController::class, 'exportHeadWiseDailyFeeSummaryReport'])->name('export_excel.head_wise_daily_fee_summary_report');
    Route::get('/export/excel/yearly-head-wise-paid-summary-report', [ExportExcelController::class, 'exportYearlyHeadWisePaidSummaryReport'])->name('export_excel.yearly_head_wise_paid_summary_report');
    Route::get('/export/excel/class-wise-fee-collection-report', [ExportExcelController::class, 'exportClassWiseFeeCollectionReport'])->name('export_excel.class_wise_fee_collection_report');
    Route::get('/export/excel/installment-wise-fee-collection-report', [ExportExcelController::class, 'exportInstallmentWiseFeeCollectionReport'])->name('export_excel.installment_wise_fee_collection_report');
    Route::get('/export/excel/complete-fee-paid-report', [ExportExcelController::class, 'exportCompleteFeePaidReport'])->name('export_excel.complete_fee_paid_report');
    Route::get('/export/excel/yearly-head-wise-due-report', [ExportExcelController::class, 'exportYearlyHeadWiseDueReport'])->name('export_excel.yearly_head_wise_due_report');
    Route::get('/export/excel/complete-outstanding-due-report', [ExportExcelController::class, 'exportCompleteOutstandingDueReport'])->name('export_excel.complete_outstanding_due_report');
    Route::get('/export/excel/consolidated-due-report', [ExportExcelController::class, 'exportConsolidatedDueReport'])->name('export_excel.consolidated_due_report');
    Route::get('/export/excel/class-wise-consolidated-due-report', [ExportExcelController::class, 'exportClassWiseConsolidatedDueReport'])->name('export_excel.class_wise_consolidated_due_report');
    Route::get('/export/excel/fee-student-followup-report', [ExportExcelController::class, 'exportFeeStudentFolowUpReport'])->name('export_excel.fee_student_followup_report');
    Route::get('/export/excel/student-payment-report', [ExportExcelController::class, 'exportStudentPaymentReport'])->name('export_excel.student_payment_report');
    Route::get('/export/excel/class-wise-fee-collection-summary', [ExportExcelController::class, 'exportClassWiseFeeCollectionSummary'])->name('export_excel.class_wise_fee_collection_summary');
    Route::get('/export/excel/installment-wise-fee-collection-summary', [ExportExcelController::class, 'exportInstallmentWiseFeeCollectionSummary'])->name('export_excel.installment_wise_fee_collection_summary');
    Route::get('/export/excel/fee-cancellation-report', [ExportExcelController::class, 'exportFeeCancellationReport'])->name('export_excel.fee_cancellation_report');
    Route::get('/export/excel/fee-summary-report', [ExportExcelController::class, 'exportFeeSummaryReport'])->name('export_excel.fee_summary_report');
    Route::get('/export/excel/special-fee-type-report', [ExportExcelController::class, 'exportSpecialFeeTypeReport'])->name('export_excel.special_fee_type_report');
    Route::get('/export/excel/guardian-wise-due-report', [ExportExcelController::class, 'exportGuardianWiseDueReport'])->name('export_excel.guardian_wise_due_report');

    // export student
    Route::get('/export/excel/class-wise-student-summary-report', [ExportExcelController::class, 'exportClassWiseStudentSummaryReport'])->name('export_excel.class_wise_student_summary_report');
    Route::get('/export/excel/classroom-wise-student-summary-report', [ExportExcelController::class, 'exportClassroomWiseStudentSummaryReport'])->name('export_excel.classroom_wise_student_summary_report');
    Route::get('/export/excel/class-wise-student-list-report', [ExportExcelController::class, 'exportClassWiseStudentListReport'])->name('export_excel.class_wise_student_list_report');
    Route::get('/export/excel/student-age-report', [ExportExcelController::class, 'exportStudentAgeReport'])->name('export_excel.student_age_report');
    Route::get('/export/excel/student-document-report', [ExportExcelController::class, 'exportStudentDocumentReport'])->name('export_excel.student_document_report');
    Route::get('/export/excel/class-wise-tc-report', [ExportExcelController::class, 'exportClassWiseTcReport'])->name('export_excel.class_wise_tc_report');
    Route::get('/export/excel/class-wise-student-tc-report', [ExportExcelController::class, 'exportClassWiseStudentTcReport'])->name('export_excel.class_wise_student_tc_report');
    Route::get('/export/excel/student-inactive-report', [ExportExcelController::class, 'exportStudentInactiveReport'])->name('export_excel.student_inactive_list');
    Route::get('/export/excel/promoted-student-report', [ExportExcelController::class, 'exportPromotedStudentReport'])->name('export_excel.promoted_student_report');
    Route::get('/export/excel/generated-tc-report', [ExportExcelController::class, 'exportGeneratedTcReport'])->name('export_excel.generated_tc_report');
    Route::get('/export/excel/student-details', [ExportExcelController::class, 'downloadStudentDetails'])->name('export_excel.student_details');
    Route::get('/export/excel/student-all-report', [ExportExcelController::class, 'downloadStudentGeneralReport'])->name('export_excel.student_all_report');
    Route::get('/export/excel/student-birth-date-wise-report', [ExportExcelController::class, 'downloadStudentBirthDateWiseReport'])->name('export_excel.student_birth_date_wise_report');
    Route::get('/export/excel/student-gender-report', [ExportExcelController::class, 'downloadStudentGenderReport'])->name('export_excel.student_gender_report');
    Route::get('/export/excel/student-contact-report', [ExportExcelController::class, 'downloadStudentContactReport'])->name('export_excel.student_contact_report');
    Route::get('/export/excel/student-address-report', [ExportExcelController::class, 'downloadStudentAddressReport'])->name('export_excel.student_address_report');
    Route::get('/export/excel/student-email-report', [ExportExcelController::class, 'downloadStudentEmailReport'])->name('export_excel.student_email_report');
    Route::get('/export/excel/student-religion-report', [ExportExcelController::class, 'downloadStudentReligionReport'])->name('export_excel.student_religion_report');
    Route::get('/export/excel/student-category-report', [ExportExcelController::class, 'downloadStudentCategoryReport'])->name('export_excel.student_category_report');
    Route::get('/export/excel/inactive-student-report', [ExportExcelController::class, 'downloadInactiveStudentReport'])->name('export_excel.inactive_student_report');
    Route::get('/export/excel/student-sibling-report', [ExportExcelController::class, 'downloadStudentSiblingReport'])->name('export_excel.student_sibling_report');
    Route::get('/export/excel/student-house-report', [ExportExcelController::class, 'downloadStudentHouseReport'])->name('export_excel.student_house_report');
    Route::get('/export/excel/new-student-report', [ExportExcelController::class, 'downloadNewStudentReport'])->name('export_excel.new_student_report');
    Route::get('/export/excel/old-student-report', [ExportExcelController::class, 'downloadOldStudentReport'])->name('export_excel.old_student_report');
    Route::get('/export/excel/student-employment-category-wise-report', [ExportExcelController::class, 'downloadStudentEmploymentCategoryWiseReport'])->name('export_excel.student_employment_category_wise_report');
    Route::get('/export/excel/student-boarding-type-report', [ExportExcelController::class, 'downloadStudentBoardingTypeReport'])->name('export_excel.student_boarding_type_report');
    Route::get('/export/excel/student-document-wise-report', [ExportExcelController::class, 'downloadStudentDocumentWiseReport'])->name('export_excel.student_document_wise_report');
    Route::get('/export/excel/student-with-transport-report', [ExportExcelController::class, 'downloadStudentWithTransportReport'])->name('export_excel.student_with_transport_report');
    Route::get('/export/excel/student-without-transport-report', [ExportExcelController::class, 'downloadStudentWithoutTransportReport'])->name('export_excel.student_without_transport_report');
    Route::get('/export/excel/student-gender-wise-summary-report', [ExportExcelController::class, 'downloadStudentGenderWiseSummaryReport'])->name('export_excel.student_gender_wise_summary_report');
    Route::get('/export/excel/student-religion-wise-summary-report', [ExportExcelController::class, 'downloadStudentReligionWiseSummaryReport'])->name('export_excel.student_religion_wise_summary_report');
    Route::get('/export/excel/student-category-wise-summary-report', [ExportExcelController::class, 'downloadStudentCategoryWiseSummaryReport'])->name('export_excel.student_category_wise_summary_report');
    Route::get('/export/excel/student-inactive-summary-report', [ExportExcelController::class, 'downloadStudentInactiveSummaryReport'])->name('export_excel.student_inactive_summary_report');
    Route::get('/export/excel/student-old-new-summary-report', [ExportExcelController::class, 'downloadStudentOldNewSummaryReport'])->name('export_excel.student_old_new_summary_report');
    Route::get('/export/excel/student-boarding-wise-summary-report', [ExportExcelController::class, 'downloadStudentBoardingWiseSummaryReport'])->name('export_excel.student_boarding_wise_summary_report');
    Route::get('/export/excel/today-attendance-taken-report', [ExportExcelController::class, 'exportTodayAttendanceTakenReport'])->name('export_excel.today_attendance_taken_report');
    Route::get('/export/excel/today-attendance-not-taken-report', [ExportExcelController::class, 'exportTodayAttendanceNotTakenReport'])->name('export_excel.today_attendance_not_taken_report');
    Route::get('/export/excel/month-wise-attendance-report', [ExportExcelController::class, 'exportMonthWiseAttendanceReport'])->name('export_excel.month_wise_attendance_report');
    Route::get('/export/excel/date-wise-class-attendance-report', [ExportExcelController::class, 'exportDateWiseClassAttendanceReport'])->name('export_excel.date_wise_class_attendance_report');
    Route::get('/export/excel/class-wise-daily-attendance-report', [ExportExcelController::class, 'exportClassWiseDailyAttendanceReport'])->name('export_excel.class_wise_daily_attendance_report');
    Route::get('/export/excel/masterclass-wise-daily-attendance-report', [ExportExcelController::class, 'exportMasterClassWiseDailyAttendanceReport'])->name('export_excel.masterclass_wise_daily_attendance_report');

    // export academic
    Route::get('/export/excel/exam-mark-import-template', [ExportExcelController::class, 'downloadExamMarkImportTemplate'])->name('export_excel.exam_mark_import_template');
    Route::get('/export/excel/subject-mark', [ExportExcelController::class, 'exportSubjectMarkReport'])->name('export_excel.subject_mark');
    Route::get('/export/excel/exam-group-report', [ExportExcelController::class, 'exportExamGroupReport'])->name('export_excel.exam_group');
    Route::get('/export/excel/exam-wise-report', [ExportExcelController::class, 'exportExamWiseReport'])->name('export_excel.exam_wise');
    Route::get('/export/excel/optional-subject-report', [ExportExcelController::class, 'exportOptionalSubjectReport'])->name('export_excel.optional_subject');
    Route::get('/export/excel/consolidated-report', [ExportExcelController::class, 'exportConsolidatedReport'])->name('export_excel.consolidated_report');
    Route::get('/export/excel/final-consolidated-report', [ExportExcelController::class, 'exportFinalConsolidatedReport'])->name('export_excel.final_consolidated_report');
    Route::get('/export/excel/subject-wise-report', [ExportExcelController::class, 'exportSubjectWiseReport'])->name('export_excel.subject_wise_report');

    // export admission
    Route::get('/export/excel/class-wise-registration-report', [ExportExcelController::class, 'exportClassWiseRegistrationReport'])->name('export_excel.class_wise_registration_report');
    Route::get('/export/excel/day-wise-registration-report', [ExportExcelController::class, 'exportDayWiseRegistrationReport'])->name('export_excel.day_wise_registration_report');
    Route::get('/export/excel/registration-daily-collection-report', [ExportExcelController::class, 'exportRegistrationDailyCollectionReport'])->name('export_excel.registration_daily_collection_report');
    Route::get('/export/excel/daily-admission-report', [ExportExcelController::class, 'exportDailyAdmissionReport'])->name('export_excel.daily_admission_report');
    Route::get('/export/excel/admission-exam-summary', [ExportExcelController::class, 'exportAdmissionExamSummary'])->name('export_excel.admission_exam_summary');
    Route::get('/export/excel/registration-exam-report', [ExportExcelController::class, 'exportRegistrationExamReport'])->name('export_excel.registration_exam_report');
    Route::get('/export/excel/registration-report', [ExportExcelController::class, 'exportRegistrationReport'])->name('export_excel.registration_report');

    // export staff
    Route::get('/export/excel/staff-attendance', [ExportExcelController::class, 'exportStaffAttendanceReport'])->name('export_excel.staff_attendance');
    Route::get('/export/excel/staff-leave-allocation', [ExportExcelController::class, 'exportStaffLeaveAllocation'])->name('export_excel.staff_leave_allocation');

    // export staff list
    Route::get('/export/excel/staff-list', [ExportExcelController::class, 'exportStaff'])->name('export_excel.staff_list');
    Route::get('/export/excel/inactive-staff-list', [ExportExcelController::class, 'exportInActiveStaff'])->name('export_excel.inactive_staff_list');

    // teacher panel student fee report
    Route::get('/export/excel/teacher/student-complete-fee-paid-report', [ExportExcelController::class, 'exportStudentCompleteFeePaidReport'])->name('export_excel.teacher.student_complete_fee_paid_report');
    Route::get('/export/excel/teacher/student-daily-collection-report', [ExportExcelController::class, 'exportStudentDailyCollectionReport'])->name('export_excel.teacher.student_daily_collection');
    Route::get('/export/excel/teacher/student-installment-wise-daily-collection-report', [ExportExcelController::class, 'exportStudentInstallmentWiseDailyCollectionReport'])->name('export_excel.teacher.student_installment_wise_daily_collection');
    Route::get('/export/excel/teacher/head-wise-student-due-report', [ExportExcelController::class, 'exportHeadWiseStudentDueReport'])->name('export_excel.teacher.head_wise_student_due_report');
    Route::get('/export/excel/teacher/installment-wise-student-due-report', [ExportExcelController::class, 'exportInstallmentWiseStudentDueReport'])->name('export_excel.teacher.installment_wise_student_due_report');

    // teacher panel survey
    Route::get('/export/excel/teacher/survey-response/{id}', [ExportExcelController::class, 'exportSurveyResponseReport'])->name('export_excel.teacher.survey_response_report');

    //document report
    Route::get('/export/excel/document/student-class-wise-report', [ExportExcelController::class, 'exportStudentClassWiseDocumentReport'])->name('export_excel.document.student_class_wise_report');

    //account report
    Route::get('/export/excel/inventory/ledger-payment-report', [ExportExcelController::class, 'exportLedgerPaymentReport'])->name('export_excel.inventory.ledger_payment_report');
    Route::get('/export/excel/inventory/ledger-report', [ExportExcelController::class, 'exportLedgerReport'])->name('export_excel.inventory.ledger_report');
    Route::get('/export/excel/inventory/sale-return-report', [ExportExcelController::class, 'exportSaleReturnReport'])->name('export_excel.inventory.sale_return_report');
    Route::get('/export/excel/inventory/ledger-receipt-report', [ExportExcelController::class, 'exportLedgerReceiptReport'])->name('export_excel.inventory.ledger_receipt_report');
    Route::get('/export/excel/inventory/head-wise-payment-report', [ExportExcelController::class, 'exportHeadWisePaymentReport'])->name('export_excel.inventory.head_wise_payment_report');
    Route::get('/export/excel/inventory/day-book-report', [ExportExcelController::class, 'exportDayBookReport'])->name('export_excel.inventory.day_book_report');
    Route::get('/export/excel/inventory/purchase-report', [ExportExcelController::class, 'exportPurchaseReport'])->name('export_excel.inventory.purchase_report');
    Route::get('/export/excel/inventory/sale-ledger-report', [ExportExcelController::class, 'exportSaleLedgerReport'])->name('export_excel.inventory.sale_ledger_report');
    Route::get('/export/excel/inventory/product-report', [ExportExcelController::class, 'exportProductReport'])->name('export_excel.inventory.product_report');
    Route::get('/export/excel/inventory/product-purchase-report', [ExportExcelController::class, 'exportProductPurchaseReport'])->name('export_excel.inventory.product_purchase_report');
    Route::get('/export/excel/inventory/product-sale-report', [ExportExcelController::class, 'exportProductSaleReport'])->name('export_excel.inventory.product_sale_report');
    Route::get('/export/excel/inventory/download-product-import-temaplte', [ExportExcelController::class, 'downloadProductImportTemplate'])->name('export_excel.inventory.product_import_template');
    Route::get('/export/excel/inventory/product-location-report', [ExportExcelController::class, 'exportProductLocationReport'])->name('export_excel.inventory.product_location_report');
    Route::get('/export/excel/inventory/journal-report', [ExportExcelController::class, 'exportJournalReport'])->name('export_excel.inventory.journal_report');

    // virtual exam
    Route::get('/export/excel/online-exam/download-question-import-temaplte', [ExportExcelController::class, 'downloadQuestionImportTemplate'])->name('export_excel.online_exam.question_import_template');
    Route::get('/export/excel/online-exam/exam-summary-report', [ExportExcelController::class, 'exportVirtualExamSummaryReport'])->name('export_excel.online_exam.exam_summary_report');

    // salary
    Route::get('/export/excel/salary/download-salary-import-temaplte', [ExportExcelController::class, 'downloadStaffSalaryImportTemplate'])->name('export_excel.salary.staff_salary_import_template');
    Route::get('/export/excel/salary/staff-bank-statement', [ExportExcelController::class, 'exportStaffBankStatement'])->name('export_excel.salary.staff_bank_statement');
    Route::get('/export/excel/salary/canceled-report', [ExportExcelController::class, 'exportStaffCanceledSalaryReport'])->name('export_excel.salary.canceled_report');
    Route::get('/export/excel/salary/epf-wage-report', [ExportExcelController::class, 'exportStaffEpfWageReport'])->name('export_excel.salary.epf_wage_report');
    Route::get('/export/excel/salary/pf-report', [ExportExcelController::class, 'exportStaffSalaryPfReport'])->name('export_excel.salary.pf_report');
    Route::get('/export/excel/salary/basic-salary-report', [ExportExcelController::class, 'exportBasicSalaryReport'])->name('export_excel.salary.basic_salary_report');
    Route::get('/export/excel/salary/salary-payment-report', [ExportExcelController::class, 'exportSalaryPaymentReport'])->name('export_excel.salary.salary_payment_report');

    // calendar
    Route::get('/export/excel/calendar-list', [ExportExcelController::class, 'exportCalendarList'])->name('export_excel.calendar_list');

    //
    Route::get('/export/excel/visitor-enquiry-report', [ExportExcelController::class, 'exportVisitorEnquiryReport'])->name('export_excel.visitor_enquiry_report');

    // document
    Route::get('/export/excel/school-document-report', [ExportExcelController::class, 'exportSchoolDocumentReport'])->name('export_excel.school_document_report');

    // timetable
    Route::get('/export/excel/vacant-teacher-report', [ExportExcelController::class, 'exportVacantTeacherReport'])->name('export_excel.vacant_teacher_report');
    Route::get('/export/excel/timetable-allotment-report', [ExportExcelController::class, 'exportTimetableAllotmentReport'])->name('export_excel.timetable_allotment_report');

    // transport
    Route::get('/export/excel/transport/route-summary-report', [ExportExcelController::class, 'exportRouteSummaryReport'])->name('export_excel.transport.route_summary_report');
    Route::get('/export/excel/transport/student-route-report', [ExportExcelController::class, 'exportStudentRouteReport'])->name('export_excel.transport.student_route_report');
    Route::get('/export/excel/transport/stoppage-summary-report', [ExportExcelController::class, 'exportStoppageSummaryReport'])->name('export_excel.transport.stoppage_summary_report');
    Route::get('/export/excel/transport/student-stoppage-report', [ExportExcelController::class, 'exportStudentStoppageReport'])->name('export_excel.transport.student_stoppage_report');
    Route::get('/export/excel/transport/area-summary-report', [ExportExcelController::class, 'exportAreaSummaryReport'])->name('export_excel.transport.area_summary_report');
    Route::get('/export/excel/transport/student-area-report', [ExportExcelController::class, 'exportStudentAreaReport'])->name('export_excel.transport.student_area_report');


    // online exam
    Route::get('/online-exam', [OnlineExamController::class, 'index'])->name('online_exam.index');
    Route::match(['GET', 'POST'], '/online-exam/assets', [OnlineExamController::class, 'assetList'])->name('online_exam.asset_list');
    Route::post('/online-exam/asset/save', [OnlineExamController::class, 'saveAsset'])->name('online_exam.save_asset');
    Route::match(['GET', 'POST'], '/online-exam/asset/create', [OnlineExamController::class, 'createAsset'])->name('online_exam.create_asset');
    Route::match(['GET', 'POST'], '/online-exam/asset/edit', [OnlineExamController::class, 'editAsset'])->name('online_exam.edit_asset');
    Route::put('/online-exam/asset/update/{id}', [OnlineExamController::class, 'updateAsset'])->name('online_exam.update_asset');
    Route::patch('/online-exam/asset/update-publish-status/{id}', [OnlineExamController::class, 'updateAssetPublishStatus'])->name('online_exam.update_asset_publish_status');
    Route::delete('/online-exam/asset/delete/{id}', [OnlineExamController::class, 'deleteAsset'])->name('online_exam.delete_asset');
    Route::match(['GET', 'POST'], '/online-exam/questions', [OnlineExamController::class, 'questionList'])->name('online_exam.question_list');
    Route::get('/online-exam/question/preview/{id}', [OnlineExamController::class, 'previewQuestion'])->name('online_exam.preview_question');
    Route::match(['GET', 'POST'], '/online-exam/question/create', [OnlineExamController::class, 'createQuestion'])->name('online_exam.create_question');
    Route::post('/online-exam/question/save', [OnlineExamController::class, 'saveQuestion'])->name('online_exam.save_question');
    Route::get('/online-exam/question/edit/{id}', [OnlineExamController::class, 'editQuestion'])->name('online_exam.edit_question');
    Route::put('/online-exam/question/update/{id}', [OnlineExamController::class, 'updateQuestion'])->name('online_exam.update_question');
    Route::patch('/online-exam/question/update-publish-status/{id}', [OnlineExamController::class, 'updateQuestionPublishStatus'])->name('online_exam.update_question_publish_status');
    Route::put('/online-exam/question/update-bulk-status', [OnlineExamController::class, 'updateBulkQuestionStatus'])->name('online_exam.update_bulk_question_status');
    Route::delete('/online-exam/question/delete/{id}', [OnlineExamController::class, 'deleteQuestion'])->name('online_exam.delete_question');
    Route::match(['GET', 'POST'], '/online-exam/question/import', [OnlineExamController::class, 'importQuestion'])->name('online_exam.import_question');
    Route::match(['GET', 'POST'], '/online-exam/exams', [OnlineExamController::class, 'examList'])->name('online_exam.exam_list');
    Route::get('/online-exam/exam/details/{id}', [OnlineExamController::class, 'examDetails'])->name('online_exam.exam_details');
    Route::match(['GET', 'POST'], '/online-exam/exam/create', [OnlineExamController::class, 'createExam'])->name('online_exam.create_exam');
    Route::post('/online-exam/exam/save', [OnlineExamController::class, 'saveExam'])->name('online_exam.save_exam');
    Route::put('/online-exam/exam/update/{id}', [OnlineExamController::class, 'updateExam'])->name('online_exam.update_exam');
    Route::patch('/online-exam/exam/publish/{id}', [OnlineExamController::class, 'publishExam'])->name('online_exam.publish_exam');
    Route::delete('/online-exam/exam/delete/{id}', [OnlineExamController::class, 'deleteVirtualExam'])->name('online_exam.delete_exam');
    Route::match(['GET', 'POST'], '/online-exam/exam/assign-question/{virtualExamId}', [OnlineExamController::class, 'assignExamQuestion'])->name('online_exam.assign_exam_question');
    Route::put('/online-exam/exam/assign-question/save/{virtualExamId}', [OnlineExamController::class, 'saveAssignExamQuestion'])->name('online_exam.save_assign_exam_question');
    Route::get('/online-exam/exam/assign-grade/{virtualExamId}', [OnlineExamController::class, 'assignExamGrade'])->name('online_exam.assign_exam_grade');
    Route::put('/online-exam/exam/assign-grade/save/{virtualExamId}', [OnlineExamController::class, 'saveAssignExamGrade'])->name('online_exam.save_assign_exam_grade');
    Route::get('/online-exam/exam/finished/{virtualExamId}', [OnlineExamController::class, 'examFinished'])->name('online_exam.exam_finished');
    Route::match(['GET', 'POST'], '/online-exam/exam-schedules', [OnlineExamController::class, 'examSchedules'])->name('online_exam.exam_schedule');
    Route::match(['GET', 'POST'], '/online-exam/question-bank', [OnlineExamController::class, 'questionBank'])->name('online_exam.question_bank');
    Route::post('/online-exam/question-bank/save', [OnlineExamController::class, 'saveQuestionBank'])->name('online_exam.save_question_bank');
    Route::put('/online-exam/question-bank/update/{id}', [OnlineExamController::class, 'updateQuestionBank'])->name('online_exam.update_question_bank');
    Route::delete('/online-exam/question-bank/delete/{id}', [OnlineExamController::class, 'deleteQuestionBank'])->name('online_exam.destroy_question_bank');

    //student online exam
    Route::match(['GET', 'POST'], '/student/online-exam', [StudentOnlineExamController::class, 'index'])->name('student_online_exam.index');
    Route::get('/student/online-exam/attempted-exam', [StudentOnlineExamController::class, 'attemptedExam'])->name('student_online_exam.attempted_exam');
    Route::get('/student/online-exam/unattempted-exam', [StudentOnlineExamController::class, 'unattemptedExam'])->name('student_online_exam.unattempted_exam');

    // student attempted exam
    Route::match(['GET', 'POST'], '/student/online-exam/{examId}/attempte/{studentId}', [StudentOnlineExamController::class, 'studentOnlineExamAttempted'])->name('student_online_exam.attempted_exam_take');
    Route::post('/student/online-exam/store', [StudentOnlineExamController::class, 'store'])->name('student_online_exam.store');

    // pdf question bank
    Route::get('/online-exam/preview-questionbank-question-paper/export/pdf', [PdfExamController::class, 'previewOnlineExamQuestionBankQuestions'])->name('pdf_generator.preview_questionbank_online_exam_question');
    Route::get('/online-exam/download-questionbank-question-paper/export/pdf', [PdfExamController::class, 'downloadOnlineExamQuestionBankQuestions'])->name('pdf_generator.download_questionbank_online_exam_question');

    Route::get('/online-exam/question-bank/assign-question/{id}', [OnlineExamController::class, 'assignQuestionBankQuestion'])->name('online_exam.assign_question_bank_question');
    Route::put('/online-exam/question-bank/assign-question/update/{id}', [OnlineExamController::class, 'updateQuestionBankQuestions'])->name('online_exam.update_question_bank_question');
    Route::match(['GET', 'POST'], '/online-exam/buy-question', [OnlineExamController::class, 'buyQuestion'])->name('online_exam.buy_question');

    //online exam report
    Route::get('/online-exam/report/live-exam', [OnlineExamReportController::class, 'liveExam'])->name('online_exam_report.live_exam');
    Route::get('/online-exam/report/taken-exam', [OnlineExamReportController::class, 'takenExam'])->name('online_exam_report.taken_exam');
    Route::get('/online-exam/report/export-exam-marks', [OnlineExamReportController::class, 'exportExamMarks'])->name('online_exam_report.export_exam_mark');
    Route::match(['GET', 'POST'], '/online-exam/report/exam-summary', [OnlineExamReportController::class, 'examSummary'])->name('online_exam_report.exam_summary');

    /***
     * Student Panel Route
     */
    Route::get('/student/profile/details', [StudentProfileController::class, 'details'])->name('student_profile.details');
    Route::get('/student/profile/edit', [StudentProfileController::class, 'edit'])->name('student_profile.edit');
    Route::put('/student/profile/update', [StudentProfileController::class, 'update'])->name('student_profile.update');

    /***
     * Parent Panel Route
     */
    Route::get('/parent/profile', [ParentProfileController::class, 'edit'])->name('parent_profile.edit');
    Route::put('/parent/profile/update', [ParentProfileController::class, 'update'])->name('parent_profile.update');
    Route::post('/update-session-student-id', [ParentProfileController::class, 'updateSessionStudentId'])->name('parent_profile.update_session_student_id');

    /***
     * Teacher Panel Route
     */
    Route::get('/teacher/manage-students', [TeacherDashboardController::class, 'indexManageStudent'])->name('teacher_dashboard.manage_student_menu');
    Route::get('/teacher/classroom', [TeacherClassroomController::class, 'indexClassroom'])->name('teacher_classroom.index_classroom');
    Route::get('/teacher/teaching-progress', [TeacherClassroomController::class, 'teachingProgress'])->name('teacher_classroom.teaching_progress');
    Route::get('/teacher/academics', [TeacherAcademicController::class, 'indexAcademic'])->name('teacher_academic.index_academic');

    // parent Panel Route
    Route::get('/parent/academics', [ParentAcademicController::class, 'indexAcademic'])->name('parent_academic.index_academic');

    // class online
    Route::match(['GET', 'POST'], '/online-classes', [ClassOnlineController::class, 'index'])->name('online_class.list');
    Route::match(['GET', 'POST'], '/online-class/today', [ClassOnlineController::class, 'showToday'])->name('online_class.list_today');
    Route::match(['GET', 'POST'], '/online-class/create', [ClassOnlineController::class, 'create'])->name('online_class.create');
    Route::post('/online-class/save', [ClassOnlineController::class, 'save'])->name('online_class.save');
    Route::get('/online-class/assign-teacher', [ClassOnlineController::class, 'assignClassTeacher'])->name('online_class.assign_teacher');
    Route::post('/online-class/save-teacher', [ClassOnlineController::class, 'saveClassTeacher'])->name('online_class.save_teacher');
    Route::match(['GET', 'POST'], '/online-class/edit/{id}', [ClassOnlineController::class, 'edit'])->name('online_class.edit');
    Route::put('/online-class/update/{id}', [ClassOnlineController::class, 'update'])->name('online_class.update');
    Route::delete('/online-class/delete/{id}', [ClassOnlineController::class, 'destroy'])->name('online_class.destroy');

    // online attendance
    Route::match(['GET', 'POST'], '/teacher/online-class/attendance', [ClassOnlineController::class, 'onlineClassAttendance'])->name('online_class.attendance');
    Route::post('/teacher/online-class/attendance/save', [ClassOnlineController::class, 'saveOnlineClassAttendance'])->name('online_class.save_attendance');

    // classroom discussions
    Route::match(['GET', 'POST'], '/class-discussions', [ClassroomDiscussionController::class, 'index'])->name('classroom_discussion.list');
    Route::post('/class-discussion/save', [ClassroomDiscussionController::class, 'save'])->name('classroom_discussion.save');
    Route::patch('/class-discussion/update/{id}', [ClassroomDiscussionController::class, 'update'])->name('classroom_discussion.update');
    Route::delete('/class-discussion/delete/{id}', [ClassroomDiscussionController::class, 'destroy'])->name('classroom_discussion.destroy');

    // teacher courses
    Route::match(['GET', 'POST'], '/teacher/courses', [TeacherCourseController::class, 'index'])->name('teacher_course.list');

    // teacher report
    Route::get('/teacher/class-report', [TeacherReportController::class, 'classReport'])->name('teacher_report.class_report');
    Route::get('/teacher/class-summary-report', [TeacherReportController::class, 'classSummaryReport'])->name('teacher_report.class_summary_report');
    Route::get('/teacher/student-teacher-report', [TeacherReportController::class, 'studentTeacherReport'])->name('teacher_report.student_teacher_report');

    // timetable
    Route::match(['GET', 'POST'], '/teacher/class-timetable', [ClassroomController::class, 'viewClassTimetable'])->name('teacher.view_class_timetable');
    Route::match(['GET', 'POST'], '/teacher/teacher-timetable', [ClassroomController::class, 'viewTeacherTimetable'])->name('teacher.view_teacher_timetable');

    // Razorpay payment
    Route::post('/razorpay/payment/process', [RazorpayController::class, 'processPayment'])->name('razorpay.process_payment');
    Route::post('/razorpay/payment/callback', [RazorpayController::class, 'paymentCallback'])->name('razorpay.payment_callback');
    Route::match(['GET', 'POST'], '/razorpay/payment', [RazorpayController::class, 'testForm'])->name('razorpay.test_form');
    Route::post('/razorpay/payment/submission', [RazorpayController::class, 'returnSubmission'])->name('razorpay.payment_submission');

    // paytm payment
    Route::match(['GET', 'POST'], '/paytm/payment/form', [PaytmController::class, 'payForm'])->name('paytm.payment_form');
    Route::post('/paytm/payment', [PaytmController::class, 'pay'])->name('paytm.payment');
    Route::post('/paytm/redirect', [PaytmController::class, 'paymentCallback'])->name('paytm.payment_callback');
});

Route::middleware('guest')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home.index');
});

// Privacy Policy
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'indexPrivacy'])->name('privacy_policy.index');
Route::get('/terms', [PrivacyPolicyController::class, 'termUse'])->name('privacy_policy.terms');
Route::get('/about', [PrivacyPolicyController::class, 'about'])->name('privacy_policy.about');

//Support
Route::get('/support/ticket/student-parents-support', [SupportTicketController::class, 'studentParentsSupportPage'])->name('support_ticket.student_parents_support');
Route::get('/enquiry/form', [SupportTicketController::class, 'enquiryForm'])->name('support_ticket.enquiry_form');
Route::get('/parent/feedback', [SupportTicketController::class, 'parentFeedback'])->name('support_ticket.parent_feedback');
Route::get('/login/request', [SupportTicketController::class, 'loginRequest'])->name('support_ticket.login_request');
Route::post('/login/request/save', [SupportTicketController::class, 'loginRequestSave'])->name('support_ticket.login_request.save');
Route::get('/support/contactus', [SupportTicketController::class, 'contactUs'])->name('support_ticket.contactus');
Route::post('/support/contactus/save', [SupportTicketController::class, 'contactUsSave'])->name('support_ticket.contactus.save');
Route::post('/parent/feedback/save', [SupportTicketController::class, 'parentFeedbackSave'])->name('support_ticket.parent_feedback.save');


//Static Pages
Route::get('/contactus', [FrontendPagesController::class, 'contact'])->name('front_page.contactus');
Route::get('/aboutus', [FrontendPagesController::class, 'about'])->name('front_page.about');
Route::get('/privacypolicy', [FrontendPagesController::class, 'privacyPolicy'])->name('front_page.privacy_policy');
Route::get('/termsconditions', [FrontendPagesController::class, 'term'])->name('front_page.term');
Route::get('/refundpolicy', [FrontendPagesController::class, 'cancellation'])->name('front_page.cancellation');
// Fee Online Payment
Route::get('/payment', [FeeOnlinePaymentController::class, 'index'])->name('fee_online_payment.index');
Route::match(['GET', 'POST'], '/student-fee-online-payment', [FeeOnlinePaymentController::class, 'studentFeeOnlinePayment'])->name('fee_online_payment.student_fee');

Route::put('/profile/update', [ProfileUpdateController::class, 'update'])->name('profile.update');


require __DIR__ . '/auth.php';
