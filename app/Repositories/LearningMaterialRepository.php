<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomLearningMaterial;
use App\Models\LearningMaterialGroup;
use App\Models\LearningMaterial;
use App\Models\LearningMaterialResource;

class LearningMaterialRepository implements IRepository, ILearningMaterialRepository
{
    public function getAll()
    {
        return LearningMaterial::all();
    }

    public function getById($id)
    {
        return LearningMaterial::findOrFail($id);
    }

    public function delete($id)
    {
        return LearningMaterial::destroy($id);
    }

    public function create(array $arrayData)
    {
        return LearningMaterial::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return LearningMaterial::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return LearningMaterial::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getLearningMaterialById(int $id, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterial::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('id', $id)
            ->with(['learningMaterialResources.file', 'onlineTopic', 'classroomLearningMaterials', 'learningMaterialGroups'])
            ->first();
    }


    // learning material group

    public function createLearningMaterialGroup(array $arrayData)
    {
        return LearningMaterialGroup::create($arrayData);
    }

    public function updateLearningMaterialGroup(int $id, array $arrayData)
    {
        return LearningMaterialGroup::whereId($id)->update($arrayData);
    }

    public function getLearningMaterialGroupsByClassNameIdAndSubjectId(int $classNameId, int $subjectId, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterialGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->where('subject_id', $subjectId)
            ->with(['learningMaterials' => function ($query) {
                $query->with([
                    'user' => function ($query) {
                        $query->select(
                            'id',
                            'first_name',
                            'middle_name',
                            'last_name'
                        );
                    },
                    'onlineTopic' => function ($query) {
                        $query->select(
                            'id',
                            'title'
                        );
                    },
                    'learningMaterialResources' => function ($query) {
                        $query->with(['file' => function ($query) {
                            $query->select(
                                'id',
                                'fileable_type',
                                'fileable_id',
                                'name',
                                'file_name',
                                'path'
                            );
                        }])->select(
                            'id',
                            'learning_material_id',
                            'type',
                            'title',
                            'description',
                            'link',
                        );
                    },
                    'learningMaterialGroups'
                ])->select(
                    'id',
                    'learning_materials.learning_material_group_id',
                    'user_id',
                    'online_topic_id',
                    'title',
                    'content',
                    'resources'
                );
            }])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'user_id',
                'title',
                'description'
            )
            ->get();
    }

    public function getLearningMaterialGroupById(int $id, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterialGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('id', $id)
            ->with([
                'learningMaterials' => function ($query) {
                    $query->with([
                        'learningMaterialResources' => function ($query) {
                            $query->with(['file' => function ($query) {
                                $query->select(
                                    'id',
                                    'fileable_type',
                                    'fileable_id',
                                    'name',
                                    'file_name',
                                    'path'
                                );
                            }])->select(
                                'id',
                                'learning_material_id'
                            );
                        },
                        'classroomLearningMaterials'
                    ])->select(
                        'id',
                        'learning_materials.learning_material_group_id',
                        'user_id'
                    );
                },
                'materials'
            ])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'user_id',
                'title',
                'description'
            )
            ->first();
    }

    public function deleteLearningMaterialGroup(int $id)
    {
        return LearningMaterialGroup::destroy($id);
    }

    // learning material resource

    public function createLearningMaterialResource(array $arrayData)
    {
        return LearningMaterialResource::create($arrayData);
    }

    public function getLearningMaterialResourceById(int $id, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterialResource::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('id', $id)
            ->with('file')
            ->first();
    }

    public function deleteLearningMaterialResource(int $id)
    {
        return LearningMaterialResource::destroy($id);
    }

    // classroom learning material

    public function updateOrCreateClassroomLearningMaterial(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassroomLearningMaterial::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getClassroomLearningMaterials(int $classroomId, int $subjectId, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterialGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereHas('classroomLearningMaterials', function ($query) use ($classroomId, $subjectId) {
                $query->where('classroom_id', $classroomId)
                    ->where('subject_id', $subjectId);
            })
            ->with(['learningMaterials' => function ($query) use ($classroomId, $subjectId) {
                $query->whereHas('classroomLearningMaterials', function ($query) use ($classroomId, $subjectId) {
                    $query->where('classroom_id', $classroomId)
                        ->where('subject_id', $subjectId);
                })->with([
                    'user' => function ($query) {
                        $query->select(
                            'id',
                            'first_name',
                            'middle_name',
                            'last_name'
                        );
                    },
                    'onlineTopic' => function ($query) {
                        $query->select(
                            'id',
                            'title'
                        );
                    },
                    'learningMaterialResources' => function ($query) {
                        $query->with(['file' => function ($query) {
                            $query->select(
                                'id',
                                'fileable_type',
                                'fileable_id',
                                'name',
                                'file_name',
                                'path'
                            );
                        }])->select(
                            'id',
                            'learning_material_id',
                            'type',
                            'title',
                            'description',
                            'link',
                        );
                    }
                ])->select(
                    'id',
                    'learning_materials.learning_material_group_id',
                    'user_id',
                    'online_topic_id',
                    'title',
                    'content',
                    'resources'
                );
            }])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'user_id',
                'title',
                'description'
            )
            ->get();
    }

    public function getLearningMaterialGroupsForShare(int $classNameId, $schoolId = null, $academicYearId = null)
    {
        return LearningMaterialGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->with(['subject' => function ($query) {
                $query->select(
                    'id',
                    'title'
                );
            }])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'user_id',
                'title'
            )
            ->get();
    }
}
