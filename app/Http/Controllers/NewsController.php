<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\NewsType;
use App\Enums\NewsStatus;
use App\Enums\OrderByType;
use App\Enums\AudienceType;
use Illuminate\Http\Request;
use App\Http\Requests\NewsRequest;
use Illuminate\Support\Facades\DB;
use App\Repositories\NewsRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\INewsRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IImageRepository;
use App\Repositories\IStateRepository;
use App\Repositories\CountryRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\TimezoneRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ITimezoneRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class NewsController extends Controller
{
    private $_upload;

    public function __construct(
        private INewsRepository $newsRepository,
        private IClassroomRepository $classroomRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view news', ['only' => ['index']]);
        $this->middleware('permission:add news', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit news', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete news', ['only' => ['destroy']]);
    }

    /**
     * Display News
     */
    public function index(Request $request): Response
    {
        $newsStatusArr = buildEnumOptionsArray(NewsStatus::cases());
        $orderByTypes = buildEnumOptionsArray(OrderByType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());

        $newsStatus = "";
        $orderByDate = "";
        $audienceType = "";

        if ($request->isMethod('POST')) {
            $newsStatus = $request->news_status ?? "";
            $orderByDate = $request->order_by_date ?? "";
            $audienceType = $request->audience_type ?? "";
        }

        $newsLists = $this->newsRepository->getFilteredNewsLists($newsStatus, $orderByDate, $audienceType);

        if (count($newsLists) > 0) {
            $newsLists = $newsLists->map(function ($news) {
                $createdDate = !empty($news->created_at) ? Carbon::parse($news->created_at)->format('d-M-Y H:i A') : "";
                $publishDate = !empty($news->start_date) ? Carbon::parse($news->start_date)->format('d-M-Y H:i A') : "";

                $news['created_date'] = $createdDate;
                $news['publish_date'] = $publishDate;

                return $news;
            });
        }

        return Inertia::render('News/Show', [
            'newsLists' => $newsLists,
            'newsStatusArr' => $newsStatusArr,
            'orderByTypes' => $orderByTypes,
            'audienceTypes' => $audienceTypes,
        ]);
    }

    /**
     * Create News.
     */
    public function create(): Response
    {
        $newsTypes = buildEnumOptionsArray(NewsType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());
        $classrooms = $this->classroomRepository->getActiveAll();
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('News/Create', [
            'statusArr' => $statusArr,
            'newsTypes' => $newsTypes,
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Save News
     */
    public function save(NewsRequest $request): RedirectResponse
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
                'news_type' => !empty($input['news_type']) ? $input['news_type'] : null,
                'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : false,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            );

            $news = $this->newsRepository->create($dataArray);

            // upload news image
            if (!empty($input['news_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'news_image', 'news_image');

                if (!empty($imageUrl)) {
                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => $news->getMorphClass(),
                        'imageable_id' => $news->id,
                        'name' => "news_image",
                        'path' => $imageUrl,
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->morphCreate($dataImage, $news->id);
                }
            }

            // assign class
            if ($input['audience_type'] == AudienceType::STUDENT->value && !empty($input['classroom_ids'])) {
                foreach ($input['classroom_ids'] as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'news_id' => $news->id,
                        'classroom_id' => $classroomId,
                        'status' => Status::ACTIVE,
                    ];

                    $this->newsRepository->createNewsClassroom($dataArray);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'News Created Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Edit News
     */
    public function edit(int $id): Response
    {
        $news = $this->newsRepository->getNewsById($id);

        abort_if(empty($news), 404);

        $newsTypes = buildEnumOptionsArray(NewsType::cases());
        $audienceTypes = buildEnumOptionsArray(AudienceType::cases());
        $classrooms = $this->classroomRepository->getActiveAll();
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('News/Edit', [
            'statusArr' => $statusArr,
            'newsTypes' => $newsTypes,
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
            'news' => $news,
        ]);
    }

    /**
     * Update News
     */
    public function update(int $id, NewsRequest $request): RedirectResponse
    {
        $news = $this->newsRepository->getNewsById($id);

        abort_if(empty($news), 404);

        DB::beginTransaction();

        try {
            $input = $request->validated();

            $dataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : null,
                'details' => !empty($input['details']) ? $input['details'] : null,
                'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : null,
                'news_type' => !empty($input['news_type']) ? $input['news_type'] : null,
                'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : false,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            );

            $this->newsRepository->update($id, $dataArray);

            // upload event image
            if (!empty($input['news_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'news_image', 'news_image');

                if (!empty($imageUrl)) {
                    $attributesToCheck = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => $news->getMorphClass(),
                        'imageable_id' => $news->id,
                        'name' => "news_image",
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
                $currentClassroomIds = $news?->newsClassrooms?->pluck('classroom_id')?->toArray();
                $newClassroomIds = !empty($input['classroom_ids']) ? $input['classroom_ids'] : [];

                $idsToUpdate = array_diff($newClassroomIds, $currentClassroomIds);
                $idsToDelete = array_diff($currentClassroomIds, $newClassroomIds);

                $this->newsRepository->deleteNewsClassroomsByIds($id, $idsToDelete);

                if (!empty($idsToUpdate)) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'news_id' => $id,
                    ];

                    foreach ($idsToUpdate as $classroomId) {
                        $attributesToCheck['classroom_id'] = $classroomId;

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        $this->newsRepository->updateOrCreateNewsClassroom($attributesToCheck, $valuesToUpdate);
                    }
                }
            } else {
                if ($news?->newsClassrooms?->count() > 0) {
                    $news->newsClassrooms->each(function ($newsClassroom) {
                        $newsClassroom->delete();
                    });
                }
            }

            DB::commit();

            return redirect()->route('news.list')->with('message', 'News Updated Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Delete News.
     */
    public function destroy(int $id): RedirectResponse
    {
        $news = $this->newsRepository->getNewsById($id);

        abort_if(empty($news), 404);

        DB::beginTransaction();

        try {
            if ($news?->image != null) {
                $news->image->delete();
            }

            if ($news?->newsClassrooms?->count() > 0) {
                $news->newsClassrooms->each(function ($newsClassroom) {
                    $newsClassroom->delete();
                });
            }

            $news->delete();

            DB::commit();

            return redirect()->back()->with('message', 'News Deleted Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }
}
