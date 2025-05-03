import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import PartySaleReportForm from "./PartySaleReportForm";

const PartySaleReportInnerLayout = ({
    classroomNames,
    pendingSale,
    paidSale,
    teacherNames,
    pendingSaleItem,
    paidSaleItem,
    students,
    student
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
                    <PartySaleReportForm
                        classroomNames={classroomNames}
                        pendingSale={pendingSale}
                        paidSale={paidSale}
                        teacherNames={teacherNames}
                        pendingSaleItem={pendingSaleItem}
                        paidSaleItem={paidSaleItem}
                        students={students}
                        student={student}
                    />
                </div>
            </div>
        </div>
    );
};

export default PartySaleReportInnerLayout;
