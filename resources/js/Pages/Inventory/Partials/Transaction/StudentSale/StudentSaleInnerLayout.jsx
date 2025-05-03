import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import StudentSale from './StudentSale';

const StudentSaleInnerLayout = ({
    ledgerTitles,
    classroomTitles,
    paymentArrType,
    products,
    students,
    student,
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
                    <StudentSale
                        ledgerTitles={ledgerTitles}
                        classroomTitles={classroomTitles}
                        paymentArrType={paymentArrType}
                        products={products}
                        students={students}
                        student={student}
                        discountTypes={discountTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentSaleInnerLayout;
