<?php

namespace App\Repositories;

use App\Enums\CategoryType;
use App\Enums\Status;
use App\Models\Category;
use App\Models\StudentCategory;

class CategoryRepository implements IRepository, ICategoryRepository
{
    public function getAll()
    {
        return Category::all()->latest()->get();
    }

    public function getById($id)
    {
        return Category::findOrFail($id);
    }

    public function delete($id)
    {
        Category::destroy($id);
    }

    public function deleteSubCat($id)
    {
        return Category::where('parent_id', $id)->delete();
    }

    public function create(array $arrayData)
    {
        return Category::create($arrayData);
    }

    public function updateOrCreate($checkData, array $arrayData)
    {
        return Category::updateOrCreate($checkData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Category::whereId($id)
            ->update($arrayData);
    }

    public function getSubCatById($id)
    {
        return Category::where('parent_id', $id)
            ->latest()
            ->get();
    }

    public function getCasteCategory()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', 'Caste')
            ->latest()
            ->get();
    }

    public function getActiveAllBookCategory()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', CategoryType::BOOK->value)
            ->latest()
            ->get();
    }

    public function getCourseCategory()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', 'Course')
            ->latest()
            ->get();
    }

    public function getEmploymentCategory($schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('category_type', 'Employment')
            ->latest()
            ->get();
    }

    public function getActiveAll()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('parent_id', Null)
            ->latest()
            ->get();
    }

    public function getActiveFeeCategoryAll($schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('category_type', 'Fee')
            ->where('parent_id', Null)
            ->latest()
            ->get();
    }

    public function getStaffCategory($schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->with('parentCategory')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('category_type', 'Staff')
            ->latest()
            ->get();
    }

    public function getStaffParentCategories(int $schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('category_type', 'Staff')
            ->whereNull('parent_id')
            ->select('id', 'title', 'parent_id')
            ->with(['subCategories'])
            ->latest()
            ->get();
    }

    public function getStaffSubCategory($id)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', 'Staff')
            ->where('parent_id', $id)
            ->latest()
            ->get();
    }

    public function getProductCategoryList()
    {
        return Category::where('status', Status::ACTIVE)
            ->with('parentCategory')
            ->where('school_id', getUserSchoolId())
            ->where('category_type', CategoryType::PRODUCT)
            ->latest()
            ->get();
    }

    public function getProductSubCategory()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', CategoryType::PRODUCT)
            ->latest()
            ->get();
    }

    public function getProductCategoryNameAndId($schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('category_type', CategoryType::PRODUCT)
            ->whereNull('parent_id')
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getProductSubCategoryNameAndId($schoolId = null, $parentId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($parentId), function ($query) use ($parentId) {
                $query->where('parent_id', $parentId);
            })
            ->where('category_type', CategoryType::PRODUCT)
            ->whereNotNull('parent_id')
            ->select('id', 'title', 'parent_id')
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('category_type', CategoryType::CASTE->value)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'title')->latest()
            ->get();
    }


    public function getByTypeAndTitle($type, $title)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', $type)
            ->where('title', $title)
            ->select('id', 'title')
            ->first();
    }

    public function getActiveNameAndIdOfEmployment($schoolId = null)
    {
        return Category::where('category_type', 'Employment')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveNameIdStudentEmployment($schoolId = null)
    {
        return Category::where('category_type', 'Employment')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('sub_category_type', 'Student')
            ->where('status', Status::ACTIVE)
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getSubCatNameAndIdById($id)
    {
        return Category::where('parent_id', $id)
            ->where('school_id', 'Caste')
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->get();
    }

    public function getProductCategoryByTitle(string $title)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_type', CategoryType::PRODUCT)
            ->select(
                'id',
                'title'
            )
            ->first();
    }

    public function createStudentCategory(array $arrayData)
    {
        return StudentCategory::create($arrayData);
    }

    public function updateOrCreateStudentCategory(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentCategory::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function updateStudent($id, array $arrayData)
    {
        return StudentCategory::whereId($id)->update($arrayData);
    }

    public function deleteStudent($id)
    {
        return StudentCategory::destroy($id);
    }

    public function getByStudentId($id)
    {
        return StudentCategory::where('student_id', $id)
            ->where('school_id', getUserSchoolId())
            ->get()
            ->first();
    }
}
