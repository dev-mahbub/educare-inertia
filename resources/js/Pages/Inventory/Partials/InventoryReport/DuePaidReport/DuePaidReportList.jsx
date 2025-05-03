import React from 'react';
import DueReportList from './DueReportList';
import PaidReportList from './PaidReportList';

const DuePaidReportList = ({
    dueReportForStudent,
    paidReportForStudent,
}) => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <DueReportList
                        dueReportForStudent={dueReportForStudent}
                    />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <PaidReportList
                        paidReportForStudent={paidReportForStudent}
                    />
                </div>
            </div>
        </div>
    );
};

export default DuePaidReportList;
