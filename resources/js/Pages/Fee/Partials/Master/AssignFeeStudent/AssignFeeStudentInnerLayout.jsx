import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import CreateFeeStructureList from './CreateFeeStructureList';
import CreateStructureFilter from './CreateStructureFilter';

const AssignFeeStudentInnerLayout = ({
    classrooms = [],
    employmentCategoryTypes = [],
    feeStructures = [],
    studentsWithFeeStructure = [],
    classFeeStructure = []
}) => {
    const [studentsWithFeeStructureData, setStudentsWithFeeStructureData] = useState([]);
    const [selectedFeeStructureId, setSelectedFeeStructureId] = useState(null);
    const [saveStatus, setSaveStatus] = useState(false);
    const [removeStatus, setRemoveStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [classroomId, setClassroomId] = useState(null);
    const [empCatId, setempCatId] = useState(null);

    useEffect(() => {
        setStudentsWithFeeStructureData(studentsWithFeeStructure);
        setLoading(false);
    }, [studentsWithFeeStructure]);


    const selectedFeeStructureIdFromChild = (id) => {
        setSelectedFeeStructureId(id);
    }

    const saveStatusFromChild = (status) => {
        setSaveStatus(status);
    }


    const removeStatusFromChild = (status) => {
        setRemoveStatus(status);
    }

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateStructureFilter
                        classrooms={classrooms}
                        employmentCategoryTypes={employmentCategoryTypes}
                        feeStructures={feeStructures}
                        sendselectedFeeStructureIdToParent={selectedFeeStructureIdFromChild}
                        saveStatus={saveStatus}
                        removeStatus={removeStatus}
                        setLoading={setLoading}
                        studentsWithFeeStructureData={studentsWithFeeStructureData}
                        setStudentsWithFeeStructureData={setStudentsWithFeeStructureData}
                        classFeeStructure={classFeeStructure}
                        studentsWithFeeStructure={studentsWithFeeStructure}
                        setClassroomId={setClassroomId}
                        setempCatId={setempCatId}
                    />
                    <CreateFeeStructureList
                        selectedFeeStructureId={selectedFeeStructureId}
                        sendSaveStatusToParent={saveStatusFromChild}
                        sendRemoveStatusToParent={removeStatusFromChild}
                        loading={loading}
                        studentsWithFeeStructureData={studentsWithFeeStructureData}
                        classroomId={classroomId}
                        empCatId={empCatId}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignFeeStudentInnerLayout;
