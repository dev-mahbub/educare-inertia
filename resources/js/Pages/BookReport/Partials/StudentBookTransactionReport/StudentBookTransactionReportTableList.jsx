import React from 'react';
import BookissuedTable from './BookissuedTable';
import ReturnedBookTable from './ReturnedBookTable';

const StudentBookTransactionReportTableList = ({
    loading,
    studentIssuesBooks,
    studentReturnBooks,
}) => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <BookissuedTable
                        studentIssuesBooks={studentIssuesBooks}
                        loading={loading}
                    />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <ReturnedBookTable
                        studentReturnBooks={studentReturnBooks}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentBookTransactionReportTableList;
