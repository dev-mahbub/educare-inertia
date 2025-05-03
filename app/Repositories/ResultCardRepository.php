<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AcademicProgressReport;
use App\Models\Exam;
use App\Models\ExamGroup;
use App\Models\School;
use App\Models\Staff;
use PhpParser\Node\Expr\FuncCall;

class ResultCardRepository implements IRepository, IResultCardRepository
{
    public function getAll()
    {
        return School::all();
    }

    public function getById($id)
    {
        return School::findOrFail($id);
    }

    public function delete($id)
    {
        School::destroy($id);
    }

    public function create(array $arrayData)
    {
        return School::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return School::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return School::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return School::where('status', Status::ACTIVE);
    }

    public function getActiveReport()
    {
        return AcademicProgressReport::where('status', Status::ACTIVE)->get();
    }

    public function examFormSave($arrayData)
    {
        return ExamGroup::create($arrayData);
    }

    public function getReportList()
    {
        return ExamGroup::where('status', Status::ACTIVE)
            ->get();
    }

    public function getID($id)
    {
        return ExamGroup::findOrFail($id);
    }

    public function deleteExamGroupData($id)
    {
        ExamGroup::destroy($id);
    }

    public function getIdForExamGroup($id)
    {
        return ExamGroup::findOrFail($id);
    }

    public function updateExamGroupData($id, $arrayData)
    {
        return ExamGroup::where('id', $id)->update($arrayData);
    }
}
