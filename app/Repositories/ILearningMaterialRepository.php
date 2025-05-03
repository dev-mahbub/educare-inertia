<?php

namespace App\Repositories;

interface ILearningMaterialRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getLearningMaterialById(int $id);

    //learning material group
    public function createLearningMaterialGroup(array $arrayData);
    public function updateLearningMaterialGroup(int $id, array $arrayData);
    public function getLearningMaterialGroupsByClassNameIdAndSubjectId(int $classNameId, int $subjectId);
    public function getLearningMaterialGroupById(int $id);
    public function deleteLearningMaterialGroup(int $id);
    public function getLearningMaterialGroupsForShare(int $classNameId);

    // learning material resource
    public function createLearningMaterialResource(array $arrayData);
    public function getLearningMaterialResourceById(int $id);
    public function deleteLearningMaterialResource(int $id);

    // classroom learning material
    public function updateOrCreateClassroomLearningMaterial(array $attributesToCheck, array $valuesToUpdate);
    public function getClassroomLearningMaterials(int $classroomId, int $subjectId);
}
