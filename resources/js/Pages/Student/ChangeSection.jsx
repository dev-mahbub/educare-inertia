import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ChangeSectionInnerLayout from './Partials/ChangeSection/ChangeSectionInnerLayout';

export default function ChangeSection({
    auth,
    siteData,
    classrooms,
    changeStudents,
    classroom_id,
    session_year,
    selectedStudent,
    searchValue,
    sections
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Change in section</h2>
            }
        >
            <Head title="Change in class" />
            <ChangeSectionInnerLayout
                classrooms={classrooms}
                changeStudents={changeStudents}
                classroom_id={classroom_id}
                session_year={session_year}
                selectedStudent={selectedStudent}
                searchValue={searchValue}
                sections={sections}
            />
        </DashboardLayout>
    );
}
