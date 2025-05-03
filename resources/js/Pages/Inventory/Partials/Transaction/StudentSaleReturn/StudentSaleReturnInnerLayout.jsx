import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import StudentSaleReturn from './StudentSaleReturn';

const StudentSaleReturnInnerLayout = ({
    ledgerTitles,
    classroomTitles,
    products,
    discountTypes,
    receiptNo,
    students,
    student,
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
                    <StudentSaleReturn
                        ledgerTitles={ledgerTitles}
                        classroomTitles={classroomTitles}
                        products={products}
                        discountTypes={discountTypes}
                        receiptNo={receiptNo}
                        students={students}
                        student={student}
                        saleLedger={saleLedger}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentSaleReturnInnerLayout;
