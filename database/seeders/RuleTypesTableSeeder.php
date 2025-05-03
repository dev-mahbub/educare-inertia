<?php

namespace Database\Seeders;

use App\Models\RuleType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RuleTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ruleTypes = [
            ['title' => 'Rule Type 1'],
            ['title' => 'Rule Type 2'],
            // Add more data as needed
        ];

        foreach ($ruleTypes as $ruleType) {
            RuleType::create($ruleType);
        }
    }
}

