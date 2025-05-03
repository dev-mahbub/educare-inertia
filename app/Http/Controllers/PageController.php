<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\PageType;
use Illuminate\Http\Request;
use App\Http\Requests\PageRequest;
use Illuminate\Support\Facades\DB;
use App\Repositories\IPageRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IImageRepository;

class PageController extends Controller
{
    private $_upload;

    public function __construct(
        private IPageRepository $pageRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view schools', ['only' => ['index']]);
        $this->middleware('permission:add schools', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit schools', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete schools', ['only' => ['destroy']]);
    }

    /**
     * Display Pages.
     */
    public function index(Request $request): Response
    {
        $lists = $this->pageRepository->getActiveAll();

        return Inertia::render('Page/Show', [
            'lists' => $lists,
        ]);
    }

    /**
     * Create Page.
     */
    public function create(): Response
    {
        $pageTypes = buildEnumOptionsArray(PageType::cases());
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Page/Create', [
            'statusArr' => $statusArr,
            'pageTypes' => $pageTypes,
        ]);
    }

    /**
     * Save Page
     */
    public function save(PageRequest $request): RedirectResponse
    {
        $input = $request->validated();
        DB::beginTransaction();

        try {
            $image = null;
            // upload page image
            if (!empty($request->file('image'))) {
                $image = $this->_upload->uploadImage($request, 'image', 'image');
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'title' => !empty($input['title']) ? $input['title'] : null,
                'body_text' => !empty($input['body_text']) ? $input['body_text'] : null,
                'page_type' => !empty($input['page_type']) ? $input['page_type'] : null,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
                'image' => $image
            );

            $this->pageRepository->create($dataArray);

            DB::commit();
            return redirect()->route('page.list')->with('message', 'Page Created Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Edit Page
     */
    public function edit(int $id): Response
    {
        $page = $this->pageRepository->getById($id);
        $pageTypes = buildEnumOptionsArray(PageType::cases());

        abort_if(empty($page), 404);
        $statusArr = [];

        foreach (Status::cases() as $case) {
            if ($case->value != Status::PENDING->value) {
                array_push($statusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Page/Edit', [
            'statusArr' => $statusArr,
            'pageTypes' => $pageTypes,
            'page' => $page,
        ]);
    }

    /**
     * Update Page
     */
    public function update(int $id, PageRequest $request): RedirectResponse
    {

        $page = $this->pageRepository->getById($id);
        abort_if(empty($page), 404);
        DB::beginTransaction();

        try {
            $input = $request->all();

            $dataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : null,
                'body_text' => !empty($input['body_text']) ? $input['body_text'] : null,
                'page_type' => !empty($input['page_type']) ? $input['page_type'] : null,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            );
            // upload page image
            if (!empty($request->file('image'))) {
                $image = $this->_upload->uploadImage($request, 'image', 'image');
                $dataArray['image'] = $image;
            }

            $this->pageRepository->update($id, $dataArray);

            DB::commit();

            return redirect()->route('page.list')->with('message', 'Page Updated Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Delete Page.
     */
    public function destroy(int $id): RedirectResponse
    {
        $page = $this->pageRepository->getById($id);

        if (!$page) {
            return redirect()->route('page.list')->with('errors', 'Something goes wrong.');
        }
        $page->delete($id);
        return redirect()->route('page.list')->with('message', 'Page deleted successfully.');
    }
}
