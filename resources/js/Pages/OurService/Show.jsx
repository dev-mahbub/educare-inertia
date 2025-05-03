import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import CreateHolidayInnerLayout from './Partials/CreateHolidayInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, holiday_types, holidays, status }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <CreateHolidayInnerLayout holiday_types={holiday_types} holidays={holidays}  />
        </DashboardLayout>
    );
}