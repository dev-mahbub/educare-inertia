import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import BulkWalletForm from "./BulkWalletForm";

const BulkWalletInnerLayout = ({
    boardingStudents,
    classrooms,
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
                    <BulkWalletForm
                        boardingStudents={boardingStudents}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkWalletInnerLayout;
