import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditStudentTypeInnerLayout from './Partials/StudentType/EditStudentTypeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, scholarBoardingType, studentsType, studentsTypeId}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Type Category</h2>}
        >
            <Head title="Student Type Category" />

            <EditStudentTypeInnerLayout
                scholarBoardingType={scholarBoardingType}
                studentsType={studentsType}
                studentsTypeId={studentsTypeId}
            />
        </DashboardLayout>
    );
}
