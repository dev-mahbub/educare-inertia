import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TotalBookListInnerLayout from './Partials/TotalBookList/TotalBookListInnerLayout';

export default function TotalBookList({
    auth,
    siteData,
    totalBookList,
    bookTypeStatus,
    bookTypeUser,
    classrooms,
    students,
    teacherData,
    classNameData,
    bookCategory,
    bookType,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Total Book List</h2>}
        >
            <Head title="Total Book List" />

            <TotalBookListInnerLayout
                totalBookList={totalBookList}
                bookTypeStatus={bookTypeStatus}
                bookTypeUser={bookTypeUser}
                classrooms={classrooms}
                students={students}
                teacherData={teacherData}
                classNameData={classNameData}
                bookCategory={bookCategory}
                bookType={bookType}
            />
        </DashboardLayout>
    );
}
