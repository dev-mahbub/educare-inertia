import React from 'react';
import GatePassForm from './GatePassForm';
import GatePassTable from './GatePassTable';
 

const GatePassTables = ({
    visitors,
    relactionType,
    classrooms,
    students,
    studentGatePass,
    gateNextNo
}) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                  <GatePassForm classrooms={classrooms} visitors={visitors} relactionType={relactionType} students={students} gateNextNo={gateNextNo}/>
                </div>
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <GatePassTable studentGatePass={studentGatePass} />
                </div>
            </div>
        </>
    );
};

export default GatePassTables;

