import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import TeacherSaleReturn from './TeacherSaleReturn';

const TeacherSaleReturnInnerLayout = ({
    ledgerTitles,
    products,
    teachers,
    teacherNames,
    discountTypes,
    receiptNo,
    saleLedger
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
                    <TeacherSaleReturn
                        ledgerTitles={ledgerTitles}
                        products={products}
                        teachers={teachers}
                        teacherNames={teacherNames}
                        discountTypes={discountTypes}
                        receiptNo={receiptNo}
                        saleLedger={saleLedger}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherSaleReturnInnerLayout;
