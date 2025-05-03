<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\BookRequest;
use App\Http\Requests\EBookRequest;
use App\Repositories\IBookRepository;
use App\Repositories\IAuthorRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IImageRepository;
use App\Repositories\ISubjectRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\IFileRepository;

class EBookController extends Controller
{
    private $_upload;
    public function __construct(
        private IBookRepository $bookRepository,
        private IAuthorRepository $authorRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private ICategoryRepository $categoryRepository,
        private IFileRepository $fileRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view library', ['only' => ['index', 'documentDownload']]);
        $this->middleware('permission:add library', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit library', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete library', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $ebookList = $this->bookRepository->getActiveAllEBook();
        if (!empty($ebookList)) {
            $ebookList->load(
                [
                    'bookCategory' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'document'
                ]
            );
        }

        return Inertia::render('EBook/EBookList', [
            'ebookList' => $ebookList,
        ]);
    }

    /**
     * create e-book form
     */
    public function create(Request $request): Response
    {
        // class names
        $classNames = $this->classroomRepository->getActiveClassNameAndId()?->map(
            fn ($className) => [
                'id' => $className->id,
                'title' => $className->title
            ]
        )->all();

        // subjects
        $subjects = $this->subjectRepository->getActiveNameAndId()?->map(
            fn ($subject) => [
                'id' => $subject->id,
                'title' => $subject->title
            ]
        )->all();

        // book category
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory();

        return Inertia::render('EBook/Create', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'bookCategory' => $bookCategory,
        ]);
    }

    /**
     * save e-book
     */
    public function save(EBookRequest $request): RedirectResponse
    {
        $input = $request->validated();
 
        try {
            DB::beginTransaction();
            $documentName = $request->file('document')->getClientOriginalName();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'category_id' => $input['category_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'book_title' => $input['book_title'] ?? null,
                'author' => $input['author'] ?? null,
                'edition' => $input['edition'] ?? null,
                'document_name' => $documentName ?? null,
                'status' => Status::ACTIVE->value,
            );
            $ebook = $this->bookRepository->createEBook($dataArray);

            if (!empty($ebook['id']) && !empty($request->file('document'))) {
                $document_url = $this->_upload->uploadSingleFile($request, 'document', 'ebook_document');

                $dataFile = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'fileable_type' => \App\Models\EBook::class,
                    'fileable_id' => $ebook['id'],
                    'name' => $document_url['name'],
                    'path' => !empty($document_url['path']) ? $document_url['path'] : null,
                    'file_name' => $document_url['file_name'],
                );
                $this->fileRepository->morphCreate($dataFile);
            }

            DB::commit();
            return redirect()->back()->with('message', 'Upload successfully');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('EBook/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(BookRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('book.edit');
    }

    /**
     * delete e book
     */
    public function destroy(int $id)
    {
        try {
            DB::beginTransaction();
            $ebook = $this->bookRepository->getByIdEBook($id)?->load('document');

            $this->imageRepository->delete($ebook?->document?->id);
            $this->bookRepository->deleteEBook($id);

            DB::commit();
            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function documentDownload(Request $request)
    {
        try {
            $documentUrl = $request->input('document_url');

            // Initialize S3 client
            // $s3 = new S3Client([
            //     'version' => 'latest',
            //     'region' => 'your-s3-region',
            //     'credentials' => [
            //         'key'    => 'your-aws-access-key-id',
            //         'secret' => 'your-aws-secret-access-key',
            //     ],
            // ]);

            // // Generate a pre-signed URL for the file
            // $command = $s3->getCommand('GetObject', [
            //     'Bucket' => 'your-s3-bucket-name',
            //     'Key' => $documentUrl,
            // ]);

            // $presignedUrl = $s3->createPresignedRequest($command, '+1 hour')->getUri();

            // // Redirect to the pre-signed URL for downloading the file
            // return redirect()->away((string) $presignedUrl);


        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }
}
