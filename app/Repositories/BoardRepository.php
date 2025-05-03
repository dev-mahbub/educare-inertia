<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Board;

class BoardRepository implements IRepository, IBoardRepository
{
    public function getAll()
    {
        return Board::all();
    }

    public function getById($id)
    {
        return Board::findOrFail($id);
    }

    public function delete($id)
    {
        Board::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Board::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Board::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Board::where('status', Status::ACTIVE)
            ->get();
    }

    public function getRegisterAll()
    {
        return Board::where('status', Status::ACTIVE);
    }

    public function getActiveNameAndId()
    {
        return Board::where('status', Status::ACTIVE)->select('id', 'title', 'full_name')->latest()->get();
    }

    public function getCurrentSchoolActiveAll()
    {
        return Board::where('boards.status', Status::ACTIVE)
            ->join('school_boards', function ($join) {
                $join->on('boards.id', '=', 'school_boards.board_id')
                    ->where('school_boards.school_id', getUserSchoolId());
            })
            ->select(
                'boards.id',
                'boards.title',
                'boards.image'
            )
            ->get();
    }
}
