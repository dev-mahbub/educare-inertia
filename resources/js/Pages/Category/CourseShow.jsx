import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateCourseCategoryInnerLayout from './Partials/Course/CreateCourseCategoryInnerLayout';

export default function Show({ auth, siteData, courseCategories }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Caste Category</h2>}
        >
            <Head title="Caste Category" />

            <CreateCourseCategoryInnerLayout courseCategories={courseCategories}  />
        </DashboardLayout>
    );
}