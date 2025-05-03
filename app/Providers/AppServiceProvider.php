<?php

namespace App\Providers;


use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

    public function boot()
    {
        URL::forceScheme('https');
        Inertia::share([
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);

        Inertia::share('flash', function () {
            return [
                'message' => Session::get('message'),
                'error' => Session::get('error'),
                'customData' => Session::get('customData'),
                'customData2' => Session::get('customData2'),
                'customData3' => Session::get('customData3'),
                'bankAccounts' => Session::get('bankAccounts'),
                'studentsByClassroom' => Session::get('studentsByClassroom'),
                'selectedStudentData' => Session::get('selectedStudentData'),
                'feeDiscountsByStudent' => Session::get('feeDiscountsByStudent'),
                'classroomByAcademicYear' => Session::get('classroomByAcademicYear'),
                'classroomWiseData' => Session::get('classroomWiseData'),
                'enquiryByAcademicYearReport' => Session::get('enquiryByAcademicYearReport'),
                'studentsWithFeeStructure' => Session::get('studentsWithFeeStructure'),
                'enquiryMonthData' => Session::get('enquiryMonthData'),
                'enquiryRegAmountData' => Session::get('enquiryRegAmountData'),
                'classFeeStructureById' => Session::get('classFeeStructureById'),
                'feeInstallmentsByStudent' => Session::get('feeInstallmentsByStudent'),
                'getDailyAdmissionRepo' => Session::get('getDailyAdmissionRepo'),
            ];
        });
    }
}
