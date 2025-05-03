import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import NullifyFees from './NullifyFees';
import NullifyFeesFilter from './NullifyFeesFilter';

const NullifyFeeInnerLayout = ({ classrooms = [], students = [], student, studentFeeStructure = [] }) => {

    const [studentFeeStructureData, setStudentFeeStructureData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nullifyFeeIds, setNullifyFeeIds] = useState([]);
    const [feeNullifiedStatus, setFeeNullifiedStatus] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});

    useEffect(() => {
        setStudentFeeStructureData(studentFeeStructure);
        setLoading(false);
    }, [studentFeeStructure])

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <NullifyFeesFilter
                        classrooms={classrooms}
                        students={students}
                        student={student}
                        setStudentFeeStructureData={setStudentFeeStructureData}
                        setLoading={setLoading}
                        nullifyFeeIds={nullifyFeeIds}
                        setFeeNullifiedStatus={setFeeNullifiedStatus}
                        setSelectedStudent={setSelectedStudent}
                    />
                    <NullifyFees
                        studentFeeStructure={studentFeeStructureData}
                        loading={loading}
                        setNullifyFeeIds={setNullifyFeeIds}
                        feeNullifiedStatus={feeNullifiedStatus}
                        student={student ?? selectedStudent}
                    />
                </div>
            </div>
        </div>
    );
};

export default NullifyFeeInnerLayout;
