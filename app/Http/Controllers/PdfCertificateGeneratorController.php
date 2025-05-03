<?php

namespace App\Http\Controllers;

use URL;
use Mail;
use Storage;
use Exception;
use Throwable;
use ZipArchive;
use App\Mail\Paid;
use Carbon\Carbon;
use App\Helpers\Pdf;
use App\Models\Order;

use Mpdf\MpdfException;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Enums\CertificateViewName;
use App\Enums\IdCardAudienceType;
use App\Http\Controllers\Controller;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\View;
use App\Repositories\IExamRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Validator;
use Box\Spout\Common\Exception\IOException;
use App\Repositories\ICertificateRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IStudentCertificateRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;
// use Illuminate\Support\Facades\URL;

final class PdfCertificateGeneratorController extends Controller
{

    public function __construct(
        private IStudentRepository $studentRepository,
        private ISchoolRepository $schoolRepository,
        private IImageRepository $imageRepository,
        private IStaffRepository $staffRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IFeeRepository $feeRepository,
        private ICertificateRepository $certificateRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IExamRepository $examRepository,
        private IStudentCertificateRepository $studentCertificateRepository,
    ) {
        // do something
    }


    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function renderIdentityCardForm(int $id)
    {
        $student = $this->studentRepository->getById($id);

        $schoolKey = $this->schoolRepository->getSchoolKeyByID($student->school_id);

        $student->load(['father', 'mother', 'country', 'classroom']);
        // dd($student);
        return view("pdf.certificate.identity_card_form", compact("student", "schoolKey"));
    }

    /**
     * renderBonafideForm
     */
    public function renderBonafideForm(int $id)
    {
        $student = $this->studentRepository->getById($id);

        $school = $this->schoolRepository->getById($student->school_id);
        $studentImage = $this->imageRepository->getStudentImageByStudentId($id);
        $schoolImage = $this->imageRepository->getSchoolImageBySchoolId($student->school_id);

        $student->load(['father', 'classroom', 'country']);
        return view("pdf.certificate.bonafide_certificate_form", compact("student", "school", "studentImage", "schoolImage"));
    }


    /**
     * renderCharacterForm
     */
    public function renderCharacterForm(int $id)
    {
        $student = $this->studentRepository->getById($id);

        $school = $this->schoolRepository->getById($student->school_id);
        $studentImage = $this->imageRepository->getStudentImageByStudentId($id);
        $schoolImage = $this->imageRepository->getSchoolImageBySchoolId($student->school_id);

        $student->load(['father', 'classroom.academicYear', 'country']);
        // dd($student);
        return view("pdf.certificate.character_certificate_form", compact("student", "school", "studentImage", "schoolImage"));
    }


    /**
     * renderAdmitCardForm
     */
    public function renderAdmitCardFormOld(Request $request)
    {
        // $encodedData = $request->input('data');
        // $decodedData = json_decode(urldecode($encodedData), true);

        // $classroomId = $decodedData['classroom_id'] ?? '';
        // $studentList = $decodedData['selected_student'] ?? '';
        // $toggleType = $decodedData['student_list'] ?? '';

        // // dd($decodedData);

        // $studentData = array();

        // if ($toggleType === 'individual') {
        //     if (!empty($studentList)) {
        //         $students = $this->studentRepository->getStudentHavingNoDueByIds(
        //             $studentList,
        //             $decodedData['from_installment_id'],
        //             $decodedData['to_installment_id'],
        //             $decodedData['exam_id'],
        //         );

        //         $students->load([
        //             'father',
        //             'classroom.academicYear',
        //             'classroomRoll',
        //             'schoolData',
        //             'studentImage',
        //             'schoolLogo',
        //         ]);

        //         $studentData = $students->filter(function ($student) {
        //             $hasDue = true;

        //             $student->classroom_fee_student_amounts->each(function ($feeAmount) use (&$hasDue) {
        //                 if ($feeAmount->nullify_fee != null) {
        //                     $hasDue = false;
        //                 } elseif ($feeAmount?->payment != null) {
        //                     $hasDue = $feeAmount?->payment?->payment_status == PaymentStatus::PARTIAL->value;
        //                 } else {
        //                     $hasDue = true;
        //                 }
        //             });

        //             return !$hasDue;
        //         })->toArray();
        //     }
        // }

        // if ($toggleType === 'class_wise') {
        //     if (!empty($classroomId)) {
        //         $students = $this->studentRepository->getStudentHavingNoDueByClassroomId(
        //             $classroomId,
        //             $decodedData['from_installment_id'],
        //             $decodedData['to_installment_id'],
        //             $decodedData['exam_id'],
        //         );

        //         $students->load([
        //             'father',
        //             'classroom.academicYear',
        //             'classroomRoll',
        //             'schoolData',
        //             'studentImage',
        //             'schoolLogo',
        //         ]);

        //         $studentData = $students->filter(function ($student) {
        //             $hasDue = true;

        //             $student->classroom_fee_student_amounts->each(function ($feeAmount) use (&$hasDue) {
        //                 if ($feeAmount->nullify_fee != null) {
        //                     $hasDue = false;
        //                 } elseif ($feeAmount?->payment != null) {
        //                     $hasDue = $feeAmount?->payment?->payment_status == PaymentStatus::PARTIAL->value;
        //                 } else {
        //                     $hasDue = true;
        //                 }
        //             });

        //             return !$hasDue;
        //         })->toArray();
        //     }
        // }

        // return view("pdf.certificate.admit_card_certificate_form", compact("studentData"));

        return view("pdf.certificate.admit_card_certificate_form");
    }

    /**
     * renderAdmitCardForm
     */
    public function renderAdmitCardForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'certificate_id' => ['required', 'integer'],
            'classroom_id' => ['required', 'integer'],
            'exam_id' => ['required', 'integer'],
            'student_list' => ['required', 'string'],
            'student_ids' => ['exclude_unless:student_list,individual', 'required_if:student_list,individual'],
            'is_admit_card_without_due' => ['nullable', 'boolean'],
            'fromFeeId' => ['exclude_unless:is_admit_card_without_due,true', 'required_if:is_admit_card_without_due,true', 'nullable', 'integer'],
            'toFeeId' => ['exclude_unless:is_admit_card_without_due,true', 'required_if:is_admit_card_without_due,true', 'nullable', 'integer'],
        ]);

        if ($validator->fails()) {
            return redirect()->to(URL::previous())->with('error', 'Required fields cannot be empty.');
        }

        $certificateId = $request?->certificate_id;
        $classroomId = $request?->classroom_id;
        $examId = $request?->exam_id;
        $studentIds = !empty($request->student_ids) ? json_decode($request->student_ids) : [];
        $studentListType = $request?->student_list;
        $isAdmitCardWithoutDue = $request->is_admit_card_without_due ?? false;
        $fromFeeId = $isAdmitCardWithoutDue ? $request?->from_installment_id : null;
        $toFeeId = $isAdmitCardWithoutDue ? $request?->to_fee_id : null;
        $includeDigitalSign = $request?->digital_sign ? $request?->digital_sign : false;

        $digitalSignature = "";

        if ($includeDigitalSign) {
            $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');

            $signatureImage = $siteSettingsReportCard['Team Wise Report Card']['digital_signature'] ?? "";
            $digitalSignature = isValidImageUrl($signatureImage) ? $signatureImage : "";
        }

        $certificate = null;

        $certificate = $this->certificateRepository->getCertificateByIdAndAudienceType($certificateId, 'Student');

        if ($certificate == null) {
            return response()->json([
                "Status" => 400,
                "Error" => "Admit card template is not created."
            ]);
        }

        $students = [];
        $examDateData = [];
        $seatingTwoData = [];
        $schoolData = [];
        $exam = null;

        if ($studentListType == 'class_wise') {
            $students = $this->studentRepository->getStudentHavingNoDueByClassroomId($classroomId, $fromFeeId, $toFeeId);
        } else if ($studentListType == 'individual') {
            $students = $this->studentRepository->getStudentHavingNoDueByIds($studentIds, $fromFeeId, $toFeeId);
        }

        if (count($students) > 0 && $isAdmitCardWithoutDue == true) {
            $students = $students->filter(function ($student) {
                $hasDue = true;

                $student->classroom_fee_student_amounts->each(function ($feeAmount) use (&$hasDue) {
                    if ($feeAmount->nullify_fee != null) {
                        $hasDue = false;
                    } elseif ($feeAmount?->payment != null) {
                        $hasDue = $feeAmount?->payment?->payment_status != PaymentStatus::PAID->value;
                    } else {
                        $hasDue = true;
                    }
                });

                return !$hasDue;
            });
        }

        if (count($students) > 0) {
            $students->loadMissing([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                'classroom:id,title',
                'promotedClassroom',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                },
                'studentImage',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            })->toArray();

            // sort students by classroom roll
            usort($students, function ($a, $b) {
                $rollNoA = $a['classroom_roll']['roll_no'] ?? null;
                $rollNoB = $b['classroom_roll']['roll_no'] ?? null;

                if ($rollNoA == $rollNoB) {
                    return 0;
                }

                // If $rollNoA is null, move it to the end
                if ($rollNoA == null) {
                    return 1;
                }

                // If $rollNoB is null, move it to the end
                if ($rollNoB == null) {
                    return -1;
                }

                return ($rollNoA < $rollNoB) ? -1 : 1;
            });

            $exam = $this->examRepository->getExamById($examId);

            if ($exam != null) {
                $classroomSubjects = $this->classroomSubjectRepository->getByClassroomIdAndExamId($classroomId, $examId);

                if (!empty($classroomSubjects)) {
                    if (
                        in_array($certificate?->view_name, [
                            CertificateViewName::ADMIT_CARD_5->value,
                            CertificateViewName::ADMIT_CARD_9->value
                        ])
                    ) {
                        $classroomSubjects = $classroomSubjects->sortBy(function ($item) {
                            return ($item['examDate']['date_at'] ?? "") . ($item['examDate']['start_time_at'] ?? "");
                        });

                        foreach ($classroomSubjects as $classroomSubject) {
                            $tempArray = [
                                'subject_name' => $classroomSubject?->subject?->title,
                                'exam_date' => !empty($classroomSubject?->examDate?->date_at) ? Carbon::parse($classroomSubject?->examDate?->date_at)->format('d-m-Y') : '',
                                'exam_start_time' => !empty($classroomSubject?->examDate?->start_time_at) ? Carbon::parse($classroomSubject?->examDate?->start_time_at)->format('h:i A') : '',
                                'exam_end_time' => !empty($classroomSubject?->examDate?->end_time_at) ? Carbon::parse($classroomSubject?->examDate?->end_time_at)->format('h:i A') : '',
                            ];

                            if (!isset($examDateData[$tempArray['exam_date']])) {
                                $examDateData[$tempArray['exam_date']] = $tempArray;
                            } else if (!isset($seatingTwoData[$tempArray['exam_date']])) {
                                $seatingTwoData[$tempArray['exam_date']] = $tempArray;
                            }
                        }
                    } else {
                        foreach ($classroomSubjects as $classroomSubject) {
                            $tempArray = [
                                'subject_name' => $classroomSubject?->subject?->title,
                                'exam_date' => !empty($classroomSubject?->examDate?->date_at) ? Carbon::parse($classroomSubject?->examDate?->date_at)->format('d-m-Y') : '',
                                'exam_start_time' => !empty($classroomSubject?->examDate?->start_time_at) ? Carbon::parse($classroomSubject?->examDate?->start_time_at)->format('h:i A') : '',
                                'exam_end_time' => !empty($classroomSubject?->examDate?->end_time_at) ? Carbon::parse($classroomSubject?->examDate?->end_time_at)->format('h:i A') : '',
                            ];

                            array_push($examDateData, $tempArray);
                        }
                    }
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        // sort exam date data by exam_date and exam_start_time
        // usort($examDateData, function ($a, $b) {
        //     $dateComparison = strcmp($a['exam_date'], $b['exam_date']);
        //     if ($dateComparison == 0) {
        //         return strcmp($a['exam_start_time'], $b['exam_start_time']);
        //     }
        //     return $dateComparison;
        // });

        usort($examDateData, function ($a, $b) {
            $dateA = Carbon::createFromFormat('d-m-Y', $a['exam_date']);
            $dateB = Carbon::createFromFormat('d-m-Y', $b['exam_date']);

            $dateComparison = $dateA <=> $dateB;

            if ($dateComparison == 0 && !empty($a['exam_start_time']) && !empty($b['exam_start_time'])) {
                $timeA = Carbon::createFromFormat('h:i A', $a['exam_start_time']);
                $timeB = Carbon::createFromFormat('h:i A', $b['exam_start_time']);

                return $timeA <=> $timeB;
            }

            return $dateComparison;
        });

        // pdf view name map
        $viewNameMap = [
            // CertificateViewName::ADMIT_CARD->value => 'pdf.certificate.admit_card_certificate_form',
            CertificateViewName::ADMIT_CARD_1->value => 'pdf.certificate.admit_card_certificate_form',
            CertificateViewName::ADMIT_CARD_2->value => 'pdf.certificate.admit_card_certificate_form_3',
            CertificateViewName::ADMIT_CARD_3->value => 'pdf.certificate.admit_card_certificate_form_4',
            CertificateViewName::ADMIT_CARD_4->value => 'pdf.certificate.admit_card_certificate_form_5',
            CertificateViewName::ADMIT_CARD_5->value => 'pdf.certificate.admit_card_certificate_form_8',
            CertificateViewName::ADMIT_CARD_6->value => 'pdf.certificate.admit_card_certificate_form_5',
            CertificateViewName::ADMIT_CARD_7->value => 'pdf.certificate.admit_card_certificate_form_6',
            CertificateViewName::ADMIT_CARD_8->value => 'pdf.certificate.admit_card_certificate_form_7',
            CertificateViewName::ADMIT_CARD_9->value => 'pdf.certificate.admit_card_certificate_form_8',
        ];

        $viewName = $viewNameMap[$certificate?->view_name] ?? "";

        if (!View::exists($viewName)) {
            abort(404);
        }

        return view($viewName, [
            'students' => $students,
            'examDateData' => $examDateData,
            'seatingTwoData' => $seatingTwoData,
            'schoolData' => $schoolData,
            'exam' => $exam,
            'digitalSignature' => $digitalSignature,
        ]);
    }

    /**
     * renderAdmitCardForm2
     */
    public function renderAdmitCardForm2(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_2");
    }
    /**
     * renderAdmitCardForm3
     */
    public function renderAdmitCardForm3(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_3");
    }
    /**
     * renderAdmitCardForm4
     */
    public function renderAdmitCardForm4(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_4");
    }
    /**
     * renderAdmitCardForm5
     */
    public function renderAdmitCardForm5(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_5");
    }
    /**
     * renderAdmitCardForm6
     */
    public function renderAdmitCardForm6(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_6");
    }

    /**
     * renderAdmitCardForm7
     */
    public function renderAdmitCardForm7(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_7");
    }

    /**
     * renderAdmitCardForm8
     */
    public function renderAdmitCardForm8(Request $request)
    {
        return view("pdf.certificate.admit_card_certificate_form_8");
    }


    /**
     * renderTeacherIdForm
     */
    public function renderTeacherIdForm(Request $request)
    {

        // // data process
        // $encodedData = $request->input('data');
        // $decodedData = json_decode(urldecode($encodedData), true);

        // // get data
        // $teacherList = $decodedData['teacher_list'] ?? '';
        // $selectedTeacher = $decodedData['selected_teacher'] ?? '';

        // // empty all variable
        // $allTeacherData = [];
        // $individualTeacherData = array();

        // if ($teacherList === 'all_teacher') {
        //     $allTeacher = $this->staffRepository->getActiveTeacherAll();
        //     $allTeacher->load(['designation', 'bloodGroup', 'school']);
        //     $allTeacherData = $allTeacher->toArray();
        // }

        // if ($teacherList === 'individual') {
        //     if (!empty($selectedTeacher)) {
        //         foreach ($selectedTeacher as $teacherId) {
        //             $teacher = $this->staffRepository->getById($teacherId);
        //             $teacher->load(['designation', 'bloodGroup', 'school']);
        //             $teacherData = $teacher->toArray();
        //             array_push($individualTeacherData, $teacherData);
        //         }
        //     }
        // }

        // return view("pdf.certificate.teacher_id_certificate_form", compact(["allTeacherData", "individualTeacherData"]));
        return view("pdf.certificate.teacher_id_certificate_form");
    }


    /**
     * renderTeacherExperienceForm
     */
    public function renderTeacherExperienceForm(Request $request)
    {

        // // data process
        // $encodedData = $request->input('data');
        // $decodedData = json_decode(urldecode($encodedData), true);

        // // empty
        // $teacherData = [];

        // // get data
        // $teacherId = $decodedData['teacher_id'] ?? '';
        // if (!empty($teacherId)) {
        //     $teacher = $this->staffRepository->getById($teacherId);
        //     $teacher->load(['school', 'schoolLogo']);
        //     $teacherData = $teacher->toArray();
        // }

        // dd($teacherData);

        // return view("pdf.certificate.teacher_experience_certificate_form", compact("teacherData"));
        return view("pdf.certificate.teacher_experience_certificate_form");
    }


    /**
     * renderFeeForm
     */
    public function renderFeeForm(Request $request)
    {
        // $encodedData = $request->input('data');
        // $decodedData = json_decode(urldecode($encodedData), true);
        // $studentId = $decodedData['student_id'];
        // $selectedFee = $decodedData['selected_fee'];
        // $fromInstallmentId = $decodedData['from_installment_id'];
        // $toInstallmentId = $decodedData['to_installment_id'];

        // // dd($selectedFee);

        // if (!empty($studentId) && !empty($selectedFee) && !empty($fromInstallmentId) && !empty($toInstallmentId)) {
        //     $student = $this->studentRepository->getById($studentId);
        //     $student->load(['classroom', 'classroomRoll', 'schoolData', 'schoolLogo', 'country', 'fee_payments', 'father', 'mother', 'academicYear']);
        //     $studentData = $student->toArray();

        //     $feeTypeIds = array_column($decodedData['selected_fee'], 'fee_id');

        //     $fromFeeTitle = $this->feeRepository->getById($fromInstallmentId)->toArray();
        //     $toFeeTitle = $this->feeRepository->getById($toInstallmentId)->toArray();

        //     $studentFeeInstallments = $this->classFeeStudentAmountRepository->getStudentFeeinstallmentsAmounts(
        //         $decodedData['academic_year_id'],
        //         $decodedData['student_id'],
        //         $decodedData['from_installment_id'],
        //         $decodedData['to_installment_id'],
        //         $feeTypeIds
        //     );

        //     $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

        //     $total_amount = 0;
        //     $total_paid_amount = 0;
        //     $total_discount_amount = 0;

        //     $installmentData = [];

        //     $studentFeeInstallments->each(function ($installment) use (&$total_amount, &$total_paid_amount, &$total_discount_amount, $studentFeeDiscounts, &$installmentData) {
        //         $total_amount += $installment->semester != null ? (float) $installment->amount * $installment->semester : (float) $installment->amount;

        //         $total_paid_amount += (float) $installment?->fee_payments?->sum('paid_amount') ?? 0;

        //         $discount_amount = (float) $installment?->payment?->discount_amount ?? 0;

        //         $total_discount_amount += $discount_amount;

        //         if ($installment?->payment != null) {
        //             $discount_amount = (float) $installment?->payment?->discount_amount ?? 0;
        //             $total_discount_amount += $discount_amount;
        //         } elseif (count($studentFeeDiscounts) > 0) {
        //             foreach ($studentFeeDiscounts as $discount) {
        //                 if ($discount->fee_id === $installment->fee_id && $discount->fee_type_id === $installment->fee_type_id) {
        //                     if ($discount->is_discount_percentage) {
        //                         $discount_amount = (float) ($discount->amount / 100) * ($installment->semester != null ? (float) $installment->amount * $installment->semester : (float) $installment->amount);

        //                         $total_discount_amount += $discount_amount;
        //                     } else {
        //                         $discount_amount = (float) $discount->amount;
        //                         $total_discount_amount += $discount_amount;
        //                     }
        //                 }
        //             }
        //         }

        //         if (isset($installmentData[$installment->fee_type_id])) {
        //             // If the element already exists, update its properties
        //             $installmentData[$installment->fee_type_id]['fee_type_title'] = $installment->feeType->fee_type;
        //             $installmentData[$installment->fee_type_id]['amount'] += $installment->amount;
        //         } else {
        //             // If the element does not exist, create it with initial properties
        //             $installmentData[$installment->fee_type_id] = [
        //                 'fee_type_title' => $installment->feeType->fee_type,
        //                 'amount' => $installment->amount,
        //             ];
        //         }
        //     });

        // dd($studentFeeInstallments, $total_amount, $total_paid_amount, $total_discount_amount, $installmentData);

        // return view("pdf.certificate.fee_certificate_form", compact(
        //     [
        //         "studentFeeInstallments",
        //         "total_amount",
        //         "total_paid_amount",
        //         "total_discount_amount",
        //         "installmentData",
        //         "studentData",
        //         "fromFeeTitle",
        //         "toFeeTitle",
        //     ]
        // ));

        return view("pdf.certificate.fee_certificate_form");
    }

    /**
     * renderStudentIdForm
     */
    public function renderStudentIdForm(Request $request)
    {

        // data process
        // $encodedData = $request->input('data');
        // $decodedData = json_decode(urldecode($encodedData), true);

        // // get data
        // $studentList = $decodedData['student_list'] ?? '';
        // $classroomId = $decodedData['classroom_id'] ?? '';
        // $admissionNo = $decodedData['admission_no'] ?? '';
        // $selectedStudent = $decodedData['selected_student'] ?? '';

        // // empty all variable
        // $classWiseStudentData = [];
        // $individualStudentData = array();

        // if ($studentList === 'class_wise') {
        //     if (!empty($classroomId)) {
        //         $classWiseStudent = $this->studentRepository->getAllByClassroomId($classroomId);
        //         $classWiseStudent->load(['father', 'classroom.academicYear', 'classNameData', 'schoolData', 'studentImage', 'schoolLogo']);
        //         $classWiseStudentData = $classWiseStudent->toArray();
        //     }
        // }

        // if ($studentList === 'individual') {
        //     if (!empty($selectedStudent)) {
        //         foreach ($selectedStudent as $studentId) {
        //             $student = $this->studentRepository->getById($studentId);
        //             $student->load(['father', 'classroom.academicYear', 'classNameData', 'schoolData', 'studentImage', 'schoolLogo']);
        //             $students = $student->toArray();
        //             array_push($individualStudentData, $students);
        //         }
        //     }
        // }

        // if ($studentList === 'admission_no') {
        //     if (!empty($admissionNo)) {
        //         $dataFromController = [
        //             "ids" => $admissionNo
        //         ];
        //         $idsString = $dataFromController['ids'];
        //         $idsArray = explode(',', $idsString);
        //         $idsArray = array_map('trim', $idsArray);
        //         foreach ($idsArray as $admno) {
        //             $student = $this->studentRepository->getByAdmissionNo($admno);
        //             if (!empty($student)) {
        //                 $student->load(['father', 'classroom.academicYear', 'classNameData', 'schoolData', 'studentImage', 'schoolLogo']);
        //                 $students = $student->toArray();
        //                 array_push($individualStudentData, $students);
        //             }
        //         }
        //     }
        // }

        // return view("pdf.certificate.student_id_certificate_form", compact(["classWiseStudentData", "individualStudentData"]));
        return view("pdf.certificate.student_id_certificate_form");
    }

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCharacterForm()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.certificate.character_form', ['order' => []])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'printProgressReportWithGraph';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));
        // Mail::to('nasir.chalo@gmail.com')
        //     ->send(new Paid($file));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Invoice') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }


    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printIdCardCertificate(Request $request)
    {
        $studentIds = !empty($request->student_ids) ? json_decode($request->student_ids) : [];
        $staffIds = !empty($request->staff_ids) ? json_decode($request->staff_ids) : [];
        $classroomId = $request->classroom_id ?? null;
        $templateId = $request->template_id ?? null;

        $students = [];
        $staffs = [];
        $idCardCertificate = null;
        $headerSchoolTitleStyles = "";
        $headerTitleTwoStyles = "";
        $headerTitleThreeStyles = "";
        $bodyLabelStyles = "";
        $bodyValueStyles = "";
        $footerTitleOneStyles = "";
        $footerTitleTwoStyles = "";
        $backpageTitleOneStyles = "";
        $backpageTitleTwoStyles = "";
        $backpageBodyLabelStyles = "";
        $backpageBodyValueStyles = "";
        $backpageTitleThreeStyles = "";
        $backpageTitleFourStyles = "";

        if (!empty($templateId)) {
            $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($templateId);
        }

        if (!empty($idCardCertificate)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

            if (!empty($schoolData)) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    // 'title' => $schoolData->title,
                    // 'affiliation_no' => $schoolData->affiliation_no,
                    // 'phone' => $schoolData->phone,
                    // 'phone_2' => $schoolData->phone_2,
                    // 'mail' => $schoolData->mail,
                    // 'street_address' => $schoolData->street_address,
                ];
            }

            $idCardCertificate->loadMissing([
                'backgroundImage',
                'headerBackgroundImage',
                'bodyBackgroundImage',
                'footerBackgroundImage',
                'backpageBackgroundImage',
                'footerSignatureImage'
            ]);

            $idCardCertificate = $this->formatIdCardCertificateData($idCardCertificate, $schoolData);

            if ($idCardCertificate?->audience_type == IdCardAudienceType::STUDENT->value) {
                if (!empty($studentIds) && !empty($classroomId)) {
                    $students = $this->studentRepository->getStudentsByIdsAndClassroomId($studentIds, $classroomId);

                    if (count($students) > 0) {
                        $students = $this->formatStudentsDataForIdCard($students);
                    }
                }
            } else if ($idCardCertificate?->audience_type == IdCardAudienceType::TEACHER->value) {
                if (!empty($staffIds)) {
                    // $staffs = $this->staffRepository->getTeachersByIds($staffIds);
                    $staffs = $this->staffRepository->getStaffByIds($staffIds);

                    if (count($staffs) > 0) {
                        $staffs = $this->formatStaffsDataForIdCard($staffs);
                    }
                }
            }

            $headerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'header', 'background_color');
            $headerSchoolTitleStyles = $this->getStyles($idCardCertificate, 'header', 'school_title');
            $headerTitleTwoStyles = $this->getStyles($idCardCertificate, 'header', 'title_2');
            $headerTitleThreeStyles = $this->getStyles($idCardCertificate, 'header', 'title_3');
            $bodyBackgroundColorStyles = $this->getStyles($idCardCertificate, 'body', 'background_color');
            $bodyLabelStyles = $this->getStyles($idCardCertificate, 'body', 'body_label');
            $bodyValueStyles = $this->getStyles($idCardCertificate, 'body', 'body_value');
            $footerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'footer', 'background_color');
            $footerTitleOneStyles = $this->getStyles($idCardCertificate, 'footer', 'title_1');
            $footerTitleTwoStyles = $this->getStyles($idCardCertificate, 'footer', 'title_2');
            $backpageBackgroundColorStyles = $this->getStyles($idCardCertificate, 'back_page', 'background_color');
            $backpageTitleOneStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_1');
            $backpageTitleTwoStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_2');
            $backpageBodyLabelStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_label');
            $backpageBodyValueStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_value');
            $backpageTitleThreeStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_3');
            $backpageTitleFourStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_4');
        }

        return view("pdf.certificate.id_card_certificate", [
            'students' => $students,
            'staffs' => $staffs,
            'idCardCertificate' => $idCardCertificate?->toArray(),
            'headerSchoolTitleStyles' => $headerSchoolTitleStyles,
            'headerTitleTwoStyles' => $headerTitleTwoStyles,
            'headerTitleThreeStyles' => $headerTitleThreeStyles,
            'bodyLabelStyles' => $bodyLabelStyles,
            'bodyValueStyles' => $bodyValueStyles,
            'footerTitleOneStyles' => $footerTitleOneStyles,
            'footerTitleTwoStyles' => $footerTitleTwoStyles,
            'backpageTitleOneStyles' => $backpageTitleOneStyles,
            'backpageTitleTwoStyles' => $backpageTitleTwoStyles,
            'backpageBodyLabelStyles' => $backpageBodyLabelStyles,
            'backpageBodyValueStyles' => $backpageBodyValueStyles,
            'backpageTitleThreeStyles' => $backpageTitleThreeStyles,
            'backpageTitleFourStyles' => $backpageTitleFourStyles,
            'headerBackgroundColorStyles' => $headerBackgroundColorStyles,
            'bodyBackgroundColorStyles' => $bodyBackgroundColorStyles,
            'footerBackgroundColorStyles' => $footerBackgroundColorStyles,
            'backpageBackgroundColorStyles' => $backpageBackgroundColorStyles,
        ]);
    }


    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentIdCardCertificate(Request $request)
    {
        $studentIds = !empty($request->student_ids) ? json_decode($request->student_ids) : [];
        $admissionNo = !empty($request->admission_no) ? explode(',', $request->admission_no) : [];
        $classroomId = $request->classroom_id ?? null;
        $templateId = $request->template_id ?? null;
        $studentListBy = $request->student_list ?? "";

        $students = [];
        $staffs = [];
        $idCardCertificate = null;
        $headerSchoolTitleStyles = "";
        $headerTitleTwoStyles = "";
        $headerTitleThreeStyles = "";
        $bodyLabelStyles = "";
        $bodyValueStyles = "";
        $footerTitleOneStyles = "";
        $footerTitleTwoStyles = "";
        $backpageTitleOneStyles = "";
        $backpageTitleTwoStyles = "";
        $backpageBodyLabelStyles = "";
        $backpageBodyValueStyles = "";
        $backpageTitleThreeStyles = "";
        $backpageTitleFourStyles = "";

        if (!empty($templateId)) {
            $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($templateId);
        }

        if (!empty($idCardCertificate)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

            if (!empty($schoolData)) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    // 'title' => $schoolData->title,
                    // 'affiliation_no' => $schoolData->affiliation_no,
                    // 'phone' => $schoolData->phone,
                    // 'phone_2' => $schoolData->phone_2,
                    // 'mail' => $schoolData->mail,
                    // 'street_address' => $schoolData->street_address,
                ];
            }

            $idCardCertificate->loadMissing([
                'backgroundImage',
                'headerBackgroundImage',
                'bodyBackgroundImage',
                'footerBackgroundImage',
                'backpageBackgroundImage',
                'footerSignatureImage'
            ]);

            $idCardCertificate = $this->formatIdCardCertificateData($idCardCertificate, $schoolData);

            if ($idCardCertificate?->audience_type == IdCardAudienceType::STUDENT->value) {
                if ($studentListBy == "class_wise" && !empty($classroomId)) {
                    $students = $this->studentRepository->getStudentsForIdCardByClassroomId($classroomId);
                } else if ($studentListBy == "individual" && !empty($studentIds)) {
                    $students = $this->studentRepository->getStudentsForIdCardByIds($studentIds);
                } else if ($studentListBy == "admission_no" && !empty($admissionNo)) {
                    $students = $this->studentRepository->getStudentsForIdCardByAdmissionNo($admissionNo);
                }

                if (count($students) > 0) {
                    $students = $this->formatStudentsDataForIdCard($students);
                }
            }

            $headerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'header', 'background_color');
            $bodyBackgroundColorStyles = $this->getStyles($idCardCertificate, 'body', 'background_color');
            $footerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'footer', 'background_color');
            $backpageBackgroundColorStyles = $this->getStyles($idCardCertificate, 'back_page', 'background_color');
            $headerSchoolTitleStyles = $this->getStyles($idCardCertificate, 'header', 'school_title');
            $headerTitleTwoStyles = $this->getStyles($idCardCertificate, 'header', 'title_2');
            $headerTitleThreeStyles = $this->getStyles($idCardCertificate, 'header', 'title_3');
            $bodyLabelStyles = $this->getStyles($idCardCertificate, 'body', 'body_label');
            $bodyValueStyles = $this->getStyles($idCardCertificate, 'body', 'body_value');
            $footerTitleOneStyles = $this->getStyles($idCardCertificate, 'footer', 'title_1');
            $footerTitleTwoStyles = $this->getStyles($idCardCertificate, 'footer', 'title_2');
            $backpageTitleOneStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_1');
            $backpageTitleTwoStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_2');
            $backpageBodyLabelStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_label');
            $backpageBodyValueStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_value');
            $backpageTitleThreeStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_3');
            $backpageTitleFourStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_4');
        }

        return view("pdf.certificate.id_card_certificate", [
            'students' => $students,
            'staffs' => $staffs,
            'idCardCertificate' => $idCardCertificate?->toArray(),
            'headerSchoolTitleStyles' => $headerSchoolTitleStyles,
            'headerTitleTwoStyles' => $headerTitleTwoStyles,
            'headerTitleThreeStyles' => $headerTitleThreeStyles,
            'bodyLabelStyles' => $bodyLabelStyles,
            'bodyValueStyles' => $bodyValueStyles,
            'footerTitleOneStyles' => $footerTitleOneStyles,
            'footerTitleTwoStyles' => $footerTitleTwoStyles,
            'backpageTitleOneStyles' => $backpageTitleOneStyles,
            'backpageTitleTwoStyles' => $backpageTitleTwoStyles,
            'backpageBodyLabelStyles' => $backpageBodyLabelStyles,
            'backpageBodyValueStyles' => $backpageBodyValueStyles,
            'backpageTitleThreeStyles' => $backpageTitleThreeStyles,
            'backpageTitleFourStyles' => $backpageTitleFourStyles,
            'headerBackgroundColorStyles' => $headerBackgroundColorStyles,
            'bodyBackgroundColorStyles' => $bodyBackgroundColorStyles,
            'footerBackgroundColorStyles' => $footerBackgroundColorStyles,
            'backpageBackgroundColorStyles' => $backpageBackgroundColorStyles,
        ]);
    }


    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printTeacherIdCardCertificate(Request $request)
    {
        $staffIds = !empty($request->staff_ids) ? json_decode($request->staff_ids) : [];
        $templateId = $request->template_id ?? null;
        $teacherListBy = $request->teacher_list ?? "";

        $students = [];
        $staffs = [];
        $idCardCertificate = null;
        $headerSchoolTitleStyles = "";
        $headerTitleTwoStyles = "";
        $headerTitleThreeStyles = "";
        $bodyLabelStyles = "";
        $bodyValueStyles = "";
        $footerTitleOneStyles = "";
        $footerTitleTwoStyles = "";
        $backpageTitleOneStyles = "";
        $backpageTitleTwoStyles = "";
        $backpageBodyLabelStyles = "";
        $backpageBodyValueStyles = "";
        $backpageTitleThreeStyles = "";
        $backpageTitleFourStyles = "";

        if (!empty($templateId)) {
            $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($templateId);
        }

        if (!empty($idCardCertificate)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

            if (!empty($schoolData)) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    // 'title' => $schoolData->title,
                    // 'affiliation_no' => $schoolData->affiliation_no,
                    // 'phone' => $schoolData->phone,
                    // 'phone_2' => $schoolData->phone_2,
                    // 'mail' => $schoolData->mail,
                    // 'street_address' => $schoolData->street_address,
                ];
            }

            $idCardCertificate->loadMissing([
                'backgroundImage',
                'headerBackgroundImage',
                'bodyBackgroundImage',
                'footerBackgroundImage',
                'backpageBackgroundImage',
                'footerSignatureImage'
            ]);

            $idCardCertificate = $this->formatIdCardCertificateData($idCardCertificate, $schoolData);

            if ($idCardCertificate?->audience_type == IdCardAudienceType::TEACHER->value) {
                if ($teacherListBy == 'individual' && !empty($staffIds)) {
                    // $staffs = $this->staffRepository->getTeachersByIds($staffIds);
                    $staffs = $this->staffRepository->getStaffByIds($staffIds);
                } else if ($teacherListBy == 'all_teacher') {
                    // $staffs = $this->staffRepository->getActiveAllTeachersForIdCard();
                    $staffs = $this->staffRepository->getActiveAllStaffForIdCard();
                }

                if (count($staffs) > 0) {
                    $staffs = $this->formatStaffsDataForIdcard($staffs);
                }
            }

            $headerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'header', 'background_color');
            $bodyBackgroundColorStyles = $this->getStyles($idCardCertificate, 'body', 'background_color');
            $footerBackgroundColorStyles = $this->getStyles($idCardCertificate, 'footer', 'background_color');
            $backpageBackgroundColorStyles = $this->getStyles($idCardCertificate, 'back_page', 'background_color');
            $headerSchoolTitleStyles = $this->getStyles($idCardCertificate, 'header', 'school_title');
            $headerTitleTwoStyles = $this->getStyles($idCardCertificate, 'header', 'title_2');
            $headerTitleThreeStyles = $this->getStyles($idCardCertificate, 'header', 'title_3');
            $bodyLabelStyles = $this->getStyles($idCardCertificate, 'body', 'body_label');
            $bodyValueStyles = $this->getStyles($idCardCertificate, 'body', 'body_value');
            $footerTitleOneStyles = $this->getStyles($idCardCertificate, 'footer', 'title_1');
            $footerTitleTwoStyles = $this->getStyles($idCardCertificate, 'footer', 'title_2');
            $backpageTitleOneStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_1');
            $backpageTitleTwoStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_2');
            $backpageBodyLabelStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_label');
            $backpageBodyValueStyles = $this->getStyles($idCardCertificate, 'back_page', 'body_value');
            $backpageTitleThreeStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_3');
            $backpageTitleFourStyles = $this->getStyles($idCardCertificate, 'back_page', 'title_4');
        }

        return view("pdf.certificate.id_card_certificate", [
            'students' => $students,
            'staffs' => $staffs,
            'idCardCertificate' => $idCardCertificate?->toArray(),
            'headerSchoolTitleStyles' => $headerSchoolTitleStyles,
            'headerTitleTwoStyles' => $headerTitleTwoStyles,
            'headerTitleThreeStyles' => $headerTitleThreeStyles,
            'bodyLabelStyles' => $bodyLabelStyles,
            'bodyValueStyles' => $bodyValueStyles,
            'footerTitleOneStyles' => $footerTitleOneStyles,
            'footerTitleTwoStyles' => $footerTitleTwoStyles,
            'backpageTitleOneStyles' => $backpageTitleOneStyles,
            'backpageTitleTwoStyles' => $backpageTitleTwoStyles,
            'backpageBodyLabelStyles' => $backpageBodyLabelStyles,
            'backpageBodyValueStyles' => $backpageBodyValueStyles,
            'backpageTitleThreeStyles' => $backpageTitleThreeStyles,
            'backpageTitleFourStyles' => $backpageTitleFourStyles,
            'headerBackgroundColorStyles' => $headerBackgroundColorStyles,
            'bodyBackgroundColorStyles' => $bodyBackgroundColorStyles,
            'footerBackgroundColorStyles' => $footerBackgroundColorStyles,
            'backpageBackgroundColorStyles' => $backpageBackgroundColorStyles,
        ]);
    }


    /*
    * helper method to get styles
    */
    protected function getStyles(array|object $idCardCertificate, string $type, string $name)
    {
        $defaultStyles = [
            'header' => [
                'background_color' => "",
                'school_title' => [
                    'font_weight' => 500,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '12',
                    'text_align' => 'center',
                ],
                'title_2' => [
                    'font_weight' => 500,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '8',
                    'text_align' => 'center',
                ],
                'title_3' => [
                    'font_weight' => 500,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '6',
                    'text_align' => 'center',
                ]
            ],
            'body' => [
                'background_color' => "",
                'body_label' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '11',
                    'text_align' => 'left',
                ],
                'body_value' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#0b52bd',
                    'font_size' => '11',
                    'text_align' => 'left',
                ]
            ],
            'footer' => [
                'background_color' => "",
                'title_1' => [
                    'font_weight' => 500,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '9',
                    'text_align' => 'left',
                ],
                'title_2' => [
                    'font_weight' => 500,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '9',
                    'text_align' => 'left',
                ]
            ],
            'back_page' => [
                'background_color' => "",
                'title_1' => [
                    'font_weight' => 600,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '14',
                    'text_align' => 'left',
                ],
                'title_2' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '14',
                    'text_align' => 'left',
                ],
                'body_label' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '12',
                    'text_align' => 'left',
                ],
                'body_value' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#0b52bd',
                    'font_size' => '12',
                    'text_align' => 'left',
                ],
                'title_3' => [
                    'font_weight' => 600,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '14',
                    'text_align' => 'left',
                ],
                'title_4' => [
                    'font_weight' => 400,
                    'font_style' => 'normal',
                    'text_decoration' => 'none',
                    'color' => '#000',
                    'font_size' => '14',
                    'text_align' => 'left',
                ]
            ],
        ];

        $styles = "";

        if ($name != 'background_color' && !empty($idCardCertificate[$type][$name])) {
            $fontWeight = 'font-weight:' . ($idCardCertificate[$type][$name]['font_weight_bold'] == true ? 700 : $defaultStyles[$type][$name]['font_weight'] ?? "") . ";";
            $fontStyle = 'font-style:' . ($idCardCertificate[$type][$name]['font_style_italic'] == true ? 'italic' : $defaultStyles[$type][$name]['font_style'] ?? "") . ";";
            $textDecoration = 'text-decoration:' . ($idCardCertificate[$type][$name]['text_decoration_linethrough'] == true ? 'line-through' : ($idCardCertificate[$type][$name]['text_decoration_underline'] == true ? 'underline' : $defaultStyles[$type][$name]['text_decoration'] ?? "")) . ";";
            $textAlign = 'text-align:' . ($idCardCertificate[$type][$name]['text_align'] ?? $defaultStyles[$type][$name]['text_align'] ?? "") . ';';
            $color = 'color:' . ($idCardCertificate[$type][$name]['color'] ?? $defaultStyles[$type][$name]['color'] ?? "") . ';';
            $fontSize = 'font-size:' . ($idCardCertificate[$type][$name]['font_size'] ?? $defaultStyles[$type][$name]['font_size'] ?? "") . 'px;';

            $styles = "{$fontWeight} {$fontStyle} {$textDecoration} {$textAlign} {$color} {$fontSize}";
        }

        if ($name == 'background_color' && isset($idCardCertificate[$type][$name])) {
            $backgroundColor = 'background-color:' . ($idCardCertificate[$type][$name] ?? "") . ";";

            $styles = "{$backgroundColor}";
        }

        return $styles;
    }

    /*
    * helper method to format students data
    */
    protected function formatStudentsDataForIdCard(object $students)
    {
        $formattedData = $students->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom'] = $student?->promotedClassroom;
            }

            $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

            $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

            $motherName = ($student?->mother?->first_name ?? "") . " " . ($student?->mother?->middle_name ?? "") . " " . ($student?->mother?->last_name ?? "");

            return [
                'student_name' => $studentName,
                'admission_number' => $student?->admission_no,
                'class_name' => $student?->classroom?->title ?? "",
                'roll_number' => $student?->classroomRoll?->roll_no,
                'gender' => $student?->gender,
                'date_of_birth' => !empty($student->birth_date_at) ? Carbon::parse($student?->birth_date_at)->format('d-m-Y') : "",
                'address' => $student?->present_address,
                'house_name' => $student?->student_house?->house?->name ?? "",
                'blood_group' => $student?->blood_group_name?->name ?? "",
                'student_type' => $student?->boarding_type,
                'student_aadharcard_no' => $student?->aadhar_card_no,
                'father_name' => $fatherName,
                'father_phone' => $student?->father?->phone,
                'mother_name' => $motherName,
                'mother_phone' => $student?->mother?->phone,
                'permanent_address' => $student?->permanent_address,
                'student_image' => $student?->studentImage?->path ?? "//style.anu.edu.au/_anu/4/images/placeholders/person.png",
            ];
        })->sortBy('roll_number')->toArray();

        return $formattedData;
    }


    /*
    * helper method to format staffs data
    */
    protected function formatStaffsDataForIdCard(object $staffs)
    {
        $formattedData = $staffs?->map(function ($staff) {
            $staffName = ($staff?->first_name ?? "") . " " . ($staff?->middle_name ?? "") . " " . ($staff?->last_name ?? "");

            return [
                'staff_name' => $staffName,
                'designation' => $staff?->designation_name,
                'department' => $staff?->department_name,
                'father_name' => $staff?->father_name,
                'gender' => $staff?->gender,
                'doj' => !empty($staff->join_date_at) ? Carbon::parse($staff?->join_date_at)->format('d-m-Y') : "",
                'dob' => !empty($staff->birth_date_at) ? Carbon::parse($staff?->birth_date_at)->format('d-m-Y') : "",
                'religion' => $staff?->religion_name,
                // 'caste' => '',
                // 'biometric_code' => '',
                'employee_id' => $staff?->employee_id,
                'qualification' => $staff?->qualification,
                'city' => $staff?->city,
                'blood_group' => $staff?->blood_group_name,
                'address' => $staff?->address,
                'staff_image' => $staff?->staffProfileImage?->path ?? "//style.anu.edu.au/_anu/4/images/placeholders/person.png",
            ];
        })->sortBy('employee_id')->toArray();

        return $formattedData;
    }

    /*
    * helper method to format id card certificate data
    */
    protected function formatIdCardCertificateData(object $idCardCertificate, array $schoolData)
    {
        $columns = !empty($idCardCertificate['columns']) ? json_decode($idCardCertificate['columns'], true) : [];

        $sortedColumns = $columns;

        usort($sortedColumns, function ($item1, $item2) {
            return $item1['order'] <=> $item2['order'];
        });

        $idCardCertificate['column_data'] = $sortedColumns;
        $idCardCertificate['title'] = $idCardCertificate?->template_name;
        $idCardCertificate['columns'] = $columns;
        $idCardCertificate['header'] = !empty($idCardCertificate['header']) ? json_decode($idCardCertificate['header'], true) : null;
        $idCardCertificate['body'] = !empty($idCardCertificate['body']) ? json_decode($idCardCertificate['body'], true) : null;
        $idCardCertificate['footer'] = !empty($idCardCertificate['footer']) ? json_decode($idCardCertificate['footer'], true) : null;
        $idCardCertificate['back_page'] = !empty($idCardCertificate['back_page']) ? json_decode($idCardCertificate['back_page'], true) : null;
        $idCardCertificate['background_image'] = $idCardCertificate?->backgroundImage?->path ?? "";
        $idCardCertificate['header_background_image'] = $idCardCertificate?->headerBackgroundImage?->path ?? "";
        $idCardCertificate['body_background_image'] = $idCardCertificate?->bodyBackgroundImage?->path ?? "";
        $idCardCertificate['footer_background_image'] = $idCardCertificate?->footerBackgroundImage?->path ?? "";
        $idCardCertificate['footer_signature_image'] = $idCardCertificate?->footerSignatureImage?->path ?? "";
        $idCardCertificate['backpage_background_image'] = $idCardCertificate?->backpageBackgroundImage?->path ?? "";
        $idCardCertificate['school_logo'] =  $schoolData['logo']['path'] ?? "";
        $idCardCertificate['academic_session'] =  $schoolData['academic_year'] ?? "";

        $idCardCertificate->makeHidden([
            'backgroundImage',
            'headerBackgroundImage',
            'bodyBackgroundImage',
            'footerBackgroundImage',
            'backpageBackgroundImage',
            'footerSignatureImage'
        ]);

        return $idCardCertificate;
    }
}
