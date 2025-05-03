<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\NoticeType;
use App\Enums\OrderByType;
use App\Enums\AudienceType;
use App\Enums\NoticeStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\NoticeRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IImageRepository;
use App\Repositories\NoticeRepository;
use App\Repositories\INoticeRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class NoticeController extends Controller
{
    private $_upload;

    public function __construct(
        private INoticeRepository $noticeRepository,
        private IClassroomRepository $classroomRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view notice', ['only' => ['index']]);
        $this->middleware('permission:add notice', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit notice', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete notice', ['only' => ['destroy']]);
    }

    /**
     * Display Notices
     */
    public function index(Request $request): Response
    {
        $noticeStatusArr = buildEnumOptionsArray(NoticeStatus::cases());
        $orderByTypes = buildEnumOptionsArray(OrderByType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());

        $noticeStatus = "";
        $orderByDate = "";
        $audienceType = "";

        if ($request->isMethod('POST')) {
            $noticeStatus = $request->notice_status ?? "";
            $orderByDate = $request->order_by_date ?? "";
            $audienceType = $request->audience_type ?? "";
        }

        $noticeLists = $this->noticeRepository->getFilteredNoticeLists($noticeStatus, $orderByDate, $audienceType);

        if (count($noticeLists) > 0) {
            $noticeLists = $noticeLists->map(function ($notice) {
                $createdDate = !empty($notice->created_at) ? Carbon::parse($notice->created_at)->format('d-M-Y H:i A') : "";
                $publishDate = !empty($notice->start_date) ? Carbon::parse($notice->start_date)->format('d-M-Y H:i A') : "";

                $notice['created_date'] = $createdDate;
                $notice['publish_date'] = $publishDate;

                return $notice;
            });
        }

        return Inertia::render('Notice/Show', [
            'noticeLists' => $noticeLists,
            'noticeStatusArr' => $noticeStatusArr,
            'orderByTypes' => $orderByTypes,
            'audienceTypes' => $audienceTypes,
        ]);
    }

    /**
     * Create Notice
     */
    public function create(): Response
    {
        $noticeTypes = buildEnumOptionsArray(NoticeType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());
        $classrooms = $this->classroomRepository->getActiveAll();
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Notice/Create', [
            'statusArr' => $statusArr,
            'noticeTypes' => $noticeTypes,
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Save Notice
     */
    public function save(NoticeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'title' => !empty($input['title']) ? $input['title'] : null,
                'details' => !empty($input['details']) ? $input['details'] : null,
                'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : null,
                'notice_type' => !empty($input['notice_type']) ? $input['notice_type'] : null,
                'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : false,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            );

            $notice = $this->noticeRepository->create($dataArray);

            // upload notice image
            if (!empty($input['notice_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'notice_image', 'notice_image');

                if (!empty($imageUrl)) {
                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => $notice->getMorphClass(),
                        'imageable_id' => $notice->id,
                        'name' => "notice_image",
                        'path' => $imageUrl,
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->morphCreate($dataImage, $notice->id);
                }
            }

            // assign class
            if ($input['audience_type'] == AudienceType::STUDENT->value && !empty($input['classroom_ids'])) {
                foreach ($input['classroom_ids'] as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'notice_id' => $notice->id,
                        'classroom_id' => $classroomId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->noticeRepository->createNoticeClassroom($dataArray);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Notice Created Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Edit Notice
     */
    public function edit(int $id): Response
    {
        $notice = $this->noticeRepository->getNoticeById($id);

        abort_if(empty($notice), 404);

        $noticeTypes = buildEnumOptionsArray(NoticeType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());
        $classrooms = $this->classroomRepository->getActiveAll();
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Notice/Edit', [
            'statusArr' => $statusArr,
            'noticeTypes' => $noticeTypes,
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
            'notice' => $notice,
        ]);
    }

    /**
     * Update Notice
     */
    public function update(int $id, NoticeRequest $request): RedirectResponse
    {
        $notice = $this->noticeRepository->getNoticeById($id);

        abort_if(empty($notice), 404);

        DB::beginTransaction();

        try {
            $input = $request->validated();

            $dataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : null,
                'details' => !empty($input['details']) ? $input['details'] : null,
                'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : null,
                'notice_type' => !empty($input['notice_type']) ? $input['notice_type'] : null,
                'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : false,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            );

            $this->noticeRepository->update($id, $dataArray);

            // upload event image
            if (!empty($input['notice_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'notice_image', 'notice_image');

                if (!empty($imageUrl)) {
                    $attributesToCheck = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => $notice->getMorphClass(),
                        'imageable_id' => $notice->id,
                        'name' => "notice_image",
                    );

                    $valuesToUpdate = array(
                        'path' => $imageUrl,
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }

            //update class
            if ($input['audience_type'] == AudienceType::STUDENT->value && !empty($input['classroom_ids'])) {
                $currentClassroomIds = $notice?->noticeClassrooms?->pluck('classroom_id')?->toArray();
                $newClassroomIds = !empty($input['classroom_ids']) ? $input['classroom_ids'] : [];

                $idsToUpdate = array_diff($newClassroomIds, $currentClassroomIds);
                $idsToDelete = array_diff($currentClassroomIds, $newClassroomIds);

                $this->noticeRepository->deleteNoticeClassroomsByIds($id, $idsToDelete);

                if (!empty($idsToUpdate)) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'notice_id' => $id,
                    ];

                    foreach ($idsToUpdate as $classroomId) {
                        $attributesToCheck['classroom_id'] = $classroomId;

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        $this->noticeRepository->updateOrCreateNoticeClassroom($attributesToCheck, $valuesToUpdate);
                    }
                }
            } else {
                if ($notice?->noticeClassrooms?->count() > 0) {
                    $notice->noticeClassrooms->each(function ($noticeClassroom) {
                        $noticeClassroom->delete();
                    });
                }
            }

            DB::commit();

            return redirect()->route('notice.list')->with('message', 'Notice Updated Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Delete Notice
     */
    public function destroy(int $id): RedirectResponse
    {
        $notice = $this->noticeRepository->getNoticeById($id);

        abort_if(empty($notice), 404);

        DB::beginTransaction();

        try {
            if ($notice?->image != null) {
                $notice->image->delete();
            }

            if ($notice?->noticeClassrooms?->count() > 0) {
                $notice->noticeClassrooms->each(function ($noticeClassroom) {
                    $noticeClassroom->delete();
                });
            }

            $notice->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Notice Deleted Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }
}
