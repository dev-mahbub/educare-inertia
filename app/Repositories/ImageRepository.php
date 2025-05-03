<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\School;
use App\Models\Image;
use Illuminate\Database\Eloquent\Model;

class ImageRepository implements IRepository, IImageRepository
{
    public function getAll()
    {
        return Image::all();
    }

    public function getById($id)
    {
        return Image::findOrFail($id);
    }

    public function getMorphSchool($id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\School::class)
            ->first();
    }

    public function getMorphStaff($id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\Staff::class)
            ->first();
    }

    public function getMorphVehicleStaff($id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\Driver::class)
            ->first();
    }

    public function getStudentImageByStudentId($id)
    {
        $image = Image::where('imageable_id', $id)
            ->where('name', 'student_profile_image')
            ->where('school_id', getUserSchoolId())
            ->select('id', 'path')
            ->first();

        // Check if the result is not null before calling toArray()
        if ($image) {
            return $image->toArray();
        } else {
            // Handle the case where no record was found (e.g., return null, throw an exception, etc.)
            return null;
        }
    }

    public function getSchoolImageBySchoolId($id)
    {
        $image = Image::where('imageable_id', $id)
            ->where('name', 'image')
            ->select('id', 'path')
            ->first();

        if ($image) {
            return $image->toArray();
        } else {
            return null;
        }
    }

    public function delete($id)
    {
        Image::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Image::create($arrayData);
    }

    public function morphSchoolCreate(array $arrayData, $id)
    {
        /* $school = School::find($id);
        $image = Image::create($arrayData);
        $image->imageable()->associate($school); */

        return Image::create($arrayData);
    }

    public function morphCreate(array $arrayData, $id)
    {
        /* $school = School::find($id);
        $image = Image::create($arrayData);
        $image->imageable()->associate($school); */

        return Image::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Image::whereId($id)->update($arrayData);
    }

    public function updateTwo(int $id, string $name, string $model, array $arrayData)
    {
        return Image::where('name', $name)
            ->where('school_id', getUserSchoolId())
            ->where('imageable_id', $id)
            ->where('imageable_type', $model)
            ->update($arrayData);
    }

    public function updateOrCreate(array $arrayMatch, array $arrayData)
    {
        return Image::updateOrCreate($arrayMatch, $arrayData);
    }

    public function morphSchoolUpdate(array $arrayData, $id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\School::class)
            ->update($arrayData);
    }

    public function morphStaffImageUpdate(array $arrayData, $id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\Staff::class)
            ->update($arrayData);
    }

    public function morphVehicleStaffImageUpdate(array $arrayData, $id)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', \App\Models\Vehicle::class)
            ->update($arrayData);
    }

    public function morphImageCreate(array $arrayData)
    {
        return Image::Create($arrayData);
    }

    public function morphImageUpdate(array $arrayData, $id, $modelObj = null)
    {
        return Image::where('imageable_id', $id)
            ->where('imageable_type', $modelObj)
            ->update($arrayData);
    }

    public function morphStudentImageUpdate(array $arrayData, $id, $name = null, $modelObj = null)
    {
        return Image::where('imageable_id', $id)
            ->where('name', $name)
            ->where('imageable_type', $modelObj)
            ->update($arrayData);
    }

    public function morphImageAll($schoolId = null, $modelObj = null)
    {
        return Image::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('imageable_type', $modelObj)
            ->get();
    }

    public function morphStudentImageAll($schoolId = null, $name = null, $modelObj = null)
    {
        return Image::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('name', $name)
            ->where('imageable_type', $modelObj)
            ->get();
    }

    public function getActiveAll()
    {
        return Image::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return Image::where('status', Status::ACTIVE);
    }
}
