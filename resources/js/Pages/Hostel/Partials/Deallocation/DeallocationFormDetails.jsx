import React from 'react';
import DeallocationForm from './DeallocationForm';
import DeallocationDetails from './DeallocationDetails';

const DeallocationFormDetails = ({
    classrooms,
    students,
    currentAllocationData,
    prevAllocationData,
    studentId,
    classroomId,
}) => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <DeallocationForm
                        classrooms={classrooms}
                        students={students}
                        currentAllocationData={currentAllocationData}
                        studentId={studentId}
                        classroomId={classroomId}
                    />
                </div>
                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                    <DeallocationDetails
                        currentAllocationData={currentAllocationData}
                        prevAllocationData={prevAllocationData}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeallocationFormDetails;
