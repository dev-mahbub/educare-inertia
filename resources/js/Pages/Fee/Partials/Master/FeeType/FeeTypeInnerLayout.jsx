import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeTypeForm from './FeeTypeForm';

const FeeTypeInnerLayout = ({
    types = [],
    installment_types = [],
    categories = [],
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
                    <FeeTypeForm
                        types={types}
                        installment_types={installment_types}
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeTypeInnerLayout;
