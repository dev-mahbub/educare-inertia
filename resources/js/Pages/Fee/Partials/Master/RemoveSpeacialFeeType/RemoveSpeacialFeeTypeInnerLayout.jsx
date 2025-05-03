import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import RemoveSpeacialFeeTypeList from './RemoveSpeacialFeeTypeList';

const RemoveSpeacialFeeTypeInnerLayout = ({
    specialFeeTypes = [],
    classrooms = [],
    specialFeeAssignedStudents = []
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
                    <RemoveSpeacialFeeTypeList
                        specialFeeTypes={specialFeeTypes}
                        classrooms={classrooms}
                        specialFeeAssignedStudents={specialFeeAssignedStudents}
                    />
                </div>
            </div>
        </div>
    );
};

export default RemoveSpeacialFeeTypeInnerLayout;
