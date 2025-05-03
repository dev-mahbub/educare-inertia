import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddExamInnerLayout from './Partials/Masters/AddExam/AddExamInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AddExam({ auth, siteData, mustVerifyEmail, status, schools, exams, classrooms}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Exam</h2>}
        >
            <Head title="Add Exam" />

            <AddExamInnerLayout exams={exams} classrooms={classrooms} />
        </DashboardLayout>
    );
}
