import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import CreateClassFeeStructureForm from './CreateClassFeeStructureForm';

const CreateClassFeeStructureInnerLayout = ({ feeStructures = [], class_names = [], fees = [], feeTypes = [], structureTypes = [], semesters = [], hostelAvailable }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateClassFeeStructureForm feeStructures={feeStructures} class_names={class_names} fees={fees} feeTypes={feeTypes} structureTypes={structureTypes} semesters={semesters} hostelAvailable={hostelAvailable}/>
                </div>
            </div>
        </div>
    );
};

export default CreateClassFeeStructureInnerLayout;
