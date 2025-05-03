import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CalendarInnerLayout from './Partials/Calendar/CalendarInnerLayout';

export default function Calendar({
    auth,
    siteData,
    presents,
    absents,
    holidays
}) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calendar</h2>}
        >
            <Head title="Calendar" />

            <CalendarInnerLayout
                presents={presents}
                absents={absents}
                holidays={holidays}
            />
        </DashboardLayout>
    );
}
