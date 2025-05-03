<?php

namespace App\Repositories;

interface ICategoryRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function deleteSubCat($id);
    public function create(array $arrayData);
    public function updateOrCreate($checkData, array $arrayData);
    public function update($id, array $arrayData);
    public function getSubCatById($id);
    public function getCasteCategory();
    public function getActiveAllBookCategory();
    public function getCourseCategory();
    public function getEmploymentCategory();
    public function getActiveAll();
    public function getActiveFeeCategoryAll();
    public function getStaffCategory();
    public function getStaffSubCategory($id);
    public function getProductCategoryList();
    public function getProductSubCategory();
    public function getProductCategoryNameAndId();
    public function getProductSubCategoryNameAndId();
    public function getRegisterAll();
    public function getActiveNameAndId();
    public function getActiveNameAndIdOfEmployment();
    public function getActiveNameIdStudentEmployment();
    public function getSubCatNameAndIdById($id);
    public function createStudentCategory(array $arrayData);
    public function updateStudent($id, array $arrayData);
    public function deleteStudent($id);
    public function getByStudentId($id);
    public function getStaffParentCategories(int $schoolId = null);
}
