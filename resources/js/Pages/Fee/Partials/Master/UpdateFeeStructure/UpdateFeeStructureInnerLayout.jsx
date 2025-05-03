import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import UpdateFeeStructure from './UpdateFeeStructure';
import UpdateFeeStructureFilter from './UpdateFeeStructureFilter';

const UpdateFeeStructureInnerLayout = ({
    classrooms = [],
    fees = [],
    feeTypes = [],
    studentFeeStructure = [],
    students = [],
    student
}) => {

    const [selectedStudent, setSelectedStudent] = useState({});
    const [studentFeeStructureData, setStudentFeeStructureData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStudentFeeStructureData(studentFeeStructure)
    },[studentFeeStructure])

    useEffect(() => {
        setSelectedStudent(student)
    }, [student])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <UpdateFeeStructureFilter
                        classrooms={classrooms}
                        setStudentFeeStructureData={setStudentFeeStructureData}
                        setSelectedStudent={setSelectedStudent}
                        students={students}
                        student={student}
                        setLoading={setLoading}
                    />
                    <UpdateFeeStructure
                        studentFeeStructure={studentFeeStructureData}
                        selectedStudent={student ?? selectedStudent}
                        fees={fees} feeTypes={feeTypes}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateFeeStructureInnerLayout;
