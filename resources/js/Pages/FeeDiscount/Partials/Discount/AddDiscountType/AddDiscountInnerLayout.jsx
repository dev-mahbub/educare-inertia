import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import AddDiscountTypeForm from './AddDiscountTypeForm';

const AddDiscountInnerLayout = ({ feeTypes = [], discounts= [] }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AddDiscountTypeForm feeTypes={feeTypes} discounts={discounts}/>
                </div>
            </div>
        </div>
    );
};

export default AddDiscountInnerLayout;
