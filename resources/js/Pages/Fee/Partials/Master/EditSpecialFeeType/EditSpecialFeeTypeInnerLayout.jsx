import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditSpecialFeeTypeForm from './EditSpecialFeeTypeForm';

const EditSpecialFeeTypeInnerLayout = ({
    special_types = "",
    special_type = "",
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
                    <EditSpecialFeeTypeForm
                        special_types={special_types}
                        special_type={special_type}
                        installment_types={installment_types}
                        fee_categories={fee_categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSpecialFeeTypeInnerLayout;
