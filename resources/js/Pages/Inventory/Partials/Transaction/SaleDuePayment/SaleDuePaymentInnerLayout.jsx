import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import SaleDuePaymentForm from "./SaleDuePaymentForm";

const SaleDuePaymentInnerLayout = ({
    classrooms,
    students,
    student,
    paymentModes,
    staffs,
    staff,
    saleLedgers,
    filteredStudents
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SaleDuePaymentForm
                        classrooms={classrooms}
                        students={students}
                        student={student}
                        paymentModes={paymentModes}
                        staffs={staffs}
                        staff={staff}
                        saleLedgers={saleLedgers}
                        filteredStudents={filteredStudents}
                    />
                </div>
            </div>
        </div>
    );
};

export default SaleDuePaymentInnerLayout;
