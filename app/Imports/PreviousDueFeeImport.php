<?php

namespace App\Imports;

use DB;
use App\Enums\Status;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\ClassFeeStudentAmount;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PreviousDueFeeImport implements ToCollection, WithHeadingRow
{

    protected $feeId = null;
    protected $feeTypeId = null;
    protected $isFeeSpecial = false;
    protected $validationErrors = [];

    public function __construct(Request $request)
    {
        $this->feeId = $request->fee_id;
        $this->feeTypeId = $request->fee_type_id;
        $this->isFeeSpecial = $request->is_fee_special;
    }
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        if ($rows->count() > 0) {
            foreach ($rows as $row) {
                // Validate the row
                $validator = Validator::make($row->toArray(), [
                    'admission_no' => 'required',
                    'amount' => 'required|numeric|min:1',
                ]);

                // Check if validation fails for the current row
                if ($validator->fails()) {
                    // Store validation errors
                    $this->validationErrors['due_fee_file'] = "File mandatory fields cannot not be empty.";
                    continue; // Skip processing this row and move to the next one
                }

                $student = Student::where('status', Status::ACTIVE)
                    ->where('school_id', getUserSchoolId())
                    ->whereHas('classroomPromotedStudents', function ($query) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    })
                    ->where('admission_no', $row['admission_no'])
                    ->first();

                if ($student != null) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'student_id' => $student->id,
                        'class_name_id' =>  $student->class_name_id,
                        'fee_id' => (int) $this->feeId,
                        'fee_type_id' => (int) $this->feeTypeId,
                    ];

                    $valuesToUpdate = [
                        'amount' => DB::raw("amount + {$row['amount']}"),
                        'is_fee_special' => $this->isFeeSpecial,
                        'is_previous_due' => true,
                        'status' => Status::ACTIVE,
                    ];

                    ClassFeeStudentAmount::updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }
        } else {
            $this->validationErrors['due_fee_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }


    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }
}
