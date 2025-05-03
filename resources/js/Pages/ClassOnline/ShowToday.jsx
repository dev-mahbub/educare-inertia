import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TodaysClassesInnerLayout from './Partials/OnlineClass/TodaysClassesInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    today_online_class,
    classrooms,
    subjects,
    currentDate
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todays Classes</h2>}
        >
            <Head title="Todays Classes" />

            <TodaysClassesInnerLayout
                today_online_class={today_online_class}
                classrooms={classrooms}
                subjects={subjects}
                currentDate={currentDate}
            />
        </DashboardLayout>
    );
}
