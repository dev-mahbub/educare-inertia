<?php

namespace App\Http\Controllers;

use App\Enums\CategoryType;
use App\Http\Requests\CategoryRequest;
use App\Repositories\ICategoryRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Enums\EmploymentCategoryType;

class CategoryController extends Controller
{

    public function __construct(
        private ICategoryRepository $categoryRepository
    ) {
        $this->middleware('permission:view categories', ['only' => ['productCategory', 'index', 'employmentCreateAndList',
            'staffCreateAndList', 'createFeeCategory'
        ]]);
        $this->middleware('permission:add categories', ['only' => ['save', 'edit']]);
        $this->middleware('permission:edit categories', ['only' => ['update']]);
        $this->middleware('permission:delete categories', ['only' => ['destroy']]);
    }

    /**
     * productCategory
     */
    public function productCategory(Request $request): Response
    {
        $productCategories = $this->categoryRepository->getProductCategoryList();

        // product category
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proParentCats = $proCatData->map(fn ($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();

        return Inertia::render('Inventory/ProductCategory', [
            'categories' => $productCategories,
            // 'proCatArrType' => $proCatArrType,
            'proParentCats' => $proParentCats,
        ]);
    }


    /**
     * index
     */
    public function index(Request $request): Response
    {
        $courseCategories = $this->categoryRepository->getCasteCategory();
        return Inertia::render('Category/CourseShow', [
            'courseCategories' => $courseCategories,
        ]);
    }

    /**
     * Display the Employment Category.
     */
    public function employmentCreateAndList(Request $request): Response
    {
        $employmentCategories = $this->categoryRepository->getEmploymentCategory();

        //employment Type
        $emp_cat_type = EmploymentCategoryType::cases();
        $emp_cat_types = array();
        foreach ($emp_cat_type as $cat_type) {
            array_push($emp_cat_types, ['id' => $cat_type->value, 'title' => $cat_type->value]);
        }

        return Inertia::render('Category/EmploymentShow', [
            'employmentCategories' => $employmentCategories,
            'emp_cat_types' => $emp_cat_types,
        ]);
    }

    /**
     * Display the Staff Category.
     */
    public function staffCreateAndList(Request $request): Response
    {
        $staffCategories = $this->categoryRepository->getStaffCategory();
        $staffParent = $staffCategories->map(fn ($scat) => ['id' => $scat->id, 'title' => $scat->title])->all();

        return Inertia::render('Category/StaffShow', [
            'staffCategories' => $staffCategories,
            'staffParent' => $staffParent,
        ]);
    }

    /**
     * Display the Fee Category.
     */
    public function createFeeCategory(): Response
    {
        $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll();
        $feeParent = $feeCategories->map(fn ($scat) => ['id' => $scat->id, 'title' => $scat->title])->all();

        return Inertia::render('Category/CreateFeeCategory', [
            'feeCategories' => $feeCategories,
            'feeParent' => $feeParent,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(CategoryRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'parent_id' => $input['parent_id'] ?? null,
            'category_type' =>  $input['category_type'] ?? "Course",
            'sub_category_type' => $input['sub_category_type'] ?? "",
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $category = $this->categoryRepository->create($dataArray);
        if (!$category) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Category created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Category/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(CategoryRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'parent_id' =>  $input['parent_id'] ?? null,
            'category_type' =>  $input['category_type'] ?? "Course",
            'sub_category_type' => $input['sub_category_type'] ?? "",
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
        );
        $category = $this->categoryRepository->update($id, $dataArray);
        if (!$category) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Category updated successfully.');
    }

    /**
     * destroy
     */
    public function destroy(String $id): RedirectResponse
    {
        $this->categoryRepository->deleteSubCat($id);
        $this->categoryRepository->delete($id);
        return redirect()->back()->with('message', 'Category deleted successfully.');
    }
}
