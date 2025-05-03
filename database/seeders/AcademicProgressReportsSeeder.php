<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicProgressReport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AcademicProgressReportsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reports = [
            ['school_id' => 1, 'academic_year_id' => 1, 'title' => 'Report 1', 'status' => 'Active'],
            ['school_id' => 1, 'academic_year_id' => 1, 'title' => 'Report 2', 'status' => 'Active'],
            ['school_id' => 1, 'academic_year_id' => 1, 'title' => 'Report 3', 'status' => 'Active'],
        ];

        foreach ($reports as $report) {
            AcademicProgressReport::create($report);
        }
    }
}
