<?php

use App\Http\Controllers\Api\V1\AcademicReportApiController;
use App\Http\Controllers\Api\V1\AccountApiController;
use App\Http\Controllers\Api\V1\AdmissionApiController;
use App\Http\Controllers\Api\V1\AssessmentApiController;
use App\Http\Controllers\Api\V1\AssetApiController;
use App\Http\Controllers\Api\V1\AttendanceStudentApiController;
use App\Http\Controllers\Api\V1\AttendanceTeacherApiController;
use App\Http\Controllers\Api\V1\Auth\LoginApiController;
use App\Http\Controllers\Api\V1\Auth\RegisterApiController;
use App\Http\Controllers\Api\V1\Auth\ResetPasswordApiController;
use App\Http\Controllers\Api\V1\BankApiController;
use App\Http\Controllers\Api\V1\ChatApiController;
use App\Http\Controllers\Api\V1\ClassNameApiController;
use App\Http\Controllers\Api\V1\ClassOnlineApiController;
use App\Http\Controllers\Api\V1\ClassroomApiController;
use App\Http\Controllers\Api\V1\ClassworkApiController;
use App\Http\Controllers\Api\V1\DriverApiController;
use App\Http\Controllers\Api\V1\EnumApiController;
use App\Http\Controllers\Api\V1\EventApiController;
use App\Http\Controllers\Api\V1\EventCalendarApiController;
use App\Http\Controllers\Api\V1\ExamApiController;
use App\Http\Controllers\Api\V1\FeeApiController;
use App\Http\Controllers\Api\V1\HolidayApiController;
use App\Http\Controllers\Api\V1\HomeworkApiController;
use App\Http\Controllers\Api\V1\HouseApiController;
use App\Http\Controllers\Api\V1\ImageApiController;
use App\Http\Controllers\Api\V1\LearningMaterialApiController;
use App\Http\Controllers\Api\V1\LeaveApiController;
use App\Http\Controllers\Api\V1\MessageTextLocalApiController;
use App\Http\Controllers\Api\V1\NewsApiController;
use App\Http\Controllers\Api\V1\NoticeApiController;
use App\Http\Controllers\Api\V1\OnlineQuestionApiController;
use App\Http\Controllers\Api\V1\SchoolApiController;
use App\Http\Controllers\Api\V1\SchoolShiftApiController;
use App\Http\Controllers\Api\V1\SettingApiController;
use App\Http\Controllers\Api\V1\StaffApiController;
use App\Http\Controllers\Api\V1\StateApiController;
use App\Http\Controllers\Api\V1\StudentApiController;
use App\Http\Controllers\Api\V1\SyllabusApiController;
use App\Http\Controllers\Api\V1\TransportApiController;
use App\Http\Controllers\Api\V1\UserApiController;
use App\Http\Controllers\Api\V1\VirtualExamApiController;
use App\Http\Controllers\Api\V1\WebmessageApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/v1')->group(function () {
    /** ======================================================
     *      1. User Routes
     * ====================================================== */
    Route::prefix('/users')->group(function () {
        /* Login route */
        Route::post('/login', [LoginApiController::class, 'store'])->name("users.login");
        Route::post('/register', [RegisterApiController::class, 'saveUser'])->name("users.register");
       // Route::post('/order-with-register', [RegisterController::class, 'saveUserAndOrder'])->name("users.order_with_register");
       // Route::post('/check-email', [ResetPasswordController::class, 'setCode'])->name("users.check_email");
       // Route::post('/reset-password', [ResetPasswordApiController::class, 'resetPassword'])->name("users.reset_password");
        Route::post('/admin/reset-password', [ResetPasswordApiController::class, 'resetPasswordAdmin'])->name("users.reset_password_admin");
    });

    /** ======================================================
     *      2. Schools Routes
     * ====================================================== */
    Route::group(["prefix" => "schools","as" => "schools."], function () {
        Route::get('/all', [ SchoolApiController::class, 'indexSchool']);
        Route::get('/byschoolkey', [ SchoolApiController::class, 'schoolByKey']);
        Route::get('/academic-years', [ SchoolApiController::class, 'schoolAcademicYears']);
        Route::get('/registration/selects', [ SchoolApiController::class, 'schoolRegistrationsSelects']);
    });

    /** ======================================================
     *      2. Bank Routes
     * ====================================================== */
    Route::group(["prefix" => "banks","as" => "banks."], function () {
        Route::get('/all', [ BankApiController::class, 'indexBank']);
    });

    /** ======================================================
     *      2. Enum Routes
     * ====================================================== */
    Route::group(["prefix" => "enum","as" => "enum."], function () {
        Route::get('/all', [ EnumApiController::class, 'indexEnum']);
    });

    /** ======================================================
     *      2. Enum Routes
     * ====================================================== */
    Route::group(["prefix" => "settings","as" => "settings."], function () {
        Route::get('/all', [ SettingApiController::class, 'indexSetting']);
    });

    /** ======================================================
     *      2. Enum Routes
     * ====================================================== */
    Route::group(["prefix" => "chat","as" => "chat."], function () {
        Route::post('/classrooms', [ ChatApiController::class, 'saveChatMessage']);
    });

    /** ======================================================
     *      2. House Routes
     * ====================================================== */
    Route::group(["prefix" => "houses","as" => "houses."], function () {
        Route::get('/all', [ HouseApiController::class, 'indexHouse']);
    });

    /** ======================================================
     *      3. States Routes
     * ====================================================== */
    Route::group(["prefix" => "states","as" => "states."], function () {
        Route::get('/all', [ StateApiController::class, 'indexState']);
        Route::get('/cities', [ StateApiController::class, 'cities']);
    });

    /** ======================================================
     *      3. Textlocal SMS Integration
     * ====================================================== */
    Route::group(["prefix" => "sms","as" => "sms."], function () { 
        Route::get('/send/raw', [ MessageTextLocalApiController::class, 'sendSmsRaw']);
        Route::get('/send', [ MessageTextLocalApiController::class, 'sendSms']);
    });


    

    /** ======================================================
     *      4. Auth Routes
     * ====================================================== */
    Route::middleware('auth:sanctum')->group(function () {
        /* auth:sanctum user routes */
        Route::prefix('/users')->group(function () {
            Route::put('/update/me', [UserApiController::class, 'updateMe']);
            Route::get('/me', [UserApiController::class, 'me']);
            // Route::get('/courses', [UserController::class, 'getAuthUserCourses']);
            // Route::get('/wishlist', [UserController::class, 'getAuthUserWishlist']);
            // Route::get('/wishlist-save', [UserController::class, 'saveAuthUserWishlist']);
        });
    
        
        /** ======================================================
         *      5. Fees Routes
         * ====================================================== */
        Route::group(["prefix" => "fees","as" => "fees."], function () {
            Route::get('/mis-report', [ FeeApiController::class, 'misReport']);
            Route::get('/daily-collection/student-wise', [ FeeApiController::class, 'studentWiseDailyCollection']);
            Route::get('/monthly-collection/student-wise', [ FeeApiController::class, 'studentWiseMonthlyCollection']);
            Route::get('/daily-collection/head-wise', [ FeeApiController::class, 'headWiseDailyCollection']);
            Route::get('/summary/class-wise', [ FeeApiController::class, 'classWiseSummary']);
            Route::get('/due/class-wise-report', [ FeeApiController::class, 'classWiseDueReport']);
            Route::get('/installments-fees', [ FeeApiController::class, 'installmentFees']);
            Route::get('/due/student-wise-report', [ FeeApiController::class, 'studentWiseDueReport']);
            Route::get('/auth-student/due-installments', [ FeeApiController::class, 'studentDueInstallment']);
            Route::get('/auth-student/paid-installments', [ FeeApiController::class, 'studentPaidInstallment']);
        });

        /** ======================================================
         *      6. Attendances Routes
         * ====================================================== */
        Route::group(["prefix" => "attendances","as" => "attendances."], function () {
            //students
            Route::get('/student/check', [ AttendanceStudentApiController::class, 'checkStudentAttendance']);
            Route::post('/student/take', [ AttendanceStudentApiController::class, 'takeStudent']);
            Route::get('/student/month-wise-report', [ AttendanceStudentApiController::class, 'monthWiseStudentReport']);
            Route::get('/student/month-wise-days-report', [ AttendanceStudentApiController::class, 'monthWiseDaysReport']);
            Route::get('/student/student-wise-report', [ AttendanceStudentApiController::class, 'studentWiseReport']);
            Route::get('/student/day-wise-report', [ AttendanceStudentApiController::class, 'dayWiseStudentReport']);
            //teachers
            Route::get('/staff/check', [ AttendanceTeacherApiController::class, 'checkAttendance']);
            Route::post('/staff/take', [ AttendanceTeacherApiController::class, 'takeStaff']);
            Route::get('/staff/month-wise-report', [ AttendanceTeacherApiController::class, 'monthWiseReport']);
            Route::get('/staff/extra-wise-report', [ AttendanceTeacherApiController::class, 'extraWiseReport']);
            Route::get('/staff/staff-wise-report', [ AttendanceTeacherApiController::class, 'staffWiseReport']);
            Route::get('/staff/staff-outdoor-report', [ AttendanceTeacherApiController::class, 'staffOutdoorReport']);
            Route::get('/staff/day-wise-report', [ AttendanceTeacherApiController::class, 'dayWiseStaffReport']);
        });

        /** ======================================================
         *      7. Classes Routes
         * ====================================================== */
        Route::group(["prefix" => "classes","as" => "classes."], function () {
            Route::get('/all', [ ClassNameApiController::class, 'indexClassName']);
            Route::get('/subjects', [ ClassNameApiController::class, 'subjects']);
        });


        /** ======================================================
         *      8. Classrooms Routes
         * ====================================================== */
        Route::group(["prefix" => "classrooms","as" => "classrooms."], function () {
            Route::get('/all', [ ClassroomApiController::class, 'indexClassroom']);
            Route::get('/subjects', [ ClassroomApiController::class, 'subjectsClassroom']);
            Route::get('/list', [ ClassroomApiController::class, 'classroomList']);
            Route::get('/students', [ ClassroomApiController::class, 'classroomStudents']);
            Route::post('/student/status/save', [ ClassroomApiController::class, 'saveStudentStatus']);
        });

        /** ======================================================
         *      9. Classworks Routes
         * ====================================================== */
        Route::group(["prefix" => "classworks","as" => "classworks."], function () {
            Route::get('/all', [ ClassworkApiController::class, 'indexClasswork']);
            Route::post('/create', [ ClassworkApiController::class, 'createClasswork']);
            Route::put('/update/{id}', [ ClassworkApiController::class, 'updateClasswork']);
            Route::delete('/delete/{id}', [ ClassworkApiController::class, 'deleteClasswork']);
            Route::get('/show/{id}', [ ClassworkApiController::class, 'showClasswork']);
            Route::get('/student/submission', [ ClassworkApiController::class, 'studentClassworkSubmission']);
            Route::post('/students/status/change', [ ClassworkApiController::class, 'changeClassworkStudentsStatus']);
            Route::post('/student/submit', [ ClassworkApiController::class, 'submitStudentClasswork']);
            Route::get('/student/view', [ ClassworkApiController::class, 'viewStudentClasswork']);
            Route::get('/student/comments', [ ClassworkApiController::class, 'viewStudentComments']);
            Route::delete('/student/comment/delete/{id}', [ ClassworkApiController::class, 'deleteClassworkComment']);
        });

        /** ======================================================
         *      10. Homework Routes
         * ====================================================== */
        Route::group(["prefix" => "homeworks","as" => "homeworks."], function () {
            Route::get('/all', [ HomeworkApiController::class, 'indexHomework']);
            Route::post('/create', [ HomeworkApiController::class, 'createHomework']);
            Route::put('/update/{id}', [ HomeworkApiController::class, 'updateHomework']);
            Route::delete('/delete/{id}', [ HomeworkApiController::class, 'deleteHomework']);
            Route::get('/show/{id}', [ HomeworkApiController::class, 'showHomework']);
            Route::get('/student/submission', [ HomeworkApiController::class, 'studentSubmission']);
            Route::post('/students/status/change', [ HomeworkApiController::class, 'changeStudentsStatus']);
            Route::post('/student/submit', [ HomeworkApiController::class, 'submitStudentHomework']);
            Route::get('/student/view', [ HomeworkApiController::class, 'viewStudentHomework']);
            Route::get('/student/comments', [ HomeworkApiController::class, 'viewStudentComments']);
            Route::delete('/student/comment/delete/{id}', [ HomeworkApiController::class, 'deleteHomeworkComments']);
        });

        /** ======================================================
         *      10. Assessment Routes
         * ====================================================== */
        Route::group(["prefix" => "assessments","as" => "assessments."], function () {
            Route::get('/all', [ AssessmentApiController::class, 'indexAssessment']);
            Route::post('/create', [ AssessmentApiController::class, 'createAssessment']);
            Route::put('/update/{id}', [ AssessmentApiController::class, 'updateAssessment']);
            Route::delete('/delete/{id}', [ AssessmentApiController::class, 'deleteAssessment']);
            Route::get('/show/{id}', [ AssessmentApiController::class, 'showAssessment']);
            Route::get('/student/submission', [ AssessmentApiController::class, 'studentSubmission']);
            Route::post('/students/status/change', [ AssessmentApiController::class, 'changeStudentsStatus']);
            Route::post('/student/submit', [ AssessmentApiController::class, 'submitStudentAssessment']);
            Route::get('/student/view', [ AssessmentApiController::class, 'viewStudentAssessment']);
            Route::get('/student/comments', [ AssessmentApiController::class, 'viewStudentComments']);
            Route::delete('/student/comment/delete/{id}', [ AssessmentApiController::class, 'deleteAssessmentComments']);
        });

        /** ======================================================
         *      11. Students Routes
         * ====================================================== */
        Route::group(["prefix" => "students","as" => "students."], function () {
            Route::get('/show/{id}', [ StudentApiController::class, 'showStudent']);
            Route::get('/all', [ StudentApiController::class, 'indexStudent']); 
            Route::get('/next/adn-no', [ StudentApiController::class, 'getNextAdnNo']); 
            Route::get('/create', [ StudentApiController::class, 'createStudent']); 
            Route::post('/save', [ StudentApiController::class, 'saveStudent']);
            Route::put('/update/{id}', [ StudentApiController::class, 'updateStudent']);
            Route::get('/classroom-subject-exam', [ StudentApiController::class, 'studentsByClassroomStudentExamId']);
            Route::get('/ranks', [ StudentApiController::class, 'studentsRankByClassroomExamId']);
        });

        /** ======================================================
         *      12. Staffs Routes
         * ====================================================== */
        Route::group(["prefix" => "staffs","as" => "staffs."], function () {
            Route::get('/all', [ StaffApiController::class, 'indexStaff']);
            Route::get('/teachers', [ StaffApiController::class, 'teacherStaff']);
            Route::get('/forms/selects', [ StaffApiController::class, 'staffFormData']);
            Route::post('/save', [ StaffApiController::class, 'saveStaff']);
        });

        /** ======================================================
         *      3. Exams Routes
         * ====================================================== */
        Route::group(["prefix" => "exams","as" => "exams."], function () {
            Route::get('/all', [ ExamApiController::class, 'indexExam']);
            Route::post('/marks/save', [ ExamApiController::class, 'saveExamMarks']);
            Route::post('/remark/save', [ ExamApiController::class, 'saveRemark']);
            Route::post('/attendances/save', [ ExamApiController::class, 'saveAttendances']);
            Route::get('/attendances/students', [ ExamApiController::class, 'getExamAttendances']);
            Route::get('/report/absent', [ ExamApiController::class, 'viewAbsentReport']);
            Route::get('/report/student-wise-subject/', [ ExamApiController::class, 'viewClassWiseSubjectReport']);
            Route::get('/report/teacher-wise-subject', [ ExamApiController::class, 'viewTeacherWiseSubjectReport']);
        });

        /** ======================================================
         *      3. Image Routes
         * ====================================================== */
        Route::group(["prefix" => "images","as" => "images."], function () {
            Route::get('/all', [ ImageApiController::class, 'indexImage']);
            Route::post('/save', [ ImageApiController::class, 'saveImage']);
            Route::post('/update', [ ImageApiController::class, 'updateImage']);
        });

        /** ======================================================
         *      4. Academic Report Routes
         * ====================================================== */
        Route::group(["prefix" => "academic/report","as" => "academic/report."], function () {
            Route::get('/preview-report-card', [ AcademicReportApiController::class, 'indexPreviewReportCard']);
        });

        /** ======================================================
         *      11. Event Routes
         * ====================================================== */
        Route::group(["prefix" => "events","as" => "events."], function () {
            Route::get('/all', [ EventApiController::class, 'indexEvent']);
            Route::post('/create', [ EventApiController::class, 'createEvent']);
            Route::put('/update/{id}', [ EventApiController::class, 'updateEvent']);
            Route::delete('/delete/{id}', [ EventApiController::class, 'deleteEvent']);
            Route::get('/show/{id}', [ EventApiController::class, 'showEvent']);
            Route::get('/student/view', [ EventApiController::class, 'viewStudentEvent']);
        });

        /** ======================================================
         *      11. Notice Routes
         * ====================================================== */
        Route::group(["prefix" => "notices","as" => "notices."], function () {
            Route::get('/all', [ NoticeApiController::class, 'indexNotice']);
            Route::post('/create', [ NoticeApiController::class, 'createNotice']);
            Route::put('/update/{id}', [ NoticeApiController::class, 'updateNotice']);
            Route::delete('/delete/{id}', [ NoticeApiController::class, 'deleteNotice']);
            Route::get('/show/{id}', [ NoticeApiController::class, 'showNotice']);
            Route::get('/student/view', [ NoticeApiController::class, 'viewStudentNotice']);
        });

        /** ======================================================
         *      11. News Routes
         * ====================================================== */
        Route::group(["prefix" => "news","as" => "news."], function () {
            Route::get('/all', [ NewsApiController::class, 'indexNews']);
            Route::post('/create', [ NewsApiController::class, 'createNews']);
            Route::put('/update/{id}', [ NewsApiController::class, 'updateNews']);
            Route::delete('/delete/{id}', [ NewsApiController::class, 'deleteNews']);
            Route::get('/show/{id}', [ NewsApiController::class, 'showNews']);
            Route::get('/student/view', [ NewsApiController::class, 'viewStudentNews']);
        });

        /** ======================================================
         *      11. Syllabus Routes
         * ====================================================== */
        Route::group(["prefix" => "syllabus","as" => "syllabus."], function () {
            Route::get('/all', [ SyllabusApiController::class, 'indexSyllabus']);
            Route::post('/create', [ SyllabusApiController::class, 'createSyllabus']);
            Route::put('/update/{id}', [ SyllabusApiController::class, 'updateSyllabus']);
            Route::delete('/delete/{id}', [ SyllabusApiController::class, 'deleteSyllabus']);
            Route::get('/show/{id}', [ SyllabusApiController::class, 'showSyllabus']);
            Route::get('/student/view', [ SyllabusApiController::class, 'viewStudentSyllabus']);
        });

        /** ======================================================
         *      11. Transport Routes
         * ====================================================== */
        Route::group(["prefix" => "transports","as" => "transports."], function () {
            Route::get('/routes', [ TransportApiController::class, 'indexTransport']);
            Route::get('/route-wise/transports', [ TransportApiController::class, 'routeWiseTransports']);
            Route::get('/class-wise/routes', [ TransportApiController::class, 'classWiseRoutes']);
            Route::get('/stoppage-wise/routes', [ TransportApiController::class, 'stoppageWiseRoutes']);
            Route::post('/create', [ TransportApiController::class, 'createTransport']);
            Route::put('/update/{id}', [ TransportApiController::class, 'updateTransport']);
            Route::delete('/delete/{id}', [ TransportApiController::class, 'deleteTransport']);
            Route::get('/show/{id}', [ TransportApiController::class, 'showTransport']);
            Route::get('/settings', [ TransportApiController::class, 'getSettings']);
            Route::post('/settings/save', [ TransportApiController::class, 'setSettings']);
            Route::get('/student/view', [ TransportApiController::class, 'viewStudentTransport']);
        });

        /** ======================================================
         *      11. Leave Routes
         * ====================================================== */
        Route::group(["prefix" => "leaves","as" => "leaves."], function () {
            Route::get('/all', [LeaveApiController::class, 'indexLeave']);
            Route::post('/create', [LeaveApiController::class, 'createLeave']);
            Route::get('/student/all', [LeaveApiController::class, 'studentLeaves']);
        });

        /** ======================================================
         *      11. Driver Routes
         * ====================================================== */
        Route::group(["prefix" => "drivers","as" => "drivers."], function () {
            Route::get('/all', [DriverApiController::class, 'indexDriver']);
        });

        /** ======================================================
         *      11. School Shift Routes
         * ====================================================== */
        Route::group(["prefix" => "timetables","as" => "timetables."], function () {
            Route::get('/school-shifts', [SchoolShiftApiController::class, 'indexSchoolShifts']);
            Route::get('/subject-wise', [SchoolShiftApiController::class, 'subjectWiseTime']);
            Route::get('/students-wise', [SchoolShiftApiController::class, 'studentWiseTime']);
            Route::get('/staffs-wise', [SchoolShiftApiController::class, 'staffWiseTime']);
            Route::get('/student/view', [SchoolShiftApiController::class, 'viewStudentTime']);
        });

        /** ======================================================
         *      11. Admission Routes
         * ====================================================== */
        Route::group(["prefix" => "admissions","as" => "admissions."], function () {
            Route::get('/list', [AdmissionApiController::class, 'indexAdmission']);
            Route::get('/class-wise-summary', [AdmissionApiController::class, 'classWiseAdmissionReport']);
            Route::get('/registration-report', [AdmissionApiController::class, 'registrationCollectionReport']);
            Route::post('/registration/save', [AdmissionApiController::class, 'saveAdmission']);
        });

        /** ======================================================
         *      11. Holiday Routes
         * ====================================================== */
        Route::group(["prefix" => "holidays","as" => "holidays."], function () {
            Route::get('/list', [HolidayApiController::class, 'indexHoliday']);
            Route::post('/save', [HolidayApiController::class, 'saveHoliday']);
            Route::get('/show/{id}', [ HolidayApiController::class, 'showHoliday']);
            Route::put('/update/{id}', [ HolidayApiController::class, 'updateHoliday']);
            Route::delete('/delete/{id}', [ HolidayApiController::class, 'deleteHoliday']);
            Route::get('/student/view', [ HolidayApiController::class, 'viewStudentHoliday']);
        });

        /** ======================================================
         *      11. Account Routes
         * ====================================================== */
        Route::group(["prefix" => "accounts","as" => "accounts."], function () {
            Route::get('/payments', [AccountApiController::class, 'accountPayment']);
            Route::get('/receipts', [AccountApiController::class, 'accountReceipt']);
            Route::get('/receipts/report', [AccountApiController::class, 'accountReceiptReport']);
            Route::get('/daybook/report', [AccountApiController::class, 'accountDaybookReport']);
            Route::get('/ledger/report', [AccountApiController::class, 'accountLedgerReport']);
            Route::post('/create', [AccountApiController::class, 'createTransport']);
            Route::put('/update/{id}', [AccountApiController::class, 'updateTransport']);
            Route::delete('/delete/{id}', [AccountApiController::class, 'deleteTransport']);
            Route::get('/show/{id}', [AccountApiController::class, 'showTransport']);
        });

        /** ======================================================
         *      11. Online Classes Routes
         * ====================================================== */
        Route::group(["prefix" => "online-classes","as" => "online-classes."], function () {
            Route::get('/list', [ClassOnlineApiController::class, 'indexOnlineClass']);
            Route::get('/today', [ClassOnlineApiController::class, 'showTodayOnlineClass']);
            Route::post('/save', [ClassOnlineApiController::class, 'saveOnlineClass']);
            Route::post('/save-teacher', [ClassOnlineApiController::class, 'saveClassTeacherOnlineClass']);
            Route::put('/update/{id}', [ClassOnlineApiController::class, 'updateOnlineClass']);
            Route::delete('/delete/{id}', [ClassOnlineApiController::class, 'destroyOnlineClass']);
            Route::get('/teacher/attendance', [ClassOnlineApiController::class, 'getOnlineClassTeacherAttendance']);
            Route::post('/teacher/attendance/save', [ClassOnlineApiController::class, 'saveOnlineClassTeacherAttendance']);
        });

        /** ======================================================
         *      11. Online Question Routes
         * ====================================================== */
        Route::group(["prefix" => "online-questions","as" => "online-questions."], function () {
            Route::post('/resolved/{id}', [OnlineQuestionApiController::class, 'saveResolvedQuestion']);
            Route::get('/discussions', [OnlineQuestionApiController::class, 'getQuestionDiscussions']);
            Route::post('/discussion/save', [OnlineQuestionApiController::class, 'saveQuestionDiscussion']);
            Route::get('/list', [OnlineQuestionApiController::class, 'indexOnlineQuestion']);
            Route::get('/list/me', [OnlineQuestionApiController::class, 'myOnlineQuestion']);
            Route::get('/list/resolved', [OnlineQuestionApiController::class, 'resolvedOnlineQuestion']);
            Route::get('/list/new', [OnlineQuestionApiController::class, 'newOnlineQuestion']);
            Route::get('/list/unanswer', [OnlineQuestionApiController::class, 'unanswerOnlineQuestion']);
            Route::post('/save', [OnlineQuestionApiController::class, 'saveOnlineQuestion']);
            Route::put('/update/{id}', [OnlineQuestionApiController::class, 'updateOnlineQuestion']);
            Route::delete('/delete/{id}', [OnlineQuestionApiController::class, 'destroyOnlineQuestion']);
           
        });

        /** ======================================================
         *      11. Online Topics Routes
         * ====================================================== */
        Route::group(["prefix" => "online-topics","as" => "online-topics."], function () {
            Route::get('/list', [OnlineQuestionApiController::class, 'indexOnlineTopic']);
            Route::post('/save', [OnlineQuestionApiController::class, 'saveOnlineTopic']);
            Route::put('/update/{id}', [OnlineQuestionApiController::class, 'updateOnlineTopic']);
            Route::delete('/delete/{id}', [OnlineQuestionApiController::class, 'destroyOnlineTopic']);
           
        });

        /** ======================================================
         *      11. Learn Material / Assets Routes
         * ====================================================== */
        Route::group(["prefix" => "assets","as" => "assets."], function () {
            Route::get('/list', [AssetApiController::class, 'indexAsset']);
            Route::get('/resource-types/list', [AssetApiController::class, 'getResourceTypes']);
            Route::post('/folder/save', [AssetApiController::class, 'saveFolderOrMaterialGroup']);
            Route::post('/learning-material/save', [AssetApiController::class, 'saveLearnMaterial']);
            Route::post('/learning-material/update/{id}', [AssetApiController::class, 'updateLearnMaterial']);
            Route::post('/learning-material/resource/save', [AssetApiController::class, 'saveLearnMaterialResources']);
            Route::delete('/learning-material/resource/delete/{id}', [AssetApiController::class, 'deleteLearnMaterialResources']);
            Route::put('/update/{id}', [AssetApiController::class, 'updateOnlineTopic']);
            Route::delete('/delete/{id}', [AssetApiController::class, 'destroyOnlineTopic']);
            Route::post('/learning-material/save', [AssetApiController::class, 'saveLearnMaterial']);
            Route::post('/classroom-learning-material/save', [AssetApiController::class, 'saveAssignClassroomLearningMaterial']);
            Route::post('/share-learning-material/save', [AssetApiController::class, 'saveShareLearningMaterial']);
        });

        /** ======================================================
         *      11. Virtual Exams Routes
         * ====================================================== */
        Route::group(["prefix" => "virtual-exams","as" => "virtual-exams."], function () {
            Route::post('/save', [VirtualExamApiController::class, 'saveExam']);
            Route::get('/today', [VirtualExamApiController::class, 'todayExam']);
            Route::get('/list', [VirtualExamApiController::class, 'examList']);
            Route::get('/schedule-list', [VirtualExamApiController::class, 'examScheduleList']);
            Route::get('/class-subjects-topics', [VirtualExamApiController::class, 'getVirtualClassSubject']);
            Route::get('/questions', [VirtualExamApiController::class, 'getQuestionList']);
            Route::get('/shared/questions', [VirtualExamApiController::class, 'getSharedQuestions']);

            Route::post('/question/save', [VirtualExamApiController::class, 'saveQuestion']);
            Route::get('/topics', [VirtualExamApiController::class, 'getTopics']);
            // student exam
            Route::get('/student/exam-list', [VirtualExamApiController::class, 'studentExamList']);
        });

        /** ======================================================
         *      11. Learning Material
         * ====================================================== */
        Route::group(["prefix" => "learning-material","as" => "learning-material."], function () {
            Route::get('/courses', [LearningMaterialApiController::class, 'materialCourses']);
        });

        /** ======================================================
         *      11. Calendar Events
         * ====================================================== */
        Route::group(["prefix" => "calendar","as" => "calendar."], function () {
            Route::get('/events', [EventCalendarApiController::class, 'calendarEvents']);
        });

        /** ======================================================
         *      11.Web Messages
         * ====================================================== */
        Route::group(["prefix" => "webmessages","as" => "webmessages."], function () {
            Route::post('/save', [WebmessageApiController::class, 'saveWebmessage']);
            Route::get('/sent', [WebmessageApiController::class, 'sentWebmessage']);
            Route::get('/inbox', [WebmessageApiController::class, 'inboxWebmessage']);
            Route::get('/show/{id}', [WebmessageApiController::class, 'showWebmessage']);
            Route::delete('/delete/{id}', [WebmessageApiController::class, 'deleteWebmessage']);
        });


        
    });
    
});
