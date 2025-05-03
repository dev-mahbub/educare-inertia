import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeePDCList from './FeePDCList';

const FeePDCInnerLayout = ({
    classrooms = [],
    students = [],
    cheques = [],
    banks = [],
    student
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
                    <FeePDCList
                        classrooms={classrooms}
                        students={students}
                        cheques={cheques}
                        banks={banks}
                        student={student}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeePDCInnerLayout;
