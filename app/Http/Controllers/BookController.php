<?php

namespace App\Http\Controllers;

use App\Enums\BookType;
use App\Enums\BookTypeStatus;
use App\Enums\BookTypeUser;
use App\Enums\CategoryType;
use App\Enums\PaymentMode;
use App\Enums\Status;
use App\Http\Requests\BookInHouseRequest;
use App\Http\Requests\BookPurchaseRequest;
use App\Http\Requests\BookRequest;
use App\Http\Requests\BookReturnRequest;
use App\Http\Requests\CategoryRequest;
use App\Repositories\IBookRepository;
use App\Repositories\IAuthorRepository;
use App\Repositories\IBankRepository;
use App\Repositories\IBookPurchaseRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ILibraryRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITypeRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class BookController extends Controller
{

    public function __construct(
        private IBookRepository $bookRepository,
        private IAuthorRepository $authorRepository,
        private ICategoryRepository $categoryRepository,
        private ITypeRepository $typeRepository,
        private ILibraryRepository $libraryRepository,
        private IBankRepository $bankRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IBookPurchaseRepository $bookPurchaseRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view library', ['only' => ['bookCategory', 'index', 'totalBookList', 'purchase',
            'purchaseHistory', 'inhouse', 'bookSearchByLocation', 'allocateBookToLocation'
        ]]);
        $this->middleware('permission:add library', ['only' => ['bookCategorySave', 'damageLostBookSave', 'bookPurchaseSave',
            'inhouseSave', 'inactive', 'import', 'issue', 'bookIssueSave', 'return', 'returnSave', 'multiIssuesBooks'
        ]]);
        $this->middleware('permission:edit library', ['only' => ['updateBookAccNoPrice', 'inhouseEdit', 'bookStatusUpdate']]);
        $this->middleware('permission:delete library', ['only' => ['bookCategoryDestroy']]);
    } 

    /**
     * bookCategory
     */
    public function bookCategory(Request $request): Response
    {
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory();

        return Inertia::render('Book/BookCategory', [
            'bookCategory' => $bookCategory,
        ]);
    }

    /**
     * bookCategorySave
     */
    public function bookCategorySave(CategoryRequest $request)
    {
        $input = $request->validated();
        $checkData = [
            'id' => $input['id'] ?? null
        ];
        $arrayData = [
            'school_id' => getUserSchoolId(),
            'parent_id' => $input['parent_id'] ?? null,
            'category_type' =>  CategoryType::BOOK->value,
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE->value,
        ];
        $bookCategory = $this->categoryRepository->updateOrCreate($checkData, $arrayData);
        if (!$bookCategory) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Save successfully.');
    }

    /**
     * book category destroy
     */
    public function bookCategoryDestroy(int $id)
    {

        $bookCategory = $this->categoryRepository->getById($id);
        if (!$bookCategory) {
            return redirect()->route('book.book_category_list')->with('errors', 'Something goes wrong.');
        }
        $this->categoryRepository->delete($id);
        return redirect()->route('book.book_category_list')->with('message', 'Deleted successfully.');
    }

    /**
     * index
     */
    public function index(Request $request): Response
    {

        $title = null;
        $author = null;
        $publisherName = null;
        $classNameId =  null;
        $categoryId = null;

        if ($request->isMethod('post')) {
            $title = $request->input('book_title') ?? null;
            $author = $request->input('author') ?? null;
            $publisherName = $request->input('publisher_name') ?? null;
            $classNameId = $request->input('class_name_id') ?? null;
            $categoryId = $request->input('category_id') ?? null;
        }

        $bookListData = $this->bookPurchaseRepository->getActiveAllMasterBookList($title, $author, $publisherName, $classNameId, $categoryId);

        // book category
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory()?->map(
            fn ($bookCat) => [
                'id' => $bookCat->id,
                'title' => $bookCat->title
            ]
        )->all();

        // class names
        $classNames = $this->classroomRepository->getActiveClassNameAndId()?->map(
            fn ($className) => [
                'id' => $className->id,
                'title' => $className->title
            ]
        )->all();

        return Inertia::render('Book/MasterBookList', [
            'bookListData' => $bookListData,
            'bookCategory' => $bookCategory,
            'classNames' => $classNames,
        ]);
    }

    /**
     * total book list
     */
    public function totalBookList(Request $request): Response
    {
        $acc_no = null;
        $book_title = null;
        $author = null;
        $publisher_name = null;
        $class_name_id = null;
        $category_id = null;
        $type_id = null;
        $book_type_status = null;
        $status = null;
        $start_date_at = null;
        $end_date_at = null;

        if ($request->isMethod('post')) {
            $acc_no = $request->input('acc_no') ?? null;
            $book_title = $request->input('book_title') ?? null;
            $author = $request->input('author') ?? null;
            $publisher_name = $request->input('publisher_name') ?? null;
            $class_name_id = $request->input('class_name_id') ?? null;
            $category_id = $request->input('category_id') ?? null;
            $type_id = $request->input('type_id') ?? null;
            $book_type_status = $request->input('book_type_status') ?? null;
            $status = $request->input('status') ?? null;
            $start_date_at = !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : null;
            $end_date_at = !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : null;
        }

        // total book list
        $totalBookList = $this->bookPurchaseRepository->getTotalBookList($acc_no, $book_title, $author, $publisher_name, $class_name_id, $category_id, $type_id, $book_type_status, $status, $start_date_at, $end_date_at);

        // book type status
        $bookTypeStatus = [];
        foreach (BookTypeStatus::cases() as $bookStatus) {
            array_push($bookTypeStatus, ['id' => $bookStatus->value, 'title' => $bookStatus->value]);
        }

        // book type user
        $bookTypeUser = [];
        foreach (BookTypeUser::cases() as $bookUser) {
            array_push($bookTypeUser, ['id' => $bookUser->value, 'title' => $bookUser->value]);
        }

        // class room
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // student name
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(
            fn ($student) =>
            [
                'id' => $student->id,
                'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
            ]
        )->all();

        // teacher name
        $teachers = $this->staffRepository->getActiveTeacherNameId();
        $teacherData = $teachers->map(
            fn ($teacher) =>
            [
                'id' => $teacher->id,
                'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name),
            ]
        )->all();

        // class room
        $classnames = $this->classroomRepository->getActiveClassNameAndId();
        $classNameData = $classnames->map(fn ($className) => ['id' => $className->id, 'title' => $className->title])->all();

        // book category
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory()?->map(
            fn ($bookCat) => [
                'id' => $bookCat->id,
                'title' => $bookCat->title
            ]
        )->all();

        // book type
        $bookType = $this->typeRepository->getActiveAllBookTypeNameId();

        return Inertia::render('Book/TotalBookList', [
            'totalBookList' => $totalBookList,
            'bookTypeStatus' => $bookTypeStatus,
            'bookTypeUser' => $bookTypeUser,
            'classrooms' => $classrooms,
            'students' => $students,
            'teacherData' => $teacherData,
            'classNameData' => $classNameData,
            'bookCategory' => $bookCategory,
            'bookType' => $bookType,
        ]);
    }

    public function damageLostBookSave(Request $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->validate(
                [
                    'id' => ['required', 'integer'],
                    'book_type_status' => ['required', 'string'],
                    'book_user_type' => ['required', 'string'],
                    'classroom_id' => ['nullable', 'integer'],
                    'student_id' => ['nullable', 'integer'],
                    'staff_id' => ['nullable', 'integer'],
                    'damage_lost_date_at' => ['nullable', 'date'],
                    'damage_lost_note' => ['nullable', 'string'],
                ]
            );
            $dataArray = [
                'book_type_status' => $input['book_type_status'],
                'book_user_type' => $input['book_user_type'],
                'classroom_id' => $input['classroom_id'],
                'student_id' => $input['student_id'],
                'staff_id' => $input['staff_id'],
                'damage_lost_date_at' => !empty($input['damage_lost_date_at']) ? \Carbon\Carbon::parse($input['damage_lost_date_at'])->format('Y-m-d') : null,
                'damage_lost_note' => $input['damage_lost_note'],
            ];
            $this->bookPurchaseRepository->updateBookAccNo($input['id'], $dataArray);
            DB::commit();
            return redirect()->back()->with('message', 'Successfully save.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something error.');
        }
    }

    public function updateBookAccNoPrice(Request $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->validate(
                [
                    'id' => ['required', 'integer'],
                    'acc_no' => ['required'],
                    'price' => ['nullable', 'numeric'],
                ]
            );
            $dataArray = [
                'acc_no' => $input['acc_no'],
                'price' => $input['price'],
            ];
            $this->bookPurchaseRepository->updateBookAccNo($input['id'], $dataArray);
            DB::commit();
            return redirect()->back()->with('message', 'Successfully update.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something error.');
        }
    }

    /**
     * purchase
     */
    public function purchase(Request $request): Response
    {
        // book type
        $bookTypes = $this->typeRepository->getActiveAllBookType();

        // payment mode
        $paymentMode = [];
        foreach (PaymentMode::cases() as $payment) {
            array_push($paymentMode, ['id' => $payment->value, 'title' => $payment->value]);
        }

        // libraryVendor
        $libraryVendor = $this->libraryRepository->getActiveAllLibraryVendor()?->map(
            fn ($vendor) => [
                'id' => $vendor->id,
                'title' => $vendor->vendor_name
            ]
        )->all();

        // bankNames
        $bankNames = $this->bankRepository->getActiveNameAndId()?->map(
            fn ($bank) => [
                'id' => $bank->id,
                'title' => $bank->name
            ]
        )->all();

        // book category
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory()?->map(
            fn ($bookCat) => [
                'id' => $bookCat->id,
                'title' => $bookCat->title
            ]
        )->all();

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

        return Inertia::render('Book/Purchase', [
            'bookTypes' => $bookTypes,
            'paymentMode' => $paymentMode,
            'libraryVendor' => $libraryVendor,
            'bankNames' => $bankNames,
            'bookCategory' => $bookCategory,
            'classNames' => $classNames,
            'subjects' => $subjects,
        ]);
    }

    public function bookPurchaseSave(BookPurchaseRequest $request)
    {
        try {
            $input = $request->validated();
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'library_vendor_id' => $input['library_vendor_id'] ?? null,
                'book_type_id' => $input['book_type_id'] ?? null,
                'bank_id' => $input['bank_id'] ?? null,
                'bill_number' => $input['bill_number'] ?? null,
                'purchase_date_at' => !empty($input['purchase_date_at']) ? \Carbon\Carbon::parse($input['purchase_date_at'])->format('Y-m-d') : null,
                'purchase_by' => $input['purchase_by'] ?? null,
                'payment_mode' => $input['payment_mode'] ?? null,
                'cheque_no' => $input['cheque_no'] ?? null,
                'cheque_date_at' => !empty($input['cheque_date_at']) ? \Carbon\Carbon::parse($input['cheque_date_at'])->format('Y-m-d') : null,
                'amount' => $input['amount'] ?? 0.0,
                'branch' =>  $input['branch'] ?? null,
                'transaction_no' => $input['transaction_no'] ?? null,
                'purchase_note' => $input['purchase_note'] ?? null,

                // book item
                'grace_total_price' => $input['grace_total_price'] ?? 0.0,
                'tax_amount' => $input['tax_amount'] ?? 0.0,
                'discount_type' => $input['discount_type'] ?? null,
                'discount_amount' => $input['discount_amount'] ?? 0.0,
                'discount' => $input['discount'] ?? 0.0,
                'total' => $input['grand_total'] ?? 0.0,
                'status' => Status::ACTIVE->value,
            ];

            $bookPurchase = $this->bookPurchaseRepository->create($dataArray);
            if (!empty($bookPurchase)) {
                $bookItems = $input['book_items'];
                if (!empty($bookItems)) {
                    foreach ($bookItems as $book) {
                        $bookArray =  [
                            'school_id' => getUserSchoolId(),
                            'book_purchase_id' => $bookPurchase->id,
                            'user_id' => auth()->user()->id ?? null,
                            'category_id' => $book['category_id'] ?? null,
                            'class_name_id'  => $book['class_name_id'] ?? null,
                            'subject_id'  => $book['subject_id'] ?? null,
                            'book_title' => $book['book_title'] ?? null,
                            'author'  => $book['author'] ?? null,
                            'quantity'  => $book['quantity'] ?? 0.00,
                            'price'  => $book['price'] ?? 0.00,
                            'item_total_price'  => $book['item_total_price'] ?? 0.00,
                            'type' => BookType::PURCHASE->value,
                            'status' => Status::ACTIVE->value,
                        ];
                        $bookItem = $this->bookPurchaseRepository->createBookItem($bookArray);

                        $bookQuantity = $book['quantity'];
                        if ($bookQuantity > 0) {
                            $bookAccNoArray =  [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'book_purchase_id' => $bookPurchase->id,
                                'book_item_id' => $bookItem->id,
                                'acc_no' => null,
                                'status' => Status::ACTIVE->value,
                            ];
                            for ($i = 0; $i < $bookQuantity; $i++) {
                                $insertedItem = $this->bookPurchaseRepository->createBookAccNo($bookAccNoArray);
                                if (!empty($insertedItem)) {
                                    $lastId = getAcademicYear() . ':' . $insertedItem->id;
                                    $this->bookPurchaseRepository->updateBookAccNo($insertedItem->id, ['acc_no' => $lastId]);
                                }
                            }
                        }
                    }
                }
                return redirect()->route('book.purchase')->with('message', 'Save successfully.');
            }
        } catch (\Throwable $e) {
            return redirect()->route('book.purchase')->with('error', 'Something error.');
        }
    }

    /**
     * purchaseHistory
     */
    public function purchaseHistory(Request $request): Response
    {
        $bookPurchase = [];
        $libraryVendorId = null;
        $startDate = null;
        $endDate = null;

        if ($request->isMethod('post')) {
            $libraryVendorId = $request->input('library_vendor_id');
            $startDate = !empty($request->input('start_date_at')) ? \Carbon\Carbon::parse($request->input('start_date_at'))->format('Y-m-d') : null;
            $endDate = !empty($request->input('end_date_at')) ? \Carbon\Carbon::parse($request->input('start_date_at'))->format('Y-m-d') : null;
        }

        // bookPurchase list
        $bookPurchase = $this->bookPurchaseRepository->getActiveAllBookPurchaseHistory($startDate, $endDate, $libraryVendorId);

        // libraryVendor
        $libraryVendor = $this->libraryRepository->getActiveAllLibraryVendor()?->map(
            fn ($vendor) => [
                'id' => $vendor->id,
                'title' => $vendor->vendor_name
            ]
        )->all();

        return Inertia::render('Book/PurchaseHistory', [
            'bookPurchase' => $bookPurchase,
            'libraryVendor' => $libraryVendor,
        ]);
    }

    /**
     * in house
     */
    public function inhouse(Request $request): Response
    {
        // book type
        $bookTypes = $this->typeRepository->getActiveAllBookType();

        // libraryVendor
        $libraryVendor = $this->libraryRepository->getActiveAllLibraryVendor()?->map(
            fn ($vendor) => [
                'id' => $vendor->id,
                'title' => $vendor->vendor_name
            ]
        )->all();

        // book category
        $bookCategory = $this->categoryRepository->getActiveAllBookCategory()?->map(
            fn ($bookCat) => [
                'id' => $bookCat->id,
                'title' => $bookCat->title
            ]
        )->all();

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

        return Inertia::render('Book/Inhouse', [
            'bookTypes' => $bookTypes,
            'libraryVendor' => $libraryVendor,
            'bookCategory' => $bookCategory,
            'classNames' => $classNames,
            'subjects' => $subjects,
        ]);
    }

    /**
     * in house save
     */
    public function inhouseSave(BookInHouseRequest $request)
    {
        try {
            $input = $request->validated();
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id ?? null,
                'category_id' => $input['category_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'library_vendor_id' => $input['library_vendor_id'] ?? null,
                'type_id' => $input['type_id'] ?? null,
                'quantity' => $input['quantity'] ?? 0.0,
                'book_title' => $input['book_title'] ?? null,
                'author' => $input['author'] ?? null,
                'author_two' => $input['author_two'] ?? null,
                'author_three' => $input['author_three'] ?? null,
                'publish_place' => $input['publish_place'] ?? null,
                'classification_no' => $input['classification_no'] ?? null,
                'purchasing_date_at' => !empty($input['purchasing_date_at']) ? \Carbon\Carbon::parse($input['purchasing_date_at'])->format('Y-m-d') : null,
                'publisher_name' => $input['publisher_name'] ?? null,
                'publish_year' => $input['publish_year'] ?? null,
                'isbn_number' => $input['isbn_number'] ?? null,
                'volume' => $input['volume'] ?? null,
                'edition' => $input['edition'] ?? null,
                'no_of_pages' => $input['no_of_pages'] ?? null,
                'type' => BookType::IN_HOUSE->value ?? null,
                'language' => $input['language'] ?? null,
                'price' => $input['price'] ?? 0.0,
                'bill_no' => $input['bill_no'] ?? null,
                'barcode' => $input['barcode'] ?? null,
                'book_entry_date_at' => !empty($input['book_entry_date_at']) ? \Carbon\Carbon::parse($input['book_entry_date_at'])->format('Y-m-d') : null,
                'description' => $input['description'] ?? null,
                'is_allocate_book_location' => $input['is_allocate_book_location'] ?? false,
                'status' => Status::ACTIVE->value ?? null,
            ];

            DB::beginTransaction();
            $BookItem = $this->bookPurchaseRepository->createBookItem($dataArray);
            if (!empty($BookItem)) {
                $bookAccNoArray =  [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'book_purchase_id' => null,
                    'book_item_id' => $BookItem->id,
                    'acc_no' => $input['acc_no'] ?? null,
                    'status' => Status::ACTIVE->value,
                ];
                $this->bookPurchaseRepository->createBookAccNo($bookAccNoArray);
            }
            DB::commit();

            return redirect()->route('book.inhouse')->with('message', 'Save successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->route('book.inhouse')->with('error', 'Something goes to wrong');
        }
    }

    /**
     * in house edit
     */
    public function inhouseEdit(Request $request)
    {
        if (!empty($request->input('book_item_id'))) {

            $bookItem = $this->bookPurchaseRepository->getByIdBookItem($request->input('book_item_id'));

            // book type
            $bookTypes = $this->typeRepository->getActiveAllBookType();

            // libraryVendor
            $libraryVendor = $this->libraryRepository->getActiveAllLibraryVendor()?->map(
                fn ($vendor) => [
                    'id' => $vendor->id,
                    'title' => $vendor->vendor_name
                ]
            )->all();

            // book category
            $bookCategory = $this->categoryRepository->getActiveAllBookCategory()?->map(
                fn ($bookCat) => [
                    'id' => $bookCat->id,
                    'title' => $bookCat->title
                ]
            )->all();

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

            return Inertia::render('Book/Edit_InHouse', [
                'bookTypes' => $bookTypes,
                'libraryVendor' => $libraryVendor,
                'bookCategory' => $bookCategory,
                'classNames' => $classNames,
                'subjects' => $subjects,
            ]);
        } else {
            return redirect()->route('book.list')->with('error', 'You cant refresh the page.');
        }
    }

    /**
     * bookStatusUpdate
     */
    public function bookStatusUpdate(Request $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->validate(
                [
                    'book_acc_no_id' => ['required', 'integer'],
                    'status' => ['required', 'string'],
                    'date_at' => ['required', 'date'],
                    'reason' => ['required', 'string'],
                ]
            );
            $updateData =  [
                'status' => $input['status'],
                'date_at' => !empty($input['date_at']) ? \Carbon\Carbon::parse($input['date_at'])->format('Y-m-d') : null,
                'reason' => $input['reason'],
            ];
            $this->bookPurchaseRepository->updateBookAccNo($input['book_acc_no_id'], $updateData);
            DB::commit();
            return redirect()->back()->with('message', 'Update successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes to wrong');
        }
    }


    /**
     * Display the schools.
     */
    public function bookSearchByLocation(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Book/BookSearchByLocation', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }


    /**
     * Display the schools.
     */
    public function allocateBookToLocation(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Book/AllocateBookToLocation', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

    /**
     * inactive book list
     */
    public function inactive(Request $request): Response
    {
        $acc_no = null;
        $start_date_at = null;
        $end_date_at = null;

        if ($request->isMethod('post')) {
            $acc_no = $request->input('acc_no') ?? null;
            $start_date_at = !empty($request->input('start_date_at')) ? \Carbon\Carbon::parse($request->input('start_date_at'))->format('Y-m-d') : null;
            $end_date_at = !empty($request->input('end_date_at')) ? \Carbon\Carbon::parse($request->input('end_date_at'))->format('Y-m-d') : null;
        }

        $inactiveBookList = $this->bookPurchaseRepository->getInActiveBookList($acc_no, $start_date_at, $end_date_at);
        return Inertia::render('Book/InactiveBooks', [
            'inactiveBookList' => $inactiveBookList,
        ]);
    }

    /**
     * Display the schools.
     */
    public function import(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Book/ImportBook', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

    /**
     * book issue
     */
    public function issue(Request $request): Response
    {
        $bookListData = [];
        $activeBookData = [];
        $issueBookList = [];

        if ($request->isMethod('post')) {
            $requestData = $request['data'];
            $requestBookId = $request['book_item_id'];

            $acc_no =  $requestData['acc_no'] ?? null;
            $book_title = $requestData['book_title'] ?? null;
            $author = $requestData['author'] ?? null;
            $publisher_name = $requestData['publisher_name'] ?? null;
            $class_name_id = $requestData['class_name_id'] ?? null;
            $subject_id = $requestData['subject_id'] ?? null;

            $searchBookList = $this->bookPurchaseRepository->getSearchBookListForIssue($acc_no, $book_title, $author, $publisher_name,  $class_name_id, $subject_id);

            if (!empty($searchBookList)) {
                foreach ($searchBookList as $book) {
                    $bookListData[] = [
                        'id' => $book?->id,
                        'book_title' => $book?->book_title,
                        'total_stock' => $book?->active_book_acc_nos_count ?? 0,
                        'available_stock' => $book?->active_book_acc_nos_count - $book?->issued_book_acc_nos_count ?? 0,
                    ];
                }
            }

            // issues book list
            $issueBookList = $this->bookRepository->getActiveAll();
            if (!empty($issueBookList)) {
                $issueBookList->load(
                    [
                        'bookItem' => function ($query) {
                            $query->select('id', 'book_title');
                        },
                        'bookAccNo' => function ($query) {
                            $query->select('id', 'acc_no');
                        }
                    ]
                );
            }

            if (!empty($requestBookId)) {
                $bookItem = $this->bookPurchaseRepository->getByIdBookItem($requestBookId);
                if (!empty($bookItem)) {
                    $activeBookData = [
                        'id' => $bookItem?->id,
                        'book_title' => $bookItem?->book_title,
                        'active_book_acc_nos' => [],
                    ];
                    $bookItem?->load(
                        [
                            // 'activeBookAccNos',
                            // 'activeBookAccNos.bookIssue.student' => function ($query) {
                            //     $query->select('id', 'first_name', 'middle_name', 'last_name');
                            // },
                            // 'activeBookAccNos.bookIssue.staff' => function ($query) {
                            //     $query->select('id', 'first_name', 'middle_name', 'last_name');
                            // },
                            'activeBookAccNos',
                        ]
                    );
                    $activeAccBooks = $bookItem?->activeBookAccNos;

                    if (!empty($activeAccBooks)) {
                        foreach ($activeAccBooks as $activeBook) {
                            $activeBookData['active_book_acc_nos'][] = [
                                'book_acc_no_id' => $activeBook?->id,
                                'acc_no' => $activeBook?->acc_no,
                                'is_available' => $activeBook?->is_available,
                                'is_allocated' => $activeBook?->is_allocated,
                                // 'student_id' => $activeBook?->student?->id,
                                // 'student_name' => getCocatenationTitle($activeBook?->book_issue?->student?->first_name, $activeBook?->book_issue?->student?->middle_name, $activeBook?->book_issue?->student?->last_name),
                                // 'staff_name' => getCocatenationTitle($activeBook?->book_issue?->staff?->first_name, $activeBook?->book_issue?->staff?->middle_name, $activeBook?->book_issue?->staff?->last_name),
                            ];
                        }
                    }
                }
            }
        }

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

        // book type user
        $bookTypeUser = [];
        foreach (BookTypeUser::cases() as $bookUser) {
            array_push($bookTypeUser, ['id' => $bookUser->value, 'title' => $bookUser->value]);
        }

        // class room
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // student name
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(
            fn ($student) =>
            [
                'id' => $student->id,
                'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                'classroom_id' => $student?->classroom_id,
                'admission_no' => $student?->admission_no,
            ]
        )->all();

        // teacher name
        $teachers = $this->staffRepository->getActiveTeacherNameId();
        $teacherData = $teachers->map(
            fn ($teacher) =>
            [
                'id' => $teacher->id,
                'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name),
            ]
        )->all();

        return Inertia::render('Book/IssueBook', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'bookListData' => $bookListData,
            'activeBookData' => $activeBookData,
            'bookTypeUser' => $bookTypeUser,
            'classrooms' => $classrooms,
            'students' => $students,
            'teacherData' => $teacherData,
            'issueBookList' => $issueBookList,
        ]);
    }

    /**
     * book issue save
     */
    public function bookIssueSave(Request $request)
    {
        try {
            $input = $request->validate(
                [
                    'book_item_id' => ['required', 'integer'],
                    'book_acc_no_id' => ['required', 'integer'],
                    'classroom_id' => ['nullable', 'integer'],
                    'student_id' => ['nullable', 'integer'],
                    'staff_id' => ['nullable', 'integer'],
                    'issued_date_at' => ['required', 'date'],
                    'due_date_at' => ['nullable'],
                    'issue_for_day' => ['required', 'numeric'],
                    'book_user_type' => ['nullable', 'string'],
                    'status' => ['nullable', 'string'],
                ]
            );

            // increase due day
            if (!empty($input['issue_for_day']) && $input['issue_for_day'] > 0) {
                $issuedDate = Carbon::parse($input['issued_date_at']);
                $dueDateAt = $issuedDate->addDay($input['issue_for_day']);
            } else {
                $dueDateAt = null;
            }

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'book_item_id' => $input['book_item_id'] ?? null,
                'book_acc_no_id' => $input['book_acc_no_id'] ?? null,
                'classroom_id' => $input['classroom_id'] ?? null,
                'student_id' => $input['student_id'] ?? null,
                'staff_id' => $input['staff_id'] ?? null,
                'issued_date_at' => !empty($request->input('issued_date_at')) ? \Carbon\Carbon::parse($request->input('issued_date_at'))->format('Y-m-d') : null,
                'due_date_at' => $dueDateAt,
                'issue_for_day' => $input['issue_for_day'] ?? null,
                'book_user_type' => $input['book_user_type'] ?? null,
                'status' => Status::ACTIVE->value ?? null,
            ];

            DB::beginTransaction();
            $bookIssues = $this->bookRepository->create($dataArray);
            if (!empty($bookIssues)) {
                $this->bookPurchaseRepository->updateBookAccNo(
                    $input['book_acc_no_id'],
                    [
                        'book_issue_id' => $bookIssues->id,
                        'is_available' => false,
                        'is_allocated' => true,
                    ]
                );
            }
            DB::commit();

            return redirect()->back()->with('message', 'Save successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes to wrong');
        }
    }

    /**
     * book return
     */
    public function return(Request $request)
    {
        $bookData = [];
        if ($request->isMethod('post')) {
            $acc_no = $request->input('acc_no');
            $bookData = $this->bookPurchaseRepository->getBookDataForReturnByAccNo($acc_no);
            if ($bookData === null) {
                return redirect()->back()->with('error', 'Please type issue book acc no.');
            }
        }
        return Inertia::render('Book/ReturnBook', [
            'bookData' => $bookData,
        ]);
    }

    /**
     * book return save
     */
    public function returnSave(BookReturnRequest $request)
    {
        $input = $request->validated();
        try {
            DB::beginTransaction();
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'book_item_id' => $input['book_item_id'] ?? null,
                'book_acc_no_id' => $input['book_acc_no_id'] ?? null,
                'book_issue_id' => $input['book_issue_id'] ?? null,
                'student_id' => $input['student_id'] ?? null,
                'staff_id' => $input['staff_id'] ?? null,
                'late_by_day' => $input['late_by_day'] ?? 0,
                'late_by_fine' => $input['late_by_fine'] ?? 0,
                'book_user_type' => $input['book_user_type'] ?? null,
                'return_date_at' => !empty($input['return_date']) ? \Carbon\Carbon::parse($input['return_date'])->format('Y-m-d') : null,
                'return_note' => $input['return_note'] ?? null,
                'status' => Status::ACTIVE->value ?? null,
            ];
            $bookReturn = $this->bookRepository->createBookReturn($dataArray);
            if (!empty($bookReturn)) {
                $bookAccUpdate = [
                    'book_return_id' => $bookReturn?->id,
                    'is_available' => true,
                    'is_allocated' => false,
                ];
                $this->bookPurchaseRepository->updateBookAccNo($input['book_acc_no_id'], $bookAccUpdate);
            }
            DB::commit();
            return redirect()->back()->with('message', 'Return book successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * multi issues book
     */
    public function multiIssuesBooks(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('Book/MultiIssuesBooks', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

}
