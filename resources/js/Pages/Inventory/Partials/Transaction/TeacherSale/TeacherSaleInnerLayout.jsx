import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import TeacherSale from './TeacherSale';

const TeacherSaleInnerLayout = ({
    ledgerTitles,
    paymentArrType,
    products,
    teachers,
    teacherNames,
    discountTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <InventoryHeaderMenus title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherSale
                        ledgerTitles={ledgerTitles}
                        paymentArrType={paymentArrType}
                        products={products}
                        teachers={teachers}
                        teacherNames={teacherNames}
                        discountTypes={discountTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherSaleInnerLayout;
