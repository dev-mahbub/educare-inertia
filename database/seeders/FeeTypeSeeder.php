<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FeeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . 'db/fee/fee_types.sql')) {
            //DB::table('courses')->truncate();
            DB::unprepared(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'db/fee/fee_types.sql'));
        }
    }
}
