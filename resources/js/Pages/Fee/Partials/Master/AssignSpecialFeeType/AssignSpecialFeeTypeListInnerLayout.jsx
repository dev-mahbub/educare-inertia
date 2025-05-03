import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import AssignSpecialFeeTypeList from './AssignSpecialFeeTypeList';

const AssignSpecialFeeTypeListInnerLayout = ({
    classNames = [],
    classrooms = [],
    special_fee_types = [],
    students = [],
    feeInstallments = [],
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
                    <AssignSpecialFeeTypeList
                        classNames={classNames}
                        classrooms={classrooms}
                        special_fee_types={special_fee_types}
                        students={students}
                        feeInstallments={feeInstallments}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignSpecialFeeTypeListInnerLayout;
