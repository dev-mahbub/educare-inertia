import DashboardLayout from '@/Layouts/DashboardLayout';
import React from "react";
import { Head } from '@inertiajs/react';
import TeacherImportInnerLayout from './Partials/TeacherImport/TeacherImportInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Teacher</h2>}
        >
            <Head title="Import Teacher" />
            
            <TeacherImportInnerLayout />
        </DashboardLayout>
    );
}
