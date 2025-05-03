import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import IssueBookInnerLayout from "./Partials/IssueBook/IssueBookInnerLayout";

export default function IssueBook({
    auth,
    siteData,
    classNames,
    subjects,
    bookListData,
    activeBookData,
    bookTypeUser,
    classrooms,
    students,
    teacherData,
    issueBookList,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Issue Book
                </h2>
            }
        >
            <Head title="Issue Book" />
            <IssueBookInnerLayout
                classNames={classNames}
                subjects={subjects}
                bookListData={bookListData}
                activeBookData={activeBookData}
                bookTypeUser={bookTypeUser}
                classrooms={classrooms}
                students={students}
                teacherData={teacherData}
                issueBookList={issueBookList}
            />
        </DashboardLayout>
    );
}
