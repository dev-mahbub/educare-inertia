import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditDiscountTypeForm from './EditDiscountTypeForm';

const EditDiscountInnerLayout = ({ feeTypes = [], discounts = [], discount = {} }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditDiscountTypeForm feeTypes={feeTypes} discounts={discounts} discount={discount} />
                </div>
            </div>
        </div>
    );
};

export default EditDiscountInnerLayout;
