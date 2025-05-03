import React from 'react';
import IssueBookRightTable from './IssueBookRightTable';
import IssueBookLeftForm from './IssueBookLeftForm';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const IssueBookTables = ({
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
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <IssueBookLeftForm
                        classNames={classNames}
                        subjects={subjects}
                        bookListData={bookListData}
                    />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <IssueBookRightTable
                        activeBookData={activeBookData}
                        bookTypeUser={bookTypeUser}
                        classrooms={classrooms}
                        students={students}
                        teacherData={teacherData}
                        bookListData={bookListData}
                        issueBookList={issueBookList}
                    />
                </div>
            </div>
        </>
    );
};

export default IssueBookTables;
