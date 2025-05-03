import React from 'react';
import HostelGatePassForm from './HostelGatePassForm';
import HostelGatePassTable from './HostelGatePassTable';

const HostelGatePassTables = ({
    classrooms,
    students,
    guardianData,
    studentGatePass,
    gateNextNo,
}) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                    <HostelGatePassForm
                        classrooms={classrooms}
                        students={students}
                        guardianData={guardianData}
                        gateNextNo={gateNextNo}
                    />
                </div>
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <HostelGatePassTable
                        studentGatePass={studentGatePass}
                    />
                </div>
            </div>
        </>
    );
};

export default HostelGatePassTables;
