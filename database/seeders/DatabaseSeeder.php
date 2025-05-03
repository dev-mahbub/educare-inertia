<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ClassFeeStructureClassName;
use App\Models\SchoolBoard;
use App\Models\Staff;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private $developmentSeeders = [
        RoleSeeder::class,
        PermissionSeeder::class,
        SchoolSeeder::class,
        AcademicYearSeeder::class,
        CompanySeeder::class,
        InfraLevelSeeder::class,
        CertificateTypeSeeder::class,
        CertificateSeeder::class,
        ImageSeeder::class,
        UserSeeder::class,
        BoardSeeder::class,
        CountrySeeder::class,
        StateSeeder::class,
        StandardTimezoneSeeder::class,
        TimezoneSeeder::class,
        //AdmissionSeeder::class,
        BankSeeder::class,
        CategorySeeder::class,
        ClassNameSeeder::class,
        SectionSeeder::class,
        HouseSeeder::class,
        SourceSeeder::class,
        SchoolSettingSeeder::class,
        ClassroomSeeder::class,
        StudentSeeder::class,
        ReligionSeeder::class,
        DepartmentSeeder::class,
        DesignationSeeder::class,
        BloodGroupSeeder::class,
        SubjectSeeder::class,
        GuardianSeeder::class,
        SchoolBoardSeeder::class,
        SchoolTimezoneSeeder::class,
        SchoolStateSeeder::class,
        SchoolCountrySeeder::class,
        StudentHouseSeeder::class,
        StudentCategorySeeder::class,
        TransportProviderSeeder::class,
        FeeSeeder::class,
        FeeTypeSeeder::class,
        ClassFeeStudentSeeder::class,
        ClassFeeStudentAmountSeeder::class,
        ClassFeeStructureSeeder::class,
        ClassFeeStructureClassNameSeeder::class,
        ClassFeeStructureAmountSeeder::class,
        DiscountSeeder::class,
        DiscountFeeTypeAmountSeeder::class,
        StudentFeeDiscountSeeder::class,
        // StaffSeeder::class,
        UomSeeder::class,
        ProductSeeder::class,
        AccountGroup::class,
        Ledger::class,
        PartyAccount::class,
        UserActivitySeeder::class,
        VoucherSeeder::class,
        HostelInfraLevelSeeder::class,
        HostelRoomTypeSeeder::class,
        ELearningSubjectSeeder::class,
    ];

    private $testingSeeders = [
        RoleSeeder::class,
        PermissionSeeder::class,
        SchoolSeeder::class,
        AcademicYearSeeder::class,
        CompanySeeder::class,
        InfraLevelSeeder::class,
        CertificateTypeSeeder::class,
        CertificateSeeder::class,
        ImageSeeder::class,
        UserSeeder::class,
        BoardSeeder::class,
        CountrySeeder::class,
        StateSeeder::class,
        StandardTimezoneSeeder::class,
        TimezoneSeeder::class,
        //AdmissionSeeder::class,
        BankSeeder::class,
        CategorySeeder::class,
        ClassNameSeeder::class,
        SectionSeeder::class,
        HouseSeeder::class,
        SourceSeeder::class,
        SchoolSettingSeeder::class,
        ClassroomSeeder::class,
        StudentSeeder::class,
        ReligionSeeder::class,
        DepartmentSeeder::class,
        DesignationSeeder::class,
        BloodGroupSeeder::class,
        SubjectSeeder::class,
        GuardianSeeder::class,
        SchoolBoard::class,
        SchoolBoardSeeder::class,
        SchoolTimezoneSeeder::class,
        SchoolStateSeeder::class,
        SchoolCountrySeeder::class,
        StudentHouseSeeder::class,
        StudentCategorySeeder::class,
        TransportProviderSeeder::class,
        FeeSeeder::class,
        FeeTypeSeeder::class,
        ClassFeeStudentSeeder::class,
        ClassFeeStudentAmountSeeder::class,
        ClassFeeStructureSeeder::class,
        ClassFeeStructureClassNameSeeder::class,
        ClassFeeStructureAmountSeeder::class,
        DiscountSeeder::class,
        DiscountFeeTypeAmountSeeder::class,
        StudentFeeDiscountSeeder::class,
        // StaffSeeder::class,
        UomSeeder::class,
        ProductSeeder::class,
        AccountGroup::class,
        Ledger::class,
        PartyAccount::class,
        UserActivitySeeder::class,
        VoucherSeeder::class,
        HostelInfraLevelSeeder::class,
        HostelRoomTypeSeeder::class,
        ELearningSubjectSeeder::class,
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Don't send out actual emails during seeder
        config(['mail.default' => 'log']);

        if (config('app.env') == 'testing') {
            $this->call($this->testingSeeders);
        } else {
            $this->call($this->developmentSeeders);
        }
    }
}
