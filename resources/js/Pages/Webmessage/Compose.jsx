import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ComposeListInnerLayout from './Partials/Compose/ComposeListInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, audienceTypes, students, teachers, admins, classTeacher, subjectTeachers }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Web Compose Inbox" />
            <ComposeListInnerLayout classrooms={classrooms} audienceTypes={audienceTypes} students={students} teachers={teachers} admins={admins} classTeacher={classTeacher} subjectTeachers={subjectTeachers}/>
        </DashboardLayout>
    );
}