import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React from 'react';
import IssueBookTables from './IssueBookTables';

const IssueBookInnerLayout = ({
    classNames,
    subjects,
    bookListData,
    activeBookData,
    bookTypeUser,
    classrooms,
    students,
    teacherData,
    issueBookList,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <IssueBookTables
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default IssueBookInnerLayout;
