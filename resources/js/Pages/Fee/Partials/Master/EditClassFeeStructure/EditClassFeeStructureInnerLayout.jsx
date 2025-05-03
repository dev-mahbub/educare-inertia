import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditClassFeeStructureForm from './EditClassFeeStructureForm';

const EditClassFeeStructureInnerLayout = ({
    feeStructures = [],
    feeStructure = [],
    class_names = [],
    feeTypes = [],
    structureTypes = [],
    semesters = [],
    fees = [],
    hostelAvailable
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditClassFeeStructureForm
                        feeStructure={feeStructure}
                        feeStructures={feeStructures}
                        class_names={class_names}
                        feeTypes={feeTypes}
                        structureTypes={structureTypes}
                        semesters={semesters}
                        fees={fees}
                        hostelAvailable={hostelAvailable}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditClassFeeStructureInnerLayout;
