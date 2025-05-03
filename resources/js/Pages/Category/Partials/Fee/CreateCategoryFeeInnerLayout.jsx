import FeeCategoryForm from "./FeeCategoryForm";
import FeeHeaderMenus from "@/Components/Partials/Menus/Fee/FeeHeaderMenus";

const CreateCategoryFeeInnerLayout = ({feeCategories, feeParent}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <FeeHeaderMenus title="Fee Category" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeCategoryForm
                        feeCategories={feeCategories}
                        feeParent={feeParent}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryFeeInnerLayout;
