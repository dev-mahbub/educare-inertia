import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditGradingInnerLayout from './Partials/Grading/EditGradingInnerLayout';


export default function Edit({ auth, siteData, grades, grade }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academic Grade</h2>}
        >
            <Head title="Academic Grade" />
            <EditGradingInnerLayout
                grades={grades}
                grade={grade}
            />
        </DashboardLayout>
    );
}
