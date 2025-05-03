import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import SpecialFeeTypeForm from './SpecialFeeTypeForm';

const SpecialFeeTypeInnerLayout = ({
    special_types = "",
    installment_types = "",
    fee_categories = "",
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
                    <SpecialFeeTypeForm
                        special_types={special_types}
                        installment_types={installment_types}
                        fee_categories={fee_categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default SpecialFeeTypeInnerLayout;
