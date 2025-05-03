import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeAllPDClist from './FeeAllPDClist';

const FeeAllPDCListInnerLayout = ({ cheques = [], cheque_all_status = [], classrooms = []}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeAllPDClist cheques={cheques} cheque_all_status={cheque_all_status} classrooms={classrooms}/>
                </div>
            </div>
        </div>
    );
};

export default FeeAllPDCListInnerLayout;
