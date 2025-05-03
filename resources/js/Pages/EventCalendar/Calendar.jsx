import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CalendarInnerLayout from './Partials/Calendar/CalendarInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Calendar({
    auth,
    siteData,
    exams,
    events,
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
                exams={exams}
                events={events}
                holidays={holidays}
            />
        </DashboardLayout>
    );
}
