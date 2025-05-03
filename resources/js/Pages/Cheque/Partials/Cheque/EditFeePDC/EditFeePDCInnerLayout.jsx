import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditFeePDCList from './EditFeePDCList';

const EditFeePDCInnerLayout = ({ classrooms = [], students = [], cheques = [], banks = [], cheque = []}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditFeePDCList classrooms={classrooms} students={students} cheques={cheques} banks={banks} cheque={cheque} />
                </div>
            </div>
        </div>
    );
};

export default EditFeePDCInnerLayout;
