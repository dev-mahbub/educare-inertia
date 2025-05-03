import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditFeeTypeForm from './EditFeeTypeForm';

const EditFeeTypeInnerLayout = ({
    types = "",
    type = "",
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
                    <EditFeeTypeForm
                        types={types}
                        type={type}
                        installment_types={installment_types}
                        fee_categories={fee_categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditFeeTypeInnerLayout;
