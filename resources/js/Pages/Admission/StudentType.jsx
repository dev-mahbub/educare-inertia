import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentTypeInnerLayout from './Partials/StudentType/StudentTypeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, scholarBoardingType,studentType, }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Type Category</h2>}
        >
            <Head title="Student Type Category" />

            <StudentTypeInnerLayout
                scholarBoardingType = {scholarBoardingType}
                studentType = {studentType}
            />
        </DashboardLayout>
    );
}
