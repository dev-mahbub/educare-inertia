import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateCategoryEmploymentInnerLayout from './Partials/Employment/CreateEmploymentCategoryInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, employmentCategories, emp_cat_types, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employment Category</h2>}
        >
            <Head title="Employment category" />

            <CreateCategoryEmploymentInnerLayout employmentCategories={employmentCategories} emp_cat_types={emp_cat_types}  />
        </DashboardLayout>
    );
}