import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SchoolShiftInnerLayout from './Partials/SchoolShiftInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, schoolShifts, shiftType, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="School shift" />

            <SchoolShiftInnerLayout
                schoolShifts={schoolShifts}
                shiftType={shiftType}

            />
        </DashboardLayout>
    );
}
