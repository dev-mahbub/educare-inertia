import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeInstallmentForm from './FeeInstallmentForm';

const FeeInstallmentInnerLayout = ({ fees = "", next_installment_no = "" }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeInstallmentForm fees={fees} next_installment_no={next_installment_no}/>
                </div>
            </div>
        </div>
    );
};

export default FeeInstallmentInnerLayout;
