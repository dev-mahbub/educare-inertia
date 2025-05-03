<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\School;
use App\Models\SchoolBoard;
use App\Models\SchoolCountry;
use App\Models\SchoolState;
use App\Models\SchoolTimezone;

class SchoolRepository implements IRepository, ISchoolRepository
{
    public function getAll()
    {
        return School::all();
    }

    public function getById($id)
    {
        return School::findOrFail($id);
    }

    public function getSchoolKeyByID($id)
    {
        return School::where('id', $id)
            ->select('id', 'school_key')
            ->first();
    }

    public function getRelationalObjById($id)
    {
        $school = School::where('schools.id', $id)
            //->where('classrooms.academic_year_id', getAcademicYearId())
            ->leftJoin('school_boards', 'school_boards.school_id', '=', 'schools.id')
            ->leftJoin('school_countries', 'school_countries.school_id', '=', 'schools.id')
            ->leftJoin('school_settings', 'school_settings.school_id', '=', 'schools.id')
            ->leftJoin('school_states', 'school_states.school_id', '=', 'schools.id')
            ->leftJoin('school_timezones', 'school_timezones.school_id', '=', 'schools.id')
            ->select(
                // student
                'schools.*',
                // board
                'school_boards.id as school_board_id',
                'school_boards.board_id',
                // country
                'school_countries.id as school_country_id',
                'school_countries.country_id',
                // school settings
                'school_settings.*',
                'school_settings.id as school_setting_id',
                // school state
                'school_states.id as school_state_id',
                'school_states.state_id',
                // school school_timezones
                'school_timezones.id as school_timezone_id',
                'school_timezones.timezone_id',
            )
            ->first();

        return $school;
    }

    public function getBySchoolCode($code)
    {
        return School::where('schools.school_key', $code)
            ->join('school_boards', 'school_boards.school_id', '=', 'schools.id')
            ->join('school_countries', 'school_countries.school_id', '=', 'schools.id')
            ->join('school_settings', 'school_settings.school_id', '=', 'schools.id')
            ->join('school_states', 'school_states.school_id', '=', 'schools.id')
            ->join('school_timezones', 'school_timezones.school_id', '=', 'schools.id')
            ->leftJoin('boards', 'boards.id', '=', 'school_boards.board_id')
            ->leftJoin('states', 'states.id', '=', 'school_states.state_id')
            ->leftJoin('countries', 'countries.id', '=', 'school_countries.id')
            ->select(
                // student
                'schools.*',
                // board
                'boards.title as board_title',
                // school state
                'states.name as state_name',
            )
            ->first();
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
        return School::where('status', Status::ACTIVE)
            ->with('image')
            ->get();
    }

    public function getRegisterAll()
    {
        return School::where('status', Status::ACTIVE)
            ->get();
    }

    public function getDomainAll()
    {
        return School::where('status', Status::ACTIVE)
            ->where('is_generated_domain', 1)
            ->get();
    }

    public function getSchoolAndSettingFromSchoolId()
    {
        return School::where('status', Status::ACTIVE)
            ->where('id', getUserSchoolId())
            ->with('setting')
            ->first();
    }

    //school country
    public function getCountryBySchoolId($id)
    {
        return SchoolCountry::where('school_id', $id)->first();
    }
    public function createCountry(array $arrayData)
    {
        return SchoolCountry::create($arrayData);
    }
    public function updateCountry(int $id, array $arrayData)
    {
        return SchoolCountry::whereId($id)->update($arrayData);
    }
    public function countryDestroy($id)
    {
        SchoolCountry::destroy($id);
    }



    //school statue
    public function getStateBySchoolId($id)
    {
        return SchoolState::where('school_id', $id)->first();
    }
    public function createState(array $arrayData)
    {
        return SchoolState::create($arrayData);
    }
    public function updateState(int $id, array $arrayData)
    {
        return SchoolState::whereId($id)->update($arrayData);
    }
    public function stateDestroy($id)
    {
        SchoolState::destroy($id);
    }

    //school statue
    public function getTimezoneBySchoolId($id)
    {
        return SchoolTimezone::where('school_id', $id)->first();
    }
    public function createTimezone(array $arrayData)
    {
        return SchoolTimezone::create($arrayData);
    }
    public function updateTimezone(int $id, array $arrayData)
    {
        return SchoolTimezone::whereId($id)->update($arrayData);
    }
    public function timezoneDestroy($id)
    {
        SchoolTimezone::destroy($id);
    }

    //school board
    public function getBoardBySchoolId($id)
    {
        return SchoolBoard::where('school_id', $id)->first();
    }
    public function createBoard(array $arrayData)
    {
        return SchoolBoard::create($arrayData);
    }
    public function updateBoard(int $id, array $arrayData)
    {
        return SchoolBoard::whereId($id)->update($arrayData);
    }
    public function boardDestroy($id)
    {
        SchoolBoard::destroy($id);
    }

    public function getSchoolsByCityAndState($cityName = null, $stateId = null)
    {
        $query = School::query();
        $query->where('schools.status', Status::ACTIVE)
            ->leftJoin('school_states', 'school_states.school_id', '=', 'schools.id');
            // ->leftJoin('images', 'images.imageable_id', '=', 'schools.id')
            // ->where('imageable_type', \App\Models\School::class);
        $query->when(!empty($cityName), function ($query) use ($cityName) {
            $query->where('schools.city', $cityName);
        });
        $query->when(!empty($stateId), function ($query) use ($stateId) {
            $query->where('school_states.state_id', $stateId);
        })
        ->with('image');

        return $query->select('schools.*')->get();
    }   

    public function countSchoolsByCityAndState($cityName = null, $stateId = null)
    {
        $query = School::query();
        $query->where('schools.status', Status::ACTIVE)
            ->leftJoin('school_states', 'school_states.school_id', '=', 'schools.id');
        $query->when(!empty($cityName), function ($query) use ($cityName) {
            $query->where('schools.city', $cityName);
        });
        $query->when(!empty($stateId), function ($query) use ($stateId) {
            $query->where('school_states.state_id', $stateId);
        });

        return $query->count();
    }

    public function getCitiesByStateId($stateId = null)
    {
        $query = School::query();
        $query->where('schools.status', Status::ACTIVE)
            ->leftJoin('school_states', 'school_states.school_id', '=', 'schools.id');
        $query->when(!empty($stateId), function ($query) use ($stateId) {
            $query->where('school_states.state_id', $stateId);
        });

        return $query->distinct()->orderBy('city')->pluck('city', 'city');
    }

    public function countCitiesByStateId($stateId = null)
    {
        $query = School::query();
        $query->where('schools.status', Status::ACTIVE)
            ->leftJoin('school_states', 'school_states.school_id', '=', 'schools.id');
        $query->when(!empty($stateId), function ($query) use ($stateId) {
            $query->where('school_states.state_id', $stateId);
        });

        return $query->distinct()->orderBy('city')->pluck('city');
    }

    public function getSchoolCounts(){
        $allSchoolsCount = School::where('status', Status::ACTIVE)
            ->count();

        $activeSchoolsCount = School::where('status', Status::ACTIVE)
            ->where('is_inactive', 0)
            ->count();

        $inactiveSchoolsCount = School::where('status', Status::ACTIVE)
            ->where('is_inactive', 1)
            ->count();

        return [
            'allSchoolsCount' => $allSchoolsCount,
            'activeSchoolsCount' => $activeSchoolsCount,
            'inactiveSchoolsCount' => $inactiveSchoolsCount,
        ];
    }

}
