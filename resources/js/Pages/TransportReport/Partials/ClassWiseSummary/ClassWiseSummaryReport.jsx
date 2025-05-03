import React from 'react';
import { useState } from 'react';
import ClassWiseSummaryList from './ClassWiseSummaryList';
import ClassWiseSummaryStudentList from './ClassWiseSummaryStudentList';

const ClassWiseSummaryReport = ({
    classrooms,
    studentData,
}) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className="col-span-12 lg:col-span-3">
                <ClassWiseSummaryList
                    classrooms={classrooms}
                    setLoading={setLoading}
                />
            </div>
            <div className="col-span-12 lg:col-span-9">
                <ClassWiseSummaryStudentList
                    studentData={studentData}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
};

export default ClassWiseSummaryReport;
